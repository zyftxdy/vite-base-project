import { typeOptions, schoolOptions } from '@/utils/sysBusi'
import type { DescItem } from '@/components/Description/typing'

export const basicSchema: DescItem[] = [
  {
    field: 'brandName',
    label: '品牌名称'
  },
  {
    field: 'schoolId',
    label: '校区ID'
  },
  {
    field: 'tags',
    label: '主营类目'
  },
  {
    field: 'servicePhone',
    label: '服务电话'
  },
  {
    field: 'area',
    label: '所在地区'
  },
  {
    field: 'createdAt',
    label: '创建时间'
  },
  {
    field: 'status',
    label: '支付签约',
    render: (val, _) => schoolOptions[val]
  },
  {
    field: 'businessStartHours',
    label: '营业时间',
    render: (val, data) => `${val} - ${data.businessEndHours}`
  },
  {
    field: 'address',
    label: '校区地址'
  },
  {
    field: 'memberCount',
    label: '在读会员人数',
    render: (val, _) => val + '人'
  }
]

export const bankSchema: DescItem[] = [
  {
    field: 'bankSuperviseMoney',
    label: '监管账户余额',
    render: (val, _) => (
      <span><span class='text-2xl text-red-600 pr-1'>{ val }</span>元</span>
    )
  },
  {
    field: 'bankEarnestMoney',
    label: '风险保证金余额',
    slot: true
  }
]

export const mainSchema: DescItem[] = [
  {
    field: 'name',
    label: '主体名称'
  },
  {
    field: 'type',
    label: '主体类型',
    render: (val, _) => typeOptions[val]
  },
  {
    field: 'licenseHasSchoolPermit',
    label: '是否有办学许可证',
    render: (val, _) => val ? '是' : '否'
  },
  {
    field: 'registerDate',
    label: '注册日期'
  },
  {
    field: 'licenseStartDate',
    label: '经营期限',
    render: (val, data) =>`${val} - ${data.licenseValidDateType === '1' ? data.licenseEndDate : '长期'}`
  },
  {
    field: 'licenseCreditCode',
    label: '统一社会信用代码'
  },
  {
    field: 'legalPerson',
    label: '法人代表姓名'
  },
  {
    field: 'legalPersonIdcard',
    label: '法人身份证号'
  },
  {
    field: 'legalPersonIdcardStartDate',
    label: '法人身份证有效期',
    render: (val, data) => `${val} - ${data.legalPersonIdcardDateType === '1' ? data.legalPersonIdcardEndDate : '长期'}`
  },
  {
    field: 'ownerName',
    label: '法人联系电话'
  },
  {
    field: 'registerAddress',
    label: '注册地址'
  }
]

export const accountSchema: DescItem[] = [
  {
    field: 'bankName',
    label: '开户银行'
  },
  {
    field: 'bankMerchantNo',
    label: '商户号'
  },
  {
    field: 'bankSuperviseAccount',
    label: '监管账户账号'
  },
  {
    field: 'bankTransferAccount',
    label: '一般账户账号'
  }
]
