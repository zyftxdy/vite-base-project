import type { TableColumn } from '#/base'

export const columns: TableColumn[] = [
  { label: '标签名称', prop: 'categoryName' },
  {
    label: '标签状态',
    prop: 'status',
    formatter: (row, column, cellValue) => (cellValue === 'DISABLE' ? '禁用' : '启用')
  },
  { label: '操作', prop: 'action', overflow: false, width: 140, fixed: 'right' }
]
