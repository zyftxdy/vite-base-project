import { useCommon } from './core/useCommon'
import { useGo } from './core/useCore'
import useMessage from './core/useMessage'
import useEcharts from './core/useEcharts'
import { useRequest } from './core/useRequest'

import useClipboard from './event/useClipboard'
import useWindowSizeFn from './event/useWindowSizeFn'

import usePerm from './web/usePerm'
import useTabs from './web/useTabs'

export {
  useGo,
  useCommon,
  useMessage,
  useTabs,
  useEcharts,
  useRequest,
  useClipboard,
  useWindowSizeFn,
  usePerm
}
