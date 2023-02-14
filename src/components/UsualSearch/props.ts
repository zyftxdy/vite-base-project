import type { SearchOptions } from '#/base'

export const pageProps = {
  pageNum: 1,
  pageSize: 10
}

export const searchProps = {
  schema: {
    type: Array as PropType<SearchOptions[]>,
    default: () => []
  },
  showExport: {
    type: Boolean,
    default: false
  },
  showArrow: {
    type: Boolean,
    default: false
  },
  labelWidth: {
    type: Number,
    default: 70
  },
  width: {
    type: Number,
    default: 220
  }
}
