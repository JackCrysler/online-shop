<template>
    <div class="flex-box">
        <header>
            <h1><input type="text" @click="gotoSearch"></h1>
        </header>
        <div class="wrap" @scroll="onScrollFn" ref="wrap">
            <div class="swiper-container" ref="swiper">
                <div class="swiper-wrapper">
                    <div class="swiper-slide"><img src="../../assets/img/5.jpg" alt=""></div>
                    <div class="swiper-slide"><img src="../../assets/img/6.jpg" alt=""></div>
                    <div class="swiper-slide"><img src="../../assets/img/7.jpg" alt=""></div>
                </div>
            </div>
            <ul ref="list" class="ks-clear">
                <li v-for="(item,index) in list" :key="index">
                    <GoodsItem v-bind:data="item" :instance="$refs.addCartSuc"></GoodsItem>
                </li>
            </ul>
            <p class="tips">{{tips}}</p>
        </div>
        <Toast ref="addCartSuc"></Toast>
    </div>

</template>
<script>
//import Swiper from "swiper";
import "swiper/dist/css/swiper.css";
import GoodsItem from "@/components/goodsItem";
import jsonp from "@/utils/jsonp";
export default {
  data() {
    return {
      list: [],
      canIQuery: true,
      page:1,
      tips:'正在为你加载更多数据...'
    };
  },
  methods: {
    gotoSearch() {
      this.$router.push({
        name: "search"
      });
    },
    onScrollFn() {
      let winH = this.$refs.wrap.offsetHeight;
      let docH = this.$refs.list.offsetHeight + this.$refs.swiper.offsetHeight;
      let scrollH = this.$refs.wrap.scrollTop;
      //console.log(winH,docH,scrollH)
      if (docH - winH - scrollH < 30 && this.canIQuery) {
        this.page++;
        this.canIQuery = false;
        this.$http(`/api/index/recommend.action?page=${this.page}`).then(res => {
          if(res.code===1000){
            this.tips = '我是有底线的。'
          }else{
            this.list = [
            ...this.list,
            ...JSON.parse(JSON.parse(res).recommend).wareInfoList
          ];
          }
          
          this.canIQuery = true;
        });
      }
    }
  },
  components: {
    GoodsItem
  },
  mounted() {
    //实例化swiper
    //new Swiper(this.$refs.swiper, {});
    //列表商品初始请求
    this.$http.get(`/api/index/recommend.action?page=${this.page}`).then(res => {
      this.list = JSON.parse(JSON.parse(res).recommend).wareInfoList;
    });
    
  }
};
</script>
<style lang="scss" scoped>
h1{
  text-align: center;
}
.swiper-container {
  height: 3.5rem;
  img {
    width: 100%;
  }
}
.wrap {
  flex: 1;
  overflow: auto;
  ul{
    border-top: 1px solid #ccc;
  }
  li{
    width: 50%;
    float: left;
    border-bottom: 1px solid #ccc;
    &:nth-of-type(2n+1){
        border-right: 1px solid #ccc;
    }
  }
}
.tips{
  line-height: 3;
  text-align: center;
}
</style>
