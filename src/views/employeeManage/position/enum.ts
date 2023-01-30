import { enableOptions } from '@/utils/sysBusi'
import type { TableColumn } from '#/base'
import { TreeKey } from 'element-plus/es/components/tree/src/tree.type'

export interface ModelRef {
  name: string
  status: string
  remarks: string
  resourceIds: any[]
  roleId?: string
}

export interface CheckedList {
  checkedKeys: TreeKey[]
}

export const columns: TableColumn[] = [
  { label: '职位名称', prop: 'name' },
  { label: '员工数量', prop: 'num' },
  {
    label: '状态',
    prop: 'status',
    formatter: (row, column, cellValue) => enableOptions[cellValue]
  },
  { label: '职位备注', prop: 'remarks' },
  { label: '操作', prop: 'action', overflow: false, width: 140, fixed: 'right' }
]
