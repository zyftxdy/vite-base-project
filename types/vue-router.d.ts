export {}

declare module 'vue-router' {
  interface RouteMeta extends Record<string | number | symbol, unknown> {
    activeMenu?: null | string
    breadcrumb?: boolean
    icon?: string | null | undefined
    title: string
  }
}
