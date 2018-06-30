<template>
    <div>
        <h1>this is order page</h1>
        
        <p>
            <router-link replace :to="{name:'order',params:{type:'all'}}">全部</router-link>
            <router-link replace :to="{name:'order',params:{type:'obligation'}}">待付款</router-link>
            <router-link replace :to="{name:'order',params:{type:'wait'}}">待收货</router-link>
            <router-link replace :to="{name:'order',params:{type:'tobedelivery'}}">待发货</router-link>
        </p>
        <h2>{{$route.params.type}}</h2>
        <ul>
            <li></li>
        </ul>
    </div>
</template>
<script>
export default {
    mounted(){
        
    },
    watch:{
        $route(n,o){
            console.log(n)
        }
    },
    methods:{
        
    }
}
</script>
<style lang="scss" scoped>
.router-link-active{
    color: red;
    border-bottom: 1px solid red;
}
</style>
