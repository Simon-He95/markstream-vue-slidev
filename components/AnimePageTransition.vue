<script setup>
import { useNav } from "@slidev/client";
import { createTimeline, stagger } from "animejs";
import { nextTick, onBeforeUnmount, onMounted, ref, watch } from "vue";

const nav = useNav();
const root = ref();
const active = ref(false);
const mode = ref("strips");
const pageLabel = ref("01");
const cells = Array.from({ length: 24 }, (_, index) => index);
const dots = Array.from({ length: 60 }, (_, index) => index);
const lines = Array.from({ length: 9 }, (_, index) => index);
const rings = Array.from({ length: 3 }, (_, index) => index);
const tiles = Array.from({ length: 48 }, (_, index) => index);
const modes = ["strips", "lattice", "scan", "tiles"];

let timeline;
let hideTimer;
let reduceMotion = false;

function clearTransition() {
  timeline?.revert();
  timeline = undefined;
  clearTimeout(hideTimer);
  active.value = false;
  if (root.value)
    root.value.dataset.active = "false";
}

async function playTransition(page, previousPage) {
  if (!previousPage || !root.value || reduceMotion)
    return;

  await nextTick();
  clearTransition();

  const direction = page > previousPage ? 1 : -1;
  mode.value = modes[(page - 1) % modes.length];
  root.value.dataset.mode = mode.value;
  const strips = root.value.querySelectorAll(".anime-transition-cell");
  const dotEls = root.value.querySelectorAll(".anime-transition-dot");
  const lineEls = root.value.querySelectorAll(".anime-transition-line");
  const ringEls = root.value.querySelectorAll(".anime-transition-ring");
  const tileEls = root.value.querySelectorAll(".anime-transition-tile");
  const beam = root.value.querySelector(".anime-transition-beam");
  const ghost = root.value.querySelector(".anime-transition-index");

  pageLabel.value = String(page).padStart(2, "0");
  root.value.style.setProperty("--transition-origin", direction > 0 ? "left" : "right");
  root.value.style.setProperty("--transition-skew", direction > 0 ? "-9deg" : "9deg");
  active.value = true;
  root.value.dataset.active = "true";

  timeline = createTimeline({
    defaults: { ease: "inOutQuart" },
    onComplete: () => {
      hideTimer = setTimeout(() => {
        active.value = false;
        if (root.value)
          root.value.dataset.active = "false";
      }, 40);
    },
  });

  if (mode.value === "strips") {
    timeline.add(strips, {
      opacity: [0, 0.92, 0],
      scaleX: [0, 1, 0],
      duration: 740,
      delay: stagger(16, { from: direction > 0 ? "first" : "last" }),
    }, 0);
  }

  if (mode.value === "lattice") {
    timeline
      .add(dotEls, {
        opacity: [0, 0.9, 0],
        scale: [0.4, 1.45, 0.5],
        translateY: [10, 0, -8],
        duration: 720,
        delay: stagger(13, { grid: [10, 6], from: "center" }),
      }, 0)
      .add(ringEls, {
        opacity: [0, 0.62, 0],
        scale: [0.38, 1.15, 1.8],
        rotate: [0, direction * 24],
        duration: 780,
        delay: stagger(90),
      }, 0);
  }

  if (mode.value === "scan") {
    timeline.add(lineEls, {
      opacity: [0, 0.72, 0],
      scaleX: [0, 1, 0],
      duration: 820,
      delay: stagger(44, { from: direction > 0 ? "first" : "last" }),
    }, 0);
  }

  if (mode.value === "tiles") {
    timeline.add(tileEls, {
      opacity: [0, 0.86, 0],
      scale: [0.16, 1, 0.62],
      rotate: [direction * 8, 0, direction * -4],
      duration: 780,
      delay: stagger(16, { grid: [8, 6], from: direction > 0 ? "first" : "last" }),
    }, 0);
  }

  timeline
    .add(beam, {
      opacity: [0, 1, 0],
      translateX: mode.value === "scan" ? ["0vw", "0vw"] : direction > 0 ? ["-120vw", "118vw"] : ["118vw", "-120vw"],
      translateY: mode.value === "scan" ? ["-120vh", "120vh"] : ["0vh", "0vh"],
      duration: 820,
    }, 20)
    .add(ghost, {
      opacity: [0, 0.55, 0],
      scale: [0.92, 1.04, 0.98],
      translateY: [18, 0, -10],
      duration: 680,
    }, 70);
}

onMounted(() => {
  reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
});

watch(
  () => nav.currentSlideNo.value,
  playTransition,
  { flush: "post" },
);

onBeforeUnmount(clearTransition);
</script>

<template>
  <div
    ref="root"
    class="anime-page-transition"
    :data-active="active"
    :data-mode="mode"
    aria-hidden="true"
  >
    <div class="anime-transition-grid">
      <i
        v-for="cell in cells"
        :key="cell"
        class="anime-transition-cell"
      />
    </div>
    <div class="anime-transition-dot-grid">
      <i
        v-for="dot in dots"
        :key="dot"
        class="anime-transition-dot"
      />
    </div>
    <div class="anime-transition-rings">
      <i
        v-for="ring in rings"
        :key="ring"
        class="anime-transition-ring"
      />
    </div>
    <div class="anime-transition-scanlines">
      <i
        v-for="line in lines"
        :key="line"
        class="anime-transition-line"
      />
    </div>
    <div class="anime-transition-tiles">
      <i
        v-for="tile in tiles"
        :key="tile"
        class="anime-transition-tile"
      />
    </div>
    <span class="anime-transition-beam" />
    <span class="anime-transition-index">{{ pageLabel }}</span>
  </div>
</template>
