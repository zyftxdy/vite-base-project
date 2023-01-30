import type { RouteLocationRaw, Router } from 'vue-router'

export function useGo(_router?: Router) {
  const { push, replace } = _router || useRouter()
  const go = (options: RouteLocationRaw, isRepalce = false) => {
    if (!options) {
      return
    }
    isRepalce ? replace(options) : push(options)
  }
  return go
}
