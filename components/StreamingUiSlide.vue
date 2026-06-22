<script setup>
const nodes = [
  ["半截结构", "代码块、表格、Mermaid 先出现不完整状态。"],
  ["重型节点", "Monaco / KaTeX / Mermaid 不应该反复 remount。"],
  ["交互状态", "scroll、selection、组件内部状态要跟着节点身份留下来。"],
];
</script>

<template>
  <div class="deck dark identity-deck">
    <div class="slide-head">
      <span class="pixel-kicker pxl-corner-sm">STREAMING UI</span>
      <h1>增长中的节点，不能一直被重建。</h1>
    </div>

    <div class="identity-lab">
      <div v-click class="identity-core pxl-corner-lg">
        <span>stable node identity</span>
        <b>DOM 不换人</b>
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

    <p v-click class="takeaway">AI Streaming Renderer 关心的不是“渲染一次”，而是让每个增长中的节点保持稳定身份。</p>
  </div>
</template>
