import * as echarts from 'echarts/core'
import {
  LineChart,
  LineSeriesOption,
  MapChart,
  MapSeriesOption,
  BarChart,
  BarSeriesOption,
  PieChart,
  PieSeriesOption
} from 'echarts/charts'
import {
  TooltipComponent,
  TooltipComponentOption,
  TitleComponent,
  TitleComponentOption,
  LegendComponent,
  LegendComponentOption,
  GridComponent,
  GridComponentOption,
  TransformComponent
} from 'echarts/components'
import {
  LabelLayout,
  UniversalTransition
} from 'echarts/features'
import { CanvasRenderer } from 'echarts/renderers'

export type ECOption = echarts.ComposeOption<
  | BarSeriesOption
  | LineSeriesOption
  | MapSeriesOption
  | PieSeriesOption
  | TitleComponentOption
  | TooltipComponentOption
  | GridComponentOption
  | LegendComponentOption
>

echarts.use([
  LineChart,
  MapChart,
  BarChart,
  PieChart,
  TooltipComponent,
  TitleComponent,
  LegendComponent,
  GridComponent,
  TransformComponent,
  LabelLayout,
  UniversalTransition,
  CanvasRenderer
])

export default echarts
