<template>
  <el-tabs type="border-card">
    <el-tab-pane>
      <span slot="label">车辆管理</span>
      <CartManger></CartManger>
    </el-tab-pane>

    <el-tab-pane label="消息中心">
      <span slot="label">车型管理</span>
      <CartModel></CartModel>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import CartManger from '@/components/CartManger'
import CartModel from '@/components/CartModel'
export default {
  components: {
    CartManger,
    CartModel
  }
}
</script>

<style>
</style>