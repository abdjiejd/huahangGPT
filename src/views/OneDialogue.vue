<template>
  <div class="one-dialogue">
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
    <div class="ButtonGroup">
      <el-button size="small" icon="el-icon-delete" class="clear-button" @click="clearMessage">清空会话</el-button>
      <el-button size="small" icon="el-icon-top" class="clear-button" @click="scrollToTop">返回顶部</el-button>
      <el-button size="small" icon="el-icon-bottom" class="clear-button" @click="scrollToBottom">返回底部</el-button>
    </div>
  </div>
  </template>
  
  <script>
import { Message } from 'element-ui';
import Bus from '../utils/EventBus'
  import axios from 'axios'
  export default {
    data() {
      return {
        messages: [],
      };
    },
    created(){
      
      var localDialogue = this.$store.state.localDialogue
      for(let i=0;i<localDialogue.length;i++){
        var questionMessage = localDialogue[i].questionMessage;
        var answerMessage = localDialogue[i].answerMessage;
        console.log(questionMessage.text)
        this.$set(this.messages, this.messages.length,questionMessage);
        this.$set(this.messages, this.messages.length,answerMessage);
        this.$nextTick(() => {
          this.scrollToBottom();
        });
      }
      
      //监听输入框发送来的问题
      Bus.$on('sendMsg',(msg) => {
        var questionTime = new Date();
        var questionMessage = {
            sender:'user',
            text:msg.msg,
            time:questionTime
        }
        this.$set(this.messages, this.messages.length,questionMessage);
        this.$nextTick(() => {
          this.scrollToBottom();
        });
        var question = {
          message:msg.msg,
          mode:msg.mode,
          userId:this.$store.state.userInf.userId,
          questionTime:questionTime
        }
        let loadingInstance = this.$loading({
          lock: true,
          text: '正在加载中，请稍等...',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });

        axios.post(this.$consts.MY_IP+'/dialogue', question,{
              headers: {
              'Content-Type': 'application/json',
              'token': this.$store.state.userInf.token
              }
        })
        .then(res => {
          loadingInstance.close();
          if(res.data.code==1){
            var answerMessage = {
            sender:'chatbot',
            text:res.data.data.answer,
            time:res.data.data.answerTime
            }
            this.$set(this.messages, this.messages.length,answerMessage);
            this.$nextTick(() => {
            this.scrollToBottom();
            });
            var localMessage = {
              questionMessage,
              answerMessage
            }
            this.addLocalMessage(localMessage);
          }else{
            Message.error("登录已过期，请重新登录！");
            this.$store.state.userInf.token = '';
            this.$router.push('/login');
          }
        })
        .catch(error => {
          console.error('请求数据失败', error);
        });


        
      })


    },
    beforeDestroy(){
      Bus.$off('sendMsg');
      
    },
    methods:{
      
      scrollToBottom() {
        this.$nextTick(() => {
          const chatContainer = this.$refs.chatContainer;
          if(chatContainer!=null){
            chatContainer.scrollTop = chatContainer.scrollHeight;
          }
        });
      },
      clearMessage() {
        this.$confirm('是否清空会话？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.messages=[];
          this.$store.state.localDialogue = [];
          this.$message({
            type: 'success',
            message: '清空会话成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });          
        });
        
      },
      scrollToTop() {
        const chatContainer = this.$refs.chatContainer;
        chatContainer.scrollTop = 0;
      },
      addLocalMessage(localMessage){
        this.$store.state.localDialogue.push(localMessage);
      }
      
    }
  };
  </script>
  
  <style>
  .one-dialogue{
    width: 100%;
  }
  .chat-container {
    width: 100%;
    height: 500px; 
    overflow-y: auto; /* 当内容超过最大高度时出现垂直滚动条 */
    /*box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);*/
    /*box-shadow: -5px -5px 5px #888888;  从左上角开始的阴影效果 */ /* 水平偏移，垂直偏移，模糊半径，颜色 */
    background-color: #fcfcfc;
    border-bottom: 1px solid rgb(185, 182, 182);/**/
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
    margin-left: 10px;
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
    margin-right: 10px;
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
  }
  </style>