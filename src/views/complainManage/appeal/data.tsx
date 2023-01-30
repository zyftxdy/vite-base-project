import { appealStatus } from '@/utils/constant'
import { appealOptions } from '@/utils/sysBusi'
import type { SearchOptions, TableColumn } from '#/base'
import type { DescItem } from '@/components/Description/typing'

export const listQuery = () => ({
  brandName: '',
  schoolName: '',
  appealId: '',
  appealPhone: '',
  dates: '',
  startTime: '',
  endTime: '',
  status: '',
  current: 1,
  size: 20
})

export const searchOptions = (dateChange: Fn): SearchOptions[] => [
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
    type: 'input',
    label: '申诉编号',
    prop: 'appealId'
  },
  {
    type: 'input',
    label: '申诉人',
    prop: 'appealPhone',
    placeholder: '请输入申诉人手机号'
  },
  {
    type: 'date',
    label: '申诉时间',
    prop: 'dates',
    method: dateChange,
    disabledDate: time => time.getTime() > Date.now()
  },
  {
    type: 'select',
    label: '申诉状态',
    prop: 'status',
    optionsList: appealStatus
  }
]

export const columns: TableColumn[] = [
  { label: '申诉编号', prop: 'appealId' },
  { label: '相关品牌', prop: 'brandName' },
  { label: '相关校区', prop: 'schoolName' },
  { label: '申诉数量（课时）', prop: 'consumeNum', width: 160 },
  { label: '申诉时间', prop: 'appealTime' },
  { label: '会员姓名', prop: 'memberName' },
  { label: '申诉人', prop: 'appealName' },
  {
    label: '申诉状态',
    prop: 'status',
    formatter: (row, column, cellValue) => appealOptions[cellValue] ?? '--'
  },
  { label: '操作', prop: 'action', overflow: false, fixed: 'right' }
]

export const schema: DescItem[] = [
  {
    field: 'memberName',
    label: '相关会员'
  },
  {
    field: 'appealTime',
    label: '申诉时间'
  },
  {
    field: 'brandName',
    label: '相关品牌'
  },
  {
    field: 'schoolName',
    label: '相关校区',
    contentStyle: {
      display: 'flex',
      alignItems: 'center'
    },
    slot: true
  },
  {
    field: 'ownerName',
    label: '品牌所属人',
    render: (val, data) => `${val}（${data.ownerPhone}）`
  },
  {
    field: 'servicePhone',
    label: '校区客服电话'
  },
  {
    field: 'appealName',
    label: '申诉人',
    render: (val, data) => `${val}（${data.appealPhone}）`
  },
  {
    field: 'appealStatusName',
    label: '申诉状态',
    render: val => appealOptions[val]
  },
  {
    field: 'cardName',
    label: '会员卡名称'
  },
  {
    field: 'consumeNum',
    label: '消耗课时数量',
    render: val => `${val}课时`
  },
  {
    field: 'changeReason',
    label: '变动原因'
  }
]
