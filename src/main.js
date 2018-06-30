import Vue from 'vue'
import App from './App.vue'
//引用reset样式
import './assets/reset.css'
//引用common样式
import './assets/common.css'
//引用font
import './assets/font/iconfont.css'
//引用路由配置模块
import router from './router/config'
//引用数据请求模块
import http from "@/utils/request.js";
Vue.use(http)
//lazyload plugin

Vue.use(LazyLoad,{
  loading:'/src/assets/img/loading.png'
})
//引用Vuex
import Store from '@/store/store'
//引用验证组件
import VueLidate from 'vuelidate'
Vue.use(VueLidate)
//应用自定义toast组件
import Toast from '@/plugins/toast'
//import Toast from 'j-toast'
Vue.use(Toast,{
  name:'Toast',
  timeout: 30000,
  autoclose: false
})

new Vue({
  el: '#app',
  router,
  store:Store,
  render: h => h(App)
})

import LazyLoad from 'vue-lazyload'
