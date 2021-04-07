<template>
  <div class="updateCart">
    <el-dialog :title="title" :visible.sync="isShow" width="50%" :fullscreen="false" @close="closeDialog" :modal-append-to-body="false">
      <div class="body">
        <el-form ref="form" :model="selectData" label-width="100px">
          <el-row>
            <el-col :span="12">
              <el-form-item label="车架号">
                <el-input v-model="selectData.vin"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="发动机号">
                <el-input v-model="selectData.engine"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="车牌号">
                <el-input v-model="selectData.carNumber"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item label="车型名称">
                <el-select v-model="selectData.carName" filterable placeholder="请选择">
                  <el-option v-for="item in cartModel" :key="item.value" :label="item.carName" :value="item.carName">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item label="客户名称">
                <el-select v-model="selectData.ctName" filterable placeholder="请选择">
                  <el-option v-for="item in cartCustomer" :key="item.value" :label="item.ctName" :value="item.ctName">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item label="主机厂名称">
                <el-select v-model="selectData.fName" filterable placeholder="请选择">
                  <el-option v-for="item in cartFactory" :key="item.value" :label="item.fName" :value="item.fName">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item label="单日租金">
                <el-input v-model="selectData.carRent"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="车辆订单编码">
                <el-select v-model="selectData.orderId" filterable placeholder="请选择">
                  <el-option v-for="item in cartOrder" :key="item.value" :label="item.orderId" :value="item.orderId">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item label="交付状态">
                <el-select v-model="selectData.delStatus" placeholder="请选择">
                  <el-option v-for="item in jStatus" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="车辆产权证">
                <el-select v-model="selectData.carProperty" placeholder="请选择">
                  <el-option v-for="item in oStatus" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="一致性证书">
                <el-select v-model="selectData.carEqual" placeholder="请选择">
                  <el-option v-for="item in oStatus" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="行驶证">
                <el-select v-model="selectData.carLicense" placeholder="请选择">
                  <el-option v-for="item in oStatus" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item label="合格证">
                <el-select v-model="selectData.certificate" placeholder="请选择">
                  <el-option v-for="item in oStatus" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item label="上牌日期">
                <el-date-picker v-model="selectData.regDate" type="datetime" placeholder="选择日期时间">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="年检日期">
                <el-date-picker v-model="selectData.motDate" type="datetime" placeholder="选择日期时间">
                </el-date-picker>
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item label="交付日期">
                <el-date-picker v-model="selectData.deliveryDate" type="datetime" placeholder="选择日期时间">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="租赁开始日期">
                <el-date-picker v-model="selectData.leaseBdate" type="datetime" placeholder="选择日期时间">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="租赁截止日期">
                <el-date-picker v-model="selectData.leaseEdate" type="datetime" placeholder="选择日期时间">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="交付日期">
                <el-date-picker v-model="selectData.deliveryDate" type="datetime" placeholder="选择日期时间">
                </el-date-picker>
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item label="发票">
                <ImageUpload :url="loadImgUrl" @uploadHandle="uploadHandle" ref="imgupload"></ImageUpload>
                <!-- <el-upload list-type="picture-card" multiple :on-preview="handlePictureCardPreview" :on-change="fileChange" :on-remove="handleRemove" :file-list="fileList" :auto-upload="false" :headers="imgHeaders">
                  <i class="el-icon-plus"></i>
                </el-upload>
                <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button> -->
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>

      <div slot="footer" class="dialog-footer">
        <el-button @click="$parent.isShow = false">取 消</el-button>
        <el-button type="primary" @click="handleClose">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { order, customer, cartModel, factory, uploadImg } from "@/api";
import ImageUpload from '@/components/ImageUpload'
export default {
  name: "updateCart",
  components: {
    ImageUpload
  },
  data() {
    return {
      datas: {},
      cartFactory: [],
      cartModel: [],
      cartOrder: [],
      cartCustomer: [],
      jStatus: [
        {
          value: "0",
          label: "未交付",
        },
        {
          value: "1",
          label: "已交付",
        },
      ],
      oStatus: [
        {
          value: "1",
          label: "已确认",
        },
        {
          value: "0",
          label: "未确认",
        },
      ],
      loadImgUrl: '',
      imgHeaders: {
        'Content-Type': 'multipart/form-data'
      },

      dialogVisible: false,
    };
  },
  created() {
    this.getDataFactory();
    this.getDataCarType();
    this.getDataOrder();
    this.getDataCustomer();
    this.loadImgUrl = uploadImg.upload
  },
  props: {
    isShow: {
      require: true,
      default: false,
    },
    selectData: {
      require: true,
      type: Object,
    },
    type: {
      require: true,
      type: String,
    },
  },
  watch: {
    isShow: function () {
      this.$refs.imgupload.fileList = []
    }
  },
  computed: {
    ...mapGetters(["user_info"]),
    title() {
      return this.type == "编辑" ? "编辑车辆信息" : "添加车辆信息";
    },
  },
  methods: {
    uploadHandle(result) {
      if (result instanceof Array) {
        let imgUrl = result[0].data
        this.selectData.leaseRoute = imgUrl
        this.$message.success('图片上传成功,请点击确认后保存图片!')
      }
    },


    closeDialog() {
      this.$parent.isShow = false;
    },
    handleClose() {
      if (this.type == "编辑") {
        this.$parent.isShow = false;
        this.selectData.operator = this.user_info.user_name;
        this.selectData.operatorDate = Date.now();
        this.$parent.update(this.selectData);
      } else {
        this.selectData.operator = this.user_info.user_name;
        this.selectData.operatorDate = Date.now();
        this.$parent.isShow = false;
        this.$parent.addCartClick(this.selectData);
      }
    },
    getDataFactory() {
      this.$axios.post(factory.query, { vin: this.searchValue }).then((res) => {
        const data = res.data;
        if (data.errCode == 200) {
          this.cartFactory = this.paging(this.page, this.pageSize, data.data);
          this.totalArr = data.data;
          this.type = "";
        } else {
          this.$message(data.msg);
        }
      });
    },
    getDataCarType() {
      const { page, pageSize } = this;
      this.$axios
        .post(cartModel.query, { carName: this.searchValue })
        .then((res) => {
          const data = res.data;
          if (data.errCode == 200) {
            this.cartModel = this.paging(page, pageSize, data.data);
            this.totalArr = data.data;
            this.type = "";
          } else {
            this.$message(data.msg);
          }
        });
    },
    getDataOrder() {
      this.$axios.post(order.query, { vin: this.searchValue }).then((res) => {
        const data = res.data;
        if (data.errCode == 200) {
          this.cartOrder = this.paging(this.page, this.pageSize, data.data);
          this.totalArr = data.data;
          this.type = "";
        } else {
          this.$message(data.msg);
        }
      });
    },
    getDataCustomer() {
      this.$axios.post(customer.queryCustomerList, { ctName: this.ctName, }).then((res) => {
        const data = res.data;
        if (data.errCode == 200) {
          this.cartCustomer = this.paging(this.page, this.pageSize, data.data);
          this.totalArr = data.data;
          this.type = "";
        } else {
          this.$message(data.msg);
        }
      });
    },

  },
};
</script>

<style lang='scss' >
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.el-upload--text {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
</style>