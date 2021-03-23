<template>
  <div
    class="echarts-box"
    :id="id"
  ></div>
</template>

<script>

export default {
  name: 'EchartsBox',
  props: {
    options: {
      require: true,
      type: Object
    },
    id: {
      require: true,
      type: String
    }
  },
  mounted() {

    this.initEcharts();
  },
  methods: {
    initEcharts() {
      // 基于准备好的dom，初始化echarts实例
      console.log(this.options)
      //   let myChart = this.$echarts.init(this.$refs.echarts)
      let myChart = this.$echarts.init(document.getElementById(this.id))
      // 绘制图表
      myChart.setOption(this.options);
    }
  },
}
</script>

<style lang='scss' scoped>
.echarts-box {
  width: 100%;
  height: 100%;
}
</style>