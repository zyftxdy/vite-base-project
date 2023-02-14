<script lang="tsx">
import { searchProps, pageProps } from './props'
import { useValues } from './hooks/useValues'
import {
  defineComponent,
  createVNode,
  renderList,
  createElementVNode,
  createTextVNode,
  renderSlot,
  Ref
} from 'vue'
import type { SearchOptions, SearchOption } from '#/base'

export default defineComponent({
  props: searchProps,
  emits: ['select', 'export', 'register'],
  setup(props, { emit, slots }) {
    const itemVw = ref<HTMLElement>()
    const overHeight = ref(0)
    const showUp = ref(false)
    const searchForm = reactive<Recordable>(pageProps)
    const schemaRef = ref<SearchOptions[]>([])

    const showArrowUp = computed(() => !showUp.value && props.showArrow)
    const { updateSchema, getFieldsValue } = useValues({
      searchForm,
      schemaRef,
      getProps: props
    })

    onMounted(() => {
      const ele = unref(itemVw)!
      overHeight.value =
        ele.clientHeight + Number(getComputedStyle(ele).marginBottom.replace(/[a-zA-z]/g, ''))
      emit('register', {
        updateSchema,
        getFieldsValue
      })
    })

    const handleChange = () => {}
    const onkeydown = (e: KeyboardEvent) => {
      e.code === 'Enter' && onSelect()
    }
    const onSelect = () => {
      emit('select', searchForm)
    }
    const onExport = () => {
      emit('export', searchForm)
    }

    // 生成input
    const setInputWare = (item: SearchOption) => {
      const attributes: Recordable = {
        style: { width: `${item.width || props.width}px` },
        placeholder: item.placeholder ?? `请输入${item.label}`,
        suffixIcon: item.icon ? createVNode(<i-ep-search />) : '',
        onInput: handleChange,
        onkeydown: onkeydown
      }
      return createVNode(<el-input v-model={searchForm[item.field]} />, attributes)
    }

    // 生成select
    const setSelectWare = (item: SearchOption) => {
      const attributes: Recordable = {
        style: { width: `${item.width || props.width}px` },
        filterable: !!item.filterable,
        remote: !!item.remote,
        clearable: !!item.clearable,
        multiple: !!item.multiple,
        placeholder: item.placeholder ?? `请选择${item.label}`,
        remoteMethod: (e: any) =>
          item.remoteMethod && item.remoteMethod(e, item.selectType ?? null),
        onClear: () => item.clearMethod && item.clearMethod(null, item.selectType ?? null),
        onChange: (e: any) => {
          handleChange()
          item.method && item.method(e)
        }
      }
      return createVNode(
        <el-select v-model={searchForm[item.field]} />,
        attributes,
        item.optionsList && item.optionsList.length
          ? {
              default: () =>
                renderList(item.optionsList, (n: Recordable) =>
                  createVNode(<el-option />, {
                    key: n.optionKey,
                    label: n.optionLabel,
                    value: n.optionKey
                  })
                )
            }
          : null
      )
    }

    // 生成date日期选择
    const setDateWare = (item: SearchOption) => {
      const attributes: Recordable = {
        style: { width: `${item.width || props.width}px` },
        type: item.dateType || 'date',
        valueFormat: item.valueFormat || 'YYYY-MM-DD',
        format: item.format || 'YYYY-MM-DD',
        placeholder: item.placeholder || item.label || '选择时间',
        startPlaceholder: item.startPlaceholder || '开始时间',
        endPlaceholder: item.endPlaceholder || '结束时间',
        disabledDate: item.disabledDate,
        onChange: (e: any) => {
          handleChange()
          item.method && item.method(e)
        }
      }
      return createVNode(<el-date-picker v-model={searchForm[item.field]} />, attributes)
    }

    // 生成级联选择器
    const setCascaderWare = (item: SearchOption) => {
      const attributes: Recordable = {
        style: { width: `${item.width || props.width}px` },
        clearable: !!item.clearable,
        filterable: !!item.filterable,
        showAllLevels: !!item.showAllLevels || true,
        placeholder: item.placeholder ? item.placeholder : `请选择${item.label}`,
        onChange: (e: any) => {
          handleChange()
          item.method && item.method(e)
        }
      }
      if (item.options) {
        attributes.options = item.options
      }
      if (item.props) {
        attributes.props = item.props
      }
      return createVNode(<el-cascader v-model={searchForm[item.field]} />, attributes)
    }

    // 生成btn按钮
    const setBtnWare = (showExport: boolean, showArrow: boolean, showUp: Ref<boolean>) => {
      return createElementVNode('div', { class: 'arrow-vw flex justify-end' }, [
        createElementVNode('div', { class: 'btn-vw' }, [
          createVNode(
            <el-button />,
            {
              class: 'btn-small btn-border-color',
              onClick: () => onSelect()
            },
            { default: () => createTextVNode('筛选') }
          )
        ]),
        showExport &&
          createElementVNode('div', { class: 'btn-vw  !ml-3' }, [
            createVNode(
              <el-button />,
              {
                class: 'btn-small btn-usual',
                onClick: () => onExport()
              },
              { default: () => createTextVNode('导出') }
            )
          ]),
        slots.extraBtn &&
          !unref(showArrowUp) &&
          createElementVNode('div', { class: 'extra-vw !ml-3' }, [renderSlot(slots, 'extraBtn')]),
        showArrow &&
          createElementVNode(
            'div',
            {
              class: 'arrow-vw-right',
              onClick: () => {
                showUp.value = !showUp.value
              }
            },
            [
              createTextVNode(showUp.value ? '收起' : '展开'),
              createVNode(showUp.value ? <i-ep-arrowUp /> : <i-ep-arrowDown />)
            ]
          )
      ])
    }

    const setItem = (item: SearchOption) => {
      switch (item.component) {
        case 'INPUT':
          return setInputWare(item)
        case 'SELECT':
          return setSelectWare(item)
        case 'DATE':
          return setDateWare(item)
        case 'CASCADER':
          return setCascaderWare(item)
        case 'SLOT':
          return renderSlot(slots, item.field, {
            model: searchForm,
            field: item.field
          })
      }
    }
    const itemGenerator = (item: SearchOptions) => {
      if (item.component === 'GROUP') {
        return renderList(item.subOptions, (n, i) => [
          createElementVNode(
            'span',
            {
              class: `item-vw-v ${!item.infix ? 'item-vw-v-noInfix' : ''}`,
              key: n.field
            },
            [setItem(n)],
            16
          ),
          i < item.subOptions.length - 1 &&
            createElementVNode('span', { class: 'item-vw-v-infix' }, item.infix, 1)
        ])
      }
      return setItem(item)
    }

    return () => {
      const { showExport, showArrow, labelWidth } = props
      const arrowUp = unref(showArrowUp)
      return createVNode(
        <el-row />,
        {
          gutter: 24
        },
        {
          default: () => [
            createVNode(
              <el-col />,
              {
                span: arrowUp ? 20 : 24
              },
              {
                default: () => [
                  createElementVNode(
                    'div',
                    {
                      class: 'search-vw',
                      style: arrowUp ? `height: ${overHeight.value}px;overflow: hidden` : ''
                    },
                    renderList(schemaRef.value, item =>
                      createElementVNode(
                        'div',
                        {
                          ref: itemVw,
                          class: 'item-vw',
                          key: item.field
                        },
                        [
                          createElementVNode(
                            'label',
                            {
                              class: 'leading-8 font-14px text-right',
                              style: { minWidth: `${labelWidth}px` }
                            },
                            `${item.label}：`,
                            4
                          ),
                          itemGenerator(item)
                        ],
                        16
                      )
                    ),
                    4
                  ),
                  (!showArrow || showUp.value) && setBtnWare(showExport, showArrow, showUp)
                ]
              },
              8,
              ['span']
            ),
            arrowUp &&
              createVNode(
                <el-col />,
                {
                  span: 4
                },
                { default: () => setBtnWare(showExport, showArrow, showUp) }
              )
          ]
        }
      )
    }
  }
})
</script>

<style lang="scss" scoped>
.item-vw-v.item-vw-v-noInfix {
  .el-select,
  .el-date-picker,
  .el-input {
    margin-right: 8px;
  }
}
.item-vw-v-infix{
  padding: 0 8px;
  line-height: 32px;
  font-size: 18px;
}
</style>
