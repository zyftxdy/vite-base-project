<template>
  <card class="complain_detail" title="申诉详情" :loading="loading">
    <div class="complain margin-bottom15">
      <page-title :title="'申诉编号：' + modelRef.appealId"/>
      <description :schema="schema" :data="data">
        <template #schoolName>
          {{data.schoolName}}<el-button link type="primary" class="ml-1" @click="goDetail(data.schoolId)">查看</el-button>
        </template>
      </description>
    </div>
    <div class="complain margin-bottom15">
      <page-title title="处理记录"/>
      <el-steps direction="vertical">
        <el-step v-for="(item, index) in nodeList" :key="index">
          <template #icon>
            <el-icon class="!text-xl !text-slate-700">
              <template v-if="item.node !== -1">
                <i-ep-circleCheckFilled/>
              </template>
              <template v-else>
                <i-ep-questionFilled/>
              </template>
            </el-icon>
          </template>
          <template #title>
            <div class="title">{{ item.nodeName }}</div>
          </template>
          <template #description>
            <div v-if="item.node !== -1" class="result_t">
              <span>操作人：{{ item.operatedName }}（{{ item.operatedMobile }}）</span>
              <span>操作时间：{{ item.operatedTime }}</span>
            </div>
            <div class="result_r">
              <div>{{ item.operatedReason }}</div>
              <el-image
                v-for="n in item.imgUrl"
                :src="n"
                :key="n"
                :preview-src-list="item.imgUrl"
                class="w-26 h-26 m-1"/>
            </div>
          </template>
        </el-step>
      </el-steps>
    </div>
    <div v-if="data.appealStatusName === 'INTERVENED'" class="complain margin-bottom15">
      <page-title title="平台回复"/>
      <div class="content">
        <el-form
          ref="formRef"
          :model="modelRef"
          :rules="rulesRef"
          label-width="100px"
        >
          <el-form-item label="处理意见：" class="is-required">
            <el-radio-group v-model="modelRef.status">
              <el-radio :label="true">支持家长</el-radio>
              <el-radio :label="false">支持机构</el-radio>
            </el-radio-group>
            <div class="pl-4 text-red-600">支持家长，则申诉成功，本次课消记录将作废。支持机构，则申诉关闭，课消金额将划拨至校区可用账户</div>
          </el-form-item>
          <el-form-item label="备注说明：" prop="reason">
            <el-input
              v-model="modelRef.reason"
              type="textarea"
              :rows="6"
              maxlength="200"
              style="width:360px;"
              show-word-limit
              placeholder="备注说明将同时展示给家长和机构"></el-input>
          </el-form-item>
          <el-form-item label="上传图片:">
            <usual-upload
              type="list"
              v-model:file-list="fileList"
              :max-length="9"/>
          </el-form-item>
          <el-form-item>
            <el-button class="btn-small btn-border-color" type="primary" @click="handleSubmit">提交</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </card>
</template>

<script setup lang="ts">
import { useCommon, useMessage, useRequest } from '@/hooks'
import { useRouteQuery } from '@vueuse/router'
import { schema } from '../data'
import type { FileList } from '#/base'
import type { FormInstance } from 'element-plus'

const { reqApi, message, router } = useCommon()
const { messageConfirm } = useMessage()
const formRef = ref<FormInstance>()
const fileList = ref<FileList[]>([])
const modelRef = reactive({
  appealId: '',
  reason: '',
  status: true,
  img: [] as string[]
})
const rulesRef = reactive({
  reason: [{ required: true, message: '请填写备注说明', trigger: 'blur' }]
})

const handleSubmit = () => {
  unref(formRef)?.validate((valid, fields) => {
    if (valid) {
      messageConfirm({
        message: '确认提交处理结果吗？'
      }).then(() => {
        submitFun()
      }).catch()
    } else {
      console.log('error submit!', fields)
    }
  })
}
const { run: submitFun } = useRequest(() => reqApi.complain.appealSubmit(modelRef), {
  onBefore: () => modelRef.img = unref(fileList).map(item => item.imageNo),
  onSuccess: () => {
    message.success('提交成功')
    getDetail(modelRef.appealId)
  }
})

const nodeList = ref<Recordable[]>([])
const { result: data, loading, run: getDetail } = useRequest<Recordable>(id => reqApi.complain.appealDetail({ appealId: id }), {
  defaultValue: {},
  formatResult: res => res.details,
  onSuccess: res => {
    nodeList.value = res.nodeList
    handleData()
  }
})
const handleData = () => {
  const index = unref(nodeList).length - 1
  if (unref(nodeList)[index].node === 3) {
    nodeList.value.push({
      node: -1,
      nodeName: '待平台介入',
      operatedReason: '正在联系双方核实情况，请耐心等待平台处理结果'
    })
  }
}

modelRef.appealId = useRouteQuery('id', '').value
if (!modelRef.appealId) {
  router.go(-1)
}
getDetail(modelRef.appealId)

const goDetail = (id: string) => {
  router.push({
    name: 'instionDetail',
    query: { id }
  })
}
</script>

<style lang="scss" scoped src="./index.scss"/>
