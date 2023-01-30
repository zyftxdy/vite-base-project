import { CSSProperties, VNode } from 'vue'

export interface DescItem {
  labelMinWidth?: number
  labelStyle?: CSSProperties
  contentMinWidth?: number
  contentStyle?: CSSProperties
  field: string
  label: string
  slot?: boolean
  monopolize?: boolean
  render?: (
    val: any,
    data: Recordable
  ) => VNode | undefined | JSX.Element | Element | string | number
}

export interface CellConfig {
  component: 'th' | 'td' | ['th', 'td']
  type?: 'label' | 'content'
}
