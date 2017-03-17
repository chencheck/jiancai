<template>
    <div>
        <div id="shop-header">
            <p id="set">
                <i class="fa fa-arrow-left"></i>
                <i class="fa fa-arrow-left"></i>
            </p>
            <router-link to='/me/login'>
            <p v-show="isshow">
            <p id="touxiang" v-show="isshow"><i class="fa fa-user"></i></p>
            <p id="shop-login" v-show="isshow">点击登陆</p>
            </p>
            </router-link>
            <p v-show="!isshow">
            <p id="touxiang" v-show="!isshow"><i class="fa fa-user"></i> </p>
            <p id="shop-login" v-show="!isshow">{{username}}</p>
            </p>
            <p id="shop-caozuo">
                <span><i class="fa fa-user"></i>
                <br>商品收藏</span>
                <span><i class="fa fa-user"></i>
                <br>店铺收藏</span>
                <span><i class="fa fa-user"></i>
                <br>我的足迹</span>
            </p>
        </div>
        <div id="order">
            <p>
                <span><i class="fa fa-user"></i>我的订单</span>
                <span>查看全部订单<i class="fa fa-arrow-right"></i></span>
            </p>
            <div id="order-de">
                <span><i class="fa fa-user"></i>
                <br>代付款</span>
                <span><i class="fa fa-user"></i>
                <br>待收货</span>
                <span><i class="fa fa-user"></i>
                <br>待自提</span>
                <span><i class="fa fa-user"></i>
                <br>待评价</span>
                <span><i class="fa fa-user"></i>
                <br>退款退货</span>
            </div>

        </div>
        <div id="property">
            <p>
                <span><i class="fa fa-user"></i>我的订单</span>
                <span>查看全部订单<i class="fa fa-arrow-right"></i></span>
            </p>
        </div>
        <div id="user-set">
            <ul>
                <li>
                    <span><i class="fa fa-user"></i>收货地址管理</span>
                    <span><i class="fa fa-arrow-right"></i></span>
                </li>
                <li>
                    <span><i class="fa fa-user"></i>用户设置</span>
                    <span><i class="fa fa-arrow-right"></i></span>
                </li>
                
            </ul>
        </div>
    </div>
</template>
<script>
    import $ from 'jquery'
    export default {
        name: 'me',
        data() {
            return {
                key:'',
                username:'',
                isshow:true,
            }
        },
        methods:{
          getCookie: function (c_name){
              var c_start,c_end
              if (document.cookie.length>0)
                 {
              c_start=document.cookie.indexOf(c_name + "=")
                  if (c_start!=-1)
                { 
             c_start=c_start + c_name.length+1 
                c_end=document.cookie.indexOf(";",c_start)
             if (c_end==-1) c_end=document.cookie.length
          return unescape(document.cookie.substring(c_start,c_end))
                } 
                    }
               return ""
              },
        },
        mounted: function () {
            this.key=this.getCookie('key')
            this.username=this.getCookie('username')
            if(this.key){
                this.isshow=false
            }else{
                this.isshow=true
            }
           
            console.log(this.username)
            var Arraycolor = new Array("#00FF66", "#FFFF99", "#99CCFF", "#FFCCFF", "#FFCC99", "#00FFFF", "#FFFF00", "#FFCC00", "#FF00FF");
            var n = 0;
            function turncolors() {
                n++;
                if (n == (Arraycolor.length - 1)) n = 0;
                document.getElementById('shop-header').style.backgroundColor = Arraycolor[n];
                   $('#shop-header').animate({'backgroundColor':Arraycolor[n]},1000)
            }
            setInterval(turncolors,100000)
        }
    }

</script>
<style scoped>
    @import '../assets/css/me.css'
</style>