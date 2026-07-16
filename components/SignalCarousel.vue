<script setup>
import { computed, ref } from "vue";
import { useNav } from "@slidev/client";

const props = defineProps({
  clickControlled: {
    type: Boolean,
    default: false,
  },
});

const items = [
  {
    label: "版本信号",
    title: "最新发布",
    value: "1.0.7-beta.0",
    body: "npm latest：markstream-vue 1.0.7-beta.0；stream-markdown-parser 1.1.1。",
    chips: ["Vue 3", "Nuxt", "VitePress", "1.x"],
  },
  {
    label: "输出接口",
    title: "AI 输出层",
    value: "Vue 3",
    body: "content / nodes、final、自定义标签，都能走同一套渲染入口。",
    chips: ["Chat", "Agent", "Docs", "Review"],
  },
  {
    label: "运行环境",
    title: "落地形态",
    value: "SSR",
    body: "Nuxt、VitePress、Safe HTML、CSS exports 和 worker client 都在 1.x 稳定面里。",
    chips: ["Nuxt", "VitePress", "Safe HTML", "CSS"],
  },
  {
    label: "组件化",
    title: "可组合输出",
    value: "Tags",
    body: "thinking / tool-result / answer-box 可以映射 Vue 组件，复杂输出不必退回纯文本。",
    chips: ["Thinking", "Tool", "Answer", "Components"],
  },
];

const index = ref(0);
const nav = useNav();
const activeIndex = computed(() => props.clickControlled
  ? Math.min(Math.max(nav.clicks.value, 0), items.length - 1)
  : index.value);
const active = computed(() => items[activeIndex.value]);

function go(offset) {
  const next = (activeIndex.value + offset + items.length) % items.length;
  if (props.clickControlled)
    nav.go(nav.currentSlideNo.value, next);
  else
    index.value = next;
}

function goTo(itemIndex) {
  if (props.clickControlled)
    nav.go(nav.currentSlideNo.value, itemIndex);
  else
    index.value = itemIndex;
}
</script>

<template>
  <div class="signal-carousel pxl-corner-lg pxl-shadow">
    <div class="signal-map" aria-hidden="true">
      <i></i><i></i><i></i>
    </div>
    <div
      :key="active.title"
      class="signal-frame"
    >
      <div>
        <span class="pixel-kicker small pxl-corner-sm">{{ active.label }}</span>
        <h2>{{ active.title }}</h2>
        <p>{{ active.body }}</p>
        <div class="chip-row">
          <span v-for="chip in active.chips" :key="chip">{{ chip }}</span>
        </div>
      </div>

      <div class="pixel-stat pxl-corner-md pxl-shadow">
        <span>重点</span>
        <b>{{ active.value }}</b>
        <small>当前重点</small>
      </div>
    </div>

    <div class="signal-controls">
      <button class="pixel-button compact btn-retro pxl-corner-sm" type="button" aria-label="Previous" @click="go(-1)">
        ‹
      </button>
      <button
        v-for="(_, itemIndex) in items"
        :key="itemIndex"
        class="pixel-button compact btn-retro pxl-corner-sm"
        :class="{ active: itemIndex === activeIndex }"
        type="button"
        :aria-label="`Go to slide ${itemIndex + 1}`"
        @click="goTo(itemIndex)"
      >
        {{ itemIndex + 1 }}
      </button>
      <button class="pixel-button compact btn-retro pxl-corner-sm" type="button" aria-label="Next" @click="go(1)">
        ›
      </button>
    </div>
  </div>
</template>
