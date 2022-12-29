import { approvalStatus } from '@/utils/constant'
import { approvalOptions } from '@/utils/sysBusi'
import { toFixedNum } from '@/utils/mUtils'
import type { SearchOptions, TableColumn } from '#/base'
import type { CascaderProps } from 'element-plus'

export const listQuery = () => ({
  brandName: '',
  schoolName: '',
  cascaders: '',
  bigCategoryId: '',
  middleCategoryId: '',
  courseName: '',
  approveStatus: '',
  current: 1,
  size: 20
})

export const searchOptions = (props: Partial<CascaderProps>, handleChange: Fn): SearchOptions[] => ([
  {
    type: 'input',
    label: '品牌名称',
    prop: 'brandName',
    placeholder: '请输入品牌名称或所属人手机号'
  },
  {
    type: 'input',
    label: '校区名称',
    prop: 'schoolName'
  },
  {
    type: 'cascader',
    label: '课程分类',
    prop: 'cascaders',
    props: props,
    clearable: true,
    method: handleChange
  },
  {
    type: 'input',
    label: '课程名称',
    prop: 'courseName'
  },
  {
    type: 'select',
    label: '审核状态',
    prop: 'approveStatus',
    optionsList: approvalStatus
  }
])

export const columns: TableColumn[] = [
  { label: '品牌名称', prop: 'brandName', width: 200 },
  { label: '品牌所属人', prop: 'ownerName' },
  { label: '校区名称', prop: 'schoolName' },
  { label: '课程名称', prop: 'courseName', width: 160 },
  { label: '课程类别', prop: 'bigCategoryName', width: 160, formatter: (row, column, cellValue) => `${cellValue}-${row.middleCategoryName}` },
  { label: '适用年龄', prop: 'miniAge', formatter: (row, column, cellValue) => `${cellValue}-${row.maxAge}岁` },
  { label: '总课时数', prop: 'courseTotalHour' },
  { label: '课时时长（/节）', prop: 'courseDuration', width: 140, formatter: (row, column, cellValue) => `${cellValue}min` },
  { label: '商品原价', prop: 'originAmount', formatter: (row, column, cellValue) => toFixedNum(cellValue) },
  { label: '商品优惠价', prop: 'realAmount', formatter: (row, column, cellValue) => toFixedNum(cellValue) },
  { label: '提交时间', prop: 'submitTime', width: 180 },
  { label: '状态', prop: 'approveStatus', formatter: (row, column, cellValue) => approvalOptions[cellValue] },
  { label: '操作', prop: 'action', overflow: false,  width: 140, fixed: 'right' }
]
