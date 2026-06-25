<script setup>

const chain = [
  ["AI 高频吐字", "每秒几十上百 token 持续流入"],
  ["整段重解析重渲染", "传统做法：每来一段就重跑全量 parse → render"],
  ["DOM 数量爆炸", "长回答轻松上千节点，整页反复重建"],
  ["主线程被占满", "CPU 跟不上这个频率，掉帧、卡顿"],
];

const pressures = [
  ["DOM 爆炸增长", "一条长回答上千节点，整页 remount，内存与回流双双飙升。", "red"],
  ["CPU 跟不上", "解析、高亮、布局每帧重做，主线程被这一件事占满。", "gold"],
  ["自定义形态变多", "thinking / tool-result / 表格 / 图表 / 数学公式，类型越来越杂。", "cyan"],
  ["交互被抢走", "选区丢失、滚动跳动、输入卡顿——用户的其它操作全被拖累。", "purple"],
];
</script>

<template>
  <div class="deck dark pressure-deck">
    <div class="slide-head compact-head">
      <span class="pixel-kicker danger pxl-corner-sm">PROBLEM · 压力传导</span>
      <h1>更快、更长、更多形态的输出，最后都砸在浏览器的渲染层上。</h1>
    </div>

    <div class="pressure-stage">
      <div
        v-click
        class="cause-chain pxl-corner-lg pxl-shadow"
      >
        <div class="pixel-titlebar"><span></span><span></span><span></span><b>压力是怎么传导的</b></div>
        <div class="chain-steps">
          <div v-for="(step, index) in chain" :key="step[0]" class="chain-step">
            <b>{{ String(index + 1).padStart(2, "0") }}</b>
            <div>
              <strong>{{ step[0] }}</strong>
              <span>{{ step[1] }}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="pressure-grid">
        <div
          v-for="(item, index) in pressures"
          :key="item[0]"
          v-click
          class="pressure-card pxl-corner-md"
          :class="`accent-${item[2]}`"
        >
          <b>{{ item[0] }}</b>
          <span>{{ item[1] }}</span>
        </div>
      </div>
    </div>

    <div v-click class="conclusion pxl-corner-md pxl-shadow">
      <span>结论</span>
      <b>性能扛不住 + 形态越来越多 ⇒ 需要一个为流式 AI 输出而生的渲染器：markstream-vue</b>
    </div>
  </div>
</template>

<style scoped>
.pressure-deck {
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding: 0;
}

.pressure-stage {
  display: grid;
  grid-template-columns: minmax(0, 0.92fr) minmax(0, 1.08fr);
  gap: 16px;
}

.cause-chain {
  display: flex;
  flex-direction: column;
  border: 2px solid var(--retro-red);
  background: var(--retro-card);
  overflow: hidden;
}

.chain-steps {
  display: flex;
  flex-direction: column;
  padding: 12px;
  gap: 10px;
}

.chain-step {
  position: relative;
  display: grid;
  grid-template-columns: auto minmax(0, 1fr);
  align-items: center;
  gap: 12px;
}

.chain-step:not(:last-child)::after {
  content: "";
  position: absolute;
  left: 13px;
  top: 30px;
  width: 2px;
  height: 12px;
  background: var(--retro-border-strong);
}

.chain-step > b {
  display: grid;
  place-items: center;
  width: 28px;
  height: 28px;
  border: 2px solid var(--retro-red);
  background: var(--retro-surface);
  color: var(--retro-red);
  font-family: var(--font-pixel-local);
  font-size: 10px;
  font-weight: 800;
}

.chain-step strong {
  display: block;
  color: var(--retro-text);
  font-size: 14px;
  font-weight: 800;
}

.chain-step span {
  display: block;
  color: var(--retro-muted);
  font-size: 11px;
  line-height: 1.3;
}

.pressure-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
}

.pressure-card {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 13px 14px;
  border: 2px solid var(--retro-border-strong);
  background: var(--retro-surface);
}

.pressure-card.accent-red { border-left: 5px solid var(--retro-red); }
.pressure-card.accent-gold { border-left: 5px solid var(--retro-gold); }
.pressure-card.accent-cyan { border-left: 5px solid var(--retro-cyan); }
.pressure-card.accent-purple { border-left: 5px solid var(--retro-purple); }

.pressure-card b {
  color: var(--retro-text);
  font-size: 14px;
  font-weight: 800;
}

.pressure-card span {
  color: var(--retro-muted);
  font-size: 11px;
  line-height: 1.4;
}

.conclusion {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 12px 16px;
  border: 2px solid var(--retro-green);
  background: rgba(0, 255, 136, 0.08);
}

.conclusion span {
  flex: none;
  padding: 4px 9px;
  border: 2px solid var(--retro-green);
  background: var(--retro-surface);
  color: var(--retro-green);
  font-family: var(--font-pixel-local);
  font-size: 9px;
  font-weight: 800;
  text-transform: uppercase;
}

.conclusion b {
  color: var(--retro-text);
  font-size: 14px;
  font-weight: 800;
  line-height: 1.35;
}
</style>
