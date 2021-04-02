<template>
  <ApplyComm :typeApi="typeApi" />
</template>

<script>
import ApplyComm from '@/components/ApplyComm';
import { director } from "@/api";
export default {
  components: {
    ApplyComm,
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