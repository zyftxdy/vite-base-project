import type { VNode, WatchSource } from 'vue'
import type { ResponseType } from '@/utils/axios/types'
import type { CascaderProps, CascaderOption } from 'element-plus'

export type EchartTrigger = 'axis' | 'item' | 'none'

export type ImgLimit = 'jpg' | 'png' | 'jpeg'

export type DateType = 'DAY' | 'MONTH' | 'YEAR' | 'YESTERDAY'

export type SearchType = 'input' | 'select' | 'date' | 'cascader' | 'slot'

export type Method = (...args: any[]) => Promise<ResponseType>

export type LabelValueOptions = {
  label: string,
  value: string
}

export interface LoginRef {
  username: string,
  password: string
}

export interface PageParam {
  current: number,
  size: number
}

export interface SearchOption {
  width?: number,
  type: SearchType,
  label: string,
  prop: string,
  placeholder?: string,
  method?: Fn,
  icon?: boolean,
  // select
  optionsList?: Recordable[],
  optionKey?: string,
  optionLabel?: string,
  multiple?: boolean,
  filterable?: boolean,
  remote?: boolean,
  clearable?: boolean,
  selectType?: string,
  remoteMethod?: Fn,
  clearMethod?: Fn,
  // cascader
  props?: CascaderProps,
  options?: CascaderOption[],
  showAllLevels?: boolean,
  // date
  disabledDate?: (val: Date) => boolean
}

export type SearchOptions = SearchOption | SearchOption[]

export interface TableColumn {
  label: string
  prop: string
  align?: 'left' | 'center' | 'right'
  sortable?: boolean | 'custom'
  width?: number
  overflow?: boolean
  merge?: boolean
  fixed?: true | 'left' | 'right'
  formatter?: (row?: any, column?: any, cellValue?: any, index?: number) => any
  renderHeader?: (cellValue: any, data?: any) => VNode | undefined | JSX.Element | Element | string | number
  render?: (cellValue: any, data?: any) => VNode | undefined | JSX.Element | Element | string | number
}

export interface FileList {
  imageNo: string
  imageUrl: string
}

export interface CropperResult {
  url: string
  blob: Blob
}

export interface QueryState {
  listQuery: Recordable,
  searchOptions: SearchOptions[]
  [x: string]: any
}

export interface ListState {
  list: Recordable[]
  columns: TableColumn[]
  loading?: boolean
  total?: number
  [x: string]: any
}

export interface FnOptions {
  onBefore: Fn
  onSuccess: Fn
  onError: Fn
  onFinally: Fn
}
export interface Options<T> extends FnOptions {
  defaultValue: T
  immediate: boolean
  debounce: boolean
  delayTime: number
  throttle: boolean,
  throttleTime: number,
  refreshDeps: WatchSource[]
  polling: boolean
  pollingInterval: number
  pollingMaxCount: number
  retry: boolean
  retryMaxCount: number
  formatResult: Fn
}
