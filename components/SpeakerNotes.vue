<script setup>
import MarkdownRender from 'markstream-vue'
import 'markstream-vue/index.css'
import notes from '../docs/speaker-notes-zh.md?raw'

const headingPattern = /^## (第 (\d+) 页｜.+)$/gm
const matches = [...notes.matchAll(headingPattern)]
const introduction = notes.slice(0, matches[0]?.index ?? notes.length).trim()
const sections = matches.map((match, index) => ({
  no: Number(match[2]),
  title: match[1],
  content: notes.slice(match.index, matches[index + 1]?.index ?? notes.length).trim(),
}))
</script>

<template>
  <main class="speaker-notes-page">
    <aside class="speaker-notes-nav">
      <div class="speaker-notes-nav-header">
        <span>演讲稿</span>
        <a href="./1" target="_blank">打开幻灯片 ↗</a>
      </div>
      <nav aria-label="演讲稿页码">
        <a
          v-for="section in sections"
          :key="section.no"
          :href="`#note-${section.no}`"
        >
          <b>{{ String(section.no).padStart(2, '0') }}</b>
          <span>{{ section.title.replace(/^第 \d+ 页｜/, '') }}</span>
        </a>
      </nav>
    </aside>

    <div class="speaker-notes-content">
      <header class="speaker-notes-intro">
        <MarkdownRender :content="introduction" :final="true" :is-dark="true" :fade="false" />
      </header>

      <article
        v-for="section in sections"
        :id="`note-${section.no}`"
        :key="section.no"
        class="speaker-note"
      >
        <span class="speaker-note-number">{{ String(section.no).padStart(2, '0') }}</span>
        <MarkdownRender :content="section.content" :final="true" :is-dark="true" :fade="false" />
      </article>
    </div>
  </main>
</template>

<style scoped>
.speaker-notes-page {
  position: fixed;
  inset: 0;
  z-index: 2000;
  display: grid;
  grid-template-columns: 280px minmax(0, 1fr);
  overflow: hidden;
  background: #090b10;
  color: #f3f4f6;
  font-family: var(--font-sans);
}

.speaker-notes-nav {
  display: flex;
  min-height: 0;
  flex-direction: column;
  border-right: 1px solid #252932;
  background: #0d1016;
}

.speaker-notes-nav-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 22px 20px 16px;
  border-bottom: 1px solid #252932;
}

.speaker-notes-nav-header span {
  font-size: 18px;
  font-weight: 750;
}

.speaker-notes-nav-header a {
  color: #61f2cd;
  font-size: 12px;
  text-decoration: none;
}

.speaker-notes-nav nav {
  min-height: 0;
  overflow-y: auto;
  padding: 10px;
}

.speaker-notes-nav nav a {
  display: grid;
  grid-template-columns: 32px minmax(0, 1fr);
  gap: 9px;
  align-items: baseline;
  padding: 9px 10px;
  border-radius: 6px;
  color: #aeb4c0;
  text-decoration: none;
}

.speaker-notes-nav nav a:hover,
.speaker-notes-nav nav a:focus-visible {
  background: #171b23;
  color: #fff;
}

.speaker-notes-nav nav b {
  color: #61f2cd;
  font-family: var(--font-code);
  font-size: 12px;
}

.speaker-notes-nav nav span {
  overflow: hidden;
  font-size: 13px;
  line-height: 1.4;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.speaker-notes-content {
  min-height: 0;
  overflow-y: auto;
  scroll-behavior: smooth;
  padding: 52px clamp(28px, 6vw, 96px) 35vh;
}

.speaker-notes-intro,
.speaker-note {
  width: min(820px, 100%);
  margin: 0 auto;
}

.speaker-notes-intro {
  padding-bottom: 44px;
  border-bottom: 1px solid #252932;
}

.speaker-note {
  position: relative;
  scroll-margin-top: 32px;
  padding: 54px 0 58px;
  border-bottom: 1px solid #252932;
}

.speaker-note-number {
  position: absolute;
  top: 62px;
  left: -52px;
  color: #61f2cd;
  font-family: var(--font-code);
  font-size: 13px;
  font-weight: 700;
}

.speaker-notes-page :deep(.markstream-vue) {
  color: #e7e9ee;
  font-size: 20px;
  line-height: 1.85;
}

.speaker-notes-page :deep(.markstream-vue h1),
.speaker-notes-page :deep(.markstream-vue h2) {
  color: #fff;
  font-family: var(--font-display);
  letter-spacing: -0.025em;
}

.speaker-notes-page :deep(.markstream-vue h1) {
  margin: 0 0 18px;
  font-size: clamp(30px, 4vw, 48px);
  line-height: 1.15;
}

.speaker-notes-page :deep(.markstream-vue h2) {
  margin: 0 0 24px;
  font-size: clamp(25px, 3vw, 34px);
  line-height: 1.25;
}

.speaker-notes-page :deep(.markstream-vue p) {
  margin: 0 0 1.15em;
}

.speaker-notes-page :deep(.markstream-vue strong) {
  color: #fff;
}

@media (max-width: 800px) {
  .speaker-notes-page {
    grid-template-columns: 1fr;
  }

  .speaker-notes-nav {
    display: none;
  }

  .speaker-notes-content {
    padding: 32px 22px 30vh;
  }

  .speaker-note-number {
    display: none;
  }

  .speaker-notes-page :deep(.markstream-vue) {
    font-size: 18px;
  }
}
</style>
