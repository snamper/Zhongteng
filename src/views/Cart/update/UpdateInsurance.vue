<template>
  <el-dialog :title="type" :visible.sync="isShow" @close="closeDialog">
    <el-form :model="datas" ref="ruleForm" :rules="rules">
      <el-row>
        <el-col :span="12">
          <el-form-item prop="vin" label="车架号" :label-width="formLabelWidth">
            <el-input v-model="datas.vin"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="保单号" prop="policyNum" :label-width="formLabelWidth">
            <el-input v-model="datas.policyNum"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="保险公司" prop="insuranceCp" :label-width="formLabelWidth">
            <el-input v-model="datas.insuranceCp"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="联系人" prop="insPerson" :label-width="formLabelWidth">
            <el-input v-model="datas.insPerson"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="手机" prop="insPhone" :label-width="formLabelWidth">
            <el-input v-model="datas.insPhone"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="商保开始日期" prop="busBegdate" :label-width="formLabelWidth">
            <el-date-picker type="datetime" v-model="datas.busBegdate" placeholder="选择日期时间">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="商保截止日期" prop="busEnddate" :label-width="formLabelWidth">
            <el-date-picker type="datetime" v-model="datas.busEnddate" placeholder="选择日期时间">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item prop="busCost" label="商保费用" :label-width="formLabelWidth">
            <el-input v-model="datas.busCost"></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item label="交强险开始日" prop="traBegdate" :label-width="formLabelWidth">
            <el-date-picker type="datetime" v-model="datas.traBegdate" placeholder="选择日期时间">
            </el-date-picker>
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item label="交强险截止日" prop="traEnddate" :label-width="formLabelWidth">
            <el-date-picker type="datetime" v-model="datas.traEnddate" placeholder="选择日期时间">
            </el-date-picker>
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item label="交强险费用" prop="traCost" :label-width="formLabelWidth">
            <el-input v-model="datas.traCost"></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item label="保单" :label-width="formLabelWidth">
            <ImageUpload :url="loadImgUrl" @uploadHandle="uploadHandle" ref="imgupload"></ImageUpload>
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
import ImageUpload from "@/components/ImageUpload";
import { mapGetters } from "vuex";
import { insurance, uploadImg } from "@/api";
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
    selectData: {
      require: true,
      type: Object,
    },
    datas: {
      type: Object,
    },
  },
  components: {
    ImageUpload
  },
  data() {
    return {
      rules: {
        vin: [{ required: true, message: "请输入车架号", trigger: "blur" }],
        policyNum: [
          { required: true, message: "请输入保单号", trigger: "blur" },
        ],
        insuranceCp: [
          { required: true, message: "请输入保险公司", trigger: "blur" },
        ],
        insPerson: [
          { required: true, message: "请输入联系人", trigger: "blur" },
        ],
        insPhone: [
          { required: true, message: "请输入联系人手机", trigger: "blur" },
        ],
        busBegdate: [
          { required: true, message: "请输入商保开始日期", trigger: "blur" },
        ],
        busEnddate: [
          { required: true, message: "请输入商保截止日期", trigger: "blur" },
        ],
        busCost: [
          { required: true, message: "请输入商保费用", trigger: "blur" },
        ],
        traBegdate: [
          { required: true, message: "请输入交强险开始日期", trigger: "blur" },
        ],
        traEnddate: [
          { required: true, message: "请输入交强险截止日期", trigger: "blur" },
        ],
        traCost: [
          { required: true, message: "请输入交强险费用", trigger: "blur" },
        ],
      },
      loadImgUrl: uploadImg.upload,
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
    isShow: function () {

      this.$nextTick(() => {

        this.$refs.imgupload.fileList = [];

      })

    }
  },

  methods: {
    uploadHandle(result) {
      if (result instanceof Array) {
        let imgUrl = result[0].data;
        this.datas.policyRoute = imgUrl;

        this.$message.success("图片上传成功,请点击确认后保存图片!");
      }
    },
    closeDialog() {
      this.$parent.isShow = false;
    },
    send() {
      const { $axios, datas } = this;
      datas.insOperator = this.user_info.user_name;
      datas.insOptdate = Date.now();
      $axios
        .post(insurance.addOrUpdate, { ...datas })
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