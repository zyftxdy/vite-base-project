import { LabelValueOptions } from '#/base'

export const baseUrl: string = import.meta.env.VITE_BASE_URL + '/api'

// 上传接口地址
export const uploadFile = '/file/upload'
export const publicUploadFile = '/file/upload/public'

// 信用评级状态
export const cerditLvStatus: LabelValueOptions[] = [
  { label: '全部评级', value: '' },
  { label: '普通', value: 'NORMAL' },
  { label: '白名单', value: 'WHITE' },
  { label: '灰名单', value: 'GREY' },
  { label: '黑名单', value: 'BLACK' }
]

// 校区状态
export const schoolStatus: LabelValueOptions[] = [
  { label: '全部状态', value: 'ALL' },
  { label: '未签约', value: 'NOT_SIGN' },
  { label: '签约中', value: 'SIGN_ING' },
  { label: '签约成功', value: 'SUCCESS' },
  { label: '签约失败', value: 'FAIL' },
  { label: '停用', value: 'DISABLE' }
]

// 订单状态
export const orderStatus: LabelValueOptions[] = [
  { label: '全部状态', value: '' },
  { label: '待支付', value: 'CREATE_SUCCESS' },
  { label: '已取消', value: 'CANCELED' },
  { label: '退款中', value: 'REFUND_ING' },
  { label: '支付成功', value: 'PAY_SUCCESS' },
  { label: '退款成功', value: 'REFUND_SUCCESS' }
]

// 主体类型
export const schoolType: LabelValueOptions[] = [
  { label: '个体工商户', value: '02' },
  { label: '企业', value: '03' },
  { label: '民办非企', value: '04' }
]

// 禁用/启用状态
export const enableStatus: LabelValueOptions[] = [
  { label: '全部状态', value: '' },
  { label: '启用', value: 'NORMAL' },
  { label: '停用', value: 'DISABLE' }
]

// 卡类型
export const cardType: LabelValueOptions[] = [
  { label: '课时卡', value: 'HOUR' },
  { label: '时长卡', value: 'PERIOD' }
]

// 联系人
export const contacts: LabelValueOptions[] = [
  { label: '爸爸', value: 'FATHER' },
  { label: '妈妈', value: 'MATHER' },
  { label: '本人', value: 'SELF' },
  { label: '爷爷', value: 'GRAND_FA' },
  { label: '奶奶', value: 'GRAND_MA' },
  { label: '外公', value: 'GRAND_FAO' },
  { label: '外婆', value: 'GRAND_MAO' },
  { label: '联系人', value: 'OTHER' }
]

// 支付方式
export const payWayList: LabelValueOptions[] = [
  { label: '微信支付', value: 'WX' },
  { label: '支付宝支付', value: 'ALI' },
  { label: '现金支付', value: 'CASH' },
  { label: '结转支付', value: 'TRANS' },
  { label: '合并支付', value: 'COMBINE' },
  { label: '--', value: 'NONE' }
]

// 划拨类型
export const transferType: LabelValueOptions[] = [
  { label: '全部类型', value: '' },
  { label: '学杂费划拨', value: 'SUNDRY' },
  { label: '课销划拨', value: 'CARD' },
  { label: '退费划拨', value: 'REFUND' }
]

// 划拨状态
export const transferStatus: LabelValueOptions[] = [
  { label: '全部状态', value: '' },
  { label: '申请中', value: 'APPLYING' },
  { label: '审批中', value: 'APPROVING' },
  { label: '处理中', value: 'PROCESSING' },
  { label: '已到账', value: 'FINISHED' },
  { label: '申请失败', value: 'APPLY_FAILED' },
  { label: '划拨失败', value: 'TRANS_FAILED' },
  { label: '申请不通过', value: 'APPROVE_UNPASS' },
  { label: '不发起划拨', value: 'DONT_TRANS' }
]

// 套餐审核状态
export const approvalStatus: LabelValueOptions[] = [
  { label: '全部状态', value: '' },
  { label: '待提交', value: 'UMCOMMITED' },
  { label: '审核中', value: 'APPROVING' },
  { label: '已通过', value: 'PASS' },
  { label: '已驳回', value: 'UNPASS' }
]

// 投诉状态
export const complainStatus: LabelValueOptions[] = [
  { label: '全部状态', value: '' },
  { label: '待处理', value: 'HANDLEING' },
  { label: '已处理', value: 'HANDLED' }
]

// 课程难度
export const courseDiff: LabelValueOptions[] = [
  { label: '零基础', value: 'ZERO' },
  { label: '初级', value: 'ELEMENTARY' },
  { label: '中级', value: 'INTERMEDIATE' },
  { label: '高级', value: 'ADVANCED' }
]

// 手动划拨状态
export const transferHandStatus: LabelValueOptions[] = [
  { label: '全部状态', value: '' },
  { label: '申请中', value: 'APPLYING' },
  { label: '记账成功', value: 'SUCCESS' },
  { label: '记账失败', value: 'FAILURE' },
  { label: '记账异常', value: 'EXCEPTION' }
]

// 课时申诉状态
export const appealStatus: LabelValueOptions[] = [
  { label: '全部状态', value: '' },
  { label: '申诉成功', value: 'SUCCESS' },
  { label: '申诉关闭', value: 'CLOSE' },
  { label: '待平台介入', value: 'INTERVENED' }
]

// 划拨模式
export const transferModel: LabelValueOptions[] = [
  { label: '全部模式', value: '' },
  { label: '一课一销', value: 'CLASS_CONSUME' },
  { label: '保证金', value: 'BOND' },
  { label: '保证金+一课一销', value: 'BOND_CLASS_CONSUME' },
  { label: '按比例划拨', value: 'SCALE' },
  { label: '按申请划拨', value: 'APPLY' }
]

// 划拨资金状态
export const transferMStatus: LabelValueOptions[] = [
  { label: '全部状态', value: '' },
  { label: '待划拨', value: 'WAITING' },
  { label: '划拨申请中', value: 'PROCESSING' },
  { label: '划拨成功', value: 'COMPLETED' },
  { label: '划拨失败', value: 'FAILED' },
  { label: '划拨异常', value: 'EXCEPTION' }
]
