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
    </div>
    <el-table :data="cartList" style="width: 100%" height="700" @row-click="hoverHandle" ref="refTable" :expand-row-keys="expands" :row-key="getRowKeys">
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
            <el-form-item label="审核状态">
              <el-button size="mini" round @click="seeStatus(props.row)">查看审核状态</el-button>
            </el-form-item>
            <el-form-item label="故障图片">
              <el-button type="text" label="事故图片" @>
                {{
                props.row.troublePic
                }}
              </el-button>
            </el-form-item>

            <el-form-item label="配件">
              <el-button type="text" label="配件1">
                {{
                props.row.product1
                }}
              </el-button>
            </el-form-item>

            <el-form-item label="配件">
              <el-button type="text" label="配件2">
                {{
                props.row.product2
                }}
              </el-button>
            </el-form-item>

            <el-form-item label="配件">
              <el-button type="text" label="配件3" @click="openlist">
                {{
                props.row.product3
                }}
              </el-button>
            </el-form-item>

            <el-form-item label="维修服务站">
              <span>{{ props.row.cName }}</span>
            </el-form-item>

            <el-form-item label="费用预估单">
              <el-button type="text" label="事故图片" @click="openlist">
                {{
                props.row.workHours
                }}
              </el-button>
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
      <el-table-column label="申请单号" prop="applicationId" width="100"></el-table-column>
      <el-table-column label="上传日期" prop="operatorDate">
        <template slot-scope="scope">{{ scope.row.operatorDate | formatDate(true) }}</template>
      </el-table-column>
      <el-table-column label="车架号" prop="vin"></el-table-column>
      <el-table-column label="客户名称" prop="ctName"></el-table-column>
      <el-table-column label="维修类别" prop="category"></el-table-column>
      <el-table-column label="申请人" prop="operator"></el-table-column>

      <el-table-column label="描述" prop="remarks"></el-table-column>

      <el-table-column label="操作" fixed="right" width="200">
        <template slot-scope="scope">
          <el-button size="mini" type="success" slot="reference" @click="handleEdit(scope.$index, scope.row)" v-if="hiddens">审核</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination @current-change="handleCurrentChange" :current-page.sync="page" :page-size="pageSize" layout="total, prev, pager, next" :total="totalArr.length - 1"></el-pagination>

    <UpdateApplication :isShow="isShow" @success="success"></UpdateApplication>

    <!-- 查看审核状态 -->
    <ClickSatus :statusData="statusData" ref="statusRef"></ClickSatus>
  </div>
</template>


<script>
import { applyInfo } from "@/api";
import UpdateApplication from "@/views/Repair/update/ApplyExamine.vue";
import { status } from "@/config";
import { filterObj, hiddenBtn } from '@/config'
import ClickSatus from '@/components/ClickSatus'
import _ from 'lodash'
export default {
  props: {
    filterType: {
      type: String,
      required: true
    },
  },
  computed: {
    hiddens() {
      if (hiddenBtn.includes(this.filterType)) {
        return false
      } else {
        return true
      }
    },
  },
  data() {
    return {
      cartList: [],
      isShow: false,

      selectData: {},

      searchValue: "",
      statusData: null,
      expands: [],
      getRowKeys(row) {
        return row.applicationId;
      },

    };
  },
  components: {
    UpdateApplication,
    ClickSatus
  },
  created() {
    if (this.filterType) {
      this.getData();
    }



  },
  methods: {
    hoverHandle(row, column, cell, event) {

      if (this.expands.includes(row.applicationId)) {
        this.expands = this.expands.filter((val) => val !== row.applicationId);
      } else {

        if (this.expands.length != 0) {

          this.expands.splice(0, this.expands.length);

          this.expands.push(row.applicationId);
        } else {

          this.expands.push(row.applicationId);
        }
      }
    },

    getData() {
      const { page, pageSize, filterType } = this;
      const filters = filterObj[filterType];
      this.$axios
        .post(applyInfo.query, { vin: this.searchValue })
        .then((res) => {
          const data = res.data;
          if (data.errCode == 200) {
            let datas = data.data;
            var newData = filters(datas)
            this.cartList = this.paging(page, pageSize, newData);
            this.totalArr = newData;
          } else {
            this.$message(data.msg);
          }
        });
    },
    handleEdit(index, row) {
      this.isShow = true;
      this.selectData = row;
    },
    async success(text, type) {
      const { applicationId } = this.selectData;
      this.isShow = false;

      if (type === "通过") {
        let result = await this.$axios.post(applyInfo.addOrUpdate, {
          applicationId,
          examStatus1: status[type],
        });
        if (result.data.errCode === 200) {
          this.$message.success(result.data.msg);
          this.getData();
        } else {
          this.$message.error(result.data.msg);
        }
      } else if (type === "不通过") {
        let result = await this.$axios.post(applyInfo.addOrUpdate, {
          applicationId,
          examStatus1: status[type],
          examDevice1: text,
        });
        if (result.data.errCode === 200) {
          this.$message.success(result.data.msg);
          this.getData();
        } else {
          this.$message.error(result.data.msg);
        }
      }
    },
    //申请审核
    appRepairHandle(index, row) {
      this.dialogVisible = true;
    },

    //查询内容
    queryClick() {
      this.getData();
    },
    seeStatus(row) {
      this.$refs.statusRef.dialogVisible = true
      this.statusData = row;
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