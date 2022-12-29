<template>
  <el-dialog
    v-if="dialogVisible"
    v-model="dialogVisible"
    :title="title"
    :width="width"
    destroy-on-close
    class="dialog_list"
    :close-on-click-modal="false"
    :before-close="handleClose"
    @vnode-before-unmount="destoryed"
  >
    <slot/>
    <template v-if="showFooter" #footer>
      <span class="dialog-footer">
        <el-button class="btn-small btn-border" @click="handleClose">取 消</el-button>
        <el-button class="btn-small btn-border-color" type="primary" @click="handleSubmit">确 定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { dialogProps } from './props'
import { useCommon } from '@/hooks'

const { emitter } = useCommon()
const props = defineProps(dialogProps)
const emits = defineEmits(['update:show', 'close'])

const dialogVisible = computed({
  get: () => props.show,
  set: val => {
    emits('update:show', val)
  }
})
const handleClose = () => {
  dialogVisible.value = false
  emits('close')
}
const handleSubmit = () => {
  emitter.on('success', handleClose)
  emitter.emit('submit')
}

const destoryed = () => {
  emitter.all.clear()
}
</script>
