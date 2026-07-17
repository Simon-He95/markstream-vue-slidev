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
    theme: "neutral",
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
  ["zerob13", "/contributors/zerob13.jpg"],
  ["yyhhyyyyyy", "/contributors/yyhhyyyyyy.png"],
  ["gezhiheng", "/contributors/gezhiheng.png"],
  ["l-xiaoshen", "/contributors/l-xiaoshen.png"],
  ["bb-boy680", "/contributors/bb-boy680.jpg"],
  ["Licoy", "/contributors/Licoy.png"],
  ["ysansan98", "/contributors/ysansan98.png"],
  ["zhangmo8", "/contributors/zhangmo8.jpg"],
  ["ashless", "/contributors/ashless.png"],
  ["neoragex2002", "/contributors/neoragex2002.jpg"],
  ["bluryar", "/contributors/bluryar.jpg"],
  ["Srhui20", "/contributors/Srhui20.jpg"],
  ["KamilBeda", "/contributors/KamilBeda.jpg"],
  ["yuguaa", "/contributors/yuguaa.png"],
  ["donglize521521", "/contributors/donglize521521.png"],
  ["tomorrowthief", "/contributors/tomorrowthief.png"],
  ["s3d-i", "/contributors/s3d-i.png"],
  ["rzzf", "/contributors/rzzf.png"],
  ["little077", "/contributors/little077.png"],
  ["emmm1245", "/contributors/emmm1245.png"],
  ["cyyjs", "/contributors/cyyjs.png"],
  ["ZKunZhang", "/contributors/ZKunZhang.jpg"],
  ["WuMingDao", "/contributors/WuMingDao.png"],
  ["tt-a1i", "/contributors/tt-a1i.jpg"],
  ["Asaki-M", "/contributors/Asaki-M.jpg"],
  ["AndersonBY", "/contributors/AndersonBY.jpg"],
];

const modelCards = [
  ["GPT-4o", "128K context", "4o / 4o-mini", "OpenAI 2024-05 发布，多模态原生"],
  ["Claude 3.5 Sonnet", "200K context", "Sonnet / Haiku / Opus", "Anthropic 2024-06 发布，长文本领先"],
  ["Kimi K1.5", "200K context", "Moonshot 长文本", "Kimi 2024-10 发布，中文长文本场景优化"],
  ["Gemini 1.5 Pro", "1M-2M context", "Flash / Pro", "Google 2024-02 发布，原生 1M+ 上下文"],
  ["GLM-4", "128K context", "9B / 32B / 基座", "智谱 AI 2024-01 发布，中文开源生态"],
];

const stressEvidence = [
  ["diff code fence", "减少 81%", "脚本执行耗时", "270 → 50ms", "DOM 328 → 61", "平均更新快 3.6×"],
  ["TypeScript fence", "减少 79%", "脚本执行耗时", "247 → 51ms", "DOM 222 → 33", "平均更新快 3.0×"],
  ["Mermaid fence", "减少 82%", "脚本执行耗时", "288 → 51ms", "DOM 423 → 77", "平均更新快 4.7×"],
];

const stressBlocks = [
  ["减少重复解析", "降低脚本执行耗时"],
  ["减少节点重建", "降低 DOM 更新数量"],
  ["减少布局变化", "让每次更新更稳定"],
];

const parserEcosystemRows = [
  { rank: "01", name: "markdown-it-ts", detail: "render", time: "0.70ms", ratio: "1.00×", width: "8%", tone: "winner" },
  { rank: "02", name: "@ox-content/napi", detail: "native render", time: "1.89ms", ratio: "2.69×", width: "22%", tone: "native" },
  { rank: "03", name: "markdown-it", detail: "render", time: "11.35ms", ratio: "16.14×", width: "48%" },
  { rank: "04", name: "markdown-exit", detail: "render", time: "14.03ms", ratio: "19.95×", width: "51%" },
  { rank: "05", name: "micromark", detail: "CommonMark render", time: "227.36ms", ratio: "323.18×", width: "91%" },
  { rank: "06", name: "remark + rehype", detail: "parse + stringify", time: "412.35ms", ratio: "586.11×", width: "100%" },
];

const parserScaleComparisons = [
  { range: "1.66–2.69×", label: "vs @ox-content/napi", scope: "5K–1M" },
  { range: "10.92–16.14×", label: "vs markdown-it", scope: "5K–1M" },
  { range: "13.90–19.95×", label: "vs markdown-exit", scope: "5K–1M" },
  { range: "222–586×", label: "vs remark + rehype", scope: "5K–200K" },
];

const adoptionProjects = [
  { name: "AstrBot", category: "AGENT FRAMEWORK", stars: "36.4K", logo: "/adoption-logos/astrbot.svg", cell: "cell-astrbot", size: "cell-lg" },
  { name: "HuLa", category: "IM DESKTOP", stars: "7.4K", logo: "/adoption-logos/hula.png", cell: "cell-hula", size: "cell-md" },
  { name: "DeepChat", category: "AI ASSISTANT", stars: "6.1K", logo: "/adoption-logos/deepchat.png", cell: "cell-deepchat", size: "cell-md" },
  { name: "mcp-chrome", category: "BROWSER MCP", stars: "12.1K", logo: "/adoption-logos/mcp-chrome.png", cell: "cell-mcp", size: "cell-lg" },
  { name: "Telegram Search", category: "CHAT ARCHIVE", stars: "4.0K", logo: "/adoption-logos/telegram-search.svg", cell: "cell-telegram", size: "cell-md" },
  { name: "Memoh", category: "AGENT PLATFORM", stars: "2.0K", logo: "/adoption-logos/memoh.svg", cell: "cell-memoh", size: "cell-sm" },
  { name: "EasyNode", category: "SERVER PANEL", stars: "2.0K", logo: "/adoption-logos/easynode.png", cell: "cell-easynode", size: "cell-sm" },
  { name: "Kimi Code", category: "CODING AGENT", stars: "3.2K", logo: "/adoption-logos/kimi-code.png", cell: "cell-kimi", size: "cell-md" },
  { name: "DimAgent", category: "AGENT RUNTIME", website: "dimagent.com", href: "https://dimagent.com", logo: "/adoption-logos/dimagent.svg", cell: "cell-dimagent", size: "cell-md" },
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
};
const streamCodeBlockProps = {
  showHeader: false,
  showCopyButton: false,
  showExpandButton: false,
  showPreviewButton: false,
  showCollapseButton: false,
  showFontSizeButtons: false,
  enableFontSizeControl: false,
  showLineNumbers: false,
  monacoOptions: {
    readOnly: true,
    lineNumbers: "off",
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
    title: "你的 Markdown 渲染器，扛得住 AI 输出吗？",
    subtitle: "当模型返回更快、内容更长、形态更复杂，Markdown 渲染器会从“展示组件”变成“产品基础设施”。",
    footer: "Simon He",
  },
  2: {
    kind: "about",
    kicker: "ABOUT SIMON",
    title: "活跃于 Vue 和开源社区，现在从事 AI Agent 开发。",
  },
  3: {
    kind: "why",
    kicker: "WHY NOW",
    title: "模型输出更长、更快、更复杂，浏览器需要处理更多持续更新。",
  },
  4: {
    kind: "problem",
    kicker: "PROBLEM",
    title: "模型越快，浏览器越容易先成为瓶颈。",
  },
  5: {
    kind: "old",
    kicker: "OLD WORLD",
    title: "传统渲染方式很简单：输入完整文本，生成 HTML。",
    codeHtml: `<span class="tok kw">const</span> html <span class="tok op">=</span> markdownIt.<span class="tok prop">render</span>(markdown)
container.<span class="tok prop">innerHTML</span> <span class="tok op">=</span> html

<span class="tok comment">// code block</span>
<span class="tok tag">&lt;pre&gt;&lt;code&gt;</span>npm install vue<span class="tok tag">&lt;/code&gt;&lt;/pre&gt;</span>`,
  },
  6: {
    kind: "old-demo",
    kicker: "DEMO · MARKDOWN-IT",
    title: "传统 markdown-it：每收到一段新内容，都重新处理当前全文。",
  },
  7: {
    kind: "highlight",
    kicker: "RICH CONTENT",
    title: "代码、图片、公式和图表，让 AI 输出更直观。",
    codeHtml: `<span class="tok comment">// code</span>
<span class="tok tag">\`\`\`ts</span>
<span class="tok kw">const</span> result <span class="tok op">=</span> <span class="tok kw">await</span> agent.<span class="tok prop">run</span>()
<span class="tok tag">\`\`\`</span>

<span class="tok comment">// image / math / diagram</span>
<span class="tok tag">![result](chart.png)</span>
<span class="tok tag">$$ E = mc² $$</span>
<span class="tok tag">\`\`\`mermaid</span>`,
  },
  8: {
    kind: "highlight-demo",
    kicker: "DEMO · HIGHLIGHT",
    title: "加入 code / Mermaid / KaTeX 后，全量渲染的成本会被明显放大。",
  },
  9: {
    kind: "loop",
    kicker: "REPEATED WORK",
    title: "传统方案的核心问题：每次收到新内容，都重新处理全文。",
  },
  10: {
    kind: "core",
    kicker: "CORE MECHANISM",
    title: "markstream-vue：只处理变化中的尾部，复用稳定节点，并将渲染拆分到多帧。",
    parserCode: `<span class="tok comment">// stream-markdown-parser: 只处理尾部不稳定区域</span>
<span class="tok kw">function</span> <span class="tok prop">parseDelta</span>(delta) {
  <span class="tok kw">const</span> stable <span class="tok op">=</span> findStablePrefix(tokens, delta)
  <span class="tok kw">const</span> tail <span class="tok op">=</span> parseDirtyTail(delta)
  <span class="tok kw">return</span> { stable, tail, reusable: stable.nodes }
}`,
    vueCode: `<span class="tok comment">// markstream-vue: 复用稳定节点，只更新变化中的尾部</span>
<span class="tok tag">&lt;MarkdownRender</span>
  <span class="tok attr">:content</span><span class="tok op">=</span><span class="tok str">"stream"</span>
  <span class="tok attr">:final</span><span class="tok op">=</span><span class="tok str">"done"</span>
  <span class="tok attr">:batch-rendering</span><span class="tok op">=</span><span class="tok str">"true"</span>
<span class="tok tag">/&gt;</span>`,
  },
  11: {
    kind: "core-demo",
    kicker: "DEMO · MARKSTREAM-VUE",
    title: "同样的内容，markstream-vue 只重新处理仍在变化的尾部。",
  },
  12: {
    kind: "quickstart",
    kicker: "QUICK START",
    title: "基础接入：一个组件 + 两个 props。",
    codeHtml: `<span class="tok kw">import</span> MarkdownRender <span class="tok kw">from</span> <span class="tok str">"markstream-vue"</span>

<span class="tok tag">&lt;MarkdownRender</span>
  <span class="tok attr">:content</span><span class="tok op">=</span><span class="tok str">"answer"</span>
  <span class="tok attr">:final</span><span class="tok op">=</span><span class="tok str">"done"</span>
<span class="tok tag">/&gt;</span>`,
  },
  13: {
    kind: "perf",
    kicker: "PERFORMANCE",
    title: "复杂内容持续输出时，脚本执行耗时减少约 80%。",
    benchmarkEnv: "Chrome 150 · Vue 3.5.34 · Apple M1 Pro · 每组运行 3 次取中位数",
  },
  14: {
    kind: "parser-benchmark",
    kicker: "PARSER DESIGN",
    title: "markdown-it-ts 面向流式增量解析设计，也因此更快。",
    benchmarkEnv: "Markdown → HTML · 20 万字符 · Node 24.16 · Apple M1 Pro · 数值越低越好",
  },
  15: {
    kind: "scheduler",
    kicker: "SCHEDULER",
    title: "将渲染拆分到多帧，优先保障滚动、选择和输入。",
  },
  16: {
    kind: "content",
    kicker: "CONTENT TYPES",
    title: "AI 输出除了常规 Markdown，还可能包含工具状态和业务组件。",
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
    title: "通过这些配置，接入自定义组件和流式协议。",
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
    kind: "ecosystem",
    kicker: "ECOSYSTEM",
    title: "同一套流式 parser，可以支撑不同框架，也可以用于 TUI。",
  },
  19: {
    kind: "adoption-network",
    kicker: "ADOPTION NETWORK",
    title: "不同领域的开源软件都在使用 markstream-vue。",
  },
  20: {
    kind: "thanks",
    kicker: "THANKS",
    title: "感谢每一位贡献者。",
  },
  21: {
    kind: "qa",
    kicker: "Q&A",
    title: "谢谢 · 问答与讨论",
  },
};

const current = computed(() => slides[props.no] ?? slides[1]);
const page = computed(() => String(props.no).padStart(2, "0"));
const footerText = computed(() => current.value.footer ?? "markstream-vue · AI Streaming Markdown Renderer for Vue");
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
  "adoption-network": "MOMENTUM",
  thanks: "MAINTAINERS",
  qa: "MARKSTREAM",
};
const mRole = computed(() => mRoles[current.value.kind] ?? "MARKSTREAM");
const mTargetMode = computed(() => {
  if (current.value.kind === "cover") return "logo";
  if (current.value.kind === "adoption-network") return "logo";
  if (current.value.kind === "thanks") return "footer-letter";
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
  if (streamRunning.value) return "播放中";
  if (streamDone.value) return "已完成";
  return "待播放";
});
const streamParseScope = computed(() => {
  if (!streamIndex.value) return "0";
  if (current.value.kind === "core-demo") {
    return `尾部 ${Math.min(streamIndex.value, streamLastChunk.value + 32)}`;
  }
  if (current.value.kind === "highlight-demo") {
    return `全文 ${streamIndex.value}+高亮`;
  }
  return `全文 ${streamIndex.value}`;
});
const streamRerenderScope = computed(() => {
  if (!streamUpdates.value) return "0";
  if (current.value.kind === "core-demo") return `局部 ${streamUpdates.value} 次`;
  return `全量 ${streamUpdates.value} 次`;
});
const streamPrimaryMetrics = computed(() => {
  const isCore = current.value.kind === "core-demo";
  const parseWindow = Math.min(streamIndex.value, streamLastChunk.value + 32);
  const parseDelta = isCore
    ? parseWindow ? `解析范围约缩小 ${Math.max(1, Math.round(streamIndex.value / parseWindow))}×` : "等待更新"
    : "内容越长，耗时越高";
  return [
    [
      isCore ? "只解析变化尾部" : "每次解析全文",
      streamParseScope.value,
      isCore ? parseDelta : current.value.kind === "highlight-demo" ? "代码、图表和公式会重复处理" : "每次增量都重新读取全文",
      isCore ? "只解析变化中的尾部" : "重新解析完整文档",
    ],
    [
      isCore ? "复用稳定节点" : "替换全部 DOM",
      streamRerenderScope.value,
      isCore ? "已完成内容保持不变" : "可能影响滚动和组件状态",
      isCore ? "只更新发生变化的节点" : "替换全部 DOM",
    ],
  ];
});
const streamTelemetryMetrics = computed(() => [
  ["主线程 %", formatPercent(streamCpuPercent.value)],
  ["帧延迟 P95", `${streamFrameP95.value.toFixed(1)}ms`],
  ["内存", streamHeapAvailable.value ? `${streamHeapMb.value.toFixed(1)}MB` : "n/a"],
  ["DOM 节点", String(streamDomNodes.value)],
]);
const streamCaption = computed(() => {
  if (current.value.kind === "core-demo") {
    return "主线程%=同步解析与渲染耗时÷更新间隔 · 帧延迟 P95=更新到下一帧";
  }
  if (current.value.kind === "highlight-demo") {
    return "完整文档和 code / Mermaid / KaTeX 被反复处理 · 每次都替换全部内容";
  }
  return "每次解析全文并替换全部 DOM · 主线程%=同步工作耗时÷更新间隔";
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
          <h1 class="attach-cover-title">
            <span>你的 Markdown</span>
            <span>渲染器，扛得住</span>
            <span>AI 输出吗？</span>
          </h1>
          <p>{{ current.subtitle }}</p>
          <div class="attach-cover-cards">
            <article class="attach-card">
              <span>挑战</span>
              <b>高频更新 · 长内容 · 复杂结构</b>
              <small>持续输出不断占用浏览器主线程</small>
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
            <img class="attach-avatar" src="/simon-avatar-handdrawn.jpg" alt="Simon-He95 hand-drawn avatar">
            <h2>Simon He</h2>
            <p>Simon-He95 · Shanghai</p>
            <b>Vue / Open Source / AI Agent</b>
            <small>方向：流式解析与跨框架渲染</small>
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
            <b>更频繁的更新</b>
            <b>更长的输出</b>
            <b>更多复杂内容</b>
          </section>
          <p class="attach-equation">输出长度 × 更新频率 × 内容复杂度 → 争抢每帧 16.7ms</p>
          <small class="attach-source">模型官方文档 · 部分上限因服务商而异 · 2025-01 核对</small>
        </div>

        <div v-else-if="current.kind === 'problem'" class="attach-problem-layout">
          <section class="attach-pipeline">
            <b>模型 stream</b><i></i><b>Markdown 解析</b><i></i><b>数据加工 / 组件渲染</b><i></i><b>DOM 更新 / 页面布局</b><i></i><b>用户交互</b>
          </section>
          <div class="attach-three-cards">
            <article class="attach-card"><span>重复解析</span><b>每次处理全文</b><small>每个增量都重新解析长文档。</small></article>
            <article class="attach-card"><span>DOM 增长</span><b>节点越来越多</b><small>长文和组件持续占用布局资源。</small></article>
            <article class="attach-card"><span>交互卡顿</span><b>滚动与输入被打断</b><small>频繁更新会影响选择和组件状态。</small></article>
          </div>
          <p class="attach-takeaway">markstream-vue 持续更新正在生成的内容，同时保持滚动、选择和组件状态稳定。</p>
        </div>

        <div v-else-if="current.kind === 'old'" class="attach-code-flow">
          <pre class="attach-code" v-html="current.codeHtml"></pre>
          <section class="attach-evidence-stack">
            <section class="attach-flow-card attach-card">
              <b>完整 Markdown</b><i></i><b>解析全文</b><i></i><b>生成 HTML</b><i></i><b>更新 DOM</b>
              <p>传统方式适合已经写完的文档；AI stream 面对的是持续增长、尚未完成的内容。</p>
            </section>
            <section class="attach-demo-callout attach-card">
              <span>NEXT DEMO</span>
              <b>每次更新都重新处理全文</b>
              <small>下一页观察源码、页面和指标如何随更新变化。</small>
            </section>
          </section>
        </div>

        <div v-else-if="current.kind === 'highlight'" class="attach-highlight-layout">
          <pre class="attach-code" v-html="current.codeHtml"></pre>
          <section class="attach-evidence-stack">
            <section class="attach-step-list compact">
              <article class="attach-card"><span>01</span><b>收到增量</b><small>重新解析全文</small></article>
              <article class="attach-card"><span>02</span><b>处理复杂内容</b><small>代码 / 公式 / 图表</small></article>
              <article class="attach-card"><span>03</span><b>更新页面</b><small>重新生成全部内容</small></article>
              <article class="attach-card"><span>04</span><b>同时处理交互</b><small>滚动 / 选择 / 输入</small></article>
            </section>
            <section class="attach-demo-callout danger attach-card">
              <span>NEXT DEMO</span>
              <b>code / Mermaid / KaTeX 复杂内容</b>
              <small>下一页观察复杂内容如何放大全量渲染的成本。</small>
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
                {{ current.kind === "old-demo" ? "传统方式 · markdown-it" : current.kind === "highlight-demo" ? "全量渲染 · 复杂内容" : "markstream-vue · 只更新变化尾部" }}
              </span>
              <em :title="`${streamStatus} · ${streamProgress}% · 新增 ${streamLastChunk} 字符`">{{ streamStatus }} · {{ streamProgress }}% · +{{ streamLastChunk }} 字符</em>
            </div>
            <div class="attach-stream-controls simple" @click.stop @keydown.stop>
              <button class="attach-play-button" type="button" @click="toggleStream">{{ streamRunning ? "暂停" : streamDone ? "重播全量" : "播放全量" }}</button>
              <span class="attach-stream-hint">播放后观察左右内容和下方指标</span>
            </div>
            <div class="attach-live-demo stream" :class="{ running: streamRunning, markstream: current.kind === 'core-demo' }" @wheel.passive="handleStreamManualScroll">
              <pre ref="streamSourceRef" @scroll="handleStreamScroll"><code>{{ streamContent }}</code><i v-if="streamRunning"></i></pre>
              <div v-if="current.kind === 'core-demo'" ref="streamHostRef" class="attach-render-container markstream-host" @scroll="handleStreamScroll">
                <MarkdownRender
                  :content="streamContent"
                  :final="streamDone"
                  :is-dark="false"
                  :custom-html-tags="streamCustomTags"
                  :custom-id="streamCustomId"
                  :mermaid-props="streamMermaidProps"
                  code-renderer="monaco"
                  :code-block-stream="false"
                  :code-block-monaco-options="streamCodeBlockProps.monacoOptions"
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
                <span :title="metric[3]" :aria-label="metric[3]">{{ metric[0] }}</span>
                <b :class="{ compact: metric[1].length > 12 }" :title="metric[1]">{{ metric[1] }}</b>
                <small>{{ metric[2] }}</small>
              </article>
            </div>
            <div class="attach-stream-metrics telemetry">
              <b v-for="metric in streamTelemetryMetrics" :key="metric[0]">
                <span>{{ metric[0] }}</span>
                <em :class="{ compact: metric[1].length > 8 }" :title="metric[1]">{{ metric[1] }}</em>
              </b>
            </div>
            <small>{{ streamCaption }}</small>
          </section>
        </div>

        <div v-else-if="current.kind === 'loop'" class="attach-loop-layout">
          <section class="attach-loop animate">
            <b class="attach-loop-step">收到更新</b><i></i><b class="attach-loop-step">解析全文</b><i></i><b class="attach-loop-step">渲染全文</b><i></i><b class="attach-loop-step">替换 DOM</b>
            <strong>回答长度 × 更新次数</strong>
          </section>
          <p class="attach-takeaway">回答越长，每次小更新越像重新做一遍整篇文档。</p>
          <div class="attach-three-cards">
            <article class="attach-card"><span>直接后果</span><b>抖动 / 闪烁</b></article>
            <article class="attach-card"><span>隐性成本</span><b>滚动位置或组件状态被重置</b></article>
            <article class="attach-card"><span>结论</span><b>不能只让单次渲染更快，还要减少重复工作</b></article>
          </div>
        </div>

        <div v-else-if="current.kind === 'core'" class="attach-core-layout">
          <section class="attach-core-left">
            <pre class="attach-code" v-html="current.parserCode"></pre>
            <pre class="attach-code" v-html="current.vueCode"></pre>
          </section>
          <section class="attach-core-points">
            <article class="attach-card accent"><span>parser</span><b>只处理 dirty tail</b><small>前面已经完成的内容不再重复解析。</small></article>
            <article class="attach-card accent"><span>Vue layer</span><b>复用稳定节点</b><small>已完成的内容不再反复卸载和重建。</small></article>
            <article class="attach-card accent"><span>scheduler</span><b>将更新拆分到多帧</b><small>每帧只执行一部分，避免滚动和输入卡顿。</small></article>
            <section class="attach-demo-callout markstream attach-card">
              <span>NEXT DEMO</span>
              <b>同样内容，只更新变化中的尾部</b>
              <small>下一页使用相同内容，观察局部更新后的页面表现。</small>
            </section>
          </section>
        </div>

        <div v-else-if="current.kind === 'quickstart'" class="attach-quickstart-layout">
          <pre class="attach-code" v-html="current.codeHtml"></pre>
          <section class="attach-quickstart-right">
            <section class="attach-step-list compact">
              <article class="attach-card"><span>01</span><b>引入组件</b><small>从 markstream-vue 引入 MarkdownRender。</small></article>
              <article class="attach-card"><span>02</span><b>绑定输出内容</b><small>把模型输出绑定到 :content。</small></article>
              <article class="attach-card"><span>03</span><b>标记输出完成</b><small>用 :final 告诉组件内容已经输出完成。</small></article>
            </section>
            <div class="attach-quickstart-demo">
              <span class="attach-quickstart-demo-label">效果预览</span>
              <div class="attach-quickstart-demo-body markstream-host">
                <MarkdownRender
                  :content="quickStartPreview"
                  :final="true"
                  :is-dark="false"
                  :custom-html-tags="streamCustomTags"
                  :custom-id="streamCustomId"
                />
              </div>
            </div>
          </section>
        </div>

        <div v-else-if="current.kind === 'parser-benchmark'" class="attach-parser-benchmark-layout">
          <small class="attach-benchmark-env">{{ current.benchmarkEnv }}</small>
          <section class="attach-parser-summary">
            <div class="attach-parser-hero">
              <span>即使完整渲染 20 万字符</span>
              <b>0.70<em>ms</em></b>
              <small>render 0.7035ms · renderAsync 0.6998ms</small>
            </div>
            <div class="attach-parser-range-grid">
              <article v-for="item in parserScaleComparisons" :key="item.label">
                <span>{{ item.scope }}</span>
                <b>{{ item.range }}</b>
                <small>{{ item.label }}</small>
              </article>
            </div>
          </section>
          <section class="attach-parser-race">
            <div class="attach-parser-race-head">
              <div>
                <span>20 万字符 · 完整渲染</span>
                <b>6 种实现</b>
              </div>
              <small>相对耗时 · 对数刻度</small>
            </div>
            <div class="attach-parser-race-rows">
              <article v-for="row in parserEcosystemRows" :key="row.name" :class="row.tone">
                <span class="attach-parser-rank">{{ row.rank }}</span>
                <span class="attach-parser-name">
                  <b>{{ row.name }}</b>
                  <small>{{ row.detail }}</small>
                </span>
                <span class="attach-parser-track"><i :style="{ width: row.width }"></i></span>
                <b class="attach-parser-time">{{ row.time }}</b>
                <em class="attach-parser-ratio">{{ row.ratio }}</em>
              </article>
            </div>
            <div class="attach-parser-race-foot">
              <span>基准 · markdown-it-ts.render</span>
              <span>条形长度使用对数刻度</span>
            </div>
          </section>
          <small class="attach-source wide">数据来源：public/parser-performance-evidence.json · markdown-it-ts perf:generate · 完整渲染包含解析和 HTML 输出 · 2026-07-17</small>
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
              <div class="attach-compare-body markstream markstream-host">
                <MarkdownRender
                  :content="streamContent"
                  :final="streamDone"
                  :is-dark="false"
                  :custom-html-tags="streamCustomTags"
                  :custom-id="streamCustomId"
                  :mermaid-props="streamMermaidProps"
                  code-renderer="monaco"
                  :code-block-stream="false"
                  :code-block-monaco-options="streamCodeBlockProps.monacoOptions"
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
            <small>每帧的时间还要留给滚动、输入和页面绘制。</small>
          </section>
          <section class="attach-three-cards">
            <article class="attach-card"><span>Worker / SSR</span><b>解析结果可传输</b><small>可以在 Worker 或 SSR 中处理后传回页面。</small></article>
            <article class="attach-card"><span>Viewport</span><b>220 个活跃节点</b><small>控制长文页面中的 DOM 数量。</small></article>
            <article class="attach-card"><span>Batch</span><b>16 个节点 · 8ms · 4ms</b><small>每批节点数 · 批次间隔 · 每批耗时上限</small></article>
          </section>
        </div>

        <div v-else-if="current.kind === 'content'" class="attach-content-layout">
          <div class="attach-code-preview">
            <pre class="attach-code" v-html="current.codeHtml"></pre>
            <pre class="attach-preview" v-html="current.previewHtml"></pre>
          </div>
          <section class="attach-chip-cloud">
            <b>paragraph / list</b><b>code / table</b><b>thinking</b><b>tool-call</b><b>tool-result</b><b>component</b>
          </section>
          <p class="attach-takeaway">同一条输出流可以同时包含常规 Markdown、工具状态和业务组件。</p>
        </div>

        <div v-else-if="current.kind === 'api'" class="attach-api-layout">
          <pre class="attach-code" v-html="current.codeHtml"></pre>
          <section class="attach-step-list">
            <article class="attach-card"><span>content</span><b>接收持续输出内容</b></article>
            <article class="attach-card"><span>final</span><b>标记内容已经输出完成</b></article>
            <article class="attach-card"><span>custom tags</span><b>把标签映射为 Vue 组件</b></article>
            <article class="attach-card"><span>batch</span><b>将较大的渲染分批执行</b></article>
          </section>
        </div>

        <div v-else-if="current.kind === 'perf'" class="attach-perf-layout">
          <small class="attach-benchmark-env">{{ current.benchmarkEnv }}</small>
          <section class="attach-stress-hero attach-card">
            <span>DIFF CODE FENCE</span>
            <b>81%</b>
            <small>脚本执行耗时：270ms → 50ms</small>
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
          <small class="attach-source wide">数据来源：public/streaming-performance-evidence.json · 2026-07-17 · 每项 119 次增量更新 · TypeScript、diff 和 Mermaid 通过；重复表格的正确性检查未通过，因此不计入结果。</small>
        </div>

        <div v-else-if="current.kind === 'playbook'" class="attach-playbook-layout">
          <article class="attach-card"><span>01</span><b>先定义输出协议</b><small>区分正文、思考、工具调用、工具结果和组件块。</small></article>
          <article class="attach-card"><span>02</span><b>再定义更新预算</b><small>长文档和聊天场景用不同 live nodes / batch 参数。</small></article>
          <article class="attach-card"><span>03</span><b>最后补证据</b><small>用本地语料、设备和真实页面回放验证。</small></article>
          <div class="attach-chip-row"><span>stream first</span><span>stable blocks</span><span>main-thread budget</span><span>visual QA</span></div>
        </div>

        <div v-else-if="current.kind === 'ecosystem'" class="attach-ecosystem-layout">
          <section class="attach-card"><span>markdown-it / Shiki</span><b>完成态文档渲染</b><small>适合静态 Markdown 和代码高亮。</small></section>
          <section class="attach-card accent"><span>stream parser</span><b>可独立使用的解析层</b><small>基于 markdown-it-ts，为 Web、TUI 等界面提供结构化结果。</small></section>
          <section class="attach-card accent"><span>markstream-vue</span><b>Vue 流式渲染</b><small>把解析结果持续更新成稳定界面。</small></section>
          <section class="attach-card"><span>业务组件</span><b>工具 / 图表 / 自定义界面</b><small>呈现工具结果、图表和交互组件。</small></section>
          <section class="attach-card accent attach-framework-strip">
            <div>
              <span>FRAMEWORK RENDERERS</span>
              <b>共享同一套流式 parser</b>
              <small>不同框架接入各自的渲染层。</small>
            </div>
            <div class="attach-framework-list">
              <strong>markstream-react</strong>
              <strong>markstream-angular</strong>
              <strong>markstream-svelte</strong>
            </div>
          </section>
        </div>

        <div v-else-if="current.kind === 'adoption-network'" class="attach-adoption-network">
          <div class="attach-adoption-canvas">
            <svg class="attach-adoption-links" viewBox="0 0 1000 300" preserveAspectRatio="none" aria-hidden="true">
              <path d="M500 150 C390 118 230 80 90 55" />
              <path d="M500 150 C430 95 345 60 270 40" />
              <path d="M500 150 C570 95 655 60 730 40" />
              <path d="M500 150 C610 118 770 80 910 55" />
              <path d="M500 150 C380 180 230 220 95 245" />
              <path d="M500 150 C430 205 350 245 280 260" />
              <path d="M500 150 C500 195 500 230 500 270" />
              <path d="M500 150 C570 205 650 245 720 260" />
              <path d="M500 150 C620 180 770 220 910 245" />
            </svg>

            <article class="attach-adoption-core">
              <img
                class="attach-adoption-logo logo-flight-target"
                src="/markstream-logo.svg"
                alt="markstream-vue logo"
                data-logo-mode="logo"
                data-logo-rect="visual"
                :data-logo-page="props.no"
                :data-logo-active="mTargetMode === 'logo' ? 'true' : undefined"
              >
              <div>
                <span>STREAMING RENDERER</span>
                <b>markstream-vue</b>
                <small><strong>126</strong> 个公开仓库</small>
              </div>
            </article>

            <article
              v-for="project in adoptionProjects"
              :key="project.name"
              class="attach-adoption-cell"
              :class="[project.cell, project.size]"
            >
              <img :src="project.logo" :alt="`${project.name} logo`">
              <div class="attach-adoption-cell-copy">
                <span>{{ project.category }}</span>
                <b>{{ project.name }}</b>
                <a v-if="project.href" :href="project.href" target="_blank" rel="noopener noreferrer">{{ project.website }}</a>
                <small v-else>{{ project.stars }} STARS</small>
              </div>
            </article>
          </div>
          <small class="attach-adoption-source">GitHub Code Search · 2026-07-17 · 126 个公开仓库 / 139 处 package.json 记录 · DimAgent 来自官网 · 依赖记录不等于生产流量</small>
        </div>

        <div v-else-if="current.kind === 'thanks'" class="attach-thanks-layout">
          <section class="attach-contributors-wall">
            <article v-for="contributor in contributors" :key="contributor[0]">
              <img :src="contributor[1]" :alt="`${contributor[0]} GitHub avatar`">
              <span>{{ contributor[0] }}</span>
            </article>
          </section>
        </div>

        <div v-else-if="current.kind === 'qa'" class="attach-qa-layout">
          <section>
            <h2>Q&A</h2>
            <p>GitHub · Simon-He95 / markstream-vue</p>
            <p>npm · markstream-vue</p>
          </section>
          <img src="/markstream-qr.png" alt="markstream-vue QR code">
        </div>
      </template>
    </main>

    <footer class="attach-footer">
      <span v-if="mTargetMode === 'footer-letter'" class="attach-footer-lockup">
        <span
          class="attach-footer-m logo-flight-target"
          data-logo-mode="footer-letter"
          :data-logo-page="props.no"
          data-logo-active="true"
        >M</span>
        <span>{{ footerText.slice(1) }}</span>
      </span>
      <span v-else>{{ footerText }}</span>
    </footer>
  </section>
</template>
