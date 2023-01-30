<template>
  <div class="flex items-center mb-3">
    <page-title :title="title" :desc="desc" class="flex-1 !m-0" />
    <div class="w-52">
      <el-date-picker
        v-model="dates"
        type="daterange"
        format="YYYY-MM-DD"
        value-format="YYYY-MM-DD"
        start-placeholder="开始时间"
        end-placeholder="结束时间"
        :disabled-date="(time: Date) => time.getTime() > Date.now() - 8.64e7"
        class="!w-full"
        @change="handleChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCommon } from '@/hooks'
import { computeDiffDay } from '@/utils/mUtils'
import type { SingleOrRange } from 'element-plus'

const { message } = useCommon()
const props = defineProps({
  title: String,
  desc: String
})
const emit = defineEmits(['dateChange'])

const dates = ref<SingleOrRange<string>>(['', ''])
let preValue = unref(dates)

const handleChange = (e: any) => {
  if (e && computeDiffDay(e[0], e[1]) > 31) {
    message.warning('最多可查看31天的数据')
    dates.value = preValue
    return false
  }
  preValue = e
  emit('dateChange', e)
}
</script>
