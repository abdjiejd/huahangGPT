<template>
    
    <div class="one-dialogue">
      <div class="ButtonGroup">
        <el-button size="small" icon="el-icon-sort-up" class="clear-button" @click="ascTime">时间升序</el-button>
        <el-button size="small" icon="el-icon-sort-down" class="clear-button" @click="descTime">时间降序</el-button>
      </div>
      <div ref="chatContainer" class="chat-container">
        <div v-for="(message, index) in messages" :key="index" class="message-container">
          <p v-if="message.sender === 'user'" class="user-time">{{ message.time }}</p>
          <p v-else class="chatbot-time">{{ message.time }}</p>
          <div v-if="message.sender === 'user'" class="message user-message">
              
            <div class="message-bubble user-bubble">{{ message.text }}</div>
            <div class="user-avatar">
                  <img src="../assets/user1.jpg" alt="User Avatar"/>
            </div>
          </div>
          <div v-else class="message chatbot-message">
            <div class="chatbot-avatar">
              <img src="../assets/chatbot1.png" alt="Chatbot Avatar"/>
            </div>
            <!-- <div class="message-bubble chatbot-bubble">正在加载中... <i class="el-icon-loading"></i></div> -->
            <div class="message-bubble chatbot-bubble">{{message.text}}</div>
          </div>
        </div>
      </div>
      
    </div>
    </template>
    
    <script>
    import axios from 'axios'
import { Message } from 'element-ui';
    export default {
      data() {
        return {
          messages: [],
          results:[],
          order:1
        };
      },
      created(){
        axios.get(this.$consts.MY_IP+'/histories', {
        params: {
          id:this.$store.state.userInf.userId,
          num:100
        },
        headers: {
              'Content-Type': 'application/json',
              'token': this.$store.state.userInf.token
        }
      })
      .then(response => {
        if(response.data.code==1){
          this.results = response.data.data;
          this.initMessage(this.results)
        }else{
          Message.error("登录已过期，请重新登录！");
          this.$store.state.userInf.token = '';
          this.$router.push('/login');
        }
        
        
      })
      .catch(error => {
        console.error('请求历史记录失败：', error);
      });
        
      },
      methods:{
        ascTime(){
          if(this.order == 1){
            return;
          }
          this.results.reverse(); 
          this.order = 1;
          this.initMessage(this.results);
        },
        descTime(){
          if(this.order == 2){
            return;
          }
          this.order = 2;
          this.results.reverse();
          this.initMessage(this.results);
        },
        initMessage(res){
          this.messages = [];
          res.forEach(item => {
          var questionMessage = {
            sender:'user',
            text:'',
            time:''
          }
          var answerMessage = {
            sender:'chatbot',
            text:'',
            time:''
          }
          questionMessage.text = item.question;
          questionMessage.time = item.questionTime;
          answerMessage.text = item.answer;
          answerMessage.time = item.answerTime;
          this.$set(this.messages, this.messages.length,questionMessage);
          this.$set(this.messages, this.messages.length,answerMessage);
        });

        }
      },
      beforeDestroy(){
        
      }
    };
    </script>
    
    <style scoped>
    .one-dialogue{
      width: 90%;
    }
    .chat-container {
      width: 100%;
      height: 500px; 
      overflow-y: auto; /* 当内容超过最大高度时出现垂直滚动条 */
     /* box-shadow: 0 2px 4px rgba(0, 0, 0, .04), 0 0 6px rgba(0, 0, 0, .04);
     box-shadow: -5px -5px 5px #888888;   从左上角开始的阴影效果 */ /* 水平偏移，垂直偏移，模糊半径，颜色 */
      /*background-color: #fcfcfc;
      border-top: 1px solid rgb(237, 229, 229);*/
      /*margin-bottom: 3px;*/
    }
    .message-container {
      overflow: hidden;
      margin-bottom: 10px;
      padding-left: 20px;
      padding-right: 20px;
    }
    
    .chatbot-message  {
      display: flex;
      max-width: 600px;
      align-items: flex-start;
    }
    
    .el-icon-user-solid {
      margin-right: 10px;
    }
    .user-avatar{
      margin-right: 10px;
    }
    
     .chatbot-bubble {
      
      background-color: #E8E8E8;
      border-radius: 15px 15px 15px 0;
      padding: 10px;
    }
    
    .user-message{
      display: flex;
      max-width: 600px;
      align-items: flex-start;
      float: right;
    }
    
    .chatbot-avatar {
      margin-left: 10px;
    }
    
    .user-bubble{
      background-color: #DCF8C6;
      border-radius: 15px 15px 0 15px;
      padding: 10px;
    }
    
    .chatbot-avatar img, .user-avatar img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }
    .user-time{
      text-align: right;
      
    }
    .chatbot-time,.user-time{
      display: block;
      font-size: 0.8em;
      color: #999;
    }
    .ButtonGroup{
      display: flex;
      justify-content: center;
      background-color: white;
    }
    </style>