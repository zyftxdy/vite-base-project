import type { VNode, WatchSource } from 'vue'
import type { ResponseType } from '@/utils/axios/types'
import type { CascaderProps, CascaderOption } from 'element-plus'

export type EchartTrigger = 'axis' | 'item' | 'none'

export type ImgLimit = 'jpg' | 'png' | 'jpeg'

export type DateType = 'DAY' | 'MONTH' | 'YEAR' | 'YESTERDAY'

export type Method = (...args: any[]) => Promise<ResponseType>

export type LabelValueOptions = {
  label: string
  value: string
}

export interface LoginRef {
  username: string
  password: string
}

/** search组件类型声明 **/
export type SearchType = 'INPUT' | 'SELECT' | 'DATE' | 'CASCADER' | 'SLOT'
export declare type IDatePickerType =
  | 'year'
  | 'month'
  | 'date'
  | 'dates'
  | 'week'
  | 'datetime'
  | 'datetimerange'
  | 'daterange'
  | 'monthrange'
export interface SearchDateOption {
  dateType: IDatePickerType
  format: string
  valueFormat: string
  unlinkPanels: boolean
  startPlaceholder: string
  endPlaceholder: string
  disabledDate: (val: Date) => boolean
}
export interface SearchSelectOption {
  optionsList: Recordable[]
  optionKey: string
  optionLabel: string
  multiple: boolean
  filterable: boolean
  remote: boolean
  clearable: boolean
  selectType: string
  remoteMethod: Fn
  clearMethod: Fn
}
export interface SearchCascaderOption {
  props: CascaderProps
  options: CascaderOption[]
  showAllLevels: boolean
}
export interface SearchInputOption {
  icon: boolean
}
export interface SearchBaseOption {
  width?: number
  component: SearchType
  label: string
  field: string
  defaultValue?: any
  placeholder?: string
  method?: Fn
}
export type SearchOption = SearchBaseOption & Partial<SearchInputOption> & Partial<SearchDateOption> & Partial<SearchSelectOption> & Partial<SearchCascaderOption>
export type SubSearchOption = PickToRequired<SearchOption, 'field' | 'component'>
export interface SearchGroup extends Pick<SearchBaseOption, 'label' | 'field'> {
  component: 'GROUP'
  infix?: string
  subOptions: SearchOption[]
}
export type SearchOptions = SearchOption | SearchGroup
/** search组件类型声明 **/


/** table组件类型声明 **/
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
  renderHeader?: (
    cellValue: any,
    data?: any
  ) => VNode | undefined | JSX.Element | Element | string | number
  render?: (
    cellValue: any,
    data?: any
  ) => VNode | undefined | JSX.Element | Element | string | number
}
/** table组件类型声明 **/

export interface FileList {
  imageNo: string
  imageUrl: string
}


export interface QueryState {
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
  throttle: boolean
  throttleTime: number
  refreshDeps: WatchSource[]
  polling: boolean
  pollingInterval: number
  pollingMaxCount: number
  retry: boolean
  retryMaxCount: number
  formatResult: Fn<T>
}
