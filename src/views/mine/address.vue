<template>
    <div class="adr_box">
      <div class="address_title">
          <span class="iconfont icon-xiangzuo"></span><h3>收货地址</h3>
      </div>
      <div  class="address_no" v-show="data.length==0">
          <h3 class="adr_h3">您还没有添加地址哦~~~</h3>
      </div>
       <div class="address_list" v-for="(item,index) in data" :key="index">
         <div class="adr_top">
            <p class="adr_user"><span>{{item.name}}</span><span>{{item.phone}}</span></p>
            <h3 class="user_adr">{{item.province}} {{item.city}} {{item.area}} {{item.street}}</h3>
         </div>
         <div class="edit">
             <label for=""><input type="checkbox" class="moren" />默认</label>
             <p>
                <span class="iconfont icon-bianji"></span><span @click="editFn(item)">编辑</span>
                <span class="iconfont icon-shanchu"></span><span>删除</span>
             </p> 	
          </div>
      </div>
      <div class="adr_btn">
         <button @click="addaddr">+新增地址</button>
      </div>
    </div>
</template>
<script>
import { getCookie } from "../../utils/utils.js";
export default {
  data() {
    return {
      data: []
    };
  },
  created() {
    this.$http.post("/api/addrlist", { token: getCookie("token") }).then(res => {
      console.log(res);
      this.data = res.data || [];
    });
  },
  methods: {
    editFn(data) {
      this.$router.push({
        name:'addaddr',
        query:{
          type:'edit',
          name: data.name,
          phone: data.phone,
          province: encodeURI(data.province),
          city:data.city,
          area:data.area,
          street:data.street
        }
      })
    },
    addaddr() {
      this.$router.push({
        name: "addaddr",
        query:{
          type:"add"
        }
      });
    }
  }
};
</script>
<style scoped>
.adr_box {
  width: 100%;
  height: 100%;
  background: #eee;
}
.address_title {
  width: 100%;
  height: 1rem;
  border-bottom: 1px solid #ccc;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background: #fff;
}
.address_title > span {
  width: 0.4rem;
}
.address_title > h3 {
  flex: 1;
  text-align: center;
  font-size: 0.34rem;
}
.address_list {
  background: #fff;
  padding-left: 0.2rem;
  box-sizing: border-box;
  margin-bottom: 0.2rem;
}
.adr_top {
  padding: 0.2rem 0;
  border-bottom: 1px solid #ccc;
}
.adr_user > span {
  font-size: 0.4rem;
  margin-right: 0.1rem;
}
.user_adr {
  padding: 0.2rem 0;
}
.edit {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  padding: 0.15rem 0.2rem 0.15rem 0;
  font-size: 0.4rem;
}
.moren {
  width: 0.4rem;
  height: 0.4rem;
}
.adr_btn {
  width: 4rem;
  margin: 0 auto;
  margin-top: 0.5rem;
  position: fixed;
  left: 50%;
  bottom: 0.5rem;
  transform: translate3d(-50%, 0, 0);
}
.adr_btn > button {
  width: 100%;
  height: 100%;
  border: none;
  padding: 0.3rem 0;
  border-radius: 0.5rem;
  background: rgb(255, 18, 78);
  color: #fff;
  font-size: 0.3rem;
}
.address_no {
  width: 100%;
  height: 2.65rem;
  padding: 0 0.2rem;
  text-align: center;
  background: #fff;
  line-height: 2.65rem;
  position: fixed;
  left: 0;
  top: 40%;
  transform: translate(0, -50%, 0);
}
</style>


