// @ts-nocheck
import ZHttp from '@/utils/axios'

// 部门列表
export const departList = () => {
  return ZHttp.get({
    url: '/dept/list'
  })
}

// 部门信息
export const deptInfo = params => {
  return ZHttp.get({
    url: '/dept/info',
    params: params
  })
}

// 添加部门
export const deptAdd = params => {
  return ZHttp.post({
    url: '/dept/add',
    data: params
  })
}

// 修改部门
export const deptUpdate = params => {
  return ZHttp.post({
    url: '/dept/edit',
    data: params
  })
}

// 删除部门
export const deptDel = params => {
  return ZHttp.post({
    url: '/dept/del',
    data: params
  })
}

// 部门树
export const deptTree = (params?: any) => {
  return ZHttp.get({
    url: '/dept/tree',
    params: params
  })
}
