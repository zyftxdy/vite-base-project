import dayjs from 'dayjs'

const DATE_FORMAT = 'YYYY-MM-DD'

/**
 * 日期处理
 * @param date
 * @param format
 * @returns
 */
export const formatDate = (date: dayjs.ConfigType, format = DATE_FORMAT) => {
  return dayjs(date).format(format)
}

export const dateUtil = dayjs

/**
 * 获取时间据当前时间的状态
 * @param time
 * @returns
 */
export const formatBeforeTime = (time: dayjs.ConfigType) => {
  const now = dayjs(new Date())
  const num = (type: dayjs.OpUnitType) => {
    return now.diff(dayjs(time), type)
  }
  let diff = num('second')
  if (diff > 365 * 24 * 60 * 60) {
    diff = num('year')
    return `${diff}年前`
  } else if (diff > 31 * 24 * 60 * 60) {
    diff = num('month')
    return `${diff}月前`
  } else if (diff > 7 * 24 * 60 * 60) {
    diff = num('week')
    return `${diff}周前`
  } else if (diff > 24 * 60 * 60) {
    diff = num('day')
    return `${diff}天前`
  } else if (diff > 60 * 60) {
    diff = num('hour')
    return `${diff}小时前`
  } else if (diff > 60) {
    diff = num('minute')
    return `${diff}分钟前`
  }
  return `${diff}秒前`
}

/**
 * 获取当前时间的前n天
 * @param diffNum
 */
export const getDayList = (diffNum: number) => {
  const dayList: string[] = []
  for (let i = diffNum; i > 0; i--) {
    const now = new Date()
    dayList.push(formatDate(new Date().setDate(now.getDate() - i), 'MM-DD'))
  }
  return dayList
}
