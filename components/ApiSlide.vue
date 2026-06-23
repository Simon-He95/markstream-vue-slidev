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
  { label: "完成信号", value: "final", caption: "完成时收束中间态" },
  { label: "更新节奏", value: "batch", caption: "多段内容合并更新页面" },
  { label: "扩展能力", value: "tags", caption: "自定义标签映射 Vue 组件" },
];
</script>

<template>
  <div class="deck dark">
    <div class="slide-head">
      <span class="pixel-kicker pxl-corner-sm">API SURFACE</span>
      <h1>调用方式保持简单，复杂度交给 renderer 处理。</h1>
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
