<template>
  <el-tabs type="border-card">
    <el-tab-pane label="申请信息">
      <Apply></Apply>
    </el-tab-pane>

    <el-tab-pane label="内勤审核">
      <ApplyOne/></el-tab-pane>

      <el-tab-pane label="主管复核">
      <ApplyTwo/></el-tab-pane>

      <el-tab-pane label="总经理复核">
      <ApplyThree/></el-tab-pane>

    <el-tab-pane label="财务审核通过">
      <ApplySuccess/>
    </el-tab-pane>

    <el-tab-pane label="审核失败">
      <ApplyReject/>
    </el-tab-pane>

  </el-tabs>

</template>

<script>
// import Apply from '@/components/Apply'
// export default {
//   components: {
//     Apply
//   },

import Apply from '@/components/Apply'
import ApplyOne from '@/components/ApplyOne'
import ApplyTwo from '@/components/ApplyTwo'
import ApplyThree from '@/components/ApplyThree'
import ApplyReject from '@/components/ApplyReject'
import ApplySuccess from '@/components/ApplySuccess'

export default {
  components: {
    Apply,
    ApplyOne,
    ApplyTwo,
    ApplyThree,
    ApplyReject,
    ApplySuccess,
  },
  data() {
    return {
    };
  },
  methods: {

  }
};
</script>
<style>
</style>