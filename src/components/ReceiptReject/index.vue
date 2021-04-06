<template>
  <ReceiptComm :typeApi="typeApi" />
</template>

<script>
import ReceiptComm from '@/components/ReceiptComm'
export default {
  components: {
    ReceiptComm
  },
  data() {
    return {
      typeApi: 'fail'
    }
  },
}
</script>

<style>
</style>