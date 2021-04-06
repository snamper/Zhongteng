<template>
  <el-tabs type="border-card" v-model="selectTab" @tab-click="changeIndex">

    <template v-for="(item,index) in template">
      <el-tab-pane :label="item.title" :key="index" v-if="item.show">
        <!-- <Receipt v-if="selectTab==index" /> -->
        <component :is="item.component"></component>
      </el-tab-pane>
    </template>

  </el-tabs>

</template>

<script>


import Receipt from '@/components/Receipt'
import ReceiptOne from '@/components/ReceiptOne'
import ReceiptTwo from '@/components/ReceiptTwo'
import ReceiptThree from '@/components/ReceiptThree'
import ReceiptFour from '@/components/ReceiptFour'
import ReceiptReject from '@/components/ReceiptReject'
import ReceiptSuccess from '@/components/ReceiptSuccess'
import { mapGetters } from "vuex";
export default {
  components: {
    Receipt,

  },
  computed: {
    ...mapGetters(["user_info"]),
  },
  data() {
    return {
      selectTab: '0',
      department: null,
      template: [
        { title: '申请信息', component: Receipt, show: true },
        { title: '内勤审核', component: ReceiptOne, show: false },
        { title: '主管审核', component: ReceiptTwo, show: false },
        { title: '总经理审核', component: ReceiptThree, show: false },
        { title: '财务审核', component: ReceiptFour, show: false },
        { title: '通过', component: ReceiptSuccess, show: true },
        { title: '失败', component: ReceiptReject, show: true },
      ],
      showArr: ['申请信息', '通过', '失败']
    };
  },

  created() {

    this.department = this.user_info.department;
    this.showArr.push(this.department)
    this.template.forEach(item => {
      if (this.showArr.includes(item.title)) {
        item.show = true;
      } else if (item.title.includes(this.department)) {
        item.show = true;
      } else {
        item.show = false;
      }
    })
  },
  methods: {
    changeIndex(option, value) {
      console.log(option.index)
      this.selectTab = option.index;
    },
  }
};
</script>
<style>
</style>