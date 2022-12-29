import { useCommon } from '../core/useCommon'
import { isArray } from '@/utils/is'
import type { FnOptions } from '#/base'

type DepartProps = {
  FnType: 'depart' | 'departTree' | 'departLimit'
  immediate: boolean
} & FnOptions

export default function useDepart(options: Partial<DepartProps> = {
  FnType: 'depart',
  immediate: false
}) {

  const { reqApi, message } = useCommon()
  const deptList = ref<Recordable[]>([])
  const method = computed(() =>
    options.FnType === 'depart' ? reqApi.common.deptList :
      options.FnType === 'departTree' ? reqApi.depart.deptTree :
        reqApi.dashboard.deptTree
  )

  const getDepart = async () => {
    try {
      options.onBefore?.()
      const res = await unref(method)()
      if (res.data) {
        deptList.value = isArray(res.data) ? res.data : [res.data]
        options.onSuccess?.(res.data)
      } else {
        message.error('部门树为空，请稍后重试')
      }
    } catch (err: any) {
      if (err.message !== '取消请求') {
        message.error(err)
        options.onError?.(err)
      }
    } finally {
      options.onFinally?.()
    }
  }

  options.immediate && getDepart()

  return {
    deptList,
    getDepart
  }
}
