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
  <img class="slide-corner-logo" src="./public/markstream-logo.svg" alt="" aria-hidden="true">

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
      <div class="about-focus" v-click>
        <span class="mini-label">focus</span>
        <strong>Vue · DX · AI Output UI</strong>
        <p>我关注的是生成中的内容，怎样从 token 变成稳定、可交互的界面。</p>
      </div>
      <div class="about-projects">
        <div class="about-project-card" v-click>
          <span class="role-label">Maintainer</span>
          <div>
            <span class="project-chip"><img src="./public/project-logos/unocss.png" alt="">UnoCSS</span>
            <span class="project-chip"><img src="./public/project-logos/deepchat.png" alt="">DeepChat</span>
            <span class="project-chip"><img src="./public/project-logos/vue-vine.png" alt="">Vue Vine</span>
          </div>
        </div>
        <div class="about-project-card" v-click>
          <span class="role-label">Author</span>
          <div>
            <span class="project-chip"><img src="./public/markstream-logo.svg" alt="">markstream-vue</span>
            <span class="project-chip"><img src="./public/project-logos/vscode-use.png" alt="">vscode-use</span>
            <span class="project-chip"><img src="./public/project-logos/awesome-compressor.png" alt="">awesome-compressor</span>
          </div>
        </div>
        <div class="about-project-card" v-click>
          <span class="role-label">Contributor</span>
          <div>
            <span class="project-chip ghost"><img src="./public/project-logos/vite.png" alt="">Vite</span>
            <span class="project-chip ghost"><img src="./public/project-logos/element-plus.png" alt="">Element Plus</span>
            <span class="project-chip ghost"><img src="./public/project-logos/tdesign.png" alt="">TDesign Vue Next</span>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="social-strip compact-social">
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

  <div class="memory-line" v-click>
    我不是想再造一个 Markdown 组件，而是想解决 AI 输出从 token 到 UI 的最后一公里。
  </div>
</div>

---

<div class="deck contrast-slide">
  <div class="section-head">
    <p class="eyebrow">从格式到协议</p>
    <h1>Markdown 从一张纸，变成一条正在发生的流。</h1>
  </div>

  <div class="protocol-story">
    <div class="paper-scene" v-click>
      <span class="scene-label">Before</span>
      <div class="paper-sheet">
        <span># Report</span>
        <i></i><i></i><i></i><i></i>
      </div>
      <p>完成后再渲染</p>
    </div>
    <div class="stream-bridge" aria-hidden="true">
      <span>#</span>
      <span>token</span>
      <span>&lt;tool&gt;</span>
      <span>|</span>
    </div>
    <div class="protocol-scene" v-click>
      <span class="scene-label">Now</span>
      <div class="live-chat-card">
        <b>AI Output Protocol</b>
        <span>content</span>
        <span>thinking</span>
        <span>tool-result</span>
      </div>
      <p>边生成，边成为 UI</p>
    </div>
  </div>

  <div class="memory-line" v-click>
    从“渲染文档”到“渲染生成过程”。
  </div>
</div>

---

<div class="deck unfinished-slide">
  <div class="section-head">
    <p class="eyebrow">流式渲染真正的问题</p>
    <h1>观众看到的不是答案。<br><span class="gradient-text">是答案诞生的现场。</span></h1>
  </div>

  <div class="stream-crash-scene">
    <div class="terminal-card story-terminal">
      <div class="terminal-dots"><i></i><i></i><i></i></div>
      <div class="code-lines live-broken-code">
        <span><span class="tok fence">&#96;&#96;&#96;ts</span></span>
        <span><span class="tok kw">const</span> answer <span class="tok op">=</span> <span class="tok kw">await</span> agent.run(</span>
        <span>&nbsp;&nbsp;<span class="tok str">"summarize latest context"</span></span>
        <span><span class="typing-cursor">|</span></span>
      </div>
      <div class="unfinished-table" aria-hidden="true">
        <span>name</span><span>score</span>
        <span>parser</span><span class="shaking-cell">...</span>
      </div>
      <div class="heavy-block-loading" aria-hidden="true">Mermaid block waiting</div>
    </div>
    <div class="story-beats">
      <div class="story-beat" v-click><span>01</span><b>半截代码块</b><em>语法还没闭合</em></div>
      <div class="story-beat" v-click><span>02</span><b>跳动的结构</b><em>表格和公式还在改形</em></div>
      <div class="story-beat" v-click><span>03</span><b>重型节点</b><em>Mermaid / KaTeX / Monaco 抢主线程</em></div>
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
    <h1>这不是把 Markdown 变成 HTML。<br>这是把 token 养成稳定 UI。</h1>
  </div>

  <div class="renderer-story">
    <div class="renderer-rail" aria-hidden="true">
      <span></span>
    </div>
    <div class="renderer-step muted" v-click>
      <span>Markdown Renderer</span>
      <b>complete markdown</b>
      <i>HTML</i>
    </div>
    <div class="renderer-step primary" v-click>
      <span>AI Streaming Renderer</span>
      <b>token stream</b>
      <i>stable interactive UI</i>
    </div>
    <div class="layer-card" v-click>
      <img src="./public/markstream-logo.svg" alt="">
      <strong>AI Output UI Layer</strong>
    </div>
  </div>
</div>

---

<div class="deck legacy-ai-slide">
  <div class="section-head">
    <p class="eyebrow">对比传统 AI 渲染</p>
    <h1>同样的 token，体验可以完全不同。</h1>
  </div>

  <div class="render-video-grid">
    <div class="render-video unstable" v-click>
      <span class="scene-label">Traditional renderer</span>
      <div class="video-topbar"><i></i><i></i><i></i></div>
      <div class="video-lines jitter">
        <span></span><span></span><span></span><span></span>
      </div>
      <div class="selection-ghost">selection lost</div>
    </div>
    <div class="render-video stable" v-click>
      <span class="scene-label">markstream-vue</span>
      <div class="video-topbar"><i></i><i></i><i></i></div>
      <div class="video-lines">
        <span></span><span></span><span></span><span></span>
      </div>
      <div class="component-card-mini">
        <img src="./public/markstream-logo.svg" alt="">
        <b>Vue component</b>
      </div>
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
    <h1>把增长中的内容，固定成可操作的 Vue UI。</h1>
  </div>
  <div class="product-map">
    <div class="token-feed" v-click>
      <span class="scene-label">Incoming</span>
      <div class="feed-stack">
        <span>content += chunk</span>
        <span>&lt;thinking&gt;</span>
        <span>&lt;tool-result&gt;</span>
        <span>final = true</span>
      </div>
    </div>
    <div class="markstream-core" v-click>
      <img src="./public/markstream-logo.svg" alt="">
      <b>markstream-vue</b>
      <span>parse</span>
      <span>schedule</span>
      <span>keep identity</span>
    </div>
    <div class="stable-ui-preview" v-click>
      <span class="scene-label">Outgoing</span>
      <div class="ui-window">
        <div class="video-topbar"><i></i><i></i><i></i></div>
        <p>Streaming answer</p>
        <div class="ui-code"></div>
        <div class="ui-component">Vue component</div>
      </div>
    </div>
  </div>

  <div class="memory-line" v-click>
    它关心的不是“渲染一次”，而是让每个增长中的节点保持稳定身份。
  </div>
</div>

---

<div class="deck setup-slide">
  <div class="section-head">
    <p class="eyebrow">最小接入</p>
    <h1>接入不是重写系统。<br>是接上三根线。</h1>
  </div>
  <div class="wiring-scene">
    <div class="terminal-card wiring-code">
      <div class="terminal-dots"><i></i><i></i><i></i></div>
      <div class="code-lines">
        <span><span class="tok kw">import</span> MarkdownRender <span class="tok kw">from</span> <span class="tok str">'markstream-vue'</span></span>
        <span><span class="tok kw">const</span> content <span class="tok op">=</span> ref(<span class="tok str">''</span>)</span>
        <span><span class="tok kw">const</span> final <span class="tok op">=</span> ref(<span class="tok bool">false</span>)</span>
        <span><span class="tok tag">&lt;MarkdownRender</span> <span class="tok attr">:content</span>=<span class="tok str">"content"</span> <span class="tok attr">:final</span>=<span class="tok str">"final"</span> <span class="tok tag">/&gt;</span></span>
      </div>
    </div>
    <div class="wire-board" aria-hidden="true">
      <span>content</span>
      <span>final</span>
      <span>components</span>
    </div>
    <div class="setup-output" v-click>
      <span class="scene-label">Result</span>
      <div class="chat-bubble live-output">
        <p class="typing-line">流式回答生成中</p>
        <div class="answer-lines"><i></i><i></i><i></i></div>
        <div class="tool-card">tool result → Vue card</div>
      </div>
    </div>
  </div>
  <div class="memory-line" v-click>
    最小心智模型：更新 content，完成时设置 final；复杂 UI 交给组件接管。
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
    <h1>不是“感觉更顺”。<br>瓶颈从 trace 里退场。</h1>
  </div>

  <div class="perf-story">
    <div class="evidence-shot evidence-spotlight" v-click>
      <img src="./public/streaming-performance-evidence.png" alt="Streaming Markdown E2E performance evidence">
      <span aria-hidden="true"></span>
    </div>
    <div class="metric-board" v-click>
      <div class="metric-card task">
        <span>Task</span>
        <b>633.6ms → 308ms</b>
        <i></i>
      </div>
      <div class="metric-card scripting">
        <span>Scripting</span>
        <b>296.4ms → 16.3ms</b>
        <i></i>
      </div>
      <div class="metric-card layout">
        <span>Layout</span>
        <b>27.4ms → 20.6ms</b>
        <i></i>
      </div>
      <div class="metric-card dom">
        <span>DOM</span>
        <b>417 → 157</b>
        <i></i>
      </div>
    </div>
  </div>

  <div class="perf-method" v-click>
    3-run median · Chrome CDP · 8 cases × 119 chunks · markstream-vue@1.0.1-beta.5 published package
  </div>
</div>

---

<div class="deck parser-foundation-slide">
  <div class="section-head">
    <p class="eyebrow">Parser Foundation</p>
    <h1>Streaming 里，parser 管线越长，越容易每个 chunk 都付费。</h1>
  </div>

  <div class="parser-journey">
    <div class="parser-road ast" v-click>
      <span class="mini-label">common AST pipeline</span>
      <div class="road-nodes">
        <b>Markdown</b><b>AST</b><b>HTML AST</b><b>Framework tree</b><b>DOM</b>
      </div>
      <p>每个 chunk 都可能穿过多层中间结构。</p>
    </div>
    <div class="parser-road token" v-click>
      <span class="mini-label">markstream-vue</span>
      <div class="road-nodes">
        <b>Markdown</b><b>markdown-it-ts Token</b><b>streaming nodes</b>
      </div>
      <p>直接进入适合 Vue 更新的节点结构。</p>
    </div>
  </div>

  <div class="parser-speed-grid">
    <div class="speed-card" v-click>
      <span>remark append</span>
      <b>58.9× / 69.7× / 90.4×</b>
      <small>5k / 20k / 100k chars</small>
    </div>
    <div class="speed-card" v-click>
      <span>micromark append</span>
      <b>46.5× / 50.7× / 58.9×</b>
      <small>5k / 20k / 100k chars</small>
    </div>
    <div class="speed-card" v-click>
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
    <h1>一条 SSE，不应该只是刷字。它会逐帧变成界面。</h1>
  </div>

  <div class="demo-story">
    <div class="terminal-card sse-reel">
      <div class="terminal-dots"><i></i><i></i><i></i></div>
      <div class="reel-frame" v-click>
        <span class="mini-label">frame 01 · intent</span>
        <div class="code-lines event-block">
          <span><span class="tok prop">event</span>: <span class="tok str">token</span></span>
          <span><span class="tok prop">data</span>: <span class="tok tag">&lt;thinking&gt;</span>Searching docs...<span class="tok tag">&lt;/thinking&gt;</span></span>
        </div>
        <p>先接住“正在思考”。</p>
      </div>
      <div class="reel-frame" v-click>
        <span class="mini-label">frame 02 · structure</span>
        <div class="code-lines event-block">
          <span><span class="tok prop">data</span>: <span class="tok fence">&#96;&#96;&#96;ts</span></span>
          <span><span class="tok prop">data</span>: <span class="tok kw">const</span> answer <span class="tok op">=</span> <span class="tok kw">await</span> agent.run()</span>
          <span><span class="tok prop">data</span>: <span class="tok fence">&#96;&#96;&#96;</span></span>
        </div>
        <p>未闭合代码块也能站住。</p>
      </div>
      <div class="reel-frame" v-click>
        <span class="mini-label">frame 03 · commit</span>
        <div class="code-lines event-block">
          <span><span class="tok prop">event</span>: <span class="tok str">done</span></span>
          <span><span class="tok prop">data</span>: final=<span class="tok bool">true</span></span>
        </div>
        <p>完成时稳定落地。</p>
      </div>
    </div>
    <div class="browser-window demo-live glow-card">
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
    content append → incomplete parse → stable heavy blocks → custom tags → final commit
  </div>
</div>

---

<div class="deck pipeline-slide">
  <div class="section-head">
    <p class="eyebrow">核心实现</p>
    <h1>CPU 省下来，是因为每个 chunk 都被分流。</h1>
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
      <p>未闭合也能解析</p>
    </div>
    <div class="pipeline-step" v-click>
      <span>03</span>
      <b>stable live nodes</b>
      <p>保持节点身份</p>
    </div>
    <div class="pipeline-step" v-click>
      <span>04</span>
      <b>update scheduler</b>
      <p>控制提交节奏</p>
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
      <span>cheap text append</span>
    </div>
    <div class="principle" v-click>
      <b>重型节点排队</b>
      <span>靠近视口再渲染</span>
    </div>
    <div class="principle" v-click>
      <b>交互状态保留</b>
      <span>selection / scroll 不丢</span>
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
    <h1>NodeRenderer 的工作，是保护主线程预算。</h1>
  </div>

  <div class="budget-board">
    <div class="main-thread-card" v-click>
      <span class="mini-label">main thread budget</span>
      <b>parse 少一点<br>commit 慢一点<br>heavy block 晚一点</b>
    </div>
    <div class="budget-grid">
      <div class="budget-card" v-click>
        <span>Parser cache</span>
        <b>streamParse="auto"</b>
        <small>中间态复用 cache，final 时收束。</small>
      </div>
      <div class="budget-card" v-click>
        <span>Visible pacing</span>
        <b>smoothStreaming="auto"</b>
        <small>transport chunk 不直接等于 DOM commit。</small>
      </div>
      <div class="budget-card" v-click>
        <span>Live range</span>
        <b>maxLiveNodes</b>
        <small>保留滚动、selection、组件身份。</small>
      </div>
      <div class="budget-card" v-click>
        <span>Heavy deferral</span>
        <b>viewportPriority</b>
        <small>Monaco / Mermaid / KaTeX 靠近视口再渲染。</small>
      </div>
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
    <h1>不要让 token 自己决定节奏。</h1>
  </div>

  <div class="ux-console">
    <div class="chunk-rail ux-feed">
      <span v-click>chunk_01: "# Answer"</span>
      <span v-click>chunk_02: "&#96;&#96;&#96;ts"</span>
      <span v-click>chunk_03: "const a"</span>
      <span v-click>chunk_04: "final..."</span>
    </div>
    <div class="tempo-stage">
      <div class="tempo-row" v-click>
        <b>:final="final"</b>
        <span>false → true</span>
        <i></i>
      </div>
      <div class="tempo-row" v-click>
        <b>smooth-streaming="auto"</b>
        <span>transport ≠ DOM commit</span>
        <i></i>
      </div>
      <div class="tempo-row" v-click>
        <b>:batch-rendering="true"</b>
        <span>chunks → batches</span>
        <i></i>
      </div>
    </div>
    <div class="message-preview" v-click>
      <span class="mini-label">reader sees</span>
      <b>稳定增长的回答</b>
      <div class="answer-lines"><i></i><i></i><i></i></div>
      <em>rhythm · stability · completion</em>
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
    <h1>Heavy block 要排队上场，不能抢走 token 的主线程。</h1>
  </div>

  <div class="heavy-stage">
    <div class="live-output-panel" v-click>
      <span class="mini-label">live output</span>
      <div class="answer-lines"><i></i><i></i><i></i></div>
      <div class="heavy-slot">Mermaid block waiting</div>
      <div class="answer-lines small"><i></i><i></i></div>
    </div>
    <div class="heavy-queue">
      <div class="heavy-ticket" v-click>
        <span>Code</span>
        <b>Monaco / Shiki</b>
      </div>
      <div class="heavy-ticket" v-click>
        <span>Diagram</span>
        <b>Mermaid / D2</b>
      </div>
      <div class="heavy-ticket" v-click>
        <span>Formula</span>
        <b>KaTeX</b>
      </div>
      <div class="heavy-ticket" v-click>
        <span>Rich Node</span>
        <b>image / custom renderer</b>
      </div>
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
    <h1>AI 输出里的标签，可以穿梭成 <span v-mark.box="{ at: 4, color: '#569CD6' }">真实 Vue 组件</span>。</h1>
  </div>

  <div class="component-story">
    <div class="terminal-card map-code tag-stream" v-click>
      <div class="terminal-dots"><i></i><i></i><i></i></div>
      <div class="code-lines">
        <span><span class="tok tag">&lt;thinking&gt;</span></span>
        <span>Search knowledge base first.</span>
        <span><span class="tok tag">&lt;/thinking&gt;</span></span>
        <span><span class="tok tag">&lt;tool-result</span> <span class="tok attr">name</span>=<span class="tok str">"search"</span> <span class="tok attr">status</span>=<span class="tok str">"done"</span><span class="tok tag">&gt;</span></span>
        <span>Found 12 related documents.</span>
        <span><span class="tok tag">&lt;/tool-result&gt;</span></span>
        <span><span class="tok tag">&lt;answer-box</span> <span class="tok attr">type</span>=<span class="tok str">"final"</span><span class="tok tag">&gt;</span></span>
        <span>Here is the answer...</span>
        <span><span class="tok tag">&lt;/answer-box&gt;</span></span>
      </div>
    </div>
    <div class="component-tunnel" v-click>
      <span>&lt;thinking&gt;</span>
      <i></i>
      <span>&lt;tool-result&gt;</span>
      <i></i>
      <span>&lt;answer-box&gt;</span>
    </div>
    <div class="component-preview" v-click>
      <div class="preview-row thinking-card">
        <span>Thinking</span>
        <b>Search knowledge base first.</b>
      </div>
      <div class="preview-row tool-card">
        <span>Tool</span>
        <b>12 related documents</b>
      </div>
      <div class="preview-row answer-card">
        <span>Final</span>
        <b>Here is the answer...</b>
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
    <h1>它不是只放在 chat 里。它是 AI 输出层。</h1>
  </div>

  <div class="use-case-board">
    <div class="output-core" v-click>
      <img src="./public/markstream-logo.svg" alt="">
      <b>AI Output UI Layer</b>
      <span>content · nodes · final</span>
    </div>
    <div class="use-case-grid">
      <div class="use-case-card" v-click>
        <strong>AI Chat</strong>
        <span>回答、代码、公式、图表</span>
      </div>
      <div class="use-case-card" v-click>
        <strong>Agent Report</strong>
        <span>thinking、tool result、step card</span>
      </div>
      <div class="use-case-card" v-click>
        <strong>Knowledge Base</strong>
        <span>长文档、引用、来源卡片</span>
      </div>
      <div class="use-case-card" v-click>
        <strong>Code Review</strong>
        <span>diff、解释、修复建议</span>
      </div>
      <div class="use-case-card wide" v-click>
        <strong>Docs / CMS</strong>
        <span>Markdown + Vue custom blocks</span>
      </div>
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
    <h1>性能不是一个分数。是四个观测点同时稳定。</h1>
  </div>

  <div class="quality-board">
    <div class="quality-primary" v-click>
      <span class="mini-label">visible quality</span>
      <b>Perceived Stability</b>
      <p>CLS · scroll drift · block flashing</p>
    </div>
    <div class="quality-grid">
      <div class="quality-card" v-click>
        <b>Streaming Responsiveness</b>
        <span>CPU footprint · frame p95 · long task</span>
      </div>
      <div class="quality-card" v-click>
        <b>Heavy Block Readiness</b>
        <span>Mermaid · KaTeX · fallback count</span>
      </div>
      <div class="quality-card" v-click>
        <b>Resource Health</b>
        <span>DOM nodes · heap · idle CPU</span>
      </div>
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

  <div class="ecosystem-compare">
    <div class="ecosystem-card" v-click>
      <span>streamdown</span>
      <b>React / Vercel / AI SDK</b>
      <p>证明 streaming markdown 需求成立。</p>
    </div>
    <div class="ecosystem-card primary" v-click>
      <span>markstream-vue</span>
      <b>Vue 3 / Nuxt / VitePress</b>
      <p>把稳定交互、低 scripting 和 Vue components 做成默认路径。</p>
    </div>
  </div>
  <div class="compare-points">
    <div v-click><b>Code 更新</b><span>live block 控制更新节奏，final 后稳定落地</span></div>
    <div v-click><b>中间态</b><span>final=false 处理临时结构，减少 DOM 抖动</span></div>
    <div v-click><b>重型节点</b><span>heavy block 渐进渲染，不打断 token 输出</span></div>
    <div v-click><b>自定义 UI</b><span>custom tags → app-scoped Vue components</span></div>
  </div>

  <div class="memory-line" v-click>
    streamdown 证明需求成立；markstream-vue 在 Vue 侧把稳定交互、低 scripting 和组件化做成默认路径。
  </div>
</div>

---

<div class="deck adoption-slide">
  <div class="section-head">
    <p class="eyebrow">Public Adoption Signals</p>
    <h1>不是 demo。真实项目已经把它放进 package.json。</h1>
  </div>

  <div class="adoption-story">
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
        <small>AI agent assistant</small>
      </div>
      <div class="adoption-card" v-click>
        <b>mcp-chrome</b>
        <span>11.8k stars</span>
        <small>Chrome MCP server</small>
      </div>
      <div class="adoption-card" v-click>
        <b>HuLa</b>
        <span>7.4k stars</span>
        <small>Rust + Vue3 IM</small>
      </div>
      <div class="adoption-card" v-click>
        <b>DeepChat</b>
        <span>5.9k stars</span>
        <small>AI desktop app</small>
      </div>
      <div class="adoption-card" v-click>
        <b>telegram-search</b>
        <span>3.9k stars</span>
        <small>history export/search</small>
      </div>
      <div class="adoption-card" v-click>
        <b>Memoh</b>
        <span>1.8k stars</span>
        <small>AI agent platform</small>
      </div>
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
    <h1>进入生产，最后检查的是边界。</h1>
  </div>

  <div class="production-gates">
    <div class="gate-card policy" v-click>
      <span class="mini-label">boundary 01</span>
      <b>HTML policy</b>
      <code>safe / escape</code>
    </div>
    <div class="gate-list">
      <div class="gate-row" v-click>
        <b>SSR ready</b>
        <span>Vue / Vite / Nuxt / VitePress</span>
      </div>
      <div class="gate-row" v-click>
        <b>组件覆盖</b>
        <span>app-scoped components；局部场景再用 scoped set</span>
      </div>
      <div class="gate-row" v-click>
        <b>Optional peers</b>
        <span>katex / mermaid / monaco / d2 按需安装</span>
      </div>
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
    <h1>稳定承诺先给 Vue 3。探索留在实验层。</h1>
  </div>

  <div class="position-board">
    <div class="stable-pillar" v-click>
      <span class="mini-label">stable public surface</span>
      <b>Vue 3 renderer foundation</b>
      <p>MarkdownRender · content/nodes · final · SSR · safe HTML</p>
    </div>
    <div class="experiment-pillar" v-click>
      <span class="mini-label">experimental / internal expansion</span>
      <div>Vue 2</div><div>Vue 3</div><div>Svelte</div><div>React</div><div>Nuxt</div><div>Next</div><div>Angular</div>
    </div>
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
    Docs / Playground / Discussions<br>
    <span class="slidev-credit">Slides made with Slidev · Thanks Anthony Fu (antfu)</span>
  </div>
</div>
