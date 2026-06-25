<script setup>

// Three trajectories that all push work onto the rendering layer.
const axes = [
  {
    key: "ctx",
    tag: "上下文 Context",
    from: "4K",
    to: "1M+",
    mult: "~250×",
    note: "2022 GPT-3.5 → 2026 几乎人手一个 1M",
    fill: 96,
    accent: "cyan",
  },
  {
    key: "speed",
    tag: "吐字速度 tok/s",
    from: "~30",
    to: "3000",
    mult: "~100×",
    note: "2023 前沿 ~30 → 专用推理 3000 tok/s",
    fill: 82,
    accent: "green",
  },
  {
    key: "human",
    tag: "人眼阅读 tok/s",
    from: "~5",
    to: "~5",
    mult: "0×",
    note: "三年没动——这就是新的瓶颈所在",
    fill: 8,
    accent: "red",
  },
];

const models = [
  ["Kimi K2 Turbo", "号称 60–100", "256K ctx"],
  ["GLM-5.2", "~280 tok/s", "1M ctx"],
  ["Claude Opus 4.8", "1M ctx · GA", "128K out"],
  ["Gemini 3.x Flash", "~278 tok/s", "1M ctx"],
  ["Cerebras", "3000 tok/s", "号称世界纪录"],
  ["Groq · Kimi K2", ">400 tok/s", "40× 自家 API"],
];
</script>

<template>
  <div class="deck dark trend-deck">
    <div class="slide-head compact-head">
      <span class="pixel-kicker pxl-corner-sm">BACKGROUND · 为什么是现在</span>
      <h1>模型在三个维度上一起变强：吐字更快、上下文更长、单次输出更大。</h1>
    </div>

    <div class="trend-axes">
      <div
        v-for="(axis, index) in axes"
        :key="axis.key"
        v-click
        class="axis-card pxl-corner-lg pxl-shadow"
        :class="`accent-${axis.accent}`"
      >
        <span class="axis-tag">{{ axis.tag }}</span>
        <div class="axis-jump">
          <b>{{ axis.from }}</b>
          <i>→</i>
          <strong>{{ axis.to }}</strong>
        </div>
        <div class="axis-bar"><span :style="{ '--w': `${axis.fill}%` }"></span></div>
        <div class="axis-mult">{{ axis.mult }}</div>
        <small>{{ axis.note }}</small>
      </div>
    </div>

    <div v-click class="trend-models">
      <span class="models-label pxl-corner-sm">2026 实测 / 号称</span>
      <div class="models-grid">
        <div
          v-for="(model, index) in models"
          :key="model[0]"
          class="model-chip pxl-corner-sm"
        >
          <b>{{ model[0] }}</b>
          <em>{{ model[1] }}</em>
          <small>{{ model[2] }}</small>
        </div>
      </div>
    </div>

    <p v-click class="takeaway">
      人眼阅读三年没变，模型却快了两个数量级——多出来的速度、长度和形态，全压到了渲染层。
    </p>
  </div>
</template>

<style scoped>
.trend-deck {
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding: 0;
}

.trend-axes {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;
}

.axis-card {
  display: flex;
  flex-direction: column;
  gap: 7px;
  padding: 14px 16px;
  border: 2px solid var(--retro-border-strong);
  background: var(--retro-card);
}

.axis-card.accent-cyan { border-color: var(--retro-cyan); }
.axis-card.accent-green { border-color: var(--retro-green); }
.axis-card.accent-red { border-color: var(--retro-red); }

.axis-tag {
  color: var(--retro-muted);
  font-family: var(--font-pixel-local);
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.axis-jump {
  display: flex;
  align-items: baseline;
  gap: 8px;
}

.axis-jump b {
  color: var(--retro-muted);
  font-size: 18px;
  font-weight: 800;
}

.axis-jump i {
  color: var(--retro-muted);
  font-size: 16px;
  font-style: normal;
}

.axis-jump strong {
  font-size: 34px;
  font-weight: 900;
  line-height: 1;
}

.accent-cyan .axis-jump strong { color: var(--retro-cyan); }
.accent-green .axis-jump strong { color: var(--retro-green); }
.accent-red .axis-jump strong { color: var(--retro-red); }

.axis-bar {
  height: 10px;
  border: 2px solid var(--retro-border);
  background: var(--retro-surface);
}

.axis-bar span {
  display: block;
  width: var(--w);
  height: 100%;
}

.accent-cyan .axis-bar span { background: var(--retro-cyan); }
.accent-green .axis-bar span { background: var(--retro-green); }
.accent-red .axis-bar span { background: var(--retro-red); }

.axis-mult {
  font-family: var(--font-pixel-local);
  font-size: 13px;
  font-weight: 800;
  color: var(--retro-text);
}

.axis-card small {
  color: var(--retro-muted);
  font-size: 11px;
  line-height: 1.35;
}

.trend-models {
  display: flex;
  flex-direction: column;
  gap: 9px;
}

.models-label {
  align-self: flex-start;
  padding: 4px 9px;
  border: 2px solid var(--retro-border);
  background: var(--retro-surface);
  color: var(--retro-gold);
  font-family: var(--font-pixel-local);
  font-size: 8px;
  font-weight: 700;
  text-transform: uppercase;
}

.models-grid {
  display: grid;
  grid-template-columns: repeat(6, minmax(0, 1fr));
  gap: 8px;
}

.model-chip {
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 8px 9px;
  border: 2px solid var(--retro-border-strong);
  background: var(--retro-surface);
}

.model-chip b {
  color: var(--retro-text);
  font-size: 11px;
  font-weight: 800;
  line-height: 1.2;
}

.model-chip em {
  color: var(--retro-green);
  font-family: var(--font-pixel-local);
  font-size: 10px;
  font-style: normal;
  font-weight: 700;
}

.model-chip small {
  color: var(--retro-muted);
  font-size: 9px;
}

@media (max-width: 860px) {
  .models-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); }
}
</style>
