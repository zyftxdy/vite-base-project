<script lang="tsx">
import oper from './oper.vue'
import { useEcharts, useCommon, useRequest } from '@/hooks'
import { rCOptions, complainData } from '../enum'
import { defaultProps } from '../props'
import { formatDate } from '@/utils/dateUtil'
import type { CSSProperties, Ref } from 'vue'
import type { DateType } from '#/base'

const styles: CSSProperties = {
  fontFamily: 'UnidreamLED',
  fontSize: '22px',
  paddingLeft: '5px'
}

export default defineComponent({
  props: defaultProps,
  components: { oper },
  setup(props, _ref) {
    const { reqApi } = useCommon()
    const active = ref<DateType>('DAY')
    const onChange = (value: DateType) => {
      active.value  = value
    }

    const elRef = ref<HTMLDivElement>()
    const { setOptions } = useEcharts(elRef as Ref<HTMLDivElement>)

    const { result, run: getData } = useRequest<Recordable[]>(() => reqApi.statistics.statisComplain({
      intervalType: unref(active),
      deptIds: props.deptIds
    }), {
      defaultValue: complainData,
      refreshDeps: [() => active.value, () => props.deptIds],
      formatResult: res =>
        unref(result).map(item => {
          item.num = res.sum[item.prop] ?? 0
          return item
        }),
      onSuccess: res => {
        const format = unref(active) === 'DAY' ? 'MM-DD' : 'MM'
        const xData: string[] = [], data: string[] = [], newData: string[] = []
        // @ts-ignore
        res.list.map(item => {
          xData.push(formatDate(new Date(item.date), format))
          data.push(item.complaintComplete)
          newData.push(item.newComplaint)
        })
        setOptions(rCOptions(xData, data, newData))
      }
    })

    onMounted(() => {
      getData()
    })

    return () => (
      <>
        <div class="c_info flex">
          {
            result.value.map((item, index) => (
              <div class="info_item" key={index}>
                <span class="desc">{ item.title }</span>
                <count-to value={item.num} styles={styles}/>
              </div>
            ))
          }
        </div>
        <oper active={active.value} type="dayMonth" onChange={ (e: DateType) => onChange(e) }/>
        <div class="right_center">
          <div ref={(e: any) => elRef.value = e} style={{ width: '100%', height: '220px' }}/>
        </div>
      </>
    )
  }
})
</script>

<style lang="scss" scoped>
.right_center{
  padding: 0 10px 5px;
}
.c_info{
  padding: 10px 10px 0 10px;
  .info_item{
    flex: 1;
    text-align: center;
    color: #9FB5D9;
    .num{
      font-family: UnidreamLED;
      font-size: 22px;
    }
    .desc{
      font-size: 12px;
    }
  }
}
</style>
