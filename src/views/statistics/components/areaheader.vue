<template>
  <div class="area_header">
    <div class="area_h_l">
      <span class="icon"></span>
      <span>{{ title }}</span>
    </div>
    <div class="area_h_r">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  title: {
    type: String,
    default: ''
  }
})
</script>

<style lang="scss" scoped src="@/styles/statistics/areaHeader.scss" />
