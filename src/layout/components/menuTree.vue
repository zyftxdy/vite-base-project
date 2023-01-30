<template>
  <template v-if="menu.children?.length >= 1">
    <el-sub-menu :index="resolvePath(menu.path)">
      <template #title>
        <menu-item :icon="menu.meta.icon" :title="menu.title" />
      </template>
      <menu-tree v-for="item in menu.children" :key="item.resourceId" :menu="item" />
    </el-sub-menu>
  </template>
  <template v-else>
    <router-link :to="resolvePath(menu.path)">
      <el-menu-item :index="resolvePath(menu.path)">
        <menu-item :icon="menu.meta.icon" :title="menu.title" />
      </el-menu-item>
    </router-link>
  </template>
</template>

<script setup lang="ts">
import menuItem from './menuItem.vue'
import { RouteMenu } from '#/menu'

const props = defineProps({
  menu: {
    type: Object as PropType<RouteMenu>,
    default: () => {}
  }
})
const bg_color = ref('#212433')

const resolvePath = (routePath: string) => {
  return '/' + routePath
}
</script>

<style lang="scss" scoped>
.el-sub-menu .el-menu-item {
  background-color: v-bind('bg_color') !important;
}
.el-menu a {
  text-decoration-line: none;
}
.el-menu-item {
  height: 48px;
  line-height: 48px;
}
</style>
