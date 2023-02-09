<template>
  <div class="nav_bar fixed left-0 bottom-0 top-0 w-50">
    <div class="logo_bar flex items-center justify-center h-12 leading-12 relative w-full">
      <img :src="appStore.appLogo" />
    </div>
    <el-menu
      class="!absolute top-12 bottom-0 text-left overflow-y-auto w-full !border-r-0"
      :default-active="activeMenu"
      unique-opened
      :background-color="appStore.menuBgColor"
      text-color="#FFFFFF"
      @open="handleOpen"
      @close="handleClose"
      @select="handleSelect"
    >
      <menu-tree v-for="item in menuStore.navTree" :key="item.resourceId" :menu="item" />
    </el-menu>
  </div>
</template>

<script setup lang="ts">
import { useMenuStore, useAppStore } from '@/store'
import { useTabs, useCommon } from '@/hooks'
import menuTree from '../components/menuTree.vue'
import type { RouteLocationNormalizedLoaded, RouteRecordName } from 'vue-router'

const menuStore = useMenuStore()
const appStore = useAppStore()
const { route } = useCommon()
const { mainTabs, mainTabsActiveName } = useTabs()
const activeMenu = ref('')
const handleRoute = (route: RouteLocationNormalizedLoaded) => {
  // tab标签页选中, 如果不存在则先添加
  let tab = mainTabs.value.filter(item => item.name === route.name)[0]
  if (!tab) {
    tab = {
      name: route.name as RouteRecordName,
      title: route.meta.title,
      icon: route.meta.icon,
      query: route.query
    }
    mainTabs.value = mainTabs.value.concat(tab)
  }
  mainTabsActiveName.value = tab.name
  const index = mainTabs.value.findIndex(item => Object.keys(item.query).length)
  if (index !== -1 && mainTabsActiveName.value !== mainTabs.value[index].name) {
    const list = unref(mainTabs)
    list.splice(index, 1)
    mainTabs.value = list
  }
}

// 使用watchEffect时，删除当前mainTabsActiveName时，路由会跳转，但是mainTabs并不会删除tabs 原因？？？
// 是不是收集了mainTabs，mainTabsActiveName，route的依赖导致的？？？
// watchEffect(() => handleRoute(route))

watch(
  () => route,
  val => {
    activeMenu.value = val.meta.activeMenu || val.path
    handleRoute(val)
  },
  {
    immediate: true,
    deep: true
  }
)

const handleOpen = () => {
  console.log('handleOpen')
}
const handleClose = () => {
  console.log('handleClose')
}
const handleSelect = () => {
  console.log('handleselect')
}
</script>

<style lang="scss" scoped>
.nav_bar {
  z-index: 1020;
  .logo_bar {
    background: v-bind('appStore.menuBgColor');
    cursor: pointer;
    padding: 5px 10px;
    box-sizing: border-box;
    img {
      width: 150px;
      height: auto;
      border-radius: 0;
    }
  }
  .is-active,
  :deep(.el-menu-item.is-active) {
    background-color: $theme-color !important;
    color: #ffffff !important;
  }
}
</style>
