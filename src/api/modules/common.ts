// @ts-nocheck
import ZHttp from "@/utils/axios"
import type { UploadFileParams } from "@/utils/axios/types"

// 通道信息
export const channelInfo = () => {
  return ZHttp.get({
    url: '/channel/info'
  })
}

// 通过父级查询区域
export const getByParentCode = param => {
  return ZHttp.get({
    url: '/district/getByParentCode',
    params: param
  })
}

export const classifyList = param => {
  return ZHttp.get({
    url: '/school/classify/list',
    params: param
  })
}

// 主营类目列表
export const dictList = () => {
  return ZHttp.get({
    url: '/dict/list'
  })
}

// 获取菜单树列表
export const getMenuTree = () => {
  return ZHttp.get({
    url: '/resource/treeMenu'
  })
}

// 一级分类列表
export const getCList = () => {
  return ZHttp.get({
    url: '/combo/his/category/list'
  })
}

// 二级分类列表
export const getCcList = param => {
  return ZHttp.get({
    url: '/combo/his/category/childList',
    params: param
  })
}

// 上传文件
export const uploadPublic = (param: UploadFileParams) => {
  return ZHttp.upload(
    {
      url: '/file/upload/public'
    },
    param
  )
}

// 部门列表
export const deptList = () => {
  return ZHttp.get({
    url: '/dept/pub/list'
  })
}

// 校区列表
export const schoolList = param => {
  return ZHttp.post({
    url: '/school/page/nonrule',
    data: param
  })
}

// 修改账户密码
export const updatePassword = param => {
  return ZHttp.post({
    url: '/user/resetPass',
    data: param
  })
}
