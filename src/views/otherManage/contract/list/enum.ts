import type { SearchOptions, TableColumn } from '#/base'

const enableStatus = [
  { label: '全部状态', value: '' },
  { label: '已发布', value: '1' },
  { label: '未发布', value: '2' }
]

export const listQuery = () => ({
  name: '',
  status: '',
  current: 1,
  size: 20
})

export const searchOptions = (): SearchOptions[] => {
  return [{
    type: 'input',
    label: '搜索合同',
    prop: 'name',
    placeholder: '请输入合同名称'
  },
  {
    type: 'select',
    label: '合同状态',
    prop: 'status',
    optionsList: enableStatus
  }]
}

export const columns: TableColumn[] = [
  { label: '合同名称', prop: 'a', width: 220 },
  { label: '使用次数', prop: 'b' },
  { label: '修改时间', prop: 'c'  },
  { label: '发布人', prop: 'd' },
  { label: '发布状态', prop: 'status' },
  { label: '操作', prop: 'action', overflow: false,  width: 140, fixed: 'right' }
]
