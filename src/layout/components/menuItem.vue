<template>
  <svg-icon v-if="icon" :icon-class="icon" class="mt-[-2px]" />
  <span class="menu-title-i">{{ title }}</span>
</template>

<script setup lang="ts">
defineProps({
  icon: String as PropType<unionType>,
  title: String
})
</script>

<style lang="scss" scoped>
.menu-title-i {
  padding-left: 5px;
  text-decoration: none;
}
</style>
