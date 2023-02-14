import { DescItem } from '@/components/Description/typing'

export const schema: DescItem[] = [
  {
    label: '用户名',
    field: 'username'
  },
  {
    label: '昵称',
    field: 'nickName',
    render: (val, data) => `${data.username} - ${val}`
  },
  {
    label: '联系电话',
    field: 'phone'
  },
  {
    label: '邮箱',
    field: 'email'
  },
  {
    label: '地址',
    field: 'addr'
  },
  {
    label: '性别',
    field: 'sex'
  },
  {
    label: '身份信息',
    field: 'certy'
  }
]
