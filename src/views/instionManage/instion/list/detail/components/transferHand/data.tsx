import { typeOptions } from '@/utils/sysBusi'
import { transferHandStatus } from '@/utils/constant'
import type { DescItem } from '@/components/Description/typing'
import type { SearchOptions, TableColumn } from '#/base'


export const listQuery = () => ({
  dates: [] as string[],
  startTime: '',
  endTime: '',
  kpactStusCd: '',
  current: 1,
  size: 20
})

export const searchOptions = (dateChange: Fn): SearchOptions[] => ([
  {
    type: 'date',
    label: '划拨时间',
    prop: 'dates',
    method: dateChange,
    disabledDate: time => {
      return time.getTime() > Date.now()
    }
  },
  {
    type: 'select',
    label: '划拨状态',
    prop: 'kpactStusCd',
    optionsList: transferHandStatus
  },
])

export const columns: TableColumn[] = [
  { label: '划拨时间', prop: 'createTime', width: 160 },
  { label: '划拨流水号', prop: 'intrSwfno', width: 180 },
  { label: '主体名称', prop: 'schoolName', width: 180 },
  { label: '监管户开户行', prop: 'dfyActbkApltn', width: 180 },
  { label: '监管户账号', prop: 'dfyActno', width: 200 },
  { label: '一般户开户行', prop: 'rcvmnActbkApltn', width: 180 },
  { label: '一般户账号', prop: 'rcvmnActno', width: 200 },
  { label: '划拨金额', prop: 'trdAmt' },
  { label: '划拨状态', prop: 'kpactStusCd' },
  { label: '操作人', prop: 'operName' },
  { label: '操作', prop: 'action', overflow: false,  width: 140, fixed: 'right' }
]

export const schema: DescItem[] = [
  {
    field: 'type',
    label: '主体类型',
    render: (val, _) => typeOptions[val]
  },
  {
    field: 'schoolName',
    label: '企业名称'
  },
  {
    field: 'licenseCreditCode',
    label: '统一社会信用代码'
  },
  {
    field: 'provinceName',
    label: '所属区县',
    render: (val, data) => val + data.cityName + data.districtName
  },
  {
    field: 'brandName',
    label: '所属品牌'
  },
  {
    field: 'alias',
    label: '校区名称'
  },
  {
    field: 'schoolId',
    label: '校区ID'
  },
  {
    field: 'ownerName',
    label: '负责人电话'
  },
  {
    field: 'servicePhone',
    label: '服务电话'
  },
  {
    field: 'address',
    label: '详细地址'
  }
]

export const schemaDialog: DescItem[] = [
  {
    field: 'type',
    label: '主体类型',
    render: (val, _) => typeOptions[val]
  },
  {
    field: 'schoolName',
    label: '企业名称'
  },
  {
    field: 'licenseCreditCode',
    label: '统一社会信用代码'
  },
  {
    field: 'brandName',
    label: '所属品牌'
  },
  {
    field: 'alias',
    label: '校区名称'
  }
]

export const schemaDetail: DescItem[] = [
  {
    field: 'operName',
    label: '操作人'
  },
  {
    field: 'createTime',
    label: '划拨时间'
  },
  {
    field: 'kpactStusCd',
    label: '划拨状态'
  },
  {
    field: 'remark',
    label: '备注信息',
    monopolize: true
  },
  {
    field: 'imgAllUrl',
    label: '附件资料',
    monopolize: true,
    render: (val, _) => (
      <>
        {
          val && val.map((item: string) => (
            <div key={ item } class='inline-block rounded-sm border border-slate-300 w-22 h-22 p-2 m-1 box-content'>
              <el-image src={item} preview-src-list={ val } class='w-22 h-22'/>
            </div>
          ))
        }
      </>
    )
  }
]
