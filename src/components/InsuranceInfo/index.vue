<template>

  <div class="cart">
    <div class="params">
      <el-row>
        <el-col :span="12" style="display:flex">
          <el-input v-model="searchValue" placeholder="请输入车架号"></el-input>
          <el-button type="primary" @click="queryClick">查询</el-button>
        </el-col>
        <el-col :span="12" style="display:flex">
          <el-button type="primary" @click="addCart">增加</el-button>
          <el-button type="danger" @click="deletesAll">批量删除</el-button>

          <download-excel class="export-excel-wrapper" :data="cartList" :fields="json_fields">
            <!-- 上面可以自定义自己的样式，还可以引用其他组件button -->
            <el-button type="primary">导出EXCEL</el-button>
          </download-excel>
        </el-col>
      </el-row>

    </div>
    <el-table :data="cartList" style="width: 100%" height="700" border @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column fixed prop="insuranceId" label="保单编码" width="80">
      </el-table-column>
      <el-table-column fixed prop="vin" label="车架号" width="180">
      </el-table-column>
      <el-table-column prop="policyNum" label="保单号" width="150">
      </el-table-column>
      <el-table-column prop="insuranceCp" label="保险公司" width="100">
      </el-table-column>
      <el-table-column prop="insPerson" label="联系人" width="90">
      </el-table-column>
      <el-table-column prop="insPhone" label="手机" width="120">
      </el-table-column>
      <el-table-column prop="busBegdate" label="保单" width="120" align="center">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="点击查看图片" placement="right">
            <el-button @click="seeProRoute(scope.row.policyRoute)" icon="el-icon-picture" circle></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
      <!-- <el-table-column prop="busBegdate" label="商保开始日期" width="120">
        <template slot-scope="scope">
          {{ scope.row.busBegdate | formatDate }}
        </template>
      </el-table-column> -->
      <el-table-column prop="busEnddate" label="商保到期日" width="120">
        <template slot-scope="scope">
          {{ scope.row.busEnddate | formatDate }}
        </template>
      </el-table-column>
      <el-table-column prop="busCost" label="商保费用" width="80">
      </el-table-column>
      <!-- <el-table-column prop="traBegdate" label="交强险开始日期" width="120">
        <template slot-scope="scope">
          {{ scope.row.traBegdate | formatDate }}
        </template>
      </el-table-column> -->

      <el-table-column prop="traEnddate" label="交强险到期日" width="120">
        <template slot-scope="scope">
          {{ scope.row.traEnddate | formatDate }}
        </template>
      </el-table-column>

      <el-table-column prop="traCost" label="交强险费用" width="100">
      </el-table-column>

      <el-table-column prop="insOperator" label="操作人" width="150">
      </el-table-column>
      <el-table-column prop="insOptdate" label="操作时间" width="180">
        <template slot-scope="scope">
          {{ scope.row.insOptdate | formatDate(true) }}
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
    <update-insurance :isShow="isShow" :datas="selectData" :update="update" :type="type"></update-insurance>
    <SeeImg ref="imgRef" :imgBase64="imgBase64"></SeeImg>
  </div>
</template>

<script>
import { insurance, uploadImg } from "@/api";
import SeeImg from '@/components/SeeImg'
import UpdateInsurance from "@/views/Cart/update/UpdateInsurance.vue";

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
      imgBase64: '',
      json_fields: {
        保单编码: "insuranceId",
        车架号: "vin",
        保单号: "policyNum",
        保险公司: "insuranceCp",
        联系人: "insPerson",
        手机: "insPhone",
        商保开始日期: "busBegdate",
        商保截止日期: "busEnddate",
        商保费用: "busCost",
        交强险开始日期: "traBegdate",
        交强险截止日期: "traEnddate",
        交强险费用: "traCost",

        操作人: "insOperator",
        操作时间: "insOptdate",
      },
    };
  },
  components: {
    UpdateInsurance,
    SeeImg
  },
  created() {
    this.getData();
  },
  methods: {
    seeProRoute(imgUrl) {

      console.log(imgUrl)
      if (!imgUrl) {
        this.$message.error('暂无上传图片')
      } else {
        this.$axios.post(uploadImg.download, { fileName: imgUrl }).then(res => {
          let img = res.data;
          this.imgBase64 = img;
          console.log(img)
          this.$refs.imgRef.dialogVisible = true;
        }).catch(e => {
          this.$message.error(e)
        })
      }

    },
    getData() {
      this.$axios
        .post(insurance.query, { vin: this.searchValue })
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
          .post(insurance.delete, {
            insuranceIds: params,
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
      this.multipleSelection = [{ insuranceId: row.insuranceId }];
      this.deletesHandle(this.multipleSelection);
    },
    handleSelectionChange(val) {
      let arr = [];
      if (val.length <= 0) {
        this.selectDelete = [];
      } else {
        val.forEach((item) => {
          console.log(item.insuranceId);
          arr.push({ insuranceId: item.insuranceId });
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