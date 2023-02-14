<template>
  <card title="tinymce富文本示例">
    <tinymce
      v-model="content"/>

    <div class="result pt-4">富文本结果：{{ content }}</div>
  </card>
</template>

<script setup lang="ts">
const content = ref('')
</script>

<style scoped></style>
