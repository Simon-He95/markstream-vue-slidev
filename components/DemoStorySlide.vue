<script setup>
import { motion } from "motion-v";
import PxlCodeWindow from "./PxlCodeWindow.vue";

const streamCode = `event: token
data: <thinking>Searching docs...</thinking>

data: ${"`".repeat(3)}ts
data: const answer = await agent.run()
data: ${"`".repeat(3)}

event: done
data: final=true`;

const frames = [
  ["01", "intent", "先接住“正在思考”。", "Thinking"],
  ["02", "structure", "未闭合代码块也能站住。", "Code block"],
  ["03", "commit", "完成时稳定落地。", "Final"],
];
</script>

<template>
  <div class="deck dark">
    <div class="slide-head">
      <span class="pixel-kicker success pxl-corner-sm">LIVE DEMO</span>
      <h1>一条 SSE，不应该只是刷字。</h1>
    </div>

    <div class="demo-reel">
      <PxlCodeWindow v-click title="stream.sse" compact :code="streamCode" />

      <div class="reel-preview pxl-corner-lg pxl-shadow">
        <div class="reel-track" aria-hidden="true">
          <i></i><i></i><i></i><i></i>
        </div>
        <motion.div
          v-click
          v-for="(frame, index) in frames"
          :key="frame[0]"
          class="story-frame pxl-corner-md"
          :initial="{ opacity: 0, x: 24 }"
          :animate="{ opacity: 1, x: 0 }"
          :transition="{ delay: index * 0.08, duration: 0.28 }"
        >
          <span>{{ frame[0] }}</span>
          <b>{{ frame[3] }}</b>
          <p>{{ frame[2] }}</p>
        </motion.div>
      </div>
    </div>

    <p v-click class="takeaway">content append → incomplete parse → stable heavy blocks → custom tags → final commit</p>
  </div>
</template>
