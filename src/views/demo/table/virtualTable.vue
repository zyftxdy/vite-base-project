<template>
  <card title="table-v2示例" class="mb-2">
    <usual-search
      :schema="searchSchema"
      :show-export="true"
      :show-arrow="true"
      @register="register"
      @select="handleSelect">
      <template #mobile="{ model, field }">
        <el-input v-model="model[field]" placeholder="请输入电话号码" class="w-[220px]" />
      </template>
    </usual-search>
    <usual-table
      v-model:page-num="searchFrom.pageNum"
      v-model:page-size="searchFrom.pageSize"
      version="V2"
      :loading="listState.loading"
      :list="listState.list"
      :columns="columns"
      :total="listState.total"
      @pagination="pagination"
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
const handleSelect = () => {
  console.log(searchFrom.value)
}
const pagination = () => {}
</script>
