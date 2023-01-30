<template>
  <div class="right_top">
    <div v-if="list.length" class="notice_list">
      <div v-for="(item, index) in list" :key="index" class="list_item" @click="handleClick">
        <span class="icon"></span>
        <span class="title">{{ item.title }}</span>
        <span class="date">{{ item.date }}</span>
        <span class="type" :style="{ visibility: item.type === 'NEW' ? 'inherit' : 'hidden' }"
          >NEW</span
        >
      </div>
    </div>
    <el-empty v-else description="暂无数据" />
  </div>
</template>

<script setup lang="ts">
import { useCommon } from '@/hooks'
import { defaultProps } from '../props'

const props = defineProps(defaultProps)

const { reqApi, message, router } = useCommon()
const list = ref<Recordable[]>([])

const handleClick = () => {
  router.push({
    name: 'instionList'
  })
}
</script>

<style lang="scss" scoped>
.right_top {
  padding: 10px;
  .notice_list {
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #ffffff;
    .list_item {
      padding-bottom: 5px;
      display: flex;
      align-items: center;
      cursor: pointer;
      .icon {
        display: inline-block;
        width: 6px;
        height: 6px;
        background: #4a87c9;
        border-radius: 50%;
      }
      .title {
        flex: 1;
        padding-left: 10px;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
      }
      .date {
        padding-left: 10px;
      }
      .type {
        font-size: 10px;
        padding: 1px 2px;
        background: #f76a65;
        border-radius: 3px;
        margin-left: 10px;
      }
    }
  }
  :deep(.el-empty) {
    padding: 0;
  }
  :deep(.el-empty__image) {
    width: 55px;
  }
}
</style>
