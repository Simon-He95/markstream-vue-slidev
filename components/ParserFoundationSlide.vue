<script setup>
const speedCards = [
  ["remark append", "58.9× / 69.7× / 90.4×", "5k / 20k / 100k chars"],
  ["micromark append", "46.5× / 50.7× / 58.9×", "5k / 20k / 100k chars"],
  ["remark + rehype render", "23.9× / 36.6× / 37.1×", "5k / 20k / 100k chars"],
];
</script>

<template>
  <div class="deck dark">
    <div class="slide-head">
      <span class="pixel-kicker pxl-corner-sm">PARSER FOUNDATION</span>
      <h1>Streaming 里，parser 管线越长，越容易每个 chunk 都付费。</h1>
    </div>

    <div class="parser-roads">
      <div v-click class="pixel-card parser-road pxl-corner-lg pxl-shadow">
        <span class="pixel-kicker danger small pxl-corner-sm">common AST pipeline</span>
        <div class="road-nodes">
          <b>Markdown</b><b>AST</b><b>HTML AST</b><b>Framework tree</b><b>DOM</b>
        </div>
        <p>每个 chunk 都可能穿过多层中间结构。</p>
      </div>
      <div v-click class="pixel-card parser-road pxl-corner-lg pxl-shadow">
        <span class="pixel-kicker success small pxl-corner-sm">markstream-vue</span>
        <div class="road-nodes compact">
          <b>Markdown</b><b>markdown-it-ts Token</b><b>streaming nodes</b>
        </div>
        <p>直接进入适合 Vue 更新的节点结构。</p>
      </div>
    </div>

    <div class="speed-grid">
      <div v-click v-for="card in speedCards" :key="card[0]" class="pixel-stat pxl-corner-md pxl-shadow">
        <span>{{ card[0] }}</span>
        <b>{{ card[1] }}</b>
        <small>{{ card[2] }}</small>
      </div>
    </div>

    <small class="method-note source-note">数据来自 markdown-it-ts@1.0.0 README synthetic append-heavy harness；不是所有 workload 都 50×。</small>
  </div>
</template>
