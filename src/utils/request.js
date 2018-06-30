import Vue from 'vue'
import axios from 'axios'

console.log(process.env.NODE_ENV)
//测试服务器
const testUrl = 'http://192.168.191.1:3000'
//线上服务器
const onlineUrl = 'http://192.168.191.1:3000' || 'https://m.jd.com'
let httpInstance = axios.create({
    headers:{
        //"Content-Type":"application/x-www-form-urlencoded"
        "Content-Type":"application/json"
    },
    baseURL: process.env.NODE_ENV==='production'? onlineUrl:testUrl
})

httpInstance.interceptors.request.use((config)=>{
    
    return config
},(err)=>{
    console.log(err)
})

httpInstance.interceptors.response.use((response)=>{
    if(response.status === 200){
        return response.data
    }else{
        return response
    }
})


const anotherInstance = axios.create({})
export {httpInstance,anotherInstance}
export default {
    install(Vue){
        Object.defineProperty(Vue.prototype,'$http',{
            value:httpInstance
        })
    }
}

