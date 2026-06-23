<script setup>
import SignalCarousel from "./SignalCarousel.vue";
</script>

<template>
  <div class="deck dark">
    <div class="slide-head">
      <span class="pixel-kicker pxl-corner-sm">ECOSYSTEM</span>
      <h1>它不是一个聊天框，而是 Vue 里的 AI 输出层。</h1>
    </div>

    <v-click-gap size="3" />
    <SignalCarousel click-controlled />

    <p v-click class="takeaway compact-takeaway">1.x 先把 Vue 3 做稳；跨框架包和 playground 继续放在实验层。</p>
  </div>
</template>
