import type { SearchOptions, TableColumn } from '#/base'

export const listQuery = () => ({
  ruleName: '',
  current: 1,
  size: 20
})

export const searchOptions = (): SearchOptions[] => ([
  {
    type: 'input',
    label: '比例规则名称',
    prop: 'ruleName'
  }
])

export const columns = (fns: Recordable<Fn>): TableColumn[] => ([
  { label: '比例规则名称', prop: 'scaleRuleName', width: 160 },
  { label: '规则内容', prop: 'scaleRuleContent', width: 300 },
  { label: '创建人', prop: 'username' },
  { label: '创建时间', prop: 'createTime', width: 180 },
  {
    label: '操作',
    prop: 'action',
    fixed: 'right',
    render: (val, data) => (
      <el-button link type="danger" onClick={() => fns.handleDel(data.scaleId)}>删除</el-button>
    )
  }
])
