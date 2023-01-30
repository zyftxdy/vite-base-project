import echarts, { ECOption } from '@/utils/echarts'
import useWindowSizeFn from '../event/useWindowSizeFn'
import type { Ref } from 'vue'

export default function useEcharts(elRef: Ref<HTMLDivElement>) {
  const chartInstance = shallowRef<echarts.ECharts | null>(null)

  const initEcharts = () => {
    const el = unref(elRef)
    if (!el) {
      return
    }
    chartInstance.value = echarts.init(el)
  }

  const setOptions = (options: ECOption, clear = true) => {
    if (!unref(chartInstance)) {
      initEcharts()
      if (!unref(chartInstance)) {
        return
      }
    }
    clear && unref(chartInstance)?.clear()
    unref(chartInstance)?.setOption(options)
  }

  const resize = () => {
    unref(chartInstance)?.resize()
  }
  useWindowSizeFn({
    fn: resize,
    wait: 100
  })

  onBeforeUnmount(() => {
    if (!unref(chartInstance)) {
      return
    }
    unref(chartInstance)?.dispose()
    chartInstance.value = null
  })

  const getInstance = () => {
    if (!unref(chartInstance)) {
      initEcharts()
    }
    return unref(chartInstance)!
  }

  return {
    setOptions,
    chartInstance,
    getInstance
  }
}
