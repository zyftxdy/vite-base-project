<template>
  <el-skeleton :rows="5" :loading="loading" animated>
    <div class="orderDetail">
      <div class="flex items-center text-sm mb-4">
        <span class="font-bold text-base pr-2">订单号：{{ info.orderId }}</span>
        <span class="pr-2">下单时间：{{ info.createTime }}</span>
        <el-button link type="primary" @click="() => $emit('back')">返回订单列表</el-button>
      </div>
      <div class="text-sm mb-4">
        <page-title :title="`续费会员：${info.memberName}`" />
        <div>
          <span class="pr-2">性别：{{ info.genderName || '未知' }}</span>
          <span class="pr-2">出生日期：{{ info.birthday }}</span>
          <span class="pr-2"
            >联系人：{{ contactsOptions[info.contactRelation] }}{{ info.contactMobile }}</span
          >
          <span class="pr-2">所在校区：{{ info.schoolName }}</span>
        </div>
      </div>
      <div class="orderPart mb-4">
        <usual-table :list="info.payItems" :columns="payColumns" />
        <div class="text-sm text-right mt-2">
          原价{{ info.originAmount }}元，已优惠{{ info.preferential }}元 实付金额：<span
            class="price_real"
            >{{ info.realAmount }}元</span
          >
        </div>
        <page-title title="订单备注" />
        <div class="font-14px mb-4">{{ info.remark || '--' }}</div>
        <page-title title="付款备注" />
        <div class="font-14px">{{ info.paymentRemark || '--' }}</div>
      </div>
      <div class="payInfo mb-4">
        <page-title title="支付信息" />
        <description :schema="paySchema" :data="info" border />
      </div>
      <template v-if="info.orderStatus == 'REFUND_SUCCESS'">
        <div class="refund mb-4">
          <page-title title="退款项目" />
          <usual-table :list="info.refundItems" :columns="refundColumns" />
          <div class="text-sm text-right mt-2">
            退款：<span class="price_real">{{ info.refundAmount }}元</span>
          </div>
          <page-title title="退款缘由" class="mt-2" />
          <div class="text-sm">{{ info.refundReason || '--' }}</div>
        </div>
        <div class="mb-4">
          <page-title title="退款信息" />
          <description :schema="refundSchema" :data="info" border />
        </div>
      </template>
    </div>
  </el-skeleton>
</template>

<script setup lang="ts">
import { useCommon, useRequest } from '@/hooks'
import { payColumns, refundColumns, paySchema, refundSchema } from '../data'
import { contactsOptions } from '@/utils/sysBusi'

const { reqApi } = useCommon()
const props = defineProps({
  orderId: {
    type: String,
    default: ''
  }
})
defineEmits(['back'])

const { result: info, loading } = useRequest<Recordable>(
  () => reqApi.school.orderDetail({ orderId: props.orderId }),
  {
    defaultValue: {},
    immediate: true,
    formatResult: res => {
      res.preferential = (res.originAmount - res.realAmount).toFixed(2)
      return res
    }
  }
)
</script>

<style lang="scss" scoped>
.orderDetail {
  .orderPart {
    .realPrice {
      color: $EE3D11;
    }
  }
  .price_real {
    color: $EE3D11;
    font-size: 16px;
    font-weight: 700;
  }
}
</style>
