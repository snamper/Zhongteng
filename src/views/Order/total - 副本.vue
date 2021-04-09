<template>
  <div>
    <div class="search">
      <el-row :gutter="10">
        <el-col :span="5">
          <el-input v-model="params.ctName" placeholder="请输入客户名称"></el-input>
          <el-button type="primary" @click="queryHandle">查询</el-button>
        </el-col>
      </el-row>
    </div>
    <div class="data-sys">

      <div class="params">
        <div class="time">
          <!-- <el-date-picker v-model="time" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
        </el-date-picker> -->

        </div>
        <!-- <echarts-box :options="option1" id="data-echarts1"></echarts-box> -->
        <StatusEcharts :options='options2'></StatusEcharts>
      </div>

      <div class="left">
        <echarts-box :options="options" id="data-echarts"></echarts-box>
      </div>
    </div>
  </div>
</template>

<script>
import { totalApi } from "@/api";
import StatusEcharts from '@/components/EachartsTem'
import * as echarts from "echarts";
import { statusEcharts } from '@/utils'
const data = [220, 182, 191, 234, 290, 330, 310];

const option = {
  title: {
    text: "交车信息统计",
    left: "center",
    top: "5%",
  },
  tooltip: {
    trigger: "axis",
    formatter: "{b} : {c}辆",
    axisPointer: {
      // 坐标轴指示器，坐标轴触发有效
      type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
    },
  },
  xAxis: {
    data: ["苏州", "上海", "北京", "深圳", "郑州", "杭州", "张家港"],
    //坐标轴
    axisLine: {
      lineStyle: {
        color: "#ccc",
      },
    },
    //坐标值标注
    axisLabel: {
      show: true,
      textStyle: {
        color: "#333",
      },
    },
  },
  yAxis: {
    show: true,
    //坐标值标注
    axisLabel: {
      show: true,
      textStyle: {
        color: "#333",
      },
    },
    //分格线
    splitLine: {
      lineStyle: {
        color: "#ccc",
      },
    },
    axisLine: {
      show: true,
      lineStyle: {
        color: "#ccc",
      },
    },
  },
  series: [
    {
      name: "a",
      tooltip: {
        show: false,
      },
      type: "bar",
      barWidth: 24.5,
      itemStyle: {
        normal: {
          color: new echarts.graphic.LinearGradient(
            0,
            1,
            0,
            0,
            [
              {
                offset: 0,
                color: "#0B4EC3", // 0% 处的颜色
              },
              {
                offset: 0.6,
                color: "#138CEB", // 60% 处的颜色
              },
              {
                offset: 1,
                color: "#17AAFE", // 100% 处的颜色
              },
            ],
            false
          ),
        },
      },
      data: data,
      barGap: 0,
    },
    {
      type: "bar",
      barWidth: 8,
      itemStyle: {
        normal: {
          color: new echarts.graphic.LinearGradient(
            0,
            1,
            0,
            0,
            [
              {
                offset: 0,
                color: "#09337C", // 0% 处的颜色
              },
              {
                offset: 0.6,
                color: "#0761C0", // 60% 处的颜色
              },
              {
                offset: 1,
                color: "#0575DE", // 100% 处的颜色
              },
            ],
            false
          ),
        },
      },
      barGap: 0,
      data: data,
    },
    {
      name: "b",
      tooltip: {
        show: false,
      },
      type: "pictorialBar",
      itemStyle: {
        borderWidth: 1,
        borderColor: "#0571D5",
        color: "#1779E0",
      },
      symbol: "path://M 0,0 l 120,0 l -30,60 l -120,0 z",
      symbolSize: ["30", "12"],
      symbolOffset: ["0", "-11"],
      //symbolRotate: -5,
      symbolPosition: "end",
      data: data,
      z: 3,
    },
  ],
};
var xData = function () {
  var data = [];
  for (var i = 2; i < 8; i++) {
    data.push(i + "月");
  }
  return data;
}();

var option1 = {
  title: {
    text: "区域统计",
    left: "center",

  },
  "tooltip": {
    "trigger": "axis",
    "axisPointer": {
      "type": "shadow",
      textStyle: {
        color: "#333"
      }

    },
  },
  "grid": {
    "borderWidth": 0,
    "top": 50,
    "bottom": 50,
    left: 0,
    right: 0,
    containLabel: true,
    textStyle: {
      color: "#333"
    }
  },
  "calculable": true,
  "xAxis": [{
    "type": "category",
    axisLine: {
      lineStyle: {
        color: "#ccc",
      },
    },


    "axisLabel": {
      "interval": 0,
      color: '#333',

    },
    "data": xData,
  }],
  "yAxis": [{
    "type": "value",
    show: true,
    //坐标值标注
    axisLabel: {
      show: true,
      textStyle: {
        color: "#333",
      },
    },
    //分格线
    splitLine: {
      lineStyle: {
        color: "#ccc",
      },
    },
    axisLine: {
      show: true,
      lineStyle: {
        color: "#ccc",
      },
    },
  }],
  "series": [{
    "name": "女",
    "type": "bar",
    "stack": "总量",
    "barMaxWidth": 35,
    "barGap": "10%",
    "itemStyle": {
      "normal": {
        "color":
        {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [{
            offset: 0,
            color: '#17AAFE' // 0% 处的颜色
          }, {
            offset: 1,
            color: '#17AAFE' // 100% 处的颜色
          }],
          global: false // 缺省为 false
        }
      }
    },
    "data": [
      709,
      1917,
      2455,
      2610,
      1719,
      1433
    ],
  },

  {
    "name": "男",
    "type": "bar",
    "stack": "总量",
    "itemStyle": {
      "normal": {
        "color": {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [{
            offset: 0,
            color: 'rgba(0,222,255,1)' // 0% 处的颜色
          }, {
            offset: 1,
            color: 'rgba(0,222,255,1)' // 100% 处的颜色
          }],
          global: false // 缺省为 false
        },
        "barBorderRadius": 0
      }
    },
    "data": [
      327,
      1776,
      507,
      1200,
      800,
      482
    ]
  }, {
    "name": "总数",
    "type": "line",

    symbol: 'none',

    lineStyle: {
      color: '#3275FB',
      width: 4,
      shadowColor: 'rgba(0, 0, 0, 0.3)',//设置折线阴影
      shadowBlur: 15,
      shadowOffsetY: 20,
    },
    "data": [
      1036,
      3693,
      2962,
      3810,
      2519,
      1915
    ]
  },
  ]
}
export default {
  name: "dataSys",
  data() {
    return {
      options: option,
      option1: option1,
      options2: [],
      time: '',
      params: {
        ctName: '淮北市分公司'
      },
    };
  },
  components: {
    StatusEcharts
  },
  created() {

  },
  methods: {
    async getData() {
      let { options2, params } = this;
      options2 = []
      let data = await this.$axios.post(totalApi.query, { ctName: this.ctName })

      if (data && data.data.errCode === 200) {
        let result = data.data.data;

        let grbyResult = this.$_.groupBy(result, 'delStatus');
        Object.keys(grbyResult).forEach(item => {
          if (item == 'null') {

            grbyResult[0].push(...grbyResult[item])
            delete grbyResult[item]
          }
        })

        Object.keys(grbyResult).forEach(item => {

          if (item == 1) {
            options2.push({
              name: params.ctName,
              value: grbyResult[item].length,
              status: '已交付'
            })
          } else {
            options2.push({
              name: params.ctName,
              value: grbyResult[item].length,
              status: '未交付'
            })
          }
        })
        let resultOptions = statusEcharts(options2, this.ctName)

      } else {
        this.$message.error(data)
      }
    },
    queryHandle() {

      const { params } = this;
      if (!params.ctName) {

        this.$message.warning('请输入查询条件')
        return false;
      }
      this.getData();
    }

  },
};
</script>

<style lang='scss' scoped>
.data-sys {
  display: flex;
  flex-wrap: wrap;
  & > div {
    width: 50%;
    height: 420px;
  }
  .params {
    position: relative;
    .time {
      position: absolute;
      top: -5px;
      left: 12px;
      z-index: 1000;
    }
  }
}
.search {
  .el-col {
    display: flex;
  }
}
</style>