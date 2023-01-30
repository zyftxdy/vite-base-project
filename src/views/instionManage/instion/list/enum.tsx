import { cerditLvStatus, schoolStatus } from '@/utils/constant'
import { cerditLvOptions, schoolOptions } from '@/utils/sysBusi'
import type { SearchOptions, TableColumn } from '#/base'

export const listQuery = () => ({
  companyName: '',
  brandName: '',
  schoolName: '',
  cerditLv: '',
  // status: 'ALL',
  provinceCode: '',
  cityCode: '',
  districtCode: '',
  ownerName: '',
  current: 1,
  size: 20
})

export const searchOptions = (handleChange: Fn): SearchOptions[] => [
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
  ],
  {
    type: 'input',
    label: '负责人电话',
    prop: 'ownerName'
  },
  {
    type: 'select',
    label: '信用评级',
    prop: 'cerditLv',
    optionsList: cerditLvStatus
  }
  // {
  //   type: 'select',
  //   label: '校区状态',
  //   prop: 'status',
  //   optionsList: schoolStatus
  // }
]

export const columns = (fns: Recordable<Fn>): TableColumn[] => [
  { label: '主体名称', prop: 'companyName', width: 200 },
  { label: '品牌名称', prop: 'brandName', width: 200 },
  { label: '校区名称', prop: 'alias', width: 200 },
  {
    label: '所在地区',
    prop: 'provinceName',
    width: 180,
    formatter: row => row.provinceName + row.cityName + row.districtName
  },
  { label: '负责人电话', prop: 'ownerName' },
  {
    label: '支付签约',
    prop: 'status',
    formatter: (row, column, cellValue) => schoolOptions[cellValue]
  },
  { label: '主管部门', prop: 'deptName' },
  {
    label: '信用评级',
    prop: 'creditLevel',
    formatter: (row, column, cellValue) => cerditLvOptions[cellValue] || '--'
  },
  {
    label: '操作',
    prop: 'action',
    fixed: 'right',
    width: 240,
    render: (_, data) => (
      <>
        <el-button
          v-auth:disabled={'09444fd98fc1f87003'}
          link
          type="primary"
          onClick={() => fns.goDetail(data.schoolId)}
        >
          查看
        </el-button>
        <el-button link type="primary" onClick={() => fns.handleClick(data, 'DEPART')}>
          修改主管部门
        </el-button>
        <el-button link type="primary" onClick={() => fns.handleClick(data, 'SCORE')}>
          修改评级
        </el-button>
      </>
    )
  }
]
