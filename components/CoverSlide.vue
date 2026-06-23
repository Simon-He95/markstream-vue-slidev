<script setup>
import { motion } from "motion-v";
import AnimeDotField from "./AnimeDotField.vue";
import PxlCodeWindow from "./PxlCodeWindow.vue";

const code = "$ npm i markstream-vue\n\n<MarkdownRender\n  :content=\"content\"\n  :final=\"final\"\n  smooth-streaming=\"auto\"\n/>";
const tokens = ["content", "thinking", "tool-result", "custom-tags"];
</script>

<template>
  <div class="deck dark cover-deck">
    <div class="hero-launch">
      <div class="hero-copy">
        <span class="pixel-kicker pxl-corner-sm">PXLKIT SURFACE · VUE 3</span>
        <h1 class="deck-title">markstream-vue</h1>
        <p class="deck-subtitle">
          流式 Markdown 不只是把字打出来，而是把生成中的内容稳定落成 Vue UI。
        </p>
        <div v-click class="hero-ribbon pxl-corner-md">
          <span>流式输入</span>
          <span>稳定节点</span>
          <span>Vue 组件</span>
        </div>
        <div v-click class="pixel-stat-row">
          <div class="pixel-stat pxl-corner-md pxl-shadow">
            <span>目标</span>
            <b>Vue 3</b>
            <small>渲染基础能力</small>
          </div>
          <div class="pixel-stat pxl-corner-md pxl-shadow">
            <span>信号</span>
            <b>final</b>
            <small>生成完成信号</small>
          </div>
        </div>
        <p class="speaker-line">Simon He / Simon-He95</p>
      </div>

      <div class="hero-orbit" aria-hidden="true">
        <AnimeDotField :slide-no="1" />
        <div class="logo-portal pxl-corner-lg">
          <img class="cover-logo" src="/markstream-logo.svg" alt="markstream-vue logo">
          <span></span>
        </div>
        <motion.span
          v-for="(token, index) in tokens"
          :key="token"
          class="orbit-token pxl-corner-sm"
          :class="`token-${index + 1}`"
          :initial="{ opacity: 0, scale: 0.72 }"
          :animate="{ opacity: 1, scale: 1 }"
          :transition="{ delay: 0.18 + index * 0.08, duration: 0.24 }"
        >
          {{ token }}
        </motion.span>
        <i class="orbit-ring ring-a"></i>
        <i class="orbit-ring ring-b"></i>
      </div>

      <div class="hero-window-stack">
        <PxlCodeWindow title="renderer.vue" :code="code" />
        <div class="pixel-sparkline pxl-corner-sm" aria-hidden="true">
          <i style="height: 34%" />
          <i style="height: 52%" />
          <i style="height: 42%" />
          <i style="height: 76%" />
          <i style="height: 64%" />
          <i style="height: 88%" />
          <i style="height: 72%" />
        </div>
      </div>
    </div>
  </div>
</template>
