<script setup>
import StreamingRenderPlay from "./StreamingRenderPlay.vue";
</script>

<template>
  <div class="deck dark">
    <div class="slide-head compact-head">
      <span class="pixel-kicker success pxl-corner-sm">LIVE DEMO</span>
      <h1>同一份 token，差异直接出现在交互里。</h1>
    </div>

    <StreamingRenderPlay v-click />
  </div>
</template>
