<script setup>

// median scriptDurationMs from public/streaming-performance-evidence.json
// (3-run median · Playwright + Chrome CDP · 119 chunks × 18 chars)
const SCALE = 310;
const scenarios = [
  { label: "表格 Tables", sd: 302.2, ms: 17.1 },
  { label: "列表 Lists", sd: 296.6, ms: 21.5 },
  { label: "纯文本 + 标题", sd: 291.5, ms: 22.3 },
  { label: "Diff 代码块", sd: 280.4, ms: 11.7 },
  { label: "Mermaid 源码", sd: 268.0, ms: 16.8 },
  { label: "TypeScript 代码", sd: 236.6, ms: 14.3 },
];

function pct(v) {
  return `${Math.max((v / SCALE) * 100, 2)}%`;
}
function times(s) {
  return `${(s.sd / s.ms).toFixed(1)}×`;
}

const headline = [
  ["脚本执行时间", "13–24×", "主线程 JS 时间整体降一个量级"],
  ["DOM 节点 / 变更", "最高 8×", "节点复用，少建、少改、少回流"],
  ["更新 p95", "≤ 2ms", "每帧稳定，不和用户抢主线程"],
];
</script>

<template>
  <div class="deck dark perfdata-deck">
    <div class="slide-head compact-head">
      <span class="pixel-kicker success pxl-corner-sm">PERFORMANCE · 真实测量</span>
      <h1>同一份流式输入（119 chunks）：脚本时间小一个量级。</h1>
    </div>

    <div class="headline-row">
      <div
        v-for="(stat, index) in headline"
        :key="stat[0]"
        v-click
        class="headline-stat pxl-corner-md pxl-shadow"
      >
        <span>{{ stat[0] }}</span>
        <b>↓ {{ stat[1] }}</b>
        <small>{{ stat[2] }}</small>
      </div>
    </div>

    <div v-click class="chart pxl-corner-lg pxl-shadow">
      <div class="chart-legend">
        <span class="lg sd"><i></i>streamdown 2.5.0</span>
        <span class="lg ms"><i></i>markstream-vue 1.0</span>
        <b>脚本执行时间 scriptDuration (ms) · 越短越好</b>
      </div>
      <div class="bars">
        <div v-for="s in scenarios" :key="s.label" class="bar-row">
          <span class="bar-label">{{ s.label }}</span>
          <div class="bar-track">
            <div class="bar-line">
              <div class="bar sd" :style="{ width: pct(s.sd) }"></div>
              <em>{{ s.sd.toFixed(0) }}ms</em>
            </div>
            <div class="bar-line">
              <div class="bar ms" :style="{ width: pct(s.ms) }"></div>
              <em class="hot">{{ s.ms.toFixed(0) }}ms</em>
            </div>
          </div>
          <b class="bar-times">{{ times(s) }}</b>
        </div>
      </div>
    </div>

    <small class="source-note">
      streaming-performance-evidence.json · 3-run median · Playwright + Chrome CDP · 119 chunks × 18 chars · synthetic harness。
    </small>
  </div>
</template>

<style scoped>
.perfdata-deck {
  display: flex;
  flex-direction: column;
  gap: 11px;
  padding: 0;
}

.perfdata-deck h1 {
  font-size: 30px;
  line-height: 1.2;
}

.headline-row {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;
}

.headline-stat {
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 9px 15px;
  border: 2px solid var(--retro-green);
  background: var(--retro-card);
}

.headline-stat span {
  color: var(--retro-muted);
  font-family: var(--font-pixel-local);
  font-size: 9px;
  font-weight: 700;
  text-transform: uppercase;
}

.headline-stat b {
  color: var(--retro-green);
  font-size: 26px;
  font-weight: 900;
  line-height: 1.05;
}

.headline-stat small {
  color: var(--retro-muted);
  font-size: 10.5px;
}

.chart {
  display: flex;
  flex-direction: column;
  gap: 11px;
  padding: 14px 16px;
  border: 2px solid var(--retro-border-strong);
  background: var(--retro-card);
}

.chart-legend {
  display: flex;
  align-items: center;
  gap: 16px;
}

.chart-legend .lg {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: var(--retro-muted);
  font-family: var(--font-pixel-local);
  font-size: 9px;
  font-weight: 700;
  text-transform: uppercase;
}

.chart-legend .lg i {
  width: 11px;
  height: 11px;
  border: 2px solid var(--retro-border-strong);
}

.chart-legend .lg.sd i { background: var(--retro-red); }
.chart-legend .lg.ms i { background: var(--retro-green); }

.chart-legend b {
  margin-left: auto;
  color: var(--retro-text);
  font-size: 11px;
  font-weight: 700;
}

.bars {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.bar-row {
  display: grid;
  grid-template-columns: 96px minmax(0, 1fr) 42px;
  align-items: center;
  gap: 12px;
}

.bar-label {
  color: var(--retro-text);
  font-size: 11px;
  font-weight: 700;
  text-align: right;
}

.bar-track {
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.bar-line {
  display: flex;
  align-items: center;
  gap: 6px;
}

.bar {
  height: 13px;
  min-width: 2px;
  border: 2px solid var(--retro-border-strong);
  transition: width 0.5s ease;
}

.bar.sd {
  background: rgba(255, 107, 107, 0.32);
  border-color: var(--retro-red);
}

.bar.ms {
  background: rgba(0, 255, 136, 0.4);
  border-color: var(--retro-green);
}

.bar-line em {
  color: var(--retro-muted);
  font-family: var(--font-pixel-local);
  font-size: 8px;
  font-style: normal;
  font-weight: 700;
  white-space: nowrap;
}

.bar-line em.hot {
  color: var(--retro-green);
}

.bar-times {
  color: var(--retro-green);
  font-family: var(--font-pixel-local);
  font-size: 12px;
  font-weight: 800;
  text-align: left;
}
</style>
