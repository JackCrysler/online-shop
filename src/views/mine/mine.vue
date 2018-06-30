<template>
    <div>
        <header class="header">
            <i class="icon iconfont icon-shezhi" @click="signout"></i>
            <span>我的717商城</span>
             <i class="icon iconfont icon-xiaoxi"></i>
        </header>
        <div class="top">
            <div class="img">
                <!-- <form onsubmit="" action="接口地址" enctype="multipart/form-data">
                </form> -->
                <!-- <input type="file"> -->
                <img src="../../assets/img/5.jpg" alt="">
                
            </div>
            <p class="username">路飞</p>
        </div>
        <div class="shop">
            <span>
                <i class="iconfont icon-dianpu"></i>
                我的店铺
            </span>
            <i class="iconfont icon-webicon213"></i>
        </div>
        <ul class="order">
            <li>
                <i class="iconfont icon-nopayment"></i>
                <span @click="goToOrder('obligation')">待付款</span>
            </li>
            <li>
               <i class="iconfont icon-daishouhuo"></i>
                <span @click="goToOrder('wait')">待收货</span>
            </li>
            <li>
                <i class="iconfont icon-daifahuo"></i>
                <span @click="goToOrder('tobedelivery')">待发货</span>
            </li>
            <li>
                <i class="iconfont icon-shouhou"></i>
                <span @click="goToOrder('aftersale')">售后</span>
            </li>
            <li>
                <i class="iconfont icon-wodedingdan"></i>
                <span @click="goToOrder('all')">我的订单</span>
            </li>
        </ul>
        <ul class="list">
            <li>
                <p>
                   <i class="iconfont icon-yue"></i>
                    <span>账号余额</span>
                </p>
                <i class="iconfont icon-go"></i>
            </li>
            <li @click="addrAdmin">
                <p>
                    <i class="iconfont icon-dizhi"></i>
                    <span>地址管理</span>
                </p>
                <i class="iconfont icon-go"></i>
            </li>
            <li>
                <p>
                    <i class="iconfont icon-kefu"></i>
                    <span>我的客服</span>
                </p>
                <i class="iconfont icon-go"></i>
            </li>
        </ul>
        <Toast ref="toast">Are you sure ?</Toast>
    </div>
</template>
<script>
// 前后台数据交互，数据分类型的：纯文本，JSON，formData（二进制）
// application/json 和 application/x-www-form-urlencoded
// multipart/form-data
export default {
    data(){
        return {
            
        }
    },
    methods:{
        addrAdmin(){
            this.$router.push({
                name:"addradmin"
            })
        },
        signout(){
            this.$router.push({
                name:'signout'
            })
        },
        goToOrder(type){
            this.$router.push({
                name:'order',
                params:{
                    type:type
                }
            })
        }
    }
}
</script>
<style scoped>
.header {
  height: 40px;
  line-height: 40px;
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
  width: 100%;
}
.top {
  height: 80px;
  width: 100%;
  background: url("../../assets/img/6.jpg");
}
.shop {
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 0 10px;
  height: 80px;
  font-size: 0.2rem;
  line-height: 80px;
  color: #fc4141;
}

.order {
  display: flex;
  justify-content: space-around;
  height: 60px;
}
.order li {
  display: flex;
  flex-direction: column;
  align-items: center;
  line-height: 30px;
}

.list li{
    display: flex;
    justify-content: space-between;
    padding: 0 10px;
    height: 45px;
    line-height: 45px;
    border-bottom: 1px solid #eee;
}
.img{
    width:60px;
    height: 60px;
    margin:0 auto;
    padding-top: 10px;
    text-align: center;
}
.img img{
    width:100%;
    height: 100%;
    border-radius: 50%;
}
.username{
    text-align: center;
    line-height: 20px;
    color:#fff;
}
</style>


