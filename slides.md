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
    <span>content + final + smooth-streaming</span>
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
      markstream-<span class="gradient-text" v-mark.underline="{ at: 1, color: '#569CD6' }">vue</span>
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
      <span><span class="tok tag">&lt;MarkdownRender</span> <span class="tok attr">custom-id</span>=<span class="tok str">"chat"</span> <span class="tok attr">:content</span>=<span class="tok str">"content"</span> <span class="tok attr">:final</span>=<span class="tok str">"final"</span> <span class="tok attr">smooth-streaming</span>=<span class="tok str">"auto"</span> <span class="tok tag">/&gt;</span></span>
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
    <p class="eyebrow">About Simon</p>
    <h1>关于 <span class="gradient-text">Simon</span></h1>
  </div>

  <div class="about-grid">
    <div class="about-profile" v-motion :initial="{ opacity: 0, scale: 0.92 }" :enter="{ opacity: 1, scale: 1 }">
      <div class="avatar-orbit">
        <img class="github-avatar" src="./public/simon-avatar.png" alt="Simon He GitHub avatar">
      </div>
      <div class="profile-meta">
        <strong>Simon He</strong>
        <span>Simon-He95 · Shanghai</span>
      </div>
    </div>
    <div class="about-copy">
      <p v-click><strong>前端爱好者 / OSS contributor</strong></p>
      <p v-click>关注 Vue、DX、AI UI、Streaming Rendering、VS Code 插件</p>
      <div class="project-line" v-click>
        <span class="role-label">Maintainer</span>
        <span class="project-chip"><img src="./public/project-logos/unocss.png" alt="">UnoCSS</span>
        <span class="project-chip"><img src="./public/project-logos/deepchat.png" alt="">DeepChat</span>
        <span class="project-chip"><img src="./public/project-logos/vue-vine.png" alt="">Vue Vine</span>
      </div>
      <div class="project-line" v-click>
        <span class="role-label">Author</span>
        <span class="project-chip"><img src="./public/markstream-logo.svg" alt="">markstream-vue</span>
        <span class="project-chip"><img src="./public/project-logos/vscode-use.png" alt="">vscode-use</span>
        <span class="project-chip"><img src="./public/project-logos/awesome-compressor.png" alt="">awesome-compressor</span>
      </div>
      <div class="project-line vscode-plugins" v-click>
        <span class="role-label">VS Code</span>
        <span class="project-chip"><img src="./public/project-logos/vscode.svg" alt="">Common Intellisense</span>
        <span class="project-chip"><img src="./public/project-logos/vscode.svg" alt="">UnoT</span>
        <span class="project-chip"><img src="./public/project-logos/vscode.svg" alt="">Tailwind Magic</span>
        <span class="project-chip"><img src="./public/project-logos/vscode.svg" alt="">To Tailwind</span>
        <span class="project-chip"><img src="./public/project-logos/vscode.svg" alt="">Alias Jump</span>
      </div>
      <div class="project-line compact" v-click>
        <span class="role-label">PRs</span>
        <span class="project-chip ghost"><img src="./public/project-logos/vite.png" alt="">Vite</span>
        <span class="project-chip ghost"><img src="./public/project-logos/element-plus.png" alt="">Element Plus</span>
        <span class="project-chip ghost"><img src="./public/project-logos/tdesign.png" alt="">TDesign Vue Next</span>
      </div>
    </div>
  </div>

  <div class="social-strip">
    <a href="https://github.com/Simon-He95" class="social-pill">
      <img src="./public/social-icons/github.svg" alt="">
      <span>Simon-He95</span>
    </a>
    <a href="https://simonhe.me" class="social-pill">
      <span class="social-symbol">↗</span>
      <span>simonhe.me</span>
    </a>
    <a href="https://twitter.com/simon_he1995" class="social-pill">
      <img src="./public/social-icons/x.svg" alt="">
      <span>@simon_he1995</span>
    </a>
    <a href="https://space.bilibili.com/413596956" class="social-pill">
      <img src="./public/social-icons/bilibili.svg" alt="">
      <span>413596956</span>
    </a>
    <a href="https://discord.gg/ZnjxzMKWNW" class="social-pill">
      <img src="./public/social-icons/discord.svg" alt="">
      <span>Discord</span>
    </a>
  </div>

  <div class="repo-line">
    GitHub 上有 628 个 public repositories · VS Code Marketplace 多个 extensions
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

<div class="deck legacy-ai-slide">
  <div class="section-head">
    <p class="eyebrow">对比传统 AI 渲染</p>
    <h1>流式输出时，renderer 已经是用户正在操作的 UI。</h1>
  </div>

  <div class="legacy-grid">
    <div class="legacy-card code-case" v-click>
      <span class="mini-label">whole-block update</span>
      <b>Code block 整体重绘</b>
      <p>如果每次追加都替换整块 code，用户正在选中的代码、局部滚动和 hover 状态都可能被打断。</p>
    </div>
    <div class="legacy-card" v-click>
      <span class="mini-label">intermediate state</span>
      <b>未完成语法反复改形</b>
      <p>未闭合 fence、表格、Mermaid、数学公式在解析中间态来回变化，页面就会闪烁、抖动、跳高。</p>
    </div>
    <div class="legacy-card" v-click>
      <span class="mini-label">heavy block</span>
      <b>重型节点阻塞 token 节奏</b>
      <p>如果 Shiki、Mermaid、KaTeX、Monaco 跟着每个 chunk 抢主线程，AI 输出越丰富，卡顿越明显。</p>
    </div>
    <div class="legacy-card" v-click>
      <span class="mini-label">custom UI</span>
      <b>业务组件接入成本高</b>
      <p>thinking、tool result、diff、引用卡片都想变成组件；但跨 AST、HTML、框架组件和 SSR 作用域，适配会很重。</p>
    </div>
  </div>

  <div class="memory-line" v-click>
    AI Markdown 的核心体验，是让增长中的内容保持稳定身份。
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
      <span>content / final / pacing</span>
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
        <span><span class="tok kw">import</span> <span class="tok str">'markstream-vue/index.css'</span></span>
        <span><span class="tok kw">import</span> { ref } <span class="tok kw">from</span> <span class="tok str">'vue'</span></span>
        <span><span class="tok kw">const</span> content <span class="tok op">=</span> ref(<span class="tok str">''</span>)</span>
        <span><span class="tok kw">const</span> final <span class="tok op">=</span> ref(<span class="tok bool">false</span>)</span>
        <span><span class="tok tag">&lt;/script&gt;</span></span>
        <span><span class="tok tag">&lt;template&gt;</span></span>
        <span>&nbsp;&nbsp;<span class="tok tag">&lt;MarkdownRender</span></span>
        <span>&nbsp;&nbsp;&nbsp;&nbsp;<span class="tok attr">custom-id</span>=<span class="tok str">"chat"</span></span>
        <span>&nbsp;&nbsp;&nbsp;&nbsp;<span class="tok attr">:content</span>=<span class="tok str">"content"</span></span>
        <span>&nbsp;&nbsp;&nbsp;&nbsp;<span class="tok attr">:final</span>=<span class="tok str">"final"</span></span>
        <span>&nbsp;&nbsp;&nbsp;&nbsp;<span class="tok attr">smooth-streaming</span>=<span class="tok str">"auto"</span></span>
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
    最小心智模型：更新 content，完成时设置 final；高频流式再按场景加 smooth streaming / batching。
  </div>
</div>

---

<div class="deck stream-compare-slide">
  <div class="section-head">
    <p class="eyebrow">Same Content Streaming</p>
    <h1>同一段输出，差异会直接出现在交互里。</h1>
  </div>

  <StreamingRenderPlay />
</div>

---

<div class="deck perf-trace-slide">
  <div class="section-head">
    <p class="eyebrow">Performance Evidence</p>
    <h1>按内容类型拆开看，瓶颈才清楚。</h1>
  </div>

  <div class="evidence-shot" v-click>
    <img src="./public/streaming-performance-evidence.png" alt="Streaming Markdown E2E performance evidence">
  </div>

  <div class="perf-method" v-click>
    3-run median · Chrome CDP · 8 cases × 119 chunks · markstream-vue@1.0.1-beta.5 published package
  </div>

  <div class="trace-metrics" v-click>
    <span>Full mix task: 633.6ms → 308ms</span>
    <span>Full mix scripting: 296.4ms → 16.3ms</span>
    <span>Full mix layout: 27.4ms → 20.6ms</span>
    <span>Full mix DOM: 417 → 157</span>
  </div>
</div>

---

<div class="deck parser-foundation-slide">
  <div class="section-head">
    <p class="eyebrow">Parser Foundation</p>
    <h1>很多 AST-first Markdown renderer 的成本，先输在 parser 管线。</h1>
  </div>

  <div class="parser-route">
    <div class="parser-card ast" v-click>
      <span class="mini-label">common AST pipeline</span>
      <b>Markdown → AST → HTML AST → Framework tree → DOM</b>
      <p>转换生态强，但 streaming 场景里，每个 chunk 都可能让多个中间层重新计算。</p>
    </div>
    <div class="parser-card token" v-click>
      <span class="mini-label">markstream-vue</span>
      <b>Markdown → markdown-it-ts Token → streaming nodes</b>
      <p>基于 markdown-it 兼容的 ruler / token parser，直接进入适合 Vue 渲染的节点结构，减少中间步骤。</p>
    </div>
  </div>

  <div class="parser-bench-grid">
    <div class="bench-card" v-click>
      <span>remark append</span>
      <b>58.9× / 69.7× / 90.4×</b>
      <small>5k / 20k / 100k chars</small>
    </div>
    <div class="bench-card" v-click>
      <span>micromark append</span>
      <b>46.5× / 50.7× / 58.9×</b>
      <small>5k / 20k / 100k chars</small>
    </div>
    <div class="bench-card" v-click>
      <span>remark + rehype render</span>
      <b>23.9× / 36.6× / 37.1×</b>
      <small>5k / 20k / 100k chars</small>
    </div>
  </div>

  <div class="source-note" v-click>
    数据来自 markdown-it-ts@1.0.0 README synthetic paragraph-heavy / append-heavy harness；不是所有 workload 都 50×。
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

<div class="deck pipeline-slide">
  <div class="section-head">
    <p class="eyebrow">核心实现</p>
    <h1>低 CPU 的关键，是少做无意义重绘。</h1>
  </div>

  <div class="pipeline-strip">
    <div class="pipeline-step" v-click>
      <span>01</span>
      <b>chunk buffer</b>
      <p>追加 token</p>
    </div>
    <div class="pipeline-step" v-click>
      <span>02</span>
      <b>incomplete parse</b>
      <p>容忍未闭合 Markdown</p>
    </div>
    <div class="pipeline-step" v-click>
      <span>03</span>
      <b>stable live nodes</b>
      <p>保持代码块、图表、组件身份</p>
    </div>
    <div class="pipeline-step" v-click>
      <span>04</span>
      <b>update scheduler</b>
      <p>控制 DOM 提交节奏</p>
    </div>
    <div class="pipeline-step" v-click>
      <span>05</span>
      <b>final commit</b>
      <p>完整结构稳定落地</p>
    </div>
  </div>

  <div class="principle-grid">
    <div class="principle" v-click>
      <b>文本走快路径</b>
      <span>cheap text append，不让每个 chunk 触发 heavy render</span>
    </div>
    <div class="principle" v-click>
      <b>重型节点排队</b>
      <span>Shiki / Mermaid / KaTeX / Monaco 渐进进入渲染链路</span>
    </div>
    <div class="principle" v-click>
      <b>交互状态保留</b>
      <span>selection、局部滚动、组件状态不跟着 token 丢失</span>
    </div>
  </div>

  <div class="memory-line" v-click>
    不是每个 chunk 全量重渲染，而是只更新还在增长的 live nodes。
  </div>
</div>

---

<div class="deck noderender-optimization-slide">
  <div class="section-head">
    <p class="eyebrow">NodeRenderer Optimization</p>
    <h1>NodeRenderer 做的不是“渲染更多”，而是“少提交”。</h1>
  </div>

  <div class="optimization-grid">
    <div class="optimization-card" v-click>
      <b>stream parser cache</b>
      <span><code>parseMarkdownToStructure</code> 默认 <code>streamParse="auto"</code>，流式中间态复用 parser cache，final 时收束。</span>
    </div>
    <div class="optimization-card" v-click>
      <b>smooth streaming bridge</b>
      <span><code>smoothStreaming="auto"</code> 控制可见内容节奏，不让 transport chunk 直接等于 DOM commit。</span>
    </div>
    <div class="optimization-card" v-click>
      <b>live range + batch render</b>
      <span>默认虚拟化窗口保留滚动/内存；<code>maxLiveNodes=0</code> 时进入增量批次。</span>
    </div>
    <div class="optimization-card" v-click>
      <b>heavy node deferral</b>
      <span><code>viewportPriority</code> 和 <code>deferNodesUntilVisible</code> 让 Monaco、Mermaid、KaTeX 靠近视口再进入重型路径。</span>
    </div>
    <div class="optimization-card" v-click>
      <b>code block strategy</b>
      <span>普通代码可用 <code>renderCodeBlocksAsPre</code> 或 <code>MarkdownCodeBlockNode</code>；需要交互时再接 Monaco。</span>
    </div>
    <div class="optimization-card" v-click>
      <b>custom components</b>
      <span><code>custom-html-tags</code> 让 trusted tags 成为稳定节点，再由 <code>VueRendererMarkdown</code> 映射到 app-scoped components。</span>
    </div>
  </div>

  <div class="memory-line" v-click>
    优化目标很具体：更少 parse、更少 DOM mutation、更少 heavy block 抢主线程。
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
        <strong>:final="final"</strong>
        <span>完成时切到最终解析，未闭合 fence / math 不会停在 loading 中间态</span>
      </div>
      <div class="ux-row" v-click>
        <strong>smooth-streaming="auto"</strong>
        <span>typewriter 或 max-live-nodes&lt;=0 时自动 pacing</span>
      </div>
      <div class="ux-row" v-click>
        <strong>:batch-rendering="true"</strong>
        <span>禁用虚拟窗口时用批次提交，避免每个 token 直接变成 DOM commit</span>
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
    <h1>让 AI 输出渲染成 <span v-mark.box="{ at: 4, color: '#569CD6' }">真实 Vue 组件</span>。</h1>
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
        <span><span class="tok kw">import</span> MarkdownRender, { VueRendererMarkdown } <span class="tok kw">from</span> <span class="tok str">'markstream-vue'</span></span>
        <span>createApp(App)</span>
        <span>&nbsp;&nbsp;.use(VueRendererMarkdown, {</span>
        <span>&nbsp;&nbsp;<span class="tok prop">components</span>: {</span>
        <span>&nbsp;&nbsp;&nbsp;&nbsp;<span class="tok prop">thinking</span>: ThinkingNode,</span>
        <span>&nbsp;&nbsp;&nbsp;&nbsp;<span class="tok prop">'tool-result'</span>: ToolResultNode,</span>
        <span>&nbsp;&nbsp;&nbsp;&nbsp;<span class="tok prop">'answer-box'</span>: AnswerBoxNode,</span>
        <span>&nbsp;&nbsp;}</span>
        <span>})</span>
        <span>&nbsp;&nbsp;.component(<span class="tok str">'MarkdownRender'</span>, MarkdownRender)</span>
        <span>&nbsp;&nbsp;.mount(<span class="tok str">'#app'</span>)</span>
      </div>
    </div>
  </div>

  <div class="memory-line" v-click>
    生产 / SSR 优先用 app-scoped components；局部页面再用 scoped setCustomComponents。
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
    <h1>性能，本质是低 CPU 下的稳定性。</h1>
  </div>

  <div class="metrics-board">
    <div class="metric-check" v-click>
      <b>Perceived Stability</b>
      <span>CLS / scroll drift / block flashing</span>
    </div>
    <div class="metric-check" v-click>
      <b>Streaming Responsiveness</b>
      <span>CPU footprint / frame p95 / long task</span>
    </div>
    <div class="metric-check" v-click>
      <b>Heavy Block Readiness</b>
      <span>Mermaid ready / KaTeX ready / fallback count</span>
    </div>
    <div class="metric-check" v-click>
      <b>Resource Health</b>
      <span>DOM node count / heap / idle CPU</span>
    </div>
  </div>

  <div class="memory-line" v-click>
    性能不是一句 claim，而是 Performance 面板里更少的 CPU spike。
  </div>
</div>

---

<div class="deck compare-streamdown-slide">
  <div class="section-head">
    <p class="eyebrow">生态参照</p>
    <h1>streamdown 是参照，不是 Vue 场景的终点。</h1>
  </div>

  <table class="compare-table">
    <thead>
      <tr>
        <th>维度</th>
        <th v-click>streamdown core config</th>
        <th v-click>markstream-vue</th>
      </tr>
    </thead>
    <tbody>
      <tr v-click>
        <td>生态落点</td>
        <td>React / Vercel / AI SDK</td>
        <td>Vue 3 / Nuxt / VitePress</td>
      </tr>
      <tr v-click>
        <td>Code 更新</td>
        <td>整块 code 随 chunk 重算/替换时，selection / 局部滚动容易被打断</td>
        <td>面向 live block 控制更新节奏，final 后稳定落地</td>
      </tr>
      <tr v-click>
        <td>中间态</td>
        <td>未闭合 Markdown 如果反复替换临时结构，代码块、表格、图表容易闪烁和跳高</td>
        <td>final=false 处理临时结构，减少中间态 DOM 抖动</td>
      </tr>
      <tr v-click>
        <td>重型节点</td>
        <td>如果 Mermaid / KaTeX / 高亮随每个 chunk 进入主线程，token 节奏会被抢占</td>
        <td>heavy block 渐进渲染，避免打断 token 输出</td>
      </tr>
      <tr v-click>
        <td>自定义 UI</td>
        <td>React 组件和插件体系强，但 Vue 业务需要额外适配</td>
        <td>custom tags 通过 app-scoped Vue components 稳定接入</td>
      </tr>
      <tr v-click>
        <td>CPU / DOM</td>
        <td>本次 core-config E2E 样例里，scripting 与 DOM mutation 更高</td>
        <td>scripting / DOM mutation 更低；layout / p95 按 workload 验证</td>
      </tr>
    </tbody>
  </table>

  <div class="memory-line" v-click>
    streamdown 证明需求成立；markstream-vue 在 Vue 侧把稳定交互、低 scripting 和组件化做成默认路径。
  </div>
</div>

---

<div class="deck adoption-slide">
  <div class="section-head">
    <p class="eyebrow">Public Adoption Signals</p>
    <h1>不是 demo：真实开源项目正在接入。</h1>
  </div>

  <div class="adoption-stats" v-click>
    <div>
      <b>92+</b>
      <span>外部 public repos</span>
    </div>
    <div>
      <b>109</b>
      <span>package.json hits</span>
    </div>
    <p>保守口径：只统计 package.json 中声明了 <code>markstream-vue</code> 的公开仓库，排除 Simon-He95/*。</p>
  </div>

  <div class="adoption-grid">
    <div class="adoption-card" v-click>
      <b>AstrBot</b>
      <span>33.5k stars</span>
      <small>AI agent assistant / IM platforms</small>
    </div>
    <div class="adoption-card" v-click>
      <b>mcp-chrome</b>
      <span>11.8k stars</span>
      <small>Chrome extension based MCP server</small>
    </div>
    <div class="adoption-card" v-click>
      <b>HuLa</b>
      <span>7.4k stars</span>
      <small>Rust + Vue3 cross-platform IM</small>
    </div>
    <div class="adoption-card" v-click>
      <b>DeepChat</b>
      <span>5.9k stars</span>
      <small>AI assistant desktop app</small>
    </div>
    <div class="adoption-card" v-click>
      <b>telegram-search</b>
      <span>3.9k stars</span>
      <small>Telegram history export/search</small>
    </div>
    <div class="adoption-card" v-click>
      <b>Memoh</b>
      <span>1.8k stars</span>
      <small>self-hosted AI agent platform</small>
    </div>
  </div>

  <div class="source-note" v-click>
    GitHub code search: "markstream-vue" filename:package.json，2026-05-31；这是 adoption signal，不等于生产流量，星标与依赖版本会变化。
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
      <b>HTML policy 可控</b>
      <code>html-policy="safe" / "escape"</code>
    </div>
    <div class="prod-row" v-click>
      <b>SSR ready</b>
      <span>Vue / Vite / Nuxt / VitePress</span>
    </div>
    <div class="prod-row" v-click>
      <b>组件覆盖</b>
      <span><code>VueRendererMarkdown</code> 注册 app-scoped components；局部场景用 <code>setCustomComponents</code></span>
    </div>
    <div class="prod-row" v-click>
      <b>Optional peers</b>
      <span>katex / mermaid / stream-monaco / d2 / infographic 按需安装</span>
    </div>
  </div>

  <div class="memory-line" v-click>
    基础 renderer 保持轻；不可信 HTML 用 escape，业务组件和 heavy peers 按需接入。
  </div>
</div>

---

<div class="deck vue-first-slide">
  <div class="section-head">
    <p class="eyebrow">定位</p>
    <h1>Vue 3 stable, rendering foundation.</h1>
  </div>

  <div class="vue-first-core glow-card">
    <div v-click><span>Stable</span>Vue 3 renderer package · MarkdownRender · content/nodes · final</div>
    <div v-click><span>Production</span>safe HTML · SSR · CSS exports · optional heavy peers</div>
    <div v-click><span>Foundation</span>AI Chat · Agent Report · Knowledge Base · Code Review</div>
  </div>

  <div class="ecosystem-line" v-click>
    Experimental / internal expansion:<br>
    <span>Vue 2 · Vue 3 · Svelte · React · Nuxt · Next · Angular</span>
  </div>

  <div class="memory-line" v-click>
    公开 1.x 稳定承诺先聚焦 Vue 3；跨框架包与 playground 不作为稳定承诺。
  </div>
</div>

---

<div class="deck contributors-slide">
  <div class="section-head">
    <p class="eyebrow">Thanks</p>
    <h1>感谢每一位 <span class="gradient-text">Contributor</span></h1>
  </div>

  <div class="contributors-panel" v-motion :initial="{ opacity: 0, y: 18 }" :enter="{ opacity: 1, y: 0 }">
    <img
      class="contributors-image"
      src="./public/markstream-contributors.svg"
      alt="markstream-vue contributors"
    >
  </div>

  <div class="contributors-note">
    GitHub commit contributors · 已排除机器人账号
  </div>
</div>

---

<div class="deck qa-slide">
  <div class="qa-center">
    <img class="qa-logo" src="./public/markstream-logo.svg" alt="markstream-vue logo">
    <h1>Q&A</h1>
    <p>Markdown 正在成为 AI 输出的 UI 协议。<br>Vue 下一步应该渲染什么？</p>
    <img class="qr-code" src="./public/markstream-qr.png" alt="markstream-vue GitHub QR code">
  </div>

  <div class="qa-footer">
    GitHub: Simon-He95/markstream-vue<br>
    Docs / Playground / Discussions
  </div>
</div>
