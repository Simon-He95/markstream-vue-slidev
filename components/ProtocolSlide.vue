<script setup>
import { motion } from "motion-v";

const streamTokens = ["#", "content", "<thinking>", "<tool-result>", "final"];
</script>

<template>
  <div class="deck dark protocol-deck">
    <div class="slide-head">
      <span class="pixel-kicker pxl-corner-sm">FROM DOC TO STREAM</span>
      <h1>Markdown 从一张纸，变成一条正在发生的流。</h1>
    </div>

    <div class="protocol-machine">
      <motion.div
        v-click
        class="protocol-source pxl-corner-lg pxl-shadow"
        :initial="{ opacity: 0, y: 18 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.32 }"
      >
        <span class="pixel-kicker danger small pxl-corner-sm">过去</span>
        <div class="paper-sheet-mini">
          <b># Report</b>
          <i /><i /><i /><i />
        </div>
        <p>完成后再渲染，面对静态文档。</p>
      </motion.div>

      <div v-click class="token-conveyor" aria-hidden="true">
        <i></i>
        <motion.span
          v-for="(token, index) in streamTokens"
          :key="token"
          class="conveyor-token pxl-corner-sm"
          :class="`conveyor-${index + 1}`"
          :initial="{ opacity: 0, x: -12 }"
          :animate="{ opacity: 1, x: 0 }"
          :transition="{ delay: index * 0.08, duration: 0.24 }"
        >
          {{ token }}
        </motion.span>
      </div>

      <motion.div
        v-click
        class="protocol-ui pxl-corner-lg pxl-shadow"
        :initial="{ opacity: 0, y: 18 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ delay: 0.12, duration: 0.32 }"
      >
        <span class="pixel-kicker success small pxl-corner-sm">现在</span>
        <div class="ui-stack-preview">
          <section><b>思考中</b><span>检索上下文...</span></section>
          <section><b>工具结果</b><span>已关联 12 份文档</span></section>
          <section><b>最终回答</b><span>稳定 Vue 组件</span></section>
        </div>
        <p>边生成，边成为稳定 UI。</p>
      </motion.div>
    </div>

    <p class="takeaway">重点不再是渲染一份完成后的文档，而是接住正在发生的生成过程。</p>
  </div>
</template>
