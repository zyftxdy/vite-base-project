import { enableOptions } from '@/utils/sysBusi'
import type { TableColumn } from '#/base'

export interface ModelRef {
  pid: string
  name: string
  properties: string
  status: string
  remarks: string
  deptId?: string
}

export const columns: TableColumn[] = [
  { prop: 'name', label: '部门名称', align: 'left' },
  {
    prop: 'properties',
    label: '部门性质',
    formatter: (row, column, cellValue) => (cellValue === 'PRIVATE' ? '内部管理' : '对外办公')
  },
  {
    prop: 'status',
    label: '部门状态',
    formatter: (row, column, cellValue) => enableOptions[cellValue]
  },
  { prop: 'remarks', label: '备注' },
  { label: '操作', prop: 'action', width: 140, fixed: 'right' }
]
