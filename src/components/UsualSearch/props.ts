import type { SearchOptions } from '#/base'

export const searchProps = {
  searchOptions: {
    type: Array as PropType<SearchOptions[]>,
    default: () => []
  },
  listQuery: {
    type: Object as PropType<Recordable>,
    default: () => {}
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

export interface State {
  query: Recordable
  options: SearchOptions[]
  showUp: boolean
  overHeight: number
}
