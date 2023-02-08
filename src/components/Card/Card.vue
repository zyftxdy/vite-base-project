<script lang="tsx">
import { cardProps } from './props'
import { getPropsSlot } from '@/utils/props-util'
import type { TabPaneName } from 'element-plus'

export default defineComponent({
  props: cardProps,
  emits: ['tabChange', 'update:tab-key'],
  setup(props, { slots, emit }) {
    const activeKey = computed({
      get: () => props.tabKey,
      set: val => {
        emit('update:tab-key', val)
      }
    })

    return () => {
      const { loading, tabsList, bordered, hoverable, headStyle, bodyStyle } = props
      const classString = {
        card: true,
        'card-contain-tabs': tabsList && tabsList.length,
        'card-bordered': bordered,
        'card-hoverable': hoverable
      }
      const title = getPropsSlot(slots, props, 'title')
      const children = slots.default?.()
      const extra = slots.extra?.()
      const tabsExtra = slots.tabsExtra?.()

      const tabsDom =
        tabsList && tabsList.length ? (
          <el-tabs v-model={activeKey.value} onTabChange={(e: TabPaneName) => emit('tabChange', e)}>
            {tabsList.map(item => {
              const label = slots.customTab ? slots.customTab(item) : <span>{item.label}</span>
              return (
                <el-tab-pane
                  name={item.name}
                  v-slots={{
                    label: () => label
                  }}
                />
              )
            })}
          </el-tabs>
        ) : null
      const titleDom =
        title || tabsDom ? (
          <div class="card-head" style={headStyle}>
            {title && (
              <div class="card-head-wrapper">
                {title && <div class="card-head-title">{title}</div>}
                {extra && <div class="card-extra">{extra}</div>}
              </div>
            )}
            {tabsDom && (
              <div class="card-head-tab">
                {tabsDom}
                {tabsExtra}
              </div>
            )}
          </div>
        ) : null

      const block = <div class="card-loading-block" />
      const loadingBlock = (
        <div class="card-loading-content">
          <el-row gutter={8}>
            <el-col span={24}>{block}</el-col>
          </el-row>
          <el-row gutter={8}>
            <el-col span={8}>{block}</el-col>
            <el-col span={15}>{block}</el-col>
          </el-row>
          <el-row gutter={8}>
            <el-col span={6}>{block}</el-col>
            <el-col span={18}>{block}</el-col>
          </el-row>
          <el-row gutter={8}>
            <el-col span={15}>{block}</el-col>
            <el-col span={9}>{block}</el-col>
          </el-row>
          <el-row gutter={8}>
            <el-col span={4}>{block}</el-col>
            <el-col span={3}>{block}</el-col>
            <el-col span={16}>{block}</el-col>
          </el-row>
        </div>
      )
      const contentDom = (
        <div class="card-body" style={bodyStyle}>
          {loading ? loadingBlock : children}
        </div>
      )

      return (
        <div class={classString}>
          {titleDom}
          {children && children.length ? contentDom : null}
        </div>
      )
    }
  }
})
</script>
<style lang="scss" scoped src="./style/card.scss"/>
