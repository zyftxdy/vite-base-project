<template>
  <page-title title="办学资质" />
  <div class="verify-content mb-4">
    <div class="text-gray-600 text-sm">校区面积300平米 ,生均面积1.00平米/人</div>
  </div>
  <page-title title="校区环境" />
  <div class="verify-content mb-4">
    <div class="text-gray-600 text-sm">校区面积300平米 ,生均面积1.00平米/人</div>
  </div>
  <page-title title="责任保险" />
  <div class="verify-content mb-4">
    <div class="text-gray-600 text-sm">
      保险名称：小黄帽教培机构责任险，承保公司：中国平安保险公司，保障期限：2021-12-1至2022-12-1。
    </div>
  </div>
  <page-title title="师资力量" />
  <div class="verify-content mb-4">
    <div class="text-gray-600 text-sm">
      该校区未聘用中小学在职教师，专职教师人数26人，占教师总数的60%，符合国家及各省教育部门标准。校长履历符合各省教育部门标准。
    </div>
    <div class="flex">
      <div class="teacher mr-10 flex items-center">
        <div ref="grap" class="grap" :style="{ width: '132px', height: '132px' }" />
        <div class="message text-xs text-gray-600">
          <span class="flex items-center mb-1"
            ><span class="logo bg-blue-500"></span>1位专职教师</span
          >
          <span class="flex items-center mb-1"
            ><span class="logo bg-yellow-500"></span>1位兼职教师</span
          >
        </div>
      </div>
      <div class="headmaster flex items-center">
        <el-image src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg" />
        <div class="message flex flex-col pl-2.5 text-xs text-gray-500">
          <span class="text-base flex items-center text-gray-700 pb-1.5">
            <span>樊花妮</span>
            <span class="logo">校长</span>
          </span>
          <span class="pb-1.5">1岁，本科</span>
          <span class="pb-1.5">1年教育教学经验</span>
        </div>
      </div>
    </div>
  </div>
  <page-title title="日常经营" />
  <div class="verify-content margin-bottom15">
    <div class="text-gray-600 text-sm">办学7年，营业时间9：00-20：00，无违规记录</div>
    <div class="text-gray-600 text-sm">
      <span>核验时间：123</span>
      <span>有效期至123 </span>
    </div>
  </div>
  <el-button class="btn-small btn-border-color" type="primary" @click="handleClick"
    >再次验证</el-button
  >
</template>

<script setup lang="ts">
const props = defineProps({
  formData: {
    type: Object,
    default: () => {}
  }
})

const handleClick = () => {}
</script>

<style lang="scss" scoped>
.verify-content {
  .teacher {
    .message {
      .logo {
        width: 14px;
        height: 14px;
        padding: 0;
        margin-right: 5px;
        display: inline-block;
      }
    }
  }
  .headmaster {
    :deep(.el-image) {
      width: 68px;
      height: 68px;
    }
    .message {
      .logo {
        width: 45px;
        height: 16px;
        line-height: 16px;
        border-radius: 1px;
        background: linear-gradient(141deg, #ffc145 0%, #ff9c40 100%);
        color: rgba(255, 255, 255, 1);
        font-size: 12px;
        text-align: center;
        margin-left: 10px;
      }
    }
  }
}
</style>
