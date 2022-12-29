// @ts-nocheck
import ZHttp from "@/utils/axios"

// 菜单树
export const deptTree = () => {
  return ZHttp.get({
    url: '/dept/tree/limit'
  })
}

// 运营概况统计
export const getSupeTotal = param => {
  return ZHttp.post({
    url: '/bank/supervise/supe/total',
    data: param
  })
}

// 待办事项统计
export const waitDoneTotal = param => {
  return ZHttp.post({
    url: '/bank/home/processing',
    data: param
  })
}

// 实时订单
export const getSupeList = param => {
  return ZHttp.post({
    url: '/order/list/home',
    data: param
  })
}

// 资金监管动态
export const freezeBar = param => {
  return ZHttp.post({
    url: '/bank/supe/stat/total/days/ten',
    data: param
  })
}

// 资金监管统计
export const freezeList = param => {
  return ZHttp.post({
    url: '/bank/supe/stat/page/home',
    data: param
  })
}

// 资金划拨动态
export const thawBar = param => {
  return ZHttp.post({
    url: '/bank/supe/trans/stat/days/ten',
    data: param
  })
}

// 资金划拨统计
export const thawList = param => {
  return ZHttp.post({
    url: '/bank/supe/trans/stat/page/home',
    data: param
  })
}
