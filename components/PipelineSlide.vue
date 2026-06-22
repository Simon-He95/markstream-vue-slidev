<script setup>
const steps = ["chunk buffer", "incomplete parse", "stable live nodes", "update scheduler", "final commit"];
const cards = [
  ["fast path", "文本走快路径", "cheap text append，减少 parse 和 DOM mutation。"],
  ["scheduler", "重型节点排队", "靠近视口再渲染，避免 Monaco / Mermaid 抢主线程。"],
  ["identity", "交互状态保留", "DOM identity 稳定后，scroll 和 selection 不会反复丢失。"],
];
</script>

<template>
  <div class="deck dark pipeline-deck">
    <div class="slide-head">
      <span class="pixel-kicker pxl-corner-sm">CORE PIPELINE</span>
      <h1>不是每个 chunk 全量重渲染。</h1>
    </div>

    <div class="pipeline-circuit">
      <div v-click v-for="(step, index) in steps" :key="step" class="circuit-node" :class="{ final: index === steps.length - 1 }">
        <span>0{{ index + 1 }}</span>
        <b>{{ step }}</b>
      </div>
    </div>

    <div class="pipeline-dock">
      <div
        v-click
        v-for="(card, index) in cards"
        :key="card[0]"
        class="pipeline-dock-card pxl-corner-md pxl-shadow"
        :class="`dock-${index + 1}`"
      >
        <span>{{ card[0] }}</span>
        <h2>{{ card[1] }}</h2>
        <p>{{ card[2] }}</p>
      </div>
    </div>
  </div>
</template>
