<template>
  <el-dialog :title="type" :visible.sync="isShow" @close="handleClose">
    <el-form :model="datas" ref="ruleForm" :rules="rules">
      <el-row>

        <el-col :span="12">
          <el-form-item prop="vin" label="车架号" :label-width="formLabelWidth">
            <el-input v-model="datas.vin"></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item prop="oldPart1" label="旧配件" :label-width="formLabelWidth">
            <el-input v-model="datas.oldPart1"></el-input>
          </el-form-item>
        </el-col>

        <!-- <el-col :span="12">
          <el-form-item prop="empName" label="上传人" :label-width="formLabelWidth">
            <el-input disabled v-model="datas.empName"></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item label="上传日期" prop="upDate" :label-width="formLabelWidth">
            <el-date-picker type="datetime" v-model="datas.upDate" placeholder="选择日期时间">
            </el-date-picker>
          </el-form-item>
        </el-col> -->

        <el-col :span="12">
          <el-form-item prop="ctName" label="客户名称" :label-width="formLabelWidth">
            <el-input v-model="datas.ctName"></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item prop="remarks" label="备注" :label-width="formLabelWidth">
            <el-input v-model="datas.remarks"></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item label="结算清单" :label-width="formLabelWidth">
            <ImageUpload :url="loadImgUrl" @uploadHandle="uploadHandle" ref="imgupload"></ImageUpload>
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item label="增值税发票" :label-width="formLabelWidth">
            <ImageUpload :url="loadImgUrl" @uploadHandle="uploadHandle1" ref="imgupload1"></ImageUpload>
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item label="付款申请书" :label-width="formLabelWidth">
            <ImageUpload :url="loadImgUrl" @uploadHandle="uploadHandle2" ref="imgupload2"></ImageUpload>
          </el-form-item>
        </el-col>

      </el-row>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="$parent.isShow = false">取 消</el-button>
      <el-button type="primary" @click="update('ruleForm')">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { mapGetters } from "vuex";
import { receipt, uploadImg } from "@/api";
import ImageUpload from "@/components/ImageUpload";
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

  components: {
    ImageUpload
  },
  data() {
    return {
      rules: {
        vin: [{ required: true, message: "请输入车架号", trigger: "blur" }],
        list: [{ required: true, message: "请输入结算清单", trigger: "blur" }],
        invoice: [
          { required: true, message: "请输入增值税发票", trigger: "blur" },
        ],
        appPayment: [
          { required: true, message: "请输入付款申请书", trigger: "blur" },
        ],
        oldPart1: [
          { required: true, message: "请输入配件名", trigger: "blur" },
        ],

        remarks: [{ required: false, message: "请输入备注", trigger: "blur" }],
      },

      form: {},
      formLabelWidth: "120px",
      loadImgUrl: uploadImg.upload
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
    },
    isShow: function () {
      this.$nextTick(() => {
        this.$refs.imgupload.fileList = [];
        this.$refs.imgupload1.fileList = [];
        this.$refs.imgupload2.fileList = [];
      })
    },
  },
  methods: {
    handleClose() {
      this.$parent.isShow = false;
    },
    uploadHandle(result) {
      if (result instanceof Array) {
        let imgUrl = result[0].data;
        this.datas.listRoute = imgUrl;
        this.$message.success("图片上传成功,请点击确认后保存图片!");
      }
    },
    uploadHandle1(result) {
      if (result instanceof Array) {
        let imgUrl = result[0].data;
        this.datas.invoiceRoute = imgUrl;
        this.$message.success("图片上传成功,请点击确认后保存图片!");
      }
    },
    uploadHandle2(result) {
      if (result instanceof Array) {
        let imgUrl = result[0].data;
        this.datas.appRoute = imgUrl;
        this.$message.success("图片上传成功,请点击确认后保存图片!");
      }
    },
    send() {
      const { $axios, datas } = this;
      datas.operator = this.user_info.user_name;
      datas.operatorDate = Date.now();

      $axios
        .post(receipt.addOrUpdate, { ...datas })
        .then((res) => {
          if (res.data.errCode === 200) {
            this.$message.success(res.data.msg);
            this.$parent.getData();
            this.$parent.isShow = false;
            console.log(this.$parent);
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