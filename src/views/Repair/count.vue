<template>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column type="expand">
      <template slot-scope="props">
        <el-form label-position="left" inline class="demo-table-expand">
          <el-form-item label="车牌号">
            <span>{{ props.row.carnumber }}</span>
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
            <el-button type="text" label="增值税发票1" 
            @click="openlist">{{props.row.costlist}}</el-button>
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
    <el-table-column label="回执单号" prop="id"> </el-table-column>
    <el-table-column label="车牌号" prop="carnumber"> </el-table-column>
    <el-table-column label="客户名称" prop="customer"> </el-table-column>
    <el-table-column label="服务站" prop="service"> </el-table-column>
    <el-table-column label="申请人" prop="application"> </el-table-column>
    <el-table-column label="上传日期" prop="appdate"> </el-table-column>
    <el-table-column label="描述" prop="desc"> </el-table-column>
  </el-table>
</template>

<style>
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
</style>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          id: "12987121",
          name: "好滋好味鸡蛋仔",
          category: "维修",
          desc: "刹车片磨损严重，更换刹车片",
          address: "苏州工业园区北谢雨街14号",
          shop: "王小虎夫妻店",
          carnumber: "苏E66666",
          application: "刘洋",
          appdate: "2021-02-28",
          customerid: "20210001",
          customer: "中国江苏苏州邮政",
          serviceid: "S20211001",
          service: "江苏中腾4S店",
          reviewer: "李主管",
          costlist: "结算清单",
          invoice: "增值税发票",
          payapplication: "付款申请书",
          redate: "2021-02-27",
        },
        {
          id: "12987122",
          name: "好滋好味鸡蛋仔",
          category: "维修",
          desc: "尾翼不够帅，更换尾翼",
          address: "苏州工业园区北谢雨街14号",
          shop: "王小虎夫妻店",
          carnumber: "苏E66669",
          application: "任洪伟",
          appdate: "2021-02-28",
          customerid: "20210001",
          customer: "中国江苏苏州邮政",
          serviceid: "S20211001",
          service: "江苏中腾4S店",
          reviewer: "李主管",
          costlist: "结算清单",
          invoice: "增值税发票",
          payapplication: "付款申请书",
          redate: "2021-02-27",
        },
        {
          id: "12987123",
          name: "好滋好味鸡蛋仔",
          category: "维修",
          desc: "轮胎磨损严重，更换轮胎",
          address: "苏州工业园区北谢雨街14号",
          shop: "王小虎夫妻店",
          carnumber: "苏E66665",
          application: "任洪伟",
          appdate: "2021-02-28",
          customerid: "20210001",
          customer: "中国江苏苏州邮政",
          serviceid: "S20211001",
          service: "江苏中腾4S店",
          reviewer: "李主管",
          costlist: "结算清单",
          invoice: "增值税发票",
          payapplication: "付款申请书",
          redate: "2021-02-27",
        },
        {
          id: "12987124",
          name: "好滋好味鸡蛋仔",
          category: "维修",
          desc: "钱多，没事烧钱玩",
          address: "苏州工业园区北谢雨街14号",
          shop: "王小虎夫妻店",
          carnumber: "苏E66667",
          application: "陈丹华",
          appdate: "2021-02-28",
          customerid: "20210001",
          customer: "中国江苏苏州邮政",
          serviceid: "S20211001",
          service: "江苏中腾4S店",
          reviewer: "李主管",
          costlist: "结算清单",
          invoice: "增值税发票",
          payapplication: "付款申请书",
          redate: "2021-02-27",
        },
      ],
    };
  },
  methods: {
    openinv() {
      this.$alert("这是一段内容", "增值税发票", {
        confirmButtonText: "确定",
      });
    },
    openlist() {
      this.$alert("这是一段内容", "结算清单", {
        confirmButtonText: "确定",
      });
    },
    openpayapp() {
      this.$alert("这是一段内容", "付款申请书", {
        confirmButtonText: "确定",
      });
    },
  },
};
</script>