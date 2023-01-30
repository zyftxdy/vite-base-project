import { approvalStatus } from '@/utils/constant'
import { approvalOptions } from '@/utils/sysBusi'
import { toFixedNum } from '@/utils/mUtils'
import type { SearchOptions, TableColumn } from '#/base'

export const listQuery = () => ({
  courseName: '',
  approveStatus: '',
  current: 1,
  size: 20
})

export const searchOptions = (): SearchOptions[] => [
  {
    type: 'input',
    label: '课程名称',
    prop: 'courseName',
    placeholder: '请输入课程名称'
  },
  {
    type: 'select',
    label: '审核状态',
    prop: 'approveStatus',
    optionsList: approvalStatus
  }
]

export const columns: TableColumn[] = [
  { label: '课程名称', prop: 'courseName' },
  {
    label: '课程类别',
    prop: 'bigCategoryName',
    formatter: (row, column, cellValue) => `${cellValue}-${row.middleCategoryName}`
  },
  {
    label: '适用年龄',
    prop: 'miniAge',
    formatter: (row, column, cellValue) => `${cellValue}-${row.maxAge}岁`
  },
  { label: '总课时数', prop: 'courseTotalHour' },
  {
    label: '课时时长（/节）',
    prop: 'courseDuration',
    width: 140,
    formatter: (row, column, cellValue) => `${cellValue}min`
  },
  {
    label: '商品原价',
    prop: 'originAmount',
    formatter: (row, column, cellValue) => toFixedNum(cellValue)
  },
  {
    label: '商品优惠价',
    prop: 'realAmount',
    formatter: (row, column, cellValue) => toFixedNum(cellValue)
  },
  {
    label: '状态',
    prop: 'approveStatus',
    formatter: (row, column, cellValue) => approvalOptions[cellValue]
  },
  { label: '操作', prop: 'action', overflow: false, width: 140, fixed: 'right' }
]
