<template>
  <el-dialog :title="type" :visible.sync="isShow" :fullscreen="false" @close="handleClose">
    <el-form :model="datas" ref="ruleForm" :rules="rules">
      <el-row>
        <el-col :span="12">
          <el-form-item prop="applicationId" label="维修申请单号" :label-width="formLabelWidth">
            <el-input :disabled="true" v-model="datas.applicationId"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="车架号" prop="vin" :label-width="formLabelWidth">
            <el-input v-model="datas.vin" :disabled="false"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="维修类别" prop="category" :label-width="formLabelWidth">
            <el-select v-model="datas.category" placeholder="请选择维修类别">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item label="客户名称" :label-width="formLabelWidth" prop="ctName">
            <el-input v-model="datas.ctName"></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item :label-width="formLabelWidth" label="服务站">
            <el-select v-model="datas.cName" filterable placeholder="请选择">
              <el-option v-for="item in cartServices" :key="item.sName" :label="item.sName" :value="item.sName">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item label="预估人工费" prop="laborCost" :label-width="formLabelWidth">
            <el-input v-model="datas.laborCost"></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item label="配件" :label-width="formLabelWidth" prop="product1">
            <el-input v-model="datas.product1"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="配件" :label-width="formLabelWidth" prop="product1">
            <el-input v-model="datas.product1"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="申请人" :label-width="formLabelWidth" prop="operator">
            <el-input v-model="datas.operator" :disabled="false"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item prop="remarks" label="备注" :label-width="formLabelWidth">
            <template>
              <el-input type="textarea" v-model="datas.remarks"></el-input>
            </template>
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item label="故障图片" :label-width="formLabelWidth">
            <ImageUpload :url="loadImgUrl" @uploadHandle="uploadHandle1" ref="imgupload1"></ImageUpload>
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item label="费用预估单" :label-width="formLabelWidth">
            <ImageUpload :url="loadImgUrl" @uploadHandle="uploadHandle2" ref="imgupload2"></ImageUpload>
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
import { applyInfo, services, uploadImg } from "@/api";
import ImageUpload from "@/components/ImageUpload";
export default {
  props: {
    isShow: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      required: true,
    },
    datas: {
      type: Object,
    },
  },
  computed: {
    ...mapGetters(["user_info"]),
    title() {
      return this.type == "编辑" ? "编辑车辆信息" : "添加车辆信息";
    },
  },
  components: {
    ImageUpload
  },
  data() {
    return {
      cartServices: [],
      rules: {
        ctName: [
          { required: true, message: "请输入客户名称", trigger: "blur" },
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
      loadImgUrl: uploadImg.upload
    };
  },

  created() {
    this.getDataServices();
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
    isShow: function () {

      this.$nextTick(() => {
        console.log(this.$refs.imgupload)
        this.$refs.imgupload1.fileList = [];
        this.$refs.imgupload2.fileList = [];
      })

    }
  },

  methods: {
    uploadHandle1(result) {
      if (result instanceof Array) {
        let imgUrl = result[0].data;
        this.datas.picRoute = imgUrl;

        this.$message.success("图片上传成功,请点击确认后保存图片!");
      }
    },
    uploadHandle2(result) {
      if (result instanceof Array) {
        let imgUrl = result[0].data;
        this.datas.listRoute = imgUrl;

        this.$message.success("图片上传成功,请点击确认后保存图片!");
      }
    },
    getDataServices() {
      this.$axios
        .post(services.query, { sName: this.searchValue })
        .then((res) => {
          const data = res.data;
          if (data.errCode == 200) {
            this.cartServices = this.paging(this.page, this.pageSize, data.data);
            this.totalArr = data.data;
            this.type = "";
          } else {
            this.$message(data.msg);
          }
        });
    },
    handleClose() {
      this.$parent.isShow = false;
    },
    send() {
      const { $axios, datas } = this;
      datas.operator = this.user_info.user_name;
      datas.userId = this.user_info.user_id;
      datas.operatorDate = Date.now();
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
      console.log(type)
      if (type === "编辑") {
        this.$refs[formName].validate((valid) => {
          console.log(valid)
          if (valid) {
            this.send();
          } else {
            this.$message.error("验证未通过");
          }
        });
      } else if (type === "新增") {

        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.send();
          } else {
            this.$message.error("验证未通过");
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