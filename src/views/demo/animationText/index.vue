<template>
  <card title="文本动画演示">
    <animation-text :source="source" class="mb-4" />
    <animation-text :source="source" :delay="60" />
  </card>
</template>

<script setup lang="ts">
const source = ref('演示文本动画演示文本动画演示文本动画演示文本动画演示文本动画')
</script>

<style scoped></style>
