<template>
  <div class="cart">
    <div class="params">
      <el-row>
        <el-col :span="18">
          <el-input v-model="searchValue" placeholder="请输入服务站名称"></el-input>
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
    <el-table :data="cartList" style="width: 100%" border @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column prop="serviceId" label="服务站编码" width="100">
      </el-table-column>

      <el-table-column prop="type" label="服务站类型" align="center" width="150">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.type == 1">自建型</el-tag>
          <el-tag v-if="scope.row.type == 2">合作型</el-tag>
          <el-tag v-if="scope.row.type == 3">主机厂</el-tag>
        </template>
      </el-table-column>

      <el-table-column prop="sName" label="服务站名称" width="150">
      </el-table-column>
      <el-table-column prop="sProvince" label="所在省" width="150">
      </el-table-column>
      <el-table-column prop="sCity" label="所在市" width="200">
      </el-table-column>
      <el-table-column prop="sAddress" label="详细地址" width="200">
      </el-table-column>
      <el-table-column prop="sPerson" label="联系人"> </el-table-column>
      <el-table-column prop="sDepartment" label="部门"> </el-table-column>
      <el-table-column prop="sPhone" label="联系方式" width="120">
      </el-table-column>
      <el-table-column prop="licRoute" label="营业执照" width="120" align="center">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="点击查看图片" placement="top">
            <el-button @click="seeLicRoute(scope.row)" icon="el-icon-picture" circle></el-button>
          </el-tooltip>
        </template>
      </el-table-column>

      <el-table-column prop="operator" label="操作人"> </el-table-column>
      <el-table-column prop="operatorDate" label="操作时间" width="180">
        <template slot-scope="scope">
          {{ scope.row.operatorDate | formatDate(true) }}
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
    <UpdateService :isShow="isShow" :datas="selectData" :update="update" :type="type"></UpdateService>
    <SeeImg ref="imgRef" :imgBase64="imgBase64"></SeeImg>
  </div>
</template>

<script>
import { services, uploadImg } from "@/api";
import UpdateService from "./update/UpdateService";
import SeeImg from '@/components/SeeImg'
import {
  TextToCode,
  provinceAndCityDataPlus,
  CodeToText,
} from "element-china-area-data";
export default {
  data() {
    return {
      cartList: [],
      pagesize: 9, //每页的数据条数
      currentPage: 1, //默认开始页面
      isShow: false,
      selectData: {},
      searchValue: "",
      selectDelete: [], //单条删除
      multipleSelection: [],
      type: "",
      json_fields: {
        服务站编码: "serviceId",
        服务站名称: "sName",
        服务站所在省: "sProvince",
        服务站所在市: "sCity",
        联系人部门: "sDepartment",
        联系方式: "sPhone",
        操作人: "operator",
        操作时间: "operatorDate",
      },
      imgBase64: ''
    };
  },
  components: {
    UpdateService,
    SeeImg
  },
  created() {
    this.getData();
  },
  methods: {
    seeLicRoute(raw) {
      const { licRoute } = raw
      let _self = this;
      if (!licRoute) {
        this.$message.error('暂无上传图片')
      } else {
        this.$axios.post(uploadImg.download, { fileName: licRoute }).then(res => {
          let img = res.data;
          _self.imgBase64 = img;

          _self.$refs.imgRef.dialogVisible = true;
          console.log(_self.$refs.imgRef.dialogVisible)
        }).catch(e => {
          this.$message.error(e)
        })
      }

    },
    getData() {
      this.$axios
        .post(services.query, { sName: this.searchValue })
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
      let { ctProvince, ctCity } = row;
      let cityCode = "";
      let ctProvinceCode = "";

      if (TextToCode[ctProvince]) {
        ctProvinceCode = TextToCode[ctProvince].code;
      }
      if (TextToCode[ctProvince] && TextToCode[ctProvince][ctCity]) {
        cityCode = TextToCode[ctProvince][ctCity].code;
      }
      row.region = [ctProvinceCode, cityCode];
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
          .post(services.delete, {
            servicesIds: params,
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
      this.multipleSelection = [{ serviceId: row.serviceId }];
      this.deletesHandle(this.multipleSelection);
    },
    handleSelectionChange(val) {
      let arr = [];
      if (val.length <= 0) {
        this.selectDelete = [];
      } else {
        val.forEach((item) => {
          console.log(item.insuranceId);
          arr.push({ serviceId: item.serviceId });
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