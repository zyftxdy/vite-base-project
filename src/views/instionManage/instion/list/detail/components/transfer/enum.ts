import { transferType, transferStatus } from '@/utils/constant'
import { transferTOptions, transferSOptions } from '@/utils/sysBusi'
import type { SearchOptions, TableColumn } from '#/base'

export const listQuery = () => ({
  dates: [] as string[],
  startTime: '',
  endTime: '',
  transferType: '',
  transferStatus: '',
  current: 1,
  size: 20
})

export const searchOptions = (dateChange: Fn): SearchOptions[] => [
  {
    type: 'date',
    label: '申请时间',
    prop: 'dates',
    method: dateChange,
    disabledDate: time => {
      return time.getTime() > Date.now()
    }
  },
  {
    type: 'select',
    label: '划拨类型',
    prop: 'transferType',
    optionsList: transferType
  },
  {
    type: 'select',
    label: '划拨状态',
    prop: 'transferStatus',
    optionsList: transferStatus
  }
]

export const columns: TableColumn[] = [
  { label: '申请时间', prop: 'appTime', width: 180 },
  { label: '划拨流水号', prop: 'transferId', width: 180 },
  { label: '应划拨金额（元）', prop: 'transferAmount', width: 140 },
  { label: '分摊手续费（元）', prop: 'shareServiceFee', width: 140 },
  { label: '实际划拨金额（元）', prop: 'realTransAmount', width: 160 },
  {
    label: '划拨类型',
    prop: 'transferType',
    formatter: (row, column, cellValue) => transferTOptions[cellValue]
  },
  { label: '收款账号', prop: 'receiveAccount', width: 200 },
  {
    label: '划拨状态',
    prop: 'transferStatus',
    formatter: (row, column, cellValue) => transferSOptions[cellValue]
  },
  { label: '订单号', prop: 'orderId', width: 200 },
  { label: '备注', prop: 'remark' },
  { label: '操作', prop: 'action', overflow: false, width: 240, fixed: 'right' }
]
