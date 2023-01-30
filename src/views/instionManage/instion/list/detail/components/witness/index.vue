<template>
  <el-skeleton :rows="5" :loading="state.loading" animated>
    <template #default>
      <template v-if="state.formData.checkStatus === 'CHECKED'">
        <verify />
      </template>
      <template v-else>
        <no-verify :form-data="state.formData" @getDetail="getDetail" />
      </template>
    </template>
  </el-skeleton>
</template>

<script setup lang="ts">
import { useCommon } from '@/hooks'
import { useRouteQuery } from '@vueuse/router'
import verify from './components/verify.vue'
import noVerify from './components/noVerify.vue'

const { message, reqApi } = useCommon()
const state = reactive({
  loading: false,
  formData: {} as Recordable,
  schoolId: ''
})

const getDetail = async (id: string) => {
  state.loading = true
  try {
    const res = await reqApi.school.verifyDetail({ schoolId: id })
    state.formData = res.data
  } catch (err: any) {
    message(err)
  }
  state.loading = false
}

state.schoolId = useRouteQuery('id', '').value
state.schoolId && getDetail(state.schoolId)
</script>
