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
const path = ref();
const nodes = [
  { x: 70, y: 86 },
  { x: 285, y: 86 },
  { x: 500, y: 86 },
  { x: 715, y: 86 },
  { x: 930, y: 86 },
];

let lineAnimation;
let nodeAnimation;

function stopAnimation() {
  lineAnimation?.revert();
  nodeAnimation?.revert();
  lineAnimation = undefined;
  nodeAnimation = undefined;
}

function isRootVisible() {
  if (root.value?.closest(".slidev-vclick-hidden"))
    return false;
  const rect = root.value?.getBoundingClientRect();
  return !!rect && rect.width > 1 && rect.height > 1;
}

function startAnimation() {
  if (lineAnimation || nodeAnimation)
    return;

  if (!root.value || !path.value || window.matchMedia("(prefers-reduced-motion: reduce)").matches)
    return;

  const length = path.value.getTotalLength();
  path.value.style.strokeDasharray = length;
  path.value.style.strokeDashoffset = length;

  lineAnimation = animate(path.value, {
    strokeDashoffset: [length, 0],
    duration: 1550,
    loop: true,
    alternate: true,
    ease: "inOutQuad",
  });

  nodeAnimation = animate(root.value.querySelectorAll(".anime-circuit-pulse"), {
    opacity: [0.18, 1, 0.18],
    scale: [0.72, 1.18, 0.72],
    delay: stagger(150),
    duration: 1150,
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
  <svg
    ref="root"
    class="anime-circuit-trace"
    viewBox="0 0 1000 180"
    preserveAspectRatio="none"
    aria-hidden="true"
  >
    <path
      ref="path"
      class="anime-circuit-path"
      d="M70 86 C150 22 210 150 285 86 S420 22 500 86 S635 150 715 86 S850 22 930 86"
    />
    <g v-for="node in nodes" :key="`${node.x}-${node.y}`" :transform="`translate(${node.x} ${node.y})`">
      <circle class="anime-circuit-glow" r="20" />
      <circle class="anime-circuit-pulse" r="8" />
    </g>
  </svg>
</template>
