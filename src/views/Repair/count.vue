<template>
  <div class="count">
    <el-row :gutter="10">
      <el-col :span="15">
        <el-input style="width:800px" v-model="params.ctName" placeholder="请输入客户名称"></el-input>
        <el-input style="width:800px" v-model="params.vin" placeholder="请输入车架号"></el-input>
        <el-input style="width:800px" v-model="params.carName" placeholder="请输入车架号"></el-input>
        <el-cascader style="width:800px" size="large" :options="provinceAndCityDataPlus" v-model="selectOptions" @change="handleChange"></el-cascader>
        <el-button type="primary" @click="query">搜索</el-button>
      </el-col>
    </el-row>
    <el-table :data="cartList" style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="车架号">
              <span>{{ props.row.vin }}</span>
            </el-form-item>
            <el-form-item label="客户编码">
              <span>{{ props.row.customerid }}</span>
            </el-form-item>
            <el-form-item label="客户名称">
              <span>{{ props.row.customer }}</span>
            </el-form-item>
            <el-form-item label="回执单号">
              <span>{{ props.row.id }}</span>
            </el-form-item>
            <el-form-item label="维修日期">
              <span>{{ props.row.redate }}</span>
            </el-form-item>
            <el-form-item label="维修分类">
              <span>{{ props.row.category }}</span>
            </el-form-item>
            <el-form-item label="服务站编码">
              <span>{{ props.row.serviceid }}</span>
            </el-form-item>
            <el-form-item label="服务站名称">
              <span>{{ props.row.service }}</span>
            </el-form-item>
            <el-form-item label="服务站地址">
              <span>{{ props.row.address }}</span>
            </el-form-item>
            <el-form-item label="结算清单">
              <el-button type="text" label="增值税发票1" @click="openlist">{{props.row.costlist}}</el-button>
            </el-form-item>

            <el-form-item label="增值税发票">
              <el-button type="text" label="增值税发票2" @click="openinv">{{
              props.row.invoice
            }}</el-button>
            </el-form-item>

            <el-form-item label="付款申请书">
              <el-button type="text" label="增值税发票3" @click="openpayapp">{{
              props.row.payapplication
            }}</el-button>
            </el-form-item>
            <el-form-item label="审核人">
              <span>{{ props.row.reviewer }}</span>
            </el-form-item>
            <el-form-item label="审核日期">
              <span>{{ props.row.redate }}</span>
            </el-form-item>
            <el-form-item label="问题描述">
              <span>{{ props.row.desc }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column label="车架号" prop="vin"> </el-table-column>
      <el-table-column label="车牌号" prop="carnumber"> </el-table-column>
      <el-table-column label="客户名称" prop="customer"> </el-table-column>
      <el-table-column label="服务站" prop="service"> </el-table-column>
      <el-table-column label="申请人" prop="application"> </el-table-column>
      <el-table-column label="上传日期" prop="appdate"> </el-table-column>
      <el-table-column label="描述" prop="desc"> </el-table-column>
    </el-table>
    <el-pagination @current-change="handleCurrentChange" :current-page.sync="page" :page-size="pageSize" layout="total, prev, pager, next" :total="totalArr.length - 1">
    </el-pagination>
  </div>
</template>



<script>
import { repairCount } from '@/api'
import { provinceAndCityDataPlus, CodeToText } from 'element-china-area-data'
export default {
  data() {
    return {
      params: {
        ctName: '', ctProvince: "", ctCity: '', carName: '', vin: ''
      },
      tableData: [],
      provinceAndCityDataPlus: provinceAndCityDataPlus,//省市数据
      selectOptions: '',//省市
    };
  },
  mounted() {
    this.getData()
  },
  methods: {
    async getData() {
      const { page, pageSize, selectOptions } = this;
      let arr = ['全部', '市辖区'];
      let ctProvince = CodeToText[selectOptions[0]] ?? ''
      let ctCity = CodeToText[selectOptions[1]] ?? ''
      this.params.ctProvince = ctProvince;
      this.params.ctCity = ctCity;
      if (arr.includes(ctCity)) {
        this.params.ctCity = ''
      }
      if (arr.includes(ctProvince)) {
        this.params.ctProvince = ''
      }

      const data = await this.$axios.post(repairCount.query, this.params)
      if (data && data.status === 200 && data.data.errCode === 200) {
        let resule = data.data.data;

        this.cartList = this.paging(page, pageSize, resule);
        this.totalArr = resule;
        this.type = "";
      }
    },
    query() {
      this.getData();
    }
  },
};
</script>

<style scoped lang="scss">
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
.count {
  .el-col {
    display: flex;
  }
}
</style>