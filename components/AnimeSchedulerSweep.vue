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
const packets = Array.from({ length: 9 }, (_, index) => index);
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

  const targets = root.value?.querySelectorAll(".anime-scheduler-packet");
  if (!targets?.length || window.matchMedia("(prefers-reduced-motion: reduce)").matches)
    return;

  animation = animate(targets, {
    opacity: [0, 0.72, 0],
    translateX: ["-28px", "620px"],
    delay: stagger(170),
    duration: 1900,
    loop: true,
    ease: "inOutQuad",
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
  <div ref="root" class="anime-scheduler-sweep" aria-hidden="true">
    <i
      v-for="packet in packets"
      :key="packet"
      class="anime-scheduler-packet"
      :style="{ top: `${18 + (packet % 3) * 24}%` }"
    />
  </div>
</template>
