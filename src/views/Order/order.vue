<template>
  <div class="cart">
    <div class="params">
      <el-row>
        <el-col :span="18">
          <el-input v-model="searchValue" placeholder="请输入车架号"></el-input>
        </el-col>
        <el-col :span="6">
          <el-button type="primary" @click="queryClick">查询</el-button>
        </el-col>
      </el-row>
      <el-button type="primary" @click="addCart">增加</el-button>
      <el-button type="danger" @click="deletesAll">批量删除</el-button>

      <download-excel class="export-excel-wrapper" :data="cartList" :fields="json_fields">
        <!-- 上面可以自定义自己的样式，还可以引用其他组件button -->
        <el-button type="primary" size="small">导出EXCEL</el-button>
      </download-excel>
    </div>
    <el-table :data="cartList" style="width: 100%" height="700" border @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column fixed prop="orderId" label="车辆订单编码" width="120">
      </el-table-column>
      <el-table-column fixed prop="customerId" label="客户编码" width="80">
      </el-table-column>
      <el-table-column prop="ctName" label="客户名称" width="150">
      </el-table-column>
      <el-table-column prop="carName" label="车型名称" width="120">
      </el-table-column>
      <el-table-column prop="qty" label="订单数量" width="120">
      </el-table-column>
      <el-table-column prop="empName1" label="负责人一" width="120">
      </el-table-column>
      <el-table-column prop="empName2" label="负责人二" width="120">
      </el-table-column>
      <el-table-column prop="operator" label="操作人" width="90">
      </el-table-column>
      <el-table-column prop="operatorDate" label="操作时间" width="180">
        <template slot-scope="scope">
          {{ scope.row.operatorDate | formatDate(true) }}
        </template>
      </el-table-column>
      <el-table-column prop="#" label="备注"> </el-table-column>
      <el-table-column label="操作" fixed="right" width="150">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-popconfirm confirm-button-text="好的" cancel-button-text="不用了" icon="el-icon-info" icon-color="red" title="这是一段内容确定删除吗？" @confirm="handleDelete(scope.$index, scope.row)">
            <el-button size="mini" type="danger" slot="reference">删除</el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination @current-change="handleCurrentChange" :current-page.sync="page" :page-size="pageSize" layout="total, prev, pager, next" :total="totalArr.length - 1">
    </el-pagination>
    <update-order :isShow="isShow" :datas="selectData" :update="update" :type="type"></update-order>
  </div>
</template>

<script>
import { order } from "@/api";
import UpdateOrder from "./update/UpdateOrder";

export default {
  data() {
    return {
      cartList: [],
      pagesize: 9, //每页的数据条数
      currentPage: 1, //默认开始页面
      isShow: false,
      selectData: {},
      searchValue: "",
      multipleSelection: [],
      selectDelete: [], //单条删除
      type: "",
      json_fields: {
        订单编码: "orderId",
        客户编码: "customerId",
        客户名称: "ctName",
        负责人一编码: "useId1",
        负责人二编码: "useId2",
        负责人一: "empName1",
        负责人二: "empName2",
        车型编码: "typeId",
        车型名称: "carName",
        订单数量: "qty",
        操作人: "operator",
        操作时间: "operatorDate",
      },
    };
  },
  components: {
    UpdateOrder,
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      this.$axios.post(order.query, { vin: this.searchValue }).then((res) => {
        const data = res.data;
        if (data.errCode == 200) {
          this.cartList = this.paging(this.page, this.pageSize, data.data);
          this.totalArr = data.data;
          this.type = "";
        } else {
          this.$message(data.msg);
        }
      });
    },
    handleEdit(index, row) {
      this.selectData = { ...row };
      console.log(this.selectData);
      this.type = "编辑";
      this.isShow = true;
    },
    //修改内容
    update() { },
    //查询内容
    queryClick() {
      if (this.searchValue == "") {
        this.getData();
      } else {
        this.getData();
      }
    },

    deletesAll() {
      let _self = this;
      let tem = JSON.parse(JSON.stringify(this.selectDelete));
      this.$confirm("是否批量删除数据?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        console.log(tem);
        _self.deletesHandle(tem);
      });
    },

    deletesHandle(params) {
      if (params.length > 0) {
        this.$axios
          .post(order.delete, {
            orderIds: params,
          })
          .then((res) => {
            console.log(res);
            const data = res.data;
            if (data.errCode == 200) {
              this.$message.success("删除成功");
              this.getData();
            } else {
              this.$message.error(data.msg);
            }
          })
          .catch((e) => {
            console.log(e);
            this.$message.error(e);
          });
      }
    },
    //删除内容
    handleDelete(index, row) {
      this.multipleSelection = [{ orderId: row.orderId }];
      this.deletesHandle(this.multipleSelection);
    },
    handleSelectionChange(val) {
      let arr = [];
      if (val.length <= 0) {
        this.selectDelete = [];
      } else {
        val.forEach((item) => {
          console.log(item.orderId);
          arr.push({ orderId: item.orderId });
        });
        this.selectDelete = arr;
      }
    },

    //增加
    addCart() {
      this.type = "新增";
      this.selectData = {};
      this.isShow = true;
    },
    addCartClick(value) {
      console.log(value);
    },
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