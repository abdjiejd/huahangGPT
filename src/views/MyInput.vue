<template>
  <div class="input">
    <div class="select-button">
        <el-switch
        v-model="value1"
        active-text="联想模式"
        inactive-text="">
        </el-switch>
    </div>

   <div class="input-send">
        <el-input
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 2}"
            placeholder="请输入内容"
            @keydown.native="handleKeyCode($event)"
         v-model="textarea">
        
        </el-input>
        <el-button ref="sendButton" type="primary" @click="send">发送 <i class="el-icon-s-promotion"></i></el-button>
    </div>
  </div>
</template>

<script>
import { Message } from 'element-ui';
import Bus from '../utils/EventBus'
export default {
    data() {
        return {
            textarea: '',
            value1:true
        }
    },
    created(){

    },
    mounted(){
        
    },
    beforeDestroy(){
        window.removeEventListener('keydown', this.handleKeyCode);
        const button = this.$refs.sendButton.$el;
        button.removeEventListener('click', this.send);
        
    },
    methods:{
        handleKeyCode(event) {
            if (event.keyCode == 13) {
                if (!event.metaKey) {
                    event.preventDefault();
                    this.send();
                } else {
                    this.messageTxt = this.messageTxt + '\n';
                }
            }
        },
        
        send(){
            if(this.textarea==''){
                Message.error("请输入内容！");
                return;
            }
            var mode = 0;
            if(this.value1){
                mode = 1;
            }
            var msg = {
                msg:this.textarea,
                mode:mode
            }
            Bus.$emit('sendMsg',msg);
            this.textarea='';
        }
    }
}
</script>

<style scoped>
.input{
    width: 85%;
    display: flex;
    margin-bottom:3px;
    flex:1;
    align-items:flex-end;
    flex-direction: column;
    justify-content: flex-end;
}
.select-button{
    margin:10px;
}
.input-send{
    width: 100%;
    display: flex;
}
</style>