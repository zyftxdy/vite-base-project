<template>
  <div class="image-view">
    <img
      ref="originEl"
      :src="src"
      :class="['w-full h-full', { 'cursor-pointer': preview }, { 'opacity-0': showMask }]"
      @click="openMask"
    />
    <div v-if="showMask" ref="maskEl" class="image-mask" @click="closeMask"></div>
  </div>
</template>

<script setup lang="ts">
import { baseProps } from './props'
import { changeStyle, adaptScale } from '@/utils/domUtils'
import { useTimeoutFn } from '@vueuse/shared'
import { useEventListener } from '@vueuse/core'

let cloneEl: HTMLElement

const props = defineProps(baseProps)
const originEl = ref<HTMLElement>()
const maskEl = ref<HTMLElement>()
const showMask = ref(false)
const transform = ref({
  scale: 1,
  offsetX: 0,
  offsetY: 0,
  isMove: false,
  isWheeling: false,
  isAnimation: false
})

const reset = () => {
  transform.value = {
    scale: 1,
    offsetX: 0,
    offsetY: 0,
    isMove: false,
    isWheeling: false,
    isAnimation: false
  }
}
const initEl = () => {
  const { left, top, width, height } = unref(originEl)?.getBoundingClientRect()!
  changeStyle(cloneEl, {
    transition: 'all .3s',
    left: `${left}px`,
    top: `${top}px`,
    width: `${width}px`,
    height: `${height}px`,
    transform: 'translate(0,0)'
  })
}

const openMask = () => {
  if (!props.preview) {
    return
  }
  showMask.value = true
  cloneEl = unref(originEl)?.cloneNode(true)! as HTMLElement
  initEl()
  nextTick(() => {
    unref(maskEl)?.appendChild(cloneEl)
    const scale = adaptScale(unref(originEl)!)
    document.body.style.overflow = 'hidden'
    transform.value.isAnimation = true
    changeStyle(cloneEl, {
      transition: 'all .3s',
      left: '50%',
      top: '40%',
      width: `${unref(originEl)?.offsetWidth! * scale}px`,
      height: 'auto',
      transform: 'translate(-50%, -40%)'
    })
    useTimeoutFn(() => {
      const { x, y, height } = cloneEl.getBoundingClientRect()
      transform.value = {
        ...transform.value,
        offsetX: x,
        offsetY: y,
        isAnimation: false
      }
      changeStyle(cloneEl, {
        transition: 'none',
        left: '0',
        top: '0',
        height: `${height}px`,
        transform: `translate(${x}px, ${y}px)`
      })
    }, 300)
    handleZoom()
    handleMouseDown()
  })
}
const closeMask = () => {
  if (unref(transform).isMove || unref(transform).isAnimation) {
    return
  }
  initEl()
  document.body.style.overflow = ''
  useTimeoutFn(() => {
    unref(maskEl)?.removeChild(cloneEl)
    reset()
    showMask.value = false
  }, 300)
}

const handleMouseDown = () => {
  useEventListener(cloneEl, 'mousedown', (e: MouseEvent) => {
    if (unref(transform).isAnimation) {
      return
    }
    console.log('按下')
    const { offsetX, offsetY } = transform.value
    const startX = e.pageX
    const startY = e.pageY
    const removeMousemove = useEventListener(cloneEl, 'mousemove', (ev: MouseEvent) => {
      // if (unref(transform).isWheeling) return
      transform.value.isMove = true
      transform.value = {
        ...transform.value,
        offsetX: offsetX + ev.pageX - startX,
        offsetY: offsetY + ev.pageY - startY
      }
      changeStyle(cloneEl, {
        transition: 'none',
        transform: `translate(${unref(transform).offsetX}px,${unref(transform).offsetY}px) scale(${
          unref(transform).scale
        })`
      })
    })
    useEventListener(cloneEl, 'mouseup', () => {
      console.log('抬起')
      removeMousemove()
      useTimeoutFn(() => {
        transform.value.isMove = false
      }, 300)
    })
    e.preventDefault()
    e.stopPropagation()
  })
}
const handleZoom = () => {
  useEventListener(unref(maskEl)!, 'wheel', (e: WheelEvent) => {
    if (unref(transform).isMove || unref(transform).isAnimation) {
      return
    }
    transform.value.isWheeling = true
    if (e.deltaY < 0) {
      transform.value.scale += 0.1
    } else {
      transform.value.scale > 0.5 && (transform.value.scale -= 0.1)
    }
    changeStyle(cloneEl, {
      transition: 'all .15s',
      transform: `translate(${unref(transform).offsetX}px, ${unref(transform).offsetY}px) scale(${
        unref(transform).scale
      })`
    })
  })
}
</script>

<style lang="scss" scoped>
.image-mask {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 2022;
  user-select: none;
  background: rgba(0, 0, 0, 0.5);
  img {
    position: absolute;
    top: 0;
    left: 0;
    max-width: 100%;
    max-height: 100%;
    transform: translateZ(0);
  }
}
</style>
