<template>
  <el-form ref="formRef" :model="modelRef" :rules="rulesRef" label-width="100px">
    <el-form-item label="划拨模式：" prop="transferMode">
      <el-select
        v-model="modelRef.transferMode"
        placeholder="请选择划拨模式"
        class="w-full"
        @change="onChange"
      >
        <el-option
          v-for="item in transferModel.filter(n => n.value)"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </el-form-item>
    <el-form-item label="适用校区：" prop="schoolIds">
      <el-select
        v-model="modelRef.schoolIds"
        filterable
        multiple
        clearable
        remote
        :reserve-keyword="false"
        :remote-method="(e: any) => getSchoolList(e)"
        placeholder="请选择适用校区"
        class="w-full"
        @clear="() => getSchoolList()"
      >
        <el-option
          v-for="item in schoolList"
          :key="item.schoolId"
          :label="item.brandName + ' - ' + item.schoolName"
          :value="item.schoolId"
        />
      </el-select>
    </el-form-item>
    <template
      v-if="modelRef.transferMode === 'BOND' || modelRef.transferMode === 'BOND_CLASS_CONSUME'"
    >
      <el-form-item label="保证金：" prop="bondMinAmount">
        <el-input v-model="modelRef.bondMinAmount" placeholder="请填写保证金余额" />
      </el-form-item>
    </template>
    <template v-if="modelRef.transferMode === 'SCALE' || modelRef.transferMode === 'APPLY'">
      <el-form-item label="划拨规则：" prop="ruleScaleId">
        <el-select v-model="modelRef.ruleScaleId" placeholder="请选择划拨规则" class="w-full">
          <el-option
            v-for="item in scaleList"
            :key="item.scaleId"
            :label="item.scaleRuleName"
            :value="item.scaleId"
          />
        </el-select>
      </el-form-item>
    </template>
  </el-form>
</template>

<script setup lang="ts">
import { useCommon, useRequest } from '@/hooks'
import { transferModel } from '@/utils/constant'
import type { FormInstance, FormRules } from 'element-plus'

const { message, reqApi, emitter } = useCommon()
const emit = defineEmits(['getList'])
const formRef = ref<FormInstance>()
const modelRef = reactive({
  transferMode: '',
  ruleScaleId: '',
  schoolIds: [],
  bondMinAmount: ''
})
const rulesRef = reactive<FormRules>({
  transferMode: [{ required: true, message: '请选择划拨模式', trigger: 'change' }],
  schoolIds: [{ type: 'array', required: true, message: '请选择适用校区', trigger: 'change' }],
  ruleScaleId: [{ required: true, message: '请选择划拨规则', trigger: 'change' }],
  bondMinAmount: [{ required: true, message: '请填写保证金', trigger: 'blur' }]
})

const { run: onSubmit } = useRequest(() => reqApi.transfer.ruleAdd(modelRef), {
  onSuccess: () => {
    emitter.emit('success')
    message.success('添加成功')
    emit('getList')
  }
})

emitter.on('submit', () => {
  unref(formRef)?.validate(valid => {
    if (valid) {
      onSubmit()
    } else {
      console.log('error submit!')
    }
  })
})

const { result: schoolList, run: getSchoolList } = useRequest<Recordable[]>(
  e =>
    reqApi.common.schoolList({
      schoolName: e ?? '',
      current: 1,
      size: 20
    }),
  {
    defaultValue: [],
    immediate: true,
    formatResult: res => res.records
  }
)

const onChange = () => {
  if (modelRef.transferMode === 'SCALE' || modelRef.transferMode === 'APPLY') {
    modelRef.ruleScaleId = ''
    getScaleList(modelRef.transferMode)
  }
}
const { result: scaleList, run: getScaleList } = useRequest<Recordable[]>(
  transferType => reqApi.transfer.scaleList({ transferType }),
  {
    defaultValue: []
  }
)
</script>
