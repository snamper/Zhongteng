<template>
  <el-dialog title="查看审核状态" :visible.sync="steepVisible" width="30%" @close="handleClose">
    <el-steps :active="active" align-center>
      <el-step :title="peopleList[item.name]" :description="item.time+item.device" :status="item.type" v-for="(item,index) in statusList" :key="index"></el-step>

    </el-steps>
    <span slot="footer" class="dialog-footer">
      <el-button @click="$parent.steepVisible = false">取 消</el-button>
      <el-button type="primary" @click="$parent.steepVisible = false">确 定</el-button>
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
    },
    steepVisible: {
      required: true,
      type: Boolean
    }
  },
  data() {
    return {
      dialogVisible: false,
      statusList: [],
      peopleList,
      active: 0
    }
  },
  watch: {
    statusData: function (val) {


      const { examStatus1, examStatus2, examStatus3, examStatus4, examDate1 = '', examDate2 = '', examDate3 = '', examDate4 = '' } = val;


      this.statusList = [];


      if (failCode.includes(examStatus1) || failCode.includes(examStatus2) || failCode.includes(examStatus3) || failCode.includes(examStatus4)) {
        this.statusList.push({ status: val.examStatus1, device: val.examDevice1 ?? '', type: 'wait', name: 'examStatus1', time: examDate1 ? '审核时间:' + this.$moment(examDate1).format('YYYY-MM-DD HH:DD:ss') : '' })
        this.statusList.push({ status: val.examStatus2, device: val.examDevice2 ?? '', type: 'wait', name: 'examStatus2', time: examDate2 ? '审核时间:' + this.$moment(examDate2).format('YYYY-MM-DD HH:DD:ss') : '' })
        this.statusList.push({ status: val.examStatus3, device: val.examDevice3 ?? '', type: 'wait', name: 'examStatus3', time: examDate3 ? '审核时间:' + this.$moment(examDate3).format('YYYY-MM-DD HH:DD:ss') : '' })
        this.statusList.push({ status: val.examStatus4, device: val.examDevice4 ?? '', type: 'wait', name: 'examStatus4', time: examDate4 ? '审核时间:' + this.$moment(examDate4).format('YYYY-MM-DD HH:DD:ss') : '' })
      } else {
        this.statusList.push({ status: val.examStatus1, device: val.examDevice1 ?? '', type: 'wait', name: 'examStatus1', time: examDate1 ? '审核时间:' + this.$moment(examDate1).format('YYYY-MM-DD HH:DD:ss') : '' })
        this.statusList.push({ status: val.examStatus2, device: val.examDevice2 ?? '', type: 'wait', name: 'examStatus2', time: examDate2 ? '审核时间:' + this.$moment(examDate2).format('YYYY-MM-DD HH:DD:ss') : '' })
        this.statusList.push({ status: val.examStatus3, device: val.examDevice3 ?? '', type: 'wait', name: 'examStatus3', time: examDate3 ? '审核时间:' + this.$moment(examDate3).format('YYYY-MM-DD HH:DD:ss') : '' })
        this.statusList.push({ status: val.examStatus4, device: val.examDevice4 ?? '', type: 'wait', name: 'examStatus4', time: examDate4 ? '审核时间:' + this.$moment(examDate4).format('YYYY-MM-DD HH:DD:ss') : '' })
      }
      this.statusList.forEach((item, index) => {
        if (item.status == 0) {
          item.type = 'error'
        } else if (item.status == 1) {
          item.type = 'success'
        }
      })


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
    handleClose() {
      this.$parent.steepVisible = false
    }
  },
}
</script>

<style>
</style>