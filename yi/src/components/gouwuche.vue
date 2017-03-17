<template>
   <div id='foo'>
            <span><i class="fa fa-user"></i>
            <br>客服</span>
            <span><i class="fa fa-user"></i>
            <br>购物车
            </span>
            <span>立即购买</span>
            <span>加入购物车</span>
      
    </div>
</template>
<script>
export default{
    name:'shop'
}
</script>
<style scoped>
#foo{
    width: 100%;
    height: 5rem;
    background-color: #f8f8f8;
    position: fixed;
    bottom: 0;
    z-index: 999;
    text-align: left;
    /*padding-left: 1rem;*/
}
#foo span{
    display: inline-block;
    text-align: center;
    overflow: hidden;
}
#foo span:nth-of-type(1),#foo span:nth-of-type(2){
width: 5rem;height: 100%;
font-size: 1.5rem;
box-sizing: border-box;
padding-top: .6rem;
}
#foo span:nth-of-type(3),#foo span:nth-of-type(4){
width: calc((100% - 10rem)/2);
margin: 0;
height: 100%;
font-size: 1rem;
color: white;
line-height: 5rem;
font-size: 1.6rem;
}
#foo span:nth-of-type(3){
    background-color: #ed5564;
}
#foo span:nth-of-type(4){
    background-color: coral;
    margin-left: -1rem;
}
</style>