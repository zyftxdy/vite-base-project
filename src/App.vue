<template>
  <el-config-provider :locale="zhCn">
    <router-view></router-view>
  </el-config-provider>
</template>

<script lang="ts" setup>
import mitt from 'mitt'
import setting from './settings'
import { useAppStore } from '@/store'
import { useFavicon, useTitle } from '@vueuse/core'
import zhCn from 'element-plus/lib/locale/lang/zh-cn'

const appStore = useAppStore()
useFavicon(setting.favIcon)
useTitle(appStore.appName)

provide('emitter', mitt())
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  position: absolute;
  top: 0px;
  bottom: 0px;
  left: 0px;
  right: 0px;
  background: #f5f6f8;
}
</style>
