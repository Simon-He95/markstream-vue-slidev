<script setup>
import AnimeSchedulerSweep from "./AnimeSchedulerSweep.vue";

const signals = [
  [":final=\"final\"", "告诉渲染器：这次回答已经结束，可以补齐收尾"],
  [":max-live-nodes=\"0\"", "聊天面板切到增量批次，输出越长也不整页重建"],
  [":batch-rendering=\"true\"", "攒几段再更新，减少页面抖动"],
];

const budgets = [
  ["长文档默认", "max-live-nodes=220", "只保留有限 DOM，滚动和内存更稳"],
  ["聊天批次", "renderBatchSize=16", "少量多次更新，保留流式输出的节奏"],
  ["单帧预算", "frame budget", "限制每帧工作量，避免抢走交互"],
];
</script>

<template>
  <div class="deck dark">
    <div class="slide-head">
      <span class="pixel-kicker gold pxl-corner-sm">SCHEDULER</span>
      <h1>markstream-vue@1.0.4：长文档和聊天面板走不同更新策略。</h1>
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

    <p v-click class="takeaway scheduler-takeaway">长文档用虚拟窗口；聊天面板把 live nodes 设为 0，切到增量流式体验。</p>
  </div>
</template>
