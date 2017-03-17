<template>
  <div class="zong">
    <tabbar v-if="isshow">
      <tabbar-item link="/home">
        <i class="fa fa-home" slot="icon"></i>
        <span slot="label">首页</span>
      </tabbar-item>
      <tabbar-item  link="/sort">
        <i class="fa fa-bars" slot="icon"></i>
        <span slot="label">分类</span>
      </tabbar-item>
      <tabbar-item selected link="/search">
        <i class="fa fa-search" slot="icon"></i> 
        <span slot="label">搜索</span>
      </tabbar-item>
      <tabbar-item link="/shop">
        <i class="fa fa-car" slot="icon"></i>
         <span slot="label">购物车</span>
      </tabbar-item>
      <tabbar-item link="/me">
        <i class="fa fa-user" slot="icon"></i>
         <span slot="label">我的商城</span>
      </tabbar-item>
    </tabbar>


    <router-view></router-view>
  </div>
</template>

<script>

import { Tabbar, TabbarItem } from 'vux'
export default{
  data(){
return{
  isshow:true
}
  },
 components: { Tabbar, TabbarItem },
 watch:{
   $route:function(to,from){

   var tole=to.path.split('/')[1]

   if(tole=='details'){
     this.isshow=false
   }else{
     this.isshow=true
   }
   }
 }
}

</script>

<style lang="less">
  @import '~vux/src/styles/reset.less';
  @import './assets/font-awesome-4.7.0/css/font-awesome.css';
 *{
   box-sizing: border-box;
 }
  body {
    background-color: #fbf9fe;
    
    text-align: center;
    margin:  0 auto;
  }
  .weui-tabbar{
    position: fixed!important;
    left: 0;
    z-index: 2;
    bottom: 0!important;
  }
  .weui-tabbar__label{
    font-size: .5rem!important;
  }
  .zong{
    margin-bottom: 60px;
  }
</style>