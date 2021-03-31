<template>
  <el-dialog title="申请审核" :visible.sync="isShow" width="30%" :before-close="handleClose">
    <el-input type="textarea" :rows="2" placeholder="请输入拒绝理由" v-model="text"></el-input>
    <span slot="footer" class="dialog-footer">
      <el-button @click="notSuccess">不通过</el-button>
      <el-button type="primary" @click="success">通过</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  props: {
    isShow: {
      type: Boolean,
      require: true,
    },
  },
  data() {
    return {
      text: "",
    };
  },
  methods: {
    success() {
     this.$emit("success", this.text,'通过');
    },
    notSuccess(){
         if (this.text === "") {
        this.$message.error("请输入拒绝理由");
      } else {
        this.$emit("success", this.text,'不通过');
      }
    }
  },
};
</script>

<style scoed>
</style>