<template>
  <card title="图片组件展示">
    <div class="image-t mb-2">
      <div class="text-base font-bold">点击图片可大图预览，大图预览可缩放放大、移动</div>
      <el-button class="btn-usual btn-border-color" @click="onClick">{{
        preview ? '关闭预览' : '开启预览'
      }}</el-button>
    </div>
    <image-view
      :preview="preview"
      src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMjA3fDB8MXxzZWFyY2h8Mnx8dGVjaHxlbnwwfHx8fDE2NjIwMjc1MzI&ixlib=rb-1.2.1&q=80&w=500"
      class="w-[200px]"
    />
  </card>
</template>

<script setup lang="ts">
const preview = ref(true)

const onClick = () => {
  preview.value = !preview.value
}
</script>

<style scoped></style>
