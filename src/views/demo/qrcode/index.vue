<template>
  <div class="qrcod-box grid grid-cols-3 gap-4">
    <card title="基础示例">
      <qrcode :code-url="qrcodeUrl" class="m-auto"/>
    </card>

    <card title="渲染成img标签示例">
      <qrcode :code-url="qrcodeUrl" tag="img" class="m-auto"/>
    </card>

    <card title="配置样式示例">
      <qrcode
        :code-url="qrcodeUrl"
        :options="{
          color: { dark: '#467dd8' }
        }"
        class="m-auto"/>
    </card>

    <card title="logo配置示例">
      <qrcode
        :code-url="qrcodeUrl"
        logo="https://vebn.oss-cn-beijing.aliyuncs.com/vben/logo.png"
        class="m-auto"/>
    </card>

    <card title="下载示例">
      <qrcode
        :code-url="qrcodeUrl"
        ref="qrcodeRef"
        class="m-auto"/>
      <el-button class="btn-small btn-border-color m-auto block" @click="downLoad">下载</el-button>
    </card>
    <card title="配置大小示例">
      <qrcode :code-url="qrcodeUrl" :width="300" class="m-auto"/>
    </card>
    <card title="扩展绘制示例">
      <qrcode
        :code-url="qrcodeUrl"
        logo="https://vebn.oss-cn-beijing.aliyuncs.com/vben/logo.png"
        :options="{
          margin: 5
        }"
        @done="done"
        ref="qrRef"
        class="m-auto"/>
      <el-button class="btn-small btn-border-color m-auto block" @click="downLoadR">下载</el-button>
      <div class="msg text-center text-xs text-rose-500 mt-1">要进行扩展绘制则不能将tag设为img</div>
    </card>
  </div>
</template>

<script setup lang="ts">
import type { CallbackParam, QrCodeActionType } from '@/components/Qrcode/type'

const qrcodeUrl = 'https://github.com/zyftxdy/vite-base-project'

const qrcodeRef = ref<QrCodeActionType>()
const qrRef = ref<QrCodeActionType>()
const downLoad = () => {
  const qrEl = unref(qrcodeRef)
  if (!qrEl) return
  qrEl.downLoad('qrcode')
}
const downLoadR = () => {
  const qrEl = unref(qrRef)
  if (!qrEl) return
  qrEl.downLoad('qrcode')
}
const done = ({url, ctx}: CallbackParam) => {
  ctx.fillStyle = 'black'
  ctx.font = '16px "微软雅黑"'
  ctx.textBaseline = 'bottom'
  ctx.textAlign = 'center'
  ctx.fillText('你帅你先扫', 100, 195, 200)
}
</script>
