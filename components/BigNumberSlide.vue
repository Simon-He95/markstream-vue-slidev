<script setup>
import { motion } from "motion-v";

const lanes = [
  ["长文档默认", "220 live nodes", 100, "old"],
  ["聊天增量", "0 live nodes", 8, "new"],
];
</script>

<template>
  <div class="deck dark big-number-deck">
    <div class="perf-hud">
      <span class="pixel-kicker success pxl-corner-sm">PERFORMANCE MODES</span>
      <div class="hud-ring" aria-hidden="true"><i></i><i></i><i></i></div>
      <motion.div
        v-click
        class="big-number"
        :initial="{ opacity: 0, scale: 0.9 }"
        :animate="{ opacity: 1, scale: 1 }"
        :transition="{ duration: 0.36, ease: 'easeOut' }"
      >
        <span class="old">220</span>
        <span class="arrow">→</span>
        <span class="new">0</span>
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
      <p v-click class="big-number-sub">默认模式服务长文档；聊天场景切到增量批次，保留流式输出的节奏。</p>
      <div v-click class="big-number-meta pxl-corner-sm">
        npm latest · markstream-vue@1.0.7-beta.3 · README performance modes
      </div>
    </div>
  </div>
</template>
