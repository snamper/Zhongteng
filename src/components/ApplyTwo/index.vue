<template>
  <ApplyComm :filterType="filterType" />
</template>

<script>
import ApplyComm from '@/components/ApplyComm'
export default {
  components: {
    ApplyComm
  },
  data() {
    return {
      filterType: 'director'
    }
  },
}
</script>

<style>
</style>