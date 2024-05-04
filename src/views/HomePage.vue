<template>
  <div class="my-body">
      <div class="two-menu">
    
        <el-menu
          default-active="1"
          class="el-menu-vertical-demo"
          @select="handleSelect"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b">
          <el-menu-item index="1">
            <i class="el-icon-chat-dot-round"></i>
            <span slot="title">对话</span>
          </el-menu-item>
          <el-menu-item index="2">
            <i class="el-icon-upload"></i>
            <span slot="title">上传文件</span>
          </el-menu-item>
          <el-menu-item index="3">
            <i class="el-icon-document"></i>
            <span slot="title">对话历史</span>
          </el-menu-item>
        </el-menu>
      
    </div>
    <div class="small-body">
      <router-view></router-view>
    </div>
  </div>
</template>
  
  <script>
  
  export default {
    data(){
      return{
        pathArr:[
          '/dialogue',
          '/upload',
          '/history'
        ]
      }
    },
    components:{
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
        if (this.$route.path !== this.pathArr[key-1]) {
          this.$router.push(this.pathArr[key-1]);
        }
      },
      beforeCreate(){
        this.$router.push('/dialogue');
      }
    }
  }
  </script>
  
  <style scoped>
  .my-body{
    display: flex;
    flex: 1;
  }
  .el-menu-vertical-demo {
    width: 200px; /* 设置菜单的宽度 */
    font-size: 14px; /* 设置字体大小 */
  }
  .two-menu {
    height: 100%;
  }
  .el-menu-vertical-demo{
    height: 100%;
  }
  .small-body {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: center;
  }
</style>