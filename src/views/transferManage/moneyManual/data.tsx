import { transferSOptions } from '@/utils/sysBusi'
import { transferStatus } from '@/utils/constant'
import type { SearchOptions, TableColumn } from '#/base'
import type { DescItem } from '@/components/Description/typing'

export const listQuery = () => ({
  companyName: '',
  brandName: '',
  alias: '',
  transferStatus: '',
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
    prop: 'transferStatus',
    optionsList: transferStatus
  }
])

export const columns: TableColumn[] = [
  { label: '申请划拨时间', prop: 'applyTransferTime', width: 200 },
  { label: '实际划拨时间', prop: 'realTransTime', width: 200 },
  { label: '主体名称', prop: 'companyName', width: 200 },
  { label: '品牌名称', prop: 'brandName', width: 200 },
  { label: '校区名称', prop: 'alias', width: 200 },
  { label: '本次申请金额', prop: 'transferAmount' },
  { label: '监管账户余额', prop: 'balanceAccount', width: 200 },
  { label: '划拨状态', prop: 'transferStatus', formatter: (row, column, cellValue) => transferSOptions[cellValue] },
  { label: '主管部门', prop: 'deptName', width: 200 },
  { label: '操作人', prop: 'username' },
  { label: '操作', prop: 'action', fixed: 'right', width: 260 }
]

export const schema: DescItem[] = [
  {
    field: 'applyTransferTime',
    label: '申请时间',
    monopolize: true
  },
  {
    field: 'companyName',
    label: '申请主体',
    monopolize: true
  },
  {
    field: 'transferAmount',
    label: '申请金额',
    monopolize: true
  },
  {
    field: 'applyReason',
    label: '申请原因',
    monopolize: true
  },
  {
    field: 'applyWholeImgUrlList',
    label: '原因附件',
    monopolize: true,
    render: (val, _) => (
      <>
        {
          val ? val.map((item: string) => (
            <div key={ item } class='inline-block rounded-sm border border-slate-300 w-22 h-22 p-2 ml-1 mb-1 box-content'>
              <el-image src={item} class='w-22 h-22'/>
            </div>
          )) : <span>--</span>
        }
      </>
    )
  },
  {
    field: 'riskControlReason',
    label: '触发风控',
    monopolize: true,
    render: (val, _) => (
      <span class={ val ? 'text-rose-600' : ''}>{ val || '--' }</span>
    )
  }
]

export const rejectSchema: DescItem[] = [
  {
    field: 'resolutionResult',
    label: '驳回原因',
    monopolize: true
  },
  {
    field: 'resolutionWholeImgUrlList',
    label: '驳回附件',
    monopolize: true,
    render: (val, _) => (
      <>
        {
          val ? val.map((item: string) => (
            <div key={ item } class='inline-block rounded-sm border border-slate-300 w-22 h-22 p-2 ml-1 mb-1 box-content'>
              <el-image src={item} class='w-22 h-22'/>
            </div>
          )) : <span>--</span>
        }
      </>
    )
  }
]
