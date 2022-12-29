<script lang="tsx">
import { defineComponent, ref } from 'vue'
import { useCommon, useEcharts, useRequest } from '@/hooks'
import { cBOptions, annualData, riskData } from '../enum'
import { defaultProps } from '../props'
import echarts from '@/utils/echarts'
import { legendselectchanged } from '@/utils/mUtils'
import type { Ref, CSSProperties } from 'vue'

const styles: CSSProperties = {
  fontSize: '36px',
  fontFamily: 'UnidreamLED'
}

export default defineComponent({
  props: defaultProps,
  setup(props, _ref) {
    let chartL: echarts.ECharts, chartR: echarts.ECharts
    const { reqApi } = useCommon()

    const elRefL = ref<HTMLDivElement>()
    const elRefR = ref<HTMLDivElement>()
    const { setOptions: setOptionL, getInstance: getInstanceL } = useEcharts(elRefL as Ref<HTMLDivElement>)
    const { setOptions: setOptionR, getInstance: getInstanceR } = useEcharts(elRefR as Ref<HTMLDivElement>)

    const { result, run: getData } = useRequest<Recordable>(() => reqApi.statistics.statisCredit({ deptIds: props.deptIds}), {
      defaultValue: {
        white: 0,
        grey: 0,
        black: 0
      },
      refreshDeps: [() => props.deptIds],
      onSuccess: () => {
        setOptionL(cBOptions(0, annualData))
        setOptionR(cBOptions(0, riskData))
        chartL.on('legendselectchanged', (e: any) => legendselectchanged(chartL, e))
        chartR.on('legendselectchanged', (e: any) => legendselectchanged(chartR, e))
      }
    })

    onMounted(() => {
      chartL = getInstanceL()
      chartR = getInstanceR()
      getData()
    })
    onBeforeUnmount(() => {
      chartL.off('legendselectchanged')
      chartR.off('legendselectchanged')
    })

    return () => {
      return (
        <div class="center_bottom">
          <div class="c_t">
            <div class="c_title">机构年检统计</div>
            <div ref={ (e: any) => elRefL.value = e } style={{ width: '100%', height: '200px' }}/>
          </div>
          <div class="c_t">
            <div class="c_title">机构风险评估</div>
            <div ref={ (e: any) => elRefR.value = e } style={{ width: '100%', height: '200px' }}/>
          </div>
          <div class="c_t">
            <div class="c_title">黑白灰机构名单</div>
            <div class="c_content">
              <div class="c_c_c">
                <count-to
                  value={unref(result).white}
                  styles={styles}/>
                <span class="c_t">白名单</span>
              </div>
              <div class="c_c_c">
                <count-to
                  value={unref(result).grey}
                  styles={styles}/>
                <span class="c_t">灰名单</span>
              </div>
              <div class="c_c_c">
                <count-to
                  value={unref(result).black}
                  styles={styles}/>
                <span class="c_t">黑名单</span>
              </div>
            </div>
          </div>
        </div>
      )
    }
  }
})
</script>

<style lang="scss" scoped src="@/styles/statistics/centerBottom.scss"/>
