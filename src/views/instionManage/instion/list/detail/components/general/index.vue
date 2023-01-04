<template>
  <el-skeleton :rows="5" :loading="loading" animated>
    <!-- 基本信息 -->
    <div class="basic margin-bottom15">
      <page-title title="基本信息"/>
      <div class="content flex">
        <div class="school flex flex-col items-center p-4">
          <el-image :src="schoolInfo.logo"/>
          <div class="text">{{ schoolInfo.alias }}</div>
          <div class="school_imgs margin-top10">
            <div v-for="item in schoolInfo.storePhotos" :key="item" class="image_item box-content">
              <el-image :src="item"/>
            </div>
          </div>
        </div>
        <div class="info">
          <description :schema="basicSchema" :data="schoolInfo"/>
          <description v-if="showOper" :schema="bankSchema" :data="schoolInfo">
            <template #bankEarnestMoney>
              <span><span class="text-2xl text-red-600 pr-1">{{ schoolInfo.bankEarnestMoney ?? '--' }}</span>元</span>
              <el-button v-auth:hide="'09444fd98fc1f87004'" link type="primary" class="ml-1" style="vertical-align: inherit" @click="handleSetting">设置</el-button>
            </template>
          </description>
        </div>
      </div>
    </div>

    <!-- 主体信息 -->
    <div class="account margin-bottom15">
      <page-title title="主体信息"/>
      <description :schema="mainSchema" :data="schoolInfo"/>
      <div class="grid grid-cols-5 mt-5">
        <card-meta
          v-for="(item,index) in schoolInfo.qual_list"
          :key="index"
          :title="item.name"
          title-size="sm">
          <template #description>
            <el-image :src="item.src" class="w-36 h-24"/>
          </template>
        </card-meta>
      </div>
    </div>

    <!-- 结算信息 -->
    <div class="pb-4">
      <page-title title="结算信息"/>
      <description :column="2" :schema="accountSchema" :data="schoolInfo"/>
    </div>

    <usual-dialog
      v-model:show="operState.show">
      <div class="pb-2 text-base font-medium">注意：仅当风险保证金存缴方式无法通过系统自动获取时需要手动在此设置，请您注意并确认您有权执行本操作！</div>
      <div class="money-input">
        <span class="pb-2 inline-block">请输入该机构风险保证金余额：</span>
        <el-input v-model="operState.earnestMoney" placeholder="单位：元"/>
      </div>
    </usual-dialog>
  </el-skeleton>
</template>

<script setup lang="ts">
import { useCommon, useRequest } from '@/hooks'
import { useRouteQuery } from '@vueuse/router'
import { basicSchema, mainSchema, accountSchema, bankSchema } from './data'
import { vaildFloat } from '@/utils/vaildate'
import { flatObject } from '@/utils/mUtils'

const { reqApi, message, emitter } = useCommon()
const schoolId = ref('')
const { result: schoolInfo, loading } = useRequest<Recordable>(() => reqApi.school.schoolInfo({ schoolId: unref(schoolId) }), {
  defaultValue: {},
  immediate: true,
  onBefore: () => schoolId.value = useRouteQuery('id', '').value,
  onSuccess: res => {
    const baseInfo = res.baseInfo
    const subjectInfo = res.subjectInfo
    baseInfo.storePhotos = []
    subjectInfo.qual_list = []
    baseInfo.storePhotos.push(baseInfo.storePhotoA)
    baseInfo.storePhotos.push(baseInfo.storePhotoB)
    baseInfo.storePhotos.push(baseInfo.storePhotoC)
    baseInfo.area = baseInfo.provinceName + baseInfo.cityName + baseInfo.districtName

    subjectInfo.qual_list.push({ name: '营业执照', src: subjectInfo.licenseCreditPhoto })
    subjectInfo.licenseHasSchoolPermit && subjectInfo.qual_list.push({ name: '办学许可证', src: subjectInfo.licenseSchoolPermit })
    subjectInfo.qual_list.push({ name: '银行开户凭证', src: subjectInfo.licenseAccountPhoto })
    subjectInfo.qual_list.push({ name: '法人身份证正面', src: subjectInfo.legalPersonIdcardPhotoA })
    subjectInfo.qual_list.push({ name: '法人身份证反面', src: subjectInfo.legalPersonIdcardPhotoB })
    schoolInfo.value = flatObject(res)
  }
})

const showOper = computed(() => {
  const status = unref(schoolInfo).status
  return status === 'SUCCESS' || status === 'DISABLE'
})
const operState = reactive({
  show: false,
  earnestMoney: ''
})
const handleSetting = () => {
  operState.show = true
  emitter.on('submit', () => {
    if(!vaildFloat(operState.earnestMoney) || operState.earnestMoney.length >= 19) {
      message.warning('请填写正确的保证金')
      return false
    }
    changeEarnestMoney()
  })
}

const { run: changeEarnestMoney } = useRequest(() => reqApi.school.handMoney({
  merchantId: unref(schoolInfo).merchantId,
  earnestMoney: operState.earnestMoney
}), {
  onSuccess: () => {
    schoolInfo.value.bankEarnestMoney = operState.earnestMoney
    operState.earnestMoney = ''
    emitter.emit('success')
    message.success('操作成功')
  }
})
</script>

<style lang="scss" scoped src="./index.scss"/>
