import { transferMOptions } from '@/utils/sysBusi'
import { transferMStatus } from '@/utils/constant'
import type { SearchOptions, TableColumn } from '#/base'
import type { DescItem } from '@/components/Description/typing'

export const listQuery = () => ({
  companyName: '',
  brandName: '',
  alias: '',
  scaleTransferStatus: '',
  current: 1,
  size: 20
})

export const searchOptions = (): SearchOptions[] => ([
  {
    type: 'input',
    label: '主体名称',
    prop: 'companyName'
  },
  {
    type: 'input',
    label: '品牌名称',
    prop: 'brandName'
  },
  {
    type: 'input',
    label: '校区名称',
    prop: 'alias'
  },
  {
    type: 'select',
    label: '划拨状态',
    prop: 'scaleTransferStatus',
    optionsList: transferMStatus
  }
])

export const columns = (fns: Recordable<Fn>): TableColumn[] => ([
  { label: '主体名称', prop: 'companyName', width: 200 },
  { label: '品牌名称', prop: 'brandName', width: 200 },
  { label: '校区名称', prop: 'aliasName', width: 200 },
  { label: '划拨总金额', prop: 'transferTotalAmount' },
  { label: '监管账户', prop: 'bankSuperviseAccount', width: 200 },
  { label: '一般账户', prop: 'bankTransferAccount', width: 200 },
  { label: '应划拨日期', prop: 'transferDate', width: 200 },
  { label: '实际划拨时间', prop: 'transferTime', width: 200 },
  { label: '划拨状态', prop: 'transferStatus', formatter: (row, column, cellValue) => transferMOptions[cellValue] },
  { label: '主管部门', prop: 'deptName' },
  {
    label: '操作',
    prop: 'action',
    fixed: 'right',
    width: 200,
    render: (val, data) => (
      <>
        <el-button link type="primary" onClick={() => fns.handleInfo(data.transferSummaryId)}>明细</el-button>
        <el-button link type="primary" onClick={() => fns.handleTransfer(data)}>划拨</el-button>
      </>
    )
  }
])

export const schema: DescItem[] = [
  {
    label: '订单ID',
    field: 'orderId'
  },
  {
    label: '订单支付时间',
    field: 'orderPayTime'
  },
  {
    label: '划拨日期',
    field: 'transferDate'
  },
  {
    label: '划拨月份',
    field: 'month',
    render: val => `${val}月`
  },
  {
    label: '划拨比例',
    field: 'scale',
    render: val => `${val}%`
  },
  {
    label: '划拨金额',
    field: 'transferAmount'
  },
  {
    label: '实际划拨时间',
    field: 'transferTime'
  },
  {
    label: '划拨状态',
    field: 'transferStatus',
    render: val => transferMOptions[val]
  },
  {
    label: '划拨资金汇总ID',
    field: 'transferSummaryId'
  },
  {
    label: '划拨记录创建时间',
    field: 'createTime'
  }
]
