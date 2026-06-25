<script setup>
import { motion } from "motion-v";
import AnimeDotField from "./AnimeDotField.vue";
import StreamAssemblyMachine from "./StreamAssemblyMachine.vue";

const tokens = ["content", "thinking", "tool-result", "custom-tags"];
</script>

<template>
  <div class="deck dark cover-deck">
    <div class="hero-launch">
      <div class="hero-copy">
        <span class="pixel-kicker pxl-corner-sm">VUECONF · MARKSTREAM-VUE</span>
        <h1 class="deck-title">你的 Markdown 渲染器，<br>扛得住 AI 输出吗？</h1>
        <p class="deck-subtitle">
          模型吐字更快、上下文更长、形态更复杂——渲染器正在从一个组件，变成扛压力的基础设施。
        </p>
        <div v-click class="hero-ribbon pxl-corner-md">
          <span>更快</span>
          <span>更长</span>
          <span>更多形态</span>
        </div>
        <div v-click class="pixel-stat-row">
          <div class="pixel-stat pxl-corner-md pxl-shadow">
            <span>挑战</span>
            <b>AI 输出</b>
            <small>高频、长文本、多类型</small>
          </div>
          <div class="pixel-stat pxl-corner-md pxl-shadow">
            <span>方案</span>
            <b>markstream</b>
            <small>给 Vue 用的流式 Markdown 渲染器</small>
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
        <StreamAssemblyMachine :slide-no="1" compact mode="hero" />
      </div>
    </div>
  </div>
</template>
