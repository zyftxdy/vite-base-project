<template>
  <el-form
    ref="formRef"
    :model="modelRef"
    :rules="rulesRef"
    class="no-verify"
  >
    <page-title title="办学资质核查"/>
    <div class="form-line main">
      <div class="item-line">
        <el-form-item label="主体资质：" class="is-required no-margin">
          <el-radio-group v-model="modelRef.type">
            <el-radio label="03">企业</el-radio>
            <el-radio label="04">民办非企</el-radio>
            <el-radio label="02">个体工商户</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <usual-upload
            v-model:image="modelRef.licenseCreditPhoto"
            :image-url="imgUrls.licenseCreditPhotoUrl"
            :image-size="2"
            image-desc="营业执照(民办非企资质证书)"
            :showWH="false">
            <el-form-item prop="licenseCreditPhoto">
              <el-input v-show="false" v-model="modelRef.licenseCreditPhoto"/>
            </el-form-item>
          </usual-upload>
        </el-form-item>
        <el-form-item label="消防资质：" class="noflex">
          <usual-upload
            v-model:image="modelRef.fireCertPhoto"
            :image-url="imgUrls.fireCertPhotoUrl"
            :image-size="2"
            image-desc="消防资质"
            :showWH="false"/>
        </el-form-item>
      </div>
      <div class="item-line">
        <el-form-item label="办学资质：" class="noflex">
          <usual-upload
            v-model:image="modelRef.licenseSchoolPermitPhoto"
            :image-url="imgUrls.licenseSchoolPermitPhotoUrl"
            :image-size="2"
            image-desc="办学许可证"
            :showWH="false"/>
        </el-form-item>
        <el-form-item label="体育经营许可证：" class="noflex">
          <usual-upload
            v-model:image="modelRef.sportsCertPhoto"
            :image-url="imgUrls.sportsCertPhotoUrl"
            :image-size="2"
            image-desc="体育经营许可证"
            :showWH="false"/>
        </el-form-item>
      </div>
    </div>
    <page-title title="校区环境核查"/>
    <el-form-item label="校区面积：" class="area">
      <el-input v-model="modelRef.area" placeholder="请填写校区面积（平米）"/>
    </el-form-item>
    <el-form-item label="最大容纳人数：" class="person">
      <el-input v-model="modelRef.holdCount" placeholder="请输入最大容纳人数（人）"/>
      <span class="tips">生均面积：{{areaAverage}}平米/人</span>
    </el-form-item>
    <el-form-item label="安全保障：" class="safe">
      <el-input v-model="modelRef.security" placeholder="请输入校区安全保障信息，如30万人身安全保障+10万财产安全保障"/>
    </el-form-item>
    <el-form-item label="校区环境：" class="noflex">
      <usual-upload
        type="list"
        v-model:fileList="state.envPhotos"
        :max-length="9"
        :image-size="2"
        :showWH="false"/>
    </el-form-item>
    <page-title title="安全责任保险"/>
    <el-form-item label="保险公司：" class="area">
      <el-input v-model="modelRef.insureCompany" placeholder="请填写保险公司名称"/>
    </el-form-item>
    <el-form-item label="保险产品名称：" class="area">
      <el-input v-model="modelRef.insureGoodName" placeholder="请填写保险公司产品"/>
    </el-form-item>
    <el-form-item label="保障期限：">
      <el-row :gutter="24">
        <el-col :span="11">
          <el-date-picker
            v-model="modelRef.insureStartTime"
            type="date"
            valueFormat='YYYY-MM-DD'
            format='YYYY-MM-DD'
            placeholder="开始日期"
          />
        </el-col>
        <el-col :span="1"><span>-</span></el-col>
        <el-col :span="11">
          <el-date-picker
            v-model="modelRef.insureEndTime"
            type="date"
            valueFormat='YYYY-MM-DD'
            format='YYYY-MM-DD'
            placeholder="结束日期"
          />
        </el-col>
      </el-row>
    </el-form-item>
    <el-form-item label="保单照片：" class="noflex">
      <usual-upload
        type="list"
        v-model:fileList="state.inPhotos"
        :max-length="15"
        :image-size="2"
        :showWH="false"/>
    </el-form-item>
    <page-title title="师资力量核查"/>
    <div class="tips">专职教师人数不少于3人，不少于教师总数的1/4，不得聘用中小学在职教师。</div>
    <div class="form-line teacher">
      <div class="item-line">
        <el-form-item label="专职教师人数：">
          <el-input v-model="modelRef.fullTimeEmployeeCount" placeholder="请填写专职教师人数"/>
        </el-form-item>
        <el-form-item label="校长姓名：">
          <el-input
            v-model="modelRef.headmaster"
            placeholder="请填写校长姓名"
            show-word-limit
            maxlength="10"/>
        </el-form-item>
        <el-form-item label="校长职称/学历：">
          <el-input
            v-model="modelRef.headmasterEducation"
            show-word-limit
            maxlength="10"
            placeholder="请填写请输入学历或职称，如本科、专科、教授"/>
        </el-form-item>
      </div>
      <div class="item-line">
        <el-form-item label="兼职教师人数：">
          <el-input v-model="modelRef.partTimeEmployeeCount" placeholder="请填写兼职教师人数"/>
        </el-form-item>
        <el-form-item label="校长出生日期：">
          <el-date-picker
            v-model="modelRef.headmasterBirthday"
            type="date"
            :disabled-date="pickerOptions"
            value-format="yyyy-MM-dd"
            format="yyyy-MM-dd"
            placeholder="请选择日期"/>
        </el-form-item>
        <el-form-item label="教育教学经验：">
          <el-input v-model="modelRef.headmasterExperience" placeholder="请输入校长教育教学/管理经验年限（年）"/>
        </el-form-item>
      </div>
      <div class="item-line">
        <el-form-item label="是否聘用中小学在职教师：">
          <el-checkbox v-model="modelRef.hireK12">有聘用中小学在职教师</el-checkbox>
        </el-form-item>
        <el-form-item label="校长照片：">
          <usual-upload
            v-model:image="modelRef.headmasterPhoto"
            :image-url="imgUrls.headmasterPhotoUrl"
            :image-size="2"
            image-desc="校长照片"
            :showWH="false"
          />
        </el-form-item>
      </div>
    </div>
    <page-title title="日常经营核查"/>
    <el-form-item label="建校时间：">
      <el-date-picker
        v-model="modelRef.buildTime"
        type="date"
        :disabled-date="pickerOptions"
        value-format="yyyy-MM-dd"
        format="yyyy-MM-dd"
        placeholder="请选择日期"/>
    </el-form-item>
    <el-form-item label="营业时间：" class="is-required">
      <el-row :gutter="24">
        <el-col :span="11">
          <el-form-item prop="businessStartHours">
            <el-time-picker
              v-model="modelRef.businessStartHours"
              value-format="HH:mm"
              format="HH:mm"
              placeholder="开始时间"
            />
          </el-form-item>
        </el-col>
        <el-col :span="1"><span>-</span></el-col>
        <el-col :span="11">
          <el-form-item prop="businessEndHours">
            <el-time-picker
              v-model="modelRef.businessEndHours"
              value-format="HH:mm"
              format="HH:mm"
              placeholder="结束时间"
            />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form-item>
    <el-form-item label="请勾选符合该校区经营状况的项目" class="noflex">
      <el-checkbox-group v-model="modelRef.businessInfo">
      <el-checkbox
        v-for="item in infoList"
        :label="item"
        :key="item"/>
      </el-checkbox-group>
    </el-form-item>
    <el-form-item label="校验时间：" class="is-required">
      <el-row :gutter="24">
        <el-col :span="11">
          <el-form-item prop="checkStartTime">
            <el-date-picker
              v-model="modelRef.checkStartTime"
              type="date"
              :disabled-date="pickerOptions"
              value-format="yyyy-MM-dd"
              format="yyyy-MM-dd"
              placeholder="请选择日期"/>
          </el-form-item>
        </el-col>
        <el-col :span="2"><span>至</span></el-col>
        <el-col :span="11">
          <el-form-item prop="checkEndTime">
            <el-date-picker
              v-model="modelRef.checkEndTime"
              type="date"
              value-format="yyyy-MM-dd"
              format="yyyy-MM-dd"
              placeholder="请选择日期"/>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form-item>
    <el-button class="btn-small btn-border-color" type="primary" @click="handleSubmit">提交</el-button>
  </el-form>
</template>

<script setup lang="ts">
import { useCommon } from '@/hooks'
import { ImgModel, Model, infoList, rules } from '../enum'
import type { FormInstance } from 'element-plus'
import type { FileList } from '#/base'

const { message, reqApi } = useCommon()
const props = defineProps({
  formData: {
    type: Object,
    default: () => {}
  }
})
const emits = defineEmits(['getDetail'])

const pickerOptions = (time: any) => time.getTime() > Date.now()

const formRef = ref<FormInstance>()
const imgUrls = reactive(ImgModel())
const modelRef = reactive(Model())
const rulesRef = reactive(rules)
const state = reactive<{
  envPhotos: FileList[]
  inPhotos: FileList[]
}>({
  envPhotos: [],
  inPhotos: []
})

watch(() => props.formData, val => {
  console.log(val)
}, {
  immediate: true,
  deep: true
})

const areaAverage = computed(() => {
  return !modelRef.area || !modelRef.holdCount ? 0 : (parseFloat(modelRef.area)/parseFloat(modelRef.holdCount)).toFixed(2)
})

const handleSubmit = () => {
  unref(formRef)?.validate((valid, fields) => {
    if (valid) {
      checkFun()
    } else {
      console.log('error submit!', fields)
    }
  })
}
const checkFun = () => {
  if ((modelRef.fullTimeEmployeeCount ||
      modelRef.partTimeEmployeeCount) &&
    (!modelRef.fullTimeEmployeeCount ||
      !modelRef.partTimeEmployeeCount)) {
    return message.error('专职教师和兼职教师人数，要么都填，要么都留空。')
  }
  if ((modelRef.insureCompany ||
      modelRef.insureGoodName ||
      modelRef.insureStartTime ||
      modelRef.insureEndTime) &&
    (!modelRef.insureCompany ||
      !modelRef.insureGoodName ||
      !modelRef.insureStartTime ||
      !modelRef.insureEndTime)) {
    return message.error('保险公司、保险名称、保障期限要么都填，要么都留空。')
  }
  if ((modelRef.headmaster ||
      modelRef.headmasterBirthday ||
      modelRef.headmasterExperience ||
      modelRef.headmasterEducation ||
      modelRef.headmasterPhoto) &&
    (!modelRef.headmaster ||
      !modelRef.headmasterBirthday ||
      !modelRef.headmasterExperience ||
      !modelRef.headmasterEducation ||
      !modelRef.headmasterPhoto)) {
    return message.error('填写一个校长信息后，其他信息也必填')
  }
  submitFun()
}
const submitFun = async () => {
  try {
    modelRef.environmentPhotos = []
    modelRef.insurePolicyImgs = []
    state.envPhotos.map(item => modelRef.environmentPhotos.push(item.imageNo))
    state.inPhotos.map(item => modelRef.insurePolicyImgs.push(item.imageNo))
    const res = await reqApi.school.submitVerify(modelRef)
    if (res.data) {
      message.error('操作成功')
      emits('getDetail')
    }
  } catch (err: any) {
    message.error(err)
  }
}
</script>

<style lang="scss" scoped>
.no-verify{
  .noflex{
    display: block !important;
  }
  .line-block{
    line-height: 20px;
  }
  .no-margin{
    margin-bottom: 0;
  }
  .area, .person{
    :deep(.el-input) {
      width: 240px;
    }
    .tips{
      font-size: 12px;
      padding-left: 5px;
    }
  }
  .tips{
    font-size: 14px;
  }
  .safe{
    :deep(.el-input) {
      width: 600px;
    }
  }
  .teacher{
    :deep(.el-form-item) {
      display: block;
      margin-bottom: 12px;
    }
  }
}
</style>
