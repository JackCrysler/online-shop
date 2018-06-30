<template>
  <div class="box">
    <div class='head'>
      <span> </span>
      <span></span>
      <div class="shop">
        <span>购物车</span>
      </div>
      <div>
        <span class="bianji" @click="editFunc">{{edit}}</span>
        <span>✉</span>
      </div>
    </div>
    <div class='main'>
      <div class="list" v-show="$store.state.cartList.length==0">
        你的购物车啥也没有！
      </div>
      <goods-item v-on:update="fetchList" v-for="(val,index) in $store.state.cartList" :key="index" v-bind:list="val"></goods-item>
    </div>
    <div class="bottom">
      <div class="bottomLeft">
        <span :class="checkedClass" @click="selectedAll"></span>
        <span>全选</span>
      </div>
      <div class="bottomRight">
        <div class="allPrice">
          <span>合计
            <b>${{total}}</b>
          </span>
          <span>(运费：￥0)</span>
        </div>
        <div>
          <button @click="next">{{type}}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getCookie,bus } from "../../utils/utils.js";
import goodsitem from "./goodsitem.vue";
export default {
  data() {
    return {
      data: [],
      list:{
        
      },
      flag:false,
      total:0,
      type:'结算',
      edit:'编辑'
    };
  },
  created() {
    //this.fetchList();
    this.$store.dispatch('fetchCartList')
  },
  computed:{
    checkedClass(){
        let str = 'iconfont '
        return this.flag ? str+'icon-checked':str+'icon-unchecked'
    }
  },
  mounted(){
    /* bus.$on('updates',()=>{
      console.log('update')
      this.fetchList()
    }) */
    //从来没有this.$on的写法
    bus.$on('goodsChecked',(data)=>{

      this.list[data.name] = data.price;
      this.sumup()
    })
  },
  methods: {
    fetchList() {
      this.$http
        .post("/api/goodslist", {
          token: getCookie("token")
        })
        .then(res => {
          if (res.code == 0) {
            if (confirm("登录超时，请重新登陆")) {
              this.$router.push({
                name: "login",
                query: {
                  from: "cart"
                }
              });
            } else {

            }
          } else {
            this.data = res.data;
          }
        });
    },
    sumup(){
      
      this.total =  Object.values(this.list).reduce((init,item)=>{
          return init+item
      },0)
    },
    selectedAll(){
      this.flag = !this.flag;
      bus.$emit('selected-all',this.flag)
    },
    editFunc(){
      if(this.edit=='编辑'){
          
        this.type ='删除'
        this.edit = '完成'
      }else{
        this.type ='结算'
        this.edit = '编辑'
      }
    },
    next(){
      if(this.type=="结算"){
        //跳转支付平台
      }else{
        if(confirm('您确定要删除吗？')){
          let arr = []
          for(let i in this.list){
            if(this.list[i]!=0){
              arr.push(i)
            }
          }
          this.$http.post('/api/cart/del',{
            token:getCookie('token'),
            goodsname: arr
          }).then(res=>{
            console.log(res)
          })
        }
        
      }
    }
  },
  components: {
    "goods-item": goodsitem
  }
};
</script>

<style scoped>
.box {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background-color: #eeeeee;
}
.head {
  width: 100%;
  height: 0.97rem;
  display: flex;
  border-bottom: 0.01rem solid #ccc;
  align-items: center;
  justify-content: space-around;
  position: relative;
  background-color: #fafafb;
}
.head div {
  display: flex;
}
.main {
  width: 100%;
  flex: 1;
  overflow-y: scroll;
}
span {
  color: #464646;
}
.bianji {
  margin-right: 0.3rem;
}
.shop {
  position: absolute;
  left: 50%;
  transform: translatex(-50%);
}
.bottom {
  width: 100%;
  height: 0.97rem;
  background-color: #fff;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.allPrice {
  display: flex;
  flex-direction: column;
  margin-right: 0.3rem;
}
.bottomRight {
  display: flex;
  align-items: center;
}
button {
  width: 2.55rem;
  height: 0.9rem;
  border: none;
  outline: none;
  background-color: #fc4141;
  color: #fff;
  text-align: center;
  line-height: 0.9rem;
}
.text {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
</style>





