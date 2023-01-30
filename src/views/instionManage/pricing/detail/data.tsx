import { approvalOptions, courseDiffOptions } from '@/utils/sysBusi'
import type { TableColumn } from '#/base'
import type { DescItem } from '@/components/Description/typing'

export const schema: DescItem[] = [
  {
    field: 'brandName',
    label: '品牌名称'
  },
  {
    field: 'submitName',
    label: '提交人姓名'
  },
  {
    field: 'submitMobile',
    label: '提交人手机号'
  },
  {
    field: 'ownerName',
    label: '品牌所属人',
    render: (val, data) => `${val}(${data.mobile})`
  },
  {
    field: 'submitTime',
    label: '提交时间'
  }
]

export const schemaInfo: DescItem[] = [
  {
    field: 'courseName',
    label: '课程名称'
  },
  {
    field: 'categoryName',
    label: '课程分类'
  },
  {
    field: 'miniAge',
    label: '适用年龄',
    render: (val, data) => `${val} - ${data.maxAge}岁`
  },
  {
    field: 'classSize',
    label: '班级人数',
    render: val => `${val}人`
  },
  {
    field: 'courseLevel',
    label: '课程难度',
    render: (val, _) => courseDiffOptions[val]
  },
  {
    field: 'courseNum',
    label: '课程安排',
    render: (val, data) => `共${val}次课，每次${data.courseDuration}课时`
  },
  {
    field: 'courseTotalHour',
    label: '总课时数',
    render: (val, _) => `${val}课时`
  },
  {
    field: 'courseDuration',
    label: '课程时长',
    render: (val, _) => `${val}分钟/课时`
  },
  {
    field: 'courseObj',
    label: '课程目标',
    monopolize: true
  },
  {
    field: 'imgUrls',
    label: '课程照片',
    monopolize: true,
    render: (val, _) => (
      <>
        {val &&
          val.map((item: string) => (
            <div
              key={item}
              class="inline-block rounded-sm border border-slate-300 w-22 h-22 p-2 ml-1 mb-1 box-content"
            >
              <el-image src={item} class="w-22 h-22" />
            </div>
          ))}
      </>
    )
  },
  {
    field: 'introduce',
    label: '详细介绍',
    monopolize: true,
    render: (val, _) => <div v-html={val}></div>
  }
]

export const columns: TableColumn[] = [
  {
    label: '提交时间',
    prop: 'approveTime',
    formatter: (row, column, cellValue) => cellValue || row.submitTime
  },
  {
    label: '审核结果',
    prop: 'approveStatus',
    formatter: (row, column, cellValue) => approvalOptions[cellValue]
  },
  {
    label: '驳回理由',
    prop: 'approveComments',
    formatter: (row, column, cellValue) => (row.approveStatus === 'PASS' ? '--' : cellValue ?? '--')
  },
  { label: '审批人', prop: 'approveName' }
]
