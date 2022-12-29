import { enableStatus } from '@/utils/constant'
import { enableOptions } from '@/utils/sysBusi'
import type { SearchOptions, TableColumn } from '#/base'

export const listQuery = () => ({
  keyWord: '',
  roleId: '',
  status: '',
  current: 1,
  size: 20
})

export const searchOptions = (): SearchOptions[] => ([
  {
    type: 'input',
    label: '搜索员工',
    prop: 'keyWord',
    placeholder: "请输入姓名或手机号"
  },
  {
    type: 'select',
    label: '员工职位',
    prop: 'roleId',
    optionsList: [],
    optionKey: 'roleId',
    optionLabel: 'name',
    clearable: true,
    filterable: true
  },
  {
    type: 'select',
    label: '员工状态',
    prop: 'status',
    optionsList: enableStatus
  }
])

export const columns: TableColumn[] = [
  { label: '姓名', prop: 'name' },
  { label: '手机号', prop: 'mobile' },
  { label: '职位', prop: 'roleName' },
  { label: '所在部门', prop: 'deptName' },
  { label: '账号状态', prop: 'status', formatter: (row, cloumn, cellValue) => enableOptions[cellValue] },
  { label: '创建时间', prop: 'createTime', width: 140 },
  { label: '操作', prop: 'action', overflow: false,  width: 140, fixed: 'right' }
]
