import ColumnSetting from '../components/ColumnSetting'
import { scrollTo } from '@/utils/scrollTo'
import { useColumns, createTableContext } from '../hooks/useTable'
import { tableProps, tableEmits, pageProps } from '../props'
import '../style/table.scss'
import type { TableColumn } from '#/base'
import type { ExtractPropTypes, FunctionalComponent } from 'vue'

export default defineComponent({
  props: tableProps,
  emits: tableEmits,
  setup(props, _ctx) {
    const { slots, emit } = _ctx
    const wrapRef = ref<Nullable<HTMLElement>>(null)

    const { columnsRef, setColumns, getColumns, getCacheColumns } = useColumns(props.columns)
    createTableContext({
      wrapRef,
      setColumns,
      getColumns,
      getCacheColumns
    })

    const setColumnWare = (column: TableColumn, index: Number) => {
      return (
        <el-table-column
          // 此处这么写的原因：
          // 触发了diff 因为元素的key是一样的 所以直接复用了节点，并未进行渲染，但是el-table的渲染又依赖于他内部的节点排序，所以对于el-table来说 节点没增没少,
          // 没触发节点的onMounted 和 onBeforeUnmount 没生成新的column 不触发渲染;
          // 如果prop+index的话 就会触发diff的比较，key不相等，相当于是一个新元素，会有节点的增删动作，所以会走一次卸载和渲染，然后会走table的插入节点 节点比较排序。
          // el-table的源码分析地址入口：table -> table-column -> index -> onMounted -> store -> index -> insertColumn
          // 这种写法会导致渲染负担增加
          // 优化 -> 采用element虚拟列表 -> 查看table-v2目录组件
          key={column.prop + index}
          prop={column.prop}
          fixed={column.fixed}
          sortable={column.sortable ?? false}
          formatter={column.formatter ?? ((row, column, cellValue) => cellValue ?? '--')}
          min-width={column.width ?? 120}
          show-overflow-tooltip={column.overflow ?? true}
          align={column.align ?? 'center'}
          v-slots={{
            default: (scope: any) =>
              slots[column.prop]?.(scope) ||  column.render?.(scope.row[column.prop], scope.row),
            header: (scope: any) =>
              slots[`${column.prop}-header`]?.(scope) ||
              column.renderHeader?.(scope.row[column.prop], scope.row) ||
              column.label
          }}
        />
      )
    }

    const currentPage = computed({
      get: () => props.pageNum,
      set: val => {
        props.scrollTop && scrollTo(0)
        emit('update:page-num', val)
      }
    })
    const limit = computed({
      get: () => props.pageSize,
      set: val => {
        props.scrollTop && scrollTo(0)
        emit('update:page-size', val)
      }
    })
    const PageWare: FunctionalComponent<Partial<ExtractPropTypes<typeof pageProps>>> = ({
      total = 0,
      pageSizes,
      background,
      layout
    }) => (
      <>
        {total > 0 && (
          <div class="pagination-con">
            <el-pagination
              v-model:currentPage={currentPage.value}
              v-model:page-size={limit.value}
              page-sizes={pageSizes}
              background={background}
              layout={layout}
              total={total}
              onSizeChange={() => emit('pagination')}
              onCurrentChange={() => emit('pagination')}
            />
          </div>
        )}
      </>
    )
    const SelectWare: FunctionalComponent<{
      show: boolean
    }> = ({ show }) => (
      <>{show && <el-table-column type="selection" min-width="50" align="center" />}</>
    )
    /* <column-setting/> */
    return () => {
      const {
        loading,
        list,
        border,
        rowKey,
        treeProps,
        text,
        total,
        pageSizes,
        background,
        layout,
        showSelect,
        showSetting
      } = props
      return (
        <div class="el-table-con">
          { showSetting && <ColumnSetting/> }
          <el-table
            ref={(e: any) => (wrapRef.value = e)}
            v-loading={loading}
            data={list}
            border={border}
            row-key={rowKey}
            tree-props={treeProps}
            fit
            highlight-current-row
            style={{ width: '100%' }}
            onSortChange={(e: any) => emit('sort', e)}
            onSelectionChange={(e: any) => emit('select', e)}
            v-slots={{
              empty: () => <el-empty description={text} />
            }}
          >
            <SelectWare show={showSelect} />
            {columnsRef.value.map((column, index) => setColumnWare(column, index))}
          </el-table>
          <PageWare total={total} pageSizes={pageSizes} background={background} layout={layout} />
        </div>
      )
    }
  }
})
