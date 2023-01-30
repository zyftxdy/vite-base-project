import type { TableAction } from '../types'
import type { TableColumn } from '#/base'
import type { Ref } from 'vue'

export function useColumns(columns: TableColumn[], callBack?: Fn) {
  const columnsRef = ref<TableColumn[]>([])
  let cacheCloumns: TableColumn[]

  watch(
    () => columns,
    columns => {
      columnsRef.value = columns
      cacheCloumns = columns
      callBack?.(columns)
    },
    {
      deep: true,
      immediate: true
    }
  )

  const setColumns = (newColumns: TableColumn[]) => {
    columnsRef.value = newColumns
    callBack?.(newColumns)
  }
  const getColumns = () => {
    return columnsRef.value
  }
  const getCacheColumns = () => {
    return cacheCloumns
  }

  return {
    columnsRef,
    setColumns,
    getColumns,
    getCacheColumns
  }
}

const key = Symbol('Table')
type instance = TableAction & {
  wrapRef: Ref<Nullable<HTMLElement>>
}
export function createTableContext(instance: instance) {
  provide(key, instance)
}
export function useTableContext() {
  return inject(key) as instance
}
