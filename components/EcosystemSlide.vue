<script setup>
import SignalCarousel from "./SignalCarousel.vue";
</script>

<template>
  <div class="deck dark">
    <div class="slide-head">
      <span class="pixel-kicker pxl-corner-sm">ECOSYSTEM</span>
      <h1>当 AI 输出进入产品界面，渲染器就会变成产品基础能力。</h1>
    </div>

    <v-click-gap size="3" />
    <SignalCarousel click-controlled />

    <p v-click class="takeaway compact-takeaway">Vue 3 稳定面已经进入 1.x；parser、core 和跨框架包继续围绕同一套流式 Markdown 能力推进。</p>
  </div>
</template>
