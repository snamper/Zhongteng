<template>
  <div class="cart">
    <div class="params">
      <el-row>
        <el-col :span="18">
          <el-input v-model="searchValue" placeholder="请输入车牌号"></el-input>
        </el-col>
        <el-col :span="6">
          <el-button type="primary" @click="queryClick">查询</el-button>
        </el-col>
      </el-row>
      <el-button type="primary" @click="addCart">增加</el-button>
      <el-button type="danger" @click="deletesHandle">批量删除</el-button>

      <download-excel class="export-excel-wrapper" :data="cartList" :fields="json_fields">
        <el-button type="primary" size="small">导出EXCEL</el-button>
      </download-excel>
    </div>
    <el-table :data="cartList" style="width: 100%" height="700px" border @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column fixed prop="carId" label="车辆编码" width="80" align="center">
      </el-table-column>
      <el-table-column fixed prop="vin" label="车架号" width="180">
      </el-table-column>
      <el-table-column prop="engine" label="发动机号" width="150">
      </el-table-column>
      <el-table-column prop="carNumber" label="车牌号" width="150">
      </el-table-column>
      <el-table-column prop="carName" label="车型" width="200">
      </el-table-column>
      <el-table-column prop="regDate" label="注册日期" width="150">
        <template slot-scope="scope">
          {{ scope.row.regDate | formatDate }}
        </template>
      </el-table-column>
      <el-table-column prop="" label="购车发票" width="120" align="center">
        <template slot-scope="scope">
          <el-image :src="scope.row.invoice" style="width: 30px; height: 30px" :preview-src-list="scope.row.invoice"></el-image>
        </template>
      </el-table-column>

      <el-table-column prop="ctName" label="客户名称" width="150">
      </el-table-column>
      <!-- 
      <el-table-column prop="fName" label="主机厂" width="100">
      </el-table-column> -->

      <el-table-column prop="motDate" label="年检日期" width="150">
        <template slot-scope="scope">
          {{ scope.row.registerdate | formatDate }}
        </template>
      </el-table-column>
      <el-table-column prop="delStatus" label="交付状态" align="center">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.delStatus == 0" type="danger">未交付</el-tag>
          <el-tag v-if="scope.row.delStatus == 1" type="success">已交付</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="carProperty" label="车辆产权证" align="center" width="150">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.carProperty == 0" type="danger">未确认</el-tag>
          <el-tag v-if="scope.row.carProperty == 1" type="success">已确认</el-tag>
        </template>
      </el-table-column>
      <!-- 
      <el-table-column
        prop="carEqual"
        label="车辆一致性证书"
        align="center"
        width="150"
      >
        <template slot-scope="scope">
          <el-tag v-if="scope.row.carEqual == 0" type="danger">未确认</el-tag>
          <el-tag v-if="scope.row.carEqual == 1" type="success">已确认</el-tag>
        </template>
      </el-table-column>
       -->
      <el-table-column prop="carLicense" label="行驶证">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.carLicense == 0" type="danger">未确认</el-tag>
          <el-tag v-if="scope.row.carLicense == 1" type="success">已确认</el-tag>
        </template>
      </el-table-column>

      <!-- <el-table-column prop="certificate" label="合格证">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.certificate == 0" type="danger"
            >未确认</el-tag
          >
          <el-tag v-if="scope.row.certificate == 1" type="success"
            >已确认</el-tag
          >
        </template>
      </el-table-column>
       -->

      <el-table-column prop="orderId" label="订单编码"> </el-table-column>

      <!-- <el-table-column prop="deliveryDate" label="交付日期" width="150">
        <template slot-scope="scope">
          {{ scope.row.deliveryDate | formatDate }}
        </template>
      </el-table-column> -->

      <el-table-column prop="operator" label="操作人"> </el-table-column>
      <el-table-column prop="operatorDate" label="操作时间" width="180">
        <template slot-scope="scope">
          {{ scope.row.operatorDate | formatDate(true) }}
        </template>
      </el-table-column>

      <el-table-column label="操作" fixed="right" width="150">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <!-- <el-popconfirm title="是否删除此条数据?">
           
          </el-popconfirm> -->
          <el-popconfirm confirm-button-text="好的" cancel-button-text="不用了" icon="el-icon-info" icon-color="red" title="是否删除此条数据?" @confirm="handleDelete(scope.$index, scope.row)">
            <el-button size="mini" type="danger" slot="reference">删除</el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination @current-change="handleCurrentChange" :current-page.sync="page" :page-size="pageSize" layout="total, prev, pager, next" :total="totalArr.length - 1">
    </el-pagination>
    <update-cart :isShow="isShow" :selectData="selectData" :update="update" :type="type" ref="updateCart"></update-cart>
  </div>
</template>

<script>
import { cart } from "@/api";
import updateCart from "@/components/UpdateCart";

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
      type: "",
      json_fields: {
        车辆id: "carId",
        车架号: "vin",
        发动机号: "engine",
        车型名称: "carName",
        车牌号: "carNumber",
        上牌日期: "regDate",
        客户编码: "customerId",
        客户名称: "ctName",
        主机厂编码: "fName",
        年检日期: "motDate",
        注册日期: "registerdate",
        交付状态: {
          field: "delStatus",
          callback: (value) => {
            return value == 0 ? "未交付" : "已交付";
          },
        },
        车辆产权证状态: {
          field: "carProperty",
          callback: (value) => {
            return value == 0 ? "未确认" : "确认";
          },
        },
        车辆一致性证书状态: {
          field: "carEqual",
          callback: (value) => {
            return value == 0 ? "未确认" : "确认";
          },
        },
        行驶证状态: {
          field: "carLicense",
          callback: (value) => {
            return value == 0 ? "未确认" : "确认";
          },
        },
        合格证状态: {
          field: "certificate",
          callback: (value) => {
            return value == 0 ? "未确认" : "确认";
          },
        },
        车辆订单编码: "orderId",
        交付日期: "deliveryDate",
        租赁开始日期: "leaseBdate",
        租赁截止日期: "leaseEdate",
        单日租金: "carRent",
        操作人: "operator",
        操作时间: "operatorDate",
      },
      carId: [],
    };
  },
  components: {
    updateCart,
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      const { page, pageSize } = this;
      this.$axios.post(cart.query, { vin: this.searchValue }).then((res) => {
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
      let child = this.$refs.updateCart;
      console.log(child);
      child.getDataCarType();
    },
    //修改内容
    update(value) {
      this.$axios.post(cart.addOrUpdate, { ...value }).then((res) => {
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
      this.getData();
    },
    delete(arr) {
      this.$axios
        .post(cart.delete, { carIds: arr })
        .then((res) => {
          const data = res.data;
          if (data.errCode == 200) {
            this.$message.success("删除成功");
            this.getData();
          } else {
            this.$message(data.msg);
          }
        })
        .catch((e) => {
          this.$message(e);
        });
    },
    //删除内容
    handleDelete(index, row) {
      let tem = [{ carId: row.carId }];
      //   console.log(tem)
      this.delete(tem);
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    deletesHandle() {
      if (this.multipleSelection.length <= 0) {
        this.$message.warning("请选择数据");
        return false;
      }
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        let params = JSON.parse(JSON.stringify(this.multipleSelection));
        let arr = [];
        params.forEach((element) => {
          arr.push({ carId: element.carId });
        });
        this.delete(arr);
      });
      //   this.handleDelete()
    },
    //增加
    addCart() {
      this.type = "增加";
      this.selectData = {};
      this.isShow = true;
    },
    addCartClick(value) {
      console.log(value);
      this.$axios.post(cart.addOrUpdate, { ...value }).then((res) => {
        const data = res.data;
        if (data.errCode == 200) {
          this.$message.success("添加成功成功");
          this.isShow = false;
          this.getData();
        } else {
          this.$message.error(data.msg);
        }
      });
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