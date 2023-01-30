<template>
  <div class="static_header margin-bottom30">
    <div class="static_h_in">
      <div v-for="(item, index) in list" :key="index" class="s_item">
        <div class="i_icon"><img :src="item.icon" /></div>
        <div class="i_data">
          <span>{{ item.num }}{{ item.unit }}</span>
          <span class="pt-1">{{ item.title }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCommon } from '@/hooks'
import { headData } from '../enum'
import { defaultProps } from '../props'
import { formatNum } from '@/utils/mUtils'

const props = defineProps(defaultProps)
const { reqApi, message } = useCommon()
const list = ref<Recordable[]>(headData)

const getTotal = async () => {
  try {
    const res = await reqApi.statistics.statisHead({ deptIds: props.deptIds })
    list.value.map(item => (item.num = formatNum(res.data[item.prop])))
  } catch (err: any) {
    message.error(err)
  }
}

watch(
  () => props.deptIds,
  () => getTotal(),
  { immediate: true }
)
</script>

<style lang="scss" scoped src="@/styles/statistics/staticHeader.scss" />
