<template>
  <div class="deck dark qa-deck">
    <div class="qa-terminal pxl-corner-lg pxl-shadow">
      <div v-click class="qa-copy">
        <img class="brand-mark" src="/markstream-logo.svg" alt="markstream-vue logo">
        <h1 class="deck-title">Q&A</h1>
        <p class="deck-subtitle">Markdown 正在成为 AI 输出的 UI 协议。Vue 下一步应该渲染什么？</p>
        <div class="qa-signal pxl-corner-md">
          <span>markstream-vue</span>
          <b>AI Output Layer for Vue</b>
        </div>
        <div class="social-strip">
          <a href="https://github.com/Simon-He95" class="pixel-button btn-retro pxl-corner-sm">GitHub · Simon-He95</a>
          <a href="https://simonhe.me" class="pixel-button btn-retro pxl-corner-sm">simonhe.me</a>
          <a href="https://twitter.com/simon_he1995" class="pixel-button btn-retro pxl-corner-sm">@simon_he1995</a>
          <a href="https://space.bilibili.com/413596956" class="pixel-button btn-retro pxl-corner-sm">Bilibili</a>
        </div>
      </div>
      <div v-click class="qa-qr-panel">
        <span>scan repo</span>
        <img class="qr-code pxl-corner-md pxl-shadow" src="/markstream-qr.png" alt="markstream-vue GitHub QR code">
      </div>
    </div>
    <span class="slidev-credit">Slides made with Slidev · Thanks Anthony Fu (antfu)</span>
  </div>
</template>
