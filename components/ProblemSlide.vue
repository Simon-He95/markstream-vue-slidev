<script setup>
import { motion } from "motion-v";
import PxlCodeWindow from "./PxlCodeWindow.vue";

const streamCode = `<thinking>Searching docs...</thinking>
${"`".repeat(3)}ts
const answer = await agent.run()
event: done
final=true`;
</script>

<template>
  <div class="deck dark problem-deck">
    <div class="slide-head">
      <span class="pixel-kicker danger pxl-corner-sm">PROBLEM</span>
      <h1>传统 Markdown renderer 默认输入已经完成。</h1>
    </div>

    <div class="problem-stage">
      <motion.div
        v-click
        class="assumption-panel pxl-corner-lg pxl-shadow"
        :initial="{ opacity: 0, rotate: -2, x: -18 }"
        :animate="{ opacity: 1, rotate: -1, x: 0 }"
        :transition="{ duration: 0.32 }"
      >
        <div class="pixel-titlebar"><span></span><span></span><span></span><b>document-renderer.log</b></div>
        <div class="pixel-timeline">
          <div><b>01</b><span>等待整段 Markdown 完成</span></div>
          <div><b>02</b><span>parse 成完整 AST</span></div>
          <div><b>03</b><span>一次性渲染 HTML</span></div>
        </div>
        <strong class="assumption-stamp">static input</strong>
      </motion.div>

      <div v-click class="broken-live-panel">
        <PxlCodeWindow title="ai-stream.sse" compact :code="streamCode">
          <div class="pixel-alert info pxl-corner-md">用户看到的是生成过程，不是完成后的文档截图。</div>
        </PxlCodeWindow>
        <div class="crash-overlay pxl-corner-sm">
          <span>unclosed fence</span>
          <span>layout jump</span>
          <span>heavy block waiting</span>
        </div>
      </div>
    </div>
  </div>
</template>
