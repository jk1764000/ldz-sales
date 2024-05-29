<template>
  <div class="login-container">
    <img src="login/images/els-logo.png" style="height:95%;text-align:center">
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">

      <div class="title-container">
        <h3 class="title">后台登录</h3>
      </div>

      <el-form-item prop="loginname">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="loginname"
          v-model="loginForm.loginname"
          placeholder="请输入企业账号"
          name="loginname"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>
      <el-form-item prop="loginperson">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="loginperson"
          v-model="loginForm.loginperson"
          placeholder="请输入个人账号"
          name="loginperson"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>
      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          :key="passwordType"
          ref="password"
          v-model="loginForm.password"
          :type="passwordType"
          placeholder="请输入密码"
          name="password"
          tabindex="2"
          auto-complete="on"
          @keyup.enter.native="handleLogin"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
        </span>
      </el-form-item>

      <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;" @click.native.prevent="handleLogin">登录</el-button>

      <!-- <div class="tips">
        <span style="margin-right:20px;">loginname: admin</span>
        <span> password: any</span>
      </div> -->

    </el-form>
  </div>
</template>

<script>
// import { validUsername } from '@/utils/validate'
// import {login} from "@/api/user"
import { setToken } from '@/utils/auth'

export default {
  name: 'Login',
  data() {
    const validateUsername = (rule, value, callback) => {
      callback()
    }
    const validateLoginperson = (rule, value, callback) => {
      callback()
    }
    
    const validatePassword = (rule, value, callback) => {
      if (value.length < 4) {
        callback(new Error('密码输入错误'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        loginname: '',
        password: '',
        loginperson:'',
      },
      loginRules: {
        loginname: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }],
        loginperson:[{ required: true, trigger: 'blur', validator: validateUsername }],
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          if(this.loginForm.loginname == "307814"){
            if((this.loginForm.loginperson == '0' && this.loginForm.password =="sw123") || this.loginForm.loginperson == '1' && this.loginForm.password =="sw246"){
              this.loading = false
              setToken('1111');
              sessionStorage.setItem('ldzloginname',this.loginForm.loginname);
              sessionStorage.setItem('loginperson',this.loginForm.loginperson);
              this.$router.push({ path: this.redirect || '/' })
              
            }else{
              this.loading = false
              this.$message({
                message: '个人账号或密码错误',
                type: 'error'
              });
            }
            
          }else{
            this.loading = false
            this.$message({
              message: '企业账号错误',
              type: 'error'
            });
          }
          

          // login(this.loginForm).then((res)=>{
          //   if(res.code == "0"){
          //       setToken('1111');
          //       this.$router.push({ path: this.redirect || '/' })
          //       this.loading = false
          //     }
          //   });
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg:#f5f5f5;
$light_gray:#000;
$cursor: #000;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: #000;
  }
  
}
.login-container .el-form-item{
  background: $bg!important;
}
input:-internal-autofill-selected{
  background-color: $bg!important;
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: #000;
      height: 47px;
      caret-color: $cursor;
      background-color:transparent;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: #000 !important;
        // color: #000;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background: url('https://srm.sdyanxitang.com/ELSServer_YXT/login/images/backgrounds/4.jpg');
  background-size: 100% 100%;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
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
