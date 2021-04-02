<template>
  <el-dialog :title="type" :visible.sync="isShow" @close="closeDialog">
    <el-form :model="datas" ref="ruleForm" :rules="rules">
      <el-row>
        <el-col :span="12">
          <el-form-item prop="stockId" label="库存编码" :label-width="formLabelWidth">
            <el-input v-model="datas.stockId"></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item label="库存日期" prop="invDate" :label-width="formLabelWidth">
            <el-date-picker type="datetime" v-model="datas.invDate" placeholder="选择日期时间">
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
          <el-form-item prop="remarks" label="备注" :label-width="formLabelWidth">
            <el-input v-model="datas.remarks"></el-input>
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
import { stock } from "@/api";
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
        stockId: [
          { required: false, message: "请输入库存编码", trigger: "blur" },
        ],
        invDate: [
          { required: true, message: "请输入库存日期", trigger: "blur" },
        ],
        productId: [
          { required: true, message: "请输入产品编码", trigger: "blur" },
        ],

        pName: [{ required: true, message: "请输入产品名称", trigger: "blur" }],

        batchNum: [{ required: true, message: "请输入批号", trigger: "blur" }],

        qty: [{ required: true, message: "请输入数量", trigger: "blur" }],

        remarks: [{ required: true, message: "请输入备注", trigger: "blur" }],
      },

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
    },
  },

  methods: {
    closeDialog() {
      this.$parent.isShow = false;
    },
    send() {
      const { $axios, datas } = this;
      datas.operator = this.user_info.user_name;
      datas.operatorDate = Date.now();

      $axios
        .post(stock.addOrUpdate, { ...datas })
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