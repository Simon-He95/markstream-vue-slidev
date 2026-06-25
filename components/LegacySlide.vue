<script setup>
import PxlCodeWindow from "./PxlCodeWindow.vue";

const sample = `function greet(name) {
  return \`Hi, \${name}\``;

const chunks = ["chunk 1", "chunk 2", "chunk 3", "…", "chunk N"];
</script>

<template>
  <div class="deck dark legacy-deck">
    <div class="slide-head compact-head">
      <span class="pixel-kicker gold pxl-corner-sm">HISTORY · 一路走来</span>
      <h1>早期渲染：从裸 pre/code，到全量高亮，再撞上性能墙。</h1>
    </div>

    <div class="evolution-row">
      <div
        v-click
        class="era pxl-corner-md pxl-shadow"
      >
        <span class="era-tag plain">① 裸 pre / code</span>
        <pre class="plain-code"><code>{{ sample }}</code></pre>
        <small>marked / markdown-it → innerHTML，代码块就是灰白的 <b>&lt;pre&gt;&lt;code&gt;</b>，没有高亮。</small>
      </div>

      <div class="evo-arrow">
        <b>→</b><i>加高亮</i>
      </div>

      <div
        v-click
        class="era pxl-corner-md pxl-shadow"
      >
        <span class="era-tag hl">② highlight.js / Shiki</span>
        <PxlCodeWindow title="highlight.js" compact :code="sample" />
        <small>AI 输出越来越重要 → 给代码、表格、公式都加上样式，体验一下变好。</small>
      </div>
    </div>

    <div
      v-click
      class="catch pxl-corner-lg pxl-shadow"
    >
      <div class="catch-left">
        <span class="era-tag danger">③ 但代价是全量重渲染</span>
        <p class="catch-lead">
          markdown-it 是<b>全量 parse → 全量 render</b>；流式下每来一个 chunk，就把<b>整篇</b>重头跑一遍。
        </p>
      </div>
      <div class="reparse" aria-hidden="true">
        <div class="reparse-stream">
          <span v-for="(chunk, index) in chunks" :key="chunk" :style="{ '--i': index }">{{ chunk }}</span>
        </div>
        <b class="reparse-arrow">↻ 每个 chunk = 整篇 re-parse + re-render</b>
      </div>
      <div class="cost-line pxl-corner-sm">
        <span>N 个 chunk → N 次整篇重渲染</span>
        <b>O(n²)</b>
      </div>
    </div>
  </div>
</template>

<style scoped>
.legacy-deck {
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding: 0;
}

.legacy-deck :deep(.slide-head h1),
.legacy-deck h1 {
  font-size: 30px;
  line-height: 1.22;
}

.evolution-row {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr);
  align-items: center;
  gap: 14px;
}

.era {
  display: flex;
  flex-direction: column;
  gap: 7px;
  padding: 11px 13px;
  border: 2px solid var(--retro-border-strong);
  background: var(--retro-card);
}

.era-tag {
  align-self: flex-start;
  padding: 3px 8px;
  border: 2px solid var(--retro-border);
  font-family: var(--font-pixel-local);
  font-size: 8px;
  font-weight: 800;
  text-transform: uppercase;
}

.era-tag.plain { color: var(--retro-muted); }
.era-tag.hl { color: var(--retro-cyan); border-color: var(--retro-cyan); }
.era-tag.danger { color: var(--retro-red); border-color: var(--retro-red); }

.plain-code {
  margin: 0;
  padding: 9px 11px;
  border: 2px solid var(--retro-border);
  background: var(--code-bg);
  color: #9a9aae;
  font-family: var(--font-code);
  font-size: 12px;
  line-height: 1.45;
  white-space: pre;
  overflow: hidden;
}

.era small {
  color: var(--retro-muted);
  font-size: 10.5px;
  line-height: 1.4;
}

.era small b { color: var(--retro-text); }

.era :deep(.pixel-window) { margin: 0; }
.era :deep(.pixel-code.compact) { font-size: 12px; }

.evo-arrow {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3px;
}

.evo-arrow b {
  color: var(--retro-cyan);
  font-size: 22px;
  line-height: 1;
}

.evo-arrow i {
  color: var(--retro-cyan);
  font-family: var(--font-pixel-local);
  font-size: 8px;
  font-style: normal;
  font-weight: 800;
  text-transform: uppercase;
}

.catch {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1.05fr) auto;
  align-items: center;
  gap: 16px;
  padding: 13px 16px;
  border: 2px solid var(--retro-red);
  background: var(--retro-card);
}

.catch-left {
  display: flex;
  flex-direction: column;
  gap: 7px;
}

.catch-lead {
  margin: 0;
  color: var(--retro-text);
  font-size: 12px;
  line-height: 1.5;
}

.catch-lead b { color: var(--retro-red); }

.reparse {
  display: flex;
  flex-direction: column;
  gap: 7px;
}

.reparse-stream {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
}

.reparse-stream span {
  padding: 4px 8px;
  border: 2px solid var(--retro-border-strong);
  background: var(--retro-surface);
  color: var(--retro-muted);
  font-family: var(--font-pixel-local);
  font-size: 9px;
  font-weight: 700;
  animation: legacy-pulse 2.4s ease-in-out infinite;
  animation-delay: calc(var(--i) * 0.16s);
}

.reparse-arrow {
  color: var(--retro-red);
  font-family: var(--font-pixel-local);
  font-size: 9px;
  font-weight: 700;
}

.cost-line {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 10px 14px;
  border: 2px solid var(--retro-red);
  background: rgba(127, 29, 29, 0.24);
  text-align: center;
}

.cost-line span {
  color: var(--retro-text);
  font-family: var(--font-pixel-local);
  font-size: 8.5px;
  font-weight: 700;
  line-height: 1.4;
}

.cost-line b {
  color: var(--retro-red);
  font-size: 20px;
  font-weight: 900;
}

@keyframes legacy-pulse {
  0%, 100% { opacity: 0.5; }
  50% { opacity: 1; border-color: var(--retro-red); }
}
</style>
