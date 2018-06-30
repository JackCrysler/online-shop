<template>
    <div>
        <header>注册</header>
        <p><label for="username">用户名</label><input v-model="username" id="username" type="text" placeholder="请输入手机号" /></p>
        <p><label for="password">密码</label><input v-model="password" id="password" type="password" placeholder="请输入至少6位数字" /></p>
        <p><label for="password-r">密码</label><input v-model="passwordr" id="password-r" type="password" /></p>
        <button @click="goToRegister">注册</button>
    </div>
</template>
<script>
// /api/user/register  /api/user/login post
//import {required,minLength} from 'vuelidate/lib/validators'

export default {
    data(){
        return {
            username:'',
            password:'',
            passwordr:''
        }
    },
    methods:{
        goToRegister(){
            
            let regPhone = /^1[3578]\d{9}/;
            if(!regPhone.test(this.username)){
                alert('请输入正确的手机号')
                return
            }
            let regPassword = /\d{6,}/;
            if(!regPassword.test(this.password)){
                alert('请输入正确格式的密码')
                return
            }
            if(this.password!==this.passwordr){
                alert('前后密码不一致')
                return
            }
            if(!this.username || !this.password ||!this.passwordr){
                alert('请填写所有信息')
                return
            }

            this.$http.post('/api/user/register',{
                username:this.username,
                password:this.password
            }).then(res=>{
                console.log(res)
                if(res.code==1){
                    this.$router.push({
                        name:'login'
                    })
                }
            })

        }
    }   
}
</script>
<style lang="scss" scoped>

</style>
