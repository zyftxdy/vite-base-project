import type { TableColumn } from '#/base'
import type { CheckboxValueType } from 'element-plus'

export interface TableAction {
  setColumns: (columns: TableColumn[]) => void
  getColumns: () => TableColumn[]
  getCacheColumns: () => TableColumn[]
}

export type SelectionCellProps = {
  value: boolean
  indeterminate?: boolean
  onChange: (value: CheckboxValueType) => void
}
