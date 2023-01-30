<template>
  <usual-dialog v-model:show="showDialog" title="上传图片">
    <usual-upload
      v-model:file-list="fileList"
      type="list"
      :max-length="999"
      :upload-url="publicUploadFile"
    />
  </usual-dialog>
</template>

<script setup lang="ts">
import { useCommon } from '@/hooks'
import { publicUploadFile } from '@/utils/constant'
import type { FileList } from '#/base'

const { emitter } = useCommon()
const props = defineProps({
  show: Boolean
})

const emit = defineEmits(['update:show', 'upload-done'])

const fileList = ref<FileList[]>()
const showDialog = computed({
  get: () => props.show,
  set: val => {
    emit('update:show', val)
  }
})

emitter.on('submit', () => {
  if (unref(fileList)) {
    const list = unref(fileList)?.map(item => item.imageUrl)
    emit('upload-done', list)
  }
  emitter.emit('success')
})
</script>
