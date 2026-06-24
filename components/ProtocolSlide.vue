<script setup>
import { motion } from "motion-v";

const trends = [
  ["更快", "模型返回速度上来后，渲染器要处理更高频的页面更新。"],
  ["更长", "上下文窗口和最大输出变大，一次回答可能就是一整页内容。"],
  ["更多", "代码、表格、工具结果、组件标签开始混在同一条流里。"],
];

const needs = ["更新不卡页面", "多类型都能显示", "交互不被打断"];
</script>

<template>
  <div class="deck dark protocol-deck">
    <div class="slide-head">
      <span class="pixel-kicker pxl-corner-sm">WHY NOW</span>
      <h1>AI 输出不再是几行文字，而是持续生成的界面内容。</h1>
    </div>

    <div class="origin-story">
      <motion.div
        v-for="(trend, index) in trends"
        v-click
        :key="trend[0]"
        class="origin-card pxl-corner-lg pxl-shadow"
        :style="{ '--i': index }"
        :initial="{ opacity: 0, y: 18, rotate: -1 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ delay: index * 0.08, duration: 0.28 }"
      >
        <span>{{ trend[0] }}</span>
        <p>{{ trend[1] }}</p>
      </motion.div>

      <motion.div
        v-click
        class="origin-pressure pxl-corner-lg pxl-shadow"
        :initial="{ opacity: 0, scale: 0.96 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ delay: 0.18, duration: 0.32 }"
      >
        <div class="pressure-meter">
          <span>tokens / sec</span>
          <i></i>
        </div>
        <div class="pressure-meter wide">
          <span>context size</span>
          <i></i>
        </div>
        <div class="pressure-meter tall">
          <span>ui blocks</span>
          <i></i>
        </div>
      </motion.div>

      <div v-click class="origin-answer pxl-corner-lg pxl-shadow">
        <span class="pixel-kicker success small pxl-corner-sm">MARKSTREAM-VUE</span>
        <h2>我们需要一个更强的 Markdown 渲染器。</h2>
        <div class="origin-needs">
          <b v-for="need in needs" :key="need">{{ need }}</b>
        </div>
      </div>
    </div>
  </div>
</template>
