<template>
  <div class="cart">
    <div class="params">
      <el-row>
        <el-col :span="18">
          <el-input v-model="ctName" placeholder="请输入客户名称"></el-input>
        </el-col>
        <el-col :span="6">
          <el-button type="primary" @click="queryClick">查询</el-button>
        </el-col>
      </el-row>
      <el-button type="primary" @click="addCart">增加</el-button>
      <el-button type="danger" @click="deletesAll">批量删除</el-button>

      <download-excel class="export-excel-wrapper" :data="totalArr" :fields="json_fields">
        <!-- 上面可以自定义自己的样式，还可以引用其他组件button -->
        <el-button type="primary" size="small">导出EXCEL</el-button>
      </download-excel>
    </div>
    <el-table :data="cartList" style="width: 100%" height="700px" border @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column prop="customerId" label="客户编码" width="80" align="center">
      </el-table-column>
      <el-table-column prop="ctName" label="客户名称" width="150">
      </el-table-column>
      <el-table-column prop="ctProvince" label="客户所在省" width="150">
      </el-table-column>
      <el-table-column prop="ctCity" label="客户所在市" width="150">
      </el-table-column>
      <el-table-column prop="ctAddress" label="客户详细地址" width="300">
      </el-table-column>
      <el-table-column prop="ctPerson" label="客户联系人" width="100">
      </el-table-column>
      <el-table-column prop="psPhone" label="联系人手机" width="200">
      </el-table-column>

      <el-table-column prop="serviceId" label="客户服务站编码" width="200">
      </el-table-column>
      <el-table-column prop="userId" label="我方负责人编码" width="200">
      </el-table-column>
      <el-table-column prop="empName" label="员工姓名" width="150">
      </el-table-column>
      <el-table-column prop="operator" label="操作人" width="150">
      </el-table-column>

      <el-table-column prop="operatorDate" label="操作时间" width="180">
        <template slot-scope="scope">
          {{ scope.row.operatorDate | formatDate }}
        </template>
      </el-table-column>

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
    <CustomerUpdate :isShow="isShow" :type="type" :datas="selectData"></CustomerUpdate>
  </div>
</template>

<script>
import { customer } from "@/api";
import CustomerUpdate from "./update/CustomerUpdate";

export default {
  data() {
    return {
      cartList: [],

      isShow: false,
      selectData: {}, //选中数据
      multipleSelection: [], //批量删除
      selectDelete: [], //单条删除
      type: "", //编辑&新增
      ctName: "", //搜索
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
    };
  },
  components: {
    CustomerUpdate,
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
    handleEdit(index, row) {
      this.selectData = { ...row };
      this.type = "编辑";
      this.isShow = true;
    },
    //修改内容
    update() {
      //   this.$axios.post(cartApi.updateCarInfo, { ...value }).then(res => {
      //     const data = res.data;
      //     if (data.errCode == 200) {
      //       this.getData()
      //     } else {
      //       this.$message(data.msg)
      //     }
      //   })
    },
    //查询内容
    queryClick() {
      if (this.ctName == "") {
        this.getData();
      } else {
        this.getData();
      }
    },
    //删除内容
    handleDelete(index, row) {
      this.multipleSelection = [{ customerId: row.customerId }];
      this.deletesHandle(this.multipleSelection);
    },
    handleSelectionChange(val) {
      let arr = [];
      if (val.length <= 0) {
        this.selectDelete = [];
      } else {
        val.forEach((item) => {
          console.log(item.customerId);
          arr.push({ customerId: item.customerId });
        });
        this.selectDelete = arr;
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
          .post(customer.delete, {
            customerIds: params,
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