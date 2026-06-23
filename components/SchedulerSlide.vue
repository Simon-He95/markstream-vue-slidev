<script setup>
import AnimeSchedulerSweep from "./AnimeSchedulerSweep.vue";

const signals = [
  [":final=\"final\"", "从生成中切到完成态，统一收束"],
  ["smooth-streaming=\"auto\"", "显示节奏和网络片段解耦"],
  [":batch-rendering=\"true\"", "把多段内容合并后再更新页面"],
];

const budgets = [
  ["解析缓存", "streamParse=\"auto\"", "复用中间结果，完成时再统一收束"],
  ["保留区域", "maxLiveNodes", "保留滚动位置、选区和组件身份"],
  ["重型块延后", "viewportPriority", "Monaco / Mermaid / KaTeX 靠近视口再渲染"],
];
</script>

<template>
  <div class="deck dark">
    <div class="slide-head">
      <span class="pixel-kicker gold pxl-corner-sm">SCHEDULER</span>
      <h1>收到一段内容，不代表立刻改一次 DOM。</h1>
    </div>

    <div class="scheduler-console">
      <div v-click class="scheduler-terminal pxl-corner-lg pxl-shadow">
        <AnimeSchedulerSweep :slide-no="10" />
        <div class="pixel-titlebar"><span></span><span></span><span></span><b>更新信号</b></div>
        <div class="signal-row" v-for="signal in signals" :key="signal[0]">
          <b>{{ signal[0] }}</b>
          <span>{{ signal[1] }}</span>
        </div>
      </div>

      <div v-click class="scheduler-controls pxl-corner-lg pxl-shadow">
        <div class="control-meter">
          <span>页面更新频率</span>
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

    <p v-click class="takeaway">用户感受到的是顺滑、稳定和完成感，而不是底层来了多少小片段。</p>
  </div>
</template>
