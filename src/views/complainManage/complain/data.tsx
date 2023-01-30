import { complainStatus } from '@/utils/constant'
import { complainOptions } from '@/utils/sysBusi'
import type { SearchOptions, TableColumn } from '#/base'
import type { DescItem } from '@/components/Description/typing'

export const listQuery = () => ({
  brandName: '',
  schoolName: '',
  dates: '',
  startTime: '',
  endTime: '',
  status: '',
  categoryId: '',
  current: 1,
  size: 20
})

export const searchOptions = (dateChange: Fn): SearchOptions[] => [
  {
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
    type: 'date',
    label: '创建时间',
    prop: 'dates',
    method: dateChange,
    disabledDate: time => time.getTime() > Date.now()
  },
  {
    type: 'select',
    label: '投诉状态',
    prop: 'status',
    optionsList: complainStatus
  },
  {
    type: 'select',
    label: '投诉类别',
    prop: 'categoryId',
    optionsList: [],
    optionKey: 'categoryId',
    optionLabel: 'categoryName'
  }
]

export const columns: TableColumn[] = [
  { label: '投诉编号', prop: 'complaintId' },
  { label: '相关品牌', prop: 'brandName' },
  { label: '相关校区', prop: 'alias' },
  { label: '投诉内容', prop: 'content', width: 360 },
  { label: '投诉时间', prop: 'createTime' },
  { label: '投诉类别', prop: 'categoryName' },
  { label: '投诉人', prop: 'username' },
  {
    label: '投诉状态',
    prop: 'status',
    formatter: (row, column, cellValue) => complainOptions[cellValue] || '--'
  },
  { label: '操作', prop: 'action', overflow: false, fixed: 'right' }
]

export const schema: DescItem[] = [
  {
    field: 'a',
    label: '投诉人'
  },
  {
    field: 'a',
    label: '投诉时间'
  },
  {
    field: 'a',
    label: '相关品牌'
  },
  {
    field: 'a',
    label: '相关校区',
    contentStyle: {
      display: 'flex',
      alignItems: 'center'
    },
    render: (val, _) => (
      <>
        高新校区
        <el-button link type="primary" class="btn_open">
          查看
        </el-button>
      </>
    )
  },
  {
    field: 'a',
    label: '品牌所属人'
  },
  {
    field: 'a',
    label: '校区客服电话'
  },
  {
    field: 'a',
    label: '相关会员'
  },
  {
    field: 'a',
    label: '会员主联系人'
  },
  {
    field: 'a',
    label: '投诉状态'
  },
  {
    field: 'a',
    label: '投诉内容',
    monopolize: true,
    render: (val, _) => (
      <span>
        付款前承诺每周给我反馈孩子的学习情况，现在上课一个月了，根本没有反馈过，孩子的学习成绩也没有进步。和老师联系退费，老师根本不回复
      </span>
    )
  }
]
