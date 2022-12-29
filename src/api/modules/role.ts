// @ts-nocheck
import ZHttp from "@/utils/axios"

// 职位列表
export const roleList = params => {
  return ZHttp.get({
    url: '/role/list',
    params: params
  })
}

// 职位信息
export const roleInfo = params => {
  return ZHttp.get({
    url: '/role/info',
    params: params
  })
}

// 添加职位
export const roleAdd = params => {
  return ZHttp.post({
    url: '/role/add',
    data: params
  })
}


// 修改职位
export const roleUpdate = params => {
  return ZHttp.post({
    url: '/role/edit',
    data: params
  })
}


// 删除职位
export const roleDel = params => {
  return ZHttp.post({
    url: '/role/del',
    data: params
  })
}

// 职位树
export const roleTree = params => {
  return ZHttp.get({
    url: '/role/tree',
    params: params
  })
}
