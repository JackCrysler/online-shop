import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import Index from '@/views/index/index.vue'
import Login from '@/views/login/login.vue'
import Register from '@/views/register/register.vue'
import Search from '@/views/search/search.vue'
import Home from '@/views/home/home.vue'
//import Catagory from '@/views/catagory/catagory.vue'
const Catagory = ()=>import(/* webpackChunkName: "catagory" */ '@/views/catagory/catagory.vue')
//import Cart from '@/views/cart/cart.vue'
const Cart = ()=>import(/* webpackChunkName: "cart" */ '@/views/cart/cart.vue')
import Mine from '@/views/mine/mine.vue'
import Detail from '@/views/detail/detail.vue'
import Signout from '@/views/mine/setup.vue'
import Addradmin from '@/views/mine/address.vue'
import Addaddr from '@/views/mine/addadr.vue'
import Order from '@/views/order/order.vue'

//utils
import {getCookie} from '@/utils/utils'

let router = new VueRouter({
    mode:'history',
    routes:[
        {
            path:'/',
            redirect:'/index/home'
        },
        {
            name:'index',
            path:'/index',
            component: Index,
            children:[
                {
                    name:'home',
                    path:'home',
                    component:Home
                },
                {
                    name:'catagory',
                    path:'catagory',
                    component:Catagory
                },
                {
                    name:'cart',
                    path:'cart',
                    component:Cart
                },
                {
                    name:'mine',
                    path:'mine',
                    component:Mine
                }
            ]
        },
        {
            name:'detail',
            path:'/detail',
            component: Detail
        },
        {
            name:'search',
            path:'/search',
            component: Search
        },
        {
            name:'login',
            path:'/login',
            component: Login
        },
        {
            name:'register',
            path:'/register',
            component: Register
        },
        {
            name:'signout',
            path:'/signout',
            component: Signout
        },
        {
            name:'addradmin',
            path:'/addradmin',
            component: Addradmin
        },
        {
            name:'addaddr',
            path:'/addaddr',
            component: Addaddr
        },
        {
            name:'order',
            path:'/order/:type',
            component: Order
        }
    ]
})

router.beforeEach((to,from,next)=>{

    if(to.name=="mine" || to.name=="cart"){
        let token = getCookie('token');
        if(!token){
            next({name:"login",query:{from:to.name}})
        }else{
            next()
        }
    }else{
        next()
    }
    
})

export default router