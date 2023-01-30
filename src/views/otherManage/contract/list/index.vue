<template>
  <div class="instion_list content-box">
    <usual-search
      v-model:list-query="queryState.listQuery"
      :search-options="queryState.searchOptions"
      @select="handleSelect"
    />

    <usual-table
      v-model:page-num="queryState.listQuery.current"
      v-model:page-size="queryState.listQuery.size"
      row-key="schoolId"
      :loading="listState.loading"
      :columns="listState.columns"
      :list="listState.list"
      :total="listState.total"
      @pagination="getList"
    >
      <template #action="{ row }">
        <el-button link type="primary" @click="handleClick()">下载</el-button>
      </template>
    </usual-table>
  </div>
</template>

<script setup lang="ts">
import { downloadUrl } from '@/utils/download'
import { columns, searchOptions, listQuery } from './enum'

const queryState = reactive({
  listQuery: listQuery(),
  searchOptions: searchOptions()
})

const listState = reactive({
  list: [
    {
      a: '中小学生校外培训服务合同',
      b: '10',
      c: '2021-1-1 10：00：00',
      d: 'admin',
      status: '已发布'
    }
  ],
  columns: columns,
  total: 0,
  loading: false
})

const handleSelect = () => {
  queryState.listQuery.current = 1
  getList()
}
const getList = async () => {
  listState.loading = true
  listState.loading = false
}
getList()
const handleClick = () => {
  downloadUrl({
    url: 'https://quanqizhixiao-public-1251355418.cos.ap-shanghai.myqcloud.com/file/%E4%B8%AD%E5%B0%8F%E5%AD%A6%E7%94%9F%E6%A0%A1%E5%A4%96%E5%9F%B9%E8%AE%AD%E6%9C%8D%E5%8A%A1%E5%90%88%E5%90%8C.docx',
    fileName: '中小学生校外培训服务合同.docx'
  })
}
</script>
