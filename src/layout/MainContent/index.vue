<template>
  <div class="main-container mt-21 relative" :class="'ml-50'">
    <div class="main-content p-6">
      <page/>
    </div>
  </div>
</template>
<script lang="ts" setup>
import page from '../components/page.vue'
</script>
<style lang="scss" scoped>
.main-container {
  background-color: $color-F5F6F8;
  min-height: calc(100% - 84px);
}
</style>
