<script setup>
import { motion } from "motion-v";

const projects = [
  ["Maintainer", "UnoCSS", "/project-logos/unocss.png"],
  ["Maintainer", "DeepChat", "/project-logos/deepchat.png"],
  ["Maintainer", "Vue Vine", "/project-logos/vue-vine.png"],
  ["Author", "markstream-vue", "/markstream-logo.svg"],
  ["Author", "vscode-use", "/project-logos/vscode-use.png"],
  ["Author", "awesome-compressor", "/project-logos/awesome-compressor.png"],
];

const plugins = ["Common Intellisense", "UnoT", "Tailwind Magic", "Alias Jump"];
</script>

<template>
  <div class="deck dark about-slide">
    <img class="slide-corner-logo pxl-corner-sm" src="/markstream-logo.svg" alt="">
    <div class="slide-head">
      <span class="pixel-kicker pxl-corner-sm">ABOUT SIMON</span>
      <h1>前端开发者 / 开源爱好者</h1>
    </div>

    <div class="about-console">
      <motion.div
        v-click
        class="about-id pxl-corner-lg pxl-shadow"
        :initial="{ opacity: 0, x: -22 }"
        :animate="{ opacity: 1, x: 0 }"
        :transition="{ duration: 0.34 }"
      >
        <img class="profile-avatar" src="/simon-avatar.png" alt="Simon He GitHub avatar">
        <div>
          <span class="pixel-kicker small pxl-corner-sm">PROFILE</span>
          <h2>Simon He</h2>
          <p>Simon-He95 · Shanghai</p>
          <strong>Vue / DX / AI UI / Streaming Rendering</strong>
        </div>
      </motion.div>

      <div v-click class="oss-orbit">
        <motion.div
          v-for="(project, index) in projects"
          :key="project[1]"
          class="oss-chip pxl-corner-sm"
          :class="`oss-${index + 1}`"
          :initial="{ opacity: 0, y: 14 }"
          :animate="{ opacity: 1, y: 0 }"
          :transition="{ delay: index * 0.05, duration: 0.24 }"
        >
          <img :src="project[2]" alt="">
          <span>{{ project[0] }}</span>
          <b>{{ project[1] }}</b>
        </motion.div>
        <div class="about-focus pxl-corner-lg">
          <span>方向</span>
          <b>把 AI 输出做成稳定、可组合的 Vue UI</b>
        </div>
      </div>

      <div v-click class="vscode-rail pxl-corner-md">
        <span class="pixel-kicker small pxl-corner-sm">VS CODE</span>
        <b v-for="plugin in plugins" :key="plugin">
          <img src="/project-logos/vscode.svg" alt="">{{ plugin }}
        </b>
      </div>
    </div>

    <p v-click class="takeaway">我不是想再造一个 Markdown 组件，而是把 AI 正在生成的内容，稳定变成可交互的 Vue UI。</p>
  </div>
</template>
