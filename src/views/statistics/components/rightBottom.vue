<script lang="tsx">
import { useCommon, useEcharts, useRequest } from '@/hooks'
import { rBOptions } from '../enum'
import { defaultProps } from '../props'
import echarts from '@/utils/echarts'
import { legendselectchanged } from '@/utils/mUtils'
import type { Ref } from 'vue'

export default defineComponent({
  props: defaultProps,
  setup(props, _ref) {
    const { reqApi } = useCommon()
    const elRef = ref<HTMLDivElement>()
    const { setOptions, getInstance } = useEcharts(elRef as Ref<HTMLDivElement>)
    let chart: echarts.ECharts

    const { run: getData } = useRequest(
      () => reqApi.statistics.statisCourse({ deptIds: props.deptIds }),
      {
        refreshDeps: [() => props.deptIds],
        onSuccess: res => {
          // @ts-ignore
          res.map(item => (item.value = item.count))
          setOptions(rBOptions(res))
          chart.on('legendselectchanged', (e: any) => legendselectchanged(chart, e))
        }
      }
    )

    onMounted(() => {
      chart = getInstance()
      getData()
    })
    onBeforeUnmount(() => {
      chart.off('legendselectchanged')
    })

    return () => (
      <div class="right_bottom">
        <div ref={(e: any) => (elRef.value = e)} style={{ width: '100%', height: '160px' }} />
      </div>
    )
  }
})
</script>

<style lang="scss" scoped>
.right_bottom {
  padding: 10px;
}
</style>
