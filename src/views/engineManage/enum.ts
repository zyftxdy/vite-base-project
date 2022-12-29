import { cerditLvStatus } from '@/utils/constant'
import type { SearchOptions } from '#/base'

const riskStatus = [
  { label: '全部状态', value: '' },
  { label: '低风险', value: '1' },
  { label: '中风险', value: '2' },
  { label: '高风险', value: '3' }
]

const engineStatus = [
  { label: '全部状态', value: '' },
  { label: '即将到期', value: '1' },
  { label: '已到期', value: '2' },
  { label: '年检不合格', value: '3' },
  { label: '年检通过', value: '4' }
]

export const listQuery = () => ({
  brandName: '',
  schoolName: '',
  dates: [] as string[],
  startTime: '',
  endTime: '',
  ownerName: '',
  tag: '',
  cerditLv: '',
  risk: '',
  engine: '',
  courseName: '',
  current: 1,
  size: 20
})

export const searchOptions = (dateChange: Fn): SearchOptions[] => {
  return [{
    type: 'input',
    label: '品牌名称',
    prop: 'brandName',
    placeholder: '请输入品牌名称'
  },
  {
    type: 'input',
    label: '校区名称',
    prop: 'schoolName',
    placeholder: '请输入校区名称'
  },
  {
    type: 'input',
    label: '品牌所属人',
    prop: 'ownerName',
    placeholder: '请输入手机号'
  },
  {
    type: 'input',
    label: '授课课程',
    prop: 'courseName',
    placeholder: '请输入授课课程'
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
    type: 'select',
    label: '主营类目',
    prop: 'tag',
    optionsList: [],
    optionKey: 'name',
    optionLabel: 'name',
    clearable: true
  },
  {
    type: 'select',
    label: '信用等级',
    prop: 'cerditLv',
    optionsList: cerditLvStatus
  },
  {
    type: 'select',
    label: '风险等级',
    prop: 'risk',
    optionsList: riskStatus
  },
  {
    type: 'select',
    label: '年检状态',
    prop: 'engine',
    optionsList: engineStatus
  }]
}
