<template>
  <el-form ref="formRef" :model="modelRef" :rules="rules">
    <el-form-item label="规则类型：" prop="transferType">
      <el-select v-model="modelRef.transferType" placeholder="请选择规则类型" class="w-full">
        <el-option
          v-for="item in transferType"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </el-form-item>
    <el-form-item label="规则名称：" prop="scaleRuleName">
      <el-input v-model="modelRef.scaleRuleName" placeholder="请填写划拨规则名称" />
    </el-form-item>
    <el-form-item v-if="modelRef.transferType" label="规则内容：" class="is-required">
      <div
        v-for="(item, index) in modelRef.scaleRuleDetails"
        v-if="modelRef.transferType === 'SCALE'"
        :key="'rule' + index"
        class="mb-1"
      >
        <span>划拨月份：第<el-input v-model="item.month" class="w-16 mx-1" />月，</span>
        <span class="pl-1"
          >划拨比例：<el-input v-model="item.scale" placeholder="划拨比例" class="w-32"
            ><template #append>%</template></el-input
          ></span
        >
        <span class="cursor-pointer text-xl pl-2">
          <template v-if="index === modelRef.scaleRuleDetails.length - 1 && index < 12"
            ><el-icon class="align-middle" @click="add"><i-ep-circlePlus /></el-icon
          ></template>
          <template v-if="index !== 0"
            ><el-icon class="align-middle" @click="del"><i-ep-circleClose /></el-icon
          ></template>
        </span>
      </div>
      <template v-else>
        <div class="apply-f-m my-1">
          单次申请资金超过<el-input
            v-model="modelRef.singleLimit"
            class="w-16 mx-1"
          />元，转为人工审批；
        </div>
        <div class="apply-f-m my-1">
          累计<el-input v-model="modelRef.limitDay" class="w-16 mx-1" />天，划拨超过<el-input
            v-model="modelRef.totalLimit"
            class="w-16 mx-1"
          />元，转为人工审批；
        </div>
        <div class="apply-f-m my-1">
          划拨后保证金账户低于<el-input
            v-model="modelRef.miniLimit"
            class="w-16 mx-1"
          />元，转为人工审批。
        </div>
        <div class="apply-f-m">（主动划拨申请一旦触发规则内容中任意一条即转为人工审批）</div>
      </template>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { useCommon, useRequest } from '@/hooks'
import { transferModel } from '@/utils/constant'
import type { FormInstance } from 'element-plus'

const transferType = transferModel.filter(item => item.value === 'SCALE' || item.value === 'APPLY')
const { message, reqApi, emitter } = useCommon()
const emits = defineEmits(['getList'])
const formRef = ref<FormInstance>()
const modelRef = reactive({
  transferType: '',
  scaleRuleName: '',
  scaleRuleDetails: [
    {
      month: '',
      scale: ''
    }
  ],
  singleLimit: '',
  limitDay: '',
  totalLimit: '',
  miniLimit: ''
})
const rules = reactive({
  transferType: [{ required: true, message: '请选择划拨规则', trigger: 'change' }],
  scaleRuleName: [{ required: true, message: '请填写划拨规则名称', trigger: 'blur' }]
})

const add = () => {
  modelRef.scaleRuleDetails.push({
    month: '',
    scale: ''
  })
}
const del = (index: number) => {
  modelRef.scaleRuleDetails.splice(index, 1)
}

const { run: onSubmit } = useRequest(() => reqApi.transfer.scaleAdd(modelRef), {
  onSuccess: () => {
    emitter.emit('success')
    message.success('添加成功')
    emits('getList')
  }
})

emitter.on('submit', () => {
  const result = modelRef.scaleRuleDetails.some(item => !item.month || !item.scale)
  if (
    (modelRef.transferType === 'SCALE' && result) ||
    (modelRef.transferType === 'APPLY' &&
      (!modelRef.singleLimit || !modelRef.limitDay || !modelRef.totalLimit || !modelRef.miniLimit))
  ) {
    message.warning('请填写完整的划拨明细')
    return false
  }
  unref(formRef)?.validate(valid => {
    if (valid) {
      onSubmit()
    } else {
      console.log('error submit!')
    }
  })
})
</script>
