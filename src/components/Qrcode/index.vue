<template>
  <component :is="tag" ref="wrapRef" />
</template>

<script setup lang="ts">
import { useCommon } from '@/hooks'
import { downloadUrl } from '@/utils/download'
import { qrcodeProps, defaultOptions } from './props'
import { type QRCodeRenderersOptions, toDataURL } from 'qrcode'
import { drawCanvas, getErrorCorrectionLevel } from './drawCanvas'

const props = defineProps(qrcodeProps)
const emit = defineEmits(['done'])

const { message } = useCommon()

const wrapRef = ref<HTMLCanvasElement | HTMLImageElement | null>(null)
const getOptions = computed<QRCodeRenderersOptions>(() => ({
  ...defaultOptions,
  ...props.options
}))

const createCode = async () => {
  try {
    const { tag, codeUrl, width, options, logo } = props
    const wrapEl = unref(wrapRef)
    if (!wrapEl || !codeUrl) {
      return
    }

    // 纠错级别
    options.errorCorrectionLevel = options.errorCorrectionLevel || getErrorCorrectionLevel(codeUrl)

    if (tag === 'canvas') {
      const url = await drawCanvas({
        canvas: wrapEl,
        text: codeUrl,
        width,
        logo,
        options: unref(getOptions)
      })
      emit('done', { url, ctx: (wrapEl as HTMLCanvasElement).getContext('2d')! })
    }

    if (tag === 'img') {
      const url = await toDataURL(codeUrl, {
        width,
        ...unref(getOptions)
      })
      ;(unref(wrapRef) as HTMLImageElement).src = url
      emit('done', { url })
    }
  } catch (err: any) {
    message.error(err)
  }
}

const downLoad = (fileName?: string) => {
  let url = ''
  const wrapEl = unref(wrapRef)
  if (wrapEl instanceof HTMLCanvasElement) {
    url = wrapEl.toDataURL()
  } else if (wrapEl instanceof HTMLImageElement) {
    url = wrapEl.src
  }
  if (!url) {
    return
  }
  downloadUrl({
    url,
    fileName
  })
}

onMounted(createCode)

defineExpose({
  downLoad
})
</script>
