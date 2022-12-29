<template>
  <div class="head_bar ml-50 fixed inset-x-0 top-0">
    <div class="h-12 leading-12 flex items-center border-b text-sm box-border">
      <div class="left_bar pl-4 flex-1">{{ appName }}</div>
      <div class="right_bar">
        <span class="notice"><svg-icon icon-class="notice"/></span>
        <span class="user-bar">
          <span ref="buttonRef" class="user-info" v-click-outside="onClickOutside">{{ userInfo.name }}</span>
          <el-popover
            ref="popoverRef"
            :virtual-ref="buttonRef"
            :width="220"
            :show-arrow="false"
            trigger="click"
            virtual-triggering
            popper-class="box-content">
            <personal-panel/>
          </el-popover>
        </span>
      </div>
    </div>
    <div class="h-tab-container">
      <div class="flex-1 h-9 overflow-x-auto whitespace-nowrap">
        <span
          class="tabs"
          v-for="item in mainTabs"
          :key="item.name"
          @click="selectedTabHandle(item.name)"
          :class="mainTabsActiveName === item.name ? 'active' : ''">
          <span>{{ item.title }}</span>
          <el-icon
            class="relative"
            :class="mainTabsActiveName === item.name ? '' : '!w-0'"
            @click.stop="removeTabHandle(item.name)"
          ><i-ep-close/></el-icon>
        </span>
      </div>
      <div
        v-if="mainTabs.length > 1"
        class="close w-24 min-w-24 flex items-center text-xs"
        @click="handleClick">
        <el-icon class="mr-1"><i-ep-close /></el-icon>
        关闭标签页
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAppStore } from '@/store'
import { storeToRefs } from 'pinia'
import { useCommon, useTabs } from '@/hooks'
import localCache from '@/utils/cache/storage'
import { ClickOutside as vClickOutside } from 'element-plus'
import personalPanel from '../components/personalPanel.vue'
import type { RouteRecordName } from 'vue-router'

const { appName } = storeToRefs(useAppStore())
const userInfo = computed(() => localCache.get('userInfo'))
const buttonRef = ref()
const popoverRef = ref()
const onClickOutside = () => {
  unref(popoverRef).popperRef?.delayHide?.()
}

const { route, router } = useCommon()
const { mainTabs, mainTabsActiveName } = useTabs()

const selectedTabHandle = (name: RouteRecordName) => {
  if (route.name === name) return
  router.push({ name: name })
}
const removeTabHandle = (tabName: RouteRecordName) => {
  if (mainTabs.value.length > 1) {
    mainTabs.value = mainTabs.value.filter(item => item.name !== tabName)
    // 当前选中tab被删除
    if (tabName === mainTabsActiveName.value) {
      router.push({ name: mainTabs.value[mainTabs.value.length - 1].name })
      .then(() => {
        mainTabsActiveName.value = route.name as RouteRecordName
      })
    }
  }
}
const handleClick = () => {
  let list = mainTabs.value
  list = list.filter((_, index) => index === 0)
  mainTabs.value = list
  if (list[0].name !== mainTabsActiveName.value) {
    router.push({ name: mainTabs.value[mainTabs.value.length - 1].name })
      .then(() => {
        mainTabsActiveName.value = route.name as RouteRecordName
      })
  }
}
</script>

<style lang="scss" scoped>
.head_bar{
  background: $color-fff;
  z-index: 1000;
  .left_bar{
    font-family: PingFangSC-Regular,PingFang SC;
    font-weight: 400;
    color: $color-373e4f;
    box-sizing: border-box;
  }
  .right_bar{
    box-sizing: border-box;
    .notice{
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      &::after{
        content: '';
        display: inline-block;
        width: 1px;
        height: 20px;
        background: $color-ecf1;
        margin: 0px 10px;
        transform: translateY(6px);
      }
    }
    .user-bar{
      padding-right: 20px;
      font-family: PingFangSC-Regular, PingFang SC;
      color: $color-373e4f;
      cursor: pointer;
    }
  }

  .h-tab-container{
    @apply relative flex px-2 border-b bg-white border-gray-200 z-1010 text-sm h-9 leading-9;
    .tabs{
      @apply w-max inline-block px-2 mx-2 h-6 leading-6 rounded-sm;
      cursor: pointer;
      font-size: 12px;
      color: #666666;
      border: 1px solid #d8dce5;
      box-sizing: border-box;
      .el-icon{
        top: 2px;
        left: 2px;
        transition: width .3s;
      }
      &:hover{
        .el-icon{
          width: 12px !important;
        }
      }
      &.active{
        border-color: #467DD8;
        color: #467DD8;
      }
    }
  }
  .close{
    cursor: pointer;
    background: $color-fff;
    z-index: 1009;
    &::before{
      content: '';
      width: 1px;
      height: 20px;
      background: #d8dce5;
      margin-right: 4px;
    }
  }
}
</style>
