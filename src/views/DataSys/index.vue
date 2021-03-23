<template>
  <div class="data-sys">
    <div class="left">
      <echarts-box
        :options='options'
        id='data-echarts'
      ></echarts-box>
    </div>
    <div class="left">
      <echarts-box
        :options='options'
        id='data1-echarts'
      ></echarts-box>
    </div>
    <div class="left">
      <echarts-box
        :options='options1'
        id='data2-echarts'
      ></echarts-box>
    </div>
    <div class="left">
      <echarts-box
        :options='options1'
        id='data3-echarts'
      ></echarts-box>
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts'
const data = [220, 182, 191, 234, 290, 330, 310]


const option = {

  title: {
    text: '车辆区域分布',
    left: 'center',
    top: '5%'
  },
  tooltip: {
    trigger: 'axis',
    formatter: "{b} : {c}辆",
    axisPointer: { // 坐标轴指示器，坐标轴触发有效
      type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
    }
  },
  xAxis: {
    data: ['苏州', '上海', '北京', '深圳', '郑州', '杭州', '张家港'],
    //坐标轴
    axisLine: {
      lineStyle: {
        color: '#ccc'
      }
    },
    //坐标值标注
    axisLabel: {
      show: true,
      textStyle: {
        color: '#333',
      }
    }
  },
  yAxis: {
    show: true,
    //坐标值标注
    axisLabel: {
      show: true,
      textStyle: {
        color: '#333',
      }
    },
    //分格线
    splitLine: {
      lineStyle: {
        color: '#ccc'
      }
    },
    axisLine: {
      show: true,
      lineStyle: {
        color: '#ccc'
      },
    },
  },
  series: [{
    name: 'a',
    tooltip: {
      show: false
    },
    type: 'bar',
    barWidth: 24.5,
    itemStyle: {
      normal: {
        color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
          offset: 0,
          color: "#0B4EC3" // 0% 处的颜色
        }, {
          offset: 0.6,
          color: "#138CEB" // 60% 处的颜色
        }, {
          offset: 1,
          color: "#17AAFE" // 100% 处的颜色
        }], false)
      }
    },
    data: data,
    barGap: 0
  }, {
    type: 'bar',
    barWidth: 8,
    itemStyle: {
      normal: {
        color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
          offset: 0,
          color: "#09337C" // 0% 处的颜色
        }, {
          offset: 0.6,
          color: "#0761C0" // 60% 处的颜色
        }, {
          offset: 1,
          color: "#0575DE" // 100% 处的颜色
        }], false)
      }
    },
    barGap: 0,
    data: data
  }, {
    name: 'b',
    tooltip: {
      show: false
    },
    type: 'pictorialBar',
    itemStyle: {
      borderWidth: 1,
      borderColor: '#0571D5',
      color: '#1779E0'
    },
    symbol: 'path://M 0,0 l 120,0 l -30,60 l -120,0 z',
    symbolSize: ['30', '12'],
    symbolOffset: ['0', '-11'],
    //symbolRotate: -5,
    symbolPosition: 'end',
    data: data,
    z: 3
  }]
};
let options1 = {
  title: {
    text: '车辆区域分布',
    left: 'center',
    top: '5%'
  },
  grid: {
    left: '5%',
    right: '5%',
    bottom: '5%',
    top: '10%',
    containLabel: true
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'none'
    },
    formatter: function (params) {
      return params[0].name + '<br/>' +
        "<span style='display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:rgba(36,207,233,0.9)'></span>" +
        params[0].seriesName + ' : ' + params[0].value + '辆<br/>'
    }
  },

  xAxis: {
    show: false,
    type: 'value'
  },
  yAxis: [{
    type: 'category',
    inverse: true,
    axisLabel: {
      show: true,
      textStyle: {
        color: '#333'
      },
    },
    splitLine: {
      show: false
    },
    axisTick: {
      show: false
    },
    axisLine: {
      show: false
    },
    data: ['苏州', '上海', '北京', '深圳', '郑州', '杭州', '张家港']
  }, {
    type: 'category',
    inverse: true,
    axisTick: 'none',
    axisLine: 'none',
    show: true,
    axisLabel: {
      textStyle: {
        color: '#333',
        fontSize: '12'
      },

    },
    data: data
  }],
  series: [{
    name: '辆',
    type: 'bar',
    zlevel: 1,
    itemStyle: {
      normal: {
        barBorderRadius: 30,
        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
          offset: 0,
          color: 'rgb(57,89,255,1)'
        }, {
          offset: 1,
          color: 'rgb(46,200,207,1)'
        }]),
      },
    },
    barWidth: 15,
    data: data
  },
  {
    name: '背景',
    type: 'bar',
    barWidth: 15,
    barGap: '-100%',
    data: [500, 500, 500, 500, 500, 500, 500],
    itemStyle: {
      normal: {
        color: 'rgba(24,31,68,1)',
        barBorderRadius: 15,
      }
    },
  },
  ]
};
export default {
  name: 'dataSys',
  data() {
    return {
      options: option,
      options1
    }
  },

}
</script>

<style lang='scss' scoped>
.data-sys {
  display: flex;
  flex-wrap: wrap;
  & > div {
    width: 50%;
    height: 420px;
  }
}
</style>