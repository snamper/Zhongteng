<template>

  <el-tabs type="border-card">
    <el-tab-pane label="保险信息管理">
      <InsuranceInfo></InsuranceInfo>
    </el-tab-pane>

    <el-tab-pane label="保险公司管理">
      <span slot="label">保险公司管理</span>
      <Company></Company>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import { insurance } from "@/api";
import Company from '@/components/Company'
import InsuranceInfo from '@/components/InsuranceInfo'

export default {
  data() {
    return {

    };
  },
  components: {
    InsuranceInfo,
    Company
  },

};
</script>

<style lang='scss' scoped>
.el-pagination {
  text-align: center;
  margin-top: 20px;
}
.params {
  display: flex;
  margin-bottom: 15px;
  .el-row {
    display: inline-block;
    margin-right: 15px;
  }
  .export-excel-wrapper {
    margin-left: 15px;
    .el-button {
      height: 100%;
    }
  }
}
</style>