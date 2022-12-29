<template>
  <div class="statistics">
    <div class="s_top flex items-center margin-bottom30">
      <div class="s_t_l">
        <span class="pr-2">大屏实时数据</span>
        <span>{{ time }}</span>
      </div>
      <div class="s_t_c">
        <span class="line line_l"></span>
        <span>教培机构监管平台-数据大盘</span>
        <span class="line line_r"></span>
      </div>
      <div class="s_t_r flex items-center justify-end">
        <div class="s_t_select">
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
        <div class="s_t_oper">
          <i v-if="!isFullscreen" class="iconfont icon-quanping" @click="toggle">全屏</i>
          <i v-else class="iconfont icon-tuichuquanping" @click="toggle">退出全屏</i>
          <i class="iconfont icon-fanhui" @click="goBack">返回</i>
        </div>
      </div>
    </div>

    <!-- 数据统计 -->
    <static-header :dept-ids="deptIds"/>

    <div class="s_content flex">
      <div class="s_left">
        <!-- 监管资金统计 -->
        <div class="area_line margin-bottom30 margin-right30">
          <area-header title="监管资金统计"/>
          <div class="area_line_c">
            <left-top :dept-ids="deptIds"/>
          </div>
        </div>
        <!-- 解冻资金统计 -->
        <div class="area_line margin-bottom30 margin-right30">
          <area-header title="解冻资金统计"/>
          <div class="area_line_c">
            <left-bottom :dept-ids="deptIds"/>
          </div>
        </div>
      </div>

      <div class="s_center">
        <!-- 教培机构区域分布情况 -->
        <div class="area_line margin-bottom30 margin-right30">
          <area-header title="教培机构区域分布情况"/>
          <center-top class="area_line_c"/>
        </div>

        <!-- 教培机构日常经营管理 -->
        <div class="area_line margin-bottom30 margin-right30">
          <area-header title="教培机构日常经营管理"/>
          <center-bottom :dept-ids="deptIds" class="area_line_c"/>
        </div>
      </div>

      <div class="s_right">
        <!-- 智能风险监控 -->
        <div class="area_line margin-bottom30">
          <area-header title="智能风险监控"/>
          <right-top :dept-ids="deptIds" class="area_line_c"/>
        </div>

        <!-- 机构投诉统计 -->
        <div class="area_line margin-bottom30">
          <area-header title="机构投诉统计"/>
          <div class="area_line_c">
            <right-center :dept-ids="deptIds"/>
          </div>
        </div>

        <!-- 备案课程统计 -->
        <div class="area_line margin-bottom30">
          <area-header title="备案课程统计"/>
          <right-bottom :dept-ids="deptIds" class="area_line_c"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useFullscreen } from '@vueuse/core'
import { useCommon, useDepart } from '@/hooks'
import { useMenuStore } from '@/store'
import { formatDate } from '@/utils/dateUtil'
import areaHeader from './components/areaheader.vue'
import staticHeader from './components/staticHeader.vue'
import leftTop from './components/leftTop.vue'
import leftBottom from './components/leftBottom.vue'
import centerTop from './components/centerTop.vue'
import centerBottom from './components/centerBottom.vue'
import rightTop from './components/rightTop.vue'
import rightCenter from './components/rightCenter.vue'
import rightBottom from './components/rightBottom.vue'

const menuStore = useMenuStore()
const { router } = useCommon()
const { deptList } = useDepart({
  FnType: 'departLimit',
  immediate: true,
  onSuccess: () => deptList.value = unref(deptList)[0]?.pid === 0 ? unref(deptList)[0].childList : unref(deptList)
})
const { isFullscreen, toggle } = useFullscreen(null, { autoExit: true })
const deptIds = ref<string[]>([])

const goBack = () => {
  unref(isFullscreen) && toggle()
  const routers = menuStore.routerData
  router.push({
    path: (routers[0].path === 'statistics' && routers.length > 1) ? `/${routers[1].path}` : `/${routers[0].path}`
  })
}

const time = ref<string>('')
const timer = ref<IntervalHandle>()
timer.value = setInterval(() => {
  time.value = formatDate(new Date(), 'YYYY-MM-DD HH:mm:ss')
}, 1000)

onBeforeUnmount(() => {
  clearInterval(unref(timer)!)
})
</script>

<style lang="scss" scoped src="./index.scss"/>
