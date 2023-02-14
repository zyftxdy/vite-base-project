<template>
  <template v-if="menu?.children?.length">
    <el-sub-menu :index="resolvePath(menu.path)">
      <template #title>
        <menu-item :icon="menu.meta.icon" :title="menu.meta.title" />
      </template>
      <menu-tree v-for="item in menu.children" :key="item.path" :menu="item" />
    </el-sub-menu>
  </template>
  <template v-else>
    <router-link :to="resolvePath(menu.path)">
      <el-menu-item :index="resolvePath(menu.path)">
        <menu-item :icon="menu.meta.icon" :title="menu.meta.title" />
      </el-menu-item>
    </router-link>
  </template>
</template>

<script setup lang="ts">
import menuItem from './menuItem.vue'
import { useAppStore } from '@/store'
import { RouteMenu } from '#/menu'

defineProps({
  menu: {
    type: Object as PropType<RouteMenu>,
    default: () => {}
  }
})
const appStore = useAppStore()
const resolvePath = (routePath: string) => {
  return /^\//.test(routePath) ? routePath : '/' + routePath
}
</script>

<style lang="scss" scoped>
.el-sub-menu .el-menu-item {
  background-color: v-bind('appStore.subMenuBgColor') !important;
}
.el-menu a {
  text-decoration-line: none;
}
.el-menu-item {
  height: 48px;
  line-height: 48px;
}
</style>
