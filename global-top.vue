<script setup>
import { useNav } from '@slidev/client'
import { computed, nextTick, onBeforeUnmount, onMounted, reactive, ref, watch } from 'vue'
import AnimePageTransition from './components/AnimePageTransition.vue'

const nav = useNav()
const visible = ref(false)
const storedAboutFrame = JSON.parse(sessionStorage.getItem('markstreamLogoAboutFrame') || 'null')
const aboutFrame = ref(storedAboutFrame)
const frame = reactive({
  left: 0,
  top: 0,
  width: 58,
  height: 58,
  opacity: 1,
  shadow: true,
  transition: false,
})

let settleTimer
let anchorHideToken = 0

function waitForFlightPaint() {
  const image = document.querySelector('.shared-logo-flight')
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
  const returnFrame = aboutFrame.value || frame
  return {
    '--return-dx': `${returnFrame.left - frame.left}px`,
    '--return-dy': `${returnFrame.top - frame.top}px`,
    '--return-scale-x': `${returnFrame.width / frame.width}`,
    '--return-scale-y': `${returnFrame.height / frame.height}`,
    left: `${frame.left}px`,
    top: `${frame.top}px`,
    width: `${frame.width}px`,
    height: `${frame.height}px`,
    opacity: frame.opacity,
    boxShadow: frame.shadow ? '0 18px 34px rgba(0, 0, 0, 0.24)' : 'none',
    transition: frame.transition
      ? 'left 900ms ease, top 900ms ease, width 900ms ease, height 900ms ease, opacity 900ms ease, box-shadow 900ms ease'
      : 'none',
  }
})

const isReturningLogo = computed(() => {
  return nav.currentSlideNo.value === 1
    && nav.clicksDirection.value < 0
    && !!aboutFrame.value
})

function readRect(selector) {
  const element = document.querySelector(selector)
  if (!element)
    return null

  const rect = element.getBoundingClientRect()
  if (!rect.width || !rect.height)
    return null

  return {
    left: rect.left,
    top: rect.top,
    width: rect.width,
    height: rect.height,
  }
}

function rememberAboutFrame(rect) {
  aboutFrame.value = rect
  sessionStorage.setItem('markstreamLogoAboutFrame', JSON.stringify(rect))
}

function setFrame(rect, options, transition) {
  frame.transition = transition
  frame.left = rect.left
  frame.top = rect.top
  frame.width = rect.width
  frame.height = rect.height
  frame.opacity = options.opacity
  frame.shadow = options.shadow
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

function syncCover(transition = false) {
  const rect = readRect('.cover-logo')
  if (!rect)
    return false

  visible.value = true
  setFrame(rect, { opacity: 1, shadow: true }, transition)
  setAnchorHidden(true)
  return true
}

function syncAbout(transition) {
  const rect = readRect('.about-slide .slide-corner-logo')
  if (!rect)
    return false

  visible.value = true
  rememberAboutFrame(rect)
  setFrame(rect, { opacity: 1, shadow: false }, transition)
  setAnchorHidden(true)
  return true
}

function syncCurrent() {
  if (nav.currentSlideNo.value === 1)
    syncCover()
  else if (nav.currentSlideNo.value === 2)
    syncAbout(false)
  else {
    visible.value = false
    setAnchorHidden(false)
  }
}

function syncCoverAfterMotion() {
  clearTimeout(settleTimer)
  settleTimer = setTimeout(syncCover, 760)
}

function syncAboutAfterMount() {
  clearTimeout(settleTimer)
  settleTimer = setTimeout(() => syncAbout(false), 120)
}

watch(
  () => nav.currentSlideNo.value,
  async (page, previousPage) => {
    await nextTick()
    await new Promise(resolve => requestAnimationFrame(resolve))

    if (page === 1) {
      syncCover(previousPage === 2 || nav.clicksDirection.value < 0)
      syncCoverAfterMotion()
      return
    }

    if (page === 2) {
      if (previousPage === 1 && nav.navDirection.value > 0) {
        frame.transition = true
        requestAnimationFrame(() => syncAbout(true))
      }
      else {
        if (!syncAbout(false))
          syncAboutAfterMount()
      }
      return
    }

    visible.value = false
    setAnchorHidden(false)
  },
  { immediate: true, flush: 'post' },
)

onMounted(() => {
  requestAnimationFrame(() => {
    syncCurrent()
    if (nav.currentSlideNo.value === 1)
      syncCoverAfterMotion()
    else if (nav.currentSlideNo.value === 2)
      syncAboutAfterMount()
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
    <img
      v-show="visible"
      class="shared-logo-flight"
      :class="{ 'is-returning-logo': isReturningLogo }"
      src="/markstream-logo.svg"
      alt=""
      aria-hidden="true"
      :style="logoStyle"
    >
  </Teleport>
</template>

<style>
.shared-logo-flight {
  position: fixed;
  z-index: 1000;
  border-radius: 8px;
  object-fit: contain;
  pointer-events: none;
  transform-origin: top left;
}

.shared-logo-flight.is-returning-logo {
  animation: shared-logo-return 900ms ease both;
  will-change: transform, opacity, box-shadow;
}

@keyframes shared-logo-return {
  from {
    transform: translate(var(--return-dx), var(--return-dy)) scale(var(--return-scale-x), var(--return-scale-y));
    box-shadow: none;
  }

  to {
    transform: translate(0, 0) scale(1);
  }
}
</style>
