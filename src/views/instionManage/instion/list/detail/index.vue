<template>
  <div class="detail content-box" style="padding-top: 8px;">
    <el-tabs v-model="activeName" @tab-change="handleClick">
      <el-tab-pane label="机构概况" name="info"/>
      <el-tab-pane label="订单管理" name="order"/>
      <el-tab-pane label="一课一销详情" name="transfer"/>
      <el-tab-pane v-if="siteName === 'sxxh'" label="手动划拨资金" name="transferHand"/>
      <!-- <el-tab-pane label="实校验证" name="witness"/>
      <el-tab-pane label="已备案课程" name="course"/> -->
    </el-tabs>
    <general v-if="activeName === 'info'"/>
    <order ref="orderRef" v-if="activeName === 'order'"/>
    <transfer v-if="activeName === 'transfer'" @goDetail="goDetail"/>
    <transfer-hand ref="transferHandRef" v-if="activeName === 'transferHand'"/>
    <witness v-if="activeName === 'witness'"/>
    <course v-if="activeName === 'course'"/>
  </div>
</template>

<script setup lang="ts">
import { useCommon } from '@/hooks'
import { useAppStore } from '@/store'
import { storeToRefs } from 'pinia'
import { useRouteQuery } from '@vueuse/router'
import general from './components/general/index.vue'
import order from './components/order/index.vue'
import transfer from './components/transfer/index.vue'
import TransferHand from './components/transferHand/index.vue'
import witness from './components/witness/index.vue'
import course from './components/course/index.vue'
import type { LocationQueryValue } from 'vue-router'
import type { TabPaneName } from 'element-plus'

const { siteName } = storeToRefs(useAppStore())
const { router, route } = useCommon()
const activeName = ref('info')

if (!route.query.id) router.go(-1)

// 不能在回调函数中使用inject
// inject() can only be used inside setup() or functional components.
const handleClick = (e: TabPaneName) => {
  router.push({
    query: {
      tab: e,
      id: route.query.id
    }
  })
}

watch(() => route.query, val => {
  activeName.value = val.tab as LocationQueryValue ?? 'info'
}, {
  immediate: true
})

const orderRef = ref<InstanceType<typeof order>>()
const goDetail = (id: string) => {
  activeName.value = 'order'
  nextTick(() => {
    unref(orderRef)!.operState.showDetail = true
    unref(orderRef)!.operState.orderId = id
  })
}

const transferHandRef = ref<InstanceType<typeof TransferHand>>()
const goDetailH = () => {
  activeName.value = 'transferHand'
  nextTick(() => {
    unref(transferHandRef)!.operState.showDetail = true
  })
}

onMounted(() => {
  route.query?.type === 'orderDetail' && goDetail(useRouteQuery('orderId', '').value)
  route.query?.type === 'transferHand' && goDetailH()
})
</script>
