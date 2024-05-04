<template>
  
    <div class="login-container">
      <div class="text">
        <p>管理员账号:2 密码:2 ,普通用户账号:1 密码:1</p>
        <p></p>
      </div>
      <el-card class="login-card">
        <h2 class="login-title">华航智言</h2>
        <el-form ref="loginForm" :model="loginForm" :rules="rules" label-width="80px" id="loginForm">
          <el-form-item label="用户名" prop="username">
            <el-input v-model="loginForm.username" placeholder="请输入用户名" id="username"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="loginForm.password" placeholder="请输入密码" id="password"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" style="width: 100%" @click="submitForm">登录</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
  </template>
  
  <script>
  import axios from 'axios'
  import { Message } from 'element-ui';
  export default {
    data() {
      return {
        loginForm: {
          username: '',
          password: ''
        },
        rules: {
          username: [
            { required: true, message: '请输入用户名', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      submitForm() {
        this.$refs.loginForm.validate((valid) => {
          if (valid) {
            //console.log("用户信息："+this.$store.state.userInf.token)
            var user = JSON.stringify(this.loginForm);
            //console.log(user)
            axios.post(this.$consts.MY_IP+'/login', user,{
              headers: {
              'Content-Type': 'application/json'
              }
            })
            .then(res => {
              if(res.data.code==0){
                Message.info('账号或密码错误');
              }else{
                Message.success('登录成功')
                this.$store.state.userInf.userId = res.data.data.userId;
                this.$store.state.userInf.username = res.data.data.username;
                this.$store.state.userInf.post = res.data.data.post;
                this.$store.state.userInf.token = res.data.data.token;
                this.$store.state.localDialogue = [];
                this.$router.push('/dialogue');
              }
              
            })
            .catch(error => {
              console.error('请求数据失败', error);
            });

           
          } else {
            return false;
          }
        });
      }
    }
  };
  </script>
  
  <style scoped>

  .login-container {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    height: 100vh;
    background-color: #f2f2f2;
    border-radius: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  }
  .text{
    
  }
  .login-card {
    width: 400px;
    padding: 20px;
    text-align: center;
  }
  
  .login-title {
    margin-bottom: 20px;
    font-size: 24px;
    font-weight: bold;
  }
  </style>