<script setup>
import PxlStatColumn from "./PxlStatColumn.vue";

const items = [
  { label: "默认模式", value: "220 nodes", caption: "长文档虚拟窗口" },
  { label: "聊天模式", value: "0 nodes", caption: "增量批次输出" },
  { label: "建议起点", value: "16 / 8ms", caption: "batch size / delay" },
];

const modes = [
  ["Docs", "max-live-nodes=220", "只保留有限 DOM，长文档滚动更稳"],
  ["Chat", "max-live-nodes=0", "保留流式打字节奏，不做整页替换"],
  ["Budget", "frame budget", "给每帧留出交互余量"],
];
</script>

<template>
  <div class="deck dark">
    <div class="slide-head">
      <span class="pixel-kicker success pxl-corner-sm">PERFORMANCE EVIDENCE</span>
      <h1>最新文档给出的不是一个开关，而是按场景选择更新策略。</h1>
    </div>

    <div class="perf-board">
      <div v-click class="evidence-monitor pxl-corner-lg pxl-shadow">
        <div class="performance-mode-map">
          <section v-for="mode in modes" :key="mode[0]" class="pxl-corner-md">
            <span>{{ mode[0] }}</span>
            <b>{{ mode[1] }}</b>
            <small>{{ mode[2] }}</small>
          </section>
        </div>
        <span class="scan-beam"></span>
      </div>

      <PxlStatColumn
        v-click
        :items="items"
        note="markstream-vue@1.0.4 README · performance modes"
      />
    </div>
  </div>
</template>
