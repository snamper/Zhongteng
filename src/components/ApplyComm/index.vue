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

            <el-form-item label="维修服务站">
              <span>{{ props.row.cName }}</span>
            </el-form-item>

            <el-form-item label="故障图片">
              <el-button type="text" label="事故图片" @>
                {{ props.row.troublePic }}
              </el-button>
            </el-form-item>

            <el-form-item label="配件">
              <el-button type="text" label="配件">
                {{ props.row.product1 }}
              </el-button>
            </el-form-item>

            <el-form-item label="费用预估单">
              <el-button type="text" label="事故图片" @click="openlist">
                {{ props.row.workHours }}
              </el-button>
            </el-form-item>

            <el-form-item label="预估费用">
              <span>{{ props.row.laborCost }}</span>
            </el-form-item>

            <el-form-item label="问题描述">
              <span>{{ props.row.remarks }}</span>
            </el-form-item>

            <el-form-item label="审核状态">
              <el-button size="mini" round @click.stop="seeStatus(props.row)">查看审核状态</el-button>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column label="申请单号" prop="applicationId" width="100"></el-table-column>
      <el-table-column label="上传日期" prop="operatorDate">
        <template slot-scope="scope">{{
          scope.row.operatorDate | formatDate(true)
        }}</template>
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
    <ApplyExamine :isShow="isShow" @success="success"></ApplyExamine>
    <!-- 查看审核状态 -->
    <ClickSatus :statusData="statusData" :steepVisible="steepVisible" ref="statusRef"></ClickSatus>
  </div>
</template>


<script>
import { mapGetters } from "vuex";
import { repairApi } from '@/api'
import ApplyExamine from "@/views/Repair/update/ApplyExamine.vue";
import ClickSatus from "@/components/ClickSatus";
import { hiddenBtn, status, sendFiled } from '@/config'
import _ from "lodash";
export default {
  props: {

    typeApi: {
      type: String,
      required: true,
    },

  },

  data() {
    return {
      cartList: [],
      isShow: false,
      searchValue: "",
      selectData: {},
      statusData: false,
      expands: [],
      getRowKeys(row) {
        return row.applicationId;
      },
      steepVisible: false,
    };
  },

  components: {
    ApplyExamine,
    ClickSatus,
  },

  computed: {
    ...mapGetters(["user_info"]),
    hiddens() {
      let tem = hiddenBtn.includes(this.typeApi);
      return tem ? false : true
    },
  },

  created() {
    this.getData();

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
      console.log(this.typeApi);
      let query = repairApi[this.typeApi].query
      console.log(this.typeApi)
      this.$axios
        .post(query, {
          vin: this.searchValue,
          userId: this.user_info.user_id,
        })
        .then((res) => {
          const data = res.data;
          if (data.errCode == 200) {
            this.cartList = this.paging(this.page, this.pageSize, data.data);
            this.totalArr = data.data;

          } else {
            this.$message(data.msg);
          }
        });
    },
    handleEdit(index, row) {

      this.isShow = true;
      this.selectData = row;
    },
    async success(text, types) {

      let update = repairApi[this.typeApi].update;

      const { applicationId } = this.selectData;
      this.isShow = false;

      if (types === "通过") {
        let params = sendFiled[this.typeApi]('1');


        let result = await this.$axios.post(update, {
          applicationId,
          ...params,
        });
        if (result.data.errCode === 200) {
          this.$message.success(result.data.msg);
          this.getData();
        } else {
          this.$message.error(result.data.msg);
        }
      } else if (types === "不通过") {
        let params = sendFiled[this.typeApi]('0', text);

        let result = await this.$axios.post(update, {
          applicationId,
          ...params,
        });
        if (result.data.errCode === 200) {
          this.$message.success(result.data.msg);
          this.getData();
        } else {
          this.$message.error(result.data.msg);
        }
      }
    },

    //查询内容
    queryClick() {
      this.getDate();

    },
    seeStatus(row) {
      this.steepVisible = true;

      this.statusData = row
    },
  },
};
</script>

<style scope>
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