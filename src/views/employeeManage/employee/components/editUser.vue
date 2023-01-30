<template>
  <el-form ref="formRef" :model="modelRef" :rules="rulesRef" label-width="100px">
    <el-form-item label="员工姓名：" prop="name">
      <el-input
        v-model="modelRef.name"
        placeholder="请填写员工姓名"
        show-word-limit
        maxlength="10"
      />
    </el-form-item>
    <el-form-item label="手机号码：" prop="mobile">
      <el-input v-model="modelRef.mobile" placeholder="请填写手机号码" />
    </el-form-item>
    <el-form-item label="员工职位：" prop="roleId">
      <el-select v-model="modelRef.roleId" placeholder="请选择职位">
        <el-option
          v-for="item in roleList"
          :key="item.roleId"
          :disabled="item.adminFlag"
          :label="item.name"
          :value="item.roleId"
        />
      </el-select>
    </el-form-item>
    <el-form-item label="员工状态：" class="is-required">
      <el-radio-group v-model="modelRef.status">
        <el-radio label="NORMAL">启用</el-radio>
        <el-radio label="DISABLE">停用</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="所在部门：" prop="deptId">
      <el-cascader
        v-model="modelRef.deptId"
        :options="deptList"
        :show-all-levels="false"
        :props="{
          value: 'deptId',
          label: 'name',
          children: 'childList',
          checkStrictly: true
        }"
        placeholder="请选择所在部门"
        @change="handleChange"
      />
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { useCommon, useDepart, useRequest } from '@/hooks'
import { rules } from './enum'
import type { ModelRef } from './enum'
import type { FormInstance } from 'element-plus'

const props = defineProps({
  userId: String,
  roleList: {
    type: Array as PropType<Recordable[]>,
    default: () => []
  }
})
const emits = defineEmits(['updateFn', 'addFn'])

const { message, reqApi, emitter } = useCommon()
const { deptList } = useDepart({
  FnType: 'departTree',
  immediate: true,
  onSuccess: () =>
    (deptList.value =
      unref(deptList)[0]?.pid === 0 ? unref(deptList)[0].childList : unref(deptList))
})
const formRef = ref<FormInstance>()
const modelRef = reactive<ModelRef>({
  name: '',
  mobile: '',
  roleId: '',
  deptId: '',
  status: 'NORMAL'
})
const rulesRef = reactive(rules)

const handleChange = (e: any) => {
  modelRef.deptId = e[e.length - 1]
}
const { run: submitForm } = useRequest(
  () => (props.userId ? reqApi.user.userUpdate(modelRef) : reqApi.user.userAdd(modelRef)),
  {
    onBefore: () => {
      if (props.userId) {
        modelRef.userId = props.userId
      }
    },
    onSuccess: () => {
      emitter.emit('success')
      message.success(props.userId ? '修改成功' : '添加成功')
      props.userId ? emits('updateFn') : emits('addFn')
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
const { run: getDetail } = useRequest(id => reqApi.user.userInfo({ userId: id }), {
  onSuccess: res => {
    Object.assign(modelRef, res)
  }
})
watch(
  () => props.userId,
  val => {
    val && getDetail(val)
  },
  {
    immediate: true
  }
)
</script>

<style lang="scss" scoped>
:deep(.el-select),
:deep(.el-cascader) {
  width: 100%;
}
</style>
