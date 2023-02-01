<template>
  <description :schema="schema" :data="info" />
  <description
    v-if="info.transferStatus === 'APPROVE_UNPASS'"
    :schema="rejectSchema"
    :data="info"
  />
  <el-form v-if="showOper" ref="formRef" :model="modelRef" :rules="rulesRef" label-width="100px">
    <el-form-item label="驳回原因：" prop="reason">
      <el-input
        v-model="modelRef.reason"
        type="textarea"
        :rows="6"
        maxlength="200"
        style="width: 360px"
        show-word-limit
        placeholder="请填写驳回原因"
      />
    </el-form-item>
    <el-form-item label="上传图片:" class="is-required">
      <usual-upload v-model:file-list="fileList" type="list" :max-length="9" />
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { useCommon, useMessage, useRequest } from '@/hooks'
import { schema, rejectSchema } from '../data'
import type { FileList } from '#/base'
import type { FormInstance, FormRules } from 'element-plus'

const { reqApi, message, emitter } = useCommon()
const { messageConfirm } = useMessage()
const props = defineProps({
  showOper: {
    type: Boolean,
    default: false
  },
  id: {
    type: String,
    default: ''
  }
})
const emits = defineEmits(['oper'])

const { result: info, run: getDetail } = useRequest<Recordable>(
  id => reqApi.transfer.manualInfo({ transferId: id }),
  {
    defaultValue: {}
  }
)
watch(
  () => props.id,
  id => id && getDetail(id),
  { immediate: true }
)

const formRef = ref<FormInstance>()
const fileList = ref<FileList[]>([])
const modelRef = reactive({
  reason: '',
  imgUrls: [] as string[],
  isAgree: 'UNAGREE'
})
const rulesRef = reactive<FormRules>({
  reason: [{ required: true, message: '请填写驳回原因', trigger: 'blur' }]
})

const { run: submit } = useRequest(
  () =>
    reqApi.transfer.manualApply({
      transferId: props.id,
      ...modelRef
    }),
  {
    onBefore: () => (modelRef.imgUrls = unref(fileList).map(item => item.imageNo)),
    onSuccess: () => {
      message.success('操作成功')
      emitter.emit('success')
      emits('oper')
    }
  }
)

emitter.on('submit', () => {
  unref(formRef)?.validate((valid, fields) => {
    if (valid) {
      messageConfirm({
        message: '确认要驳回吗？'
      }).then(() => {
        submit()
      })
    } else {
      console.log('error submit!', fields)
    }
  })
})
</script>
