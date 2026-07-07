<script setup>
import { useNav } from "@slidev/client";
import { animate, stagger } from "animejs";
import { onBeforeUnmount, onMounted, ref, watch } from "vue";

const props = defineProps({
  slideNo: {
    type: Number,
    required: true,
  },
});

const nav = useNav();
const root = ref();
const dots = Array.from({ length: 48 }, (_, index) => index);
let animation;

function stopAnimation() {
  animation?.revert();
  animation = undefined;
}

function isRootVisible() {
  if (root.value?.closest(".slidev-vclick-hidden"))
    return false;
  const rect = root.value?.getBoundingClientRect();
  return !!rect && rect.width > 1 && rect.height > 1;
}

function startAnimation() {
  if (animation)
    return;

  const targets = root.value?.querySelectorAll(".anime-dot");
  if (!targets?.length || window.matchMedia("(prefers-reduced-motion: reduce)").matches)
    return;

  animation = animate(targets, {
    opacity: [0.08, 0.92, 0.08],
    scale: [0.6, 1.15, 0.6],
    translateX: [0, 4, 0],
    delay: stagger(40, { grid: [12, 4], from: "first" }),
    duration: 2400,
    loop: true,
    alternate: true,
    ease: "inOutSine",
  });

  requestAnimationFrame(() => {
    if (!isRootVisible())
      stopAnimation();
  });
}

function syncAnimation() {
  if (nav.currentSlideNo.value === props.slideNo && isRootVisible()) startAnimation();
  else stopAnimation();
}

watch(
  () => [nav.currentSlideNo.value, nav.clicks.value],
  syncAnimation,
  { immediate: true, flush: "post" },
);

onMounted(syncAnimation);

onBeforeUnmount(stopAnimation);
</script>

<template>
  <div ref="root" class="anime-dot-field" aria-hidden="true">
    <i v-for="dot in dots" :key="dot" class="anime-dot" />
  </div>
</template>

<style scoped>
.anime-dot-field {
  position: absolute;
  inset: 0;
  z-index: 0;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: repeat(4, 1fr);
  gap: 12px;
  padding: 48px 72px;
  pointer-events: none;
  opacity: 0.35;
}

.anime-dot {
  width: 3px;
  height: 3px;
  border-radius: 999px;
  background: radial-gradient(circle at 30% 30%, rgba(97, 242, 205, 0.95), rgba(78, 205, 196, 0.6));
  box-shadow: 0 0 10px rgba(97, 242, 205, 0.25);
  place-self: center;
  will-change: transform, opacity;
}
</style>
