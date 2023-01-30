import dashboard1 from '@/assets/dashboard/1.png'
import dashboard2 from '@/assets/dashboard/2.png'
import dashboard3 from '@/assets/dashboard/3.png'
import dashboard4 from '@/assets/dashboard/4.png'
import dashboard5 from '@/assets/dashboard/5.png'
import dashboard6 from '@/assets/dashboard/6.png'
import dashboard7 from '@/assets/dashboard/7.png'
import dashboard8 from '@/assets/dashboard/8.png'
import dashboard9 from '@/assets/dashboard/9.png'
import type { TableColumn } from '#/base'
import type { ECOption } from '@/utils/echarts'

export const basicProps = {
  deptIds: {
    type: Array as PropType<string[]>,
    default: () => []
  }
}

export const dataList = (): Recordable[] => [
  {
    name: '机构总数量',
    bg: '#F7F1FC',
    type: 'schoolTotalNum',
    num: '0',
    icon: dashboard1
  },
  {
    name: '本月新增机构',
    bg: '#E9FCFA',
    type: 'schoolAddNum',
    num: '0',
    icon: dashboard2
  },
  {
    name: '监管资金余额',
    bg: '#FDF3ED',
    type: 'supeTotalAmount',
    num: '0',
    icon: dashboard3
  },
  {
    name: '本月新进监管资金',
    bg: '#EFF5FF',
    type: 'supeAddAmount',
    num: '0',
    icon: dashboard4
  },
  {
    name: '本月已划拨资金',
    bg: '#FFFAEF',
    type: 'supeTransAmount',
    num: '0',
    icon: dashboard5
  }
]

export const todoList = (): Recordable[] => [
  {
    name: '待处理投诉',
    num: 0,
    icon: dashboard6,
    type: 'complaint'
  },
  // {
  //   name: '待处理退款',
  //   num: 0,
  //   icon: dashboard7
  // },
  {
    name: '待处理申诉',
    num: 0,
    icon: dashboard8,
    type: 'appeal'
  }
  // {
  //   name: '待审批注销申请',
  //   num: 0,
  //   icon: dashboard9
  // }
]

export const columns: TableColumn[] = [
  { label: '下单时间', prop: 'createdAt', width: 180 },
  { label: '主体名称', prop: 'companyName', width: 200 },
  { label: '品牌名称', prop: 'brandName', width: 180 },
  { label: '校区名称', prop: 'schoolAlias', width: 180 },
  { label: '会员姓名', prop: 'memberName' },
  { label: '订单金额', prop: 'orderAmount' },
  { label: '报名课时数', prop: 'totalClassNum' },
  { label: '平均课单价', prop: 'classAvgAmount' },
  { label: '操作', prop: 'action', overflow: false, fixed: 'right' }
]

export const freezeColumns: TableColumn[] = [
  { label: '时间', prop: 'payTime' },
  { label: '当日监管资金总额', prop: 'supeTotalAmount', width: 160 },
  { label: '当日动销机构数量', prop: 'supeSchoolNum', width: 160 },
  { label: '监管金额平均数', prop: 'supeAvgAmount', width: 160 },
  { label: '当日新增订单数量', prop: 'supeOrderNum', width: 160 },
  { label: '订单金额平均数', prop: 'supeOrderAvgAmount', width: 160 },
  { label: '售出课时总数', prop: 'saleClassHourNum' },
  { label: '课时费平均数', prop: 'classHourAvgAmount' },
  { label: '操作', prop: 'action', overflow: false, fixed: 'right' }
]

export const thawColumns: TableColumn[] = [
  { label: '时间', prop: 'days' },
  { label: '当日划拨资金总额', prop: 'transTotalAmount', width: 160 },
  { label: '当日划拨机构数量', prop: 'transSchoolNum', width: 160 },
  { label: '划拨金额平均数', prop: 'transAvgAmount', width: 160 },
  { label: '当日划拨订单数量', prop: 'transOrderNum', width: 160 },
  { label: '主动确认划拨课时费', prop: 'manualConfirmAmount', width: 160 },
  { label: '超时自动确认课时费', prop: 'autoConfirmAmount', width: 160 },
  { label: '学杂费金额', prop: 'transSundryAmount' },
  { label: '退费金额', prop: 'transRefundAmount' },
  { label: '操作', prop: 'action', overflow: false, fixed: 'right' }
]

export const echartOptions = (
  xData: any[],
  data: any[],
  type: string,
  color: string
): ECOption => ({
  tooltip: {
    trigger: 'axis',
    backgroundColor: 'rgba(0, 0, 0, .3)',
    borderWidth: 0,
    axisPointer: {
      type: 'shadow'
    },
    textStyle: {
      color: '#FFFFFF'
    },
    formatter: `{b}<br/>${type}：{c}元`
  },
  color: color,
  xAxis: {
    type: 'category',
    boundaryGap: true,
    axisTick: {
      show: false
    },
    axisLine: {
      lineStyle: {
        color: '#999999'
      }
    },
    data: xData
  },
  yAxis: {
    type: 'value',
    alignTicks: true,
    splitLine: {
      lineStyle: {
        type: 'dashed'
      }
    },
    minInterval: 1,
    axisTick: {
      show: false
    },
    axisLine: {
      show: false
    }
  },
  grid: {
    top: '4%',
    left: '2%',
    right: '2%',
    bottom: '2%',
    containLabel: true
  },
  series: [
    {
      type: 'bar',
      itemStyle: {
        shadowColor: 'rgba(18,61,172,0.5)',
        shadowBlur: 10
      },
      data: data
    }
  ]
})
