<template>
  <div class="data-sys">
    <div class="params">
      <div class="block">
        <span class="demonstration"></span>
        <el-cascader
          size="large"
          :options="provinOptions"
          v-model="selectedOptions"
          @change="handleChange"
        >
        </el-cascader>
      </div>

    </div>

    <div class="left">
      <echarts-box
        :options="options"
        id="data-echarts"
      ></echarts-box>
    </div>
  </div>
</template>

<script>
import { customer } from "@/api";
import { provinceAndCityDataPlus, CodeToText } from 'element-china-area-data'
import * as echarts from "echarts";
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

export default {
  name: "dataSys",
  data() {
    return {
      options: option,
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            },
          },
        ],
      },
      value1: '',
      value2: '',
      json_fields: {
        客户编码: "customerId",
        客户名称: "ctName",
        客户所在省: "ctProvince",
        客户所在市: "ctCity",
        客户详细地址: "ctAddress",
        客户联系人: "ctPerson",
        联系人手机: "psPhone",
        客户服务站编码: "serviceId",
        我方负责人编码: "userId",
        员工姓名: "empName",
        操作人: "operator",
        操作时间: "operatorDate",
      },
      provinOptions: provinceAndCityDataPlus,
      selectedOptions: []
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      const { page, pageSize } = this;
      this.$axios
        .post(customer.queryCustomerList, {
          ctName: this.ctName,
        })
        .then((res) => {
          console.log(res);
          const data = res.data;
          if (data.errCode == 200) {
            this.cartList = this.paging(page, pageSize, data.data);
            this.totalArr = data.data;
            this.type = "";
          } else {
            this.$message(data.msg);
          }
        });
    },
    //查询内容
    queryClick() {
      if (this.ctName == "") {
        this.getData();
      } else {
        this.getData();
      }
    },
    handleChange(value) {
      console.log(value)
      let codeArr = []
      value.forEach(item => {
        let codeCity = CodeToText[item]
        codeArr.push(codeCity)
      })
      console.log(codeArr)
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
}
</style>