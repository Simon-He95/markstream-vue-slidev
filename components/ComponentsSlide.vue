<script setup>
import PxlCodeWindow from "./PxlCodeWindow.vue";

const code = `<thinking>
Search knowledge base first.
</thinking>
<tool-result name="search" status="done">
Found 12 related documents.
</tool-result>
<answer-box type="final">
Here is the answer...
</answer-box>`;
</script>

<template>
  <div class="deck dark">
    <div class="slide-head">
      <span class="pixel-kicker gold pxl-corner-sm">CUSTOM COMPONENTS</span>
      <h1>AI 输出不只会写 Markdown，也会输出可组件化的结构。</h1>
    </div>

    <div class="pixel-grid api-grid">
      <PxlCodeWindow v-click title="stream-tags.md" compact :code="code" />

      <div class="chat-stack">
        <div v-click class="pixel-bubble cyan pxl-corner-md"><b>思考中</b><span>先检索知识库。</span></div>
        <div v-click class="pixel-bubble green pxl-corner-md"><b>工具结果</b><span>找到 12 份相关文档</span></div>
        <div v-click class="pixel-bubble pxl-corner-md"><b>最终回答</b><span>这里是整理后的答案...</span></div>
      </div>
    </div>

    <p v-click class="takeaway">这样一来，渲染器不只是显示答案，还能把答案接进真实产品界面。</p>
  </div>
</template>
