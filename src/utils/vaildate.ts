
/**
 * 整数或两位小数点
 * @param str
 * @returns
 */
export const vaildFloat = (str: string) => {
  return /^([1-9]\d*|(0|[1-9]\d*)\.\d{1,2})$/.test(str)
}
