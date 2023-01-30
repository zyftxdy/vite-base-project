<template>
  <div class="merchant flex py-2">
    <div class="merchant_left flex-1 text-center">
      <div class="title text-base text-gray-800">监管账户信息</div>
      <div class="text-sm my-3 mx-1 text-gray-500">
        企业名称：<span class="text-gray-700">{{ data.bankSuperviseAccountName }}</span>
      </div>
      <div class="text-sm my-3 mx-1 text-gray-500">
        监管账户账号：<span class="text-gray-700">{{ data.bankSuperviseAccount }}</span>
      </div>
      <div class="text-sm my-3 mx-1 text-gray-500">
        监管账户开户行：<span class="text-gray-700">{{ data.bankSuperviseActbkApltn }}</span>
      </div>
      <div v-if="data.bankSuperviseAcctsBal" class="text-sm my-3 mx-1 text-gray-500">
        监管账户当前余额：<span class="text-gray-700">{{ data.bankSuperviseAcctsBal }}元</span>
      </div>
    </div>
    <div v-if="trdAmt" class="merchant_arrow text-center">
      <div class="text-gray-800">划拨金额</div>
      <div class="text-xl text-red-600 pt-4">{{ trdAmt }}元</div>
      <div class="text-5xl">
        <el-icon><i-ep-right /></el-icon>
      </div>
    </div>
    <div v-else class="merchant_arrow text-5xl pt-12">
      <el-icon><i-ep-right /></el-icon>
    </div>
    <div class="merchant_right flex-1 text-center">
      <div class="title text-base text-gray-800">一般账户信息</div>
      <div class="text-sm my-3 mx-1 text-gray-500">
        企业名称：<span class="text-gray-700">{{ data.bankTransferAccountName }}</span>
      </div>
      <div class="text-sm my-3 mx-1 text-gray-500">
        一般账户账号：<span class="text-gray-700">{{ data.bankTransferAccount }}</span>
      </div>
      <div class="text-sm my-3 mx-1 text-gray-500">
        一般账户开户行：<span class="text-gray-700">{{ data.bankTransferActbkApltn }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  data: {
    type: Object,
    default: () => {}
  },
  trdAmt: String
})
</script>
