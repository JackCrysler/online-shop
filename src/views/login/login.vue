<template>
    <div>
        <header>登录 <button @click="goToRegister">去注册</button></header>
        <p><label for="username">用户名</label><input v-model="username" id="username" type="text" placeholder="请输入手机号" /></p>
        <p><label for="password">密码</label><input v-model="password" id="password" type="password" placeholder="请输入至少6位数字" /></p>
        <button @click="goToLogin">登录</button>
        <Toast></Toast>
    </div>
</template>
<script>
import {setCookie} from '../../utils/utils.js'
export default {
    data(){
        return {
            username:'',
            password:'',
        }
    },
    methods:{
        goToLogin(){
            let regPhone = /^1[3578]\d{9}$/;
            if(!regPhone.test(this.username)){
                alert('请输入正确的手机号')
                return
            }
            let regPassword = /\d{6,}/;
            if(!regPassword.test(this.password)){
                alert('请输入正确格式的密码')
                return
            }
            if(!this.username || !this.password ){
                alert('请填写所有信息')
                return
            }
            this.$http.post('/api/user/login',{
                username:this.username,
                password:this.password
            }).then(res=>{
                if(res.code==1){
                    setCookie('token',res.token)
                    //document.cookie = `token=${res.token}`
                    this.$router.push({
                        name:this.$route.query.from || "home"
                    })
                }else{
                    this.$toastBus.$emit('toast',res.msg)
                }
            })
        },
        goToRegister(){
            this.$router.push({
                name:'register'
            })
        }
    },
    mounted(){
        console.log(this.$route)
    }
}
</script>
<style lang="scss" scoped>

</style>
