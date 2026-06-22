<script setup>
import { motion } from "motion-v";
</script>

<template>
  <div class="deck dark big-number-deck">
    <div class="perf-hud">
      <span class="pixel-kicker success pxl-corner-sm">SCRIPTING TIME</span>
      <div class="hud-ring" aria-hidden="true"><i></i><i></i><i></i></div>
      <motion.div
        v-click
        class="big-number"
        :initial="{ opacity: 0, scale: 0.9 }"
        :animate="{ opacity: 1, scale: 1 }"
        :transition="{ duration: 0.36, ease: 'easeOut' }"
      >
        <span class="old">296.4ms</span>
        <span class="arrow">→</span>
        <span class="new">16.3ms</span>
      </motion.div>
      <p v-click class="big-number-sub">降低 94.5%，收益来自减少每个 chunk 的全量重渲染。</p>
      <div v-click class="big-number-meta pxl-corner-sm">
        3-run median · Chrome CDP · 8 cases × 119 chunks · markstream-vue@1.0.1-beta.5
      </div>
    </div>
  </div>
</template>
