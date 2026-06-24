<script setup>
import AnimeCircuitTrace from "./AnimeCircuitTrace.vue";

const steps = ["只解析新增内容", "按块更新页面", "普通文本快速追加", "复杂内容稍后处理", "完成后补齐细节"];
const cards = [
  ["解析成本", "只看变化的部分", "内容变长时，不必每次从头解析整篇 Markdown。"],
  ["页面更新", "能原地更新就原地更新", "代码块、表格和工具结果尽量留在原处，滚动和选区不被打断。"],
  ["主线程预算", "复杂渲染排到后面", "Monaco / Mermaid / KaTeX 等到合适时机再渲染，避免抢走交互。"],
];
</script>

<template>
  <div class="deck dark pipeline-deck">
    <div class="slide-head">
      <span class="pixel-kicker pxl-corner-sm">CORE PIPELINE</span>
      <h1>它能扛住的关键，是把每次更新的成本压下来。</h1>
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
