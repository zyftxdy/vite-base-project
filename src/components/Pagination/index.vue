<template>
  <div class="pagination-con">
    <el-pagination
      v-model:currentPage="currentPage"
      v-model:page-size="limit"
      :page-sizes="pageSizes"
      :background="background"
      :layout="layout"
      :total="total"
      @sizeChange="() => $emit('pagination')"
      @currentChange="() => $emit('pagination')"/>
  </div>
</template>

<script setup lang="ts">
import { pageProps } from '../UsualTable/props'
import { scrollTo } from '@/utils/scrollTo'

const props = defineProps(pageProps)
const emits = defineEmits(['update:page-num', 'update:page-size', 'pagination'])

const currentPage = computed({
  get: () => props.pageNum,
  set: val => {
    props.scrollTop && scrollTo(0)
    emits('update:page-num', val)
  }
})
const limit = computed({
  get: () => props.pageSize,
  set: val => {
    props.scrollTop && scrollTo(0)
    emits('update:page-size', val)
  }
})
</script>
