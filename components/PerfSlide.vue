<script setup>
import PxlStatColumn from "./PxlStatColumn.vue";

const items = [
  { label: "Task", value: "633.6 → 308ms" },
  { label: "Scripting", value: "296.4 → 16.3ms" },
  { label: "DOM", value: "417 → 157" },
];
</script>

<template>
  <div class="deck dark">
    <div class="slide-head">
      <span class="pixel-kicker success pxl-corner-sm">PERFORMANCE EVIDENCE</span>
      <h1>要说“扛得住”，就要同时看脚本、任务和 DOM。</h1>
    </div>

    <div class="perf-board">
      <div v-click class="evidence-monitor pxl-corner-lg pxl-shadow">
        <img class="evidence-image" src="/streaming-performance-evidence.png" alt="Streaming Markdown E2E performance evidence">
        <span class="scan-beam"></span>
      </div>

      <PxlStatColumn
        v-click
        :items="items"
        note="3-run median · Chrome CDP · 8 cases × 119 段输入"
      />
    </div>
  </div>
</template>
