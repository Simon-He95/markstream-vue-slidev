<script setup>
import SignalCarousel from "./SignalCarousel.vue";
</script>

<template>
  <div class="deck dark">
    <div class="slide-head">
      <span class="pixel-kicker pxl-corner-sm">ECOSYSTEM</span>
      <h1>不是 Chat 组件，是 Vue 的 AI Output Layer。</h1>
    </div>

    <v-click-gap size="3" />
    <SignalCarousel click-controlled />

    <p v-click class="takeaway compact-takeaway">公开 1.x 稳定承诺先聚焦 Vue 3；跨框架包与 playground 留在实验层。</p>
  </div>
</template>
