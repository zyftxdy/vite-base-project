import type { CSSProperties } from 'vue'

export interface Tab {
  label: string
  name: string
}

export const cardProps = {
  title: String,
  bordered: {
    type: Boolean,
    default: true
  },
  hoverable: {
    type: Boolean,
    default: false
  },
  loading: {
    type: Boolean,
    default: false
  },
  bodyStyle: {
    type: Object as PropType<CSSProperties>,
    default: () => {}
  },
  headStyle: {
    type: Object as PropType<CSSProperties>,
    default: () => {}
  },
  tabsList: {
    type: Array as PropType<Tab[]>,
    default: () => []
  },
  tabKey: String
}

export const MetaProps = {
  titleSize: {
    type: String as PropType<'sm' | 'base' | '2xl'>,
    default: '2xl'
  },
  title: String,
  description: String,
  direction: {
    type: String as PropType<'horizontal' | 'vertical'>,
    default: 'horizontal'
  },
  titleStyle: {
    type: Object as PropType<CSSProperties>,
    default: () => {}
  },
  descStyle: {
    type: Object as PropType<CSSProperties>,
    default: () => {}
  }
}
