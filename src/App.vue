<template>
  <div class="app">
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
      <el-menu-item index="1">主页</el-menu-item>
      <el-menu-item index="2">反馈</el-menu-item>
      <el-menu-item index="3">关于我们</el-menu-item>
      <el-menu-item index="4">登录</el-menu-item>
    </el-menu>  
    <router-view></router-view>
  </div>
</template>

<script>
import Bus from './utils/EventBus'
export default {
  data(){
    return{
      activeIndex: '1',
      initPath:'/',
      pathArr:['/dialogue','/feedback','/about','/login']
    }
  },
  components:{
    
  },
  methods:{
    handleSelect(key) {
        if (this.$route.path !== this.pathArr[key-1]) {
          this.$router.push(this.pathArr[key-1]);
        }
        this.activeIndex =  String(this.pathArr.indexOf(this.pathArr[key-1])+1);
    },
    onBeforeunload(){
      localStorage.setItem('vue-x', JSON.stringify(this.$store.state));
    }
  },
  beforeCreate(){
    if(this.$route.path !== '/dialogue') {
      this.$router.push('/dialogue');
    }
  },
  created(){
    console.log(this.$consts.MY_IP)
    // 关闭或刷新窗口调用事件
    window.addEventListener('beforeunload', this.onBeforeunload)
    //导航高亮监听
    Bus.$on('navChange',() => {
      this.activeIndex = '1';
    })
  },
}
</script>

<style>
html, body {
  height: 100%;
  margin: 0;
}
.app{
  display: flex;
  flex-direction: column;
  height: 100%;
}
</style>