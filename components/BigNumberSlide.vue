<script setup>
import { motion } from "motion-v";

const lanes = [
  ["传统整页更新", "296.4ms", 100, "old"],
  ["markstream-vue", "16.3ms", 6, "new"],
];
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
      <div v-click class="perf-race pxl-corner-lg" aria-hidden="true">
        <section
          v-for="lane in lanes"
          :key="lane[0]"
          :class="lane[3]"
        >
          <span>{{ lane[0] }}</span>
          <i :style="{ '--w': `${lane[2]}%` }"></i>
          <b>{{ lane[1] }}</b>
        </section>
      </div>
      <p v-click class="big-number-sub">当输出变长，少做整页重渲就是体验差异。</p>
      <div v-click class="big-number-meta pxl-corner-sm">
        3-run median · Chrome CDP · 8 cases × 119 段输入 · markstream-vue@1.0.1-beta.5
      </div>
    </div>
  </div>
</template>
