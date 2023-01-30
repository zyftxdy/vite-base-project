import { orderStatus } from '@/utils/constant'
import { orderOptions, cardOptions, payOptions } from '@/utils/sysBusi'
import type { SearchOptions, TableColumn } from '#/base'
import type { DescItem } from '@/components/Description/typing'

export const listQuery = () => ({
  keyWord: '',
  dates: [] as string[],
  startTime: '',
  endTime: '',
  orderStatus: '',
  current: 1,
  size: 20
})

export const searchOptions = (dateChange: Fn): SearchOptions[] => [
  {
    type: 'input',
    label: '会员搜索',
    prop: 'keyWord',
    placeholder: '请输入会员姓名或者手机号'
  },
  {
    type: 'date',
    label: '下单时间',
    prop: 'dates',
    method: dateChange,
    disabledDate: time => {
      return time.getTime() > Date.now()
    }
  },
  {
    type: 'select',
    label: '订单状态',
    prop: 'orderStatus',
    optionsList: orderStatus
  }
]

export const columns: TableColumn[] = [
  { label: '下单时间', prop: 'createdAt', width: 140 },
  { label: '订单号', prop: 'orderId', width: 140 },
  { label: '会员姓名', prop: 'memberName', width: 140 },
  { label: '联系电话', prop: 'contactMobile', width: 140 },
  { label: '收款金额（元）', prop: 'orderAmount', width: 140 },
  { label: '退款金额（元）', prop: 'refundAmount', width: 140 },
  {
    label: '订单状态',
    prop: 'orderStatus',
    width: 140,
    formatter: (row, column, cellValue) => orderOptions[cellValue]
  },
  { label: '操作', prop: 'action', overflow: false, width: 140, fixed: 'right' }
]

export const payColumns: TableColumn[] = [
  {
    label: '收款项目',
    prop: 'name',
    formatter: (row, column, cellValue) => `[${cardOptions[row.cardType] ?? '学杂费'}] ${cellValue}`
  },
  { label: '单价', prop: 'price', formatter: row => `${row.price}元/1${row.unitName}` },
  { label: '数量', prop: 'totalCount' },
  {
    label: '优惠',
    prop: 'discountType',
    formatter: (row, column, cellValue) => {
      switch (cellValue) {
        case 'DISCOUNT':
          return `折扣${row.buyDiscount}%,折上再减${row.buyReduceMoney}元`
        case 'GIVE':
          return '赠送'
        case 'CARRY_OVER':
          return '结转'
        case 'NONE':
          return '无优惠'
      }
    }
  },
  {
    label: '小计',
    prop: 'realAmount',
    render: (cellValue, data) => (
      <>
        <span class="line-through">{data.originAmount}</span>
        <span class="text-rose-600 pl-1 font-bold">{cellValue}</span>
      </>
    )
  }
]

export const refundColumns: TableColumn[] = [
  {
    label: '退款项目',
    prop: 'name',
    formatter: (row, column, cellValue) => `[${cardOptions[row.cardType] ?? '学杂费'}] ${cellValue}`
  },
  { label: '单价', prop: 'price', formatter: row => `${row.price}元/1${row.unitName}` },
  { label: '退款数量', prop: 'refundCount' }
]

export const paySchema: DescItem[] = [
  {
    field: 'payMerchantName',
    label: '收款账户'
  },
  {
    field: 'payChannelCode',
    label: '支付方式',
    render: (val, _) => payOptions[val] || '--'
  },
  {
    field: 'payStatus',
    label: '订单状态',
    render: (val, _) => orderOptions[val]
  },
  {
    field: 'createTime',
    label: '支付时间'
  },
  {
    field: 'payChnId',
    label: '交易流水号',
    render: (val, data) => val || data.payTradeId
  },
  {
    field: 'operatorName',
    label: '经办人'
  },
  {
    field: 'paymentVoucherUrl',
    label: '付款凭证',
    render: (val, _) => (
      <>{val ? <el-image class="image" src={val} preview-src-list={[val]} /> : <span>--</span>}</>
    )
  }
]

export const refundSchema: DescItem[] = [
  {
    field: 'refundMerchantName',
    label: '退款账户'
  },
  {
    field: 'refundChannelCode',
    label: '退款方式',
    render: (val, _) => payOptions[val] || '--'
  },
  {
    field: 'refundStatus',
    label: '退款状态',
    render: (val, _) => orderOptions[val]
  },
  {
    field: 'refundTime',
    label: '退款时间'
  },
  {
    field: 'payChnId',
    label: '交易流水号',
    render: (val, data) => val || data.payTradeId
  },
  {
    field: 'refundOperatorName',
    label: '经办人'
  }
]
