// @ts-nocheck
import ZHttp from "@/utils/axios"

export const statisHead = params => {
  return ZHttp.post({
    url: '/data/count/head',
    data: params
  })
}

export const statisSuper = params => {
  return ZHttp.post({
    url: '/data/count/superviseAmount',
    data: params
  })
}

export const statisFree = params => {
  return ZHttp.post({
    url: '/data/count/unfreezeAmount',
    data: params
  })
}

export const statisComplain = params => {
  return ZHttp.post({
    url: '/data/count/complaint',
    data: params
  })
}

export const statisCourse = params => {
  return ZHttp.post({
    url: '/data/count/course',
    data: params
  })
}

export const statisCredit = params => {
  return ZHttp.post({
    url: '/data/count/creditLevel',
    data: params
  })
}

export const statisDist = params => {
  return ZHttp.post({
    url: '/data/count/distribution',
    data: params
  })
}
