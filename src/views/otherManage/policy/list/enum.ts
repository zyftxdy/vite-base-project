import type { SearchOptions, TableColumn } from '#/base'

const enableStatus = [
  { label: '全部状态', value: '' },
  { label: '已发布', value: '1' },
  { label: '未发布', value: '2' }
]

export const listQuery = () => ({
  name: '',
  status: '',
  dates: [] as string[],
  startTime: '',
  endTime: '',
  current: 1,
  size: 20
})

export const searchOptions = (dateChange: Fn): SearchOptions[] => {
  return [{
    type: 'input',
    label: '政策标题',
    prop: 'name',
    placeholder: '请输入政策标题'
  },
  {
    type: 'select',
    label: '发布状态',
    prop: 'status',
    optionsList: enableStatus
  },
  {
    type: 'date',
    label: '发布时间',
    prop: 'dates',
    method: dateChange,
    disabledDate: time => {
      return time.getTime() > Date.now()
    }
  }]
}

export const columns: TableColumn[] = [
  { label: '政策标题', prop: 'tags', width: 220 },
  { label: '修改时间', prop: 'brandName', width: 140 },
  { label: '发布人', prop: 'alias'  },
  { label: '发布状态', prop: 'provinceName' },
  { label: '操作', prop: 'action', overflow: false,  width: 140, fixed: 'right' }
]
