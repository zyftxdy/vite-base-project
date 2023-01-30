<template>
  <el-form ref="formRef" :model="modelRef" :rules="rulesRef" label-width="100px">
    <el-form-item label="上级部门：">
      <el-cascader
        v-model="modelRef.pid"
        :options="deptList"
        :show-all-levels="false"
        :props="{
          value: 'id',
          label: 'name',
          children: 'childList',
          checkStrictly: true
        }"
        clearable
        placeholder="请选择所在部门"
        @change="handleChange"
      />
    </el-form-item>
    <el-form-item label="部门名称：" prop="name">
      <el-input
        v-model="modelRef.name"
        placeholder="请填写部门名称"
        show-word-limit
        maxlength="20"
      />
    </el-form-item>
    <el-form-item label="部门性质：" class="is-required">
      <el-radio-group v-model="modelRef.properties">
        <el-radio label="PUBLIC">对外办公</el-radio>
        <el-radio label="PRIVATE">内部管理</el-radio>
      </el-radio-group>
      <div class="tips">对外办公的部门，可被设为培训机构的主管部门</div>
    </el-form-item>
    <el-form-item label="部门状态：" class="is-required">
      <el-radio-group v-model="modelRef.status">
        <el-radio label="NORMAL">启用</el-radio>
        <el-radio label="DISABLE">停用</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="备注：">
      <el-input
        v-model="modelRef.remarks"
        type="textarea"
        :rows="4"
        placeholder="请输入备注"
        maxlength="50"
        show-word-limit
      >
      </el-input>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { useCommon, useDepart, useRequest } from '@/hooks'
import { FormInstance } from 'element-plus'
import type { ModelRef } from '../enum'

const props = defineProps({
  deptId: String
})
const emits = defineEmits(['getList'])

const { message, reqApi, emitter } = useCommon()
const { deptList } = useDepart({
  FnType: 'departTree',
  immediate: true
})

const formRef = ref<FormInstance>()
const modelRef = reactive<ModelRef>({
  pid: '',
  name: '',
  properties: 'PUBLIC',
  status: 'NORMAL',
  remarks: ''
})
const rulesRef = reactive({
  name: [{ required: true, message: '请填写部门名称', trigger: 'blur' }]
})
const handleChange = (e: any) => {
  modelRef.pid = e ? e[e.length - 1] : ''
}
const { run: submitForm } = useRequest(
  () => (props.deptId ? reqApi.depart.deptUpdate(modelRef) : reqApi.depart.deptAdd(modelRef)),
  {
    onBefore: () => {
      if (props.deptId) {
        modelRef.deptId = props.deptId
      }
    },
    onSuccess: () => {
      emitter.emit('success')
      message.success(props.deptId ? '修改成功' : '添加成功')
      emits('getList')
    }
  }
)
emitter.on('submit', () => {
  unref(formRef)?.validate((valid, fields) => {
    if (valid) {
      submitForm()
    } else {
      console.log('error submit!', fields)
    }
  })
})
const { run: getDetail } = useRequest(id => reqApi.depart.deptInfo({ deptId: id }), {
  onSuccess: res => {
    Object.assign(modelRef, res)
  }
})
watch(
  () => props.deptId,
  id => {
    id && getDetail(id)
  },
  {
    immediate: true
  }
)
</script>

<style lang="scss" scoped>
.dialog_list {
  .tips {
    font-size: 14px;
    color: $EE3D11;
  }
}
</style>
