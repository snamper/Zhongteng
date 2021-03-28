<template>
  <div class="updateCart">
    <el-dialog
      :title="title"
      :visible.sync="isShow"
      width="50%"
      :fullscreen="false"
    >
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
              <el-form-item label="客户名称">
                <el-input v-model="selectData.ctName"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="主机厂名称">
                <el-input v-model="selectData.fName"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="单日租金">
                <el-input v-model="selectData.carRent"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="车辆订单编码">
                <el-input v-model="selectData.orderId"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item label="交付状态">
                <el-select v-model="selectData.delStatus" placeholder="请选择">
                  <el-option
                    v-for="item in jStatus"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="车辆产权证">
                <el-select
                  v-model="selectData.carProperty"
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in oStatus"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="一致性证书">
                <el-select v-model="selectData.carEqual" placeholder="请选择">
                  <el-option
                    v-for="item in oStatus"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="行驶证">
                <el-select v-model="selectData.carLicense" placeholder="请选择">
                  <el-option
                    v-for="item in oStatus"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="合格证">
                <el-select
                  v-model="selectData.certificate"
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in oStatus"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item label="上牌日期">
                <el-date-picker
                  v-model="selectData.regDate"
                  type="datetime"
                  placeholder="选择日期时间"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="年检日期">
                <el-date-picker
                  v-model="selectData.motDate"
                  type="datetime"
                  placeholder="选择日期时间"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item label="交付日期">
                <el-date-picker
                  v-model="selectData.deliveryDate"
                  type="datetime"
                  placeholder="选择日期时间"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="租赁开始日期">
                <el-date-picker
                  v-model="selectData.leaseBdate"
                  type="datetime"
                  placeholder="选择日期时间"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="租赁截止日期">
                <el-date-picker
                  v-model="selectData.leaseEdate"
                  type="datetime"
                  placeholder="选择日期时间"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="交付日期">
                <el-date-picker
                  v-model="selectData.deliveryDate"
                  type="datetime"
                  placeholder="选择日期时间"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item label="发票">
                <el-upload class="avatar-uploader" :show-file-list="false">
                  <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
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
export default {
  name: "updateCart",
  data() {
    return {
      datas: {},
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
    };
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
  computed: {
    ...mapGetters(["user_info"]),
    title() {
      return this.type == "编辑" ? "编辑车辆信息" : "添加车辆信息";
    },
  },
  methods: {
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