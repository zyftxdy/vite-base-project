<script lang="tsx">
import type { DateType } from '#/base'

interface NormalList {
  name: string
  value: DateType
}
interface State {
  typeList: NormalList[]
  normalList: NormalList[]
}

export default defineComponent({
  props: {
    active: {
      type: String as PropType<DateType>,
      default: ''
    },
    type: {
      type: String,
      default: ''
    }
  },
  emits: ['change'],
  setup(props, _ref) {
    const emit = _ref.emit

    const state = reactive<State>({
      typeList: [],
      normalList: [
        {
          name: '按天',
          value: 'DAY'
        },
        {
          name: '按月',
          value: 'MONTH'
        }
      ]
    })

    const setList = (type: string) => {
      switch (type) {
        case 'dayMonth':
          state.typeList = state.normalList
          break
        case 'dayMonthYear':
          state.typeList = state.normalList.concat({ name: '按年', value: 'YEAR' })
          break
        case 'dayMonthYearM':
          state.typeList = [
            {
              name: '昨日',
              value: 'YESTERDAY'
            },
            {
              name: '本月',
              value: 'MONTH'
            },
            {
              name: '本年',
              value: 'YEAR'
            }
          ]
          break
      }
    }
    watch(
      () => props.type,
      val => setList(val),
      {
        immediate: true
      }
    )

    const handleClick = (val: DateType) => {
      emit('change', val)
    }

    return () => (
      <div class="oper">
        {state.typeList.length &&
          state.typeList.map(item => (
            <span
              key={item.value}
              onClick={() => handleClick(item.value)}
              class={props.active === item.value ? 'activeSpan' : ''}
            >
              {item.name}
            </span>
          ))}
      </div>
    )
  }
})
</script>

<style lang="scss" scoped>
.oper {
  text-align: right;
  padding: 10px 10px 5px 10px;
  color: #6e88a0;
  font-size: 12px;
  margin: 10px 0;
  span {
    cursor: pointer;
    padding: 6px 13px;
    background: #2b5c813b;
    box-shadow: 0px 2px 6px 0px #091824;
    border: 1px solid rgba(255, 255, 255, 0.1);
    margin-left: 10px;
    &.activeSpan {
      color: #b4dbff;
      background: #4a87c9;
    }
  }
}
</style>
