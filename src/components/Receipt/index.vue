<template>
  <div>
    <div class="cart">
      <div class="params">
        <el-row>
          <el-col :span="5">
            <el-input
              v-model="searchValue"
              placeholder="请输入厂家名称"
            ></el-input>
          </el-col>
          <el-col :span="1.8">
            <el-button
              type="primary"
              @click="queryClick"
            >查询</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button
              type="primary"
              @click="addCart"
            >增加</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button
              type="danger"
              @click="deletesAll"
            >批量删除</el-button>
          </el-col>
          <el-col :span="1.5">
            <download-excel
              class="export-excel-wrapper"
              :data="cartList"
              :fields="json_fields"
            >
              <!-- 上面可以自定义自己的样式，还可以引用其他组件button -->
              <el-button type="primary">导出EXCEL</el-button>
            </download-excel>
          </el-col>
        </el-row>
      </div>
      <el-table
        :data="cartList"
        style="width: 100%"
        height="700"
        border
        @selection-change="handleSelectionChange"
      >
        <el-table-column
          type="selection"
          width="55"
        > </el-table-column>
        <el-table-column
          prop="receiptId"
          label="回执单号"
          width="100"
        >
        </el-table-column>
        <el-table-column
          prop="vin"
          label="车架号"
          width="200"
        >
        </el-table-column>
        <el-table-column
          prop="list"
          label="结算清单"
          width="150"
        >
        </el-table-column>
        <el-table-column
          prop="invoice"
          label="增值税发票"
          width="150"
        >
        </el-table-column>
        <el-table-column
          prop="appPayment"
          label="付款申请书"
          width="100"
        >
        </el-table-column>
        <el-table-column
          prop="oldPart1"
          label="配件信息"
          width="100"
        >
        </el-table-column>
        <!-- <el-table-column prop="oldPart2" label="配件2"> </el-table-column>
          <el-table-column prop="oldPart3" label="配件3"> </el-table-column> -->
        <el-table-column
          prop="empName"
          label="上传人"
          width="100"
        >
        </el-table-column>
        <el-table-column
          prop="upDate"
          label="上传时间"
          width="150"
        >
          <template slot-scope="scope">
            {{ scope.row.upDate | formatDate }}
          </template>
        </el-table-column>
        <el-table-column
          prop="remarks"
          label="备注"
        > </el-table-column>
        <el-table-column
          label="操作"
          fixed="right"
          width="200"
        >
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="handleEdit(scope.$index, scope.row)"
            >审核</el-button>
            <el-button
              size="mini"
              type="success"
              @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button>
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
              <el-button
                size="mini"
                type="danger"
                slot="reference"
              >删除</el-button>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-pagination
      @current-change="handleCurrentChange"
      :current-page.sync="page"
      :page-size="pageSize"
      layout="total, prev, pager, next"
      :total="totalArr.length - 1"
    >
    </el-pagination>
    <UpdateReceipt
      :isShow="isShow"
      :datas="selectData"
      :update="update"
      :type="type"
    ></UpdateReceipt>
  </div>
</template>

<script>
import { receipt } from "@/api";
import UpdateReceipt from "@/views/Repair/update/UpdateReceipt";

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
        回执单号: "receiptId",
        车架号: "vin",
        结算清单: "list",
        增值税发票: "invoice",
        付款申请书: "appPayment",
        配件1: "oldPart1",
        配件2: "oldPart2",
        配件3: "oldPart3",
        员工编号: "userId",
        上传人: "empName",
        上传日期: "upDate",
        备注: "remarks",
      },
    };
  },

  components: {
    UpdateReceipt,
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      this.$axios.post(receipt.query, { vin: this.searchValue }).then((res) => {
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
      this.$axios.post(receipt.addOrUpdate, { ...value }).then((res) => {
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
      this.multipleSelection = [{ receiptId: row.receiptId }];
      this.deletesHandle(this.multipleSelection);
    },
    handleSelectionChange(val) {
      let arr = [];
      if (val.length <= 0) {
        this.selectDelete = [];
      } else {
        val.forEach((item) => {
          console.log(item.receiptId);
          arr.push({ receiptId: item.receiptId });
        });
        this.selectDelete = arr;
      }
    },
    deletesHandle(params) {
      if (params.length > 0) {
        this.$axios
          .post(receipt.delete, {
            receiptIds: params,
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