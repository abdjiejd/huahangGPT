<template>
    <el-upload
    class="upload-demo"
    drag
    :action="url"
    :multiple="true"
    :on-success="handleSuccess"
    :on-error="handleError"
    :limit="100"
    :file-size="104857600"
    :accept="'*'"
    :headers="headers"
    >
    <i class="el-icon-upload"></i>
    <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
    <div class="el-upload__tip" slot="tip"> 华航智言将会参考您上传的文件来回答您的问题</div>
  </el-upload>
</template>

<script>
import { Message } from 'element-ui';
export default {
    data() {
        return {
            headers: {
                'token': this.$store.state.userInf.token,
                
            },
            url: this.$consts.MY_IP+'/upload'
        }
    },
    methods: {
        handleSuccess(res,file,fileList) {
        // 在上传成功时触发
            console.log(res)
            if(res.code==1){
                Message.success("文件上传成功")
            }else if(res.msg=='NO_PERMISSION'){
                fileList.splice(fileList.indexOf(file), 1)
                Message.error("无权限执行此操作");
            }else{
                fileList.splice(fileList.indexOf(file), 1)
                Message.error("登录已过期，请重新登录！");
                this.$store.state.userInf.token = '';
                this.$router.push('/login');
            }
        },
        handleError() {
        // 在上传失败时触发
            Message.error('文件上传失败');
        },
    }
}
</script>

<style>
.upload-demo{
    display: flex;
    flex-direction: column;
    align-items: center;
    flex: 1;
}
</style>