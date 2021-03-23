<template>
  <div class="layout">
    <el-container>
      <el-aside :width="!menuFlag?'200px':'64px'">
        <Menu></Menu>
      </el-aside>
      <el-main>
        <Bread></Bread>

        <keep-alive :key="key">
          <router-view class="app-container"></router-view>
        </keep-alive>

      </el-main>
    </el-container>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Menu from './Menu'
import Bread from './Breadcrumb'
export default {
  components: {
    Menu,
    Bread
  },
  computed: {
    ...mapGetters(['menuFlag']),
    key() {
      return this.$route.path
    }
  },
}
</script>

<style lang='scss' scoped>
.layout {
  width: 100%;
  height: 100%;
  .el-container {
    width: 100%;
    height: 100%;
    .el-main {
      padding: 0;
    }
  }
  .el-aside {
    overflow-x: hidden;
    transition: all 0.5s;
  }
  .app-container {
    margin: 20px;
  }
}
</style>