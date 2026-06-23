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
const dots = Array.from({ length: 72 }, (_, index) => index);
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
    opacity: [0.14, 0.95, 0.18],
    scale: [0.72, 1.35, 0.72],
    delay: stagger(24, { grid: [12, 6], from: "center" }),
    duration: 1800,
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
