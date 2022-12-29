import { LabelValueOptions } from '#/base.d'
import * as constant from './constant'

const reduceFun = (list: LabelValueOptions[]) => {
  return list.reduce((acc, cur) => {
    acc[cur.value] = cur.label
    return acc
  }, {} as Recordable)
}

export const enableOptions = reduceFun(constant.enableStatus)
export const cerditLvOptions = reduceFun(constant.cerditLvStatus)
export const schoolOptions = reduceFun(constant.schoolStatus)
export const typeOptions = reduceFun(constant.schoolType)
export const orderOptions = reduceFun(constant.orderStatus)
export const cardOptions = reduceFun(constant.cardType)
export const contactsOptions = reduceFun(constant.contacts)
export const payOptions = reduceFun(constant.payWayList)
export const transferTOptions = reduceFun(constant.transferType)
export const transferSOptions = reduceFun(constant.transferStatus)
export const approvalOptions = reduceFun(constant.approvalStatus)
export const complainOptions = reduceFun(constant.complainStatus)
export const courseDiffOptions = reduceFun(constant.courseDiff)
export const transferHOptions = reduceFun(constant.transferHandStatus)
export const appealOptions = reduceFun(constant.appealStatus)
export const transferModelOptions = reduceFun(constant.transferModel)
export const transferMOptions = reduceFun(constant.transferMStatus)
