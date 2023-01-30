<template>
  <div class="main-container mt-21 relative" :class="'ml-50'">
    <div class="main-content p-6">
      <router-view v-slot="{ Component, route }">
        <transition name="fade" mode="out-in">
          <component :is="Component" :key="route.path" />
        </transition>
      </router-view>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.main-container {
  background-color: $color-F5F6F8;
  min-height: calc(100% - 84px);
}
</style>
