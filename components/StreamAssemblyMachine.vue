<script setup>
import { useNav } from "@slidev/client";
import { computed } from "vue";

const props = defineProps({
  slideNo: {
    type: Number,
    default: 0,
  },
  compact: {
    type: Boolean,
    default: false,
  },
  mode: {
    type: String,
    default: "normal",
  },
});

const packets = ["<thinking>", "```ts", "final"];
const modules = [
  ["PARSE", "先看懂结构"],
  ["SCHEDULE", "控制更新节奏"],
  ["STABILIZE", "页面不抖动"],
];
const uiBlocks = ["Thinking", "Code", "Tool", "Answer"];
const nav = useNav();
const isActive = computed(() => !props.slideNo || nav.currentSlideNo.value === props.slideNo);
</script>

<template>
  <div
    class="stream-machine"
    :class="{ compact, 'is-active': isActive }"
    :data-mode="props.mode"
    aria-hidden="true"
  >
    <div class="stream-machine-source pxl-corner-md">
      <span>AI STREAM</span>
      <i
        v-for="(packet, index) in packets"
        :key="packet"
        :style="{ '--i': index }"
      >{{ packet }}</i>
    </div>

    <div class="stream-machine-rail">
      <b
        v-for="index in 7"
        :key="index"
        :style="{ '--i': index - 1 }"
      ></b>
    </div>

    <div class="stream-machine-core pxl-corner-lg">
      <div
        v-for="(module, index) in modules"
        :key="module[0]"
        class="stream-machine-module pxl-corner-sm"
        :style="{ '--i': index }"
      >
        <span>{{ module[0] }}</span>
        <small>{{ module[1] }}</small>
      </div>
      <em></em>
    </div>

    <div class="stream-machine-output pxl-corner-lg">
      <div class="stream-machine-titlebar">
        <span></span><span></span><span></span><b>Vue UI</b>
      </div>
      <div class="stream-machine-canvas">
        <section
          v-for="(block, index) in uiBlocks"
          :key="block"
          :style="{ '--i': index }"
          class="pxl-corner-sm"
        >
          <b>{{ block }}</b>
          <i></i>
        </section>
      </div>
      <strong>页面稳定成形</strong>
    </div>
  </div>
</template>

<style scoped>
.stream-machine {
  position: relative;
  display: grid;
  grid-template-columns: 0.8fr 0.42fr 1fr 1.08fr;
  align-items: center;
  gap: 12px;
  min-height: 232px;
  color: var(--retro-text);
}

.stream-machine.compact {
  min-height: 218px;
  grid-template-columns: 0.95fr 34px 1.05fr;
  grid-template-rows: auto auto;
  gap: 7px;
}

.stream-machine.compact .stream-machine-source {
  grid-column: 1;
  grid-row: 1;
}

.stream-machine.compact .stream-machine-core {
  grid-column: 1;
  grid-row: 2;
}

.stream-machine.compact .stream-machine-rail {
  grid-column: 2;
  grid-row: 1 / span 2;
  align-self: stretch;
  height: auto;
  border-top: 0;
  border-bottom: 0;
  border-left: 2px dashed rgba(78, 205, 196, 0.32);
  border-right: 2px dashed rgba(0, 255, 136, 0.2);
}

.stream-machine.compact .stream-machine-output {
  grid-column: 3;
  grid-row: 1 / span 2;
}

.stream-machine-source,
.stream-machine-core,
.stream-machine-output {
  position: relative;
  z-index: 1;
  border: 2px solid var(--retro-border-strong);
  background: rgba(14, 14, 24, 0.9);
  box-shadow: 5px 5px 0 rgba(0, 0, 0, 0.38);
}

.stream-machine-source {
  display: grid;
  gap: 8px;
  padding: 14px;
}

.stream-machine-source span,
.stream-machine-module span,
.stream-machine-output strong,
.stream-machine-titlebar b {
  font-family: var(--font-pixel-local);
  font-size: 8px;
  line-height: 1;
  text-transform: uppercase;
}

.stream-machine-source span {
  color: var(--retro-muted);
}

.stream-machine-source i {
  display: block;
  border: 1px solid rgba(78, 205, 196, 0.38);
  background: rgba(78, 205, 196, 0.08);
  color: var(--retro-cyan);
  padding: 8px 9px;
  font-family: var(--font-code);
  font-size: 13px;
  font-style: normal;
  opacity: 0;
  transform: translateX(-16px);
  animation: stream-packet-in 3.4s calc(var(--i) * 180ms) infinite;
}

.stream-machine-rail {
  position: relative;
  height: 92px;
  border-top: 2px dashed rgba(78, 205, 196, 0.32);
  border-bottom: 2px dashed rgba(0, 255, 136, 0.2);
}

.stream-machine-rail::before,
.stream-machine-rail::after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, transparent, var(--retro-green), transparent);
  opacity: 0.8;
}

.stream-machine-rail::before {
  top: 21px;
  animation: stream-scan 2.4s infinite;
}

.stream-machine-rail::after {
  bottom: 22px;
  animation: stream-scan 2.4s 320ms infinite reverse;
}

.stream-machine-rail b {
  position: absolute;
  top: 38px;
  left: 0;
  width: 8px;
  height: 8px;
  background: var(--retro-green);
  box-shadow: 0 0 16px rgba(0, 255, 136, 0.65);
  transform: translateX(-8px);
  animation: stream-dot-travel 1.7s calc(var(--i) * 120ms) infinite;
}

.stream-machine.compact .stream-machine-rail::before,
.stream-machine.compact .stream-machine-rail::after {
  left: 14px;
  right: auto;
  top: 0;
  bottom: 0;
  width: 2px;
  height: auto;
  background: linear-gradient(180deg, transparent, var(--retro-green), transparent);
  animation: stream-scan-y 2.4s infinite;
}

.stream-machine.compact .stream-machine-rail::after {
  left: 20px;
  animation-delay: 320ms;
  animation-direction: reverse;
}

.stream-machine.compact .stream-machine-rail b {
  top: 0;
  left: 11px;
  transform: translateY(-8px);
  animation-name: stream-dot-travel-y;
}

.stream-machine-core {
  display: grid;
  gap: 10px;
  padding: 14px;
}

.stream-machine-module {
  position: relative;
  display: grid;
  gap: 5px;
  border: 1px solid rgba(105, 105, 155, 0.7);
  background: rgba(28, 28, 44, 0.78);
  padding: 10px;
  overflow: hidden;
}

.stream-machine-module::after {
  content: "";
  position: absolute;
  inset: 0 auto 0 0;
  width: 4px;
  background: var(--retro-green);
  opacity: 0;
  animation: stream-module-pulse 3.4s calc(var(--i) * 240ms) infinite;
}

.stream-machine-module span {
  color: var(--retro-green);
}

.stream-machine-module small {
  color: var(--retro-muted);
  font-size: 12px;
  line-height: 1.25;
}

.stream-machine-core em {
  position: absolute;
  inset: -8px;
  border: 2px dashed rgba(0, 255, 136, 0.26);
  font-style: normal;
  pointer-events: none;
  animation: stream-core-breathe 2.6s infinite;
}

.stream-machine-output {
  align-self: stretch;
  display: grid;
  grid-template-rows: auto 1fr auto;
  overflow: hidden;
}

.stream-machine-titlebar {
  display: flex;
  align-items: center;
  gap: 7px;
  border-bottom: 2px solid var(--retro-border-strong);
  padding: 9px 10px;
}

.stream-machine-titlebar span {
  width: 8px;
  height: 8px;
  border: 2px solid var(--retro-border);
}

.stream-machine-titlebar span:nth-child(1) {
  background: var(--retro-red);
}

.stream-machine-titlebar span:nth-child(2) {
  background: var(--retro-gold);
}

.stream-machine-titlebar span:nth-child(3) {
  background: var(--retro-green);
}

.stream-machine-titlebar b {
  margin-left: 6px;
  color: var(--retro-muted);
}

.stream-machine-canvas {
  position: relative;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 9px;
  padding: 12px;
}

.stream-machine-canvas::before {
  content: "";
  position: absolute;
  inset: 12px;
  background:
    linear-gradient(rgba(78, 205, 196, 0.08) 1px, transparent 1px),
    linear-gradient(90deg, rgba(78, 205, 196, 0.08) 1px, transparent 1px);
  background-size: 22px 22px;
  opacity: 0.65;
}

.stream-machine-canvas section {
  position: relative;
  z-index: 1;
  min-height: 46px;
  border: 1px solid rgba(105, 105, 155, 0.82);
  background: rgba(12, 12, 20, 0.84);
  padding: 9px;
  opacity: 0;
  transform: translateY(12px) scale(0.96);
  animation: stream-ui-build 3.4s calc(560ms + var(--i) * 190ms) infinite;
}

.stream-machine-canvas b {
  display: block;
  color: var(--retro-text);
  font-size: 13px;
}

.stream-machine-canvas i {
  display: block;
  width: 78%;
  height: 5px;
  margin-top: 8px;
  background: linear-gradient(90deg, var(--retro-green), rgba(78, 205, 196, 0.3));
}

.stream-machine-output strong {
  border-top: 2px solid var(--retro-border-strong);
  color: var(--retro-green);
  padding: 9px 12px;
}

.stream-machine.compact .stream-machine-source i,
.stream-machine.compact .stream-machine-module small,
.stream-machine.compact .stream-machine-canvas b {
  font-size: 11px;
}

.stream-machine.compact .stream-machine-source,
.stream-machine.compact .stream-machine-core {
  padding: 8px;
}

.stream-machine.compact .stream-machine-source {
  gap: 5px;
}

.stream-machine.compact .stream-machine-source i {
  padding: 4px 6px;
  font-size: 10px;
}

.stream-machine.compact .stream-machine-core {
  gap: 6px;
}

.stream-machine.compact .stream-machine-module {
  gap: 3px;
  padding: 6px;
}

.stream-machine.compact .stream-machine-module small {
  font-size: 9px;
  line-height: 1.14;
}

.stream-machine.compact .stream-machine-titlebar,
.stream-machine.compact .stream-machine-output strong {
  padding: 7px 8px;
}

.stream-machine.compact .stream-machine-canvas {
  gap: 6px;
  padding: 8px;
}

.stream-machine.compact .stream-machine-canvas::before {
  inset: 8px;
}

.stream-machine.compact .stream-machine-canvas section {
  min-height: 34px;
  padding: 6px;
}

.stream-machine.compact .stream-machine-output strong {
  font-size: 7px;
}

.stream-machine:not(.is-active) *,
.stream-machine:not(.is-active) *::before,
.stream-machine:not(.is-active) *::after {
  animation-play-state: paused !important;
}

@keyframes stream-packet-in {
  0%, 12% {
    opacity: 0.32;
    transform: translateX(-16px);
  }
  24%, 58% {
    opacity: 1;
    transform: translateX(0);
  }
  82%, 100% {
    opacity: 0.24;
    transform: translateX(18px);
  }
}

@keyframes stream-scan {
  from {
    transform: translateX(-55%);
  }
  to {
    transform: translateX(55%);
  }
}

@keyframes stream-scan-y {
  from {
    transform: translateY(-35%);
  }
  to {
    transform: translateY(35%);
  }
}

@keyframes stream-dot-travel {
  0% {
    opacity: 0;
    transform: translateX(-8px) scale(0.7);
  }
  18%, 70% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    transform: translateX(100px) scale(1.15);
  }
}

@keyframes stream-dot-travel-y {
  0% {
    opacity: 0;
    transform: translateY(-8px) scale(0.7);
  }
  18%, 70% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    transform: translateY(174px) scale(1.15);
  }
}

@keyframes stream-module-pulse {
  0%, 18% {
    opacity: 0;
    transform: scaleY(0.2);
  }
  28%, 52% {
    opacity: 1;
    transform: scaleY(1);
  }
  78%, 100% {
    opacity: 0;
    transform: scaleY(0.2);
  }
}

@keyframes stream-core-breathe {
  0%, 100% {
    opacity: 0.28;
    transform: scale(0.98) rotate(-1deg);
  }
  50% {
    opacity: 0.62;
    transform: scale(1.02) rotate(1deg);
  }
}

@keyframes stream-ui-build {
  0%, 18% {
    opacity: 0.24;
    transform: translateY(12px) scale(0.96);
  }
  34%, 72% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
  100% {
    opacity: 0.45;
    transform: translateY(-3px) scale(0.99);
  }
}
</style>
