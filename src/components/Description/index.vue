<script lang="tsx">
import Cell from './cell'
import { props } from './props'
import { createElementVNode, createVNode, renderList } from 'vue'
import type { DescItem } from './typing'

export default defineComponent({
  props: props,

  setup(props, _ctx) {
    const { slots } = _ctx
    const schemaRef = ref<DescItem[][]>()
    const disposeSchema = (list: DescItem[]) => {
      const { column } = props
      const schema: DescItem[][] = []
      list.map(schemaItem => {
        const n = schema[schema.length - 1]
        if (!n || n.length === column || schemaItem.monopolize) {
          schema.push([schemaItem])
        } else {
          n.push(schemaItem)
        }
      })
      return schema
    }

    watch(
      () => props.schema,
      value => (schemaRef.value = disposeSchema(value)),
      {
        immediate: true,
        deep: true
      }
    )

    const renderTarget = () => {
      const schemaList = unref(schemaRef)!
      return renderList(schemaList, (item, index) =>
        createVNode(<Cell v-slots={slots} />, {
          ...props,
          cellData: item,
          index: index
        })
      )
    }

    return () =>
      createElementVNode(
        'div',
        {
          class: `description ${props.border ? 'description-border' : ''}`
        },
        [
          createElementVNode(
            'table',
            {
              class: 'w-full table-fixed text-sm'
            },
            [createElementVNode('tbody', null, renderTarget())]
          )
        ]
      )
  }
})
</script>

<style lang="scss">
.description-border {
  border: 1px solid rgba(0, 0, 0, 0.06);
  .description-row {
    border-bottom: 1px solid rgba(0, 0, 0, 0.06);
    &:last-child {
      border-bottom: none;
    }
  }
  .description-item-label {
    background-color: #f7f8fa;
  }
  .description-item-label,
  .description-item-content {
    padding: 12px 16px;
    border-right: 1px solid rgba(0, 0, 0, 0.06);
  }
}
</style>
