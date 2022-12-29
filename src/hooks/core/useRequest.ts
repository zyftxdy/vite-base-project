import { useDebounceFn, useThrottleFn } from '@vueuse/core'
import { useCommon } from './useCommon'
import { isBoolean, isNullOrUnDef } from '@/utils/is'
import { useCancelStore } from '@/store'
import type { Options, Method } from '#/base'

export function useRequest<T = any>(onRequest: Method, options: Partial<Options<T>> = {}) {
  const {
    defaultValue,
    immediate = false,
    debounce = false,
    delayTime = 1000,
    throttle = false,
    throttleTime = 1000,
    refreshDeps = [],
    polling = false,
    pollingInterval = 1500,
    pollingMaxCount = Infinity,
    retry = false,
    retryMaxCount = 1
  } = options

  const { message } = useCommon()
  // 请求原始参数 -- 只做保存，不做修改
  const params = ref()
  const result = ref<T>(defaultValue!)
  const loading = ref(false)

  const timer = ref<Nullable<TimeoutHandle>>(null)
  const pollingCount = ref(1)
  const retryCount = ref(0)

  // request函数主体
  const run = async (...args: any[]) => {
    params.value = [].concat(...args)
    let requestParams: any[]
    // 表示当前有请求正在处理中
    if (unref(loading)) return
    loading.value = true
    try {
      // 请求前置回调处理
      const returned = options.onBefore?.(...args)
      if (isBoolean(returned) && !returned) return
      requestParams = !isNullOrUnDef(returned) && !isBoolean(returned) ? [returned] : args

      // request请求体
      const res = await onRequest(...requestParams)
      if (res.data) {
        result.value = options.formatResult ? options.formatResult(res.data) : res.data
        // 请求成功回调处理
        options.onSuccess?.(res.data, ...args)

        // 开启轮询
        startPolling()
      } else {
        throw new Error('请求出错啦，请稍后重试！')
      }
    } catch (err: any) {
      if (err.message !== 'cancel request') {
        message({
          message: err.message,
          grouping: true,
          type: 'error'
        })
        // 请求出错回调处理
        options.onError?.(err, ...args)

        stopPolling()
        retryFn()
      } else {
        console.log('request cancel')
      }
    } finally {
      loading.value = false
      // 请求完成回调处理
      options.onFinally?.(...args)
    }
  }

  const startPolling = () => {
    if (polling && (unref(pollingCount) < pollingMaxCount || pollingMaxCount < 0)) {
      timer.value = setTimeout(() => {
        pollingCount.value += 1
        run(...unref(params))
      }, pollingInterval)
    }
  }
  const stopPolling = () => {
    if (polling && unref(timer)) {
      clearTimeout(unref(timer)!)
      timer.value = null
    }
  }

  const retryFn = () => {
    if (retry && unref(retryCount) < retryMaxCount) {
      retryCount.value += 1
      run(...unref(params))
    }
  }

  // 防抖
  const debounceRun = useDebounceFn((...args) => run(...args), delayTime)
  // 节流
  const throttleRun = useThrottleFn((...args) => run(...args), throttleTime)

  // 立即开始一次查询
  immediate && run()

  // 依赖项改变，自动触发查询
  watch(refreshDeps, () => run(...unref(params)), {
    deep: true
  })

  // 组件销毁 -- 停止未完成的请求并清空cancel集合
  onUnmounted(() => {
    stopPolling()
    const cancelStore = useCancelStore()
    if (cancelStore.cancelMap.size) cancelStore.clearMap()
  })

  return {
    result,
    loading,
    run: debounce ? debounceRun
          : throttle ? throttleRun
            : run
  }
}
