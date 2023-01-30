<template>
  <template v-if="state.type === 'SCORE'">
    <span class="label">选择评级:</span>
    <el-select v-model="state.level" size="large" placeholder="请选择评级">
      <el-option
        v-for="item in state.levelList"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
  </template>
  <template v-else>
    <span class="label">选择行政部门:</span>
    <el-select
      v-model="state.deptId"
      size="large"
      filterable
      clearable
      placeholder="请选择行政部门"
    >
      <el-option
        v-for="item in deptList"
        :key="item.deptId"
        :label="item.name"
        :value="item.deptId"
      />
    </el-select>
  </template>
</template>

<script setup lang="ts">
import { useCommon, useDepart, useRequest } from '@/hooks'
import { cerditLvStatus } from '@/utils/constant'

const props = defineProps({
  data: {
    type: Object,
    default: () => {}
  }
})
const emits = defineEmits(['getList'])

const { message, reqApi, emitter } = useCommon()
const { deptList, getDepart } = useDepart({ FnType: 'depart' })
const state = reactive({
  levelList: [] as Recordable[],
  level: '',
  deptId: '',
  schoolId: '',
  type: ''
})

watch(
  () => props.data,
  val => {
    val.type === 'DEPART'
      ? getDepart()
      : (state.levelList = cerditLvStatus.filter(item => item.value))
    val.type === 'DEPART' ? (state.deptId = val.deptId) : (state.level = val.creditLevel)
    state.schoolId = val.schoolId
    state.type = val.type
  },
  {
    immediate: true,
    deep: true
  }
)

emitter.on('submit', () => {
  state.type === 'DEPART' ? updateDept() : updateLevel()
})
const { run: updateDept } = useRequest(
  () =>
    state.deptId
      ? reqApi.school.setDept({ schoolId: state.schoolId, deptId: state.deptId })
      : reqApi.school.delDept({ schoolId: state.schoolId }),
  {
    onSuccess: () => closeOper()
  }
)
const { run: updateLevel } = useRequest(data => reqApi.school.setLevel(data), {
  onBefore: () => ({
    schoolId: state.schoolId,
    level: state.level
  }),
  onSuccess: () => closeOper()
})
const closeOper = () => {
  emitter.emit('success')
  message.success('修改成功')
  emits('getList')
}
</script>

<style lang="scss" scoped>
.dialog_list {
  .label {
    display: block;
    margin-bottom: 10px;
  }
  .el-select {
    width: 100%;
  }
}
</style>
