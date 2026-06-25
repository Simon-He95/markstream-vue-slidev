<script setup>

const why = [
  ["增量解析", "只从受影响块之前的锚点重解析，不再重跑整篇文档。"],
  ["Piece-table 源视图", "不复制源字符串，编辑只物化改动范围，省掉大量扫描与 GC。"],
  ["自适应分块", "目标 ~8 chunks/篇，块边界感知；list/fence 不安全时安全回退。"],
  ["流式安全", "未闭合的代码块、强调保留为字面文本，不会吞掉后面的内容。"],
];

const data = [
  ["vs markdown-it · render", "9.7× / 10.8× / 12.8×", "5k / 20k / 100k chars · 越大越快"],
  ["vs remark / micromark · 增量 append", "120× – 204×", "流式追加才是真实场景，块越多差距越大"],
];
</script>

<template>
  <div class="deck dark solution-deck">
    <div class="slide-head compact-head">
      <span class="pixel-kicker success pxl-corner-sm">SOLUTION · 我们怎么解决</span>
      <h1>换掉全量解析：把「增量」当成第一性能目标。</h1>
      <div class="pkg-badges">
        <span class="pxl-corner-sm">stream-markdown-parser</span>
        <span class="pxl-corner-sm">markdown-it-ts</span>
      </div>
    </div>

    <div class="roads">
      <div
        v-click
        class="road pxl-corner-md pxl-shadow danger"
      >
        <span class="road-tag danger">传统全量链路</span>
        <div class="road-nodes">
          <b>Markdown</b><i>→</i><b>AST</b><i>→</i><b>HTML AST</b><i>→</i><b>Framework tree</b><i>→</i><b>DOM</b>
        </div>
        <small>每来一小段，都重新穿过这整条链路。</small>
      </div>

      <div
        v-click
        class="road pxl-corner-md pxl-shadow success"
      >
        <span class="road-tag success">markstream 增量链路</span>
        <div class="road-nodes compact">
          <b>Markdown</b><i>→</i><b>markdown-it-ts Token</b><i>→</i><b class="hot">可增量更新</b>
        </div>
        <small>直接生成贴近 Vue 更新的数据，少绕几层，才能稳住高频更新。</small>
      </div>
    </div>

    <div class="solution-body">
      <div v-click class="why-card pxl-corner-lg pxl-shadow">
        <span class="block-tag">为什么这么快</span>
        <div class="why-list">
          <div v-for="(item, index) in why" :key="item[0]" class="why-item">
            <b>{{ String(index + 1).padStart(2, "0") }}</b>
            <div>
              <strong>{{ item[0] }}</strong>
              <span>{{ item[1] }}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="data-col">
        <span v-click class="block-tag right">真实数据支撑</span>
        <div
          v-for="card in data"
          :key="card[0]"
          v-click
          class="pixel-stat pxl-corner-md pxl-shadow"
        >
          <span>{{ card[0] }}</span>
          <b>{{ card[1] }}</b>
          <small>{{ card[2] }}</small>
        </div>
      </div>
    </div>

    <small class="source-note">markdown-it-ts README · synthetic paragraph/append harness，真实项目请用自己的语料复现。</small>
  </div>
</template>

<style scoped>
.solution-deck {
  display: flex;
  flex-direction: column;
  gap: 9px;
  padding: 0;
}

.solution-deck h1 {
  font-size: 30px;
  line-height: 1.2;
}

.pkg-badges {
  display: flex;
  gap: 8px;
  margin-top: 6px;
}

.pkg-badges span {
  padding: 4px 10px;
  border: 2px solid var(--retro-cyan);
  background: rgba(78, 205, 196, 0.08);
  color: var(--retro-cyan);
  font-family: var(--font-code);
  font-size: 11px;
  font-weight: 700;
}

.roads {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;
}

.road {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 9px 13px;
  border: 2px solid var(--retro-border-strong);
  background: var(--retro-card);
}

.road.danger { border-color: var(--retro-red); }
.road.success { border-color: var(--retro-green); }

.road-tag {
  align-self: flex-start;
  padding: 3px 8px;
  border: 2px solid var(--retro-border);
  font-family: var(--font-pixel-local);
  font-size: 8px;
  font-weight: 800;
  text-transform: uppercase;
}

.road-tag.danger { color: var(--retro-red); border-color: var(--retro-red); }
.road-tag.success { color: var(--retro-green); border-color: var(--retro-green); }

.road-nodes {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 5px;
}

.road-nodes b {
  padding: 4px 7px;
  border: 2px solid var(--retro-border-strong);
  background: var(--retro-surface);
  color: var(--retro-text);
  font-family: var(--font-pixel-local);
  font-size: 9px;
  font-weight: 700;
}

.road-nodes b.hot {
  border-color: var(--retro-green);
  color: var(--retro-green);
}

.road-nodes i {
  color: var(--retro-muted);
  font-style: normal;
  font-size: 11px;
}

.road small {
  color: var(--retro-muted);
  font-size: 11px;
  line-height: 1.35;
}

.solution-body {
  display: grid;
  grid-template-columns: minmax(0, 1.18fr) minmax(0, 0.82fr);
  gap: 14px;
  align-items: stretch;
}

.why-card {
  padding: 11px 15px;
  border: 2px solid var(--retro-border-strong);
  background: var(--retro-card);
}

.block-tag {
  display: inline-block;
  margin-bottom: 8px;
  padding: 3px 9px;
  border: 2px solid var(--retro-cyan);
  color: var(--retro-cyan);
  font-family: var(--font-pixel-local);
  font-size: 8px;
  font-weight: 800;
  text-transform: uppercase;
}

.block-tag.right { border-color: var(--retro-gold); color: var(--retro-gold); margin-bottom: 0; }

.why-list {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 9px 14px;
}

.why-item {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr);
  gap: 9px;
  align-items: start;
}

.why-item > b {
  display: grid;
  place-items: center;
  width: 24px;
  height: 24px;
  border: 2px solid var(--retro-cyan);
  background: var(--retro-surface);
  color: var(--retro-cyan);
  font-family: var(--font-pixel-local);
  font-size: 9px;
  font-weight: 800;
}

.why-item strong {
  display: block;
  color: var(--retro-text);
  font-size: 12.5px;
  font-weight: 800;
}

.why-item span {
  display: block;
  color: var(--retro-muted);
  font-size: 10.5px;
  line-height: 1.35;
}

.data-col {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.data-col :deep(.pixel-stat) {
  padding: 8px 13px;
  gap: 1px;
}

.data-col :deep(.pixel-stat b) {
  font-size: 19px;
  line-height: 1.1;
}

.data-col :deep(.pixel-stat span) {
  font-size: 9px;
}

.data-col :deep(.pixel-stat small) {
  font-size: 9px;
}
</style>
