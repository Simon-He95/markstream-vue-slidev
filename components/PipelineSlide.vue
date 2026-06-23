<script setup>
import AnimeCircuitTrace from "./AnimeCircuitTrace.vue";

const steps = ["接收片段", "允许未完成结构", "复用已有节点", "安排更新节奏", "完成后收束"];
const cards = [
  ["轻量文本", "文本直接追加", "普通文本不反复走完整解析，也不反复改整棵 DOM。"],
  ["渲染节奏", "重型内容排队", "靠近视口再渲染，避免 Monaco / Mermaid 抢主线程。"],
  ["状态稳定", "交互状态保留", "节点身份稳定后，滚动位置和选区不会反复丢失。"],
];
</script>

<template>
  <div class="deck dark pipeline-deck">
    <div class="slide-head">
      <span class="pixel-kicker pxl-corner-sm">CORE PIPELINE</span>
      <h1>不是每收到一小段，就整页重渲。</h1>
    </div>

    <div class="pipeline-circuit">
      <AnimeCircuitTrace :slide-no="9" />
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
