<template>
  <div class="cart">
    <div class="params">
      <el-row>
        <el-col :span="18">
          <el-input
            v-model="searchValue"
            placeholder="请输入厂家名称"
          ></el-input>
        </el-col>
        <el-col :span="6">
          <el-button type="primary" @click="queryClick">查询</el-button>
        </el-col>
      </el-row>
      <el-button type="primary" @click="addCart">增加</el-button>
      <el-button type="danger" @click="deletesAll">批量删除</el-button>

      <download-excel
        class="export-excel-wrapper"
        :data="cartList"
        :fields="json_fields"
      >
        <!-- 上面可以自定义自己的样式，还可以引用其他组件button -->
        <el-button type="primary" size="small">导出EXCEL</el-button>
      </download-excel>
    </div>
    <el-table
      :data="cartList"
      style="width: 100%"
      height="700"
      border
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column
        prop="deliveryId"
        type="primary"
        label="出库编码"
        width="100"
      >
      </el-table-column>
      <el-table-column prop="billingDate" label="销售日期" width="150">
        <template slot-scope="scope">
          {{ scope.row.billingDate | formatDate }}
        </template>
      </el-table-column>
      <el-table-column prop="deliveryDate" label="出库日期" width="150">
        <template slot-scope="scope">
          {{ scope.row.deliveryDate | formatDate }}
        </template>
      </el-table-column>
      <el-table-column prop="productId" label="产品编码" width="150">
      </el-table-column>
      <el-table-column prop="pName" label="产品名称" width="150">
      </el-table-column>
      <el-table-column prop="batchNum" label="批号" width="150">
      </el-table-column>
      <el-table-column prop="qty" label="数量" width="150"> </el-table-column>
      <el-table-column prop="price" label="单价" width="150"> </el-table-column>
      <el-table-column prop="totalPrice" label="总价" width="150">
      </el-table-column>
      <el-table-column prop="coustomerId" label="客户编码" width="150">
      </el-table-column>

      <el-table-column prop="custName" label="客户名称" width="200">
      </el-table-column>
      <el-table-column prop="delBillno" label="单据编号" width="200">
      </el-table-column>

      <el-table-column prop="operator" label="操作人"> </el-table-column>
      <el-table-column prop="operatorDate" label="操作时间" width="200">
        <template slot-scope="scope">
          {{ scope.row.operatorDate | formatDate }}
        </template>
      </el-table-column>

      <el-table-column prop="empName" label="审核人" width="100">
      </el-table-column>

      <el-table-column prop="result" label="审核结果" width="120">
      </el-table-column>

      <el-table-column prop="opinion" label="审核意见" width="200">
      </el-table-column>

      <el-table-column prop="exaTime" label="审核时间" width="120">
        <template slot-scope="scope">
          {{ scope.row.exaTime | formatDate }}
        </template>
      </el-table-column>

      <el-table-column label="操作" fixed="right" width="150">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button
          >
          <!-- <el-popconfirm title="是否删除此条数据?">
           
          </el-popconfirm> -->
          <el-popconfirm
            confirm-button-text="好的"
            cancel-button-text="不用了"
            icon="el-icon-info"
            icon-color="red"
            title="这是一段内容确定删除吗？"
            @confirm="handleDelete(scope.$index, scope.row)"
          >
            <el-button size="mini" type="danger" slot="reference"
              >删除</el-button
            >
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @current-change="handleCurrentChange"
      :current-page.sync="page"
      :page-size="pageSize"
      layout="total, prev, pager, next"
      :total="totalArr.length - 1"
    >
    </el-pagination>
    <UpdateOutstorage
      :isShow="isShow"
      :datas="selectData"
      :update="update"
      :type="type"
    ></UpdateOutstorage>
  </div>
</template>

<script>
import { outstorage } from "@/api";
import UpdateOutstorage from "./update/UpdateOutstorage";

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
        出库编码: "deliveryId",
        销售日期: "billingDate",
        出库日期: "deliveryDate",
        产品编码: "productId",
        产品名称: "pName",
        批号: "batchNum",
        数量: "qty",
        单价: "price",
        总价: "totalPrice",
        客户编码: "coustomerId",
        客户名称: "custName",
        单据编号: "delBillno",
        操作者: "operator",
        操作时间: "operatorDate",
        审核人: "empName",
        审核结果: "result",
        审核意见: "opinion",
        审核时间: "exaTime",
      },
    };
  },
  components: {
    UpdateOutstorage,
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      this.$axios
        .post(outstorage.query, { deliveryId: this.searchValue })
        .then((res) => {
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
    update(value) {
      this.$axios.post(outstorage.addOrUpdate, { ...value }).then((res) => {
        const data = res.data;
        if (data.errCode == 200) {
          this.getData();
        } else {
          this.$message(data.msg);
        }
      });
    },
    //查询内容
    queryClick() {
      if (this.searchValue == "") {
        this.getData();
      } else {
        this.getData();
      }
    },
    //删除内容
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
    handleDelete(index, row) {
      this.multipleSelection = [{ deliveryId: row.deliveryId }];
      this.deletesHandle(this.multipleSelection);
    },
    handleSelectionChange(val) {
      let arr = [];
      if (val.length <= 0) {
        this.selectDelete = [];
      } else {
        val.forEach((item) => {
          console.log(item.deliveryId);
          arr.push({ deliveryId: item.deliveryId });
        });
        this.selectDelete = arr;
      }
    },
    deletesHandle(params) {
      if (params.length > 0) {
        this.$axios
          .post(outstorage.delete, {
            deliveryIds: params,
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