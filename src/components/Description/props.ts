import { DescItem } from './typing'

export const props = {
  column: {
    type: Number,
    default: 3
  },
  schema: {
    type: Array as PropType<DescItem[]>,
    required: true,
    default: () => []
  },
  data: {
    type: Object,
    required: true,
    default: () => {}
  },
  direction: {
    type: String as PropType<'horizontal' | 'vertical'>,
    default: 'horizontal'
  },
  border: {
    type: Boolean,
    default: false
  }
}

export const itemProps = {
  cellData: {
    type: Array as PropType<DescItem[]>,
    default: () => []
  },
  index: Number,
  ...props
}
