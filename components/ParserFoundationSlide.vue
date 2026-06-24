<script setup>
const speedCards = [
  ["vs markdown-it render", "9.7× / 10.8× / 12.8×", "5k / 20k / 100k chars"],
  ["vs remark append", "147.7× / 156.2× / 204.5×", "5k / 20k / 100k chars"],
  ["vs micromark append", "120.6× / 123.1× / 127.8×", "5k / 20k / 100k chars"],
];
</script>

<template>
  <div class="deck dark">
    <div class="slide-head">
      <span class="pixel-kicker pxl-corner-sm">PARSER FOUNDATION</span>
      <h1>markdown-it-ts@1.0.2 把大文本和增量输入当成性能目标。</h1>
    </div>

    <div class="parser-roads">
      <div v-click class="pixel-card parser-road pxl-corner-lg pxl-shadow">
        <span class="pixel-kicker danger small pxl-corner-sm">常见渲染链路</span>
        <div class="road-nodes">
          <b>Markdown</b><b>AST</b><b>HTML AST</b><b>Framework tree</b><b>DOM</b>
        </div>
        <p>每来一小段，都可能重新穿过多层中间结构。</p>
      </div>
      <div v-click class="pixel-card parser-road pxl-corner-lg pxl-shadow">
        <span class="pixel-kicker success small pxl-corner-sm">markstream-vue</span>
        <div class="road-nodes compact">
          <b>Markdown</b><b>markdown-it-ts Token</b><b>可增量更新</b>
        </div>
        <p>直接生成更适合 Vue 更新的数据，少绕几层，后面才能稳住频繁更新。</p>
      </div>
    </div>

    <div class="speed-grid">
      <div v-click v-for="card in speedCards" :key="card[0]" class="pixel-stat pxl-corner-md pxl-shadow">
        <span>{{ card[0] }}</span>
        <b>{{ card[1] }}</b>
        <small>{{ card[2] }}</small>
      </div>
    </div>

    <small class="method-note source-note">markdown-it-ts@1.0.2 README · synthetic harness，真实项目请用自己的语料复现。</small>
  </div>
</template>
