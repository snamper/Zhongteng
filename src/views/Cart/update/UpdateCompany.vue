<template>
  <el-dialog :title="type" :visible.sync="isShow">
    <el-form :model="datas" ref="ruleForm" :rules="rules">
      <el-row>
        <el-col :span="12">
          <el-form-item
            prop="companyId"
            label="车型名称"
            :label-width="formLabelWidth"
          >
            <el-input v-model="datas.companyId"></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item
            label="保险公司"
            prop="company"
            :label-width="formLabelWidth"
          >
            <el-input v-model="datas.company"></el-input>
          </el-form-item>
        </el-col>
    

        <el-col :span="12">
          <el-form-item
            label="联系人"
            prop="person"
            :label-width="formLabelWidth"
          >
            <el-input v-model="datas.person"></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item
            label="手机号"
            prop="phone"
            :label-width="formLabelWidth"
          >
            <el-input v-model="datas.phone"></el-input>
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
import { company } from "@/api";
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
      cartFactory: [],
      rules: {
        carName: [{ required: true, message: "请输入名称", trigger: "blur" }],
        carSpec: [{ required: true, message: "请输入规格", trigger: "blur" }],
        fName: [{ required: true, message: "请输入厂家名称", trigger: "blur" }],
      },
      form: {},
      formLabelWidth: "120px",
    };
  },
  created() {
    this.getDataFactory();
  },

  computed: {
    ...mapGetters(["user_info"]),
    title() {
      return this.type == "编辑" ? "编辑车辆信息" : "添加车辆信息";
    },
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
      datas.operator = this.user_info.user_name;
      datas.operatorDate = Date.now();

      $axios
        .post(company.addOrUpdate, { ...datas })
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
    getDataFactory() {
      this.$axios.post(company.query, { companyId: this.searchValue }).then((res) => {
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
  },
};
</script>

<style lang='scss'>
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