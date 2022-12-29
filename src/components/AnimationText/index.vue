<template>
  <div class="animationText">
    <div ref="sourceRef" style="display: none" v-html="source"></div>
    <div ref="outputRef"></div>
  </div>
</template>

<script setup lang="ts">
import AnimationText from '@/utils/animationText'

let animationText: AnimationText
const props = defineProps({
  source: {
    type: String,
    default: ''
  },
  delay: {
    type: Number,
    default: 30
  }
})

const sourceRef = ref<HTMLDivElement>()
const outputRef = ref<HTMLDivElement>()

onMounted(() => {
  animationText = new AnimationText({
    source: unref(sourceRef) as HTMLDivElement,
    output: unref(outputRef) as HTMLDivElement,
    delay: props.delay
  })
  animationText.start()
})

onBeforeUnmount(() => {
  animationText.stop()
})
</script>
