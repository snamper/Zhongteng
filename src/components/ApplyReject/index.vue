<template>
  <ApplyComm :typeApi="typeApi" />
</template>

<script>
import ApplyComm from '@/components/ApplyComm'
export default {
  components: {
    ApplyComm
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