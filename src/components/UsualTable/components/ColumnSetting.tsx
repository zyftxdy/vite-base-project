import { useTableContext } from '../hooks/useTable'
import { isNullAndUnDef } from '@/utils/is'
import Sortablejs from 'sortablejs'
import { cloneDeep } from 'lodash-es'
import '../style/setting.scss'
import type Sortable from 'sortablejs'
import type { TableColumn } from '#/base'
import type { CheckboxValueType } from 'element-plus'

export default defineComponent({
  emits: ['columns-change'],
  setup(_, { emit }) {
    const table = useTableContext()
    const isInit = ref(false)
    const checkAll = ref(true)
    const checkList = ref<string[]>([])
    const sortOptions = ref<TableColumn[]>([])

    const init = () => {
      const target = table.getColumns()
      const checked = target.map(column => column.prop)
      if (!unref(isInit)) {
        isInit.value = true
        sortOptions.value = cloneDeep(target)
        checkList.value = checked
      } else {
        sortOptions.value.map(column => {
          const index = target.findIndex(n => n.prop === column.prop)
          if (index !== -1) {
            column = target[index]
          }
          return column
        })
      }
    }
    watch(() => table.getColumns(), init, {
      deep: true,
      immediate: true
    })

    const indeterminate = computed(() => {
      const len = sortOptions.value.length
      const checkLen = checkList.value.length
      return checkLen > 0 && checkLen < len
    })
    const handleCheckAllChange = (checked: CheckboxValueType) => {
      checkList.value = checked ? sortOptions.value.map(column => column.prop) : []
      onChange()
    }
    const onChange = () => {
      const columns = unref(sortOptions).filter(item => unref(checkList).includes(item.prop))
      setColumns(columns)
    }
    const reset = () => {
      checkAll.value = true
      checkList.value = table.getCacheColumns().map(column => column.prop)
      setColumns(table.getCacheColumns())
      sortable.sort(cacheSort)
    }

    let inited = false
    let sortable: Sortable
    let cacheSort: string[] = []
    const columnRef = ref<ComponentRef>(null)
    const showChange = () => {
      const columnEl = unref(columnRef)
      if (inited) {
        return
      }
      if (!columnEl) {
        return
      }
      const el = columnEl.$el
      nextTick(() => {
        sortable = Sortablejs.create(el, {
          animation: 500,
          delay: 400,
          delayOnTouchOnly: true,
          handle: '.column_item_rank',
          filter: '.item_unChoose',
          onEnd: evt => {
            const { oldIndex, newIndex } = evt
            if (isNullAndUnDef(oldIndex) || isNullAndUnDef(newIndex) || oldIndex === newIndex) {
              return
            }
            const columns = unref(sortOptions)
            if (oldIndex > newIndex) {
              columns.splice(newIndex, 0, columns[oldIndex])
              columns.splice(oldIndex + 1, 1)
            } else {
              columns.splice(newIndex + 1, 0, columns[oldIndex])
              columns.splice(oldIndex, 1)
            }
            setColumns(columns)
          }
        })
        cacheSort = sortable.toArray()
        inited = true
      })
    }
    const setColumns = (columns: TableColumn[]) => {
      table.setColumns(columns)
      emit('columns-change', columns)
    }

    const handleColumnFixed = (column: TableColumn, fixed?: 'left' | 'right') => {
      const boole = unref(checkList).includes(column.prop)
      if (!boole) {
        return
      }
      const columns = unref(sortOptions)
      const index = columns.findIndex(item => item.prop === column.prop)
      if (index !== -1) {
        columns[index].fixed = column.fixed === fixed ? undefined : fixed
      }
      setColumns(columns.filter(column => unref(checkList).includes(column.prop)))
    }
    return () => (
      <el-popover
        width={300}
        popper-class="!rounded-sm !p-0"
        trigger="click"
        placement="bottom"
        onShow={() => showChange()}
        v-slots={{
          reference: () => <i-ep-setting class="setting m-2" />
        }}
      >
        <div class="setting-control">
          <el-checkbox
            v-model={checkAll.value}
            indeterminate={indeterminate.value}
            class="flex-1"
            onChange={(e: CheckboxValueType) => handleCheckAllChange(e)}
            >?????????</el-checkbox>
          <el-button link type="primary" onClick={() => reset()}>??????</el-button>
        </div>
        <div class="setting-content px-2 py-1">
          <el-checkbox-group ref={(el: any) => columnRef.value = el} v-model={checkList.value} class="columnRef" onChange={() => onChange()}>
            {
              sortOptions.value.map(item => (
                <div class="setting_column_item flex items-center" key={item.prop}>
                  <i-ep-rank
                    class={[
                      'column_item_rank pr-1 cursor-move',
                      {
                        item_unChoose: !checkList.value.includes(item.prop)
                      }
                    ]}
                  />
                  <el-checkbox label={item.prop} class="flex-1 pr-2">{ item.label }</el-checkbox>
                  <el-tooltip effect="dark" content="???????????????" placement="bottom">
                    <i-ep-download
                      class={[
                        'rotate-90 cursor-pointer focus:outline-none',
                        {
                          'text-blue-700': item.fixed === 'left',
                          'cursor-not-allowed': !checkList.value.includes(item.prop)
                        }
                      ]}
                      onClick={() => handleColumnFixed(item, 'left')}
                    />
                  </el-tooltip>
                  <el-divider direction="vertical" />
                  <el-tooltip effect="dark" content="???????????????" placement="bottom">
                    <i-ep-download
                      class={[
                        '-rotate-90 cursor-pointer focus:outline-none',
                        {
                          'text-blue-700': item.fixed === 'right',
                          'cursor-not-allowed': !checkList.value.includes(item.prop)
                        }
                      ]}
                      onClick={() => handleColumnFixed(item, 'right')}
                    />
                  </el-tooltip>
                </div>
              ))
            }
          </el-checkbox-group>
        </div>
      </el-popover>
    )
  }
})
