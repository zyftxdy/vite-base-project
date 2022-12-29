// @ts-nocheck
import ZHttp from "@/utils/axios"

// 资金冻结统计
export const getFreezeList = param => {
  return ZHttp.post({
    url: '/bank/supe/stat/page',
    data: param
  })
}

// 资金划拨统计
export const getThawList = param => {
  return ZHttp.post({
    url: '/bank/supe/trans/stat/page',
    data: param
  })
}

// 监管统计
export const getSuperList = param => {
  return ZHttp.post({
    url: '/bank/scho/supe/page',
    data: param
  })
}
