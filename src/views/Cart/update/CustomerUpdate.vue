<template>
  <el-dialog
    :title="type"
    :visible.sync="isShow"
  >
    <el-form
      :model="datas"
      ref="ruleForm"
      :rules="rules"
    >
      <el-row>
        <el-col :span="12">
          <el-form-item
            prop="ctName"
            label="客户名称"
            :label-width="formLabelWidth"
          >
            <el-input v-model="datas.ctName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="客户所在省"
            prop="ctProvince"
            :label-width="formLabelWidth"
          >
            <el-input v-model="datas.ctProvince"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="客户所在市"
            prop="ctCity"
            :label-width="formLabelWidth"
          >
            <el-input v-model="datas.ctCity"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="客户详细地址"
            prop="ctAddress"
            :label-width="formLabelWidth"
          >
            <el-input v-model="datas.ctAddress"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="客户联系人"
            prop="ctPerson"
            :label-width="formLabelWidth"
          >
            <el-input v-model="datas.ctPerson"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="联系人手机"
            prop="psPhone"
            :label-width="formLabelWidth"
          >
            <el-input v-model="datas.psPhone"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="客户服务站编码"
            :label-width="formLabelWidth"
          >
            <el-input v-model="datas.serviceId"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="我方负责人编码"
            :label-width="formLabelWidth"
          >
            <el-input v-model="datas.userId"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="员工姓名"
            :label-width="formLabelWidth"
          >
            <el-input v-model="datas.empName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="操作人"
            :label-width="formLabelWidth"
          >
            <el-input
              v-model="datas.operator"
              :disabled="true"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>

    </el-form>
    <div
      slot="footer"
      class="dialog-footer"
    >
      <el-button @click="$parent.isShow = false">取 消</el-button>
      <el-button
        type="primary"
        @click="update('ruleForm')"
      >确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { mapGetters } from 'vuex'
import { customer } from '@/api'
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
        ctName: [
          { required: true, message: '请输入客户名称', trigger: 'blur' },

        ],
        ctProvince: [
          { required: true, message: '请输入客户所在省', trigger: 'blur' }
        ],
        ctCity: [
          { required: true, message: '请输入客户所在市', trigger: 'blur' }
        ],
        ctAddress: [
          { required: true, message: '请输入客户客户详细地址', trigger: 'blur' }
        ],
        ctPerson: [
          { required: true, message: '请输入联系人', trigger: 'blur' }
        ],
        psPhone: [
          { required: true, message: '请输入联系人手机', trigger: 'blur' }
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
  created() {


  },
  watch: {
    type: function (val) {
      if (val === '编辑') {
        this.$nextTick(() => {
          this.$refs['ruleForm'].clearValidate();
        })
      }
      if (val === '新增') {
        this.datas.operator = this.user_info.user_name;

      }
    }
  },

  methods: {
    send() {
      const { $axios, datas, } = this;
      datas.operator = this.user_info.user_name;
      datas.operatorDate = Date.now();
      $axios.post(customer.addInfo, { ...datas }).then(res => {

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