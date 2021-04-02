<template>
  <el-dialog :title="type" :visible.sync="isShow" @close="closeDialog">
    <el-form :model="datas" ref="ruleForm" :rules="rules">
      <el-row>
        <el-col :span="12">
          <el-form-item prop="purchaseId" label="入库编码" :label-width="formLabelWidth">
            <el-input v-model="datas.purchaseId"></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item label="采购日期" prop="purDate" :label-width="formLabelWidth">
            <el-date-picker type="datetime" v-model="datas.purDate" placeholder="选择日期时间">
            </el-date-picker>
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item label="入库日期" prop="storageDate" :label-width="formLabelWidth">
            <el-date-picker type="datetime" v-model="datas.storageDate" placeholder="选择日期时间">
            </el-date-picker>
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item prop="productId" label="产品编码" :label-width="formLabelWidth">
            <el-input v-model="datas.productId"></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item prop="pName" label="产品名称" :label-width="formLabelWidth">
            <el-input v-model="datas.pName"></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item prop="batchNum" label="批号" :label-width="formLabelWidth">
            <el-input v-model="datas.batchNum"></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item prop="qty" label="数量" :label-width="formLabelWidth">
            <el-input v-model="datas.qty"></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item prop="price" label="单价" :label-width="formLabelWidth">
            <el-input v-model="datas.price"></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item prop="totalPrice" label="总价" :label-width="formLabelWidth">
            <el-input v-model="datas.totalPrice"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="供应商编码" prop="supplierId" :label-width="formLabelWidth">
            <el-input v-model="datas.supplierId"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item prop="supplierName" label="供应商名称" :label-width="formLabelWidth">
            <el-input v-model="datas.supplierName"></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item label="单据编号" prop="billNum" :label-width="formLabelWidth">
            <el-input v-model="datas.billNum"></el-input>
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

        <el-col :span="12">
          <el-form-item label="审核人" prop="empName" :label-width="formLabelWidth">
            <el-input v-model="datas.empName"></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item label="审核结果" prop="result" :label-width="formLabelWidth">
            <el-input v-model="datas.result"></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item label="审核意见" prop="opinion" :label-width="formLabelWidth">
            <el-input v-model="datas.opinion"></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item label="审核时间" prop="exaTime" :label-width="formLabelWidth">
            <el-date-picker type="datetime" v-model="datas.exaTime" placeholder="选择日期时间">
            </el-date-picker>
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
import { instorage } from '@/api'
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
        purchaseId: [
          { required: false, message: '请输入入库编码', trigger: 'blur' },
        ],
        purDate: [
          { required: true, message: '请输入采购日期', trigger: 'blur' },
        ],

        storageDate: [
          { required: true, message: '请输入入库日期', trigger: 'blur' },
        ],

        productId: [
          { required: true, message: '请输入产品编码', trigger: 'blur' },
        ],

        pName: [
          { required: true, message: '请输入产品名称', trigger: 'blur' },
        ],

        batchNum: [
          { required: true, message: '请输入批号', trigger: 'blur' },
        ],

        qty: [
          { required: true, message: '请输入数量', trigger: 'blur' },
        ],

        price: [
          { required: true, message: '请输入单价', trigger: 'blur' },
        ],

        totalPrice: [
          { required: true, message: '请输入总价', trigger: 'blur' },
        ],

        supplierId: [
          { required: true, message: '请输入供应商编码', trigger: 'blur' },
        ],

        supplierName: [
          { required: true, message: '请输入供应商名称', trigger: 'blur' }
        ],
        billNum: [
          { required: true, message: '请输入入库单号', trigger: 'blur' }
        ],
        operator: [
          { required: false, message: '请输入操作者', trigger: 'blur' }
        ],
        operatorDate: [
          { required: false, message: '请输入操作时间', trigger: 'blur' }
        ],
        empName: [
          { required: false, message: '请输入审核人', trigger: 'blur' }
        ],
        result: [
          { required: false, message: '请输入审核结果', trigger: 'blur' }
        ],
        opinion: [
          { required: false, message: '请输入审核意见', trigger: 'blur' }
        ],
        exaTime: [
          { required: false, message: '请输入审核时间', trigger: 'blur' }
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

      $axios.post(instorage.addOrUpdate, { ...datas }).then(res => {

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