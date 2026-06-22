<script setup>
import { computed } from "vue";

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
  compact: {
    type: Boolean,
    default: false,
  },
});

const patterns = [
  ["comment", /^(\/\/.*|<!--.*?-->)/],
  ["fence", /^```.*$/],
  ["str", /^("[^"]*"|'[^']*'|`[^`]*`)/],
  ["tag", /^(<\/?[\w.-]+)/],
  ["attr", /^([:@]?[A-Za-z_][\w-]*)(?=\=)/],
  ["kw", /^(const|let|var|import|from|await|return|if|else|function|new|class|extends|type|interface|as|event|data)\b/],
  ["bool", /^(true|false|null|undefined|\d+(?:\.\d+)?)\b/],
  ["op", /^([{}()[\].,;=+\-*/<>:]+)/],
];

function tokenizeLine(line) {
  const tokens = [];
  let rest = line;

  while (rest) {
    const match = patterns
      .map(([type, regex]) => {
        const value = rest.match(regex)?.[0];
        return value ? { type, value } : null;
      })
      .find(Boolean);

    if (match) {
      tokens.push({ text: match.value, type: match.type });
      rest = rest.slice(match.value.length);
      continue;
    }

    const next = rest.search(/\/\/|<!--|```|"|'|`|<\/?|[:@]?[A-Za-z_][\w-]*(?=\=)|\b(?:const|let|var|import|from|await|return|if|else|function|new|class|extends|type|interface|as|event|data|true|false|null|undefined|\d+(?:\.\d+)?)\b|[{}()[\].,;=+\-*/<>:]+/);
    const end = next <= 0 ? 1 : next;
    tokens.push({ text: rest.slice(0, end), type: "" });
    rest = rest.slice(end);
  }

  return tokens;
}

const highlightedLines = computed(() => props.code.split("\n").map(tokenizeLine));
</script>

<template>
  <div class="pixel-window pxl-corner-lg pxl-shadow">
    <div class="pixel-titlebar">
      <span></span><span></span><span></span>
      <b>{{ title }}</b>
    </div>
    <pre class="pixel-code" :class="{ compact }"><code><span
      v-for="(line, lineIndex) in highlightedLines"
      :key="lineIndex"
      class="pixel-code-line"
    ><span
      v-for="(token, tokenIndex) in line"
      :key="tokenIndex"
      :class="token.type && `tok ${token.type}`"
    >{{ token.text }}</span></span></code></pre>
    <slot />
  </div>
</template>
