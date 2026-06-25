<script setup>

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
      <div
        v-click
        class="about-id pxl-corner-lg pxl-shadow"
      >
        <img class="profile-avatar" src="/simon-avatar.png" alt="Simon He GitHub avatar">
        <div>
          <span class="pixel-kicker small pxl-corner-sm">PROFILE</span>
          <h2>Simon He</h2>
          <p>Simon-He95 · Shanghai</p>
          <strong>Vue / DX / AI UI / Streaming Rendering</strong>
        </div>
      </div>

      <div v-click class="oss-orbit">
        <div
          v-for="(project, index) in projects"
          :key="project[1]"
          class="oss-chip pxl-corner-sm"
          :class="`oss-${index + 1}`"
        >
          <img :src="project[2]" alt="">
          <span>{{ project[0] }}</span>
          <b>{{ project[1] }}</b>
        </div>
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

    <p v-click class="takeaway">这些项目让我长期站在 Vue、AI UI 和流式渲染的交叉点上。</p>
  </div>
</template>
