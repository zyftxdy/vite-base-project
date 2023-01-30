<script lang="tsx">
import { get } from 'lodash-es'
import { CSSProperties } from 'vue'
import { itemProps } from './props'
import type { CellConfig, DescItem } from './typing'

export default defineComponent({
  props: itemProps,
  setup(props, _ctx) {
    const { slots } = _ctx

    const renderLabel = ({ label, labelMinWidth, labelStyle }: DescItem) => {
      const { border } = props
      const labelStyles: CSSProperties = {
        ...labelStyle,
        minWidth: `${labelMinWidth}px`
      }
      return (
        <span class="text-gray-500" style={labelStyles}>
          {label}
          {border ? '' : '：'}
        </span>
      )
    }

    const renderContent = ({ render, field, contentMinWidth, contentStyle, slot }: DescItem) => {
      const { data } = props
      const getContent = () => {
        const getField = get(data, field)
        return slot ? slots[field]?.() : render ? render(getField, data) : getField ?? '--'
      }
      const contentStyles = {
        ...contentStyle,
        minWidth: `${contentMinWidth}px`
      }
      return (
        <span class="break-all flex-1" style={contentStyles}>
          {getContent()}
        </span>
      )
    }

    const renderCell = (cellItem: DescItem, i: number, { component, type }: CellConfig) => {
      const { border } = props
      const Component = component as any
      if (border) {
        return (
          <Component
            class={[
              type === 'label' ? 'description-item-label' : '',
              type === 'content' ? 'description-item-content' : ''
            ]}
            key={`${type}-${i}`}
            colspan={calcSpan(i, type!)}
          >
            {type === 'label' && renderLabel(cellItem)}
            {type === 'content' && renderContent(cellItem)}
          </Component>
        )
      }
      return (
        <Component colspan={calcSpan(i, type!)} key={`${type}-${i}`}>
          <div class="description-item-container">
            {(type === 'label' || !type) && renderLabel(cellItem)}
            {(type === 'content' || !type) && renderContent(cellItem)}
          </div>
        </Component>
      )
    }

    const renderRow = ({ component, type }: CellConfig) => {
      const { cellData } = props
      return cellData.map((cellItem, i) => {
        if (typeof component === 'string') {
          return renderCell(cellItem, i, { component, type })
        }
        return [
          renderCell(cellItem, i, { component: component[0], type: 'label' }),
          renderCell(cellItem, i, { component: component[1], type: 'content' })
        ]
      })
    }

    const calcSpan = (index: number, type: CellConfig['type']) => {
      const { column, cellData, direction, border } = props
      if (direction === 'horizontal' && border) {
        return index === cellData.length - 1 && type === 'content' ? (column - index) * 2 - 1 : 1
      }
      return index === cellData.length - 1 ? column - index : 1
    }

    return () => {
      const { direction, index, border } = props
      if (direction === 'vertical') {
        return (
          <>
            <tr class="description-row" key={`label-${index}`}>
              {renderRow({ component: 'th', type: 'label' })}
            </tr>
            <tr class="description-row" key={`content-${index}`}>
              {renderRow({ component: 'td', type: 'content' })}
            </tr>
          </>
        )
      }
      return (
        <tr class="description-row" key={index}>
          {renderRow({ component: border ? ['th', 'td'] : 'td' })}
        </tr>
      )
    }
  }
})
</script>
<style lang="scss" scoped>
.description-item-label {
  text-align: start;
}
</style>
