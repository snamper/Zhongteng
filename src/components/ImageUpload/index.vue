<template>

  <div>
    <div>
      <el-upload list-type="picture-card" multiple :limit="1" before-upload="beforeAvatarUpload" :on-preview="handlePictureCardPreview" :on-change="fileChange" :on-remove="handleRemove" :file-list="fileList" :auto-upload="false" :headers="imgHeaders">
        <i class="el-icon-plus"></i>
      </el-upload>
      <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
      <div slot="tip" class="el-upload__tip">只能上传{{this.imgType.join(',')}}文件，且不超过2M</div>
    </div>
    <el-dialog :visible.sync="dialogVisible" append-to-body="true">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    url: {
      type: String,
      required: true,
    },
  },

  data: function () {
    return {
      fileList: [],
      imgHeaders: {
        'Content-Type': 'multipart/form-data'
      },
      dialogVisible: false,
      dialogImageUrl: '',
      imgType: ['gif', 'jpg', 'jpeg', 'png', 'JPG', 'PNG']
    }
  },
  methods: {
    beforeAvatarUpload(file) {


    },
    fileChange(file, fileList) {
      let type = file.name.split('.');

      const isJPG = this.imgType.includes(type[1])
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG或者png 格式!');
      }
      if (!isLt2M) {

        this.$message.error('上传头像图片大小不能超过2MB!');
      }
      if (isJPG && isLt2M) {
        this.fileList = fileList;
      }



    },
    fileRemove(file, fileList) {
      this.fileList = fileList;
    },
    handleRemove(file, fileList) {
      let uid = file.uid


      this.$_.remove(this.fileList, { uid })

    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    submitUpload() {
      const promiseLisr = [];
      if (this.fileList.length <= 0) {
        this.$message.warning('请上传图片')
        return false;
      }
      let datas = new FormData();
      this.fileList.forEach(async file => {

        datas.append('files', file.raw)

        const data = this.$axios.post(this.url, datas, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        promiseLisr.push(data)
      })
      Promise.all(promiseLisr).then(res => {
        this.$emit('uploadHandle', res)
      }).catch(e => {
        this.$emit('uploadHandle', e)
      })
    },

  },
}
</script>

<style>
</style>