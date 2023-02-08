import { PropType as VuePropType } from 'vue'

declare global {
  type Fn<T = any> = (...args: any[]) => T

  type Nullable<T> = T | null

  type Arrayable<T> = T | Array<T>

  type PropType<T> = VuePropType<T>

  type unionType = string | null | undefined

  type NonUndefined<T> = T extends undefined ? never : T

  type NoReadonly<T> = {
    -readonly [P in keyof T]: T[P]
  }

  type Recordable<T = any> = Record<string, T>

  type DeepPartial<T> = {
    [K in keyof T]?: T[K] extends Object ? DeepPartial<T[K]> : T[K]
  }

  type RequireKey<T, K extends keyof T> = Omit<Partial<T>, K> & {
    [P in K]-?: T[P]
  }

  type TimeoutHandle = ReturnType<typeof setTimeout>

  type IntervalHandle = ReturnType<typeof setInterval>

  interface Window {
    webkitRequestAnimationFrame: any
    mozRequestAnimationFrame: any
  }

  interface Math {
    easeInOutQuad: (...args) => number
  }
}
