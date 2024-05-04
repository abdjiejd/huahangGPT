import Vue from 'vue'
import HomePage from '@/views/HomePage.vue'
import UploadFile from '@/views/UploadFile.vue'
import MyHistory from '@/views/MyHistory'
import DialoguePage from '@/views/DialoguePage'

import VueRouter from 'vue-router'
import MyLogin from '../views/MyLogin'
import { Message } from 'element-ui';
import Bus from '@/utils/EventBus'
import store from '@/store/index'
import YourFeedback from '@/views/YourFeedback.vue'
import AboutUs from '@/views/AboutUs.vue'
import axios from 'axios'

import * as consts from '../../const';

Vue.use(VueRouter)
const router = new VueRouter({
    routes:[
      { 
        path:'/',
        component: HomePage,
        children:[
          {
            path:'dialogue',
            component:DialoguePage
          },
          {
            path:'upload',
            component:UploadFile
          },
          {
            path:'history',
            component:MyHistory
          }
        ]
      },
      { path:'/about', component: AboutUs },
      { path:'/feedback', component: YourFeedback },
      { path:'/login', component:MyLogin}
    ],
})
const authUrls = ['/dialogue','/about','/feedback'];
router.beforeEach((to, from, next) => { 
  
  if(authUrls.includes(to.path)){
    if( store.state.userInf.token==='' ){  
      Message.info("请先登录")
      next('/login')
    }else{
  
      axios.get(consts.MY_IP+'/check', {
        headers: {
          'token': store.state.userInf.token
        }
      })
      .then(res => {
        if (res.data.code === 1) {
          if(from.path=='/login'){
            Bus.$emit('navChange')
          }
          next()
        } else {
          Message.error('登录验证已过期，请重新登录')
          next('login')
        }
      })
      .catch(error => {
        console.error('发送请求失败', error)
      })
    }
  }else{
    next();
  }
 
})
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject)
    return originalPush.call(this, location, onResolve, onReject);
  return originalPush.call(this, location).catch((err) => err);
};
export default router