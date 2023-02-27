import type { TableColumn } from '#/base'
import { isArray } from '@/utils/is'

export type SpanModel = '' | 'col' | 'row' | 'colRow'

export const pageProps = {
  scrollTop: {
    type: Boolean,
    default: true
  },
  background: {
    type: Boolean,
    default: true
  },
  total: {
    type: Number,
    default: 0
  },
  pageNum: {
    type: Number,
    default: 1
  },
  pageSize: {
    type: Number,
    default: 10
  },
  pageSizes: {
    type: Array as PropType<number[]>,
    default: () => {
      return [10, 20, 30, 50]
    }
  },
  layout: {
    type: String,
    default: 'total, sizes, prev, pager, next, jumper'
  }
}

const commonProps = {
  showSetting: {
    type: Boolean,
    default: false
  },
  showSelect: {
    type: Boolean,
    default: false
  },
  loading: {
    type: Boolean,
    default: false
  },
  list: {
    // 列表数据
    type: Array as PropType<Recordable[]>,
    default: () => []
  },
  columns: {
    // 列数据
    type: Array as PropType<TableColumn[]>,
    default: () => []
  },
  rowKey: {
    type: String,
    default: ''
  },
  text: {
    type: String,
    default: '暂无数据'
  }
}

export const tableProps = {
  treeProps: {
    type: Object,
    default: () => {}
  },
  ...commonProps,
  ...pageProps
}

export const tableV2Props = {
  expandColumnKey: {
    type: String,
    default: ''
  },
  ...commonProps,
  ...pageProps
}

export const tableEmits = {
  sort: (value: any) => true,
  select: (value: Recordable[]) => isArray(value),
  pagination: () => true,
  ['update:page-num']: (value: number) => true,
  ['update:page-size']: (value: number) => true
}

export type TableEmits = typeof tableEmits
