import { HEADER_HEIGHT, INIT_WIDTH, LINE_HEIGHT, SELECT_KEY, SELECT_WIDTH } from '../const'
import { cloneDeep } from 'lodash-es'
import { calcNum } from '@/utils/mUtils'
import { TableEmits, tableV2Props } from '../props'
import { useWindowSizeFn } from '@/hooks'
import { createTableContext, useColumns } from '../hooks/useTable'
import { useEvents } from './render-event'
import { ElCheckbox, TableV2SortOrder } from 'element-plus'
import { createElementVNode, createVNode } from 'vue'
import type { TableColumn } from '#/base'
import type { SelectionCellProps } from '../types'
import type { ExtractPropTypes, Slots, FunctionalComponent, SetupContext } from 'vue'
import type { Column, RowExpandParams, TableV2FixedDir, CheckboxValueType, SortState } from 'element-plus'

export function useRender(
  props: ExtractPropTypes<typeof tableV2Props>,
  slots: Slots,
  emit: SetupContext<TableEmits>['emit']
) {
  const widthTotalScale = ref(0)
  const wrapRef = ref<Nullable<HTMLElement>>(null)
  const isInit = ref(false)
  const columnsRef = ref<Column[]>([])
  const sortState = ref<SortState>({})

  const {
    handleCellMouseEnter,
    handleCellMouseLeave
  } = useEvents()

  const SelectWare: FunctionalComponent<SelectionCellProps> = ({
    value,
    indeterminate = false,
    onChange
  }) => createVNode(ElCheckbox, {
    modelValue: value,
    indeterminate: indeterminate,
    onChange: onChange
  })
  const setSelectCell = () => {
    const selectCell: Column = {
      key: SELECT_KEY,
      width: SELECT_WIDTH,
      align: 'center',
      cellRenderer: ({ rowData }) => {
        const data = unref(dataRef)
        const onChange = (value: CheckboxValueType) => {
          rowData.checked = value
          emit('select', data.filter(item => item.checked))
        }
        return createVNode(SelectWare, {
          value: rowData.checked,
          onChange: onChange
        })

      },
      headerCellRenderer: () => {
        const data = unref(dataRef)
        const allSelected = data.every(item => item.checked)
        const containsChecked = data.some(item => item.checked)
        const onChange = (value: CheckboxValueType) => {
          data.map(item => item.checked = value)
          emit('select', data.filter(item => item.checked))
        }
        return createVNode(SelectWare, {
          value: allSelected,
          indeterminate: containsChecked && !allSelected,
          onChange: onChange
        })
      }
    }
    columnsRef.value.unshift(selectCell)
  }

  const generateColumn = (column: TableColumn, scale: number): Column => ({
    key: column.prop,
    dataKey: column.prop,
    title: column.label,
    sortable: !!column.sortable,
    fixed: column.fixed as (TableV2FixedDir & true & undefined),
    align: column.align ?? 'center',
    width: column.width ?? INIT_WIDTH,
    initWidth: column.width ?? INIT_WIDTH,
    widthScale: scale,
    formatter: column.formatter ?? ((row, column, cellValue) => cellValue ?? '--') as TableColumn['formatter'],
    headerCellRenderer: ({column: hColumn}) => (
      createElementVNode('div', {
        class: 'cell-header'
      }, [ column.renderHeader?.(hColumn.title) || slots[`${hColumn.key}-header`]?.() || hColumn.title ])
    ),
    cellRenderer: ({rowData, cellData, column: cColumn}) => (
      createElementVNode('div', {
        class: `cell-content truncate leading-6 ${(column.overflow ?? true) ? 'cell-tooltip' : ''}`,
        onMouseenter: ($event: MouseEvent) => handleCellMouseEnter($event, rowData, wrapRef.value!),
        onMouseleave: handleCellMouseLeave
      }, [ column.render?.(cellData, rowData) || slots[cColumn.key]?.({ row: rowData }) || cColumn.formatter?.(rowData, cColumn, cellData) ], 2)
    )
  })

  const dealColumns = (columns: TableColumn[]) => {
    widthTotalScale.value = 0
    const selectCell: Nullable<Column> = unref(isInit) ? unref(columnsRef).shift()! : null
    columnsRef.value = columns.map(column => {
      if (!unref(isInit) && column.sortable) sortState.value[column.prop] = TableV2SortOrder.ASC
      const scale = calcNum((column.width || INIT_WIDTH) / INIT_WIDTH)
      widthTotalScale.value += scale
      return generateColumn(column, scale)
    })

    if (props.showSelect) {
      if (!unref(isInit)) setSelectCell()
      else columnsRef.value.unshift(selectCell!)
    }
    if (unref(wrapRef)) calcWidth()
    isInit.value = true
  }

  const {
    setColumns,
    getColumns,
    getCacheColumns
  } = useColumns(props.columns, columns => dealColumns(columns))
  createTableContext({
    wrapRef,
    setColumns,
    getColumns,
    getCacheColumns
  })

  // 计算未设置宽度的列宽度
  const calcWidth = () => {
    const el = unref(wrapRef)
    const columns = unref(columnsRef)
    if (!el) return
    let totalWidth = el.clientWidth
    const index = columns.findIndex(item => item.key === SELECT_KEY)
    if (index !== -1) totalWidth -= columns[index].width
    // 减去偏差
    const averageWidth = calcNum(totalWidth / unref(widthTotalScale)) - 0.7
    columns.map(column => {
      if (column.key !== SELECT_KEY) column.width = Math.max(calcNum(averageWidth * column.widthScale), column.initWidth)
    })
  }
  useWindowSizeFn({
    fn: calcWidth,
    wait: 1000,
    throttle: true,
    immediate: true
  })

  /* 动态计算table高度 */
  const dataRef = ref<Recordable[]>([])
  const tableHeight = ref(320)
  const expandedRowKeys = ref<string[]>([])
  watch(() => props.list, list => {
    const cloneList = cloneDeep(list)
    if (props.showSelect) cloneList.map(item => item.checked = false)
    dataRef.value = cloneList
    const calcHeight = cloneList.length ? LINE_HEIGHT * cloneList.length + HEADER_HEIGHT : 320
    if (calcHeight !== tableHeight.value) tableHeight.value = calcHeight
  }, {
    deep: true,
    immediate: true
  })
  const expandedChange = (param: RowExpandParams) => {
    const { expanded, rowData } = param
    if (expanded) {
      tableHeight.value += rowData.children.length * LINE_HEIGHT
    } else {
      let count = rowData.children.length
      const keys = unref(expandedRowKeys)
      const recursiveFn = (list: Recordable[]) => {
        if (!list.length) return []
        const flatKeys: string[] = []
        list.map(item => {
          if (keys.includes(item.id)) count += item.children.length
          flatKeys.push(item.id)
          if (item.children) flatKeys.push(...recursiveFn(item.children))
        })
        return flatKeys
      }
      const flatKeys = recursiveFn(rowData.children)
      flatKeys.map(item => {
        const index = keys.indexOf(item)
        if (index !== -1) keys.splice(index, 1)
      })
      expandedRowKeys.value = keys
      tableHeight.value -= count * LINE_HEIGHT
    }
  }
  /* 动态计算table高度 */

  return {
    dataRef,
    wrapRef,
    columnsRef,
    sortState,
    tableHeight,
    expandedRowKeys,
    expandedChange
  }
}
