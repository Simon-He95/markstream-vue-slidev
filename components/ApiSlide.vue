<script setup>
import PxlCodeWindow from "./PxlCodeWindow.vue";
import PxlStatColumn from "./PxlStatColumn.vue";

const code = `<MarkdownRender
  :content="content"
  :final="final"
  :batch-rendering="true"
  smooth-streaming="auto"
  :custom-id="customId"
/>`;

const items = [
  { label: "完成信号", value: "final", caption: "完成后补齐高亮和组件" },
  { label: "更新节奏", value: "batch", caption: "攒几段再更新页面" },
  { label: "扩展能力", value: "tags", caption: "自定义标签变成 Vue 组件" },
];
const ports = ["content", "final", "batch", "tags"];
</script>

<template>
  <div class="deck dark">
    <div class="slide-head">
      <span class="pixel-kicker pxl-corner-sm">API SURFACE</span>
      <h1>上手仍然应该简单：一行组件接住复杂 AI 输出。</h1>
    </div>

    <div class="api-console">
      <PxlCodeWindow v-click title="usage.vue" :code="code" />
      <div v-click class="api-switchboard">
        <PxlStatColumn :items="items" />
        <div class="api-plug-map pxl-corner-md" aria-hidden="true">
          <span
            v-for="(port, index) in ports"
            :key="port"
            :style="{ '--i': index }"
          >{{ port }}</span>
          <b>MarkdownRender</b>
        </div>
      </div>
    </div>
  </div>
</template>
