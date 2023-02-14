<template>
  <card title="卡片组件演示" :loading="loading"> 1234 </card>
</template>

<script setup lang="ts">
import { useTimeoutFn } from '@vueuse/shared'

const loading = ref(true)
useTimeoutFn(() => {
  loading.value = false
}, 3000)
</script>

<style scoped></style>
