<template>
  <div :class="getClass" :style="getWrapperStyle">
    <img
      v-show="isReady"
      ref="imgRef"
      :src="src"
      :crossorigin="crossorigin"
      :style="getImageStyle"
    />
  </div>
</template>

<script setup lang="ts">
// 文档地址：https://blog.csdn.net/qq_41926416/article/details/121331665
import Cropper from 'cropperjs'
import 'cropperjs/dist/cropper.css'
import { useDebounceFn } from '@vueuse/shared'
import { dataURLtoBlob } from '@/utils/file'
import type { CSSProperties } from 'vue'

type Options = Cropper.Options

const defaultOptions: Options = {
  aspectRatio: 1,
  zoomable: true,
  zoomOnTouch: true,
  zoomOnWheel: true,
  cropBoxMovable: true,
  cropBoxResizable: true,
  toggleDragModeOnDblclick: true,
  autoCrop: true,
  background: true,
  highlight: true,
  center: true,
  responsive: true,
  restore: true,
  checkCrossOrigin: true,
  checkOrientation: true,
  scalable: true,
  modal: true,
  guides: true,
  movable: true,
  rotatable: true
}

const props = defineProps({
  src: { type: String, required: true },
  height: { type: [String, Number], default: '360px' },
  circled: { type: Boolean, default: false },
  crossorigin: {
    type: String as PropType<'' | 'anonymous' | 'use-credentials' | undefined>,
    default: undefined,
  },
  imageStyle: { type: Object as PropType<CSSProperties>, default: () => ({}) },
  options: { type: Object as PropType<Options>, default: () => ({}) }
})
const emits = defineEmits(['cropend'])

const imgRef = ref<HTMLImageElement>()
const cropper = ref<Cropper>()
const isReady = ref(false)

const getClass = computed(() => props.circled ? 'cropper-circled' : '')
const getImageStyle = computed((): CSSProperties => ({
  height: props.height,
  maxWidth: '100%',
  ...props.imageStyle
}))
const getWrapperStyle = computed((): CSSProperties => ({
  height: `${props.height}`.replace(/px/, '') + 'px'
}))


const init = () => {
  const imgEl = unref(imgRef)!
  if (!imgEl) return
  cropper.value = new Cropper(imgEl, {
    ...defaultOptions,
    ready: () => {
      isReady.value = true
      croppered()
    },
    crop: () => {
      debounceCroppered()
    },
    cropmove: () => {
      debounceCroppered()
    },
    zoom: () => {
      debounceCroppered()
    },
    ...props.options
  })
}

const debounceCroppered = useDebounceFn(() => croppered(), 100)

const croppered = () => {
  if (!unref(cropper)) return
  const canvas = unref(cropper)?.getCroppedCanvas()!
  const url = props.circled ? getRoundedCanvas(canvas).toDataURL() : canvas.toDataURL()
  const blob = dataURLtoBlob(url)
  emits('cropend', {
    url,
    blob
  })
}

const getRoundedCanvas = (sourceCanvas: HTMLCanvasElement) => {
  const canvas = document.createElement('canvas')
  const context = canvas.getContext('2d')!
  const width = sourceCanvas.width
  const height = sourceCanvas.height
  canvas.width = width
  canvas.height = height
  context.imageSmoothingEnabled = true
  context.drawImage(sourceCanvas, 0, 0, width, height)
  context.globalCompositeOperation = 'destination-in'
  context.beginPath()
  context.arc(width / 2, height / 2, Math.min(width, height) / 2, 0, 2 * Math.PI, true)
  context.fill()
  return canvas
}

onMounted(init)

onUnmounted(() => {
  unref(cropper)?.destroy()
})
</script>

<style lang="scss" scoped>
.cropper-circled{
  :deep(.cropper-view-box),
  :deep(.cropper-face) {
    border-radius: 50%;
  }
}
</style>
