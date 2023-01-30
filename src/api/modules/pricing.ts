// @ts-nocheck
import ZHttp from '@/utils/axios'

// 课程备案列表
export const list = param => {
  return ZHttp.post({
    url: '/combo/his/page',
    data: param
  })
}

// 课程备案详情
export const detail = param => {
  return ZHttp.get({
    url: '/combo/his/detail',
    params: param
  })
}

// 审核备案
export const appr = param => {
  return ZHttp.get({
    url: '/combo/his/appr',
    params: param
  })
}
