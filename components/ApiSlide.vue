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
  { label: "signal", value: "final", caption: "完成时收束中间态" },
  { label: "scheduler", value: "batch", caption: "transport chunk ≠ DOM commit" },
  { label: "extension", value: "tags", caption: "custom tags 映射 Vue 组件" },
];
</script>

<template>
  <div class="deck dark">
    <div class="slide-head">
      <span class="pixel-kicker pxl-corner-sm">API SURFACE</span>
      <h1>调用面保持简单，复杂度留在 renderer 里。</h1>
    </div>

    <div class="api-console">
      <PxlCodeWindow v-click title="usage.vue" :code="code" />
      <div v-click class="api-switchboard">
        <PxlStatColumn :items="items" />
        <div class="api-ports pxl-corner-md">
          <span>content</span><span>nodes</span><span>slots</span><span>final</span>
        </div>
      </div>
    </div>
  </div>
</template>
