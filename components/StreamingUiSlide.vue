<script setup>
const nodes = [
  ["多类型内容", "代码、表格、Mermaid、工具结果和自定义标签都要边生成边显示。"],
  ["高频更新", "文本不断追加时，页面不能跟着闪、跳、整块重建。"],
  ["交互状态", "用户正在滚动或选择代码时，渲染更新不应该打断他。"],
];
</script>

<template>
  <div class="deck dark identity-deck">
    <div class="slide-head">
      <span class="pixel-kicker pxl-corner-sm">STREAMING UI</span>
      <h1>更强的渲染器，要同时处理内容形态、更新频率和交互体验。</h1>
    </div>

    <div class="identity-lab">
      <div v-click class="identity-core pxl-corner-lg">
        <span>更新不打断页面</span>
        <b>不闪、不跳、不重建</b>
        <i></i>
      </div>

      <div class="identity-node-grid">
        <div
          v-click
          v-for="(node, index) in nodes"
          :key="node[0]"
          class="identity-node pxl-corner-md pxl-shadow"
          :class="`identity-node-${index + 1}`"
        >
          <span>0{{ index + 1 }}</span>
          <b>{{ node[0] }}</b>
          <p>{{ node[1] }}</p>
        </div>
      </div>
    </div>

    <p v-click class="takeaway">markstream-vue 的目标，是让 AI 输出一边增长，一边保持可读、可操作，并且能接进 Vue 组件。</p>
  </div>
</template>
