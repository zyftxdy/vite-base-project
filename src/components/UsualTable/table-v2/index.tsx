import ColumnSetting from '../components/ColumnSetting'
import { scrollTo } from '@/utils/mUtils'
import { tableV2Props, tableEmits, pageProps } from '../props'
import { useRender } from './render-helper'
import '../style/table-v2.scss'
import type { ExtractPropTypes, FunctionalComponent } from 'vue'
import type { RowExpandParams, SortBy } from 'element-plus'

export default defineComponent({
  props: tableV2Props,
  emits: tableEmits,
  setup(props, { emit, slots }) {
    const {
      wrapRef,
      dataRef,
      columnsRef,
      sortState,
      tableHeight,
      expandedRowKeys,
      expandedChange
    } = useRender(props, slots, emit)

    /* 生成page分页 */
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
    /* 生成page分页 */

    /* slots处理 */
    const slotsWare = () => {
      const { loading, text } = props
      return loading
        ? {
            empty: () => <el-empty description={text} />,
            overlay: () => (
              <div class="el-loading-mask flex items-center justify-center">
                <i-ep-loading class="el-icon is-loading !text-blue-500 !text-2xl" />
              </div>
            )
          }
        : {
            empty: () => <el-empty description={text} />
          }
    }
    /* slots处理 */

    const sortChange = ({ key, order }: SortBy) => {
      sortState.value[key] = order
      emit('sort', { prop: key, order })
    }

    return () => {
      const { expandColumnKey, total, pageSizes, background, layout, showSetting } = props
      return (
        <div class="el-table-con-v2">
          { showSetting && <ColumnSetting/> }
          <div ref={(e: any) => (wrapRef.value = e)} style={{ height: tableHeight.value + 'px' }}>
            <el-auto-resizer
              class="table-v2-custom"
              v-slots={{
                default: ({ height, width }: any) => (
                  <el-table-v2
                    columns={columnsRef.value}
                    data={dataRef.value}
                    v-model:expanded-row-keys={expandedRowKeys.value}
                    expandColumnKey={expandColumnKey}
                    v-model:sort-state={sortState.value}
                    width={width}
                    height={height}
                    header-class="table-v2-custom-header"
                    header-height={44}
                    row-height={40}
                    fixed
                    v-slots={slotsWare()}
                    onRowExpand={(e: RowExpandParams) => expandedChange(e)}
                    onColumnSort={(e: SortBy) => sortChange(e)}
                  />
                )
              }}
            />
          </div>
          <PageWare total={total} pageSizes={pageSizes} background={background} layout={layout} />
        </div>
      )
    }
  }
})
