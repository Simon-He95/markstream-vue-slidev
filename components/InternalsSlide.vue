<script setup>

const pipeline = [
  "token stream",
  "parse · worker",
  "typed nodes",
  "diff + 节点复用",
  "批处理 patch",
  "稳定 DOM",
];

const cards = [
  {
    title: "节点复用 · 增量 patch",
    desc: "只更新变化的 Token，未变节点原地复用，不做整页 remount——选区和滚动稳得住。",
    chip: ":content / :nodes",
    accent: "green",
  },
  {
    title: "虚拟窗口 max-live-nodes",
    desc: "长文档默认保留 220 个 live nodes 做虚拟化；聊天打字模式设为 0，用轻量占位符。",
    chip: ":max-live-nodes=\"220 | 0\"",
    accent: "cyan",
  },
  {
    title: "Worker 预解析",
    desc: "parseMarkdownToStructure 可在服务端 / Worker 里跑，:nodes 直接喂结果，主线程零解析。",
    chip: "parseMarkdownToStructure()",
    accent: "purple",
  },
  {
    title: "批处理 + 单帧预算",
    desc: "攒几段再更新，并给每帧留出交互余量，避免高频输出抢走主线程。",
    chip: "batchSize 16 · delay 8 · budget 4ms",
    accent: "gold",
  },
];
</script>

<template>
  <div class="deck dark internals-deck">
    <div class="slide-head compact-head">
      <span class="pixel-kicker gold pxl-corner-sm">INTERNALS · markstream-vue 内部</span>
      <h1>进到组件里：增量更新 + 节点复用 + 虚拟窗口 + Worker + 单帧预算。</h1>
    </div>

    <div
      v-click
      class="pipeline pxl-corner-lg pxl-shadow"
    >
      <template v-for="(stage, index) in pipeline" :key="stage">
        <div class="stage" :class="{ hot: index >= 3 }">{{ stage }}</div>
        <i v-if="index < pipeline.length - 1" class="flow">▸</i>
      </template>
    </div>

    <div class="cards">
      <div
        v-for="(card, index) in cards"
        :key="card.title"
        v-click
        class="mech-card pxl-corner-md pxl-shadow"
        :class="`accent-${card.accent}`"
      >
        <b>{{ card.title }}</b>
        <span>{{ card.desc }}</span>
        <code>{{ card.chip }}</code>
      </div>
    </div>

    <p v-click class="takeaway">
      同一个组件，两种节奏：长文档走虚拟窗口，聊天面板把 live nodes 设 0 切到增量流式。
    </p>
  </div>
</template>

<style scoped>
.internals-deck {
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding: 0;
}

.pipeline {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 12px 14px;
  border: 2px solid var(--retro-border-strong);
  background: var(--retro-card);
}

.stage {
  padding: 7px 12px;
  border: 2px solid var(--retro-border-strong);
  background: var(--retro-surface);
  color: var(--retro-text);
  font-family: var(--font-pixel-local);
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
}

.stage.hot {
  border-color: var(--retro-green);
  color: var(--retro-green);
}

.flow {
  color: var(--retro-cyan);
  font-style: normal;
  font-size: 13px;
}

.cards {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 12px;
}

.mech-card {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 14px;
  border: 2px solid var(--retro-border-strong);
  background: var(--retro-card);
}

.mech-card.accent-green { border-top: 5px solid var(--retro-green); }
.mech-card.accent-cyan { border-top: 5px solid var(--retro-cyan); }
.mech-card.accent-purple { border-top: 5px solid var(--retro-purple); }
.mech-card.accent-gold { border-top: 5px solid var(--retro-gold); }

.mech-card b {
  color: var(--retro-text);
  font-size: 13px;
  font-weight: 800;
  line-height: 1.25;
}

.mech-card span {
  flex: 1;
  color: var(--retro-muted);
  font-size: 11px;
  line-height: 1.42;
}

.mech-card code {
  padding: 5px 8px;
  border: 2px solid var(--retro-border);
  background: var(--code-bg);
  color: var(--retro-cyan);
  font-family: var(--font-code);
  font-size: 9.5px;
  word-break: break-all;
}
</style>
