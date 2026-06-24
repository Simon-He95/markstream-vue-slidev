<script setup>
import { motion } from "motion-v";
import PxlCodeWindow from "./PxlCodeWindow.vue";

const streamCode = `<thinking>Searching docs...</thinking>
${"`".repeat(3)}ts
const answer = await agent.run()
event: done
final=true`;
const chunks = ["open", "code", "tool", "final"];
const domBlocks = ["remount", "flash", "wait"];
</script>

<template>
  <div class="deck dark problem-deck">
    <div class="slide-head">
      <span class="pixel-kicker danger pxl-corner-sm">PROBLEM</span>
      <h1>速度、长度、形态一起上来后，普通 Markdown 渲染器开始扛不住。</h1>
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
          <div><b>01</b><span>假设输入已经完整</span></div>
          <div><b>02</b><span>反复穿过完整解析链路</span></div>
          <div><b>03</b><span>频繁刷新大片页面</span></div>
        </div>
        <strong class="assumption-stamp">完整输入</strong>
      </motion.div>

      <div v-click class="broken-live-panel">
        <PxlCodeWindow title="ai-stream.sse" compact :code="streamCode">
          <div class="pixel-alert info pxl-corner-md">AI 给你的不是完成稿，而是一边增长、一边变复杂的输出过程。</div>
        </PxlCodeWindow>
        <div class="renderer-drift-map pxl-corner-md" aria-hidden="true">
          <div class="drift-stream">
            <span
              v-for="(chunk, index) in chunks"
              :key="chunk"
              :style="{ '--i': index }"
            >{{ chunk }}</span>
          </div>
          <div class="drift-arrow"><i></i><i></i><i></i></div>
          <div class="drift-dom">
            <section
              v-for="(block, index) in domBlocks"
              :key="block"
              :style="{ '--i': index }"
            >
              <b>{{ block }}</b>
            </section>
          </div>
        </div>
        <div class="crash-overlay pxl-corner-sm">
          <span>未闭合代码块</span>
          <span>布局跳动</span>
          <span>复杂内容稍后</span>
        </div>
      </div>
    </div>
  </div>
</template>
