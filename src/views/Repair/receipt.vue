<template>
  <el-tabs type="border-card">
    <el-tab-pane label="回执审核">
      <Receipt/> 
    </el-tab-pane>
    <el-tab-pane label="审核通过">
      <ReceiptSuccess/>
    </el-tab-pane>
    <el-tab-pane label="审核失败">
      <ReceiptReject/>
    </el-tab-pane>

  </el-tabs>

</template>

<script>
import Receipt from '@/components/Receipt'
import ReceiptReject from '@/components/ReceiptReject'
import ReceiptSuccess from '@/components/ReceiptSuccess'
export default {
  components: {
    Receipt,
    ReceiptReject,
    ReceiptSuccess,
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