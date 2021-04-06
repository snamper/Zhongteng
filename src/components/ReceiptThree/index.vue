<template>
  <ReceiptComm :typeApi="typeApi" />
</template>

<script>
import ReceiptComm from '@/components/ReceiptComm';
import { manager } from "@/api";
export default {
  components: {
    ReceiptComm,
  },
  data() {
    return {
      typeApi: 'manager'
    }
  },
}
</script>

<style>
</style>