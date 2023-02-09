import icon1 from '@/assets/statisitic/icon1.png'
import icon2 from '@/assets/statisitic/icon2.png'
import icon3 from '@/assets/statisitic/icon3.png'
import icon4 from '@/assets/statisitic/icon4.png'
import icon5 from '@/assets/statisitic/icon5.png'
import type { EchartTrigger } from '#/base'
import type { ECOption } from '@/utils/echarts'

const tipFn = (trigger: EchartTrigger) => ({
  trigger: trigger,
  backgroundColor: 'rgba(21, 111, 184, .5)',
  borderWidth: 0,
  textStyle: {
    color: '#F2F2F2'
  }
})

export const headData: Recordable[] = [
  {
    icon: icon1,
    num: 0,
    unit: '家',
    title: '机构总数量',
    prop: 'schoolCount'
  },
  {
    icon: icon2,
    num: 0,
    unit: '元',
    title: '监管资金总额',
    prop: 'superviseAmountTotal'
  },
  {
    icon: icon2,
    num: 0,
    unit: '元',
    title: '监管资金余额',
    prop: 'surplusSupAmount'
  },
  {
    icon: icon3,
    num: 0,
    unit: '人',
    title: '学生总数',
    prop: 'schoolMemberCount'
  },
  {
    icon: icon4,
    num: 0,
    unit: '单',
    title: '监管订单总数',
    prop: 'orderCount'
  },
  {
    icon: icon5,
    num: 0,
    unit: '元',
    title: '保证金总额',
    prop: 'earnestMoneyTotal'
  }
]

export const complainData: Recordable[] = [
  {
    num: 0,
    title: '投诉总数',
    prop: 'total'
  },
  {
    num: 0,
    title: '待处理',
    prop: 'complete'
  },
  {
    num: 0,
    title: '已处理',
    prop: 'processing'
  }
]

export const annualData: Recordable[] = [
  { value: 0, name: '即将过期' },
  { value: 0, name: '已过期' },
  { value: 0, name: '已通过' }
]

export const riskData: Recordable[] = [
  { value: 0, name: '即将过期' },
  { value: 0, name: '已过期' },
  { value: 0, name: '已通过' }
]

export const lTOptions = (xData: any[], data: any[]): ECOption => ({
  tooltip: tipFn('axis'),
  color: ['#43A1E8', '#FF4640'],
  xAxis: {
    type: 'category',
    boundaryGap: true,
    axisLabel: {
      color: '#6E88A0'
    },
    axisTick: {
      show: false
    },
    axisLine: {
      show: false
    },
    data: xData
  },
  yAxis: {
    type: 'value',
    alignTicks: true,
    axisLabel: {
      color: '#6E88A0'
    },
    splitLine: {
      lineStyle: {
        type: 'dashed',
        color: '#6E88A0'
      }
    },
    minInterval: 1,
    axisTick: {
      show: false
    },
    axisLine: {
      show: false
    }
  },
  grid: {
    top: 20,
    left: 10,
    right: 10,
    bottom: 10,
    containLabel: true
  },
  series: [
    {
      type: 'bar',
      barWidth: 16,
      label: {
        show: true,
        position: 'top',
        color: '#43A1E8'
      },
      itemStyle: {
        borderRadius: 10
      },
      data: data
    },
    {
      type: 'line',
      showSymbol: false,
      yAxisIndex: 0,
      smooth: true,
      lineStyle: {
        shadowColor: '#F86C69',
        shadowBlur: 10
      },
      data: data
    }
  ]
})

export const cTOptions = (name: string, data: Recordable[]): ECOption => ({
  tooltip: {
    show: true,
    backgroundColor: '#fff',
    textStyle: {
      color: '#333',
      fontSize: '12',
      fontFamily: 'Microsoft YaHei'
    },
    padding: [8, 16, 8, 16],
    extraCssText: 'box-shadow: 0 0 8px 2px rgba(0, 0, 0, 0.1);',
    formatter: function (params: Recordable) {
      return params.name
    }
  },
  series: {
    type: 'map',
    map: name,
    aspectScale: 0.95,
    label: {
      show: true,
      fontSize: 12,
      color: '#fff',
      textShadowColor: 'rgba(0,0,0, 0.8)',
      textShadowBlur: 10
    },
    itemStyle: {
      borderColor: '#fff',
      borderWidth: 1,
      areaColor: '#4A87C9'
      // shadowBlur: 8,
      // shadowOffsetY: 2,
      // shadowColor: 'rgba(0,0,0,.3)',
    },
    emphasis: {
      label: {
        show: false,
        color: '#fff'
      },
      itemStyle: {
        borderColor: '#fff',
        borderWidth: 2,
        areaColor: '#F76A65',
        shadowBlur: 8,
        shadowOffsetY: 2,
        shadowColor: 'rgba(0,0,0,.3)'
      }
    },
    select: {
      label: {
        show: false,
        color: '#fff'
      },
      itemStyle: {
        borderColor: '#fff',
        borderWidth: 2,
        areaColor: '#F76A65',
        shadowBlur: 8,
        shadowOffsetY: 2,
        shadowColor: 'rgba(0,0,0,.3)'
      }
    },
    data: data
  }
})

export const cBOptions = (num: number | string, data: any[]): ECOption => ({
  title: {
    text: `${num}\n\n总计`,
    top: 60,
    left: 'center',
    textStyle: {
      fontSize: 14,
      color: '#ffffff'
    }
  },
  tooltip: tipFn('item'),
  legend: {
    orient: 'horizontal',
    bottom: '5',
    textStyle: {
      color: '#f1f1f1'
    }
  },
  color: ['#9673F1', '#137BB0', '#FFB415'],
  series: [
    {
      type: 'pie',
      radius: [40, 60],
      top: -30,
      label: {
        show: false
      },
      data: data
    }
  ]
})

export const rCOptions = (xData: string[], data: string[], newData: string[]): ECOption => ({
  tooltip: tipFn('axis'),
  color: ['#FF4640', '#43A1E8'],
  legend: {
    show: true,
    left: '3%',
    textStyle: {
      color: '#f1f1f1'
    }
  },
  grid: {
    top: 40,
    left: 10,
    right: 10,
    bottom: 10,
    containLabel: true
  },
  xAxis: {
    type: 'category',
    boundaryGap: true,
    axisLabel: {
      color: '#6E88A0'
    },
    axisTick: {
      show: false
    },
    axisLine: {
      show: false
    },
    data: xData
  },
  yAxis: {
    type: 'value',
    alignTicks: true,
    axisLabel: {
      color: '#6E88A0'
    },
    splitLine: {
      lineStyle: {
        type: 'dashed',
        color: '#6E88A0'
      }
    },
    minInterval: 1,
    axisTick: {
      show: false
    },
    axisLine: {
      show: false
    }
  },
  series: [
    {
      name: '新增投诉',
      type: 'line',
      showSymbol: false,
      smooth: true,
      lineStyle: {
        shadowColor: '#F86C69',
        shadowBlur: 10
      },
      data: newData
    },
    {
      name: '已处理投诉',
      type: 'line',
      showSymbol: false,
      smooth: true,
      lineStyle: {
        shadowColor: '#3EAFFE',
        shadowBlur: 10
      },
      data: data
    }
  ]
})

export const rBOptions = (data: any[]): ECOption => ({
  tooltip: {
    trigger: 'item',
    formatter: '{b} : {c} ({d}%)',
    backgroundColor: 'rgba(21, 111, 184, .5)',
    borderWidth: 0,
    textStyle: {
      color: '#F2F2F2'
    }
  },
  legend: {
    top: 5,
    right: 50,
    orient: 'vertical',
    textStyle: {
      color: '#9FB5D9'
    }
  },
  color: ['#FF8480', '#9673F1', '#137BB0', '#FFB415', '#19A5D2', '#5198FF'],
  series: [
    {
      type: 'pie',
      radius: [10, 70],
      center: ['30%', '50%'],
      roseType: 'area',
      data: data.sort(function (a, b) {
        return b.value - a.value
      }),
      label: {
        show: false
      }
    }
  ]
})
