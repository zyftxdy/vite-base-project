<template>
  <el-config-provider :locale="zhCn">
    <router-view></router-view>
  </el-config-provider>
</template>

<script lang="ts" setup>
import mitt from 'mitt'
import { useAppStore } from '@/store'
import { useCommon, useRequest } from './hooks'
import { useFavicon, useTitle } from '@vueuse/core'
import zhCn from 'element-plus/lib/locale/lang/zh-cn'

const { reqApi } = useCommon()
const icon = useFavicon('https://quanqizhixiao-public-1251355418.file.myqcloud.com/channel/favicon.ico')
const title = useTitle('校外教培机构综合监管平台')

provide('emitter', mitt())

const appStore = useAppStore()

useRequest(() => reqApi.common.channelInfo(), {
  immediate: true,
  onSuccess: data => {
    appStore.setSiteName(data?.siteName)
    appStore.SET_LOGINBG(data?.picture5)
    appStore.SET_LOGINLOGO(data?.picture6)
    appStore.SET_LOGINTEXT(data?.ad7)
    appStore.SET_APPNAME(data?.ad8)
    appStore.SET_APPLOGO(data?.picture7)
    icon.value = data?.picture8 ?? icon.value
    title.value = data?.ad9 ?? title.value
  }
})
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
  background: #F5F6F8;
}
</style>
