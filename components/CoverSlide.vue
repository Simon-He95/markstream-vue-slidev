<script setup>
import { motion } from "motion-v";
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
          Streaming Markdown 不是把字刷出来，而是让 AI 输出过程稳定变成 Vue UI。
        </p>
        <div v-click class="hero-ribbon pxl-corner-md">
          <span>stream chunks</span>
          <span>stable nodes</span>
          <span>Vue components</span>
        </div>
        <div v-click class="pixel-stat-row">
          <div class="pixel-stat pxl-corner-md pxl-shadow">
            <span>target</span>
            <b>Vue 3</b>
            <small>renderer foundation</small>
          </div>
          <div class="pixel-stat pxl-corner-md pxl-shadow">
            <span>signal</span>
            <b>final</b>
            <small>stream settle point</small>
          </div>
        </div>
        <p class="speaker-line">Simon He / Simon-He95</p>
      </div>

      <div v-click class="hero-orbit" aria-hidden="true">
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

      <div v-click class="hero-window-stack">
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
