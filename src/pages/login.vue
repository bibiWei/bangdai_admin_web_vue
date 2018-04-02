<template lang="html">
  <el-row>
    <el-col :span="12" :offset="6">
      <div class="login">
        <div class="login-form">
          <div class="card-block">
            <h2>xxx管理平台</h2>
              <BR/><BR/>
            <div class="input-group m-b-1">
              <span class="input-group-addon"><i class="fa fa-user"></i></span>
              <input type="text" class="form-control" placeholder="用户名" v-model="form.userCode">
            </div>
            <div class="input-group m-b-2">
              <span class="input-group-addon"><i class="fa fa-lock"></i></span>
              <input type="password" class="form-control" placeholder="密码" v-model="form.password"
                     @keyup.enter="login">
            </div>
            <div class="row">
              <el-row>
                <el-col :span="12">
                  <el-button type="primary" class="btn btn-primary p-x-2" @click="login">登录</el-button>
                </el-col>

              </el-row>
            </div>
          </div>
        </div>
        <div class="login-register">
          <div class="card-block">

          </div>
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
  import * as types from '../store/mutation-types'
  import * as api from "../api/apiConfig"
  import auth from '../auth'
  import { mapGetters, mapActions, mapMutations } from 'vuex'
  import swal from 'sweetalert2'

  export default {
    name: 'login',
    data() {
      return {
        form: {
          userCode: 'admin',
          password: 'admin'
        }
      }
    },
    components: {},
    methods: {
      ...mapMutations({
        setUserInfo: types.SET_USER_INFO
      }),
      ...mapActions({
        loadMenuList: 'loadMenuList' //映射 this.load() 为 this.$store.dispatch('loadMenuList')
      }),
      login(){
        this.$api.login(this.form).then(res => {
          if(res.status == this.$api.SUCCESS){
              this.setUserInfo(res.result.userVo);
              localStorage.setItem('platform_token',res.result.token);
              this.$router.push('/')
          }else{
            swal({text: '登录失败['+res.message+']',type: 'error',showCancelButton: false,width:300});
          }
        })
      }
    }
  }
</script>

<style>
  .login {
    margin-top: 160px;
    width: 100%;
    border: 1px solid #cfd8dc;
    margin-right: auto !important;
    margin-left: auto !important;
    display: table;
    table-layout: fixed;
  }

  .login .el-button {
    border-radius: 0;
  }

  .login .el-button.forgot, .login .el-button.forgot:hover {
    border: none;
  }

  .login .login-form {
    background-color: #FFFFFF;
    display: inline-block;
    width: 60%;
    display: table-cell;

  }

  .login .login-form .card-block {
    margin: 35px;
  }

  .login .login-form .card-block p {
    margin: 15px 0;
  }

  .input-group {
    width: 100%;
    display: table;
    border-collapse: separate;
    margin-bottom: 20px !important;
  }

  .input-group, .input-group-btn, .input-group-btn > .btn, .navbar {
    position: relative;
  }

  .input-group-addon:not(:last-child) {
    border-right: 0;
  }

  .input-group-addon, .input-group-btn {
    min-width: 40px;
    white-space: nowrap;
    vertical-align: middle;
    width: 1%;
  }

  .btn-link:focus, .btn-link:hover {
    color: #167495;
    text-decoration: underline;
    background-color: transparent;
  }

  .btn-link, .btn-link:active, .btn-link:focus, .btn-link:hover {
    border-color: transparent;
  }

  .btn.focus, .btn:focus, .btn:hover {
    text-decoration: none;
  }

  .input-group-addon {
    padding: .5rem .75rem;
    margin-bottom: 0;
    font-size: .875rem;
    font-weight: 400;
    line-height: 1.75rem;
    color: #607d8b;
    text-align: center;
    background-color: #cfd8dc;
    border: 1px solid rgba(0, 0, 0, .15);
  }

  .input-group .form-control, .input-group-addon, .input-group-btn {
    display: table-cell;
  }

  .input-group .form-control {
    position: relative;
    z-index: 2;
    float: left;
    width: 100%;
    margin-bottom: 0;
  }

  .form-control {
    width: 100%;
    padding: .5rem .75rem;
    font-size: .875rem;
    line-height: 1.75rem;
    color: #607d8b;
    background-color: #fff;
    background-image: none;
    background-clip: padding-box;
    border: 1px solid rgba(0, 0, 0, .15);
    transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;
  }

  .login .login-form .card-block .row {
    display: block;
    margin: 15px 0;
  }

  .login .login-register {
    display: table-cell;
    background-color: #20a8d8;
    width: 40%;
    color: #fff;
  }

  .login .login-register .card-block {
    text-align: center !important;
    margin: 30px;
  }

  .login .login-register .card-block p {
    text-align: left !important;
    margin: 15px 0;
    height: 100px;
  }
</style>
