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
    </div>
    <el-table :data="cartList" style="width: 100%" height="700" @row-click="hoverHandle" ref="refTable" :expand-row-keys="expands" :row-key="getRowKeys">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="回执单号">
              <span>{{ props.row.receiptId }}</span>
            </el-form-item>
            <el-form-item label="车架号">
              <span>{{ props.row.vin }}</span>
            </el-form-item>

            <el-form-item label="结算清单">
              <el-tooltip class="item" effect="dark" content="点击查看图片" placement="right">
                <el-button @click="seeProRoute(props.row.listRoute)" icon="el-icon-picture" circle></el-button>
              </el-tooltip>
            </el-form-item>
            <el-form-item label="增值税发票">
              <el-tooltip class="item" effect="dark" content="点击查看图片" placement="right">
                <el-button @click="seeProRoute(props.row.invoiceRoute)" icon="el-icon-picture" circle></el-button>
              </el-tooltip>
            </el-form-item>
            <el-form-item label="付款申请书">
              <el-tooltip class="item" effect="dark" content="点击查看图片" placement="right">
                <el-button @click="seeProRoute(props.row.appRoute)" icon="el-icon-picture" circle></el-button>
              </el-tooltip>
            </el-form-item>

            <el-form-item label="旧配件">
              <el-button type="text" label="旧配件" @click="openlist">{{
                props.row.oldPart1
              }}</el-button>
            </el-form-item>

            <el-form-item label="审核状态">
              <el-button size="mini" round @click.stop="seeStatus(props.row)">查看审核状态</el-button>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column label="申请单号" prop="receiptId" width="100">
      </el-table-column>
      <el-table-column label="上传日期" prop="operatorDate">
        <template slot-scope="scope">
          {{ scope.row.operatorDate | formatDate(true) }}
        </template>
      </el-table-column>
      <el-table-column label="车架号" prop="vin"> </el-table-column>
      <el-table-column label="客户名称" prop="ctName"> </el-table-column>

      <el-table-column label="申请人" prop="operator"> </el-table-column>
      <el-table-column label="描述" prop="remarks"> </el-table-column>
      <el-table-column label="操作" fixed="right" width="200">
        <template slot-scope="scope">
          <el-button size="mini" type="success" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <!-- <el-popconfirm title="是否删除此条数据?">           
          </el-popconfirm> -->
          <el-popconfirm confirm-button-text="好的" cancel-button-text="不用了" icon="el-icon-info" icon-color="red" title="这是一段内容确定删除吗？" @confirm="handleDelete(scope.$index, scope.row)">
            <el-button size="mini" type="danger" slot="reference">删除</el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination @current-change="handleCurrentChange" :current-page.sync="page" :page-size="pageSize" layout="total, prev, pager, next" :total="totalArr.length - 1">
    </el-pagination>
    <!-- 查看审核状态 -->
    <ClickSatus :statusData="statusData" :steepVisible="steepVisible" ref="statusRef"></ClickSatus>
    <UpdateReceipt :isShow="isShow" :datas="selectData" :update="update" :type="type"></UpdateReceipt>
    <receipt :isShow="isShow" :datas="selectData" :update="update" :type="type"></receipt>
    <SeeImg ref="imgRef" :imgBase64="imgBase64"></SeeImg>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { receipt, uploadImg } from "@/api";
import UpdateReceipt from "@/views/Repair/update/UpdateReceipt";
import ClickSatus from "@/components/ClickSatus";
import SeeImg from '@/components/SeeImg'
export default {
  props: {
    datas: {
      type: Object,
    },
  },

  data() {
    return {
      cartList: [],
      isShow: false,
      selectData: {},
      searchValue: "",
      expands: [],
      statusData: false,
      steepVisible: false,
      getRowKeys(row) {
        return row.receiptId;
      },
      imgBase64: '',

    };
  },
  watch: {
    isShow: function (val) {
      console.log(val)
    }
  },
  computed: {
    ...mapGetters(["user_info"]),
  },

  components: {
    receipt,
    UpdateReceipt,
    ClickSatus,
    SeeImg
  },
  created() {
    this.getData();
  },

  methods: {
    seeProRoute(imgUrl) {


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
    hoverHandle(row, column, cell, event) {
      // this.$refs.refTable.toggleRowExpansion(row);
      // console.log(row, column, cell, event)

      if (this.expands.includes(row.receiptId)) {
        this.expands = this.expands.filter((val) => val !== row.receiptId);
      } else {
        //判断是否已经存在展开的行
        if (this.expands.length != 0) {
          //如果存在展开行,清空expands数组,使它关闭
          this.expands.splice(0, this.expands.length);
          //打开点击的行
          this.expands.push(row.receiptId);
        } else {
          //如果不存在展开行,直接push打开点击的行
          this.expands.push(row.receiptId);
        }
      }
    },

    getData() {
      this.$axios
        .post(receipt.query, {
          vin: this.searchValue,
          userId: this.user_info.user_id,
        })
        .then((res) => {
          const data = res.data;
          if (data.errCode == 200) {

            this.cartList = this.paging(this.page, this.pageSize, data.data);
            this.totalArr = data.data;
            this.type = "";
            // console.log(this.isShow)

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
      this.getData();
    },
    delete(arr) {
      this.$axios.post(receipt.delete, { receiptIds: arr }).then((res) => {
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
      let tem = [{ receiptId: row.receiptId }];
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
          arr.push({ receiptId: element.receiptId });
        });
        this.delete(arr);
      });
      //   this.handleDelete()
    },
    //增加
    addCart() {
      this.selectData = {};
      this.isShow = true;
      this.type = '新增'
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
