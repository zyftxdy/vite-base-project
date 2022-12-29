<template>
  <usual-dialog
    v-model:show="showDialog"
    title="上传图片">
    <usual-upload
      type="list"
      :max-length="999"
      v-model:file-list="fileList"/>
  </usual-dialog>
</template>

<script setup lang="ts">
import { useCommon } from '@/hooks'
import UsualDialog from '../UsualDialog/index.vue'
import UsualUpload from '../UsualUpload/index.vue'
import type { FileList } from '#/base'

const { emitter } = useCommon()
const props = defineProps({
  show: Boolean
})

const emit = defineEmits(['update:show', 'uploadDone'])

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
    emit('uploadDone', list)
  }
  emitter.emit('success')
})
</script>
