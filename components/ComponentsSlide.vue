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
      <h1>AI 输出里的标签，可以落成真实 Vue 组件。</h1>
    </div>

    <div class="pixel-grid api-grid">
      <PxlCodeWindow v-click title="stream-tags.md" compact :code="code" />

      <div class="chat-stack">
        <div v-click class="pixel-bubble cyan pxl-corner-md"><b>Thinking</b><span>Search knowledge base first.</span></div>
        <div v-click class="pixel-bubble green pxl-corner-md"><b>Tool</b><span>12 related documents</span></div>
        <div v-click class="pixel-bubble pxl-corner-md"><b>Final</b><span>Here is the answer...</span></div>
      </div>
    </div>

    <p v-click class="takeaway">SSE 里的 custom tags 不是字符串，它们是 Vue 组件在流中的锚点。</p>
  </div>
</template>
