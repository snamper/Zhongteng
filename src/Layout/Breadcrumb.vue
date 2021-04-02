<template>
  <div class="breadcrumb">
    <i :class='[icon]' @click="menuIcon"></i>

    <div class="breadTitle">
      <el-breadcrumb>
        <el-breadcrumb-item>您的位置：</el-breadcrumb-item>

        <el-breadcrumb-item v-for="(item,index) in breadList" :key="index" :to="item.path">{{item.meta.title}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="username">
      <img src="~@/assets/images/logo.png" alt="江苏中腾新能源有限公司" class="logo">
      <el-dropdown @command="handleCommand">

        <img src="~@/assets/images/username.gif" alt="">

        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="username">{{user_info.user_name}}</el-dropdown-item>
          <el-dropdown-item command='loginOut'> 退出登陆</el-dropdown-item>

        </el-dropdown-menu>
      </el-dropdown>
    </div>

  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
  name: 'Bread',
  data: function () {
    return {
      breadList: [],

    }
  },
  watch: {
    $route: {
      handler: function () {
        this.getBreadcrumb()
      },
      // 深度观察监听
      deep: true,
      immediate: true
    },

  },
  computed: {
    ...mapGetters(['user_info', 'menuFlag']),
    icon: function () {
      return this.menuFlag ? ' icon el-icon-s-unfold' : 'icon el-icon-s-fold';
    },
  },
  methods: {
    ...mapMutations(['SET_MENU']),
    isHome(route) {
      return route.name === "Home";
    },
    getBreadcrumb() {
      let matched = this.$route.matched;
      //如果不是首页
      if (!this.isHome(matched[0])) {
        matched = [{ path: "/home", meta: { title: "首页" } }].concat(matched);
      }

      this.breadList = matched.filter(item => item.meta.title);
    },
    handleCommand(command) {
      if (command == 'loginOut') {

        localStorage.removeItem('token')
        localStorage.removeItem('user_id')
        localStorage.removeItem('user_name')
        this.$router.replace('/login')
      }
    },
    menuIcon() {
      this.SET_MENU(!this.menuFlag)
    }
  },
  mounted() {
    console.log(this.menuFlag)
  },

}
</script>

<style lang='scss' scoped>
.breadcrumb {
  padding: 0px 15px;
  height: 50px;
  //   background: linear-gradient(to right, #ff9966 0%, #66bfff 100%);
  overflow: hidden;
  position: relative;
  background: #fff;
  position: relative;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  display: flex;
  align-items: center;
  .icon {
    font-size: 25px;
  }
  .breadTitle {
    margin-left: 15px;
  }
  .username {
    position: absolute;
    right: 15px;
    display: flex;
    align-items: center;
    .logo {
      width: 115px;
      height: 40px;
      margin-right: 15px;
    }
    img {
      width: 40px;
      height: 40px;
      border-radius: 10px;
    }
  }
}
</style>