<script setup>
const repos = [
  ["AstrBot", "33.5k ★"],
  ["mcp-chrome", "11.8k ★"],
  ["HuLa", "7.4k ★"],
  ["DeepChat", "5.9k ★"],
];
</script>

<template>
  <div class="deck dark">
    <div class="slide-head">
      <span class="pixel-kicker gold pxl-corner-sm">PUBLIC ADOPTION SIGNALS</span>
      <h1>公开依赖只能说明有人在试用，不能等同于生产流量。</h1>
    </div>

    <div class="adoption-radar">
      <div class="radar-rings" aria-hidden="true"><i></i><i></i><i></i></div>
      <div v-click class="adoption-main pxl-corner-lg pxl-shadow">
        <img src="/social-icons/github.svg" alt="GitHub">
        <b>92+</b>
        <span>外部仓库</span>
        <small>109 个 package.json 命中</small>
      </div>

      <div class="repo-grid radar-repos">
        <div v-click v-for="(repo, index) in repos" :key="repo[0]" class="repo-card pxl-corner-md pxl-shadow" :class="`repo-${index + 1}`">
          <b>{{ repo[0] }}</b>
          <span>{{ repo[1] }}</span>
        </div>
      </div>
    </div>

    <div v-click class="signal-footnote pxl-corner-sm">
      GitHub code search · "markstream-vue" filename:package.json · exclude Simon-He95/* · as of 2026-05-31
    </div>
  </div>
</template>
