<template>
  <div class="card-box grid grid-cols-2 gap-4">
    <card title="基础卡片组件" :loading="loading"> 1234 </card>
    <card title="基础卡片组件" :loading="loading" hoverable> 1234 </card>
    <card title="基础卡片组件" :loading="loading"> 1234 </card>
    <card title="基础卡片组件" :loading="loading"> 1234 </card>
  </div>
</template>

<script setup lang="ts">
import { useTimeoutFn } from '@vueuse/shared'

const loading = ref(true)
useTimeoutFn(() => {
  loading.value = false
}, 3000)
</script>

<style lang="scss" scoped></style>
