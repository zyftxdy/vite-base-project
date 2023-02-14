<template>
  <div class="card-box grid grid-cols-2 gap-4">
    <card title="基础卡片组件" :loading="loading"> 内容 </card>
    <card
      :loading="loading"
      hoverable
    >
      <template #title>
        <span>基础卡片组件--hover</span>
      </template>
      <template #extra>
        <el-button class="btn-small btn-border-color">按钮示例</el-button>
      </template>
      内容
    </card>
    <card
      :loading="loading"
      :tabs-list="tabsList"
      v-model:tabKey="tabKey">
      <span v-if="tabKey === 'a'">内容1</span>
      <span v-else>内容2</span>
    </card>
    <card
      title="卡片组件-tabs"
      :loading="loading"
      :tabs-list="tabsList"
      v-model:tabKey="tabKey">
      <template #extra>
        <el-button class="btn-small btn-border-color">按钮示例</el-button>
      </template>
      <template #tabsExtra>
        <el-button class="btn-small btn-border-color">按钮示例</el-button>
      </template>
      <span v-if="tabKey === 'a'">内容1</span>
      <span v-else>内容2</span>
    </card>
  </div>
</template>

<script setup lang="ts">
import { useTimeoutFn } from '@vueuse/shared'

const loading = ref(true)
useTimeoutFn(() => {
  loading.value = false
}, 3000)

const tabKey = ref('a')
const tabsList = [
  { label: '标签页1', name: 'a' },
  { label: '标签页2', name: 'b' }
]
</script>

<style lang="scss" scoped></style>
