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
  "> final: 代码高亮、Mermaid、diff 和滚动位置都应该稳稳保住。\n",
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
      <button class="pixel-button compact btn-retro pxl-corner-sm" type="button" @click="running ? pause() : play()">
        {{ running ? "Pause" : "Play" }}
      </button>
      <button class="pixel-button compact btn-retro pxl-corner-sm" type="button" @click="reset">
        Reset
      </button>
      <div class="play-progress">
        <span>{{ step }} / {{ chunks.length }} 段输入</span>
        <i :style="{ width: progress }" />
      </div>
    </div>

    <div class="play-grid">
      <section class="play-panel streamdown pxl-corner-md pxl-shadow">
        <header>
          <span>普通渲染方式</span>
          <b>第 {{ remountCount }} 次重建</b>
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
              选区被重建打断
            </div>
            <div v-if="showMermaid" class="diagram-sample">
              <span>Mermaid</span>
              <code>graph LR; input --&gt; timer --&gt; fn</code>
            </div>
            <pre v-if="showDiff" class="diff-sample"><code>- onInput(run)
+ onInput(debounce(run, 300))</code></pre>
            <blockquote v-if="showFinalNote">
              final: 代码高亮、Mermaid、diff 和滚动位置都应该稳稳保住。
            </blockquote>
          </article>
        </div>
        <footer>
          <span>整块更新</span>
          <span>滚动跳动</span>
          <span>选区中断</span>
        </footer>
      </section>

      <section class="play-panel markstream pxl-corner-md pxl-shadow">
        <header>
          <span>markstream-vue</span>
          <b>内容 + 完成信号</b>
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
          />
        </div>
        <footer>
          <span>完成信号</span>
          <span>平滑跟随滚动</span>
          <span>页面不重建</span>
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
  padding: 10px 12px;
  border: 1px solid var(--retro-border);
  border-radius: 12px;
  background: var(--retro-card);
}

.play-progress {
  position: relative;
  height: 32px;
  overflow: hidden;
  border: 2px solid var(--retro-border);
  background: var(--retro-surface);
}

.play-progress span {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  height: 100%;
  padding: 0 10px;
  color: var(--retro-text);
  font-family: var(--font-pixel-local);
  font-size: 9px;
  text-transform: uppercase;
}

.play-progress i {
  position: absolute;
  inset: 0 auto 0 0;
  background: rgba(0, 255, 136, 0.25);
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
  border: 2px solid var(--retro-border-strong);
  background: var(--retro-card);
}

.play-panel.streamdown {
  border-color: var(--retro-red);
}

.play-panel.markstream {
  border-color: var(--retro-green);
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
  color: var(--retro-cyan);
  font-family: var(--font-pixel-local);
  font-size: 9px;
  font-weight: 700;
  text-transform: uppercase;
}

.play-panel header b {
  color: var(--retro-muted);
  font-family: var(--font-pixel-local);
  font-size: 9px;
  font-weight: 700;
}

.render-host {
  position: relative;
  height: 168px;
  overflow: auto;
  scrollbar-color: var(--retro-cyan) var(--retro-surface);
  scrollbar-width: thin;
  scroll-behavior: smooth;
  border: 2px solid var(--retro-border);
  background: var(--code-bg);
}

.render-host::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

.render-host::-webkit-scrollbar-track {
  background: var(--retro-surface);
}

.render-host::-webkit-scrollbar-thumb {
  background: var(--retro-cyan);
}

.streamdown .render-host {
  scrollbar-color: var(--retro-red) var(--retro-surface);
}

.streamdown .render-host::-webkit-scrollbar-thumb {
  background: var(--retro-red);
}

.markdown-sample {
  padding: 10px;
  color: var(--code-text);
  font-size: 12px;
  line-height: 1.35;
  animation: repaint 180ms ease;
}

.markdown-sample p {
  margin: 0 0 8px;
  color: var(--retro-muted);
}

.markdown-sample pre {
  margin: 0;
  padding: 10px;
  overflow: hidden;
  border: 2px solid var(--retro-border);
  background: var(--code-panel);
}

.markdown-sample code {
  display: grid;
  gap: 1px;
  color: var(--code-text);
  font-family: var(--font-code);
  font-size: 10px;
  line-height: 1.25;
  white-space: pre-wrap;
}

.selection-note {
  display: inline-block;
  margin: 7px 0 0;
  padding: 5px 8px;
  border: 2px solid var(--retro-red);
  background: rgba(127, 29, 29, 0.36);
  color: var(--retro-red);
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
  border: 2px solid var(--retro-border);
  background: var(--retro-surface);
  color: var(--code-text);
  font-size: 11px;
}

.diagram-sample code {
  display: block;
  color: var(--retro-muted);
  white-space: nowrap;
}

.diff-sample {
  margin-top: 7px !important;
}

.markdown-sample blockquote {
  margin: 8px 0 0;
  padding: 8px 10px;
  border: 2px solid var(--retro-green);
  background: rgba(0, 255, 136, 0.08);
  color: var(--code-text);
}

.actual-render {
  padding: 10px;
}

.actual-render :deep(.markstream-vue) {
  --markstream-code-font-family: var(--font-code);
  --vscode-editor-font-family: var(--font-code);
  --vscode-editor-font-size: 11px;
  --vscode-editor-line-height: 1.45;
  --vscode-editor-background: var(--code-bg);
  --vscode-editor-foreground: var(--code-text);
  --vscode-editor-selection: rgba(86, 156, 214, 0.3);
  font-size: 11px;
  line-height: 1.3;
  padding-bottom: 6px;
}

.actual-render :deep(pre) {
  max-height: none;
  background: var(--code-bg) !important;
}

.actual-render :deep(code),
.actual-render :deep(.shiki) {
  font-family: var(--font-code) !important;
  color: var(--code-text);
}

.actual-render :deep(.monaco-code-block) {
  margin: 0;
  padding: 10px;
  overflow: auto;
  border: 2px solid var(--retro-border);
  background: var(--code-bg) !important;
  color: var(--code-text);
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
  color: var(--code-keyword);
}

.actual-render :deep(.monaco-token.string) {
  color: var(--code-string);
}

.actual-render :deep(.monaco-token.constant) {
  color: var(--code-number);
}

.actual-render :deep(.monaco-token.operator) {
  color: var(--code-text);
}

.actual-render :deep(.monaco-token.comment) {
  color: var(--code-comment);
}

.actual-render :deep(.monaco-line.insert) {
  color: var(--accent);
}

.actual-render :deep(.monaco-line.delete) {
  color: var(--code-danger);
}

.play-panel footer {
  margin-top: 8px;
}

.play-panel footer span {
  flex: 1 1 30%;
  padding: 5px 7px;
  border: 2px solid var(--retro-border);
  background: var(--retro-surface);
  color: var(--retro-muted);
  font-family: var(--font-pixel-local);
  font-size: 8px;
  line-height: 1.2;
  text-align: center;
  text-transform: uppercase;
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
