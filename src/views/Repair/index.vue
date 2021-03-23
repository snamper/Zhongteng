<template>
  <el-tabs type="border-card">
    <el-tab-pane label="申请信息">
      <Apply></Apply>
    </el-tab-pane>
    <el-tab-pane label="申请审核">申请审核</el-tab-pane>

  </el-tabs>

</template>

<script>
import Apply from '@/components/Apply'
export default {
  components: {
    Apply
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