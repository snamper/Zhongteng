<template>
  <div>
    <div class="params">
      <el-row>
        <el-col :span="16">
          <el-input v-model="searchValue" placeholder="请输入车架号"></el-input>
        </el-col>
        <el-col :span="6">
          <el-button type="primary" @click="queryClick">查询</el-button>
        </el-col>
      </el-row>
      <el-button type="primary" @click="addCart">增加</el-button>
      <el-button type="danger" @click="deletesHandle">批量删除</el-button>
    </div>
    <el-table :data="cartList" style="width: 100%" height="700" @row-click="hoverHandle"  ref="refTable" :expand-row-keys="expands" :row-key="getRowKeys" >
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="申请单号">
              <span>{{ props.row.applicationId }}</span>
            </el-form-item>
            <el-form-item label="车架号">
              <span>{{ props.row.vin }}</span>
            </el-form-item>
            <el-form-item label="车牌号">
              <span>待添加</span>
            </el-form-item>
            <el-form-item label="客户名称">
              <span>{{ props.row.ctName }}</span>
            </el-form-item>

            <el-form-item label="故障图片">
              <el-button type="text" label="事故图片" @click="openlist">{{
                props.row.troublePic
              }}</el-button>
            </el-form-item>

            <el-form-item label="配件">
              <el-button type="text" label="配件1" @click="openlist">{{
                props.row.product1
              }}</el-button>
            </el-form-item>

            <el-form-item label="配件">
              <el-button type="text" label="配件2" @click="openlist">{{
                props.row.product2
              }}</el-button>
            </el-form-item>

            <el-form-item label="配件">
              <el-button type="text" label="配件3" @click="openlist">{{
                props.row.product3
              }}</el-button>
            </el-form-item>

            <el-form-item label="维修服务站">
              <span>{{ props.row.cName }}</span>
            </el-form-item>

            <el-form-item label="费用预估单">
              <el-button type="text" label="事故图片" @click="openlist">{{
                props.row.workHours
              }}</el-button>
            </el-form-item>

            <el-form-item label="预估费用">
              <span>{{ props.row.laborCost }}</span>
            </el-form-item>

            <el-form-item label="问题描述">
              <span>{{ props.row.remarks }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column label="申请单号" prop="applicationId" width="100">
      </el-table-column>
      <el-table-column label="上传日期" prop="operatorDate">
        <template slot-scope="scope">
          {{ scope.row.operatorDate | formatDate(true) }}
        </template>
      </el-table-column>
      <el-table-column label="车架号" prop="vin"> </el-table-column>
      <el-table-column label="客户名称" prop="ctName"> </el-table-column>
      <el-table-column label="维修类别" prop="category"> </el-table-column>
      <el-table-column label="申请人" prop="operator"> </el-table-column>


      <el-table-column label="描述" prop="remarks"> </el-table-column>

      <el-table-column label="操作" fixed="right" width="200">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click="appRepairHandle()"
            >审核</el-button
          >
          <el-button
            size="mini"
            type="success"
            @click="handleEdit(scope.$index, scope.row)"
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
   
    <UpdateApplication
      :isShow="isShow"
      :datas="selectData"
      :update="update"
      :type="type"
    ></UpdateApplication>

     
    <el-dialog
  title="提示"
  :visible.sync="dialogVisible"
  width="30%"
  :before-close="handleClose">
  <AppRepair title="123213" ></AppRepair>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
</el-dialog>

  </div>
</template>


<script>
import { applyInfo } from "@/api";
import UpdateApplication from "@/views/Repair/update/UpdateApplication";
import AppRepair from "@/views/Repair/repair/AppRepair";

export default {
  data() {
    return {
      cartList: [],
      isShow: false,
      dialogVisible:false,
      selectData: {},
      repairDate: {},
      searchValue: "",
      multipleSelection: [],
expands:[],
getRowKeys(row) {
        return row.applicationId;
      },
      type: "",
      json_fields: {
        维修申请单号: "applicationId",
        车架号: "vin",
        维修类别: "category",
        费用预估单: "workHours",
        预估工费: "laborCost",
        配件编码1: "productId11",

        配件编码2: "productId12",
        配件1: "product1",
        配件2: "product2",
        配件3: "product3",
        车辆编码: "carId",
        客户编码: "customerId",
        客户名称: "ctName",
        服务站编码: "serviceId",
        服务站名称: "cName",
        申请人id: "userId",
        申请人: "operator",
        上传日期: "operatorDate",
      },
      carId: [],
    };
  },
  components: {
    UpdateApplication,
    AppRepair
  },
  created() {
    this.getData();
  },
  methods: {
    hoverHandle(row, column, cell, event){
      // this.$refs.refTable.toggleRowExpansion(row);
      // console.log(row, column, cell, event)
     
      if (this.expands.includes(row.applicationId)) {
				this.expands = this.expands.filter(val => val !== row.applicationId);
			} else {
				//判断是否已经存在展开的行
				if (this.expands.length != 0) {
				//如果存在展开行,清空expands数组,使它关闭
					this.expands.splice(0, this.expands.length);
				//打开点击的行
					this.expands.push(row.applicationId);
				} else {
				//如果不存在展开行,直接push打开点击的行
					this.expands.push(row.applicationId);
				}
      }
   

    },
    getData() {
      const { page, pageSize } = this;
      this.$axios
        .post(applyInfo.query, { vin: this.searchValue })
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
    handleEdit(index, row) {
      this.selectData = { ...row };
      this.type = "编辑";
      this.isShow = true;
    },
    //申请审核
    appRepairHandle(index, row) {
     this.dialogVisible=true
    },
    
    //修改内容
    update(value) {
      this.$axios.post(applyInfo.addOrUpdate, { ...value }).then((res) => {
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
        .post(applyInfo.delete, { applicationIds: arr })
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
      let tem = [{ applicationId: row.applicationId }];
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
          arr.push({ applicationId: element.applicationId });
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
  },
};
</script>

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
.el-pagination {
  text-align: center;
  margin-top: 20px;
}
.params {
  display: flex;
  margin-bottom: 15px;
}
</style>