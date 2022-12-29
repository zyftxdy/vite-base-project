<template>
  <div class="dashboard">
    <image-view src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMjA3fDB8MXxzZWFyY2h8Mnx8dGVjaHxlbnwwfHx8fDE2NjIwMjc1MzI&ixlib=rb-1.2.1&q=80&w=500" class="w-[200px]"/>
    <div class="content-box mb-4">
      <div class="flex items-center mb-2">
        <page-title title="运营概况" class="flex-1 !mb-0"/>
        <el-tree-select
          v-model="deptIds"
          :data="deptList"
          :props="{
            label: 'name',
            children: 'childList'
          }"
          value-key="deptId"
          placeholder="请选择主管部门"
          multiple
          collapse-tags
          clearable
          check-strictly
          show-checkbox
          check-on-click-node
        />
      </div>
      <div class="grid grid-cols-5">
        <card-meta
          v-for="item in dList"
          :key="item.type"
          :title="item.num"
          :description="item.name"
          direction="vertical"
          class='dash-gen'
          :style="{background: item.bg}">
          <template #avatar>
            <el-image :src="item.icon" class="w-12 h-12"/>
          </template>
        </card-meta>
      </div>
    </div>
    <div class="content-box mb-4">
      <page-title title="待办事项"/>
      <div class="grid grid-cols-4">
        <card-meta
          v-for="item in tList"
          :key="item.name"
          :description="item.name"
          class="dash-sth"
          @click="goPage(item.type)">
          <template #avatar>
            <el-image :src="item.icon" class="w-14 h-14"/>
          </template>
          <template #title>
            <count-to :value="item.num"></count-to>
          </template>
        </card-meta>
      </div>
    </div>
    <div class="content-box mb-4">
      <freeze-echart :deptIds="deptIds"/>
    </div>
    <div class="content-box mb-4">
      <freeze-list :deptIds="deptIds"/>
    </div>
    <div class="content-box mb-4">
      <thaw-echart :deptIds="deptIds"/>
    </div>
    <div class="content-box mb-4">
      <thaw-list :deptIds="deptIds"/>
    </div>
    <div class="content-box">
      <order-list :deptIds="deptIds"/>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCommon, useDepart, usePerm, useRequest } from '@/hooks'
import { dataList, todoList } from './enum'
import { formatNum } from '@/utils/mUtils'
import freezeList from './components/freezeList.vue'
import freezeEchart from './components/freezeEchart.vue'
import thawList from './components/thawList.vue'
import thawEchart from './components/thawEchart.vue'
import orderList from './components/orderList.vue'
import router from '@/router'

const { reqApi } = useCommon()

const deptIds = ref<string[]>([])
const { deptList } = useDepart({
  FnType: 'departLimit',
  immediate: true,
  onSuccess: () => deptList.value = unref(deptList)[0]?.pid === 0 ? unref(deptList)[0].childList : unref(deptList)
})
const { result: dList } = useRequest<Recordable[]>(() => reqApi.dashboard.getSupeTotal({ deptIds: unref(deptIds) }), {
  defaultValue: dataList(),
  immediate: true,
  refreshDeps: [() => unref(deptIds)],
  formatResult: res => {
    return res ? unref(dList).map(item => {
      item.num = formatNum(res[item.type]) ?? 0
      return item
    }) : dataList()
  }
})
const { result: tList } = useRequest<Recordable[]>(() => reqApi.dashboard.waitDoneTotal({ deptIds: unref(deptIds) }), {
  defaultValue: todoList(),
  immediate: true,
  refreshDeps: [() => unref(deptIds)],
  formatResult: res => {
    return res ? unref(tList).map(item => {
      item.num = res[item.type] ?? 0
      return item
    }) : todoList()
  }
})

const appealPerm = usePerm('09444fd98fc1f87585')
const complainPerm = usePerm('09444fd98fc1f87589')
const goPage = (type: string) => {
  if (type === 'appeal' && appealPerm) router.push('/appeal')
  if (type === 'complaint' && complainPerm) router.push('/complain')
}
</script>

<style lang="scss" scoped>
.dash-gen{
  @apply py-4 px-5 m-2 rounded-lg hover:shadow-xl transition-shadow duration-300;
}
.dash-sth{
  @apply cursor-pointer justify-center py-2 border-r border-dashed border-slate-300 last:border-0;
}
</style>
