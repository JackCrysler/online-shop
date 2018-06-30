<template>
    <div class="flex-box">
        <router-view class="home"></router-view>
        <p class="nav">
            <router-link :to="{name:'home'}">首页</router-link>
            <router-link :to="{name:'catagory'}">分类</router-link>
            <router-link :to="{name:'cart'}">购物车</router-link>
            <router-link :to="{name:'mine'}">我的</router-link>
        </p>
    </div>

</template>
<script>
export default {

};
</script>
<style lang="scss" scoped>
.flex-box{
    width: 100%;height: 100%;
}
.home{
    flex:1;
}
.nav{
    height: 45px;
    line-height: 45px;
    display: flex;
    text-align: center;
    border-top: 1px solid #ccc;
    a{
        flex: 1;
        -webkit-tap-highlight-color:rgba(255,255,255,0)
    }
}
</style>
