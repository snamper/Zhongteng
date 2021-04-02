<template>
  <el-dialog :title="type" :visible.sync="isShow" @close="closeDialog">
    <el-form :model="datas" ref="ruleForm" :rules="rules">
      <el-row>
        <el-col :span="12">
          <el-form-item prop="fName" label="厂家名称" :label-width="formLabelWidth">
            <el-input v-model="datas.fName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="客户所在省" prop="region" :label-width="formLabelWidth">
            <el-cascader size="large" :options="provinceAndCityDataPlus" v-model="datas.region"></el-cascader>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="厂家详细地址" prop="fAddress" :label-width="formLabelWidth">
            <el-input v-model="datas.fAddress"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="厂家联系人" prop="fPerson" :label-width="formLabelWidth">
            <el-input v-model="datas.fPerson"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="联系人手机" prop="fPhone" :label-width="formLabelWidth">
            <el-input v-model="datas.fPhone"></el-input>
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
import { provinceAndCityDataPlus, CodeToText } from 'element-china-area-data'
import { mapGetters } from 'vuex'
import { factory } from '@/api'
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
        fName: [
          { required: true, message: '请输入厂家名称', trigger: 'blur' },

        ],
        fProvince: [
          { required: true, message: '请输入厂家所在省', trigger: 'blur' }
        ],
        fCity: [
          { required: true, message: '请输入厂家所在市', trigger: 'blur' }
        ],
        fAddress: [
          { required: true, message: '请输入厂家详细地址', trigger: 'blur' }
        ],
        fPerson: [
          { required: true, message: '请输入厂家联系人', trigger: 'blur' }
        ],
        fPhone: [
          { required: true, message: '请输入联系人手机', trigger: 'blur' }
        ],


      },
      provinceAndCityDataPlus,
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
      const { $axios, datas } = this;
      const { region } = datas;
      let ctProvince = CodeToText[region[0]];
      let ctCity = CodeToText[region[1]]

      datas.operator = this.user_info.user_name;
      datas.operatorDate = Date.now();
      datas.fProvince = ctProvince
      datas.fCity = ctCity;

      $axios.post(factory.addOrUpdate, { ...datas }).then(res => {

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