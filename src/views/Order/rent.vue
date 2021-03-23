<template>
  <el-table
    :data="tableData"
    border
    style="width: 100%">

    <el-table-column
      prop="name"
      label="区域负责人"
      width="120">
    </el-table-column>
    <el-table-column
      prop="customer"
      label="客户名称"
      width="120">
    </el-table-column>
    <el-table-column
      prop="province"
      label="省份"
      width="80">
    </el-table-column>
    <el-table-column
      prop="city"
      label="市区"
      width="80">
    </el-table-column>
    <el-table-column
      prop="address"
      label="地址"
      width="300">
    </el-table-column>
    <el-table-column
      prop="zip"
      label="邮编"
      width="120">
    </el-table-column>
        <el-table-column
      prop="engine"
      label="车型"
      width="120">
    </el-table-column>
        <el-table-column
      prop="carnumber"
      label="车牌"
      width="120">
    </el-table-column>
            <el-table-column
      prop="vin"
      label="车架号"
      width="180">
    </el-table-column>
        <el-table-column
      prop="date"
      label="租赁截止日期"
      width="150">
    </el-table-column>
       <el-table-column
      prop="zip"
      label="备注"
      width="120">
      <template slot-scope="scope">

          <el-input
            type="textarea"
            disabled
            v-model="scope.row.remarks"
          ></el-input>
        </template>
    </el-table-column>
    <el-table-column

      label="操作"
      width="100">
      <template slot-scope="scope">
        <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
        <el-button type="text" size="small">编辑</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
  export default {
    methods: {
      handleClick(row) {
        console.log(row);
      }
    },

    data() {
      return {
        tableData: [{
          date: '2016-05-02',
          name: '任宝龙',
          customer:'江苏苏州邮政',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          qty: 20,
          engine: '开瑞优优',
          total: 40,
          carnumber: '苏E888888',
          vin: 'LB9K81BEXL1LFJ388',         
          zip: 200333
        }, {
          date: '2016-05-04',
          name: '任宝龙',
          customer:'江苏苏州邮政',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1517 弄',
          qty: 20,
          engine: '开瑞优优',
          total: 40,
           carnumber: '苏E888888',
          vin: 'LB9K81BEXL1LFJ388',  
          zip: 200333
        }, {
          date: '2016-05-01',
          name: '王小虎',
          customer:'江苏苏州邮政',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1519 弄',
          qty: 20,
          engine: '开瑞优优',
          total: 40,
          carnumber: '苏E888888',
          vin: 'LB9K81BEXL1LFJ388',  
          zip: 200333
        }, {
          date: '2016-05-03',
          name: '任宝龙',
          customer:'江苏苏州邮政',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1516 弄',
          qty: 20,
          engine: '开瑞优优',
          total: 40,
          carnumber: '苏E888888',
          vin: 'LB9K81BEXL1LFJ388',  
          zip: 200333
        }, {
          date: '2016-05-03',
          name: '任宝龙',
          customer:'江苏苏州邮政',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1516 弄',
          qty: 20,
          engine: '开瑞优优',
          total: 40,
          carnumber: '苏E888888',
          vin: 'LB9K81BEXL1LFJ388',  
          zip: 200333
        }, {
          date: '2016-05-03',
          name: '任宝龙',
          customer:'江苏苏州邮政',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1516 弄',
          qty: 20,
          engine: '开瑞优优',
          total: 40,
          carnumber: '苏E888888',
          vin: 'LB9K81BEXL1LFJ388',  
          zip: 200333
        }, {
          date: '2016-05-03',
          name: '任宝龙',
          customer:'江苏苏州邮政',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1516 弄',
          qty: 20,
          engine: '开瑞优优',
          total: 40,
          carnumber: '苏E888888',
          vin: 'LB9K81BEXL1LFJ388',  
          zip: 200333
        }]
      }
    }
  }
</script>