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
        <span class="role-label">Contributor</span>
        <span class="project-chip ghost"><img src="./public/project-logos/vite.png" alt="">Vite</span>
        <span class="project-chip ghost"><img src="./public/project-logos/element-plus.png" alt="">Element Plus</span>
        <span class="project-chip ghost"><img src="./public/project-logos/tdesign.png" alt="">TDesign Vue Next</span>
      </div>
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
    从"渲染文档"到"渲染生成过程"。
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

<div class="deck what-slide">
  <div class="section-head">
    <p class="eyebrow">传统 renderer 崩在哪</p>
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
  </div>

  <div class="breakdown-row" v-click>
    <div class="break-card bad">
      <span class="mini-label">whole-block update</span>
      <p>每个 chunk 触发全量重渲染 → remount → scroll jump → selection 丢失</p>
    </div>
    <div class="break-card good">
      <span class="mini-label">stable node identity</span>
      <p>只更新增长的 live nodes，保留 DOM 身份、滚动位置和用户选择</p>
    </div>
  </div>

  <div class="memory-line" v-click>
    AI Streaming Renderer 关心的不是"渲染一次"，而是让每个增长中的节点保持稳定身份。
  </div>
</div>

---

<div class="deck demo-slide">
  <div class="section-head">
    <p class="eyebrow">Live Demo</p>
    <h1>一条 SSE，不应该只是刷字。<br>它会逐帧变成界面。</h1>
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
        <p>先接住"正在思考"。</p>
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

<div class="deck stream-compare-slide">
  <div class="section-head">
    <p class="eyebrow">Same Content · Different Engine</p>
    <h1>同一段输出，同一份 token，差异直接出现在交互里。</h1>
  </div>

  <StreamingRenderPlay />
</div>

---

<div class="deck pipeline-slide">
  <div class="section-head">
    <p class="eyebrow">核心实现</p>
    <h1>不是每个 chunk 全量重渲染。<br>增长中的节点才有资格被更新。</h1>
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
    优化目标：更少 parse、更少 DOM mutation、更少 heavy block 抢主线程。
  </div>
</div>

---

<div class="deck schedule-slide">
  <div class="section-head">
    <p class="eyebrow">调度与节奏</p>
    <h1>transport chunk 不直接等于 DOM commit。<br>节奏应该由调度器决定。</h1>
  </div>

  <div class="schedule-board">
    <div class="schedule-primary" v-click>
      <div class="schedule-signal">
        <span class="mini-label">信号层</span>
        <div class="signal-row">
          <b>:final="final"</b>
          <span>false → true 触发收束与稳定落地</span>
        </div>
        <div class="signal-row">
          <b>smooth-streaming="auto"</b>
          <span>transport chunk ≠ DOM commit</span>
        </div>
        <div class="signal-row">
          <b>:batch-rendering="true"</b>
          <span>chunks 合并为 batches，减少 commit 频率</span>
        </div>
      </div>
    </div>
    <div class="schedule-grid">
      <div class="budget-card" v-click>
        <span>Parser cache</span>
        <b>streamParse="auto"</b>
        <small>中间态复用 cache，final 时收束</small>
      </div>
      <div class="budget-card" v-click>
        <span>Live range</span>
        <b>maxLiveNodes</b>
        <small>保留滚动、selection、组件身份</small>
      </div>
      <div class="budget-card" v-click>
        <span>Heavy deferral</span>
        <b>viewportPriority</b>
        <small>Monaco / Mermaid / KaTeX 靠近视口再渲染</small>
      </div>
    </div>
  </div>

  <div class="memory-line" v-click>
    用户感受到的不是 token，而是节奏、稳定性和完成感。
  </div>
</div>

---

<div class="deck big-number-slide">
  <div class="big-number-center">
    <p class="eyebrow">Scripting time</p>
    <div class="big-number" v-motion :initial="{ opacity: 0, scale: 0.8 }" :enter="{ opacity: 1, scale: 1, transition: { duration: 600 } }">
      <span class="old">296.4ms</span>
      <span class="arrow">→</span>
      <span class="new">16.3ms</span>
    </div>
    <p class="big-number-sub">降低 94.5%，收益来自减少每个 chunk 的全量重渲染</p>
    <div class="big-number-meta">
      3-run median · Chrome CDP · 8 cases × 119 chunks · markstream-vue@1.0.1-beta.5
    </div>
  </div>
</div>

---

<div class="deck perf-trace-slide">
  <div class="section-head">
    <p class="eyebrow">Performance Evidence</p>
    <h1>性能不是一个分数。<br>是四个观测点同时稳定。</h1>
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

  <div class="perf-notes" v-click>
    <span>Perceived Stability</span>
    <span>Streaming Responsiveness</span>
    <span>Heavy Block Readiness</span>
    <span>Resource Health</span>
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
    数据来自 markdown-it-ts@1.0.0 README synthetic append-heavy harness；不是所有 workload 都 50×。
  </div>
</div>

---

<div class="deck components-slide">
  <div class="section-head">
    <p class="eyebrow">Vue 组件化</p>
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
    SSE 里的 custom tags 不是字符串——它们是 Vue 组件在流中的锚点。
  </div>
</div>

---

<div class="deck ecosystem-slide ecosystem-v3">
  <div class="section-head compact-head">
    <p class="eyebrow">生态与落地</p>
    <h1>不是 Chat 组件。<br><span class="gradient-text">是 Vue 的 AI Output Layer。</span></h1>
  </div>
  <div class="output-layer-canvas">
  <div class="stream-feed" aria-label="AI stream input">
  <span class="mini-label">input stream</span>
  <div class="stream-token token-a">content</div>
  <div class="stream-token token-b">thinking</div>
  <div class="stream-token token-c">tool-result</div>
  <div class="stream-token token-d">custom-tags</div>
  </div>
  <div class="canvas-beam beam-a" aria-hidden="true"><i></i></div>
  <div class="canvas-beam beam-b" aria-hidden="true"><i></i></div>
  <div class="canvas-beam beam-c" aria-hidden="true"><i></i></div>
  <div class="layer-core glow-card">
  <div class="core-orbit" aria-hidden="true"></div>
  <img src="./public/markstream-logo.svg" alt="markstream-vue logo">
  <b>markstream-vue</b>
  <span>parse · schedule · render</span>
  </div>
  <div class="surface-cloud" aria-label="AI output surfaces">
  <div class="surface-tile chat"><i aria-hidden="true"></i><b>AI Chat</b><span>answer / code</span></div>
  <div class="surface-tile agent"><i aria-hidden="true"></i><b>Agent</b><span>steps / tools</span></div>
  <div class="surface-tile docs"><i aria-hidden="true"></i><b>Docs</b><span>cite / search</span></div>
  <div class="surface-tile review"><i aria-hidden="true"></i><b>Review</b><span>diff / patch</span></div>
  </div>
  <div class="runtime-rail" aria-label="Runtime capabilities">
  <span>Vue 3</span><span>Nuxt</span><span>VitePress</span><span>SSR</span><span>Safe HTML</span><span>KaTeX</span><span>Mermaid</span><span>Monaco</span>
  </div>
  </div>
</div>

---

<div class="deck adoption-slide adoption-v2">
  <div class="section-head compact-head">
    <p class="eyebrow">Public Adoption Signals</p>
    <h1>先看公开依赖信号，<br><span class="gradient-text">但不把它讲成生产流量。</span></h1>
  </div>

  <div class="adoption-radar">
    <div class="radar-center" v-click>
      <img src="./public/social-icons/github.svg" alt="GitHub">
      <b>92+</b>
      <span>external repos</span>
      <small>109 package.json hits</small>
    </div>
    <div class="repo-orbit repo-a" v-click>
      <b>AstrBot</b><span>33.5k ★</span>
    </div>
    <div class="repo-orbit repo-b" v-click>
      <b>mcp-chrome</b><span>11.8k ★</span>
    </div>
    <div class="repo-orbit repo-c" v-click>
      <b>HuLa</b><span>7.4k ★</span>
    </div>
    <div class="repo-orbit repo-d" v-click>
      <img src="./public/project-logos/deepchat.png" alt="DeepChat">
      <b>DeepChat</b><span>5.9k ★</span>
    </div>
  </div>

  <div class="signal-footnote" v-click>
    GitHub code search · <code>"markstream-vue" filename:package.json</code> · exclude <code>Simon-He95/*</code> · as of 2026-05-31
  </div>
</div>

---

<div class="deck vue-first-slide">
  <div class="section-head">
    <p class="eyebrow">定位</p>
    <h1>稳定承诺先给 Vue 3。<br>探索留在实验层。</h1>
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
</div>

---

<div class="deck qa-slide">
  <span class="slidev-credit">Slides made with Slidev · Thanks Anthony Fu (antfu)</span>

  <div class="qa-center">
    <img class="qa-logo" src="./public/markstream-logo.svg" alt="markstream-vue logo">
    <h1>Q&A</h1>
    <p>Markdown 正在成为 AI 输出的 UI 协议。<br>Vue 下一步应该渲染什么？</p>
    <img class="qr-code" src="./public/markstream-qr.png" alt="markstream-vue GitHub QR code">
  </div>

  <div class="social-strip qa-social">
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

  <div class="qa-footer">
    GitHub: Simon-He95/markstream-vue<br>
    Docs / Playground / Discussions
  </div>
</div>
