<script lang="tsx">
import { searchProps, State } from './props'
import { cloneDeep } from 'lodash-es'
import { isArray } from '@/utils/is'
import { defineComponent, createVNode, renderList, createElementVNode, createTextVNode, renderSlot, Ref } from 'vue'
import type { SearchOptions, SearchOption } from '#/base'

export default defineComponent({
  props: searchProps,
  emits: ['handleSelect', 'handleExport', 'update:list-query'],
  setup(props, _ctx) {
    const emit = _ctx.emit,
          slots = _ctx.slots

    const itemVw = ref<HTMLElement>()
    const state = reactive<State>({
      query: {},
      options: [],
      showUp: false,
      overHeight: 0
    })

    const showArrowUp = computed(() => !state.showUp && props.showArrow)
    // const query = computed({ // 计算属性的数组属性值绑定el-date-picker组件修改失败，其他值都正常 原因？？？
    //   get: () => cloneDeep(props.listQuery),
    //   set: val => {
    //     console.log(val);
    //     emit('update:list-query', val)
    //   }
    // })
    onMounted(() => {
      const ele = unref(itemVw)!
      state.overHeight = ele.clientHeight + Number(getComputedStyle(ele).marginBottom.replace(/[a-zA-z]/g,''))
    })
    const dealOptions = (target: SearchOptions) => {
      if (isArray(target)) {
        target.map(m => dealOptions(m))
      } else {
        target.optionsList && target.optionsList.map(n => {
          n.optionKey = target.optionKey ? n[target.optionKey] : n.value
          n.optionLabel = target.optionLabel ? n[target.optionLabel] : n.label
        })
      }
      return target
    }
    watch(() => props.searchOptions, options => {
      state.options = cloneDeep(options).map(option => {
        return dealOptions(option)
      })
    }, {
      deep: true,
      immediate: true
    })
    watch(() => props.listQuery, query => {
      state.query = cloneDeep(query)
    }, {
      deep: true,
      immediate: true
    })

    const handleChange = () => {
      emit('update:list-query', state.query)
    }
    const onkeydown = (e: KeyboardEvent) => {
      e.code === 'Enter' && emit('handleSelect')
    }

    // 生成input
    const setInputWare = (item: SearchOption) => {
      const attributes: Recordable = {
        style: { width: `${item.width || props.width}px` },
        placeholder: item.placeholder ?? `请输入${item.label}`,
        suffixIcon: item.icon ? createVNode(<i-ep-search/>) : '',
        onInput: handleChange,
        onkeydown: onkeydown
      }
      return createVNode(<el-input v-model={state.query[item.prop]}/>, attributes)
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
        remoteMethod : (e: any) => item.remoteMethod && item.remoteMethod(e, item.selectType ?? null),
        onClear: () => item.clearMethod && item.clearMethod(null, item.selectType ?? null),
        onChange: (e: any) => { handleChange(); item.method && item.method(e) }
      }
      return createVNode(<el-select v-model={ state.query[item.prop] }/>, attributes, item.optionsList && item.optionsList.length ? {
        default: () => renderList(item.optionsList, (n: Recordable) => (
          createVNode(<el-option/>, {
            key: n.optionKey,
            label: n.optionLabel,
            value: n.optionKey
          })
        ))
      } : null)
    }

    // 生成date日期选择
    const setDateWare = (item: SearchOption) => {
      const attributes: Recordable = {
        style: { width: `${item.width || props.width}px` },
        type: 'daterange',
        valueFormat: 'YYYY-MM-DD',
        format: 'YYYY-MM-DD',
        startPlaceholder: '开始时间',
        endPlaceholder: '结束时间',
        disabledDate: item.disabledDate,
        onChange: (e: any) => { handleChange(); item.method && item.method(e) }
      }
      return createVNode(<el-date-picker v-model={ state.query[item.prop] }/>, attributes)
    }

    // 生成级联选择器
    const setCascaderWare = (item: SearchOption) => {
      const attributes: Recordable = {
        style: { width: `${item.width || props.width}px` },
        clearable: !!item.clearable,
        filterable: !!item.filterable,
        showAllLevels: !!item.showAllLevels || true,
        placeholder: item.placeholder ? item.placeholder : `请选择${item.label}`,
        onChange: (e: any) =>  { handleChange(); item.method && item.method(e) }
      }
      if (item.options) attributes.options = item.options
      if (item.props) attributes.props = item.props
      return createVNode(<el-cascader v-model={ state.query[item.prop] }/>, attributes)
    }

    // 生成btn按钮
    const setBtnWare = (showExport: boolean, showArrow: boolean, showUp: Ref<boolean>) => {
      return (
        createElementVNode('div', { class: 'arrow-vw flex justify-end' }, [
          createElementVNode('div', { class: 'btn-vw' }, [
            createVNode(<el-button/>, {
              class: 'btn-small btn-border-color',
              onClick: () => emit('handleSelect')
            }, { default: () => createTextVNode('筛选') })
          ]),
          showExport && createElementVNode('div', { class: 'btn-vw  !ml-3' }, [
            createVNode(<el-button/>, {
              class: 'btn-small btn-usual',
              onClick: () => emit('handleExport')
            },  { default: () => createTextVNode('导出') })
          ]),
          (slots.extraBtn && !unref(showArrowUp)) && createElementVNode('div', { class: 'extra-vw !ml-3' }, [
            renderSlot(slots, 'extraBtn')
          ]),
          showArrow && createElementVNode('div', {
            class: 'arrow-vw-right',
            onClick: () => { showUp.value = !showUp.value }
          }, [
            createTextVNode(showUp.value ? '收起' : '展开'),
            createVNode(showUp.value ? <i-ep-arrowUp /> : <i-ep-arrowDown/>)
          ])
        ])
      )
    }

    const setItem = (item: SearchOption) => {
      switch (item.type) {
        case 'input':
          return setInputWare(item)
        case 'select':
          return setSelectWare(item)
        case 'date':
          return setDateWare(item)
        case 'cascader':
          return setCascaderWare(item)
      }
    }
    const itemGenerator = (item: SearchOptions) => {
      if (isArray(item)) {
        return renderList(item, n => createElementVNode('span', {
          class: 'item-vw-v',
          key: n.prop
        }, [setItem(n)], 16))
      } else {
        switch (item.type) {
        case 'slot':
          return renderSlot(slots, item.prop)
        default:
          return setItem(item)
        }
      }
    }

    const setProp = (item: SearchOptions) => {
      return isArray(item) ? item[0].prop : item.prop
    }

    const setLabel = (item: SearchOptions) => {
      return `${isArray(item) ? item[0].label : item.label}：`
    }

    return () => {
      const { showExport, showArrow, labelWidth } = props
      const showUp = toRef(state, 'showUp')
      const arrowUp = unref(showArrowUp)
      return (
        createVNode(<el-row/>, {
          gutter: 24
        }, {
          default: () => [
            createVNode(<el-col/>, {
              span: arrowUp ? 20 : 24
            }, {
              default: () => [
                createElementVNode('div', {
                  class: 'search-vw',
                  style: arrowUp ? `height: ${state.overHeight}px;overflow: hidden` : ''
                }, renderList(state.options, item => (
                    createElementVNode('div', {
                      ref: itemVw,
                      class: 'item-vw',
                      key: setProp(item)
                    }, [
                      createElementVNode('label', {
                        class: 'leading-8 font-14px text-right',
                        style: {'minWidth': `${labelWidth}px`}
                      }, setLabel(item), 4),
                      itemGenerator(item)
                    ], 16)
                  )),
                4),
                (!showArrow || showUp.value) && setBtnWare(showExport, showArrow, showUp)
              ]
            }, 8, ['span']),
            arrowUp && createVNode(<el-col/>, {
              span: 4
            }, { default: () => setBtnWare(showExport, showArrow, showUp) })
          ]
        })
      )
    }
  }
})
</script>

<style lang="scss" scoped>
.item-vw-v{
  .el-select, .el-input{
    margin-right: 8px;
  }
}
</style>
