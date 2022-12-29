export * from './dateUtil'
export { scrollTo } from './scrollTo'
import echarts, { ECOption } from '@/utils/echarts'
import { isArray, isNumber, isObject } from './is'
import type { SearchOptions } from '#/base'
import type { DateModelType } from 'element-plus'

export const legendselectchanged = (target: echarts.ECharts, params: Recordable) => {
  var option = target.getOption()
  var select_value = Object.values(params.selected)
  var n = 0
  select_value.map(res => {
    if (!res) {
      n++
    }
  })
  if (n === select_value.length) {
    (option.legend as ECOption[])[0].selected = {
      [params.name]: true
    }
  }
  target.setOption(option)
}

/**
 * 处理数字
 * @param num
 * @returns
 */
export const formatNum = (num: any): string => {
  num = num.toString()
  const matchNum = num.indexOf('.') !== -1 ? num.match(/(.*)\./)[1] : num
  if (matchNum.length >= 9) {
    num = toFixedNum(matchNum/(10**8)) + '亿'
  } else if (matchNum.length >= 5) {
    num = toFixedNum(matchNum/(10**4)) + '万'
  }
  return num
}

/**
 * 返回两位的小数的字符串
 * @param num
 * @returns
 */
 export const toFixedNum = (num: any) => {
  const strArry = num.toString().split('.')
  if (strArry.length === 2 && strArry[1].length > 2 && strArry[1][2] > 4) {
    num = num + '1'
  }
  return Number(num).toFixed(2)
}

export const calcNum = (num: string | number) => {
  return parseFloat(isNumber(num) ? num.toString() : num)
}

/**
 *
 * @param target
 * @param prop
 * @param list
 */
export const setItemList = (target: SearchOptions[], prop: string, list: any[]) => {
  target.map(item => {
    if (isArray(item)) {
      const i = item.findIndex(n => n.prop === prop)
      if (i !== -1) item[i].optionsList = list
    } else {
      if (item.prop === prop) item.optionsList = list
    }
  })
}

/**
 * 扁平object
 * @param source
 * @returns
 */
export const flatObject = (source: Recordable): Recordable => {
  if (!source) return {}
  let target: Recordable = {}
  for (const key in source) {
    if (isObject(source[key])) {
      target = Object.assign(target, flatObject(source[key]))
    } else {
      target[key] = source[key]
    }
  }
  return target
}

/**
 * 计算两个日期一共多少天
 * @param fromDate
 * @param toDate
 * @returns
 */
export const computeDiffDay = (fromDate: DateModelType, toDate: DateModelType) => {
  const timestampFrom = new Date(fromDate).getTime()
  const timestampTo = new Date(toDate).getTime()
  const diffDay = parseInt(((timestampTo - timestampFrom) / (1000 * 3600 * 24)).toString())
  return diffDay + 1
}

/**
 * 判断list是否回到上一页
 * @param list
 * @param pageNum
 * @returns
 */
export const backPageNum = (list: any[], pageNum: number): number => {
  return pageNum > 1 ? list.length === 1 ? pageNum - 1 : pageNum : 1
}
