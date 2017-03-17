<template>
    <div style="max-width: 450px;margin: 0 auto;">
        <nav>
            <img src="../assets/logo.png" alt="">
            <span><i class="fa fa-user"></i></span>
        </nav>

        <div>
            <swiper loop auto :list="list"></swiper>
        </div>
        <div id="home-sort">
            <ul>
                <li>
                    <p style="background-color: #fb6e52"><i class="fa fa-tasks "></i></p>
                    <p>分类</p>
                </li>
                <li>
                    <p style="background-color: #48cfae"><i class="fa fa-user"></i></p>
                    <p>购物车</p>
                </li>
                <li>
                    <p style="background-color: #4fc0e8"><i class="fa fa-user"></i></p>
                    <p>店铺街</p>
                </li>
                <li>
                    <p style="background-color: #ac92ed"><i class="fa fa-user"></i></p>
                    <p>商家登陆</p>
                </li>
                <li>
                    <p style="background-color: #af17cb"><i class="fa fa-user"></i></p>
                    <p>我的商城</p>
                </li>
                <li>
                    <p style="background-color: #cec605"><i class="fa fa-user"></i></p>
                    <p>我的订单</p>
                </li>
                <li>
                    <p style="background-color: #245db2"><i class="fa fa-user"></i></p>
                    <p>我的财产</p>
                </li>
                <li>
                    <p style="background-color: #cb4040"><i class="fa fa-handshake-o"></i></p>
                    <p>厂家招商</p>
                </li>
            </ul>
        </div>
        <div class="con-second">
            <div>
                <img :src="second.square_image" alt="">
            </div>
            <div>
                <img :src="second.rectangle1_image" alt="">
                <img :src="second.rectangle2_image" alt="">
            </div>
        </div>
        <section id="home-content" v-for=" con in indexdata">
        </section>
        <div v-if="isshow" class="con-first">
            <div v-for="co in first">
                <router-link :to="'/details/'+co.goods_id">
                <img :src="co.goods_image" alt="">
                <p>{{co.goods_name}}</p>
                <p>
                    <span><big>{{co.goods_price}}</big></span>
                    <span><del>{{co.goods_promotion_price}}</del></span>
                </p>
                </router-link>
            </div>
        </div>
        <div class="third">
            <img :src="thirddata" alt="o">
        </div>
        <div class="floor" v-show="floor" v-for="fl in floor">
            <h3>{{fl.goods.title}}</h3>
            <div v-for="item in fl.goods.item" class="floor-con">
                <router-link :to="'/details/'+item.goods_id">
                <div>
                    <img :src="item.goods_image" alt="">
                    <p>{{item.goods_name}}</p>
                    <p>
                        <span><big>{{item.goods_price}}</big></span>
                    </p>
                </div>
                </router-link>
            </div>
            <div style="clear: both;"></div>

        </div>
        
        <footer @click="totop"><i class="fa fa-arrow-up "></i></footer>
        
    </div>
</template>
<script>
    import { Swiper, SwiperItem } from 'vux'
    import axios from 'axios'
    import $ from 'jquery'
   

    export default {
        // name:'home',
        components: {
            Swiper,
            SwiperItem,
           
            
        },
        data: function () {
            return {
                indexdata: [],
                headimg: '',
                isshow: false,
                first: '',
                second: '',
                thirddata: '',
                floor: [],
                all:[],
                list: [
                    { img: "http://www.tianxiajiancai.com.cn/data/upload/mobile/special/s0/s0_0539444331881220112.png" },
                    { img: "http://www.tianxiajiancai.com.cn/data/upload/mobile/special/s0/s0_0539444331881220111.png" },
                    { img: "http://www.tianxiajiancai.com.cn/data/upload/mobile/special/s0/s0_0539444331881220110.jpg" },
                    { img: "http://www.tianxiajiancai.com.cn/data/upload/mobile/special/s0/s0_0539444331881220113.png" },
                ],

            }
        },

        methods: {
                totop:function(){
                        var bo=$('body')
                        bo.animate({'scrollTop':0},500)
                }
        },
        created: function () {
            window.onscroll = function () {
                if (document.body.scrollTop > 100) {
                    var nav = $('nav')
                    var foo=$('footer')
                    nav.css('visibility', 'visible')
                    foo.css('visibility', 'visible')
                } else if (document.body.scrollTop < 100) {
                    var nav = $('nav')
                    var foo=$('footer')
                    nav.css('visibility', 'hidden')
                    foo.css('visibility', 'hidden')
                }

            }
            axios.get('http://www.tianxiajiancai.com.cn/mobile/index.php?act=index')
                .then(function (res) {
                    this.all=res.data.datas
                    this.second = res.data.datas[1].home2
                    this.first = res.data.datas[4].goods1.item
                    this.isshow = true
                    this.thirddata = res.data.datas[5].adv_list.item[0].image
                    for (var i = 6; i < res.data.datas.length; i++) {
                        this.floor = this.floor.concat(res.data.datas[i])
                    }
                    this.indexdata = res.data.datas

                }.bind(this)).catch(function (err) {
                    console.log(err)
                })
        }
    }

</script>
<style scoped>
    @import '../assets/css/home.css';
</style>