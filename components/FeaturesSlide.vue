<script setup>
import PxlCodeWindow from "./PxlCodeWindow.vue";

const features = [
  ["⚡", "增量渲染", "只 patch 变化节点，高频输出也不整页重建。"],
  ["🧵", "Worker 解析", "解析放进 Worker / 服务端，主线程零阻塞。"],
  ["👁", "可视区域渲染", "max-live-nodes 虚拟窗口，长文档只渲染该渲染的。"],
  ["📊", "Mermaid · KaTeX · 信息图", "图表渐进出图、公式即时渲染，复杂形态开箱即用。"],
  ["🧩", "自定义组件", "把 thinking / tool-result / 自定义标签接成真实 Vue 组件。"],
  ["🎨", "Shiki / Monaco", "轻量高亮或大代码块的流畅增量更新，按需选。"],
];

const usage = `import MarkdownRender, {
  enableMermaid, enableKatex,
} from 'markstream-vue'

enableMermaid()  // 按需注入
enableKatex()

<MarkdownRender :content="content" :final="done" />`;
</script>

<template>
  <div class="deck dark features-deck">
    <div class="slide-head compact-head">
      <span class="pixel-kicker success pxl-corner-sm">FEATURES · 开箱即用</span>
      <h1>一个组件，把流式 AI 输出需要的能力都准备好了。</h1>
    </div>

    <div class="features-stage">
      <div class="features-grid">
        <div
          v-for="(feature, index) in features"
          :key="feature[1]"
          v-click
          class="feature-tile pxl-corner-md pxl-shadow"
        >
          <span class="feature-icon">{{ feature[0] }}</span>
          <b>{{ feature[1] }}</b>
          <small>{{ feature[2] }}</small>
        </div>
      </div>

      <div class="usage-col">
        <PxlCodeWindow v-click title="app.vue" compact :code="usage" />
        <div
          v-click
          class="ondemand pxl-corner-md"
        >
          <b>按需注入</b>
          <span>Mermaid / KaTeX 是可选 peer，用到才装；不用的能力不进包体。</span>
        </div>
      </div>
    </div>

    <p v-click class="takeaway">
      渲染器不只是显示答案，还能把答案接进真实产品界面——而这一切，默认就是流式安全的。
    </p>
  </div>
</template>

<style scoped>
.features-deck {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 0;
}

.features-deck h1 {
  font-size: 30px;
  line-height: 1.2;
}

.features-stage {
  display: grid;
  grid-template-columns: minmax(0, 1.32fr) minmax(0, 0.68fr);
  gap: 16px;
  align-items: start;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
}

.feature-tile {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 13px;
  border: 2px solid var(--retro-border-strong);
  background: var(--retro-card);
}

.feature-icon {
  font-size: 20px;
  line-height: 1;
}

.feature-tile b {
  color: var(--retro-text);
  font-size: 13px;
  font-weight: 800;
}

.feature-tile small {
  color: var(--retro-muted);
  font-size: 10.5px;
  line-height: 1.4;
}

.usage-col {
  display: flex;
  flex-direction: column;
  gap: 11px;
}

.usage-col :deep(.pixel-window) {
  margin: 0;
}

.usage-col :deep(.pixel-code.compact) {
  font-size: 10.5px;
  line-height: 1.5;
}

.ondemand {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 11px 13px;
  border: 2px solid var(--retro-gold);
  background: rgba(255, 215, 0, 0.06);
}

.ondemand b {
  color: var(--retro-gold);
  font-family: var(--font-pixel-local);
  font-size: 10px;
  font-weight: 800;
  text-transform: uppercase;
}

.ondemand span {
  color: var(--retro-muted);
  font-size: 11px;
  line-height: 1.4;
}
</style>
