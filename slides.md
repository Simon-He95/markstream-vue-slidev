---
theme: default
title: markstream-vue
info: AI Streaming Markdown Renderer for Vue
highlighter: shiki
lineNumbers: false
drawings:
  persist: false
transition: fade-out
colorSchema: dark
---

<div class="deck cover-slide">
  <div class="token-stream" aria-hidden="true">
    <span># Answer</span>
    <span>const stream = createMarkdownStream()</span>
    <span>&lt;thinking&gt;Searching context...&lt;/thinking&gt;</span>
    <span>&lt;tool-result status="done"&gt;12 docs&lt;/tool-result&gt;</span>
    <span>&#96;&#96;&#96;vue</span>
    <span>&lt;MarkdownRender :content="content" /&gt;</span>
    <span>&#96;&#96;&#96;</span>
    <span>final=true</span>
  </div>

  <div
    class="cover-copy"
    v-motion
    :initial="{ opacity: 0, y: 24 }"
    :enter="{ opacity: 1, y: 0, transition: { duration: 700 } }"
  >
    <img class="cover-logo" src="./public/markstream-logo.svg" alt="markstream-vue logo">
    <p class="eyebrow">Vue 3 AI Output UI Layer</p>
    <h1 class="hero-title">
      markstream-<span class="gradient-text" v-mark.underline="{ at: 1, color: '#22D3EE' }">vue</span>
    </h1>
    <p
      class="hero-subtitle"
      v-motion
      :initial="{ opacity: 0, y: 16 }"
      :enter="{ opacity: 1, y: 0, transition: { delay: 350, duration: 500 } }"
    >
      AI <span class="gradient-text">Streaming</span> Markdown Renderer for <span class="vue-text">Vue 3</span>
    </p>
  </div>

  <div
    class="cover-code glow-card"
    v-motion
    :initial="{ opacity: 0, x: 24 }"
    :enter="{ opacity: 1, x: 0, transition: { delay: 520, duration: 600 } }"
  >
    <div class="terminal-dots"><i></i><i></i><i></i></div>
    <div class="code-lines">
      <span><span class="tok comment"># Answer</span></span>
      <span><span class="tok fence">&#96;&#96;&#96;vue</span></span>
      <span><span class="tok tag">&lt;MarkdownRender</span> <span class="tok attr">:content</span>=<span class="tok str">"content"</span> <span class="tok attr">:final</span>=<span class="tok str">"final"</span> <span class="tok tag">/&gt;</span></span>
      <span><span class="tok fence">&#96;&#96;&#96;</span></span>
      <span><span class="tok tag">&lt;thinking&gt;</span>...<span class="tok tag">&lt;/thinking&gt;</span></span>
      <span><span class="tok tag">&lt;tool-result&gt;</span>...<span class="tok tag">&lt;/tool-result&gt;</span></span>
    </div>
  </div>

  <div class="speaker-line">Simon He / Simon-He95</div>
</div>

---

<div class="deck about-slide">
  <div class="section-head">
    <p class="eyebrow">开源 / 前端 / AI UI</p>
    <h1>关于 <span class="gradient-text">Simon</span></h1>
  </div>

  <div class="about-grid">
    <div class="avatar-orbit" v-motion :initial="{ opacity: 0, scale: 0.92 }" :enter="{ opacity: 1, scale: 1 }">
      <div class="avatar-core">SH</div>
    </div>
    <div class="about-copy">
      <p v-click><strong>Simon He / Simon-He95</strong></p>
      <p v-click>前端开源作者</p>
      <p v-click>关注 Vue、AI UI、Streaming Rendering、组件化基础设施</p>
      <p v-click>markstream-vue / markstream-core / streaming renderer ecosystem</p>
    </div>
  </div>

  <div class="memory-line" v-click>
    我不是想再造一个 Markdown 组件，而是想解决 AI 输出从 token 到 UI 的最后一公里。
  </div>
</div>

---

<div class="deck contrast-slide">
  <div class="section-head">
    <p class="eyebrow">从格式到协议</p>
    <h1>Markdown 不再只是文档格式。</h1>
  </div>

  <div class="compare-grid">
    <div v-click class="compare-panel"><p class="panel-label">过去</p><h2>Markdown</h2><div class="equals-line">=</div><p>完成后的文档</p></div>
    <div v-click class="compare-panel primary"><p class="panel-label">现在</p><h2>Markdown</h2><div class="equals-line">=</div><p><span class="protocol-highlight">AI 输出协议</span></p></div>
  </div>

  <div class="memory-line" v-click>
    从“渲染文档”到“渲染生成过程”。
  </div>
</div>

---

<div class="deck unfinished-slide">
  <div class="section-head">
    <p class="eyebrow">流式渲染真正的问题</p>
    <h1>难点不是 Markdown。<br><span class="gradient-text">难点是未完成的 Markdown。</span></h1>
  </div>

  <div class="split-visual">
    <div class="terminal-card broken-panel">
      <div class="terminal-dots"><i></i><i></i><i></i></div>
      <div class="code-lines broken-code">
        <span><span class="tok fence">&#96;&#96;&#96;ts</span></span>
        <span><span class="tok kw">const</span> answer <span class="tok op">=</span> <span class="tok kw">await</span> agent.run(</span>
        <span>&nbsp;</span>
        <span>|</span>
      </div>
    </div>
    <div class="pain-list">
      <div class="pain-item" v-click><span>01</span>代码块还没闭合：&#96;&#96;&#96;ts</div>
      <div class="pain-item" v-click><span>02</span>表格边生成边抖动</div>
      <div class="pain-item" v-click><span>03</span>Mermaid / KaTeX / Monaco heavy block 阻塞</div>
      <div class="pain-item" v-click><span>04</span>长对话 DOM 持续膨胀</div>
      <div class="pain-item" v-click><span>05</span>Agent 工具结果只能当字符串</div>
    </div>
  </div>

  <div class="memory-line" v-click>
    传统 Markdown renderer 假设输入已经完成；AI 时代，用户盯着的是中间态。
  </div>
</div>

---

<div class="deck judgment-slide">
  <div class="section-head">
    <p class="eyebrow">重新定义品类</p>
    <h1>只叫 Markdown Renderer，太小了。</h1>
  </div>

  <div class="flow-stage" v-click>
    <span class="pipeline-node muted">完整 Markdown</span>
    <span class="flow-arrow">→</span>
    <span class="pipeline-node muted">HTML</span>
    <span class="flow-caption">普通 Markdown Renderer</span>
  </div>

  <div class="flow-stage active" v-click>
    <span class="pipeline-node">token stream</span>
    <span class="flow-arrow">→</span>
    <span class="pipeline-node">稳定可交互 UI</span>
    <span class="flow-caption">AI Streaming Renderer</span>
  </div>

  <div
    class="output-layer"
    v-click
    v-motion
    :initial="{ opacity: 0, scale: 0.94 }"
    :enter="{ opacity: 1, scale: 1, transition: { duration: 500 } }"
  >
    AI Output UI Layer
  </div>
</div>

---

<div class="deck what-slide">
  <div class="section-head">
    <p class="eyebrow">它是什么</p>
    <h1>markstream-vue: Vue 3 原生的流式 UI renderer</h1>
  </div>

  <p class="lead">
    一个为 Vue 3 设计的 AI streaming Markdown renderer，把持续变化的 Markdown 渲染成稳定、可交互、可扩展的 Vue UI。
  </p>

  <div class="capability-grid">
    <div class="glow-card capability" v-click>
      <p>Streaming 友好</p>
      <span>final / typewriter / smooth-streaming</span>
    </div>
    <div class="glow-card capability" v-click>
      <p>Heavy Block Ready</p>
      <span>Code / Mermaid / KaTeX / D2 / Monaco</span>
    </div>
    <div class="glow-card capability" v-click>
      <p>Vue 组件原生接入</p>
      <span>custom tags → app-scoped Vue components</span>
    </div>
  </div>
</div>

---

<div class="deck setup-slide">
  <div class="section-head">
    <p class="eyebrow">最小接入</p>
    <h1>30 秒接入 Streaming Markdown</h1>
  </div>

  <div class="code-chat-grid">
    <div class="terminal-card code-large">
      <div class="terminal-dots"><i></i><i></i><i></i></div>
      <div class="code-lines">
        <span><span class="tok tag">&lt;script setup lang="ts"&gt;</span></span>
        <span><span class="tok kw">import</span> MarkdownRender <span class="tok kw">from</span> <span class="tok str">'markstream-vue'</span></span>
        <span><span class="tok kw">import</span> { ref } <span class="tok kw">from</span> <span class="tok str">'vue'</span></span>
        <span>&nbsp;</span>
        <span><span class="tok kw">const</span> content <span class="tok op">=</span> ref(<span class="tok str">''</span>)</span>
        <span><span class="tok kw">const</span> final <span class="tok op">=</span> ref(<span class="tok bool">false</span>)</span>
        <span><span class="tok tag">&lt;/script&gt;</span></span>
        <span>&nbsp;</span>
        <span><span class="tok tag">&lt;template&gt;</span></span>
        <span>&nbsp;&nbsp;<span class="tok tag">&lt;MarkdownRender</span></span>
        <span>&nbsp;&nbsp;&nbsp;&nbsp;<span class="tok attr">:content</span>=<span class="tok str">"content"</span></span>
        <span>&nbsp;&nbsp;&nbsp;&nbsp;<span class="tok attr">:final</span>=<span class="tok str">"final"</span></span>
        <span>&nbsp;&nbsp;&nbsp;&nbsp;<span class="tok attr">:max-live-nodes</span>=<span class="tok str">"0"</span></span>
        <span>&nbsp;&nbsp;&nbsp;&nbsp;<span class="tok attr">:typewriter</span>=<span class="tok str">"true"</span></span>
        <span>&nbsp;&nbsp;&nbsp;&nbsp;<span class="tok attr">:fade</span>=<span class="tok str">"false"</span></span>
        <span>&nbsp;&nbsp;<span class="tok tag">/&gt;</span></span>
        <span><span class="tok tag">&lt;/template&gt;</span></span>
      </div>
    </div>
    <div class="browser-preview glow-card" v-click>
      <div class="chat-bubble">
        <p class="typing-line">流式回答生成中...</p>
        <pre><code>await agent.run()</code></pre>
        <p>以稳定的 Vue UI 持续更新。</p>
      </div>
    </div>
  </div>

  <div class="memory-line" v-click>
    最小心智模型：不断更新 content，完成时设置 final。
  </div>
</div>

---

<div class="deck ux-slide">
  <div class="section-head">
    <p class="eyebrow">Streaming UX</p>
    <h1>让流式输出看起来“有意图”。</h1>
  </div>

  <div class="stream-grid">
    <div class="chunk-rail">
      <span v-click>chunk_01: "# Answer"</span>
      <span v-click>chunk_02: "&#96;&#96;&#96;ts"</span>
      <span v-click>chunk_03: "const a"</span>
      <span v-click>chunk_04: "final..."</span>
    </div>
    <div class="render-rail">
      <div class="ux-row" v-click>
        <strong>final=false</strong>
        <span>处理中间态，允许 temporary auto-close</span>
      </div>
      <div class="ux-row" v-click>
        <strong>typewriter=true</strong>
        <span>让 token 输出更接近真实生成</span>
      </div>
      <div class="ux-row" v-click>
        <strong>smooth-streaming="auto"</strong>
        <span>typewriter 或 max-live-nodes&lt;=0 时自动启用 pacing</span>
      </div>
    </div>
  </div>

  <div class="memory-line" v-click>
    用户感受到的不是 token，而是节奏、稳定性和完成感。
  </div>
</div>

---

<div class="deck heavy-slide">
  <div class="section-head">
    <p class="eyebrow">不只是文本</p>
    <h1>AI 输出不只是 text。</h1>
  </div>

  <div class="heavy-grid">
    <div class="heavy-panel" v-click>
      <span class="mini-label">Code</span>
      <p>streaming diff / Monaco / Shiki</p>
    </div>
    <div class="heavy-panel" v-click>
      <span class="mini-label">Diagram</span>
      <p>Mermaid / D2 / Infographic</p>
    </div>
    <div class="heavy-panel" v-click>
      <span class="mini-label">Formula</span>
      <p>KaTeX</p>
    </div>
    <div class="heavy-panel" v-click>
      <span class="mini-label">Rich Node</span>
      <p>image / custom renderer / interactive block</p>
    </div>
  </div>

  <div class="memory-line" v-click>
    Heavy blocks 不应该打断流式体验。
  </div>
</div>

---

<div class="deck components-slide">
  <div class="section-head">
    <p class="eyebrow">记忆点 01</p>
    <h1>让 AI 输出渲染成 <span v-mark.box="{ at: 4, color: '#22D3EE' }">真实 Vue 组件</span>。</h1>
  </div>

  <div class="component-map">
    <div class="terminal-card map-code" v-click>
      <div class="terminal-dots"><i></i><i></i><i></i></div>
      <div class="code-lines">
        <span><span class="tok tag">&lt;thinking&gt;</span></span>
        <span>I need to search the knowledge base first.</span>
        <span><span class="tok tag">&lt;/thinking&gt;</span></span>
        <span><span class="tok tag">&lt;tool-result</span> <span class="tok attr">name</span>=<span class="tok str">"search"</span> <span class="tok attr">status</span>=<span class="tok str">"done"</span><span class="tok tag">&gt;</span></span>
        <span>Found 12 related documents.</span>
        <span><span class="tok tag">&lt;/tool-result&gt;</span></span>
        <span><span class="tok tag">&lt;answer-box</span> <span class="tok attr">type</span>=<span class="tok str">"final"</span><span class="tok tag">&gt;</span></span>
        <span>Here is the answer...</span>
        <span><span class="tok tag">&lt;/answer-box&gt;</span></span>
      </div>
    </div>
    <div class="map-arrow" v-click>→</div>
    <div class="terminal-card map-code" v-click>
      <div class="terminal-dots"><i></i><i></i><i></i></div>
      <div class="code-lines">
        <span><span class="tok kw">import</span> { VueRendererMarkdown } <span class="tok kw">from</span> <span class="tok str">'markstream-vue'</span></span>
        <span>&nbsp;</span>
        <span>app.use(VueRendererMarkdown, {</span>
        <span>&nbsp;&nbsp;<span class="tok prop">components</span>: {</span>
        <span>&nbsp;&nbsp;&nbsp;&nbsp;<span class="tok prop">thinking</span>: ThinkingNode,</span>
        <span>&nbsp;&nbsp;&nbsp;&nbsp;<span class="tok prop">'tool-result'</span>: ToolResultNode,</span>
        <span>&nbsp;&nbsp;&nbsp;&nbsp;<span class="tok prop">'answer-box'</span>: AnswerBoxNode,</span>
        <span>&nbsp;&nbsp;},</span>
        <span>})</span>
      </div>
    </div>
  </div>

  <div class="memory-line" v-click>
    推荐的 1.x 路径是 app-scoped components：适合 SSR、Nuxt 和多实例应用。
  </div>
</div>

---

<div class="deck agent-slide">
  <div class="section-head">
    <p class="eyebrow">典型场景</p>
    <h1>markstream-vue 放在哪里</h1>
  </div>

  <div class="path-map">
    <div class="path-node" v-click>
      <strong>AI Chat</strong>
      <span>流式回答、代码、公式、图表</span>
    </div>
    <div class="path-node" v-click>
      <strong>Agent Report</strong>
      <span>thinking、tool result、step card</span>
    </div>
    <div class="path-node" v-click>
      <strong>Knowledge Base</strong>
      <span>长文档、引用、来源卡片</span>
    </div>
    <div class="path-node" v-click>
      <strong>Code Review</strong>
      <span>diff、解释、修复建议</span>
    </div>
    <div class="path-node" v-click>
      <strong>Docs / CMS</strong>
      <span>Markdown + Vue custom blocks</span>
    </div>
  </div>

  <div class="memory-line" v-click>
    Agent 的输出不应该永远停留在字符串层。
  </div>
</div>

---

<div class="deck perf-slide">
  <div class="section-head">
    <p class="eyebrow">可观察质量</p>
    <h1>性能，本质是用户可见的稳定性。</h1>
  </div>

  <div class="metrics-board">
    <div class="metric-check" v-click>
      <b>Perceived Stability</b>
      <span>CLS / scroll drift / block flashing</span>
    </div>
    <div class="metric-check" v-click>
      <b>Streaming Responsiveness</b>
      <span>settle time / frame p95 / long task</span>
    </div>
    <div class="metric-check" v-click>
      <b>Heavy Block Readiness</b>
      <span>Mermaid ready / KaTeX ready / fallback count</span>
    </div>
    <div class="metric-check" v-click>
      <b>Resource Health</b>
      <span>DOM node count / heap after unmount</span>
    </div>
  </div>

  <div class="memory-line" v-click>
    性能不是一句 claim，而是一组可复现的观察指标。
  </div>
</div>

---

<div class="deck production-slide">
  <div class="section-head">
    <p class="eyebrow">生产环境</p>
    <h1>进入生产，不只是能渲染。</h1>
  </div>

  <div class="prod-checklist">
    <div class="prod-row" v-click>
      <b>默认安全 HTML</b>
      <code>html-policy="safe"</code>
    </div>
    <div class="prod-row" v-click>
      <b>SSR ready</b>
      <span>Vue / Vite / Nuxt / VitePress</span>
    </div>
    <div class="prod-row" v-click>
      <b>组件作用域</b>
      <span>VueRendererMarkdown 的 app-scoped components</span>
    </div>
    <div class="prod-row" v-click>
      <b>Optional peers</b>
      <span>按需安装 Mermaid / KaTeX / Monaco / D2 / Infographic</span>
    </div>
  </div>

  <div class="memory-line" v-click>
    默认 safe；不可信内容想显示原始 HTML 文本时，用 html-policy="escape"。
  </div>
</div>

---

<div class="deck vue-first-slide">
  <div class="section-head">
    <p class="eyebrow">定位</p>
    <h1>Vue 3 stable, ecosystem foundation.</h1>
  </div>

  <div class="vue-first-core glow-card">
    <div v-click>1.0 稳定范围：Vue 3 renderer package</div>
    <div v-click>MarkdownRender / content / nodes / final / typewriter</div>
    <div v-click>safe HTML / SSR / CSS exports / optional heavy peers</div>
  </div>

  <div class="ecosystem-line" v-click>
    Experimental / internal expansion:<br>
    <span>Vue 2 · Vue 3 · Svelte · React · Nuxt · Next · Angular</span>
  </div>

  <div class="memory-line" v-click>
    公开 1.x 稳定承诺先聚焦 Vue 3；多生态是内部扩展与 rendering foundation 方向。
  </div>
</div>

---

<div class="deck compare-streamdown-slide">
  <div class="section-head">
    <p class="eyebrow">生态参照</p>
    <h1>React reference vs Vue 3 原生答案</h1>
  </div>

  <table class="compare-table">
    <thead>
      <tr>
        <th>维度</th>
        <th v-click>streamdown</th>
        <th v-click>markstream-vue</th>
      </tr>
    </thead>
    <tbody>
      <tr v-click>
        <td>主生态</td>
        <td>React / Vercel / AI SDK</td>
        <td>Vue 3 / Nuxt / VitePress</td>
      </tr>
      <tr v-click>
        <td>定位</td>
        <td>react-markdown drop-in replacement</td>
        <td>Vue 3 原生 streaming UI renderer</td>
      </tr>
      <tr v-click>
        <td>强项</td>
        <td>生态影响力、AI Elements、插件化</td>
        <td>Vue 组件体系、app-scoped custom components、SSR、heavy blocks</td>
      </tr>
      <tr v-click>
        <td>适合</td>
        <td>React AI app</td>
        <td>Vue 3 / Nuxt AI app、Agent UI、知识库</td>
      </tr>
      <tr v-click>
        <td>话术</td>
        <td>reference signal</td>
        <td>Vue 3 answer</td>
      </tr>
    </tbody>
  </table>

  <div class="memory-line" v-click>
    streamdown 证明了 streaming Markdown 是真实需求；markstream-vue 让 Vue 生态有了原生答案。
  </div>
</div>

---

<div class="deck demo-slide">
  <div class="section-head">
    <p class="eyebrow">Live Demo</p>
    <h1>Demo: 从 SSE 到 Vue 组件</h1>
  </div>

  <div class="demo-grid">
    <div class="terminal-card demo-terminal">
      <div class="terminal-dots"><i></i><i></i><i></i></div>
      <div class="code-lines event-block" v-click>
        <span><span class="tok prop">event</span>: <span class="tok str">token</span></span>
        <span><span class="tok prop">data</span>: <span class="tok tag">&lt;thinking&gt;</span>Searching docs...<span class="tok tag">&lt;/thinking&gt;</span></span>
      </div>
      <div class="code-lines event-block" v-click>
        <span><span class="tok prop">event</span>: <span class="tok str">token</span></span>
        <span><span class="tok prop">data</span>: <span class="tok fence">&#96;&#96;&#96;ts</span></span>
        <span><span class="tok prop">data</span>: <span class="tok kw">const</span> answer <span class="tok op">=</span> <span class="tok kw">await</span> agent.run()</span>
        <span><span class="tok prop">data</span>: <span class="tok fence">&#96;&#96;&#96;</span></span>
      </div>
      <div class="code-lines event-block" v-click>
        <span><span class="tok prop">event</span>: <span class="tok str">done</span></span>
        <span><span class="tok prop">data</span>: final=<span class="tok bool">true</span></span>
      </div>
    </div>
    <div class="browser-window glow-card">
      <div class="browser-top"><span></span><span></span><span></span><b>localhost:3030</b></div>
      <div class="demo-preview">
        <div class="preview-row thinking-card" v-click>
          <span>Thinking</span>
          <b>Searching docs</b>
        </div>
        <div class="preview-row tool-card" v-click>
          <span>Tool result</span>
          <b>12 related documents</b>
        </div>
        <pre class="inline-code" v-click><code>const answer = await agent.run()</code></pre>
        <div class="preview-row answer-card" v-click>
          <span>Final</span>
          <b>final=true 后消息稳定落地</b>
        </div>
      </div>
    </div>
  </div>

  <div class="demo-steps" v-click>
    SSE chunks → content 追加 → MarkdownRender 解析中间态 → heavy blocks 稳定渲染 → custom tags 变成 Vue 组件 → final=true 收束
  </div>
</div>

---

<div class="deck foundation-slide">
  <div class="section-head">
    <p class="eyebrow">记忆点 02</p>
    <h1>从 Vue 3 Library 到 <span class="gradient-text">Rendering Foundation</span></h1>
  </div>

  <div class="architecture-stack">
    <div class="arch-layer app-layer" v-click>
      <span>Application Layer</span>
      <b>AI Chat · Agent Report · Knowledge Base · Code Review</b>
    </div>
    <div class="arch-layer framework-layer" v-click>
      <span>Framework Layer</span>
      <b>Vue 3 stable · Vue 2 / React / Angular / Svelte exp.</b>
    </div>
    <div class="arch-layer meta-layer" v-click>
      <span>Meta Framework Layer</span>
      <b>Nuxt / VitePress SSR · Next exp.</b>
    </div>
  </div>

  <div class="memory-line" v-click>
    先把 Vue 3 的 AI 输出层做扎实，再沉淀可复用的 streaming rendering foundation。
  </div>

  <div class="cn-note" v-click>
    注意口径：跨框架包与 playground 属于 experimental / internal，不作为 1.x 稳定承诺。
  </div>
</div>

---

<div class="deck qa-slide">
  <div class="qa-center">
    <img class="qa-logo" src="./public/markstream-logo.svg" alt="markstream-vue logo">
    <h1>Q&A</h1>
    <p>Markdown 正在成为 AI 输出的 UI 协议。<br>Vue 下一步应该渲染什么？</p>
    <div class="qr-placeholder" aria-label="QR placeholder"></div>
  </div>

  <div class="qa-footer">
    GitHub: Simon-He95/markstream-vue<br>
    Docs / Playground / Discussions
  </div>
</div>
