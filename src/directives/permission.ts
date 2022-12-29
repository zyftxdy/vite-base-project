import { usePerm } from '@/hooks'
import type { App, DirectiveBinding } from 'vue'

const hasAuth = (el: Element, binding: DirectiveBinding) => {
  const value = binding.value
  const type = binding.arg
  if (!value) return

  const perm = usePerm(value)
  if (type === 'disabled') {
    !unref(perm) && el.setAttribute('disabled', `true`)
    !unref(perm) && el.classList.add('is-disabled')
  }
  if (type === 'hide') {
    (el as HTMLElement).style.display = unref(perm) ? 'inline-block' : 'none'
  }
}

export function permissionDirective(app: App) {
  app.directive('auth', {
    mounted: (el: Element, binding: DirectiveBinding) => hasAuth(el, binding)
  })
}
