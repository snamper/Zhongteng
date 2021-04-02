<template>
  <el-dialog :title="type" :visible.sync="isShow" @close="closeDialog">
    <el-form :model="datas" ref="ruleForm" :rules="rules">
      <el-row>
        <el-col :span="12">
          <el-form-item prop="productId" label="产品编码" :label-width="formLabelWidth">
            <el-input v-model="datas.productId"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="产品名称" prop="pName" :label-width="formLabelWidth">
            <el-input v-model="datas.pName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="生厂厂家" prop="factory" :label-width="formLabelWidth">
            <el-input v-model="datas.factory"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="产品规格" prop="pSpec" :label-width="formLabelWidth">
            <el-input v-model="datas.pSpec"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="操作者" prop="operator" :label-width="formLabelWidth">
            <el-input v-model="datas.operator"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="操作时间" prop="operatorDate" :label-width="formLabelWidth">
            <el-input v-model="datas.operatorDate"></el-input>
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
import { mapGetters } from 'vuex'
import { product } from '@/api'
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
    datas: {
      type: Object,
    }
  },

  data() {
    return {
      rules: {
        productId: [
          { required: false, message: '请输入产品编码', trigger: 'blur' },

        ],
        pName: [
          { required: true, message: '请输入产品名称', trigger: 'blur' }
        ],
        factory: [
          { required: true, message: '请输入生厂厂家', trigger: 'blur' }
        ],
        pSpec: [
          { required: true, message: '请输入产品规格', trigger: 'blur' }
        ],
        operator: [
          { required: false, message: '请输入操作者', trigger: 'blur' }
        ],
        operatorDate: [
          { required: false, message: '请输入操作时间', trigger: 'blur' }
        ],


      },

      form: {

      },
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
        })
      }

    },

  },

  methods: {
    closeDialog() {
      this.$parent.isShow = false;
    },
    send() {
      const { $axios, datas, } = this;
      datas.operator = this.user_info.user_name;
      datas.operatorDate = Date.now();

      $axios.post(product.addOrUpdate, { ...datas }).then(res => {

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