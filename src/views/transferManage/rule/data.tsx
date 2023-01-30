import { transferModel } from '@/utils/constant'
import { transferModelOptions } from '@/utils/sysBusi'
import type { SearchOptions, TableColumn } from '#/base'

export const listQuery = () => ({
  aliasName: '',
  brandName: '',
  schoolName: '',
  transferMode: '',
  current: 1,
  size: 20
})

export const searchOptions = (): SearchOptions[] => [
  {
    type: 'input',
    label: '主体名称',
    prop: 'aliasName'
  },
  {
    type: 'input',
    label: '品牌名称',
    prop: 'brandName'
  },
  {
    type: 'input',
    label: '校区名称',
    prop: 'schoolName'
  },
  {
    type: 'select',
    label: '划拨模式',
    prop: 'transferMode',
    optionsList: transferModel
  }
]

export const columns = (fns: Recordable<Fn>): TableColumn[] => [
  { label: '主体名称', prop: 'companyName', width: 200 },
  { label: '品牌名称', prop: 'brandName', width: 200 },
  { label: '校区名称', prop: 'aliasName', width: 200 },
  { label: '划拨规则名称', prop: 'ruleName', width: 140 },
  {
    label: '划拨模式',
    prop: 'transferMode',
    formatter: (row, column, cellValue) => transferModelOptions[cellValue]
  },
  { label: '主管部门', prop: 'deptName' },
  { label: '创建时间', prop: 'createTime', width: 180 },
  { label: '创建人', prop: 'username' },
  {
    label: '操作',
    prop: 'action',
    fixed: 'right',
    render: (val, data) => (
      <el-button link type="danger" onClick={() => fns.handleDel(data.ruleId)}>
        删除
      </el-button>
    )
  }
]
