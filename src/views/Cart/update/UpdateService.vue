<template>
  <el-dialog :title="type" :visible.sync="isShow" @close="closeDialog">
    <el-form :model="datas" ref="ruleForm" :rules="rules">
      <el-row>
        <el-col :span="12">
          <el-form-item prop="sName" label="服务站名称" :label-width="formLabelWidth">
            <el-input v-model="datas.sName"></el-input>
          </el-form-item>
        </el-col>
        <!-- <el-col :span="12">
          <el-form-item label="服务站所在省" prop="sProvince" :label-width="formLabelWidth">
            <el-input v-model="datas.sProvince"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="服务站所在市" prop="sCity" :label-width="formLabelWidth">
            <el-input v-model="datas.sCity"></el-input>
          </el-form-item>
        </el-col> -->
        <el-col :span="12">
          <el-form-item label="客户所在省" prop="region" :label-width="formLabelWidth">
            <el-cascader size="large" :options="provinceAndCityDataPlus" v-model="datas.region" @change="handleChange"></el-cascader>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="详细地址" prop="sAddress" :label-width="formLabelWidth">
            <el-input v-model="datas.sAddress"></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item label="服务站联系人" prop="sPerson" :label-width="formLabelWidth">
            <el-input v-model="datas.sPerson"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="联系人部门" prop="sDepartment" :label-width="formLabelWidth">
            <el-input v-model="datas.sDepartment"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="联系方式" prop="sPhone" :label-width="formLabelWidth">
            <el-input v-model="datas.sPhone"></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item label="操作人" :label-width="formLabelWidth">
            <el-input v-model="datas.operator" :disabled="true"></el-input>
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
import { services } from "@/api";
import { provinceAndCityDataPlus, CodeToText } from 'element-china-area-data'
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
        sName: [
          { required: true, message: "请输入服务站名称", trigger: "blur" },
        ],
        sProvince: [
          { required: true, message: "请输入服务站所在省", trigger: "blur" },
        ],
        sCity: [
          { required: true, message: "请输入服务站所在市", trigger: "blur" },
        ],
        sAddress: [
          { required: true, message: "请输入详细地址", trigger: "blur" },
        ],
        sPerson: [{ required: true, message: "请输入联系人", trigger: "blur" }],
        sDepartment: [
          { required: true, message: "请输入联系人部门", trigger: "blur" },
        ],
        sPhone: [
          { required: true, message: "请输入联系人手机", trigger: "blur" },
        ],
      },
      provinceAndCityDataPlus,
      form: {},
      formLabelWidth: "120px",
    };
  },
  computed: {
    ...mapGetters(["user_info"]),
  },

  watch: {
    type: function (val) {
      if (val === "编辑") {
        this.$nextTick(() => {
          this.$refs["ruleForm"].clearValidate();
        });
      }
      if (val === "新增") {
        this.datas.operator = this.user_info.user_name;
      }
    },
  },

  methods: {
    closeDialog() {
      this.$parent.isShow = false;
    },
    send() {
      const { $axios, datas } = this;

      const { region } = datas;
      let ctProvince = CodeToText[region[0]];
      let ctCity = CodeToText[region[1]]

      datas.operator = this.user_info.user_name;
      datas.operatorDate = Date.now();
      datas.sProvince = ctProvince
      datas.sCity = ctCity;
      $axios
        .post(services.addOrUpdate, { ...datas })
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
  },
};
</script>

<style>
</style>