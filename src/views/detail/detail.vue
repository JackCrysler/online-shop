<template>
    <div class="h100">
        <iframe class="iframe" :src="decodeURIComponent(this.$route.query.url)" frameborder="0"></iframe>
    </div>
</template>
<script>
export default {
    mounted(){
        console.log()
    }
}
</script>
<style lang="scss" scoped>
.h100{
    height: 100%;
}
.iframe{
    width: 100%;height: 100%;
}
</style>
