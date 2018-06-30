<template>

<dl class="flex-box" @click="goToDetail">
    <dt>
        <img v-lazy="data.imageurl" alt="">
    </dt>
    <dd>
        <p>{{data.wname}}</p>
        <p>
            <span>￥{{data.jdPrice}}</span>
            <span @click.stop="addCart" class="iconfont icon-goodscart"></span>
        </p>
    </dd>
</dl>       

</template>
<script>
import {getCookie} from '../../utils/utils.js'
export default {
    props:{
        data:{
            required:true,
            type:Object
        },
        instance:{

        }
    },
    methods:{
        addCart(){
            if(!getCookie('token')){
                this.$router.push({
                    name:'login'
                })
                return;
            }
            this.$http.post('/api/addcart',{
                token: getCookie('token'),
                data:this.data
            }).then(res=>{
                
                if(res.code===1){
                    //this.instance.active('添加成功')
                    this.$toastBus.$emit('toast',"添加成功了！！！")
                }else{
                    console.log(res.msg)
                }
            })

        },
        goToDetail(){
            this.$router.push({
                name:'detail',
                query:{
                    url:encodeURIComponent(this.data.clickUrl)
                }
            })
        }
    }
}
</script>
<style lang="scss" scoped>

dt{
    flex: 1;
    align-items: center;
    padding: 0.1rem;
    text-align: center;
}
dd{
    padding: 0.1rem;
    line-height: 1.6;
    white-space: nowrap;
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
}
img{
    width: 100px;height: 100px;

}
</style>
