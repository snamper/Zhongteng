<template>
  <div class="cart">
    <div class="params">
      <el-row>
        <el-col :span="18">
          <el-input
            v-model="searchValue"
            placeholder="请输入车型名称"
          ></el-input>
        </el-col>
        <el-col :span="6">
          <el-button type="primary" @click="queryClick">查询</el-button>
        </el-col>
      </el-row>
      <el-button type="primary" @click="addCart">增加</el-button>
      <el-button type="danger" @click="deletesHandle">批量删除</el-button>
    </div>
    <el-table
      :data="cartList"
      style="width: 100%"
      border
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column prop="typeId" label="车型编码" width="80" align="center">
      </el-table-column>
      <el-table-column prop="carSpec" label="规格" width="180">
      </el-table-column>
     
      <el-table-column prop="carName" label="车型名称" width="250">
      </el-table-column>

      <el-table-column prop="fName" label="厂家名称" width="200">
      </el-table-column>
      <el-table-column prop="remark" label="备注">
      </el-table-column>

      <el-table-column prop="operator" label="操作人"> </el-table-column>
      <el-table-column prop="operatorDate" label="操作时间" width="200">
        <template slot-scope="scope">
          {{ scope.row.operatorDate | formatDate }}
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
            title="是否删除？"
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
    <updateCartMdeol
      :isShow="isShow"
      :datas="selectData"
      :update="update"
      :type="type"
    ></updateCartMdeol>
  </div>
</template>

<script>
import { cartModel } from "@/api";
import updateCartMdeol from "@/views/Cart/update/UpdateCartMode";

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

      carId: [],
    };
  },
  components: {
    updateCartMdeol,
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      const { page, pageSize } = this;
      this.$axios
        .post(cartModel.query, { carName: this.searchValue })
        .then((res) => {
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
    update(value) {
      this.$axios.post(cartModel.addOrUpdate, { ...value }).then((res) => {
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
        .post(cartModel.delete, { carTypeIds: arr })
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
      let tem = [{ typeId: row.typeId }];
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
          arr.push({ typeId: element.typeId });
        });
        this.delete(arr);
      });
      //   this.handleDelete()
    },
    //增加
    addCart() {
      this.type = "新增";
      this.selectData = {};
      this.isShow = true;
    },
    addCartClick(value) {
      console.log(value);
      this.$axios.post(cartModel.addOrUpdate, { ...value }).then((res) => {
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