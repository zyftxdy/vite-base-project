<template>
  <span class="count-span" :style="styles">
    {{ value }}
  </span>
</template>

<script setup lang="ts">
import { isNumber } from '@/utils/is'
import { useTransition, TransitionPresets } from '@vueuse/core'
import type { CSSProperties } from 'vue'

const props = defineProps({
  value: {
    type: [Number, String],
    required: true,
    default: 0
  },
  styles: {
    type: Object as PropType<CSSProperties>,
    default: () => {}
  },
  duration: {
    type: Number,
    default: 1500
  },
  toFixed: {
    type: Number as PropType<0 | 2>,
    default: 0
  }
})
const source = ref(0)
const output = useTransition(source, {
  duration: props.duration,
  transition: TransitionPresets.easeInOutCubic
})
watchEffect(() => (source.value = Number(props.value)))

const value = computed(() => formatNum(unref(output)))

const formatNum = (num: number | string) => {
  let result = isNumber(num) ? num + '' : num
  result = Number(result).toFixed(props.toFixed)
  const x = result.split('.')
  let x1 = x[0]
  const x2 = x.length > 1 ? '.' + x[1] : ''
  x1 = x1.replace(/(?!^)(?=(\d{3})+$)/g, ',')
  return x1 + x2
}
</script>
