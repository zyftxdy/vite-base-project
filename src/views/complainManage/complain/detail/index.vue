<template>
  <div class="complain_detail">
    <div class="title_detail">投诉与反馈详情</div>
    <div class="content-box">
      <el-skeleton :rows="5" :loading="loading" animated>
        <div class="complain margin-bottom15">
          <page-title :title="'投诉编号：' + info.complaintVo?.complaintId"/>
          <description class="content" :schema="schema" :data="{}"/>
        </div>
        <div v-if="info.complaintVo" class="complain margin-bottom15">
          <page-title title="处理记录"/>
          <el-steps direction="vertical">
            <el-step v-for="(item, index) in info.complaintVo.complaintId" :key="index">
              <template #icon>
                <svg-icon icon-class="complain" class="svgIcon"/>
              </template>
              <template #title>
                <div class="title">{{ item.title }}</div>
              </template>
              <template v-if="item.desc" #description>
                <div class="result_t">
                  <span>回复人：{{ item.name }}</span>
                  <span>回复时间：{{ item.time }}</span>
                </div>
                <div class="result_r">{{ item.desc }}</div>
              </template>
            </el-step>
          </el-steps>
        </div>
        <div class="complain margin-bottom15">
          <page-title title="平台回复"/>
          <div class="content">
            <el-form
              ref="formRef"
              :model="modelRef"
              :rules="rulesRef"
              label-width="100px"
            >
              <el-form-item label="回复内容：" prop="result">
                <el-input
                  v-model="modelRef.result"
                  type="textarea"
                  :rows="6"
                  maxlength="200"
                  style="width:360px;"
                  show-word-limit
                  placeholder="请填写回复内容"></el-input>
              </el-form-item>
              <el-form-item label="上传图片:">
                <usual-upload
                  uploadType="list"
                  v-model:file-list="fileList"
                  :max-length="9"/>
              </el-form-item>
              <!-- <el-form-item>
                <el-checkbox v-model="modelRef.checked">同时标记为已解决</el-checkbox>
              </el-form-item> -->
              <el-form-item>
                <el-button class="btn-small btn-border-color" type="primary" @click="handleSubmit">提交</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </el-skeleton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCommon, useRequest } from '@/hooks'
import { schema } from '../data'
import { useRouteQuery } from '@vueuse/router'
import type { FileList } from '#/base'
import type { FormInstance } from 'element-plus'

interface ModelRef {
  result: string
  status: 'NORMAL' | 'DISABLE'
  imgUrl: string
}

const { router, reqApi, message } = useCommon()
const formRef = ref<FormInstance>()
const fileList = ref<FileList[]>([])
const modelRef = reactive<ModelRef>({
  result: '',
  status: 'NORMAL',
  imgUrl: ''
})
const rulesRef = reactive({
  result: [{ required: true, message: '请填写回复内容', trigger: 'blur' }]
})

const handleSubmit = () => {
  unref(formRef)?.validate((valid, fields) => {
    if (valid) {
      submitFun()
    } else {
      console.log('error submit!', fields)
    }
  })
}
const { run: submitFun } = useRequest(() => reqApi.complain.complaintHandle(modelRef), {
  onBefore: () => {
    const list = unref(fileList).map(item => item.imageNo)
    modelRef.imgUrl = list.join()
  },
  onSuccess: () => {
    message.success('回复成功')
    getDetail()
  }
})

const complainId = useRouteQuery('id', '').value
const { result: info, loading, run: getDetail } = useRequest<Recordable>(() => reqApi.complain.complaintInfo({ complaintId:complainId }), {
  defaultValue: {}
})
if (!complainId) router.go(-1)
getDetail()
</script>

<style lang="scss" scoped src="./index.scss"/>
