<template>
  <el-skeleton :rows="5" :loading="loading" animated>
    <div class="transfer_hand">
      <page-title title="重要提示" text-color="#DF3A2A" bg-color="#DF3A2A"/>
      <div class="pb-3 text-base font-medium">
        <animation-text source="您正在手动操作资金划拨，手动划拨完成后监管账户资金将立刻转入教培机构一般账户内。因本次手动操作记录无法与系统原一课一消数据关联，有可能导致监管系统中财务数据出现对账错误等问题，请您注意并确认您有权执行本次操作！如有疑问请联系：400-829-1566"/>
      </div>
      <page-title title="请您注意核对如下信息" text-color="#DF3A2A" bg-color="#DF3A2A"/>
      <description :column="4" :schema="schema" :data="result"/>
      <transfer-info :data="result"/>
      <div class="submit_form">
        <el-form ref="formRef" :model="operState" :rules="rulesRef">
          <el-form-item label="划拨金额：" prop="trdAmt">
            <el-input :disabled="!!operState.transferSummaryId" v-model="operState.trdAmt" placeholder="金额需小于当前监管金额"/>
          </el-form-item>
          <el-form-item label="备注信息：" prop="remark">
            <el-input
              v-model="operState.remark"
              :rows="4"
              type="textarea"
              placeholder="请输入本次手动划拨原由"/>
          </el-form-item>
          <el-form-item label="上传资料：" class="is-required">
            <usual-upload
              type="list"
              v-model:fileList="operState.imgs"
              :max-length="10"
              :upload-url="publicUploadFile"
              :image-limit="['jpg']"/>
          </el-form-item>
        </el-form>
        <div class="text-center">
          <el-button class="btn-small btn-border-color" type="primary" @click="handleSubmit">确认提交</el-button>
          <el-button class="btn-small btn-usual" @click="$emit('back')">返回列表</el-button>
        </div>
      </div>
      <el-dialog
        v-model="operState.show"
        title="提示"
        width="880px"
        :close-on-click-modal="false"
      >
        <div class="title text-base text-gray-800">请再次确认本次操作内容：</div>
        <description :schema="schemaDialog" :data="result"/>
        <transfer-info :data="result" :trd-amt="operState.trdAmt"/>
        <div class="text-center pt-2">
          <el-button :loading="operLoading" class="btn-small btn-border-color" type="primary" @click="handleOk">确认无误</el-button>
        </div>
      </el-dialog>
    </div>
  </el-skeleton>
</template>

<script setup lang="ts">
import { schema, schemaDialog } from '../data'
import { useCommon, useRequest } from '@/hooks'
import { useRouteQuery, useRouteParams } from '@vueuse/router'
import { vaildFloat } from '@/utils/vaildate'
import { publicUploadFile } from '@/utils/constant'
import TransferInfo from './transfer_info.vue'
import type { FileList } from '#/base'
import type { FormInstance, FormRules } from 'element-plus'

defineEmits(['back'])

const { reqApi, message, router } = useCommon()
const formRef = ref<FormInstance>()
const operState = reactive({
  transferSummaryId: '',
  trdAmt: '',
  imgs: [] as FileList[],
  remark: '',
  show: false
})
const rulesRef = reactive<FormRules>({
  trdAmt: [{ required: true, message: '请输入要划拨的金额', trigger: 'blur' }],
  remark: [{ required: true, message: '请输入备注信息', trigger: 'blur' }]
})
const imgUrls = computed(() => operState.imgs.map(item => item.imageNo))

const { result, loading, run: getDetail } = useRequest<Recordable>(data =>
  operState.transferSummaryId ? reqApi.transfer.transInfo(data)
    : reqApi.school.transferHandDetail(data),
{
  defaultValue: {},
  immediate: true,
  onBefore: () =>
    operState.transferSummaryId ? { transferSummaryId: operState.transferSummaryId }
      : { schoolId: useRouteQuery('id', '').value }
})

operState.trdAmt = useRouteParams('trdAmt', '').value
operState.transferSummaryId = useRouteParams('transferSummaryId', '').value

const handleSubmit = () => {
  unref(formRef)?.validate((valid, fields) => {
    if (valid) {
      if (!vaildFloat(operState.trdAmt)
        || parseFloat(operState.trdAmt) > parseFloat(unref(result).bankSuperviseAcctsBal)) {
        message.warning('请输入正确的金额，且金额需小于当前监管金额')
        return false
      }
      if (!unref(imgUrls).length) {
        message.warning('请上传资料图片')
        return false
      }
      operState.show = true
    } else {
      console.log('error submit!', fields)
    }
  })
}
const { loading: operLoading, run: handleOk } = useRequest(() => reqApi.school.transferHand({
  trdAmt: operState.trdAmt,
  imgUrls: unref(imgUrls),
  remark: operState.remark,
  schoolId: useRouteQuery('id', '').value,
  transferSummaryId: operState.transferSummaryId
}), {
  onSuccess: () => {
    operState.show = false
    operState.imgs = []
    operState.trdAmt = ''
    operState.remark = ''
    message.success('划拨成功')
    operState.transferSummaryId ? router.go(-1) : getDetail()
  }
})
</script>

<style lang="scss" scoped>
.transfer_hand{
  :deep(.el-input),
  :deep(.el-textarea){
    width: 400px;
  }
}
</style>
