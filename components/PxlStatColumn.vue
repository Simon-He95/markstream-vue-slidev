<script setup>
defineProps({
  items: {
    type: Array,
    required: true,
  },
  note: {
    type: String,
    default: "",
  },
});
</script>

<template>
  <div class="pixel-stat-column">
    <div
      v-for="item in items"
      :key="item.label"
      class="pixel-stat pxl-corner-md pxl-shadow"
    >
      <span>{{ item.label }}</span>
      <b>{{ item.value }}</b>
      <small v-if="item.caption">{{ item.caption }}</small>
    </div>
    <small v-if="note" class="method-note">{{ note }}</small>
  </div>
</template>
