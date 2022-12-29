import { CSSProperties } from 'vue'

export const hasClass = (el: Element, cls: string): boolean => {
  if (!el || !cls) return false
  if (cls.includes(' ')) throw new Error('className should not contain space.')
  return el.classList.contains(cls)
}

export const getStyle = (
  el: HTMLElement,
  styleName: keyof CSSProperties
): string => {
  if (!el || !styleName) return ''
  const style = (el.style as any)[styleName] || (document.defaultView?.getComputedStyle(el, '') as any)[styleName]
  return style
}

// 用于修改样式的工具类，并且可以减少回流重绘
export const changeStyle = (el: HTMLElement, cssObj: CSSProperties) => {
  const original = el.style.cssText.split(';')
  original.pop()
  let cssStr = ''
  for (const key in cssObj) {
    cssStr += `${key}: ${cssObj[key as keyof typeof cssObj]};`
  }
  const cssArr = cssStr.split(';')
  cssArr.pop()
  el.style.cssText = original.concat(cssArr).join(';') + ';'
}

// 计算自适应屏幕的缩放值
export const adaptScale = (el: HTMLElement) => {
  if (!el) return 1
  const { innerWidth: winWidth, innerHeight: winHeight } = window
  const { offsetWidth: w, offsetHeight: h } = el // 获取文档中图片的宽高
  let scale = 0
  scale = winWidth / w
  if (h * scale > (winHeight - 120)) {
    scale = (winHeight - 120) / h
  }
  return scale
}
