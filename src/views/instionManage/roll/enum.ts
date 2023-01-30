import { TableColumn, SearchOptions } from '#/base'

export const listQuery = () => ({
  creditLevel: 'BLACK',
  brandName: '',
  schoolName: '',
  dates: [] as string[],
  startTime: '',
  endTime: '',
  ownerName: '',
  provinceCode: '',
  cityCode: '',
  districtCode: '',
  current: 1,
  size: 20
})

export const searchOptions = (dateChange: Fn, handleChange: Fn): SearchOptions[] => [
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
    label: '创建时间',
    prop: 'dates',
    method: dateChange,
    disabledDate: time => {
      return time.getTime() > Date.now()
    }
  },
  {
    type: 'input',
    label: '品牌所属人',
    prop: 'ownerName',
    placeholder: '请输入手机号搜索'
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
  { label: '品牌名称', prop: 'brandName' },
  { label: '校区名称', prop: 'schoolName' },
  {
    label: '所在地区',
    prop: 'provinceName',
    formatter: row => row.provinceName + row.cityName + row.districtName
  },
  { label: '详细地址', prop: 'address' },
  { label: '品牌所属人', prop: 'ownerName' },
  { label: '入选时间', prop: 'updateTime' },
  { label: '操作人', prop: 'updateName' },
  { label: '操作', prop: 'action', overflow: false, width: 140, fixed: 'right' }
]
