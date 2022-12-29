<template>
  <component :is="version === 'V1' ? Table : TableV2">
    <template v-for="slotName in slotKeys" :key="slotName" #[slotName]="{ row }">
      <slot :name="slotName" :row="row"/>
    </template>
  </component>
</template>

<script setup lang="ts">
import Table from './table/index.vue'
import TableV2 from './table-v2/index.vue'

const props = defineProps({
  version: {
    type: String as PropType<'V1' | 'V2'>,
    default: 'V1'
  }
})
const slotKeys = Object.keys(useSlots())
</script>

<!-- jsx - resolveComponent写法 -- 报错，以后再尝试
<script lang="tsx">
import Table from './table/index.vue'
import TableV2 from './table-v2/index.vue'
import { createElementVNode, createVNode } from 'vue'

export default defineComponent({
  props: {
    comName: {
      type: String as PropType<'V1' | 'V2'>,
      default: 'V1'
    }
  },
  setup(props) {
    console.log(resolveComponent('input'));

    return () => {
      return createVNode(resolveComponent('Table'))
    }
  }
})
</script>
-->
