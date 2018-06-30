<template>
  <div class="classify flex-box">
    <div class="search">
      <span></span>
      <p><input type="text" @click="goToSearch" placeholder="请输入您想要购买的宝贝"></p>
      <span class="iconfont icon-msg"></span>
    </div>
    <div class="content">
      <aside>
        <p @click="getData($event)" :class="code==17951827?'active':''" data-id="17951827">热门分类</p>
        <p @click="getData($event)" :class="code==17951828?'active':''" data-id="17951828">手机数码</p>
        <p @click="getData($event)" :class="code==17951829?'active':''" data-id="17951829">电脑办公</p>
        <p @click="getData($event)" :class="code==17951830?'active':''" data-id="17951830">电视影音</p>
        <p @click="getData($event)" :class="code==17951831?'active':''" data-id="17951831">空调冰洗</p>
        <p @click="getData($event)" :class="code==17951832?'active':''" data-id="17951832">厨房卫浴</p>
        <p @click="getData($event)" :class="code==17951833?'active':''" data-id="17951833">生活电器</p>
        <p @click="getData($event)" :class="code==17951834?'active':''" data-id="17951834">食品酒</p>
        <p @click="getData($event)" :class="code==17951835?'active':''" data-id="17951835">美妆个护</p>
        <p @click="getData($event)" :class="code==17951836?'active':''" data-id="17951836">母婴玩具</p>
        <p @click="getData($event)" :class="code==17951837?'active':''" data-id="17951837">医疗保健</p>
      </aside>
      <div class="content-box">
        <div v-for="(item,index) in shoplist" :key="index">
          <p class="tit">{{item.goodsTypeName}}</p>
          <div class="floor">
            <div v-for="(v,i) in item.goodsTypeList" :key="i">
              <dl>
                <dt><img :src="v.goodsTypeImgUrl" alt=""></dt>
                <dd>{{v.goodsTypeName}}</dd>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  data() {
    return {
      code:17951827
    };
  },
  computed:{
      shoplist(){
          return this.catagoryData[this.code]
      },
    ...mapState(['catagoryData'])
  },
  methods: {
    getData(e) {
      let id = e.target.getAttribute('data-id');
      this.code = id;
      this.$store.dispatch('fetchList',id)
    },
    goToSearch(){
        this.$router.push({
            name:'search'
        })
    }
  },
  mounted(){
      
  }
};
</script>

<style lang="scss" scoped>
.classify {
  .search {
    height: 0.9rem;
    display: flex;
    line-height: 0.9rem;
    span {
      flex-basis: 1.1rem;
      text-align: center;
    }
    p {
      flex: 1;
      input {
        width: 100%;
        height: 0.6rem;
        background: #f5f5f5;
        border: 0;
        text-align: center;
        border-radius: 5px;
      }
    }
  }
}
.content {
  flex: 1;
  overflow: hidden;
  display: flex;
  aside {
    width: 2.16rem;
    height: 100%;
    overflow-y: scroll;
    line-height: 2;
    flex-shrink: 0;
    background: #eeeeee;
    p {
      height: 0.76rem;
      color: #666;
      line-height: 0.76rem;
      text-align: center;
      span {
        padding: 0 0.1rem;
      }
    }
  }
  .content-box {
    flex: 1;
    overflow-y: scroll;
    .tit{
      line-height: 2;
      color:#666;
      padding-left: .1rem;
    }
    .floor{
      display: flex;
      flex-wrap: wrap;
      div{
        width:33%;
        padding: 5px;
        dl{
          background: #eee;
          text-align: center;
          dt {
            padding: 0.1rem 0;
            img {
              width: 0.9rem;
              height: 1.2rem;
            }
          }
          dd{
            line-height: 2;
            color: #666;
            white-space:nowrap;
            overflow:hidden;
            text-overflow:ellipsis;
          }
        }
      }

    }
  }
}
.active{
    border-left: 2px solid rgb(252, 23, 61);
    background: #fff;
}
</style>
