// @ts-nocheck
import ZHttp from '@/utils/axios'

// 划拨配置列表
export const rulePage = param => {
  return ZHttp.post({
    url: '/bank/transfer/rule/page',
    data: param
  })
}

// 划拨配置添加
export const ruleAdd = param => {
  return ZHttp.post({
    url: '/bank/transfer/rule/add',
    data: param
  })
}

// 划拨配置删除
export const ruleDel = param => {
  return ZHttp.post({
    url: '/bank/transfer/rule/del',
    data: param
  })
}

// 划拨规则列表
export const scaleList = param => {
  return ZHttp.post({
    url: '/bank/transfer/rule/scale/list',
    data: param
  })
}

// 划拨规则分页
export const scalePage = param => {
  return ZHttp.post({
    url: '/bank/transfer/rule/scale/page',
    data: param
  })
}

// 划拨规则添加
export const scaleAdd = param => {
  return ZHttp.post({
    url: '/bank/transfer/rule/scale/add',
    data: param
  })
}

// 划拨规则删除
export const scaleDel = param => {
  return ZHttp.post({
    url: '/bank/transfer/rule/scale/del',
    data: param
  })
}

// 资金汇总列表
export const summaryPage = param => {
  return ZHttp.post({
    url: '/bank/scale/trans/summary/page',
    data: param
  })
}

// 资金汇总详情
export const summaryInfo = param => {
  return ZHttp.post({
    url: '/bank/order/transfer/scale/info',
    data: param
  })
}

export const transInfo = param => {
  return ZHttp.post({
    url: '/bank/scale/trans/summary/info',
    data: param
  })
}

// 按申请划拨列表
export const manualPage = param => {
  return ZHttp.post({
    url: '/apply/transfer/page',
    data: param
  })
}

// 按申请划拨详情
export const manualInfo = param => {
  return ZHttp.post({
    url: '/apply/transfer/info',
    data: param
  })
}

// 按申请划拨操作
export const manualApply = param => {
  return ZHttp.post({
    url: '/apply/transfer/active/apply',
    data: param
  })
}
