import { useCommon } from '../core/useCommon'
import { setItemList } from '@/utils/mUtils'
import type { FnOptions } from '#/base'

type UseProps = {
  immediate: boolean
  target: Recordable
} & FnOptions

export default function useProvinces(options: Partial<UseProps> = {}) {
  const { target = {}, immediate = false } = options
  const { reqApi, message } = useCommon()
  const areaType = ref('')
  const areaList = ref<Recordable[]>([])

  const setType = (type?: string) => {
    switch (type) {
      case 'province':
        areaType.value = 'cityCode'
        break
      case 'city':
        areaType.value = 'districtCode'
        break
      default:
        areaType.value = 'provinceCode'
        break
    }
  }
  const getAreaList = async (code: string, type?: string) => {
    try {
      setType(type)
      options.onBefore?.()
      const res = await reqApi.common.getByParentCode({ parentCode: code })
      areaList.value = res.data
      options.onSuccess?.(res)
    } catch (err: any) {
      if (err.message !== CANCAL_REQUEST) {
        message.error(err.messgae)
        options.onError?.(err)
      }
    } finally {
      options.onFinally?.()
    }
  }
  const codeChange = (code: string, type: string) => {
    const keys = Object.keys(target)
    if (!keys.includes('listQuery') || !keys.includes('searchOptions')) {
      message.error('Target format error， Target miss listQuery or searchOptions attribute')
      return false
    }
    if (type === 'province') {
      target.listQuery.cityCode = ''
      target.listQuery.districtCode = ''
      setItemList(target.searchOptions, 'cityCode', [])
      setItemList(target.searchOptions, 'districtCode', [])
    } else {
      target.listQuery.districtCode = ''
      setItemList(target.searchOptions, 'districtCode', [])
    }
    getAreaList(code, type)
  }

  immediate && getAreaList('1')

  return {
    areaType,
    areaList,
    setType,
    getAreaList,
    codeChange
  }
}
