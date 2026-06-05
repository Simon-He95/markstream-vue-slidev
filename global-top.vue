<script setup>
import { useNav } from '@slidev/client'
import { computed, nextTick, onBeforeUnmount, onMounted, reactive, ref, watch } from 'vue'

const nav = useNav()
const visible = ref(false)
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

const logoStyle = computed(() => ({
  left: `${frame.left}px`,
  top: `${frame.top}px`,
  width: `${frame.width}px`,
  height: `${frame.height}px`,
  opacity: frame.opacity,
  boxShadow: frame.shadow ? '0 18px 34px rgba(0, 0, 0, 0.24)' : 'none',
  transition: frame.transition
    ? 'left 900ms ease, top 900ms ease, width 900ms ease, height 900ms ease, opacity 900ms ease, box-shadow 900ms ease'
    : 'none',
}))

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

function setFrame(rect, options, transition) {
  frame.transition = transition
  frame.left = rect.left
  frame.top = rect.top
  frame.width = rect.width
  frame.height = rect.height
  frame.opacity = options.opacity
  frame.shadow = options.shadow
}

function syncCover() {
  const rect = readRect('.cover-logo')
  if (!rect)
    return false

  visible.value = true
  setFrame(rect, { opacity: 1, shadow: true }, false)
  return true
}

function syncAbout(transition) {
  const rect = readRect('.about-slide .slide-corner-logo')
  if (!rect)
    return false

  visible.value = true
  setFrame(rect, { opacity: 0.46, shadow: false }, transition)
  return true
}

function syncCurrent() {
  if (nav.currentSlideNo.value === 1)
    syncCover()
  else if (nav.currentSlideNo.value === 2)
    syncAbout(false)
  else
    visible.value = false
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
      syncCover()
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
  window.removeEventListener('resize', syncCurrent)
})
</script>

<template>
  <Teleport to="body">
    <img
      v-show="visible"
      class="shared-logo-flight"
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
}
</style>
