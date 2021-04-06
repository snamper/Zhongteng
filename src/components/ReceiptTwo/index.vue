<template>
  <ReceiptComm :typeApi="typeApi" />
</template>

<script>
import ReceiptComm from '@/components/ReceiptComm';
import { director } from "@/api";
export default {
  components: {
    ReceiptComm,
  },
  data() {
    return {
      typeApi: 'director'
    }
  },
}
</script>

<style>
</style>