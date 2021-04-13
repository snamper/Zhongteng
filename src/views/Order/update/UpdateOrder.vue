<template>
  <el-dialog :title="type" :visible.sync="isShow" @close="closeDialog">
    <el-form :model="datas" ref="ruleForm" :rules="rules">
      <el-row>

        <el-col :span="12">
          <el-form-item label="客户名称" prop="ctName" :label-width="formLabelWidth">
            <el-input v-model="datas.ctName"></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item label="负责人" prop="empName1" :label-width="formLabelWidth">
            <el-input v-model="datas.empName1"></el-input>
          </el-form-item>
        </el-col>

        <!-- <el-col :span="12">
          <el-form-item prop="typeId" label="车型编码" :label-width="formLabelWidth">
            <el-input v-model="datas.typeId"></el-input>
          </el-form-item>
        </el-col> -->

        <el-col :span="12">
          <el-form-item label="车型名称" prop="carName" :label-width="formLabelWidth">
            <el-input v-model="datas.carName"></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item label="订单数量" prop="qty" :label-width="formLabelWidth">
            <el-input v-model="datas.qty"></el-input>
          </el-form-item>
        </el-col>
      

      <el-col :span="12">
          <el-form-item label="订单信息" :label-width="formLabelWidth">
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
import { mapGetters } from 'vuex'
import { order ,uploadImg} from '@/api'
export default {
  props: {
    isShow: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      default: '',
    },
    selectData: {
      require: true,
      type: Object
    },
    datas: {
      type: Object,
    }
  },
  components: {
    ImageUpload
  },
  data() {
    return {
      rules: {

        ctName: [
          { required: true, message: '请输入客户名称', trigger: 'blur' }
        ],
        typeId: [
          { required: true, message: '请输入车型编码', trigger: 'blur' }
        ],
        carName: [
          { required: true, message: '请输入车型名称', trigger: 'blur' }
        ],
        qty: [
          { required: true, message: '请输入订单数量', trigger: 'blur' }
        ],
        empName1: [
          { required: true, message: '请输入负责人一', trigger: 'blur' }
        ],
        empName2: [
          { required: true, message: '请输入负责人二', trigger: 'blur' }
        ],
        loadImgUrl: uploadImg.upload,
      },
      loadImgUrl: uploadImg.upload,
      form: {},
      formLabelWidth: '120px'
    };
  },
  computed: {
    ...mapGetters(['user_info'])
  },

  watch: {
    type: function (val) {
      if (val === '编辑') {
        this.$nextTick(() => {
          this.$refs['ruleForm'].clearValidate();
        });
      }
      if (val === '新增') {
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
        this.datas.picRoute = imgUrl;
        this.$message.success("图片上传成功,请点击确认后保存图片!");
      }
    },
    closeDialog() {
      this.$parent.isShow = false;
    },
    send() {
      const { $axios, datas, } = this;
      datas.operator = this.user_info.user_name;
      datas.operatorDate = Date.now();
      $axios.post(order.addOrUpdate, { ...datas }).then(res => {

        if (res.data.errCode === 200) {
          this.$message.success(res.data.msg)
          this.$parent.getData();
          this.$parent.isShow = false;
        } else {
          this.$message.error(res.data.msg)
          this.$parent.isShow = false;
        }
      }).catch(e => {
        this.$message.error(e)
        this.$parent.isShow = false;
      })
    },
    update(formName) {

      const { type } = this;
      if (type === '编辑') {

        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.send()

          }
        });
      } else if (type === '新增') {

        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.send()
          }
        });
      }
    }
  },
};
</script>

<style>
</style>