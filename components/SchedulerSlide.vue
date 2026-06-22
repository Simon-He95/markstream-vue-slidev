<script setup>
const signals = [
  [":final=\"final\"", "false → true 触发收束与稳定落地"],
  ["smooth-streaming=\"auto\"", "transport chunk 不直接等于 DOM commit"],
  [":batch-rendering=\"true\"", "chunks 合并为 batches，减少 commit 频率"],
];

const budgets = [
  ["Parser cache", "streamParse=\"auto\"", "中间态复用 cache，final 时收束"],
  ["Live range", "maxLiveNodes", "保留 scroll、selection、组件身份"],
  ["Heavy deferral", "viewportPriority", "Monaco / Mermaid / KaTeX 靠近视口再渲染"],
];
</script>

<template>
  <div class="deck dark">
    <div class="slide-head">
      <span class="pixel-kicker gold pxl-corner-sm">SCHEDULER</span>
      <h1>transport chunk 不直接等于 DOM commit。</h1>
    </div>

    <div class="scheduler-console">
      <div v-click class="scheduler-terminal pxl-corner-lg pxl-shadow">
        <div class="pixel-titlebar"><span></span><span></span><span></span><b>signals</b></div>
        <div class="signal-row" v-for="signal in signals" :key="signal[0]">
          <b>{{ signal[0] }}</b>
          <span>{{ signal[1] }}</span>
        </div>
      </div>

      <div v-click class="scheduler-controls pxl-corner-lg pxl-shadow">
        <div class="control-meter">
          <span>commit rate</span>
          <i></i>
        </div>
        <div class="control-knobs">
          <b></b><b></b><b></b>
        </div>
        <div v-for="budget in budgets" :key="budget[0]" class="pixel-stat pxl-corner-md pxl-shadow">
          <span>{{ budget[0] }}</span>
          <b>{{ budget[1] }}</b>
          <small>{{ budget[2] }}</small>
        </div>
      </div>
    </div>

    <p v-click class="takeaway">用户感受到的不是 token，而是节奏、稳定性和完成感。</p>
  </div>
</template>
