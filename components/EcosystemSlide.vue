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

    <p v-click class="takeaway compact-takeaway">markstream-vue 先把 Vue 3 的 AI 输出渲染做稳，再继续探索跨框架和 playground。</p>
  </div>
</template>
