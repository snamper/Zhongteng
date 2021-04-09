<template>
  <div style="width:100%;height:100%">
    <div class="echarts-box" ref="echarts" v-if="options"></div>
    <div v-else class="not-data">暂无数据</div>
  </div>

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
  watch: {
    options: {
      deep: true,
      immediate: true,
      handler(val) {
        console.log(val)
        this.initEcharts();
      }
    },
  },
  mounted() {

    this.initEcharts();
  },
  methods: {
    initEcharts() {
      // 基于准备好的dom，初始化echarts实例

      if (this.options) {

        this.$nextTick(() => {
          let myChart = this.$echarts.init(this.$refs.echarts)
          // 绘制图表
          myChart.setOption(this.options);
        })
      }

    }
  },
}
</script>

<style lang='scss' scoped>
.echarts-box {
  width: 100%;
  height: 100%;
}
.not-data {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>