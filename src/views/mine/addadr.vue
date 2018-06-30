<template>
  <div class="adr_shop">
    <div class="adr_title">
      <span class="iconfont icon-xiangzuo" @click="togoMine"></span>
      <h3>收货人</h3>
    </div>
    <p class="p_inp"><input type="text" placeholder="收件人姓名" v-model="name"></p>
    <p class="p_inp"><input type="text" placeholder="手机号" v-model="phone"></p>
    <div class="select-area">
      <div class="ks-clear">
        <div class="half">
          <multiselect @select="provChange" v-model="province" :options="provlist" label="name" placeholder="请选择省份"></multiselect>
        </div>
        <div class="half">
          <multiselect @select="cityChange" v-model="city" :options="citylist" placeholder="请选择城市" label="name"></multiselect>
        </div>
      </div>
      <multiselect v-model="area" :options="arealist" placeholder="请选择地区"></multiselect>
    </div>
    <p class="p_inp"><input type="text" placeholder="详细地址" v-model="street"></p>
    <div class="adr_btn">
      <button @click="saveFn">保存</button>
    </div>
    <Toast></Toast>
  </div>
</template>
<script>
import { getCookie } from "../../utils/utils.js";
import Multiselect from "vue-multiselect";
import "vue-multiselect/dist/vue-multiselect.min.css";
import { anotherInstance } from "../../utils/request.js";
export default {
  data() {
    return {
      name: "",
      phone: "",
      province: "",
      city: "",
      area: "",
      street:'',
      provlist: [],
      citylist: [],
      arealist: [],
    };
  },
  created() {
    console.log(this.$route.query);
    console.log(decodeURI(this.$route.query.province))
    //为什么是$route而不是$router
    let {type, name, phone, province, city, area, street} = this.$route.query;
    if(type=='edit'){
      this.name = name;
      this.phone = phone;
      this.province = {name:decodeURI(province)};
      this.city = {name:city};
      this.area = area;
      this.street = street;
    }
    anotherInstance.get("/server/pcrdata/pcr.json").then(res => {
      console.log(res.data);
      this.provlist = res.data
    });
  },
  methods: {
    provChange(a,b){
      this.citylist = a.city
      this.city = '';
      this.area = ''
    },
    cityChange(a){
      this.arealist = a.area
      this.area = ''
    },
    saveFn() {
      
      let data = {
        province:this.province.name,
        city:this.city.name,
        area:this.area,
        street:this.street,
        phone:this.phone,
        name:this.name
      }
      if(!data.phone || !data.name || !data.province||!data.city || !data.area || !data.street){
        this.$toastBus.$emit('toast',"请填写完整信息");
        return;
      }
      if(!/^1[3578]\d{9}$/.test(data.phone)){
        this.$toastBus.$emit('toast',"请填写正确格式的手机号");
        return;
      }
      this.$http
        .post("/api/addaddr", {
          token: getCookie("token"),
          data
        })
        .then(res => {
          if (res.code == "1") {
            this.$toastBus.$emit('toast',res.msg)
            setTimeout(()=>{
              this.$router.push({
                name:'addradmin'
              })
            },1500)
          }
          if(res.code== 0){
            this.$toastBus.$emit('toast',res.msg)
            setTimeout(()=>{
              this.$router.push({
                name:'login',
                query:{
                  from:'addaddr'
                }
              })
            },1500)
          }
        });
    },
    togoMine() {
      this.$router.push({
        name: "address"
      });
    }
  },
  mounted() {},
  components: { Multiselect }
};
</script>
<style scoped>
/* @import url("vue-multiselect/dist/vue-multiselect.min.css"); */
.select-area {
  width: 90%;
  margin: 0 auto;
}
.select-area .half {
  float: left;
  width: 50%;
}
.adr_shop {
  width: 100%;
  height: 100%;
  background: #eee;
}
.adr_title {
  width: 100%;
  height: 1rem;
  border-bottom: 1px solid #ccc;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background: #fff;
}
.adr_title > span {
  width: 0.4rem;
}
.adr_title > h3 {
  flex: 1;
  text-align: center;
  font-size: 0.34rem;
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
  padding: 0.15rem 0;
  border-radius: 0.5rem;
  background: rgb(255, 18, 78);
  color: #fff;
  font-size: 0.38rem;
}
.p_inp {
  margin: 0.2rem auto;
  width: 90%;
  height: 0.8rem;
  line-height: 0.8rem;
  background: #fff;
  padding: 0 0.2rem;
  box-sizing: border-box;
}
.p_inp > input {
  border: none;
  outline: none;
  background: none;
}
input::-webkit-input-placeholder {
  color: #ccc;
}
</style>

