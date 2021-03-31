<template>
  <el-dialog title="查看审核状态" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
    <el-steps :active="4" align-center>
      <el-step :title="peopleList[item.name]" :description="item.examDevice1" :status="item.type" v-for="(item,index) in statusList" :key="index"></el-step>
      <!-- <el-step title="步骤2" description="这是一段很长很长很长的描述性文字"></el-step>
      <el-step title="步骤3" description="这是一段很长很长很长的描述性文字"></el-step>
      <el-step title="步骤4" description="这是一段很长很长很长的描述性文字"></el-step> -->
    </el-steps>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
const failCode = [0, null]
import { peopleList } from '@/config'
export default {
  props: {
    statusData: {
      required: true,
      type: Object
    }
  },
  data() {
    return {
      dialogVisible: false,
      statusList: [],
      peopleList
    }
  },
  watch: {
    statusData: function (val) {
      const { examStatus1, examStatus2, examStatus3, examStatus4 } = val;

      this.statusList = [];


      if (failCode.includes(examStatus1) || failCode.includes(examStatus2) || failCode.includes(examStatus3) || failCode.includes(examStatus4)) {
        this.statusList.push({ examStatus1: val.examStatus1, examDevice1: val.examDevice1, type: 'error', name: 'examStatus1' })
        this.statusList.push({ examStatus2: val.examStatus2, examDevice2: val.examDevice2, type: 'error', name: 'examStatus2' })
        this.statusList.push({ examStatus3: val.examStatus3, examDevice3: val.examDevice3, type: 'error', name: 'examStatus3' })
        this.statusList.push({ examStatus4: val.examStatus4, examDevice4: val.examDevice4, type: 'error', name: 'examStatus4' })
      } else {
        this.statusList.push({ examStatus1: val.examStatus1, examDevice1: val.examDevice1, type: 'success', name: 'examStatus1' })
        this.statusList.push({ examStatus2: val.examStatus2, examDevice2: val.examDevice2, type: 'success', name: 'examStatus2' })
        this.statusList.push({ examStatus3: val.examStatus3, examDevice3: val.examDevice3, type: 'success', name: 'examStatus3' })
        this.statusList.push({ examStatus4: val.examStatus4, examDevice4: val.examDevice4, type: 'success', name: 'examStatus4' })
      }
    }
  },
  computed: {
    statusIcon(item) {
      const { examStatus1, examStatus2, examStatus3, examStatus4 } = item;
      if (failCode.includes(examStatus1) || failCode.includes(examStatus2) || failCode.includes(examStatus3) || failCode.includes(examStatus4)) {
        return 'error'
      } else {
        return 'success'
      }
    },
  },
  methods: {
    close() {
      this.dialogVisible = false
    }
  },
}
</script>

<style>
</style>