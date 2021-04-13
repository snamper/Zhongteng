<template>
  <el-tabs type="border-card" v-model="selectTab" @tab-click="changeIndex">

    <template v-for="(item,index) in template">
      <el-tab-pane :label="item.title" :key="index" v-if="item.show">

        <component :is="current" v-if="index==selectTab" :typeApi="typeApi"></component>
      </el-tab-pane>
    </template>

  </el-tabs>

</template>

<script>


import Apply from '@/components/Apply'

import ApplyComm from '@/components/ApplyComm';
import { mapGetters } from "vuex";
export default {
  components: {
    Apply,
  },
  computed: {
    ...mapGetters(["user_info"]),
  },
  data() {
    return {
      selectTab: '0',
      department: null,
      template: [
        { title: '申请信息', show: true },
        { title: '内勤审核', show: false },
        { title: '主管审核', show: false },
        { title: '总经理审核', show: false },
        { title: '财务审核', show: false },
        { title: '通过', show: true },
        { title: '失败', show: true },
      ],
      showArr: ['申请信息', '通过', '失败',],
      current: Apply,
      typeApi: '',
      currentTypeApi: [
        'neiqin',
        'director',
        'manager',
        'finance',
        'success',
        'fail'
      ],
    };
  },

  created() {

    this.department = this.user_info.department;
    this.showArr.push(this.department)
    this.template.forEach(item => {
      if (this.showArr.includes(item.title)) {
        item.show = true;
      } else if (item.title.includes(this.department) || this.department === '系统管理员') {
        item.show = true;
      } else {
        item.show = false;
      }
    })
  },
  methods: {
    changeIndex(option, value) {
      let index = option.index;

      if (index == 0) {
        this.current = Apply
      } else {
        this.current = ApplyComm
        this.typeApi = this.currentTypeApi[index - 1]
        console.log(this.typeApi);
      }


      this.selectTab = option.index;
    },
  }
};
</script>
<style>
</style>