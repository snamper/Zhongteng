<template>
  <el-tabs type="border-card">
    <el-tab-pane label="申请信息">
      <Apply></Apply>
    </el-tab-pane>
    <el-tab-pane label="审核通过">
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
import ApplyReject from '@/components/ApplyReject'
import ApplySuccess from '@/components/ApplySuccess'
export default {
  components: {
    Apply,
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