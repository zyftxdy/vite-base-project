<template>
  <div class="desc">
    <card title="基础示例（无边框）" :loading="loading" class="mb-2">
      <description :schema="schema" :data="mockData" />
    </card>
    <card title="基础示例（有边框）" :loading="loading" class="mb-2">
      <description :schema="schema" :data="mockData" border />
    </card>
    <card title="垂直示例（无边框）" :loading="loading" class="mb-2">
      <description :schema="schema" :data="mockData" direction="vertical" />
    </card>
    <card title="垂直示例（有边框）" :loading="loading">
      <description :schema="schema" :data="mockData" direction="vertical" border />
    </card>
  </div>
</template>

<script setup lang="ts">
import { useTimeoutFn } from '@vueuse/shared'
import { schema } from './data'

const loading = ref(true)
useTimeoutFn(() => {
  loading.value = false
}, 3000)

const mockData: Recordable = {
  username: 'test',
  nickName: 'VB',
  age: '123',
  phone: '15695909xxx',
  email: '190848757@qq.com',
  addr: '厦门市思明区',
  sex: '男',
  certy: '3504256199xxxxxxxxx',
  tag: 'orange'
}
</script>
