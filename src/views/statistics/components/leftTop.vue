<template>
  <div class="totalNewMoney">新增
    <count-to
      :value="totalMoney"
      :to-fixed="2"
      :styles="{
        fontSize: '28px',
        fontFamily: 'Gotham-Book, Gotha'
      }"/>元
  </div>
  <oper :active="active" type="dayMonthYear" @change="onChange"/>
  <div class="left_top">
    <div ref="elRef" style="width:100%; height: 250px"/>
  </div>
</template>

<script setup lang="ts">
import oper from './oper.vue'
import { useEcharts, useCommon, useRequest } from '@/hooks'
import { formatDate } from '@/utils/dateUtil'
import { toFixedNum } from '@/utils/mUtils'
import { lTOptions } from '../enum'
import { defaultProps } from '../props'
import type { DateType } from '#/base'
import type { Ref } from 'vue'

const props = defineProps(defaultProps)
const { reqApi } = useCommon()
const active = ref<DateType>('DAY')
const totalMoney = ref('0')
const onChange = (value: DateType) => {
  active.value  = value
}

const elRef = ref<HTMLDivElement>()
const { setOptions } = useEcharts(elRef as Ref<HTMLDivElement>)

const { run: getData } = useRequest(() => reqApi.statistics.statisSuper({
  intervalType: unref(active),
  deptIds: props.deptIds
}), {
  refreshDeps: [() => active.value, () => props.deptIds],
  onBefore: () => totalMoney.value = '0',
  onSuccess: res => {
    const format = unref(active) === 'DAY' ? 'MM-DD' : unref(active) === 'MONTH' ? 'MM' : 'YYYY'
    const xData: string[] = [], yData: string[] = []
    // @ts-ignore
    res.map(item => {
      xData.push(formatDate(new Date(item.date), format))
      yData.push(item.amount)
      totalMoney.value = toFixedNum(parseFloat(unref(totalMoney)) + parseFloat(item.amount))
    })
    const options = lTOptions(xData, yData)
    setOptions(options)
  }
})

onMounted(() => {
  getData()
})
</script>

<style lang="scss" scoped>
.left_top{
  padding: 10px;
}
.totalNewMoney{
  padding: 10px;
  text-align: center;
  font-size: 16px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #9FB5D9;
  span{
    padding: 0 5px;
  }
}
</style>
