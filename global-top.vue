<script setup>
import { useNav } from '@slidev/client'
import { computed, nextTick, onBeforeUnmount, onMounted, reactive, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import AnimePageTransition from './components/AnimePageTransition.vue'

const nav = useNav()
const route = useRoute()
const visible = ref(false)
const bubblePieces = [
  '--bubble-x: 16%; --bubble-y: 28%; --bubble-size: 10px; --bubble-sx: -52px; --bubble-sy: -46px; --bubble-mx: -18px; --bubble-my: -14px; --bubble-delay: 0ms;',
  '--bubble-x: 24%; --bubble-y: 52%; --bubble-size: 8px; --bubble-sx: -30px; --bubble-sy: 26px; --bubble-mx: -10px; --bubble-my: 9px; --bubble-delay: 42ms;',
  '--bubble-x: 48%; --bubble-y: 18%; --bubble-size: 9px; --bubble-sx: -4px; --bubble-sy: -58px; --bubble-mx: -2px; --bubble-my: -18px; --bubble-delay: 18ms;',
  '--bubble-x: 52%; --bubble-y: 72%; --bubble-size: 8px; --bubble-sx: 4px; --bubble-sy: 58px; --bubble-mx: 2px; --bubble-my: 18px; --bubble-delay: 66ms;',
  '--bubble-x: 72%; --bubble-y: 32%; --bubble-size: 10px; --bubble-sx: 40px; --bubble-sy: -42px; --bubble-mx: 14px; --bubble-my: -14px; --bubble-delay: 24ms;',
  '--bubble-x: 84%; --bubble-y: 52%; --bubble-size: 8px; --bubble-sx: 62px; --bubble-sy: 34px; --bubble-mx: 20px; --bubble-my: 10px; --bubble-delay: 72ms;',
  '--bubble-x: 50%; --bubble-y: 24%; --bubble-size: 7px; --bubble-sx: 0px; --bubble-sy: -74px; --bubble-mx: 0px; --bubble-my: -24px; --bubble-delay: 30ms;',
  '--bubble-x: 50%; --bubble-y: 68%; --bubble-size: 7px; --bubble-sx: 0px; --bubble-sy: 72px; --bubble-mx: 0px; --bubble-my: 22px; --bubble-delay: 88ms;',
]
const frame = reactive({
  left: 0,
  top: 0,
  width: 58,
  height: 58,
  opacity: 1,
  transition: false,
  mode: 'logo',
  motion: 'still',
  motionKey: 0,
  fromX: 0,
  fromY: 0,
  fromScaleX: 1,
  fromScaleY: 1,
  arcX: 0,
  arcY: 0,
  rollStart: 0,
  rollMid: 0,
})

let settleTimer
let anchorHideToken = 0
let motionUntil = 0

function currentPageNumber() {
  const pageFromPath = Number(location.pathname.match(/^\/(\d+)/)?.[1])
  if (Number.isFinite(pageFromPath) && pageFromPath > 0)
    return pageFromPath

  const routeNo = Array.isArray(route.params.no) ? route.params.no[0] : route.params.no
  const pageFromRoute = Number(routeNo)
  if (Number.isFinite(pageFromRoute) && pageFromRoute > 0)
    return pageFromRoute

  return nav.currentSlideNo.value
}

function waitForFlightPaint() {
  const image = document.querySelector('.shared-logo-img')
  if (!image)
    return Promise.resolve()

  const loaded = image.complete && image.naturalWidth > 0
    ? Promise.resolve()
    : new Promise(resolve => image.addEventListener('load', resolve, { once: true }))

  return loaded
    .then(() => new Promise(resolve => requestAnimationFrame(resolve)))
    .then(() => new Promise(resolve => requestAnimationFrame(resolve)))
}

const logoStyle = computed(() => {
  const letterSize = frame.mode === 'footer-letter'
    ? Math.max(10, Math.min(frame.height * 0.9, 22))
    : Math.max(24, Math.min(frame.height * 0.86, 58))

  return {
    left: `${frame.left}px`,
    top: `${frame.top}px`,
    width: `${frame.width}px`,
    height: `${frame.height}px`,
    '--flight-letter-size': `${letterSize}px`,
    '--flight-from-x': `${frame.fromX}px`,
    '--flight-from-y': `${frame.fromY}px`,
    '--flight-from-scale-x': frame.fromScaleX,
    '--flight-from-scale-y': frame.fromScaleY,
    '--flight-arc-x': `${frame.arcX}px`,
    '--flight-arc-y': `${frame.arcY}px`,
    '--flight-roll-start': `${frame.rollStart}deg`,
    '--flight-roll-mid': `${frame.rollMid}deg`,
    opacity: frame.opacity,
    transition: frame.transition
      ? 'opacity 220ms ease'
      : 'none',
  }
})

const logoClass = computed(() => [`is-${frame.mode}`, `flight-motion-${frame.motion}`])
const logoCoreClass = computed(() => `motion-${frame.motion}`)

function chooseMotion(mode, rect) {
  const page = currentPageNumber()
  const dx = rect.left - frame.left
  const dy = rect.top - frame.top

  if (mode === 'logo')
    return 'wheel-logo'

  if (mode === 'inline-letter' || mode === 'footer-letter')
    return 'bubble-word'

  if (mode === 'letter' && page % 4 === 2)
    return 'bubble'

  if (mode === 'background')
    return page % 4 === 1 ? 'wheel' : 'flip-x'

  if (page % 5 === 0)
    return 'bubble'

  if (Math.abs(dx) > Math.abs(dy))
    return page % 4 === 0 ? 'flip-x' : 'wheel'

  return page % 4 === 2 ? 'flip-x' : 'wheel'
}

function readRect(selector) {
  const element = document.querySelector(selector)
  if (!element)
    return null

  const rect = readStableRect(element)
  if (!rect.width || !rect.height)
    return null

  return {
    left: rect.left,
    top: rect.top,
    width: rect.width,
    height: rect.height,
  }
}

function readStableRect(element) {
  const restored = []
  let node = element
  while (node && node instanceof HTMLElement) {
    if (node.classList.contains('slidev-page'))
      break

    const style = getComputedStyle(node)
    if (style.animationName !== 'none' || style.transform !== 'none' || style.transitionProperty !== 'all') {
      restored.push({
        node,
        animation: node.style.animation,
        transform: node.style.transform,
        transition: node.style.transition,
      })
      node.style.animation = 'none'
      node.style.transform = 'none'
      node.style.transition = 'none'
    }

    if (node.classList.contains('attachment-deck'))
      break

    node = node.parentElement
  }

  const rect = element.getBoundingClientRect()
  for (const item of restored.reverse()) {
    item.node.style.animation = item.animation
    item.node.style.transform = item.transform
    item.node.style.transition = item.transition
  }

  return rect
}

function readTarget() {
  const page = currentPageNumber()
  const selector = `.logo-flight-target[data-logo-page="${page}"][data-logo-active="true"]`
  const element = Array.from(document.querySelectorAll(selector)).find((candidate) => {
    const rect = candidate.getBoundingClientRect()
    const style = getComputedStyle(candidate)
    return rect.width > 1
      && rect.height > 1
      && style.display !== 'none'
      && style.visibility !== 'hidden'
  })
  if (!element)
    return null

  const rect = element.dataset.logoRect === 'visual'
    ? element.getBoundingClientRect()
    : readStableRect(element)
  if (!rect.width || !rect.height)
    return null

  return {
    left: rect.left,
    top: rect.top,
    width: rect.width,
    height: rect.height,
    mode: element.dataset.logoMode || 'logo',
  }
}

function setFrame(rect, transition) {
  const mode = rect.mode || 'logo'
  const previous = {
    left: frame.left,
    top: frame.top,
    width: frame.width,
    height: frame.height,
  }

  if (transition) {
    frame.motion = chooseMotion(mode, rect)
    frame.motionKey += 1
    motionUntil = performance.now() + 980

    const fromX = previous.left - rect.left
    const fromY = previous.top - rect.top
    const distance = Math.hypot(fromX, fromY)
    const travelSize = Math.max(36, (previous.width + previous.height + rect.width + rect.height) / 4)
    const turns = Math.max(1, Math.min(8, Math.round(distance / travelSize)))
    const curve = Math.min(96, Math.max(24, distance * 0.12))
    const normalX = distance ? -fromY / distance : 0
    const normalY = distance ? fromX / distance : 0

    frame.fromX = fromX
    frame.fromY = fromY
    frame.fromScaleX = previous.width / rect.width
    frame.fromScaleY = previous.height / rect.height
    frame.arcX = fromX * 0.48 + normalX * curve
    frame.arcY = fromY * 0.48 + normalY * curve
    frame.rollStart = -turns * 360
    frame.rollMid = -turns * 150
  }
  else if (performance.now() >= motionUntil) {
    frame.motion = 'still'
    frame.fromX = 0
    frame.fromY = 0
    frame.fromScaleX = 1
    frame.fromScaleY = 1
    frame.arcX = 0
    frame.arcY = 0
    frame.rollStart = 0
    frame.rollMid = 0
  }

  frame.transition = transition
  frame.left = rect.left
  frame.top = rect.top
  frame.width = rect.width
  frame.height = rect.height
  frame.mode = mode
  frame.opacity = 1
}

function setAnchorHidden(hidden) {
  anchorHideToken += 1
  const token = anchorHideToken

  if (!hidden) {
    document.documentElement.classList.remove('shared-logo-ready')
    return
  }

  nextTick(() => {
    if (token !== anchorHideToken || !visible.value)
      return

    waitForFlightPaint().then(() => {
      if (token !== anchorHideToken || !visible.value)
        return

      document.documentElement.classList.add('shared-logo-ready')
    })
  })
}

function syncCurrent(transition = false) {
  const page = currentPageNumber()
  const rect = readTarget() || (page === 1 ? readRect('.cover-logo[data-logo-page="1"]') : null)
  if (!rect) {
    visible.value = false
    setAnchorHidden(false)
    return false
  }

  visible.value = true
  setFrame(rect, transition)
  setAnchorHidden(true)
  return true
}

function syncAfterMotion(transition = false, attempt = 0, delay = 80) {
  if (!attempt)
    clearTimeout(settleTimer)

  settleTimer = setTimeout(() => {
    syncCurrent(transition && attempt === 0)

    if (attempt < 5)
      syncAfterMotion(false, attempt + 1, transition && attempt === 0 ? 980 : 180)
  }, delay)
}

watch(
  () => `${currentPageNumber()}:${route.fullPath}`,
  async (value, previousValue) => {
    await nextTick()
    await new Promise(resolve => requestAnimationFrame(resolve))

    const shouldTransition = previousValue !== undefined && value !== previousValue
    if (syncCurrent(shouldTransition))
      syncAfterMotion(false, 0, shouldTransition ? 980 : 80)
    else
      syncAfterMotion(shouldTransition)
  },
  { immediate: true, flush: 'post' },
)

onMounted(() => {
  requestAnimationFrame(() => {
    syncCurrent(false)
    syncAfterMotion(false)
  })
})

window.addEventListener('resize', syncCurrent)

onBeforeUnmount(() => {
  clearTimeout(settleTimer)
  setAnchorHidden(false)
  window.removeEventListener('resize', syncCurrent)
})
</script>

<template>
  <Teleport to="body">
    <AnimePageTransition />
    <div
      :key="frame.motionKey"
      v-show="visible"
      class="shared-logo-flight"
      :class="logoClass"
      aria-hidden="true"
      :style="logoStyle"
    >
      <span :key="frame.motionKey" class="shared-logo-core" :class="logoCoreClass">
        <img class="shared-logo-img" src="/markstream-logo.svg" alt="">
        <span class="shared-logo-letter">M</span>
        <span class="shared-logo-mark">
          <i></i>
          <i></i>
          <i></i>
          <i></i>
        </span>
        <span class="shared-logo-bubbles" aria-hidden="true">
          <i v-for="(bubble, index) in bubblePieces" :key="index" :style="bubble"></i>
        </span>
      </span>
    </div>
  </Teleport>
</template>

<style>
.shared-logo-flight {
  position: fixed;
  z-index: 1000;
  display: grid;
  place-items: center;
  border-radius: 8px;
  color: #61f2cd;
  pointer-events: none;
  perspective: 900px;
  transform-origin: 50% 50%;
  transform-style: preserve-3d;
  overflow: visible;
  will-change: transform, filter;
  backface-visibility: visible;
}

.shared-logo-core {
  position: absolute;
  inset: 0;
  display: block;
  transform-origin: 50% 50%;
  transform-style: preserve-3d;
}

.shared-logo-img,
.shared-logo-letter,
.shared-logo-mark,
.shared-logo-bubbles {
  position: absolute;
  inset: 0;
  opacity: 0;
  transition: opacity 520ms ease, filter 520ms ease, transform 720ms cubic-bezier(.22, 1, .36, 1);
}

.shared-logo-img {
  width: 100%;
  height: 100%;
  border-radius: inherit;
  object-fit: contain;
}

.shared-logo-letter {
  display: grid;
  place-items: center;
  font-family: var(--font-display);
  font-size: var(--flight-letter-size, 52px);
  font-weight: 820;
  line-height: 1;
}

.shared-logo-flight.is-logo .shared-logo-img {
  opacity: 1;
}

.shared-logo-flight.is-logo .shared-logo-letter,
.shared-logo-flight.is-logo .shared-logo-mark,
.shared-logo-flight.is-logo .shared-logo-bubbles {
  opacity: 0;
}

.shared-logo-flight.is-letter {
  text-shadow: 0 0 24px rgba(93, 234, 204, 0.24);
}

.shared-logo-flight.is-inline-letter,
.shared-logo-flight.is-footer-letter {
  text-shadow: 0 0 18px rgba(93, 234, 204, 0.2);
}

.shared-logo-flight.is-letter .shared-logo-letter {
  opacity: 1;
  transform: translateY(-2px);
}

.shared-logo-flight.is-inline-letter .shared-logo-letter,
.shared-logo-flight.is-footer-letter .shared-logo-letter {
  opacity: 1;
}

.shared-logo-flight.is-inline-letter .shared-logo-letter {
  transform: translateY(2px);
}

.shared-logo-flight.is-footer-letter {
  text-shadow: none;
}

.shared-logo-flight.is-footer-letter .shared-logo-letter {
  font-family: "Comic Sans MS", "Kaiti SC", var(--font-code);
  font-weight: 700;
  line-height: 1.5;
  letter-spacing: 0.02em;
  transform: none;
}

.shared-logo-flight.is-letter .shared-logo-img,
.shared-logo-flight.is-letter .shared-logo-mark,
.shared-logo-flight.is-inline-letter .shared-logo-img,
.shared-logo-flight.is-inline-letter .shared-logo-mark,
.shared-logo-flight.is-footer-letter .shared-logo-img,
.shared-logo-flight.is-footer-letter .shared-logo-mark {
  opacity: 0;
}

.shared-logo-flight.is-background {
  z-index: 6;
  mix-blend-mode: screen;
}

.shared-logo-flight.is-background .shared-logo-letter {
  display: grid;
  place-items: center;
  color: #61f2cd;
  font-size: min(320px, 32vw);
  font-weight: 760;
  line-height: 1;
  opacity: 0.085;
  transform: rotate(-8deg);
}

.shared-logo-flight.is-background .shared-logo-img,
.shared-logo-flight.is-background .shared-logo-mark {
  opacity: 0;
}

.shared-logo-flight.flight-motion-wheel,
.shared-logo-flight.flight-motion-wheel-logo,
.shared-logo-flight.flight-motion-wheel-word {
  animation: shared-flight-wheel 980ms cubic-bezier(.18, 1, .22, 1) both;
}

.shared-logo-flight.flight-motion-flip-x {
  animation: shared-flight-flip-x 980ms cubic-bezier(.18, 1, .22, 1) both;
}

.shared-logo-flight.flight-motion-bubble,
.shared-logo-flight.flight-motion-bubble-word {
  animation: shared-flight-bubble 980ms cubic-bezier(.18, 1, .22, 1) both;
}

.shared-logo-flight.flight-motion-wheel .shared-logo-img,
.shared-logo-flight.flight-motion-wheel .shared-logo-letter,
.shared-logo-flight.flight-motion-wheel .shared-logo-mark,
.shared-logo-flight.flight-motion-wheel .shared-logo-bubbles,
.shared-logo-flight.flight-motion-wheel-logo .shared-logo-img,
.shared-logo-flight.flight-motion-wheel-logo .shared-logo-letter,
.shared-logo-flight.flight-motion-wheel-logo .shared-logo-mark,
.shared-logo-flight.flight-motion-wheel-logo .shared-logo-bubbles,
.shared-logo-flight.flight-motion-wheel-word .shared-logo-img,
.shared-logo-flight.flight-motion-wheel-word .shared-logo-letter,
.shared-logo-flight.flight-motion-wheel-word .shared-logo-mark,
.shared-logo-flight.flight-motion-wheel-word .shared-logo-bubbles,
.shared-logo-flight.flight-motion-flip-x .shared-logo-img,
.shared-logo-flight.flight-motion-flip-x .shared-logo-letter,
.shared-logo-flight.flight-motion-flip-x .shared-logo-mark,
.shared-logo-flight.flight-motion-flip-x .shared-logo-bubbles,
.shared-logo-flight.flight-motion-bubble .shared-logo-img,
.shared-logo-flight.flight-motion-bubble .shared-logo-letter,
.shared-logo-flight.flight-motion-bubble .shared-logo-mark,
.shared-logo-flight.flight-motion-bubble .shared-logo-bubbles,
.shared-logo-flight.flight-motion-bubble-word .shared-logo-img,
.shared-logo-flight.flight-motion-bubble-word .shared-logo-letter,
.shared-logo-flight.flight-motion-bubble-word .shared-logo-mark,
.shared-logo-flight.flight-motion-bubble-word .shared-logo-bubbles {
  transition: none;
}

.shared-logo-flight.flight-motion-wheel-logo .shared-logo-img {
  animation: shared-logo-img-land 980ms ease both;
}

.shared-logo-flight.flight-motion-wheel-logo .shared-logo-letter {
  opacity: 1;
  transform: translateY(-1px);
  animation: shared-logo-letter-land 980ms ease both;
}

.shared-logo-flight.flight-motion-wheel-logo .shared-logo-mark,
.shared-logo-flight.flight-motion-wheel-logo .shared-logo-bubbles {
  opacity: 0 !important;
  animation: none !important;
}

.shared-logo-bubbles {
  inset: -18%;
  opacity: 0;
  pointer-events: none;
}

.shared-logo-bubbles i {
  position: absolute;
  left: var(--bubble-x);
  top: var(--bubble-y);
  width: var(--bubble-size);
  height: var(--bubble-size);
  border-radius: 999px;
  background:
    radial-gradient(circle at 34% 28%, rgba(97, 242, 205, 0.95) 0 12%, rgba(78, 205, 196, 0.85) 72%);
  box-shadow:
    0 0 14px rgba(97, 242, 205, 0.38),
    inset 0 0 5px rgba(78, 205, 196, 0.4);
  opacity: 0;
}

.shared-logo-flight.flight-motion-bubble .shared-logo-bubbles,
.shared-logo-flight.flight-motion-bubble-word .shared-logo-bubbles {
  opacity: 1;
}

.shared-logo-flight.flight-motion-bubble .shared-logo-bubbles i,
.shared-logo-flight.flight-motion-bubble-word .shared-logo-bubbles i {
  animation: shared-bubble-gather 920ms cubic-bezier(.2, .82, .16, 1) both;
  animation-delay: var(--bubble-delay);
}

.shared-logo-flight.flight-motion-bubble .shared-logo-letter,
.shared-logo-flight.flight-motion-bubble-word .shared-logo-letter {
  animation: shared-core-bubble 980ms ease both;
}

.shared-logo-flight.flight-motion-bubble .shared-logo-img,
.shared-logo-flight.flight-motion-bubble-word .shared-logo-img {
  opacity: 0 !important;
  animation: none !important;
}

.shared-logo-core.motion-swing-y {
  animation: shared-motion-swing-y 960ms cubic-bezier(.22, 1, .36, 1) both;
}

.shared-logo-core.motion-swing-x {
  animation: shared-motion-swing-x 960ms cubic-bezier(.22, 1, .36, 1) both;
}

.shared-logo-core.motion-lift-y {
  animation: shared-motion-lift-y 960ms cubic-bezier(.22, 1, .36, 1) both;
}

.shared-logo-core.motion-lift-x {
  animation: shared-motion-lift-x 960ms cubic-bezier(.22, 1, .36, 1) both;
}

.shared-logo-core.motion-plane-y {
  animation: shared-motion-plane-y 960ms cubic-bezier(.22, 1, .36, 1) both;
}

.shared-logo-core.motion-plane-x {
  animation: shared-motion-plane-x 960ms cubic-bezier(.22, 1, .36, 1) both;
}

.shared-logo-core.motion-fold-left,
.shared-logo-core.motion-fold-right {
  animation: shared-motion-fold 960ms cubic-bezier(.22, 1, .36, 1) both;
}

.shared-logo-core.motion-word-dock {
  animation: shared-motion-word-dock 820ms cubic-bezier(.22, 1, .36, 1) both;
}

@keyframes shared-flight-wheel {
  0% {
    transform:
      translate(var(--flight-from-x), var(--flight-from-y))
      rotateZ(var(--flight-roll-start))
      scale(var(--flight-from-scale-x), var(--flight-from-scale-y));
    filter: brightness(1.22) saturate(1.18);
  }
  48% {
    transform:
      translate(var(--flight-arc-x), var(--flight-arc-y))
      rotateZ(var(--flight-roll-mid))
      scale(1.08);
    filter: brightness(1.36) saturate(1.24);
  }
  100% {
    transform: translate(0, 0) rotateZ(0deg) scale(1);
    filter: none;
  }
}

@keyframes shared-flight-flip-x {
  0% {
    transform:
      perspective(900px)
      translate(var(--flight-from-x), var(--flight-from-y))
      rotateX(-540deg)
      scale(var(--flight-from-scale-x), var(--flight-from-scale-y));
    filter: brightness(1.2) saturate(1.16);
  }
  50% {
    transform:
      perspective(900px)
      translate(var(--flight-arc-x), var(--flight-arc-y))
      rotateX(-210deg)
      translateZ(96px)
      scale(1.1);
    filter: brightness(1.38) saturate(1.22);
  }
  100% {
    transform: perspective(900px) translate(0, 0) rotateX(0deg) translateZ(0) scale(1);
    filter: none;
  }
}

@keyframes shared-flight-bubble {
  0% {
    transform:
      translate(var(--flight-from-x), var(--flight-from-y))
      scale(var(--flight-from-scale-x), var(--flight-from-scale-y));
    filter: brightness(1.16) saturate(1.14);
  }
  46% {
    transform:
      translate(var(--flight-arc-x), var(--flight-arc-y))
      scale(1.12);
    filter: brightness(1.42) saturate(1.28);
  }
  100% {
    transform: translate(0, 0) scale(1);
    filter: none;
  }
}

@keyframes shared-core-bubble {
  0% {
    opacity: 1;
    transform: scale(1);
    filter: blur(0);
  }
  14% {
    opacity: 0;
    transform: scale(1.08);
    filter: blur(7px);
  }
  74% {
    opacity: 0;
    transform: scale(0.92);
    filter: blur(5px);
  }
  100% {
    opacity: 1;
    transform: scale(1);
    filter: blur(0);
  }
}

@keyframes shared-logo-letter-land {
  0%,
  58% {
    opacity: 1;
    transform: translateY(-1px) scale(1);
    filter: blur(0);
  }
  68%,
  100% {
    opacity: 0;
    transform: translateY(-1px) scale(0.82);
    filter: blur(6px);
  }
}

@keyframes shared-logo-img-land {
  0%,
  72% {
    opacity: 0;
    transform: scale(0.9);
    filter: blur(8px);
  }
  100% {
    opacity: 1;
    transform: scale(1);
    filter: blur(0);
  }
}

@keyframes shared-bubble-gather {
  0% {
    opacity: 0;
    transform: translate(-50%, -50%) translate(0, 0) scale(0.25);
  }
  12% {
    opacity: 0.96;
    transform: translate(-50%, -50%) translate(0, 0) scale(0.8);
  }
  44% {
    opacity: 1;
    transform: translate(-50%, -50%) translate(var(--bubble-sx), var(--bubble-sy)) scale(1.18);
  }
  74% {
    opacity: 0.95;
    transform: translate(-50%, -50%) translate(var(--bubble-mx), var(--bubble-my)) scale(0.82);
  }
  100% {
    opacity: 0;
    transform: translate(-50%, -50%) translate(0, 0) scale(0.22);
  }
}

@keyframes shared-motion-swing-y {
  0% { transform: rotateY(-34deg) rotateZ(-2deg) translateZ(42px) scale(0.98); }
  54% { transform: rotateY(18deg) rotateZ(1deg) translateZ(84px) scale(1.04); }
  100% { transform: rotateY(0) rotateZ(0) translateZ(0) scale(1); }
}

@keyframes shared-motion-swing-x {
  0% { transform: rotateX(32deg) rotateZ(2deg) translateZ(38px) scale(0.98); }
  56% { transform: rotateX(-16deg) rotateZ(-1deg) translateZ(76px) scale(1.04); }
  100% { transform: rotateX(0) rotateZ(0) translateZ(0) scale(1); }
}

@keyframes shared-motion-lift-y {
  0% { transform: rotateY(28deg) rotateX(-8deg) translateZ(22px) scale(0.96); }
  58% { transform: rotateY(-14deg) rotateX(6deg) translateZ(92px) scale(1.05); }
  100% { transform: rotateY(0) rotateX(0) translateZ(0) scale(1); }
}

@keyframes shared-motion-lift-x {
  0% { transform: rotateX(-30deg) rotateY(-8deg) translateZ(24px) scale(0.96); }
  56% { transform: rotateX(14deg) rotateY(6deg) translateZ(88px) scale(1.05); }
  100% { transform: rotateX(0) rotateY(0) translateZ(0) scale(1); }
}

@keyframes shared-motion-plane-y {
  0% { transform: rotateY(-42deg) rotateZ(-7deg) translateZ(60px) scale(0.88); }
  60% { transform: rotateY(16deg) rotateZ(-9deg) translateZ(120px) scale(1.05); }
  100% { transform: rotateY(0) rotateZ(0) translateZ(0) scale(1); }
}

@keyframes shared-motion-plane-x {
  0% { transform: rotateX(46deg) rotateZ(6deg) translateZ(58px) scale(0.9); }
  60% { transform: rotateX(-18deg) rotateZ(-8deg) translateZ(118px) scale(1.05); }
  100% { transform: rotateX(0) rotateZ(0) translateZ(0) scale(1); }
}

@keyframes shared-motion-fold {
  0% { transform: rotateY(44deg) rotateX(8deg) translateZ(72px) scale(0.92); }
  62% { transform: rotateY(-12deg) rotateX(-4deg) translateZ(92px) scale(1.03); }
  100% { transform: rotateY(0) rotateX(0) translateZ(0) scale(1); }
}

@keyframes shared-motion-word-dock {
  0% { transform: rotateY(-26deg) rotateX(10deg) translateZ(40px) scale(1.18); }
  66% { transform: rotateY(8deg) rotateX(-4deg) translateZ(28px) scale(1.04); }
  100% { transform: rotateY(0) rotateX(0) translateZ(0) scale(1); }
}

@media (prefers-reduced-motion: reduce) {
  .shared-logo-flight,
  .shared-logo-core {
    animation: none !important;
  }
}
</style>
