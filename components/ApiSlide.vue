<script setup>
import PxlCodeWindow from "./PxlCodeWindow.vue";
import PxlStatColumn from "./PxlStatColumn.vue";

const code = `<MarkdownRender
  :content="content"
  :final="final"
  :max-live-nodes="0"
  :batch-rendering="true"
  :render-batch-size="16"
  :render-batch-delay="8"
  custom-id="chat"
/>`;

const items = [
  { label: "输入", value: "content / nodes", caption: "原始 Markdown 或预解析节点都能接" },
  { label: "模式", value: "max-live-nodes", caption: "220 长文档窗口，0 聊天增量批次" },
  { label: "扩展", value: "custom tags", caption: "可信标签映射成 Vue 组件" },
];
const ports = ["content", "nodes", "final", "tags"];
</script>

<template>
  <div class="deck dark">
    <div class="slide-head">
      <span class="pixel-kicker pxl-corner-sm">API SURFACE</span>
      <h1>上手仍然应该简单：一个组件接住 AI 输出的复杂度。</h1>
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
