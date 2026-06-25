<script setup>
import { computed } from "vue";

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
  ["Kimi K2.7 Code", "256K context", "HighSpeed ≈ 180 tok/s", "短上下文场景最高约 260 tok/s"],
  ["GLM-5", "200K context", "128K max output", "更长输出进入常规产品场景"],
  ["Claude Opus 4.8", "1M ctx", "128K out", "百万上下文不再是单点实验"],
  ["GPT-5.5", "1.05M ctx", "128K out", "上下文与输出窗口同时放大"],
  ["Gemini 3.1 Pro", "1,048,576 ctx", "65,536 out", "长上下文工作流进入前端"],
];

const parserRender = [
  ["5k", "0.0211ms", "0.2325ms", "11.04×", "42%"],
  ["20k", "0.0709ms", "0.9251ms", "13.05×", "52%"],
  ["100k", "0.3448ms", "4.8841ms", "14.17×", "66%"],
  ["200k", "0.7008ms", "11.17ms", "15.94×", "78%"],
  ["1M", "5.0603ms", "75.93ms", "15.01×", "88%"],
];

const parserEvidence = [
  ["5k", "0.0428ms", "0.1871ms", "4.37×", "46%"],
  ["20k", "0.1240ms", "0.7473ms", "6.03×", "58%"],
  ["50k", "0.3053ms", "1.8778ms", "6.15×", "66%"],
  ["100k", "0.7143ms", "3.8961ms", "5.45×", "72%"],
  ["200k", "1.6306ms", "9.5200ms", "5.84×", "80%"],
  ["1M", "14.14ms", "66.81ms", "4.73×", "88%"],
];

const rendererMetrics = [
  ["stream settle", "506.3", "ms"],
  ["frame p95", "9.3", "ms"],
  ["max long task", "0", "ms"],
  ["renderer DOM", "9", "nodes"],
];

const projects = [
  ["UnoCSS", "/project-logos/unocss.png"],
  ["DeepChat", "/project-logos/deepchat.png"],
  ["Vue Vine", "/project-logos/vue-vine.png"],
  ["markstream-vue", "/markstream-logo.svg"],
  ["vscode-use", "/project-logos/vscode-use.png"],
  ["awesome-compressor", "/project-logos/awesome-compressor.png"],
];

const vscodePlugins = [
  ["Common Intellisense", "/project-logos/vscode.svg"],
  ["UnoT", "/project-logos/vscode.svg"],
  ["Tailwind Magic", "/project-logos/vscode.svg"],
  ["Alias Jump", "/project-logos/vscode.svg"],
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
    title: "我平时站在 Vue、DX、AI UI 和流式渲染的交叉点上。",
  },
  3: {
    kind: "why",
    kicker: "WHY NOW",
    section: "BACKGROUND",
    title: "上下文已经进入 1M，浏览器的压力也跟着放大。",
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
  7: {
    kind: "loop",
    kicker: "COST MODEL",
    section: "FULL PARSE LOOP",
    title: "传统 parser 的核心问题：每个增量都像第一次渲染。",
  },
  8: {
    kind: "parser",
    kicker: "PARSER FOUNDATION",
    section: "PARSER LAYER",
    title: "stream-markdown-parser + markdown-it-ts：先把全量循环拆掉。",
  },
  9: {
    kind: "core",
    kicker: "MARKSTREAM CORE",
    section: "VUE LAYER",
    title: "markstream-vue：把“更新范围”压到最小，而不是把机器跑满。",
  },
  10: {
    kind: "compare",
    kicker: "REAL RENDERING",
    section: "SIDE BY SIDE",
    title: "同样是 AI 回复，真实差异在更新模型，而不是 Markdown 样式。",
  },
  11: {
    kind: "scheduler",
    kicker: "SCHEDULER",
    section: "MAIN THREAD BUDGET",
    title: "真正的优化不是“更快地抢主线程”，而是给交互留预算。",
  },
  12: {
    kind: "content",
    kicker: "CONTENT TYPES",
    section: "MARKDOWN AS UI PROTOCOL",
    title: "AI 输出不只会写 Markdown，也会输出可组件化结构。",
    codeHtml: `<span class="tok tag">&lt;think&gt;</span>checking constraints...<span class="tok tag">&lt;/think&gt;</span>

<span class="tok tag">&lt;tool-call</span> <span class="tok attr">name</span><span class="tok op">=</span><span class="tok str">"search_docs"</span> <span class="tok tag">/&gt;</span>

<span class="tok tag">&lt;tool-result</span> <span class="tok attr">status</span><span class="tok op">=</span><span class="tok str">"ok"</span><span class="tok tag">&gt;</span>
  {...}
<span class="tok tag">&lt;/tool-result&gt;</span>

<span class="tok tag">&lt;component</span> <span class="tok attr">name</span><span class="tok op">=</span><span class="tok str">"Chart"</span> <span class="tok tag">/&gt;</span>`,
  },
  13: {
    kind: "api",
    kicker: "API SURFACE",
    section: "API SHOULD STAY SIMPLE",
    title: "复杂度留在内部，上手仍然是一行组件。",
    codeHtml: `<span class="tok tag">&lt;MarkstreamRenderer</span>
  <span class="tok attr">:content</span><span class="tok op">=</span><span class="tok str">"answer"</span>
  <span class="tok attr">mode</span><span class="tok op">=</span><span class="tok str">"chat"</span>
  <span class="tok attr">:max-live-nodes</span><span class="tok op">=</span><span class="tok str">"0"</span>
  <span class="tok attr">:components</span><span class="tok op">=</span><span class="tok str">"components"</span>
<span class="tok tag">/&gt;</span>`,
  },
  14: {
    kind: "perf",
    kicker: "PERF STORY",
    section: "PERFORMANCE EVIDENCE",
    title: "性能证据分两层：parser 的吞吐，renderer 的页面更新质量。",
  },
  15: {
    kind: "playbook",
    kicker: "OPERATING PLAYBOOK",
    section: "HOW TO USE IT",
    title: "把流式 Markdown 当基础设施，需要几个明确的工程边界。",
  },
  16: {
    kind: "ecosystem",
    kicker: "ECOSYSTEM",
    section: "WHERE IT FITS",
    title: "markstream-vue 不是替代所有 Markdown 工具，而是补上 AI stream 的这一层。",
  },
  17: {
    kind: "thanks",
    kicker: "THANKS",
    section: "CONTRIBUTORS",
    title: "感谢每一位 Contributor：这个库不是一个人的性能优化。",
  },
  18: {
    kind: "qa",
    kicker: "Q&A",
    section: "CONTACT",
    title: "你的 Markdown 渲染器，扛得住 AI 输出吗？",
  },
};

const current = computed(() => slides[props.no] ?? slides[1]);
const page = computed(() => String(props.no).padStart(2, "0"));
</script>

<template>
  <section class="attachment-deck" :class="`attachment-${current.kind}`">
    <div class="attach-grid-bg"></div>
    <div class="attach-top-rule"></div>

    <header class="attach-header">
      <span>{{ current.kicker }}</span>
      <span>{{ page }}</span>
    </header>

    <main class="attach-main">
      <template v-if="current.kind === 'cover'">
        <div class="attach-cover-copy">
          <span class="attach-section">{{ current.section }}</span>
          <h1>{{ current.title }}</h1>
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
        <div class="attach-device">
          <i></i><i></i><i></i>
          <div class="attach-device-card">
            <img src="/markstream-logo.svg" alt="markstream-vue logo">
            <strong>AI OUTPUT RENDERER</strong>
            <span>content</span>
            <span>thinking</span>
            <span>tool-result</span>
          </div>
        </div>
      </template>

      <template v-else>
        <div class="attach-title-row">
          <span class="attach-section">{{ current.section }}</span>
          <h1>{{ current.title }}</h1>
        </div>

        <div v-if="current.kind === 'about'" class="attach-about-layout">
          <section class="attach-profile attach-card">
            <img class="attach-avatar" src="/simon-avatar.png" alt="Simon-He95 GitHub avatar">
            <h2>Simon He</h2>
            <p>Simon-He95 · Shanghai</p>
            <b>Vue / DX / AI UI / Streaming Rendering</b>
            <small>方向：把 AI 输出做成稳定、可组合的 Vue UI</small>
          </section>
          <section class="attach-card attach-list-card">
            <span>OSS PROJECTS</span>
            <div class="attach-project-grid">
              <b v-for="project in projects" :key="project[0]">
                <img :src="project[1]" :alt="`${project[0]} logo`">
                <span>{{ project[0] }}</span>
              </b>
            </div>
          </section>
          <section class="attach-card attach-list-card">
            <span>VS CODE PLUGINS</span>
            <div class="attach-stack-list">
              <b v-for="plugin in vscodePlugins" :key="plugin[0]">
                <img :src="plugin[1]" :alt="`${plugin[0]} icon`">
                <span>{{ plugin[0] }}</span>
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
          <small class="attach-source">Sources accessed in attached deck: 2026-06-24</small>
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
          <section class="attach-flow-card attach-card">
            <b>Markdown 完整文本</b><i></i><b>parse 一次性</b><i></i><b>HTML 字符串</b><i></i><b>DOM 替换</b>
            <p>这个模型在“文档已完成”的时代很自然；但 AI stream 给你的不是完成稿，而是一边增长、一边变化的中间态。</p>
            <div class="attach-chip-row"><span>假设：输入完整</span><span>假设：结构稳定</span><span>假设：可以重建</span></div>
          </section>
        </div>

        <div v-else-if="current.kind === 'highlight'" class="attach-highlight-layout">
          <pre class="attach-code" v-html="current.codeHtml"></pre>
          <section class="attach-step-list">
            <article class="attach-card"><span>01</span><b>每来 1 个 chunk</b><small>full parse</small></article>
            <article class="attach-card"><span>02</span><b>每个 code block</b><small>syntax highlight</small></article>
            <article class="attach-card"><span>03</span><b>每次更新页面</b><small>full renderer</small></article>
            <article class="attach-card"><span>04</span><b>用户交互中</b><small>layout / paint</small></article>
          </section>
          <p class="attach-takeaway">代码高亮解决了“看起来像 IDE”的问题，但没有解决“仍在生成时如何更新”的问题。</p>
        </div>

        <div v-else-if="current.kind === 'loop'" class="attach-loop-layout">
          <section class="attach-loop">
            <b>chunk + 1</b><i></i><b>parse all</b><i></i><b>render all</b><i></i><b>replace all</b>
            <strong>O(N) × chunks</strong>
          </section>
          <p class="attach-takeaway">回答越长，每次小更新越像重新做一遍整篇文档。</p>
          <div class="attach-three-cards">
            <article class="attach-card"><span>直接后果</span><b>抖动 / 闪烁</b></article>
            <article class="attach-card"><span>隐性成本</span><b>交互丢状态</b></article>
            <article class="attach-card"><span>结论</span><b>不能只优化一次 render，要改变更新模型</b></article>
          </div>
        </div>

        <div v-else-if="current.kind === 'parser'" class="attach-parser-layout">
          <section class="attach-road-grid">
            <article class="attach-card">
              <span>常见渲染链路</span>
              <b>Markdown → AST → HTML AST → Framework tree → DOM</b>
              <small>每来一小段，都可能重新穿过多层中间结构。</small>
            </article>
            <article class="attach-card accent">
              <span>markstream-vue</span>
              <b>Markdown → markdown-it-ts Token → 可增量更新</b>
              <small>直接生成更适合 Vue 更新的数据，少绕几层。</small>
            </article>
          </section>
          <section class="attach-bars">
            <div v-for="row in parserRender" :key="row[0]" class="attach-bar-row">
              <span>{{ row[0] }}</span>
              <i :style="{ width: row[4] }"></i>
              <b>{{ row[3] }}</b>
              <small>{{ row[1] }} vs {{ row[2] }}</small>
            </div>
          </section>
          <small class="attach-source">markdown-it-ts@1.0.2 · f2f4f24 · render API throughput · 2026-06-25 · Apple M1 Pro</small>
        </div>

        <div v-else-if="current.kind === 'core'" class="attach-core-layout">
          <section class="attach-step-list four">
            <article class="attach-card"><span>01</span><b>Parse delta</b><small>只处理新增片段和尾部不稳定区域。</small></article>
            <article class="attach-card"><span>02</span><b>Node reuse</b><small>稳定块复用，不做整页替换。</small></article>
            <article class="attach-card"><span>03</span><b>Schedule</b><small>按帧预算分批提交。</small></article>
            <article class="attach-card"><span>04</span><b>Finalize</b><small>结束后收敛为稳定文档。</small></article>
          </section>
          <p class="attach-equation">核心原则：把“不稳定”限制在尾部，把“稳定”交还给 Vue。</p>
          <div class="attach-chip-row"><span>docs mode</span><span>chat mode</span><span>virtual window</span><span>component slots</span></div>
        </div>

        <div v-else-if="current.kind === 'compare'" class="attach-compare-layout">
          <article class="attach-card attach-compare bad">
            <span>Traditional renderer</span>
            <b>每个 chunk 都像整篇重渲染</b>
            <small>滚动位置、代码块状态、组件交互都容易被更新扰动。</small>
            <em>full parse → full render → replace</em>
          </article>
          <article class="attach-card attach-compare good">
            <span>markstream-vue</span>
            <b>稳定块复用，尾部继续流动</b>
            <small>长回复仍然增长，但页面不需要持续重建。</small>
            <em>delta parse → reuse → scheduled patch</em>
          </article>
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
          <pre class="attach-code" v-html="current.codeHtml"></pre>
          <section class="attach-chip-cloud">
            <b>content</b><b>thinking</b><b>tool-call</b><b>tool-result</b><b>component</b><b>citation</b>
          </section>
          <p class="attach-takeaway">Markdown 在 AI UI 里更像一个协议层：文本、状态、工具结果和业务组件可以一起流动。</p>
        </div>

        <div v-else-if="current.kind === 'api'" class="attach-api-layout">
          <pre class="attach-code" v-html="current.codeHtml"></pre>
          <section class="attach-step-list">
            <article class="attach-card"><span>content</span><b>接收 stream 结果</b></article>
            <article class="attach-card"><span>mode</span><b>docs / chat 两种更新策略</b></article>
            <article class="attach-card"><span>components</span><b>把标签映射为 Vue 组件</b></article>
            <article class="attach-card"><span>budget</span><b>用参数控制主线程占用</b></article>
          </section>
        </div>

        <div v-else-if="current.kind === 'perf'" class="attach-perf-layout">
          <section class="attach-card attach-perf-panel">
            <div class="attach-panel-head">
              <b>Parser layer</b>
              <span>markdown-it-ts best one-shot vs markdown-it</span>
            </div>
            <div class="attach-bars compact">
              <div v-for="row in parserEvidence" :key="row[0]" class="attach-bar-row">
                <span>{{ row[0] }}</span>
                <i :style="{ width: row[4] }"></i>
                <b>{{ row[3] }}</b>
                <small>{{ row[1] }} vs {{ row[2] }}</small>
              </div>
            </div>
          </section>
          <section class="attach-card attach-perf-panel">
            <div class="attach-panel-head split">
              <b>Renderer layer</b>
              <em>MEASURED</em>
            </div>
            <div class="attach-metric-grid">
              <article v-for="metric in rendererMetrics" :key="metric[0]">
                <span>{{ metric[0] }}</span>
                <b>{{ metric[1] }}</b>
                <small>{{ metric[2] }}</small>
              </article>
            </div>
            <div class="attach-stability-row">
              <span>CLS 0.0000 · scroll drift 0px</span>
              <span>tail 11 / full parse 0 / cache 0</span>
            </div>
          </section>
          <small class="attach-source wide">markdown-it-ts docs/perf-latest.md · markstream-vue benchmark:1.0 main-playground-chat / replay · 2026-06-25</small>
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
            <span>Vue</span><span>DX</span><span>AI UI</span><span>Parser</span><span>Worker</span><span>Docs</span><span>Users</span><span>QA</span><span>Issues</span><span>PRs</span><span>Feedback</span>
          </div>
        </div>

        <div v-else-if="current.kind === 'qa'" class="attach-qa-layout">
          <section>
            <span class="attach-section">MARKSTREAM-VUE</span>
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
