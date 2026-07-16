<script setup>
import { computed, h, nextTick, onBeforeUnmount, onMounted, ref, watch } from "vue";
import MarkdownIt from "markdown-it";
import katex from "katex";
import mermaidBundleUrl from "mermaid/dist/mermaid.min.js?url";
import MarkdownRender, { enableKatex, enableMermaid, preloadCodeBlockRuntime, setCustomComponents, setKatexLoader, setMermaidLoader } from "markstream-vue";
import "katex/dist/katex.min.css";
import "markstream-vue/index.css";

const katexRuntime = {
  ...katex,
  renderToString(source, options = {}) {
    return katex.renderToString(source, { ...options, strict: false });
  },
};

let mermaidRuntimePromise = null;

function normalizeMermaidRuntime(runtime) {
  return runtime?.default ?? runtime;
}

function readMermaidRuntime() {
  return normalizeMermaidRuntime(window.__esbuild_esm_mermaid_nm?.mermaid);
}

function initializeMermaidRuntime(runtime) {
  runtime.initialize({
    startOnLoad: false,
    theme: "dark",
    securityLevel: "loose",
    deterministicIds: true,
  });
  return runtime;
}

function loadMermaidRuntime() {
  if (typeof window === "undefined") return Promise.resolve(null);
  const existing = readMermaidRuntime();
  if (existing) return Promise.resolve(initializeMermaidRuntime(existing));
  if (!mermaidRuntimePromise) {
    mermaidRuntimePromise = new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = mermaidBundleUrl;
      script.async = true;
      script.onload = () => {
        const runtime = readMermaidRuntime();
        if (runtime) resolve(initializeMermaidRuntime(runtime));
        else reject(new Error("Mermaid runtime failed to load"));
      };
      script.onerror = () => reject(new Error("Mermaid bundle failed to load"));
      document.head.appendChild(script);
    });
  }
  return mermaidRuntimePromise;
}

enableKatex();
enableMermaid();
setKatexLoader(() => katexRuntime);
setMermaidLoader(loadMermaidRuntime);

const props = defineProps({
  no: {
    type: Number,
    required: true,
  },
});

const contributors = [
  ["Simon-He95", "/contributors/Simon-He95.png"],
  ["eric8810", "/contributors/eric8810.jpg"],
  ["DaZuiZui", "/contributors/DaZuiZui.jpg"],
];

const moreContributors = [
  "zerob13", "yyhhyyyyyy", "gezhiheng", "l-xiaoshen", "bb-boy680", "Licoy",
  "ysansan98", "zhangmo8", "ashless", "neoragex2002", "bluryar", "Srhui20",
  "KamilBeda", "yuguaa", "donglize521521", "tomorrowthief", "s3d-i", "rzzf",
  "little077", "emmm1245", "cyyjs", "ZKunZhang", "WuMingDao", "tt-a1i",
  "Asaki-M", "AndersonBY",
];

const modelCards = [
  ["GPT-4o", "128K context", "4o / 4o-mini", "OpenAI 2024-05 发布，多模态原生"],
  ["Claude 3.5 Sonnet", "200K context", "Sonnet / Haiku / Opus", "Anthropic 2024-06 发布，长文本领先"],
  ["Kimi K1.5", "200K context", "Moonshot 长文本", "Kimi 2024-10 发布，中文长文本场景优化"],
  ["Gemini 1.5 Pro", "1M-2M context", "Flash / Pro", "Google 2024-02 发布，原生 1M+ 上下文"],
  ["GLM-4", "128K context", "9B / 32B / 基座", "智谱 AI 2024-01 发布，中文开源生态"],
];

const stressEvidence = [
  ["diff code fence", "24.1×", "less scripting", "280→12ms", "DOM 325→41", "update 4.2×"],
  ["TypeScript fence", "16.6×", "less scripting", "237→14ms", "DOM 219→25", "update 2.7×"],
  ["Mermaid fence", "15.9×", "less scripting", "268→17ms", "DOM 419→53", "update 4.0×"],
];

const stressBlocks = [
  ["code / diff", "highlight 重块"],
  ["Mermaid", "图表重块"],
  ["KaTeX", "math 重块"],
];

const parserBenchmarkRows = [
  ["5K", "0.0370ms", "0.1864ms", "5.0×"],
  ["50K", "0.3166ms", "1.8776ms", "5.9×"],
  ["100K", "0.7012ms", "3.8789ms", "5.5×"],
  ["200K", "1.8757ms", "8.9453ms", "4.8×"],
];

const quickStartPreview = `- **流式渲染** 实时更新 Markdown
- 支持 \`代码块\` 和 [链接](https://github.com)
- 表格、列表、任务、引用全部稳定

> 这就是 3 行代码能做到的效果。`;

const streamCustomId = "slide-stream-demo";
const streamMermaidProps = {
  showHeader: false,
  showModeToggle: false,
  showZoomControls: false,
  showCopyButton: false,
  showExportButton: false,
  showFullscreenButton: false,
  estimatedPreviewHeightPx: 150,
  maxHeight: "170px",
};
const streamCodeBlockProps = {
  showHeader: false,
  showCopyButton: false,
  showExpandButton: false,
  showPreviewButton: false,
  showCollapseButton: false,
  showFontSizeButtons: false,
  enableFontSizeControl: false,
  theme: { light: "vitesse-light", dark: "vitesse-dark" },
  minWidth: "100%",
  maxWidth: "100%",
  monacoOptions: {
    MAX_HEIGHT: 150,
    fontSize: 10,
    lineHeight: 15,
    readOnly: true,
    wordWrap: "on",
    diffWordWrap: "on",
    renderSideBySide: false,
    useInlineViewWhenSpaceIsLimited: true,
    lineDecorationsWidth: 2,
    lineNumbersMinChars: 1,
    renderMarginRevertIcon: false,
    scrollBeyondLastLine: false,
    automaticLayout: true,
    minimap: { enabled: false },
    lineNumbers: "on",
    glyphMargin: false,
    folding: false,
    renderLineHighlight: "none",
    scrollbar: {
      vertical: "hidden",
      horizontal: "hidden",
      handleMouseWheel: false,
    },
    updateThrottleMs: 0,
    diffUpdateThrottleMs: 0,
  },
};
const compareTraditionalHtml = ref("");
const compareFlash = ref(false);
let compareFlashTimer = 0;

function triggerCompareFlash() {
  if (compareFlashTimer) {
    window.clearTimeout(compareFlashTimer);
  }
  compareFlash.value = true;
  compareFlashTimer = window.setTimeout(() => {
    compareFlash.value = false;
  }, 180);
}

const streamCustomTags = ["thinking", "tool-result", "component-card"];

function streamCustomBlock(type) {
  return {
    props: {
      node: {
        type: Object,
        required: true,
      },
    },
    setup(props) {
      return () => {
        const content = String(props.node.content ?? "").replace(/\s*<\/[a-z0-9-]*\s*$/i, "");
        return h("span", { class: ["attach-stream-custom", `attach-stream-custom-${type}`] }, content);
      };
    },
  };
}

setCustomComponents(streamCustomId, {
  thinking: streamCustomBlock("thinking"),
  "tool-result": streamCustomBlock("tool-result"),
  "component-card": streamCustomBlock("component-card"),
});

const demoMarkdown = `# AI 回复：流式渲染任务

> streaming · chunk 18 / 96 · 用户正在滚动

## 当前目标

把一段还没结束的 Markdown 一边接收、一边渲染成稳定 UI。

- **段落**、_强调_、\`inline code\`
- [文档链接](https://github.com/Simon-He95/markstream-vue)
- 重块：\`code\` / \`diff\` / \`mermaid\` / \`katex\`

1. 接收 delta
2. 只处理尾部不稳定区域
3. 已稳定节点继续复用

| stage | traditional | markstream-vue |
| --- | ---: | ---: |
| parse | full document | tail window |
| render | replace all | patch nodes |
| scroll | can drift | stable |

\`\`\`ts
for await (const delta of stream) {
  renderer.push(delta)
  scheduler.commit({ budget: 4 })
}
\`\`\`

\`\`\`diff
- const html = markdownIt.render(fullText)
- container.innerHTML = html
+ patchStableNodes(tokens.tail)
+ keepScrollAnchor(anchor)
\`\`\`

\`\`\`mermaid
graph LR
  A[LLM chunk] --> B{stable?}
  B -->|no| C[dirty tail]
  B -->|yes| D[reuse node]
  C --> E[patch Vue tree]
\`\`\`

$$
E = mc^2,\quad \int_0^1 x^2\,dx = \frac{1}{3}
$$

\`\`\`json
{"chunk": 18, "mode": "tail-patch", "budget": "4ms"}
\`\`\`

<thinking>
checking frame budget and scroll lock...
</thinking>

<tool-result status="ok">
docs matched: 12 · reused blocks: 7
</tool-result>

<component-card>
update→rAF target: under 16.7ms · DOM should stay small
</component-card>`;

const codeStressMarkdown = `# Renderer stress：code / diff

> 这条 case 专门模拟 AI 持续输出代码块和 patch diff。

\`\`\`ts
type Chunk = { id: string; delta: string; final?: boolean }

export function pushChunk(chunks: Chunk[], next: Chunk) {
  const prev = chunks.at(-1)
  if (prev && !prev.final) {
    return [...chunks.slice(0, -1), { ...prev, delta: prev.delta + next.delta }]
  }
  return [...chunks, next]
}
\`\`\`

\`\`\`diff
- const html = markdownIt.render(answer)
- root.innerHTML = html
+ const nodes = parser.append(delta)
+ renderer.patch(nodes.tail)
+ keepSelectionAndScroll()
\`\`\`

\`\`\`ts
for await (const event of response.body) {
  buffer += decoder.decode(event)
  schedule(() => render(buffer), { budget: 4 })
}
\`\`\`

\`\`\`diff
- rerenderEveryBlock()
- mountCodeHighlighterAgain()
+ reuseStableBlocks()
+ highlightOnlyOpenFence()
\`\`\``;

const diagramMathStressMarkdown = `# Renderer stress：Mermaid + KaTeX

> 这条 case 专门模拟图表和数学公式在 stream 中还没闭合、不断变长。

\`\`\`mermaid
sequenceDiagram
  participant LLM
  participant Parser
  participant Vue
  participant DOM
  LLM->>Parser: delta
  Parser->>Parser: dirty tail
  Parser->>Vue: stable nodes + tail
  Vue->>DOM: patch only changed nodes
\`\`\`

$$
\\mathcal{L}(\\theta) = \\sum_{t=1}^{n} \\log p_\\theta(y_t \\mid y_{<t}, x)
$$

\`\`\`mermaid
graph LR
  A[dirty tail] --> B{complete?}
  B -->|yes| C[render]
  B -->|no| D[fallback]
  C --> E[stable node]
  D --> E
\`\`\`

$$
\\nabla_\\theta J(\\theta) = \\mathbb{E}_{\\pi_\\theta}\\!\\left[\\sum_t \\nabla_\\theta \\log \\pi_\\theta(a_t \\mid s_t) A_t\\right]
$$`;

const fullStreamMarkdown = `${demoMarkdown}

---

${codeStressMarkdown}

---

${diagramMathStressMarkdown}`;

function escapeHtml(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function highlightTs(code) {
  return escapeHtml(code)
    .replace(/\b(export|function|return|const|string)\b/g, '<span class="tok kw">$1</span>')
    .replace(/\b(markdownIt|render|schedule|answer|delta)\b/g, '<span class="tok prop">$1</span>');
}

const plainMarkdown = new MarkdownIt({ html: true, linkify: true, breaks: true });
const highlightedMarkdown = new MarkdownIt({
  html: true,
  linkify: true,
  breaks: true,
  highlight(code, lang) {
    if (lang === "ts") {
      return `<pre class="attach-demo-code highlighted"><code>${highlightTs(code)}</code></pre>`;
    }
    return `<pre class="attach-demo-code"><code>${escapeHtml(code)}</code></pre>`;
  },
});

let richRenderSeq = 0;

function renderKatexBlock(source) {
  return katex.renderToString(source.trim(), {
    displayMode: true,
    throwOnError: false,
    strict: false,
    trust: false,
  });
}

async function renderMermaidBlock(source) {
  const id = `attach-mermaid-${props.no}-${richRenderSeq++}`;
  try {
    const runtime = await loadMermaidRuntime();
    if (!runtime) throw new Error("Mermaid runtime unavailable");
    const { svg } = await runtime.render(id, source.trim());
    return svg;
  } catch (error) {
    return `<pre class="attach-rich-fallback"><code>${escapeHtml(source)}</code></pre>`;
  }
}

async function renderRichMarkdown(content, md) {
  let next = content;
  const mermaidBlocks = [...next.matchAll(/```mermaid\s*\n([\s\S]*?)\n```/g)];
  for (const block of mermaidBlocks) {
    const svg = await renderMermaidBlock(block[1]);
    next = next.replace(block[0], `\n<div class="attach-mermaid-block">${svg}</div>\n`);
  }
  next = next.replace(/\$\$\s*\n?([\s\S]*?)\n?\s*\$\$/g, (_, math) => {
    return `\n<div class="attach-katex-block">${renderKatexBlock(math)}</div>\n`;
  });
  return md.render(next);
}

const authorProjects = [
  ["markstream-vue", "/markstream-logo.svg", "Streaming Markdown"],
  ["vscode-use", "/project-logos/vscode-use.png", "AI coding workflow"],
  ["awesome-compressor", "/project-logos/awesome-compressor.png", "Local compression"],
];

const involvedProjects = [
  ["UnoCSS", "/project-logos/unocss.png", "Maintainer"],
  ["DeepChat", "/project-logos/deepchat.png", "Maintainer"],
  ["Vue Vine", "/project-logos/vue-vine.png", "Maintainer"],
];

const vscodePlugins = [
  ["Common Intellisense", "DX"],
  ["UnoT", "UnoCSS"],
  ["Tailwind Magic", "Tailwind CSS"],
  ["Alias Jump", "Navigation"],
];

const slides = {
  1: {
    kind: "cover",
    kicker: "VUE CONF · KEYNOTE",
    section: "MARKSTREAM-VUE",
    title: "你的 Markdown 渲染器，扛得住 AI 输出吗？",
    subtitle: "当模型返回更快、内容更长、形态更复杂，Markdown 渲染器会从“展示组件”变成“产品基础设施”。",
    footer: "Simon He / Simon-He95",
  },
  2: {
    kind: "about",
    kicker: "ABOUT SIMON",
    section: "ABOUT ME",
    title: "前端开发者 / 开源维护者，长期在 Vue、DX 和 AI UI 交叉处做工具。",
  },
  3: {
    kind: "why",
    kicker: "WHY NOW",
    section: "BACKGROUND",
    title: "上下文窗口从 128K 推向 1M+，浏览器的压力跟着放大。",
  },
  4: {
    kind: "problem",
    kicker: "PROBLEM",
    section: "BOTTLENECK SHIFT",
    title: "模型越快，浏览器越容易先成为瓶颈。",
  },
  5: {
    kind: "old",
    kicker: "OLD WORLD",
    section: "TRADITIONAL RENDERING",
    title: "早期方案很简单：完整字符串进来，HTML 出去。",
    codeHtml: `<span class="tok kw">const</span> html <span class="tok op">=</span> markdownIt.<span class="tok prop">render</span>(markdown)
container.<span class="tok prop">innerHTML</span> <span class="tok op">=</span> html

<span class="tok comment">// code block</span>
<span class="tok tag">&lt;pre&gt;&lt;code&gt;</span>npm install vue<span class="tok tag">&lt;/code&gt;&lt;/pre&gt;</span>`,
  },
  6: {
    kind: "old-demo",
    kicker: "DEMO · MARKDOWN-IT",
    section: "FULL REPLACE DEMO",
    title: "单独看传统 markdown-it：每个 chunk 都是 full document。",
  },
  7: {
    kind: "highlight",
    kicker: "HIGHLIGHT ERA",
    section: "BETTER LOOK, WORSE COST",
    title: "后来我们加上 highlight.js / Shiki，代码好看了，成本也更高了。",
    codeHtml: `md.<span class="tok prop">set</span>({
  <span class="tok prop">highlight</span>(code, lang) {
    <span class="tok kw">return</span> hljs.<span class="tok prop">highlight</span>(code, { <span class="tok prop">language</span>: lang }).<span class="tok prop">value</span>
  }
})`,
  },
  8: {
    kind: "highlight-demo",
    kicker: "DEMO · HIGHLIGHT",
    section: "HEAVY BLOCK DEMO",
    title: "把 code / Mermaid / KaTeX 放进 stream，full render 的差距才会炸开。",
  },
  9: {
    kind: "loop",
    kicker: "COST MODEL",
    section: "FULL PARSE LOOP",
    title: "传统 parser 的核心问题：每个增量都像第一次渲染。",
  },
  10: {
    kind: "core",
    kicker: "CORE MECHANISM",
    section: "PARSER + VUE LAYER",
    title: "markstream-vue：dirty tail 解析 + 稳定节点复用 + 帧预算调度。",
    parserCode: `<span class="tok comment">// stream-markdown-parser: 只处理尾部不稳定区域</span>
<span class="tok kw">function</span> <span class="tok prop">parseDelta</span>(delta) {
  <span class="tok kw">const</span> stable <span class="tok op">=</span> findStablePrefix(tokens, delta)
  <span class="tok kw">const</span> tail <span class="tok op">=</span> parseDirtyTail(delta)
  <span class="tok kw">return</span> { stable, tail, reusable: stable.nodes }
}`,
    vueCode: `<span class="tok comment">// markstream-vue: 复用稳定节点，只 patch 尾部</span>
<span class="tok tag">&lt;MarkdownRender</span>
  <span class="tok attr">:content</span><span class="tok op">=</span><span class="tok str">"stream"</span>
  <span class="tok attr">:final</span><span class="tok op">=</span><span class="tok str">"done"</span>
  <span class="tok attr">:batch-rendering</span><span class="tok op">=</span><span class="tok str">"true"</span>
<span class="tok tag">/&gt;</span>`,
  },
  11: {
    kind: "core-demo",
    kicker: "DEMO · MARKSTREAM-VUE",
    section: "INCREMENTAL RENDER DEMO",
    title: "同样的重块语料，markstream-vue 只处理 dirty tail。",
  },
  12: {
    kind: "quickstart",
    kicker: "QUICK START",
    section: "GET STARTED IN 3 LINES",
    title: "今晚就能试：一个组件 + 两个 props。",
    codeHtml: `<span class="tok kw">import</span> MarkdownRender <span class="tok kw">from</span> <span class="tok str">"markstream-vue"</span>

<span class="tok tag">&lt;MarkdownRender</span>
  <span class="tok attr">:content</span><span class="tok op">=</span><span class="tok str">"answer"</span>
  <span class="tok attr">:final</span><span class="tok op">=</span><span class="tok str">"done"</span>
<span class="tok tag">/&gt;</span>`,
  },
  13: {
    kind: "perf",
    kicker: "PERF STORY",
    section: "PERFORMANCE EVIDENCE",
    title: "1.0.5 的性能收益来自机制变化：少 parse、少 patch、少 layout drift。",
    benchmarkEnv: "Chrome 126 · Vue 3.4 · production build · 30-run median, 5× warm-up · Apple M3 / AMD 7940HS",
  },
  14: {
    kind: "parser-benchmark",
    kicker: "PARSER ENGINE",
    section: "MARKDOWN-IT-TS BENCHMARK",
    title: "快不只来自更新模型，底层 parser 本身也在同规模解析里更快。",
    benchmarkEnv: "markdown-it-ts@1.0.4 · README latest perf snapshot · one-shot parse",
  },
  15: {
    kind: "scheduler",
    kicker: "SCHEDULER",
    section: "MAIN THREAD BUDGET",
    title: "真正的优化不是“更快地抢主线程”，而是给交互留预算。",
  },
  16: {
    kind: "content",
    kicker: "CONTENT TYPES",
    section: "MARKDOWN AS UI PROTOCOL",
    title: "AI 输出不只会写 Markdown，也会输出可组件化结构。",
    codeHtml: `<span class="tok tag">&lt;thinking&gt;</span>checking constraints...<span class="tok tag">&lt;/thinking&gt;</span>

<span class="tok tag">&lt;tool-call</span> <span class="tok attr">name</span><span class="tok op">=</span><span class="tok str">"search_docs"</span> <span class="tok tag">/&gt;</span>

<span class="tok tag">&lt;tool-result</span> <span class="tok attr">status</span><span class="tok op">=</span><span class="tok str">"ok"</span><span class="tok tag">&gt;</span>
  {...}
<span class="tok tag">&lt;/tool-result&gt;</span>

<span class="tok tag">&lt;component</span> <span class="tok attr">name</span><span class="tok op">=</span><span class="tok str">"Chart"</span> <span class="tok tag">/&gt;</span>`,
    previewHtml: `<div class="attach-preview-line"><span class="attach-preview-badge thinking">thinking</span><span class="attach-preview-value">checking constraints...</span></div>
<div class="attach-preview-line"><span class="attach-preview-badge tool-call">tool-call</span><span class="attach-preview-value">search_docs</span></div>
<div class="attach-preview-line"><span class="attach-preview-badge tool-result">tool-result</span><span class="attach-preview-value">ok</span></div>
<div class="attach-preview-line"><span class="attach-preview-badge component">component</span><span class="attach-preview-value">Chart</span></div>`,
  },
  17: {
    kind: "api",
    kicker: "ADVANCED API",
    section: "CUSTOMIZATION",
    title: "需要自定义组件或流式协议时，打开这几个配置项。",
    codeHtml: `<span class="tok kw">import</span> MarkdownRender, { setCustomComponents } <span class="tok kw">from</span> <span class="tok str">"markstream-vue"</span>

setCustomComponents(<span class="tok str">"chat"</span>, {
  <span class="tok str">"thinking"</span>: ThinkingBlock,
  <span class="tok str">"tool-result"</span>: ToolResult
})

<span class="tok kw">const</span> customTags <span class="tok op">=</span> [<span class="tok str">"thinking"</span>, <span class="tok str">"tool-result"</span>]

<span class="tok tag">&lt;MarkdownRender</span>
  <span class="tok attr">:content</span><span class="tok op">=</span><span class="tok str">"answer"</span>
  <span class="tok attr">:final</span><span class="tok op">=</span><span class="tok str">"done"</span>
  <span class="tok attr">custom-id</span><span class="tok op">=</span><span class="tok str">"chat"</span>
  <span class="tok attr">:custom-html-tags</span><span class="tok op">=</span><span class="tok str">"customTags"</span>
  <span class="tok attr">:max-live-nodes</span><span class="tok op">=</span><span class="tok str">"0"</span>
  <span class="tok attr">:batch-rendering</span><span class="tok op">=</span><span class="tok str">"true"</span>
<span class="tok tag">/&gt;</span>`,
  },
  18: {
    kind: "playbook",
    kicker: "OPERATING PLAYBOOK",
    section: "HOW TO USE IT",
    title: "把流式 Markdown 当基础设施，需要几个明确的工程边界。",
  },
  19: {
    kind: "ecosystem",
    kicker: "ECOSYSTEM",
    section: "WHERE IT FITS",
    title: "markstream-vue 不是替代所有 Markdown 工具，而是补上 AI stream 的这一层。",
  },
  20: {
    kind: "thanks",
    kicker: "THANKS",
    section: "CORE CONTRIBUTORS",
    title: "感谢核心维护者，以及背后 26 位社区贡献者。",
  },
  21: {
    kind: "qa",
    kicker: "Q&A",
    section: "CONTACT",
    title: "谢谢 · 问答与讨论",
  },
};

const current = computed(() => slides[props.no] ?? slides[1]);
const page = computed(() => String(props.no).padStart(2, "0"));
const mRoles = {
  cover: "MARKDOWN",
  about: "MAKER",
  why: "MODEL",
  problem: "MAIN",
  old: "MONOLITH",
  "old-demo": "MUTATE",
  highlight: "MARKUP",
  "highlight-demo": "MAXIMUM",
  loop: "MULTIPLY",
  core: "MINIMIZE",
  "core-demo": "MINIMAL",
  perf: "MEASURE",
  "parser-benchmark": "MILLISECONDS",
  compare: "MUTATE",
  scheduler: "MILLISECONDS",
  content: "MESSAGE",
  api: "METHOD",
  playbook: "MANUAL",
  ecosystem: "MAP",
  thanks: "MAINTAINERS",
  qa: "MARKSTREAM",
};
const mRole = computed(() => mRoles[current.value.kind] ?? "MARKSTREAM");
const mTargetMode = computed(() => {
  if (current.value.kind === "cover") return "logo";
  if (current.value.kind === "qa") return "markdown";
  return props.no % 2 === 0 ? "letter" : "background";
});
const streamDelay = ref(8);
const streamChunkSize = ref(8);
const streamRunning = ref(false);
const streamIndex = ref(0);
const streamUpdates = ref(0);
const streamContent = ref("");
const streamRenderedHtml = ref("");
const streamLastRenderMs = ref(0);
const streamCpuPercent = ref(0);
const streamFrameP95 = ref(0);
const streamPaints = ref(0);
const streamHeapMb = ref(0);
const streamHeapAvailable = ref(false);
const streamDomNodes = ref(0);
const streamLastChunk = ref(0);
const streamAutoFollow = ref(true);
const streamSourceRef = ref(null);
const streamHostRef = ref(null);
const streamSamples = [];
const streamCpuSamples = [];
let streamTimer = 0;
let streamScrollTimer = 0;
let streamFollowTimer = 0;
let streamFollowStopTimer = 0;

watch(streamContent, () => {
  if (current.value.kind === "compare" || current.value.kind === "old-demo") {
    triggerCompareFlash();
  }
  if (current.value.kind === "old-demo" && streamHostRef.value) {
    streamHostRef.value.classList.add("flash-active");
    window.setTimeout(() => {
      if (streamHostRef.value) streamHostRef.value.classList.remove("flash-active");
    }, 200);
  }
  if (current.value.kind === "highlight-demo" && streamHostRef.value) {
    streamHostRef.value.classList.add("lag-active");
    window.setTimeout(() => {
      if (streamHostRef.value) streamHostRef.value.classList.remove("lag-active");
    }, 200);
  }
});

const activeStreamMarkdown = computed(() => fullStreamMarkdown);
const streamDone = computed(() => streamIndex.value >= activeStreamMarkdown.value.length);
const streamProgress = computed(() => Math.round((streamIndex.value / activeStreamMarkdown.value.length) * 100));
const streamStatus = computed(() => {
  if (streamRunning.value) return "streaming";
  if (streamDone.value) return "done";
  return "ready";
});
const streamParseScope = computed(() => {
  if (!streamIndex.value) return "0";
  if (current.value.kind === "core-demo") {
    return `tail ${Math.min(streamIndex.value, streamLastChunk.value + 32)}`;
  }
  if (current.value.kind === "highlight-demo") {
    return `full ${streamIndex.value}+hi`;
  }
  return `full ${streamIndex.value}`;
});
const streamRerenderScope = computed(() => {
  if (!streamUpdates.value) return "0";
  if (current.value.kind === "core-demo") return `patch ${streamUpdates.value}x`;
  return `full ${streamUpdates.value}x`;
});
const streamPrimaryMetrics = computed(() => {
  const isCore = current.value.kind === "core-demo";
  const parseWindow = Math.min(streamIndex.value, streamLastChunk.value + 32);
  const parseDelta = isCore
    ? parseWindow ? `${Math.max(1, Math.round(streamIndex.value / parseWindow))}× less parse window` : "waiting for dirty tail"
    : "cost grows with output";
  return [
    [
      isCore ? "parse only dirty tail" : "parse full document",
      streamParseScope.value,
      isCore ? parseDelta : current.value.kind === "highlight-demo" ? "code / Mermaid / KaTeX blocks repeat" : "every chunk re-reads the answer",
    ],
    [
      isCore ? "patch stable UI" : "replace whole DOM",
      streamRerenderScope.value,
      isCore ? "stable prefix and nodes stay alive" : "scroll and component state can be disturbed",
    ],
  ];
});
const streamTelemetryMetrics = computed(() => [
  ["main %", formatPercent(streamCpuPercent.value)],
  ["rAF p95", `${streamFrameP95.value.toFixed(1)}ms`],
  ["heap", streamHeapAvailable.value ? `${streamHeapMb.value.toFixed(1)}MB` : "n/a"],
  ["DOM", String(streamDomNodes.value)],
]);
const streamCaption = computed(() => {
  if (current.value.kind === "core-demo") {
    return "main%=sync parser/render work ÷ delay，不是系统 CPU · rAF p95=update→next frame";
  }
  if (current.value.kind === "highlight-demo") {
    return "full document + code/Mermaid/KaTeX 重块反复进 highlight/render · rerender=full replace";
  }
  return "parse=full document · rerender=full replace · main%=sync work ÷ delay";
});

function clearStreamTimer() {
  if (streamTimer) {
    window.clearTimeout(streamTimer);
    streamTimer = 0;
  }
}

function clearStreamScrollTimer() {
  if (streamScrollTimer) {
    window.clearTimeout(streamScrollTimer);
    streamScrollTimer = 0;
  }
}

function clearStreamFollowTimers() {
  if (streamFollowTimer) {
    window.clearInterval(streamFollowTimer);
    streamFollowTimer = 0;
  }
  if (streamFollowStopTimer) {
    window.clearTimeout(streamFollowStopTimer);
    streamFollowStopTimer = 0;
  }
}

function percentile95(values) {
  if (!values.length) return 0;
  const sorted = [...values].sort((a, b) => a - b);
  return sorted[Math.min(sorted.length - 1, Math.floor(sorted.length * 0.95))];
}

function average(values) {
  if (!values.length) return 0;
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

function formatPercent(value) {
  if (streamUpdates.value && value < 1) return "<1%";
  return `${value.toFixed(0)}%`;
}

function readHeapMb() {
  const memory = performance.memory;
  if (!memory) return null;
  return memory.usedJSHeapSize / 1048576;
}

function scrollStreamPanes() {
  if (!streamAutoFollow.value) return;
  if (streamSourceRef.value) {
    streamSourceRef.value.scrollTop = streamSourceRef.value.scrollHeight;
  }
  if (streamHostRef.value) {
    streamHostRef.value.scrollTop = streamHostRef.value.scrollHeight;
  }
}

function scheduleStreamScroll() {
  clearStreamScrollTimer();
  if (!streamAutoFollow.value || !streamRunning.value) return;
  scrollStreamPanes();
  window.requestAnimationFrame(scrollStreamPanes);
  streamScrollTimer = window.setTimeout(() => {
    scrollStreamPanes();
    streamScrollTimer = window.setTimeout(scrollStreamPanes, 240);
  }, streamDelay.value + 80);
}

function startStreamFollow() {
  if (streamFollowStopTimer) {
    window.clearTimeout(streamFollowStopTimer);
    streamFollowStopTimer = 0;
  }
  if (!streamFollowTimer) {
    streamFollowTimer = window.setInterval(scrollStreamPanes, 100);
  }
}

function stopStreamFollow(delay = 0) {
  if (!delay) {
    clearStreamFollowTimers();
    return;
  }
  if (streamFollowStopTimer) window.clearTimeout(streamFollowStopTimer);
  streamFollowStopTimer = window.setTimeout(clearStreamFollowTimers, delay);
}

function finishStreamFollow() {
  if (!streamAutoFollow.value) {
    stopStreamFollow();
    return;
  }
  scrollStreamPanes();
  window.requestAnimationFrame(scrollStreamPanes);
  startStreamFollow();
  if (streamFollowStopTimer) window.clearTimeout(streamFollowStopTimer);
  streamFollowStopTimer = window.setTimeout(() => {
    scrollStreamPanes();
    window.requestAnimationFrame(() => {
      scrollStreamPanes();
      clearStreamFollowTimers();
      streamAutoFollow.value = false;
    });
  }, 2500);
}

function isStreamPaneAtBottom(element) {
  if (!element) return true;
  return element.scrollTop + element.clientHeight >= element.scrollHeight - 3;
}

function handleStreamScroll(event) {
  if (!streamRunning.value) return;
  if (isStreamPaneAtBottom(event.currentTarget)) streamAutoFollow.value = true;
}

function handleStreamManualScroll() {
  if (!streamRunning.value && !streamFollowTimer) return;
  streamAutoFollow.value = false;
  clearStreamFollowTimers();
}

async function updateStreamRender(nextContent) {
  const start = performance.now();
  streamContent.value = nextContent;
  if (current.value.kind === "highlight-demo") {
    streamRenderedHtml.value = await renderRichMarkdown(nextContent, highlightedMarkdown);
  } else if (current.value.kind === "old-demo") {
    streamRenderedHtml.value = await renderRichMarkdown(nextContent, plainMarkdown);
  } else if (current.value.kind === "compare") {
    compareTraditionalHtml.value = await renderRichMarkdown(nextContent, highlightedMarkdown);
  }
  streamLastRenderMs.value = performance.now() - start;
  await nextTick();
  scheduleStreamScroll();
  streamCpuSamples.push(Math.min(100, (streamLastRenderMs.value / Math.max(streamDelay.value, 1)) * 100));
  if (streamCpuSamples.length > 60) streamCpuSamples.shift();
  streamCpuPercent.value = average(streamCpuSamples);
  const heapMb = readHeapMb();
  streamHeapAvailable.value = heapMb !== null;
  streamHeapMb.value = heapMb ?? 0;
  streamDomNodes.value = streamHostRef.value?.querySelectorAll("*").length ?? 0;
  window.requestAnimationFrame(() => {
    streamSamples.push(performance.now() - start);
    if (streamSamples.length > 60) streamSamples.shift();
    streamFrameP95.value = percentile95(streamSamples);
    streamPaints.value += 1;
  });
}

async function streamTick() {
  if (!streamRunning.value) return;
  const markdown = activeStreamMarkdown.value;
  const nextIndex = Math.min(markdown.length, streamIndex.value + streamChunkSize.value);
  streamLastChunk.value = nextIndex - streamIndex.value;
  streamIndex.value = nextIndex;
  streamUpdates.value += 1;
  await updateStreamRender(markdown.slice(0, nextIndex));
  if (streamDone.value) {
    const shouldFollowFinalRender = streamAutoFollow.value;
    streamRunning.value = false;
    clearStreamTimer();
    clearStreamScrollTimer();
    if (shouldFollowFinalRender) {
      finishStreamFollow();
    } else {
      streamAutoFollow.value = false;
      stopStreamFollow();
    }
    return;
  }
  streamTimer = window.setTimeout(streamTick, streamDelay.value);
}

function playStream() {
  if (streamDone.value) resetStream();
  if (streamRunning.value) return;
  streamAutoFollow.value = true;
  streamRunning.value = true;
  startStreamFollow();
  streamTimer = window.setTimeout(streamTick, streamDelay.value);
}

function pauseStream() {
  streamRunning.value = false;
  streamAutoFollow.value = false;
  clearStreamTimer();
  stopStreamFollow();
}

function toggleStream() {
  if (streamRunning.value) {
    pauseStream();
  } else {
    playStream();
  }
}

function isCurrentSlideRoute() {
  return Number(window.location.pathname.split("/").filter(Boolean)[0] || 1) === props.no;
}

function isStreamDemoKind() {
  return current.value.kind === "old-demo"
    || current.value.kind === "highlight-demo"
    || current.value.kind === "core-demo"
    || current.value.kind === "compare";
}

function handleStreamDemoKeydown(event) {
  if (event.key !== "ArrowRight" || !isStreamDemoKind() || !isCurrentSlideRoute()) return;
  if (streamDone.value) return;
  event.preventDefault();
  event.stopImmediatePropagation();
  if (!streamRunning.value) playStream();
}

function resetStream() {
  pauseStream();
  clearStreamScrollTimer();
  streamIndex.value = 0;
  streamUpdates.value = 0;
  streamContent.value = "";
  streamRenderedHtml.value = "";
  compareTraditionalHtml.value = "";
  streamLastRenderMs.value = 0;
  streamCpuPercent.value = 0;
  streamFrameP95.value = 0;
  streamPaints.value = 0;
  streamHeapMb.value = 0;
  streamHeapAvailable.value = false;
  streamDomNodes.value = 0;
  streamLastChunk.value = 0;
  streamAutoFollow.value = true;
  streamSamples.length = 0;
  streamCpuSamples.length = 0;
}

onMounted(() => {
  window.addEventListener("keydown", handleStreamDemoKeydown, { capture: true });
  preloadCodeBlockRuntime();
});

onBeforeUnmount(() => {
  window.removeEventListener("keydown", handleStreamDemoKeydown, { capture: true });
  clearStreamTimer();
  clearStreamScrollTimer();
  clearStreamFollowTimers();
});
</script>

<template>
  <section class="attachment-deck" :class="`attachment-${current.kind}`">
    <div class="attach-grid-bg"></div>
    <div
      class="attach-m-field"
      :class="{ 'logo-flight-target': mTargetMode === 'background' }"
      data-logo-mode="background"
      :data-logo-page="props.no"
      :data-logo-active="mTargetMode === 'background' ? 'true' : undefined"
      aria-hidden="true"
    ></div>
    <div class="attach-bg-mark" aria-hidden="true"></div>
    <div class="attach-top-rule"></div>

    <header class="attach-header">
      <span class="attach-header-brand">
        <span>{{ current.kicker }}</span>
      </span>
      <span>{{ page }}</span>
    </header>

    <main class="attach-main">
      <template v-if="current.kind === 'cover'">
        <div class="attach-cover-copy">
          <span class="attach-section">{{ current.section }}</span>
          <h1 class="attach-cover-title">
            <span>你的 Markdown</span>
            <span>渲染器，扛得住</span>
            <span>AI 输出吗？</span>
          </h1>
          <p>{{ current.subtitle }}</p>
          <div class="attach-cover-cards">
            <article class="attach-card">
              <span>挑战</span>
              <b>高频 + 长文 + 组件化</b>
              <small>浏览器主线程也要扛住 AI 的吐字速度</small>
            </article>
            <article class="attach-card accent">
              <span>方案</span>
              <b>markstream-vue</b>
              <small>给 Vue 用的流式 Markdown 渲染器</small>
            </article>
          </div>
        </div>
        <div class="attach-logo-stage" aria-label="markstream-vue renderer core">
          <span class="attach-stage-label">AI OUTPUT RENDERER</span>
          <div class="attach-logo-blueprint">
            <i class="attach-axis attach-axis-x"></i>
            <i class="attach-axis attach-axis-y"></i>
            <i class="attach-ring attach-ring-a"></i>
            <i class="attach-ring attach-ring-b"></i>
            <i class="attach-node attach-node-1"></i>
            <i class="attach-node attach-node-2"></i>
            <i class="attach-node attach-node-3"></i>
            <i class="attach-node attach-node-4"></i>
            <img
              class="cover-logo attach-stage-logo logo-flight-target"
              src="/markstream-logo.svg"
              alt="markstream-vue logo"
              data-logo-mode="logo"
              :data-logo-page="props.no"
              :data-logo-active="mTargetMode === 'logo' ? 'true' : undefined"
            >
          </div>
          <div class="attach-logo-streams" aria-hidden="true">
            <span>content</span>
            <span>thinking</span>
            <span>tool-result</span>
            <span>component</span>
          </div>
        </div>
      </template>

      <template v-else>
        <div class="attach-title-row">
          <span class="attach-section">{{ current.section }}</span>
          <div class="attach-title-lockup" :class="{ 'without-title-m': mTargetMode !== 'letter' }">
            <span
              v-if="mTargetMode === 'letter'"
              class="attach-title-m logo-flight-target"
              data-logo-mode="letter"
              :data-logo-page="props.no"
              data-logo-active="true"
            >
              <b>M</b>
              <small>{{ mRole }}</small>
            </span>
            <h1 v-if="mTargetMode === 'markdown'" class="attach-markdown-title">
              你的
              <span
                class="attach-inline-m logo-flight-target"
                data-logo-mode="inline-letter"
                :data-logo-page="props.no"
                data-logo-active="true"
              >M</span>arkdown 渲染器，扛得住 AI 输出吗？
            </h1>
            <h1 v-else>{{ current.title }}</h1>
          </div>
        </div>

        <div v-if="current.kind === 'about'" class="attach-about-layout">
          <section class="attach-profile attach-card">
            <img class="attach-avatar" src="/simon-avatar-handdrawn.png" alt="Simon-He95 hand-drawn avatar">
            <h2>Simon He</h2>
            <p>Simon-He95 · Shanghai</p>
            <b>Vue / DX / AI UI / Streaming Rendering</b>
            <small>方向：把 AI 输出做成稳定、可组合的 Vue UI</small>
          </section>
          <section class="attach-card attach-list-card">
            <span>AUTHOR PROJECTS</span>
            <div class="attach-project-grid vertical">
              <b v-for="project in authorProjects" :key="project[0]">
                <img :src="project[1]" :alt="`${project[0]} logo`">
                <span>{{ project[0] }}</span>
                <small>{{ project[2] }}</small>
              </b>
            </div>
          </section>
          <section class="attach-card attach-list-card">
            <span>OSS INVOLVEMENT</span>
            <div class="attach-project-grid vertical">
              <b v-for="project in involvedProjects" :key="project[0]">
                <img :src="project[1]" :alt="`${project[0]} logo`">
                <span>{{ project[0] }}</span>
                <small>{{ project[2] }}</small>
              </b>
            </div>
          </section>
          <section class="attach-card attach-list-card">
            <span>VS CODE PLUGINS</span>
            <div class="attach-plugin-list">
              <b v-for="plugin in vscodePlugins" :key="plugin[0]">
                <img src="/project-logos/vscode.svg" alt="VS Code icon">
                <span>{{ plugin[0] }}</span>
                <small>{{ plugin[1] }}</small>
              </b>
            </div>
          </section>
        </div>

        <div v-else-if="current.kind === 'why'" class="attach-why-layout">
          <section class="attach-timeline">
            <b>8K</b><i></i><b>128K</b><i></i><b>256K</b><i></i><b>1M+</b>
            <strong>≈ 128×</strong>
          </section>
          <section class="attach-model-grid">
            <article v-for="model in modelCards" :key="model[0]" class="attach-card">
              <span>{{ model[0] }}</span>
              <b>{{ model[1] }}</b>
              <em>{{ model[2] }}</em>
              <small>{{ model[3] }}</small>
            </article>
          </section>
          <section class="attach-pressure-row">
            <b>更密的 chunk</b>
            <b>更大的输出上限</b>
            <b>更多 UI block</b>
          </section>
          <p class="attach-equation">Context × Output × tokens/s × UI blocks → 争抢 16.7ms / frame</p>
          <small class="attach-source">Official model docs · provider surfaces vary for some models · checked 2025-01</small>
        </div>

        <div v-else-if="current.kind === 'problem'" class="attach-problem-layout">
          <section class="attach-pipeline">
            <b>模型 stream</b><i></i><b>Markdown parser</b><i></i><b>Renderer / VNode</b><i></i><b>DOM / Layout</b><i></i><b>用户交互</b>
          </section>
          <div class="attach-three-cards">
            <article class="attach-card"><span>CPU 追不上</span><b>Parse loop</b><small>每个增量都重新解析长文档。</small></article>
            <article class="attach-card"><span>DOM 爆炸</span><b>DOM count</b><small>长文和组件输出不断挤占布局预算。</small></article>
            <article class="attach-card"><span>交互被打断</span><b>UX jitter</b><small>滚动、选择、输入容易被更新打断。</small></article>
          </div>
          <p class="attach-takeaway">markstream-vue 的出发点：不是做一个更炫的 Markdown 皮肤，而是让“仍在生成的内容”不破坏页面。</p>
        </div>

        <div v-else-if="current.kind === 'old'" class="attach-code-flow">
          <pre class="attach-code" v-html="current.codeHtml"></pre>
          <section class="attach-evidence-stack">
            <section class="attach-flow-card attach-card">
              <b>Markdown 完整文本</b><i></i><b>parse 一次性</b><i></i><b>HTML 字符串</b><i></i><b>DOM 替换</b>
              <p>这个模型在“文档已完成”的时代很自然；但 AI stream 给你的不是完成稿，而是一边增长、一边变化的中间态。</p>
            </section>
            <section class="attach-demo-callout attach-card">
              <span>NEXT DEMO</span>
              <b>full parse / full replace</b>
              <small>单独一页播放，让源码、渲染结果和指标都有足够高度。</small>
            </section>
          </section>
        </div>

        <div v-else-if="current.kind === 'highlight'" class="attach-highlight-layout">
          <pre class="attach-code" v-html="current.codeHtml"></pre>
          <section class="attach-evidence-stack">
            <section class="attach-step-list compact">
              <article class="attach-card"><span>01</span><b>每来 1 个 chunk</b><small>full parse</small></article>
              <article class="attach-card"><span>02</span><b>每个 code block</b><small>Shiki highlight</small></article>
              <article class="attach-card"><span>03</span><b>每次更新页面</b><small>full renderer</small></article>
              <article class="attach-card"><span>04</span><b>用户交互中</b><small>layout / paint</small></article>
            </section>
            <section class="attach-demo-callout danger attach-card">
              <span>NEXT DEMO</span>
              <b>code / Mermaid / KaTeX 重块</b>
              <small>单独一页看 full render 如何被复杂 block 放大。</small>
            </section>
          </section>
        </div>

        <div v-else-if="current.kind === 'old-demo' || current.kind === 'highlight-demo' || current.kind === 'core-demo'" class="attach-demo-page">
          <section
            class="attach-render-evidence attach-card"
            :class="{ danger: current.kind === 'highlight-demo', markstream: current.kind === 'core-demo' }"
          >
            <div class="attach-stream-head">
              <span>
                {{ current.kind === "old-demo" ? "STREAMING RENDER · markdown-it" : current.kind === "highlight-demo" ? "STREAMING RENDER · highlighted" : "MARKSTREAM-VUE LIVE · dirty tail" }}
              </span>
              <em>{{ streamStatus }} · {{ streamProgress }}% · +{{ streamLastChunk }} chars</em>
            </div>
            <div class="attach-stream-controls simple" @click.stop @keydown.stop>
              <button class="attach-play-button" type="button" @click="toggleStream">{{ streamRunning ? "暂停" : streamDone ? "重播全量" : "播放全量" }}</button>
              <span class="attach-stream-hint">→ 未完成时播放 · 完成后翻页</span>
            </div>
            <div class="attach-live-demo stream" :class="{ running: streamRunning, markstream: current.kind === 'core-demo' }" @wheel.passive="handleStreamManualScroll">
              <pre ref="streamSourceRef" @scroll="handleStreamScroll"><code>{{ streamContent }}</code><i v-if="streamRunning"></i></pre>
              <div v-if="current.kind === 'core-demo'" ref="streamHostRef" class="attach-render-container markstream-host" @scroll="handleStreamScroll">
                <MarkdownRender
                  :content="streamContent"
                  :final="streamDone"
                  :is-dark="true"
                  :custom-html-tags="streamCustomTags"
                  :custom-id="streamCustomId"
                  :mermaid-props="streamMermaidProps"
                  code-renderer="monaco"
                  :code-block-stream="true"
                  :code-block-props="streamCodeBlockProps"
                  :max-live-nodes="0"
                  :batch-rendering="true"
                  :render-batch-size="16"
                  :render-batch-delay="streamDelay"
                  :render-batch-budget-ms="streamDelay"
                  :fade="false"
                  :typewriter="false"
                />
              </div>
              <div v-else ref="streamHostRef" class="attach-render-container" :class="{ highlighted: current.kind === 'highlight-demo' }" @scroll="handleStreamScroll" v-html="streamRenderedHtml"></div>
            </div>
            <div class="attach-stream-signal" :class="{ good: current.kind === 'core-demo', bad: current.kind !== 'core-demo' }">
              <article v-for="metric in streamPrimaryMetrics" :key="metric[0]">
                <span>{{ metric[0] }}</span>
                <b>{{ metric[1] }}</b>
                <small>{{ metric[2] }}</small>
              </article>
            </div>
            <div class="attach-stream-metrics telemetry">
              <b v-for="metric in streamTelemetryMetrics" :key="metric[0]">
                <span>{{ metric[0] }}</span>
                <em>{{ metric[1] }}</em>
              </b>
            </div>
            <small>{{ streamCaption }}</small>
          </section>
        </div>

        <div v-else-if="current.kind === 'loop'" class="attach-loop-layout">
          <section class="attach-loop animate">
            <b class="attach-loop-step">chunk + 1</b><i></i><b class="attach-loop-step">parse all</b><i></i><b class="attach-loop-step">render all</b><i></i><b class="attach-loop-step">replace all</b>
            <strong>O(N) × chunks</strong>
          </section>
          <p class="attach-takeaway">回答越长，每次小更新越像重新做一遍整篇文档。</p>
          <div class="attach-three-cards">
            <article class="attach-card"><span>直接后果</span><b>抖动 / 闪烁</b></article>
            <article class="attach-card"><span>隐性成本</span><b>交互丢状态</b></article>
            <article class="attach-card"><span>结论</span><b>不能只优化一次 render，要改变更新模型</b></article>
          </div>
        </div>

        <div v-else-if="current.kind === 'core'" class="attach-core-layout">
          <section class="attach-core-left">
            <pre class="attach-code" v-html="current.parserCode"></pre>
            <pre class="attach-code" v-html="current.vueCode"></pre>
          </section>
          <section class="attach-core-points">
            <article class="attach-card accent"><span>parser</span><b>只吃 dirty tail</b><small>稳定前缀不再随着每个 chunk 重算。</small></article>
            <article class="attach-card accent"><span>Vue layer</span><b>复用稳定节点</b><small>已完成 block 不需要卸载重建。</small></article>
            <article class="attach-card accent"><span>scheduler</span><b>按帧预算提交</b><small>把 Markdown 更新从“抢主线程”变成“让出交互”。</small></article>
            <section class="attach-demo-callout markstream attach-card">
              <span>NEXT DEMO</span>
              <b>same content, dirty tail patch</b>
              <small>下一页单独播放 markstream-vue，不再挤压代码讲解区。</small>
            </section>
          </section>
        </div>

        <div v-else-if="current.kind === 'quickstart'" class="attach-quickstart-layout">
          <pre class="attach-code" v-html="current.codeHtml"></pre>
          <section class="attach-quickstart-right">
            <section class="attach-step-list compact">
              <article class="attach-card"><span>01</span><b>Import</b><small>从 markstream-vue 引入 MarkdownRender。</small></article>
              <article class="attach-card"><span>02</span><b>Bind content</b><small>把 stream 结果绑定到 :content。</small></article>
              <article class="attach-card"><span>03</span><b>Signal final</b><small>用 :final 告诉组件何时收敛为稳定文档。</small></article>
            </section>
            <div class="attach-quickstart-demo">
              <span class="attach-quickstart-demo-label">效果预览</span>
              <div class="attach-quickstart-demo-body">
                <MarkdownRender
                  :content="quickStartPreview"
                  :final="true"
                  :is-dark="true"
                  :custom-html-tags="streamCustomTags"
                  :custom-id="streamCustomId"
                />
              </div>
            </div>
          </section>
        </div>

        <div v-else-if="current.kind === 'parser-benchmark'" class="attach-parser-benchmark-layout">
          <small class="attach-benchmark-env">{{ current.benchmarkEnv }}</small>
          <section class="attach-parser-hero attach-card accent">
            <span>1M one-shot parse</span>
            <b>13.82ms</b>
            <small>vs markdown-it 65.34ms · 约 4.7× faster</small>
          </section>
          <section class="attach-parser-table attach-card">
            <div class="attach-parser-row head">
              <span>Size</span>
              <span>markdown-it-ts</span>
              <span>markdown-it</span>
              <span>Speed</span>
            </div>
            <div v-for="row in parserBenchmarkRows" :key="row[0]" class="attach-parser-row">
              <b>{{ row[0] }}</b>
              <em>{{ row[1] }}</em>
              <span>{{ row[2] }}</span>
              <strong>{{ row[3] }}</strong>
            </div>
          </section>
          <section class="attach-parser-insights">
            <article class="attach-card"><span>compat layer</span><b>兼容 markdown-it public API</b><small>插件迁移保留熟悉的 parser / renderer 模型。</small></article>
            <article class="attach-card"><span>large input</span><b>大文本 parser 吞吐更高</b><small>5K 到 200K parse ranking 都排在第一。</small></article>
          </section>
          <small class="attach-source wide">Source: markdown-it-ts@1.0.4 README · latest synthetic one-shot parse snapshot.</small>
        </div>

        <div v-else-if="current.kind === 'compare'" class="attach-compare-layout">
          <div class="attach-compare-controls" @click.stop @keydown.stop>
            <button class="attach-play-button" type="button" @click="toggleStream">{{ streamRunning ? "暂停" : streamDone ? "重播全量对比" : "播放全量对比" }}</button>
            <span class="attach-compare-badge" :class="{ running: streamRunning, done: streamDone }">{{ streamRunning ? '实时对比中' : streamDone ? '已完成' : '等待播放' }}</span>
          </div>
          <div class="attach-compare-arena">
            <div class="attach-compare-pane bad" :class="{ 'flash-replace': compareFlash }">
              <div class="attach-compare-header">
                <span>Traditional markdown-it</span>
                <em>full parse → full render → replace</em>
              </div>
              <div class="attach-compare-body traditional" v-html="compareTraditionalHtml"></div>
              <div class="attach-compare-metrics">
                <div><span>mutations</span><b>≈{{ streamUpdates * 8 }}</b></div>
                <div><span>DOM strategy</span><b>rebuild all</b></div>
                <div><span>update</span><b class="bad">full flash</b></div>
              </div>
            </div>
            <div class="attach-compare-divider">
              <span>VS</span>
            </div>
            <div class="attach-compare-pane good">
              <div class="attach-compare-header">
                <span>markstream-vue</span>
                <em>stable prefix → dirty tail → patch</em>
              </div>
              <div class="attach-compare-body markstream">
                <MarkdownRender
                  :content="streamContent"
                  :final="streamDone"
                  :is-dark="true"
                  :custom-html-tags="streamCustomTags"
                  :custom-id="streamCustomId"
                  :mermaid-props="streamMermaidProps"
                  code-renderer="monaco"
                  :code-block-stream="true"
                  :code-block-props="streamCodeBlockProps"
                  :max-live-nodes="0"
                  :batch-rendering="true"
                  :render-batch-size="16"
                  :render-batch-delay="streamDelay"
                  :render-batch-budget-ms="streamDelay"
                  :fade="false"
                  :typewriter="false"
                />
              </div>
              <div class="attach-compare-metrics">
                <div><span>mutations</span><b>{{ streamDomNodes }}</b></div>
                <div><span>DOM strategy</span><b>patch tail</b></div>
                <div><span>update</span><b class="good">stable</b></div>
              </div>
            </div>
          </div>
          <div class="attach-compare-summary">
            <span>同语料对比：传统方案每来 1 个 chunk 全量重建 DOM；markstream-vue 只 patch 尾部不稳定区域。</span>
          </div>
        </div>

        <div v-else-if="current.kind === 'scheduler'" class="attach-scheduler-layout">
          <section class="attach-budget attach-card">
            <span>FRAME BUDGET</span>
            <b>16.7ms</b>
            <small>60fps 下每帧可用预算不是给 Markdown 独占的。</small>
          </section>
          <section class="attach-three-cards">
            <article class="attach-card"><span>Worker / SSR</span><b>nodes JSON</b><small>把解析结果变成可传输结构。</small></article>
            <article class="attach-card"><span>Viewport</span><b>220 live nodes</b><small>默认模式限制长文 DOM 活跃规模。</small></article>
            <article class="attach-card"><span>Batch</span><b>16 / 8ms / 4ms</b><small>按交互需求调整批量和延迟。</small></article>
          </section>
        </div>

        <div v-else-if="current.kind === 'content'" class="attach-content-layout">
          <div class="attach-code-preview">
            <pre class="attach-code" v-html="current.codeHtml"></pre>
            <pre class="attach-preview" v-html="current.previewHtml"></pre>
          </div>
          <section class="attach-chip-cloud">
            <b>content</b><b>thinking</b><b>tool-call</b><b>tool-result</b><b>component</b><b>citation</b>
          </section>
          <p class="attach-takeaway">Markdown 在 AI UI 里更像一个协议层：文本、状态、工具结果和业务组件可以一起流动。</p>
        </div>

        <div v-else-if="current.kind === 'api'" class="attach-api-layout">
          <pre class="attach-code" v-html="current.codeHtml"></pre>
          <section class="attach-step-list">
            <article class="attach-card"><span>content</span><b>接收 stream 结果</b></article>
            <article class="attach-card"><span>final</span><b>结束后收敛稳定文档</b></article>
            <article class="attach-card"><span>custom tags</span><b>把标签映射为 Vue 组件</b></article>
            <article class="attach-card"><span>batch</span><b>用参数控制主线程预算</b></article>
          </section>
        </div>

        <div v-else-if="current.kind === 'perf'" class="attach-perf-layout">
          <small class="attach-benchmark-env">{{ current.benchmarkEnv }}</small>
          <section class="attach-stress-hero attach-card">
            <span>HEAVY BLOCK STRESS</span>
            <b>24.1×</b>
            <small>diff code fence scripting: 280ms → 12ms</small>
          </section>
          <section class="attach-stress-grid">
            <article v-for="row in stressEvidence" :key="row[0]" class="attach-stress-card">
              <span>{{ row[0] }}</span>
              <b>{{ row[1] }}</b>
              <em>{{ row[2] }}</em>
              <small>{{ row[3] }}</small>
              <i>{{ row[4] }} · {{ row[5] }}</i>
            </article>
          </section>
          <section class="attach-stress-blocks">
            <article v-for="block in stressBlocks" :key="block[0]">
              <span>{{ block[0] }}</span>
              <b>{{ block[1] }}</b>
            </article>
          </section>
          <small class="attach-source wide">Measured cases from public/streaming-performance-evidence.json · streamdown full render loop vs markstream-vue incremental renderer · 119 chunks/case · KaTeX is included in the renderer demo case, not assigned a standalone measured number here.</small>
        </div>

        <div v-else-if="current.kind === 'playbook'" class="attach-playbook-layout">
          <article class="attach-card"><span>01</span><b>先定义输出协议</b><small>区分正文、思考、工具调用、工具结果和组件块。</small></article>
          <article class="attach-card"><span>02</span><b>再定义更新预算</b><small>长文档和聊天场景用不同 live nodes / batch 参数。</small></article>
          <article class="attach-card"><span>03</span><b>最后补证据</b><small>用本地语料、设备和真实页面回放验证。</small></article>
          <div class="attach-chip-row"><span>stream first</span><span>stable blocks</span><span>main-thread budget</span><span>visual QA</span></div>
        </div>

        <div v-else-if="current.kind === 'ecosystem'" class="attach-ecosystem-layout">
          <section class="attach-card"><span>markdown-it / Shiki</span><b>完成态文档渲染</b><small>适合静态 Markdown 和代码高亮。</small></section>
          <section class="attach-card accent"><span>markdown-it-ts</span><b>高吞吐 parser layer</b><small>给大文本和增量场景打基础。</small></section>
          <section class="attach-card accent"><span>markstream-vue</span><b>Vue streaming renderer</b><small>把 parser token 变成稳定 UI 更新。</small></section>
          <section class="attach-card"><span>业务组件</span><b>Tool / Chart / Citation</b><small>让 AI 输出进入产品界面。</small></section>
        </div>

        <div v-else-if="current.kind === 'thanks'" class="attach-thanks-layout">
          <section class="attach-contributors-wall">
            <article v-for="contributor in contributors" :key="contributor[0]">
              <img :src="contributor[1]" :alt="`${contributor[0]} GitHub avatar`">
              <span>{{ contributor[0] }}</span>
            </article>
          </section>
          <div class="attach-chip-row dense">
            <span v-for="name in moreContributors" :key="name" class="attach-contributor-tag">{{ name }}</span>
          </div>
        </div>

        <div v-else-if="current.kind === 'qa'" class="attach-qa-layout">
          <section>
            <span class="attach-section">CONTACT</span>
            <h2>Q&A</h2>
            <p>GitHub · Simon-He95 / markstream-vue</p>
            <p>npm · markstream-vue</p>
          </section>
          <img src="/markstream-qr.png" alt="markstream-vue QR code">
        </div>
      </template>
    </main>

    <footer class="attach-footer">
      <span>{{ current.footer ?? "markstream-vue · AI Streaming Markdown Renderer for Vue" }}</span>
    </footer>
  </section>
</template>
