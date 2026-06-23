<script setup>
const nodes = [
  ["未完成结构", "代码块、表格、Mermaid 生成到一半也要能站住。"],
  ["重型内容", "Monaco / KaTeX / Mermaid 不能随着每次更新反复重挂。"],
  ["交互状态", "滚动位置、选区和组件内部状态要跟着节点留下来。"],
];
</script>

<template>
  <div class="deck dark identity-deck">
    <div class="slide-head">
      <span class="pixel-kicker pxl-corner-sm">STREAMING UI</span>
      <h1>内容还在增长，UI 不能一直推倒重来。</h1>
    </div>

    <div class="identity-lab">
      <div v-click class="identity-core pxl-corner-lg">
        <span>稳定节点身份</span>
        <b>节点不换人</b>
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

    <p v-click class="takeaway">流式渲染真正要保住的，是正在增长的代码块、表格和组件状态。</p>
  </div>
</template>
