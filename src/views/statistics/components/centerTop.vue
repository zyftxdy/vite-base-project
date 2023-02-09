<script lang="tsx">
import { useEcharts, useCommon, useRequest } from '@/hooks'
import echarts from '@/utils/echarts'
import { cTOptions } from '../enum'
import type { Ref } from 'vue'

export default defineComponent({
  setup(_, _ref) {
    let chartRef: echarts.ECharts
    const { reqApi } = useCommon()
    const show = ref(false)
    const code = ref('')
    const list = ref<Recordable[]>([])
    const elRef = ref<HTMLDivElement>()
    const { getInstance, setOptions } = useEcharts(elRef as Ref<HTMLDivElement>)

    const { result, run: getData } = useRequest<Recordable[]>(
      () => reqApi.statistics.statisDist({ code: unref(code) }),
      {
        defaultValue: [],
        formatResult: res => res.schoolList,
        onSuccess: res => {
          // @ts-ignore
          res.areaList.map(item => {
            item.name = item.fullName
            item.value = item.code
          })
          setEcharts(res.codeName, res.geoData, res.areaList)
        }
      }
    )
    const setEcharts = (mapName: string, json: any, data: any[]) => {
      const options = cTOptions(mapName, data)
      echarts.registerMap(mapName, json)
      setOptions(options, true)
      chartRef.on('click', chartClick)
      show.value = !!code.value
    }
    const chartClick = (param: any) => {
      if (param && !Number.isNaN(param.value)) {
        code.value = param.value
        getData()
      }
    }
    const onClick = () => {
      code.value = ''
      getData()
    }

    onMounted(() => {
      chartRef = getInstance()
      getData()
    })
    onBeforeUnmount(() => {
      chartRef.off('click')
    })

    return () => {
      return (
        <div class="center-top">
          <el-table
            data={result.value}
            height="392px"
            class="area_list left"
            v-slots={{
              empty: () => <el-empty description="暂无数据" />
            }}
          >
            <el-table-column label="排名" prop="rank" align="center" />
            <el-table-column label="地区" prop="cityName" align="center" />
            <el-table-column label="机构数量" prop="schoolCount" align="center" />
            <el-table-column label="学生总数" prop="memberCount" align="center" />
          </el-table>
          <div class="right">
            <div class="oper_info">
              {show.value && (
                <span class="oper">
                  <el-button class="btn" link size="small" onClick={onClick}>
                    返回上一级
                  </el-button>
                </span>
              )}
            </div>
            <div ref={(e: any) => (elRef.value = e)} style={{ width: '100%', height: '360px' }} />
          </div>
        </div>
      )
    }
  }
})
</script>

<style lang="scss" scoped src="@/styles/statistics/centerTop.scss" />
