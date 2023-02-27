<template>
  <card title="table示例" class="mb-2">
    <usual-search :schema="searchSchema" @register="register" @select="handleSelect">
      <template #mobile="{ model, field }">
        <el-input v-model="model[field]" placeholder="请输入电话号码" class="w-[220px]" />
      </template>
    </usual-search>
    <usual-table
      v-model:page-num="searchFrom.pageNum"
      v-model:page-size="searchFrom.pageSize"
      :loading="listState.loading"
      :list="listState.list"
      :columns="columns"
      :total="listState.total"
      :show-select="true"
      :show-setting="true"
      @pagination="pagination"
      @select="onSelect"
    ></usual-table>
  </card>
</template>

<script setup lang="ts">
import { useSearch } from '@/components/UsualSearch/hooks/useSearch'
import { searchSchema, getBasicData, columns } from './data'

const listState = reactive({
  list: getBasicData(),
  total: getBasicData().length,
  loading: false
})
const { register, searchFrom } = useSearch()
const handleSelect = (e: any) => {
  console.log(searchFrom.value, e)
}
const pagination = () => {}
const onSelect = (e: any) => {
  console.log(e)
}
</script>
