<template>
  <div
    class="login-container"
    :style="loginContainerStyle"
  >
    <pointwave :color="0x097bdb" />
    <el-form
      :rules="loginRules"
      auto-complete="on"
      :model="loginForm"
      ref="ruleForm"
      class="login-form"
      @keyup.enter.native="submitForm('ruleForm')"
    >

      <div class="title-container">
        <h3 class="title">江苏中腾新能源有限公司</h3>
      </div>

      <el-form-item prop="userAccount">
        <!-- <span class="svg-container">
         <img src="" alt="">
        </span> -->
        <el-input
          v-model="loginForm.userAccount"
          placeholder="请输入账户"
          type="text"
          tabindex="1"
        />
      </el-form-item>

      <el-form-item prop="password">
        <!-- <span class="svg-container">
          <svg-icon icon-class="password" />
        </span> -->
        <el-input
          v-model="loginForm.password"
          placeholder="请输入密码"
          type='password'
        />

      </el-form-item>

      <el-button
        :loading="loading"
        type="primary"
        style="width:100%;margin-bottom:30px;"
        @click="submitForm('ruleForm')"
      >登陆</el-button>

    </el-form>
  </div>
</template>

<script>
import Pointwave from '@/components/Pointwave'
import { logion_url, getMenu } from '@/api'
import { mapMutations } from 'vuex';
import backgroundImg from '@/assets/images/bg.png'

export default {
  name: 'Spacewaves',
  components: {
    Pointwave
  },
  data() {

    return {
      loginForm: {
        userAccount: '',
        password: ''
      },
      loginRules: {
        userAccount: [{ required: true, message: '请输入账户', trigger: 'blur' },
        { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' },]
      },
      loading: false,

      redirect: undefined
    }
  },
  computed: {
    loginContainerStyle() {
      return {
        backgroundImage: `url(${backgroundImg})`,
        backgroundSize: 'cover',
        backgroundPosition: '50%'
      }
    }
  },

  methods: {
    ...mapMutations({
      SET_USER: 'SET_USER',

    }),

    submitForm(formName) {
      let _self = this;
      this.$refs[formName].validate((valid) => {
        if (valid) {

          this.$axios.post(logion_url, {

            userAccount: this.loginForm.userAccount,
            password: this.loginForm.password

          }).then(res => {
            let data = res.data;
            let userId = data.data.userId;
            console.log(userId, 'userId')
            let user_name = data.data.userAccount;
            let token = data.data.token;
            if ((res.status == 200 && data.errCode != 0) || !token) {
              this.$message.error(data.message)
            } else {
              this.$router.replace('/home')
              localStorage.setItem('token', token)
              localStorage.setItem('user_name', user_name)
              this.SET_USER({
                user_id: userId,
                user_name: user_name,
                user_token: token,
              })
              _self.$axios.get(getMenu.menuUrl + '/' + userId).then(res => {
                console.log(res)
              })
              _self.$axios.get(getMenu.allMenu).then(res => {
                console.log(res)
              })
            }
          }).catch(() => {
            this.$message.error('账户或者密码错误')
          })


        } else {
          console.log('error submit!!');
          return false;
        }
      });
    }
  }
}
</script>

<style lang="scss" scoped>
$bg: #15255b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 500px;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>