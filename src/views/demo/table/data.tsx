import { SearchOptions, TableColumn } from '#/base'

export const listQuery = () => ({
  name: '',
  mobile: '',
  dates: '',
  startTime: '',
  entTime: '',
  cascaders: '',
  provinceCode: '',
  cityCode: '',
  districtCode: '',
  type: '',
  current: 1,
  size: 20
})

export const searchSchema: SearchOptions[] = [
  {
    component: 'INPUT',
    label: '搜索名称',
    field: 'name'
  },
  {
    component: 'SLOT',
    label: '手机号码',
    field: 'mobile'
  },
  {
    component: 'SELECT',
    label: '类型选择',
    field: 'type',
    defaultValue: 'ALL',
    optionsList: [
      { label: '全部状态', value: 'ALL' },
      { label: '未签约', value: 'NOT_SIGN' },
      { label: '签约中', value: 'SIGN_ING' },
      { label: '签约成功', value: 'SUCCESS' },
      { label: '签约失败', value: 'FAIL' },
      { label: '停用', value: 'DISABLE' }
    ]
  },
  {
    component: 'GROUP',
    label: '选择时间',
    field: 'time',
    infix: '-',
    subOptions: [
      {
        component: 'DATE',
        width: 140,
        label: '开始时间',
        field: 'startTime',
        disabledDate: time => time.getTime() > Date.now()
      },
      {
        component: 'DATE',
        width: 140,
        label: '结束时间',
        field: 'endTime',
        disabledDate: time => time.getTime() > Date.now()
      }
    ]
  }
]

export const columns: TableColumn[] = [
  { label: 'Id', prop: 'id' },
  { label: '姓名', prop: 'name' },
  { label: '联系方式', prop: 'mobile' },
  { label: '创建时间', prop: 'createTime' },
  { label: '地址', prop: 'address', width: 220 }
]

export function getBasicData() {
  const data: any = []
  for (let index = 0; index < 10; index++) {
    data.push({
      id: `${index}`,
      name: 'John Brown',
      mobile: `12345678901`,
      address: 'New York No. 1 Lake ParkNew York No. 1 Lake Park',
      createTime: new Date().toLocaleString()
    })
  }
  return data
}


