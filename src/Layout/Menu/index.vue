<template>
  <div class="menu">

    <el-menu
      :default-active="activeMenu"
      class="el-menu-vertical-demo"
      :collapse="menuFlag"
      background-color="#304156"
      text-color="#fff"
      :unique-opened="true"
      router
    >
      <template v-for="route in routes">
        <el-menu-item
          :index="route.redirect"
          :key="route.path"
          v-if="!hasChildren(route.children)"
        >
          <i :class="route.children[0].meta.icon"></i>
          <span slot="title">{{route.children[0].meta.title}}</span>
        </el-menu-item>
        <el-submenu
          :index="route.path"
          :key="route.path"
          v-else
        >
          <template slot="title">
            <i :class="route.meta.icon"></i>
            <span slot="title">{{route.meta.title}}</span>
          </template>
          <el-menu-item
            :index="child.path"
            v-for="child in route.children"
            :key="child.name"
          >{{child.meta.title}}</el-menu-item>
        </el-submenu>
      </template>

    </el-menu>

  </div>
</template>

<script>

import { mapGetters } from 'vuex';
export default {
  data() {
    return {
      isCollapse: false,

    };
  },
  methods: {

    hasChildren(children) {

      if (children && children.length > 1) {
        return true
      } else {
        return false;
      }
    }
  },
  mounted() {

  },
  computed: {
    ...mapGetters(['menuFlag']),
    routes() {

      return this.$router.options.routes.filter(item => !item.hidden)
    },
    activeMenu() {
      const route = this.$route

      const { path } = route

      return path
    },

  },
}
</script>

<style lang='scss' scoped>
.menu {
  width: 100%;
  height: 100%;
  .el-menu {
    height: 100%;
  }
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>