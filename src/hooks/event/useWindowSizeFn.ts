import { tryOnMounted, tryOnUnmounted, useDebounceFn, useThrottleFn } from '@vueuse/core'

interface FnProps {
  fn: Fn
  wait: number
  throttle?: boolean
  immediate?: boolean
}

export default function useWindowSizeFn({
  fn,
  wait,
  throttle = false,
  immediate = false
}: FnProps) {
  const handleFn = throttle ? useThrottleFn(fn, wait) : useDebounceFn(fn, wait)

  const start = () => {
    if (immediate) {
      fn()
    }
    window.addEventListener('resize', handleFn)
  }

  const stop = () => {
    window.removeEventListener('resize', handleFn)
  }

  tryOnMounted(() => {
    start()
  })

  tryOnUnmounted(() => {
    stop()
  })

  return [start, stop]
}
