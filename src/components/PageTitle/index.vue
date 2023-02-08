<template>
  <div class="page_title flex items-center margin-bottom15">
    <span :style="{ background: bgColor }"></span>
    <span :style="{ color: textColor }">{{ title }}</span>
    <template v-if="desc">
      <el-tooltip effect="light" :content="desc" placement="top">
        <svg-icon class="ml-1" icon-class="desTip" />
      </el-tooltip>
    </template>
  </div>
</template>

<script setup lang="ts">
defineProps({
  title: {
    type: String,
    default: ''
  },
  desc: {
    type: String,
    default: ''
  },
  bgColor: {
    type: String,
    default: '#467DD8'
  },
  textColor: {
    type: String,
    default: '#373E4F'
  }
})
</script>

<style lang="scss" scoped>
.page_title {
  span {
    &:nth-child(1) {
      width: 4px;
      height: 14px;
    }
    &:nth-child(2) {
      padding-left: 5px;
      font-size: 16px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
    }
  }
}
</style>
