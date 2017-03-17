<template>
<div>
<header>
    <span @click="$router.go(-1)"><i class="fa fa-arrow-left"></i></span>
    <slot name="center"></slot>
    <slot name="right"></slot>
</header>
</div>
</template>
<script>
export default{
    name:'navbar'
}
</script>
<style scoped>
header{
    width: 100%;background-color: #f8f8f8;
    height: 4rem;
    position: relative;
    padding-top: 1rem;
}
header>span{
    position: absolute;
}
header>span:nth-child(1){
   left: 1rem;
}
header>span:nth-child(2){
   /*left: 3rem;*/
   left:calc( 50% - 10rem) ;
   
}
header>span:nth-child(3){
   right: 1rem;
   
}
</style>