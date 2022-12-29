<template>
  <template v-if="routePath">
    <head-bar/>
    <nav-bar/>
    <main-content/>
  </template>
  <template v-else>
    <router-view/>
  </template>
</template>

<script setup lang="ts">
import NavBar from './Navbar/index.vue'
import HeadBar from './HeadBar/index.vue'
import MainContent from './MainContent/index.vue'
import { useCommon } from '@/hooks'

const { route } = useCommon()
const routePath = computed(() => route.path !== '/statistics')
</script>
