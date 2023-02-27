import { defineComponent } from 'vue'
import type { LocationQuery, RouteMeta, RouteRecordName, RouteRecordRaw } from 'vue-router'

export type Component<T = any> =
  | ReturnType<typeof defineComponent>
  | (() => Promise<typeof import('*.vue')>)
  | (() => Promise<T>)

export interface RouteTab {
  name: RouteRecordName
  title: string
  icon: string | null | undefined
  query: LocationQuery
}

export interface AppRouteRecordRaw extends Omit<RouteRecordRaw, 'meta' | 'children'> {
  path: string
  component: Component
  meta: RouteMeta
  redirect?: string
  name: string
  children?: AppRouteRecordRaw[]
}
