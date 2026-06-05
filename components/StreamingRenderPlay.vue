<script setup>
import { computed, defineComponent, h, nextTick, onUnmounted, ref, watch } from "vue";
import MarkdownRender, { removeCustomComponents, setCustomComponents } from "markstream-vue";
import "markstream-vue/index.css";

const streamPlayId = "stream-play";

const tokenPattern = /\/\/.*|["'`][^"'`]*["'`]?|\b(?:const|let|var|import|from|await|return|if|else|function|new|class|extends|type|interface|as)\b|\b(?:true|false|null|undefined)\b|\b\d+(?:\.\d+)?\b|[{}()[\].,;:=+\-*/<>]+/g;
const keywordPattern = /^(const|let|var|import|from|await|return|if|else|function|new|class|extends|type|interface|as)$/;
const constantPattern = /^(true|false|null|undefined|\d+(?:\.\d+)?)$/;

function tokenClass(token) {
  if (token.startsWith("//"))
    return "comment";
  if (/^["'`]/.test(token))
    return "string";
  if (keywordPattern.test(token))
    return "keyword";
  if (constantPattern.test(token))
    return "constant";
  if (/^[{}()[\].,;:=+\-*/<>]+$/.test(token))
    return "operator";
  return "";
}

function renderCodeLine(line, lang, lineIndex) {
  if (lang === "diff" && /^[+-]/.test(line)) {
    return h("span", {
      class: ["monaco-line", line.startsWith("+") ? "insert" : "delete"],
      key: lineIndex,
    }, line);
  }

  const children = [];
  let cursor = 0;
  line.replace(tokenPattern, (token, offset) => {
    if (offset > cursor)
      children.push(line.slice(cursor, offset));
    const klass = tokenClass(token);
    children.push(klass ? h("span", { class: ["monaco-token", klass] }, token) : token);
    cursor = offset + token.length;
    return token;
  });
  if (cursor < line.length)
    children.push(line.slice(cursor));
  return h("span", { class: "monaco-line", key: lineIndex }, children);
}

const MonacoCodeBlock = defineComponent({
  name: "MonacoCodeBlock",
  props: {
    node: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    return () => {
      const lang = String(props.node.language || "");
      const lines = String(props.node.code || "").split("\n");
      return h("pre", { class: ["monaco-code-block", lang && `language-${lang}`] }, [
        h("code", lines.map((line, index) => renderCodeLine(line, lang, index))),
      ]);
    };
  },
});

setCustomComponents(streamPlayId, { code_block: MonacoCodeBlock });

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
  "> final: 代码块、Mermaid 源码、diff 和滚动位置都应该稳定落地。\n",
];

const step = ref(0);
const running = ref(false);
const remountCount = ref(0);
const leftHost = ref(null);
const rightHost = ref(null);
let timer;
let scrollTimer;

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
  removeCustomComponents(streamPlayId);
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
              final: 代码块、Mermaid 源码、diff 和滚动位置都应该稳定落地。
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
          <b>content + final</b>
        </header>
        <div ref="rightHost" class="render-host actual-render">
          <MarkdownRender
            :custom-id="streamPlayId"
            :content="content"
            :final="isFinal"
            :is-dark="true"
            :max-live-nodes="0"
            :batch-rendering="true"
            :render-batch-size="16"
            :render-batch-delay="8"
            :render-batch-budget-ms="4"
            :fade="false"
            :typewriter="true"
            smooth-streaming="auto"
          />
        </div>
        <footer>
          <span>final signal</span>
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
  border: 1px solid rgba(86, 156, 214, 0.22);
  border-radius: 8px;
  background: rgba(37, 37, 38, 0.72);
}

button {
  height: 32px;
  border: 0;
  border-radius: 4px;
  padding: 0 16px;
  color: #D4D4D4;
  font-weight: 850;
}

.play-primary {
  background: #0E639C;
  color: #FFFFFF;
}

.play-secondary {
  border: 1px solid rgba(148, 163, 184, 0.22);
  background: #252526;
}

.play-progress {
  position: relative;
  height: 24px;
  overflow: hidden;
  border-radius: 4px;
  background: rgba(30, 30, 30, 0.76);
}

.play-progress span {
  position: relative;
  z-index: 1;
  display: block;
  padding: 4px 10px;
  color: #A6A6A6;
  font-size: 12px;
  font-weight: 760;
}

.play-progress i {
  position: absolute;
  inset: 0 auto 0 0;
  background: rgba(86, 156, 214, 0.24);
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
  border-radius: 8px;
  background: rgba(37, 37, 38, 0.72);
}

.play-panel.streamdown {
  border-color: rgba(206, 145, 120, 0.32);
}

.play-panel.markstream {
  border-color: rgba(78, 201, 176, 0.32);
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
  color: #569CD6;
  font-size: 13px;
  font-weight: 850;
  text-transform: uppercase;
}

.play-panel header b {
  color: #A6A6A6;
  font-size: 12px;
}

.render-host {
  position: relative;
  height: 236px;
  overflow: auto;
  scrollbar-color: rgba(86, 156, 214, 0.58) rgba(30, 30, 30, 0.28);
  scrollbar-width: thin;
  scroll-behavior: smooth;
  border: 1px solid rgba(148, 163, 184, 0.16);
  border-radius: 6px;
  background: #1E1E1E;
}

.render-host::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

.render-host::-webkit-scrollbar-track {
  background: rgba(30, 30, 30, 0.28);
}

.render-host::-webkit-scrollbar-thumb {
  border-radius: 999px;
  background: rgba(86, 156, 214, 0.58);
}

.streamdown .render-host {
  scrollbar-color: rgba(206, 145, 120, 0.58) rgba(30, 30, 30, 0.28);
}

.streamdown .render-host::-webkit-scrollbar-thumb {
  background: rgba(206, 145, 120, 0.58);
}

.markdown-sample {
  padding: 10px;
  color: #D4D4D4;
  font-size: 12px;
  line-height: 1.35;
  animation: repaint 180ms ease;
}

.markdown-sample p {
  margin: 0 0 8px;
  color: #A6A6A6;
}

.markdown-sample pre {
  margin: 0;
  padding: 10px;
  overflow: hidden;
  border-radius: 8px;
  background: #252526;
}

.markdown-sample code {
  display: grid;
  gap: 1px;
  color: #D4D4D4;
  font-family: var(--font-code);
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
  background: rgba(37, 37, 38, 0.72);
  color: #D4D4D4;
  font-size: 11px;
}

.diagram-sample code {
  display: block;
  color: #A6A6A6;
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
  background: rgba(37, 37, 38, 0.72);
  color: #D4D4D4;
}

.actual-render {
  padding: 10px;
}

.actual-render :deep(.markstream-vue) {
  --markstream-code-font-family: var(--font-code);
  --vscode-editor-font-family: var(--font-code);
  --vscode-editor-font-size: 11px;
  --vscode-editor-line-height: 1.45;
  --vscode-editor-background: #1E1E1E;
  --vscode-editor-foreground: #D4D4D4;
  --vscode-editor-selection: rgba(86, 156, 214, 0.3);
  --code-bg: #1E1E1E;
  --code-fg: #D4D4D4;
  --code-border: rgba(128, 128, 128, 0.22);
  --code-header-bg: #252526;
  --code-action-fg: #A6A6A6;
  --code-action-hover-bg: rgba(86, 156, 214, 0.14);
  --code-action-hover-fg: #FFFFFF;
  font-size: 11px;
  line-height: 1.3;
  padding-bottom: 6px;
}

.actual-render :deep(pre) {
  max-height: none;
  background: #1E1E1E !important;
}

.actual-render :deep(code),
.actual-render :deep(.shiki) {
  font-family: var(--font-code) !important;
  color: #D4D4D4;
}

.actual-render :deep(.monaco-code-block) {
  margin: 0;
  padding: 10px;
  overflow: auto;
  border: 1px solid rgba(128, 128, 128, 0.16);
  border-radius: 6px;
  background: #1E1E1E !important;
  color: #D4D4D4;
  font-family: var(--font-code);
  font-size: 11px;
  line-height: 1.45;
}

.actual-render :deep(.monaco-line) {
  display: block;
  min-height: 1.45em;
  white-space: pre;
}

.actual-render :deep(.monaco-token.keyword) {
  color: #C586C0;
}

.actual-render :deep(.monaco-token.string) {
  color: #CE9178;
}

.actual-render :deep(.monaco-token.constant) {
  color: #B5CEA8;
}

.actual-render :deep(.monaco-token.operator) {
  color: #D4D4D4;
}

.actual-render :deep(.monaco-token.comment) {
  color: #6A9955;
}

.actual-render :deep(.monaco-line.insert) {
  color: #4EC9B0;
}

.actual-render :deep(.monaco-line.delete) {
  color: #F48771;
}

.play-panel footer {
  margin-top: 8px;
}

.play-panel footer span {
  flex: 1 1 30%;
  padding: 5px 7px;
  border: 1px solid rgba(148, 163, 184, 0.16);
  border-radius: 4px;
  background: rgba(30, 30, 30, 0.72);
  color: #A6A6A6;
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
