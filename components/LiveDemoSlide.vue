<script setup>
import StreamingRenderPlay from "./StreamingRenderPlay.vue";
</script>

<template>
  <div class="deck dark">
    <div class="slide-head compact-head">
      <span class="pixel-kicker success pxl-corner-sm">LIVE DEMO</span>
      <h1>同一份 AI 输出，普通渲染和流式渲染的体验会立刻分开。</h1>
    </div>

    <StreamingRenderPlay v-click />
  </div>
</template>
