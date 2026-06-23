<template>
  <div class="deck dark">
    <div class="slide-head">
      <span class="pixel-kicker pxl-corner-sm">POSITIONING</span>
      <h1>先把 Vue 3 的稳定体验做好，其他方向保持实验。</h1>
    </div>

    <div class="pixel-grid two">
      <div v-click class="pixel-card pxl-corner-lg pxl-shadow">
        <span class="pixel-kicker success small pxl-corner-sm">STABLE PUBLIC SURFACE</span>
        <h2>Vue 3 渲染基础能力</h2>
        <div class="chip-row">
          <span>MarkdownRender</span><span>content / nodes</span><span>final</span><span>SSR</span><span>safe HTML</span>
        </div>
      </div>
      <div v-click class="pixel-card pxl-corner-lg pxl-shadow">
        <span class="pixel-kicker gold small pxl-corner-sm">EXPERIMENTAL</span>
        <h2>跨框架探索</h2>
        <div class="chip-row muted">
          <span>Vue 2</span><span>Svelte</span><span>React</span><span>Nuxt</span><span>Next</span><span>Angular</span>
        </div>
      </div>
    </div>
  </div>
</template>
