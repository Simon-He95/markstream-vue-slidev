<script setup>
import { computed, nextTick, onUnmounted, ref, watch } from "vue";
import MarkdownRender, { enableMermaid } from "markstream-vue";
import "markstream-vue/index.css";

enableMermaid();

const chunks = [
  "解释 debounce 的核心思路。\n\n",
  "高频输入不会每次都打到业务逻辑，而是先进入一个等待窗口。\n\n",
  "```ts\n",
  "const run = debounce((value) => search(value), 300)\n",
  "input.addEventListener('input', (event) => {\n",
  "  run(event.target.value)\n",
  "})\n",
  "```\n\n",
  "```mermaid\ngraph LR\n  input[Input] --> timer[Timer]\n  timer --> api[Search API]\n```\n\n",
  "```diff\n- onInput(run)\n+ onInput(debounce(run, 300))\n```\n\n",
  "> final: 代码块、图表、diff 和滚动位置都应该稳定落地。\n",
];

const step = ref(0);
const running = ref(false);
const remountCount = ref(0);
const leftHost = ref(null);
const rightHost = ref(null);
let timer;
let scrollTimer;

const smoothStreamingOptions = {
  minCharsPerSecond: 360,
  maxCharsPerSecond: 960,
  targetLatencyMs: 160,
  catchUpLatencyMs: 220,
  maxCommitFps: 60,
  maxCharsPerCommit: 80,
  flushOnFinish: true,
};

const content = computed(() => chunks.slice(0, step.value).join(""));
const progress = computed(() => `${Math.round((step.value / chunks.length) * 100)}%`);
const isFinal = computed(() => step.value >= chunks.length);
const selectionInterrupted = computed(() => step.value >= 4);

const codeLines = computed(() => {
  const value = content.value;
  const start = value.indexOf("```ts");
  if (start < 0)
    return [];
  const raw = value.slice(start + "```ts".length);
  const end = raw.indexOf("```");
  return (end >= 0 ? raw.slice(0, end) : raw)
    .replace(/^\n/, "")
    .split("\n")
    .filter(Boolean);
});

const showMermaid = computed(() => content.value.includes("```mermaid"));
const showDiff = computed(() => content.value.includes("```diff"));
const showFinalNote = computed(() => content.value.includes("> final:"));

function scrollToBottom(element, behavior = "auto") {
  if (!element)
    return;
  element.scrollTo({ top: element.scrollHeight, behavior });
}

function scrollPanels() {
  scrollToBottom(leftHost.value, "auto");
  scrollToBottom(rightHost.value, "smooth");
}

watch(content, async () => {
  await nextTick();
  window.requestAnimationFrame(scrollPanels);
});

function tick() {
  if (step.value >= chunks.length) {
    running.value = false;
    window.clearInterval(timer);
    window.setTimeout(() => {
      scrollPanels();
      window.clearInterval(scrollTimer);
    }, 900);
    return;
  }
  step.value += 1;
  remountCount.value += 1;
}

function play() {
  if (running.value)
    return;
  if (isFinal.value)
    reset();
  running.value = true;
  window.clearInterval(scrollTimer);
  scrollTimer = window.setInterval(scrollPanels, 100);
  tick();
  timer = window.setInterval(tick, 520);
}

function pause() {
  running.value = false;
  window.clearInterval(timer);
  window.clearInterval(scrollTimer);
}

function reset() {
  pause();
  step.value = 0;
  remountCount.value = 0;
  nextTick(() => {
    if (leftHost.value)
      leftHost.value.scrollTop = 0;
    if (rightHost.value)
      rightHost.value.scrollTop = 0;
  });
}

onUnmounted(() => {
  window.clearInterval(timer);
  window.clearInterval(scrollTimer);
});
</script>

<template>
  <div class="stream-play">
    <div class="play-toolbar">
      <button class="play-primary" type="button" @click="running ? pause() : play()">
        {{ running ? "Pause" : "Play" }}
      </button>
      <button class="play-secondary" type="button" @click="reset">
        Reset
      </button>
      <div class="play-progress">
        <span>{{ step }} / {{ chunks.length }} chunks</span>
        <i :style="{ width: progress }" />
      </div>
    </div>

    <div class="play-grid">
      <section class="play-panel streamdown">
        <header>
          <span>common renderer model</span>
          <b>remount #{{ remountCount }}</b>
        </header>
        <div ref="leftHost" class="render-host">
          <article class="markdown-sample" :key="remountCount">
            <p>{{ step ? "解释 debounce 的核心思路。" : "等待 Play" }}</p>
            <p v-if="step >= 2">
              高频输入先进入等待窗口，再合并为一次最终调用。
            </p>
            <pre v-if="codeLines.length"><code><span
              v-for="line in codeLines"
              :key="line"
            >{{ line }}</span></code></pre>
            <div v-if="selectionInterrupted" class="selection-note lost">
              selection interrupted by remount
            </div>
            <div v-if="showMermaid" class="diagram-sample">
              <span>Mermaid</span>
              <code>graph LR; input --&gt; timer --&gt; fn</code>
            </div>
            <pre v-if="showDiff" class="diff-sample"><code>- onInput(run)
+ onInput(debounce(run, 300))</code></pre>
            <blockquote v-if="showFinalNote">
              final: 代码块、图表、diff 和滚动位置都应该稳定落地。
            </blockquote>
          </article>
        </div>
        <footer>
          <span>whole block update</span>
          <span>scroll jumps</span>
          <span>selection interrupted</span>
        </footer>
      </section>

      <section class="play-panel markstream">
        <header>
          <span>markstream-vue</span>
          <b>smoothStreaming on</b>
        </header>
        <div ref="rightHost" class="render-host actual-render">
          <MarkdownRender
            custom-id="stream-play"
            :content="content"
            :final="isFinal"
            :is-dark="true"
            :max-live-nodes="0"
            :batch-rendering="true"
            :render-batch-size="4"
            :render-batch-delay="8"
            :render-batch-budget-ms="4"
            :fade="false"
            :typewriter="true"
            :smooth-streaming="true"
            :smooth-streaming-options="smoothStreamingOptions"
            :parse-coalesce-ms="32"
          />
        </div>
        <footer>
          <span>smoothStreaming</span>
          <span>smooth autoscroll</span>
          <span>stable nodes</span>
        </footer>
      </section>
    </div>
  </div>
</template>

<style scoped>
.stream-play {
  display: grid;
  gap: 12px;
}

.play-toolbar {
  display: grid;
  grid-template-columns: auto auto minmax(0, 1fr);
  align-items: center;
  gap: 10px;
  padding: 9px 12px;
  border: 1px solid rgba(34, 211, 238, 0.22);
  border-radius: 14px;
  background: rgba(15, 23, 42, 0.56);
}

button {
  height: 32px;
  border: 0;
  border-radius: 999px;
  padding: 0 16px;
  color: #e5e7eb;
  font-weight: 850;
}

.play-primary {
  background: linear-gradient(90deg, #22d3ee, #10b981);
  color: #04111b;
}

.play-secondary {
  border: 1px solid rgba(148, 163, 184, 0.22);
  background: rgba(8, 13, 27, 0.84);
}

.play-progress {
  position: relative;
  height: 24px;
  overflow: hidden;
  border-radius: 999px;
  background: rgba(2, 6, 23, 0.76);
}

.play-progress span {
  position: relative;
  z-index: 1;
  display: block;
  padding: 4px 10px;
  color: #94a3b8;
  font-size: 12px;
  font-weight: 760;
}

.play-progress i {
  position: absolute;
  inset: 0 auto 0 0;
  background: rgba(34, 211, 238, 0.24);
  transition: width 160ms ease;
}

.play-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;
}

.play-panel {
  min-width: 0;
  padding: 12px;
  border: 1px solid rgba(148, 163, 184, 0.2);
  border-radius: 18px;
  background: rgba(15, 23, 42, 0.58);
}

.play-panel.streamdown {
  border-color: rgba(245, 158, 11, 0.32);
}

.play-panel.markstream {
  border-color: rgba(16, 185, 129, 0.32);
}

.play-panel header,
.play-panel footer {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 7px;
}

.play-panel header {
  justify-content: space-between;
  margin-bottom: 8px;
}

.play-panel header span {
  color: #22d3ee;
  font-size: 13px;
  font-weight: 850;
  text-transform: uppercase;
}

.play-panel header b {
  color: #94a3b8;
  font-size: 12px;
}

.render-host {
  position: relative;
  height: 236px;
  overflow: auto;
  scrollbar-color: rgba(34, 211, 238, 0.58) rgba(2, 6, 23, 0.28);
  scrollbar-width: thin;
  scroll-behavior: smooth;
  border: 1px solid rgba(148, 163, 184, 0.16);
  border-radius: 14px;
  background: rgba(2, 6, 23, 0.74);
}

.render-host::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

.render-host::-webkit-scrollbar-track {
  background: rgba(2, 6, 23, 0.28);
}

.render-host::-webkit-scrollbar-thumb {
  border-radius: 999px;
  background: rgba(34, 211, 238, 0.58);
}

.streamdown .render-host {
  scrollbar-color: rgba(245, 158, 11, 0.58) rgba(2, 6, 23, 0.28);
}

.streamdown .render-host::-webkit-scrollbar-thumb {
  background: rgba(245, 158, 11, 0.58);
}

.markdown-sample {
  padding: 10px;
  color: #dbe5ef;
  font-size: 12px;
  line-height: 1.35;
  animation: repaint 180ms ease;
}

.markdown-sample p {
  margin: 0 0 8px;
  color: #94a3b8;
}

.markdown-sample pre {
  margin: 0;
  padding: 10px;
  overflow: hidden;
  border-radius: 8px;
  background: #111827;
}

.markdown-sample code {
  display: grid;
  gap: 1px;
  color: #e5e7eb;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  font-size: 10px;
  line-height: 1.25;
  white-space: pre-wrap;
}

.selection-note {
  display: inline-block;
  margin: 7px 0 0;
  padding: 5px 8px;
  border: 1px solid rgba(248, 113, 113, 0.32);
  border-radius: 999px;
  background: rgba(127, 29, 29, 0.36);
  color: #fca5a5;
  font-size: 10px;
  font-weight: 850;
  text-transform: uppercase;
}

.diagram-sample {
  display: flex;
  justify-content: space-between;
  gap: 10px;
  margin-top: 7px;
  padding: 7px 9px;
  border: 1px solid rgba(148, 163, 184, 0.16);
  border-radius: 8px;
  background: rgba(15, 23, 42, 0.72);
  color: #e5e7eb;
  font-size: 11px;
}

.diagram-sample code {
  display: block;
  color: #94a3b8;
  white-space: nowrap;
}

.diff-sample {
  margin-top: 7px !important;
}

.markdown-sample blockquote {
  margin: 8px 0 0;
  padding: 8px 10px;
  border-left: 0;
  border-radius: 8px;
  background: rgba(15, 23, 42, 0.72);
  color: #cbd5e1;
}

.actual-render {
  padding: 10px;
}

.actual-render :deep(.markstream-vue) {
  font-size: 11px;
  line-height: 1.3;
  padding-bottom: 6px;
}

.actual-render :deep(pre) {
  max-height: none;
}

.play-panel footer {
  margin-top: 8px;
}

.play-panel footer span {
  flex: 1 1 30%;
  padding: 5px 7px;
  border: 1px solid rgba(148, 163, 184, 0.16);
  border-radius: 999px;
  background: rgba(8, 13, 27, 0.72);
  color: #94a3b8;
  font-size: 10px;
  line-height: 1.2;
  text-align: center;
}

@keyframes repaint {
  0% {
    opacity: 0.42;
    transform: translateY(-4px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
