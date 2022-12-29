// @ts-nocheck
import ZHttp from "@/utils/axios"

// 校区列表
export const schoolList = params => {
  return ZHttp.post({
    url: '/school/list',
    data: params
  })
}

// 校区详情
export const schoolInfo = params => {
  return ZHttp.get({
    url: '/school/info',
    params: params
  })
}

// 手动设置保证金
export const handMoney = params => {
  return ZHttp.post({
    url: '/merchant/update/earnestMoney',
    data: params
  })
}

// 清空部门
export const delDept = params => {
  return ZHttp.post({
    url: '/school/del/dept',
    data: params
  })
}

// 设置部门
export const setDept = params => {
  return ZHttp.post({
    url: '/school/set/dept',
    data: params
  })
}

// 设置信用评级
export const setLevel = params => {
  return ZHttp.post({
    url: '/school/reset/credit-Level',
    data: params
  })
}

// 订单列表
export const orderList = (param: any) => {
  return ZHttp.post({
    url: '/order/list',
    data: param
  })
}

// 订单详情
export const orderDetail = (param: any) => {
  return ZHttp.get({
    url: `/order/detail/${param.orderId}`,
    params: param
  })
}

// 划拨详情
export const transferList = (param: any) => {
  return ZHttp.post({
    url: '/bank/supe/trans/det/page',
    data: param
  })
}

// 重新申请划拨
export const transfer = (param: any) => {
  return ZHttp.post({
    url: '/bank/supe/trans/det/reapply',
    data: param
  })
}

// 提交实校验证
export const submitVerify = (param: any) => {
  return ZHttp.post({
    url: '/school/reality/verify',
    data: param
  })
}

// 实校验证详情
export const verifyDetail = (param: any) => {
  return ZHttp.get({
    url: `/school/verify`,
    params: param
  })
}

// 已备案课程
export const getComboList = (param: any) => {
  return ZHttp.post({
    url: '/pay/combo/page',
    data: param
  })
}

// 黑白灰名单
export const creditList = (param: any) => {
  return ZHttp.post({
    url: '/school_credit/page',
    data: param
  })
}

// 移除名单
export const creditMove = (param: any) => {
  return ZHttp.post({
    url: '/school_credit/move',
    data: param
  })
}

// 手动划拨校区信息
export const transferHandDetail = (param: any) => {
  return ZHttp.post({
    url: '/school/manualtrans/info',
    data: param
  })
}

// 手动划拨
export const transferHand = (param: any) => {
  return ZHttp.post({
    url: '/bank/supervise/tran/xhbank',
    data: param
  })
}

// 手动划拨列表
export const transferHandList = (param: any) => {
  return ZHttp.post({
    url: '/bank/man/tran/page',
    data: param
  })
}

// 手动划拨详情
export const transferHandInfo = (param: any) => {
  return ZHttp.post({
    url: '/bank/man/tran/manualtrans/info',
    data: param
  })
}
