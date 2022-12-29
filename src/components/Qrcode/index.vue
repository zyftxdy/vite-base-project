<template>
  <component :is="tag" ref="wrapRef"/>
</template>

<script setup lang="ts">
import { useCommon } from '@/hooks'
import { downloadUrl } from '@/utils/download'
import { toDataURL, QRCodeRenderersOptions } from 'qrcode'
import { drawCanvas, getErrorCorrectionLevel } from './drawCanvas'

const props = defineProps({
  codeUrl: {
    type: String,
    required: true
  },
  width: {
    type: Number,
    default: 200
  },
  logo: {
    type: String,
    default: ''
  },
  options: {
    type: Object as PropType<QRCodeRenderersOptions>,
    default: {
      margin: 2
    }
  },
  tag: {
    type: String as PropType<'canvas' | 'img'>,
    default: 'canvas'
  }
})
const emit = defineEmits(['done'])

const { message } = useCommon()

const wrapRef = ref<HTMLCanvasElement | HTMLImageElement | null>(null)
const downUrl = ref('')

const createCode = async () => {
  try {
    const { tag, codeUrl, width, options, logo } = props
    const wrapEl = unref(wrapRef)
    if (!wrapEl) return

    options.errorCorrectionLevel = options.errorCorrectionLevel || getErrorCorrectionLevel(codeUrl)

    if (tag === 'canvas') {
      const url = await drawCanvas({
        canvas: wrapEl,
        text: codeUrl,
        width,
        logo,
        options: {
          ...options
        }
      })
      downUrl.value = url
      emit('done', url)
    }

    if (tag === 'img') {
      const url = await toDataURL(codeUrl, {
        width,
        ...options
      });
      (unref(wrapRef) as HTMLImageElement).src = url
      downUrl.value = url
      emit('done', url)
    }
  } catch (err: any) {
    message.error(err)
  }
}

const downLoad = (fileName?: string) => {
  const url = unref(downUrl)
  if (!url) return
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
