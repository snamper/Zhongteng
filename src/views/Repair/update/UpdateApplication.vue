<template>
  <el-dialog :title="type" :visible.sync="isShow" :fullscreen="false">
    <el-form :model="datas" ref="ruleForm" :rules="rules">
      <el-row>
        <el-col :span="12">
          <el-form-item
            prop="applicationId"
            label="维修申请单号"
            :label-width="formLabelWidth"
          >
            <el-input :disabled="true" v-model="datas.applicationId"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="车架号" prop="vin" :label-width="formLabelWidth">
            <el-input v-model="datas.vin" :disabled="true"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="维修类别"
            prop="category"
            :label-width="formLabelWidth"
          >
            <el-select v-model="datas.category" placeholder="请选择维修类别">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="预估工时"
            prop="workHours"
            :label-width="formLabelWidth"
          >
            <el-input v-model="datas.workHours"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="预估人工费"
            prop="laborCost"
            :label-width="formLabelWidth"
          >
            <el-input v-model="datas.laborCost"></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item
            label="配件1"
            :label-width="formLabelWidth"
            prop="product1"
          >
            <el-input v-model="datas.product1"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="配件2"
            :label-width="formLabelWidth"
            prop="product2"
          >
            <el-input v-model="datas.product2"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="配件3"
            :label-width="formLabelWidth"
            prop="product3"
          >
            <el-input v-model="datas.product3"></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item
            label="客户名称"
            :label-width="formLabelWidth"
            prop="ctName"
          >
            <el-input v-model="datas.ctName"></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item
            label="服务站名称"
            :label-width="formLabelWidth"
            prop="cName"
          >
            <el-input v-model="datas.cName"></el-input>
          </el-form-item>
        </el-col>

        <!-- <el-col :span="12">
          <el-form-item label="申请人" :label-width="formLabelWidth">
            <el-input v-model="datas.userId" :disabled="true"></el-input>
          </el-form-item>
        </el-col> -->

        <el-table-column prop="operator" label="申请人"> </el-table-column>
      <el-table-column prop="operatorDate" label="操作时间" width="180">
        <template slot-scope="scope">
          {{ scope.row.operatorDate | formatDate(true) }}
        </template>
      </el-table-column>

        <el-col :span="12">
          <el-form-item
            prop="remarks"
            label="备注"
            :label-width="formLabelWidth"
          >
            <template>
              <el-input type="textarea" v-model="datas.remarks"></el-input>
            </template>
          </el-form-item>
        </el-col>


        <el-col :span="12">
          <el-form-item label="故障图片" :label-width="formLabelWidth">
            <el-upload class="avatar-uploader" :show-file-list="false">
              <img v-if="imageUrl" :src="datas.troublePic" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="$parent.isShow = false">取 消</el-button>
      <el-button type="primary" @click="update('ruleForm')">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { mapGetters } from "vuex";
import { applyInfo } from "@/api";
export default {
  props: {
    isShow: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      default: "",
    },
    datas: {
      type: Object,
    },
  },

  data() {
    return {
      rules: {
        ctName: [
          { required: true, message: "请输入客户名称", trigger: "blur" },
        ],
        cName: [
          { required: true, message: "请输入服务站名称", trigger: "blur" },
        ],
      },

      options: [
        {
          value: "维修",
          label: "维修",
        },
        {
          value: "保养",
          label: "保养",
        },
      ],
      formLabelWidth: "120px",
    };
  },
  computed: {
    ...mapGetters(["user_info"]),
  },
  created() {
    console.log(this.user_info.user_id);
  },
  watch: {
    type: function (val) {
      if (val === "编辑") {
        this.$nextTick(() => {
          this.$refs["ruleForm"].clearValidate();
        });
      }
    },
  },

  methods: {
    send() {
      const { $axios, datas } = this;
      datas.userId = this.user_info.user_id;
      datas.appTime = Date.now();
      $axios
        .post(applyInfo.addOrUpdate, { ...datas })
        .then((res) => {
          if (res.data.errCode === 200) {
            this.$message.success(res.data.msg);
            this.$parent.getData();
            this.$parent.isShow = false;
          } else {
            this.$message.error(res.data.msg);
            this.$parent.isShow = false;
          }
        })
        .catch((e) => {
          this.$message.error(e);
          this.$parent.isShow = false;
        });
    },
    update(formName) {
      const { type } = this;
      if (type === "编辑") {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.send();
          } else {
            console.log("验证未通过");
          }
        });
      } else if (type === "新增") {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.send();
          }
        });
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