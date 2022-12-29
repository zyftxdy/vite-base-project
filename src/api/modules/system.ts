// @ts-nocheck
import ZHttp from '@/utils/axios'

//投诉类别列表
export const categoryList = param => {
  return ZHttp.post({
    url: '/complaint/category/list',
    data: param
  })
}

//添加投诉类别
export const categoryAdd = param => {
  return ZHttp.post({
    url: '/complaint/category/add',
    data: param
  })
}

//修改投诉类别
export const categoryEdit = param => {
  return ZHttp.post({
    url: '/complaint/category/edit',
    data: param
  })
}

//删除投诉类别
export const categoryDel = param => {
  return ZHttp.post({
    url: '/complaint/category/del',
    data: param
  })
}

// 界面设置详情
export const channelDetail = () => {
  return ZHttp.get({
    url: '/channel/detail'
  })
}

// 界面设置保存
export const channelSave = param => {
  return ZHttp.post({
    url: '/channel/save',
    data: param
  })
}
