import type { RouteMeta } from '@/router/types'

export interface RouteMenu {
  readonly alwaysShow: boolean,
  children: RouteMenu[],
  readonly component: string,
  readonly disabled: null | boolean,
  readonly hidden: boolean,
  readonly id: number,
  meta: RouteMeta,
  readonly name: string,
  path: string,
  readonly perm: unionType,
  readonly pid: number,
  redirect: string,
  readonly resourceId: string,
  readonly sorted: number,
  readonly title: string
  readonly type: 'Menu' | 'DIR' | 'BTN'
}
