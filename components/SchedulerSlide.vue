<script setup>
import AnimeSchedulerSweep from "./AnimeSchedulerSweep.vue";

const signals = [
  [":final=\"final\"", "告诉渲染器：这次回答已经结束，可以补齐收尾"],
  ["smooth-streaming=\"auto\"", "网络来得再碎，屏幕上也按舒服的节奏显示"],
  [":batch-rendering=\"true\"", "攒几段再更新，减少页面抖动"],
];

const budgets = [
  ["解析缓存", "streamParse=\"auto\"", "前面算过的结果继续用，少做重复工作"],
  ["保留现场", "maxLiveNodes", "滚动位置、选区和正在看的内容不要被打断"],
  ["复杂内容延后", "viewportPriority", "Monaco / Mermaid / KaTeX 快进入视口时再渲染"],
];
</script>

<template>
  <div class="deck dark">
    <div class="slide-head">
      <span class="pixel-kicker gold pxl-corner-sm">SCHEDULER</span>
      <h1>扛住高频输出，不是每收到一段就马上刷新页面。</h1>
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

    <p v-click class="takeaway">渲染器要把模型的输出节奏，变成用户看起来舒服、页面也稳定的更新节奏。</p>
  </div>
</template>
