<template>
  <div class="deck dark qa-deck">
    <div class="qa-terminal pxl-corner-lg pxl-shadow">
      <div v-click class="qa-copy">
        <img class="brand-mark" src="/markstream-logo.svg" alt="markstream-vue logo">
        <h1 class="deck-title">Q&A</h1>
        <p class="deck-subtitle">当 AI 输出越来越快、越来越长、越来越复杂，你的 Markdown 渲染器准备好了吗？</p>
        <div class="qa-signal pxl-corner-md">
          <span>markstream-vue</span>
          <b>让 Vue 扛住 AI 输出</b>
        </div>
        <div class="social-strip">
          <a href="https://github.com/Simon-He95" class="pixel-button btn-retro pxl-corner-sm">GitHub · Simon-He95</a>
          <a href="https://simonhe.me" class="pixel-button btn-retro pxl-corner-sm">simonhe.me</a>
          <a href="https://twitter.com/simon_he1995" class="pixel-button btn-retro pxl-corner-sm">@simon_he1995</a>
          <a href="https://space.bilibili.com/413596956" class="pixel-button btn-retro pxl-corner-sm">Bilibili</a>
        </div>
      </div>
      <div v-click class="qa-qr-panel">
        <span>扫码看仓库</span>
        <img class="qr-code pxl-corner-md pxl-shadow" src="/markstream-qr.png" alt="markstream-vue GitHub QR code">
      </div>
    </div>
    <span class="slidev-credit">Slides made with Slidev · Thanks Anthony Fu (antfu)</span>
  </div>
</template>
