import type { SearchOptions, TableColumn } from '#/base'

export const listQuery = () => ({
  companyName: '',
  brandName: '',
  schoolName: '',
  dates: [] as string[],
  payStartTime: '',
  payEndTime: '',
  deptId: '',
  provinceCode: '',
  cityCode: '',
  districtCode: '',
  current: 1,
  size: 20
})

export const searchOptions = (dateChange: Fn, handleChange: Fn): SearchOptions[] => [
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
    prop: 'schoolName'
  },
  {
    type: 'date',
    label: '入帐时间',
    prop: 'dates',
    method: dateChange,
    disabledDate: time => {
      return time.getTime() > Date.now()
    }
  },
  {
    type: 'select',
    label: '主管部门',
    prop: 'deptId',
    optionsList: [],
    optionKey: 'deptId',
    optionLabel: 'name',
    clearable: true
  },
  [
    {
      type: 'select',
      label: '所在地区',
      width: 120,
      prop: 'provinceCode',
      optionsList: [],
      optionKey: 'code',
      optionLabel: 'fullName',
      placeholder: '请选择省份',
      method: e => handleChange(e, 'province')
    },
    {
      type: 'select',
      label: '所在地区',
      width: 120,
      prop: 'cityCode',
      optionsList: [],
      optionKey: 'code',
      optionLabel: 'fullName',
      placeholder: '请选择市',
      method: e => handleChange(e, 'city')
    },
    {
      type: 'select',
      label: '所在地区',
      width: 120,
      prop: 'districtCode',
      optionsList: [],
      optionKey: 'code',
      optionLabel: 'fullName',
      placeholder: '请选择区县'
    }
  ]
]

export const columns: TableColumn[] = [
  { label: '主体名称', prop: 'companyName', width: 200 },
  { label: '入账日期', prop: 'payTime' },
  { label: '品牌名称', prop: 'brandName', width: 200 },
  { label: '校区名称', prop: 'schoolName', width: 200 },
  { label: '当日收款（元）', prop: 'payTotalAmount' },
  { label: '当日退款（元）', prop: 'refundTotalAmount' },
  { label: '交易手续费（元）', prop: 'tradeMerFeeTotalAmount' },
  { label: '入账监管资金（元）', prop: 'superviseTotalAmount' }
]
