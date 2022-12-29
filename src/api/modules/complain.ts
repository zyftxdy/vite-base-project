// @ts-nocheck
import ZHttp from '@/utils/axios'

//投诉与反馈列表
export const complaintList = param => {
  return ZHttp.post({
    url: '/complaint/list',
    data: param
  })
}

//投诉详情
export const complaintInfo = param => {
  return ZHttp.post({
    url: '/complaint/info',
    data: param
  })
}

//回复投诉
export const complaintHandle = param => {
  return ZHttp.post({
    url: '/complaint/handle',
    data: param
  })
}

// 课时申诉列表
export const appealList = param => {
  return ZHttp.post({
    url: '/bank/class/consume/appeal/list',
    data: param
  })
}

// 课时申诉详情
export const appealDetail = param => {
  return ZHttp.get({
    url: '/bank/class/consume/appeal/details',
    params: param
  })
}

// 课时申诉提交
export const appealSubmit = param => {
  return ZHttp.post({
    url: '/bank/class/consume/appeal/handles',
    data: param
  })
}
