<template>
  <div class="see-img">
    <el-dialog title="查看图片" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
      <!-- <img :src="'data:image/png;base64,'+imgBase64" alt="查看图片"> -->
      <el-image :src="url" :preview-src-list="srcList" z-index="100000" @click="imgHadnle">
      </el-image>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    imgBase64: {
      type: String,
      required: true,
    }
  },
  watch: {
    imgBase64: function (val) {
      this.srcList = []
      this.url = 'data:image/png;base64,' + val;
      this.srcList.push(this.url)
    }
  },
  data() {
    return {
      dialogVisible: false,
      url: '',
      srcList: []
    };
  },
  methods: {
    handleClose() {
      this.dialogVisible = false;
    },
    imgHadnle() {
      this.dialogVisible = false;
    }
  },
}
</script>

<style>
</style>