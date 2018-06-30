<template>
    <div class="list">
        <span :class="checkedClass" @click="flag=!flag"></span>
        <img :src="list.imageurl" />
        <div class="listRight">
            <p class="text">{{list.wname}}</p>
            <div>
                <b>${{list.jdPrice}}</b>
                <span @click="decrement">-</span>
                <span>{{list.count}}</span>
                <span @click="increment">+</span>
            </div>
        </div>
    </div>
</template>
<script>
import {getCookie,bus} from '../../utils/utils.js'
export default {
    props:{
        list:{
            required:true,
            type:Object
        }
    },
    data(){
        return {
            flag:false
        }
    },
    mounted(){
        bus.$on('selected-all',(selected)=>{
            this.flag = selected
        })
    },
    computed:{
        checkedClass(){
            let str = 'iconfont '
            return this.flag ? str+'icon-checked':str+'icon-unchecked'
        }
    },
    watch:{
        flag(n,o){
            bus.$emit("goodsChecked",{//自定义事件，挂在bus实例上
                name:this.list.wname,
                price:n ? this.list.count*this.list.jdPrice:0
            })
        },
        list(n,o){
            bus.$emit("goodsChecked",{//自定义事件，挂在bus实例上
                name:this.list.wname,
                price:this.flag ? this.list.count*this.list.jdPrice:0
            })
        }
    },
    methods:{
        decrement(){
            let count = this.list.count;
            if(count-1<=0)return;
            this.$http.post('/api/cart/count',{
                token:getCookie('token'),
                count: count-1,
                goodsname: this.list.wname 
            }).then(res=>{
                if(res.code==1){
                    //bus.$emit('updates')
                    this.$store.dispatch('fetchCartList');
                }
            })
        },
        increment(){
            let count = this.list.count;
            if(count+1>10)return;
            this.$http.post('/api/cart/count',{
                token: getCookie('token'),
                count: count+1,
                goodsname: this.list.wname 
            }).then(res=>{
                if(res.code==1){
                    //bus.$emit('updates')
                    this.$store.dispatch('fetchCartList')
                }
            })
        },
        toggleChecked(){

        }
    }
}
</script>
<style lang="scss" scoped>

.list {
  width: 100%;
  height: 2.65rem;
  display: flex;
  margin-bottom: 0.2rem;
  background-color: #fff;
  align-items: center;
  justify-content: space-around;
}
.list img {
  width: 2rem;
}
.listRight {
  width: 4.2rem;
  height: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.listRight input {
  width: 1rem;
  height: 0.6rem;
  outline: none;
  border: 0.01rem solid #ccc;
  text-align: center;
}
.listRight {
  display: flex;
}
.listRight {
  justify-content: space-between;
}
.listRight b {
  color: red;
}
.listRight span {
  display: inline-block;
  height: 0.6rem;
  width: 0.6rem;
  border: 0.01rem solid #ccc;
  text-align: center;
  line-height: 0.6rem;
}
</style>

