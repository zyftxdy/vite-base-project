<template>
  <oper :active="active" type="dayMonthYearM" @change="onChange"/>
  <div class="left_bottom">
    <div class="l_b_t margin-bottom30">
      <div class="t">解冻总额（元）</div>
      <count-to
        :value="result.unfreezeAmountTotal"
        :to-fixed="2"
        :styles="styles"/>
    </div>
    <div class="l_b_i">
      <div class="l_b_c">
        <div class="t">解冻总课时数</div>
        <count-to
          :value="result.unfreezeClassHourTotal || 0"
          :styles="styles"/>
      </div>
      <div class="l_b_c">
        <div class="t">解冻失败金额（元）</div>
        <count-to
          :value="result.unfreezeFail"
          :to-fixed="2"
          :styles="styles"/>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import oper from './oper.vue'
import { useCommon, useRequest } from '@/hooks'
import { defaultProps } from '../props'
import type { DateType } from '#/base'
import type { CSSProperties } from 'vue'

const styles: CSSProperties = {
  fontSize: '28px',
  fontFamily: 'UnidreamLED',
  display: 'block'
}

const props = defineProps(defaultProps)
const { reqApi } = useCommon()
const active = ref<DateType>('YESTERDAY')
const onChange = (value: DateType) => {
  active.value  = value
}

const { result } = useRequest<Recordable>(() => reqApi.statistics.statisFree({
  intervalType: unref(active),
  deptIds: props.deptIds
}), {
  defaultValue: {
    unfreezeAmountTotal: 0,
    unfreezeClassHourTotal: 0,
    unfreezeFail: 0
  },
  immediate: true,
  refreshDeps: [() => active.value, () => props.deptIds]
})
</script>

<style lang="scss" scoped src="@/styles/statistics/leftBottom.scss"/>
