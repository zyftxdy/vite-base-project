<template>
  <card class="pricing_detail" title="课程备案审核" :loading="loading">
    <div>
      <page-title title="提交机构" />
      <div class="content">
        <description :schema="schema" :data="info" />
      </div>
    </div>
    <div class="pt-6">
      <page-title title="课程信息" />
      <div class="content">
        <description :schema="schemaInfo" :data="info" />
      </div>
    </div>
    <div class="pt-6">
      <page-title title="审核记录" />
      <div class="con_box">
        <usual-table :columns="columns" :list="info.approves" />
      </div>
    </div>
    <div v-if="info.approveStatus !== 'PASS'" class="pt-6 padding-bottom16">
      <page-title title="审核意见" />
      <div class="content_form">
        <el-form :model="modelRef" label-width="100px">
          <el-form-item label="审核结果：" class="is-required">
            <el-radio-group v-model="modelRef.approveStatus">
              <el-radio label="PASS">通过</el-radio>
              <el-radio label="UNPASS">驳回</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item
            v-if="modelRef.approveStatus === 'UNPASS'"
            label="驳回理由："
            class="is-required"
          >
            <el-input
              v-model="modelRef.approveomments"
              type="textarea"
              :rows="6"
              maxlength="100"
              style="width: 360px"
              show-word-limit
              placeholder="请填写驳回理由"
            />
          </el-form-item>
          <el-form-item>
            <el-button class="btn-small btn-border-color" type="primary" @click="handleSubmit"
              >提交</el-button
            >
          </el-form-item>
        </el-form>
      </div>
    </div>
  </card>
</template>

<script setup lang="ts">
import { useCommon, useRequest } from '@/hooks'
import { useRouteQuery } from '@vueuse/router'
import { columns, schema, schemaInfo } from './data'

const { router, reqApi, message } = useCommon()
const approveId = ref('')
const {
  result: info,
  loading,
  run: getDetail
} = useRequest<Recordable>(id => reqApi.pricing.detail({ hid: id }), {
  defaultValue: {}
})

approveId.value = useRouteQuery('id', '').value
unref(approveId) ? getDetail(unref(approveId)) : router.go(-1)

const modelRef = reactive({
  approveStatus: 'PASS',
  approveomments: '',
  hid: ''
})

const { run: handleSubmit } = useRequest(() => reqApi.pricing.appr(modelRef), {
  onBefore: () => {
    if (modelRef.approveStatus === 'UNPASS' && !modelRef.approveomments) {
      message.warning('请填写驳回理由')
      return false
    }
    modelRef.hid = unref(approveId)
  },
  onSuccess: () => {
    modelRef.approveStatus = 'PASS'
    modelRef.approveomments = ''
    message.success('操作成功')
    getDetail(unref(approveId))
  }
})
</script>

<style lang="scss" scoped src="./index.scss" />
