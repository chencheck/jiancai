<template>
    <div>
        <denavbar>
            <span slot="goodsnav" class="red">商品</span>
            <span slot="sdetailnav">详情</span>
            <span slot="comentnav">评价</span>
        </denavbar>
        <div id="dehead">
            <span @click="$router.go(-1)"><i class="fa fa-arrow-left"></i></span>
            <span><i class="fa fa-arrow-left"></i></span>
        </div>
        <div id="goods-top">
            <swiper dots-position="center" background-color="pink" :list="list"></swiper>
            </ul>
        </div>
        <div style="background-color: #f5f5f5;" v-if="istrue">
            <div id="goods-cont">
                <div>
                    <h3 v-if="productdetail.goods_info.goods_name">{{productdetail.goods_info.goods_name}}</h3>
                    <p>
                        <span style="color:#ed5564;font-size: 1.6rem;">￥{{productdetail.goods_info.goods_price}}</span>
                        <span>销量{{productdetail.goods_info.goods_salenum}}件</span>
                    </p>
                </div>
                <div>
                    <p @click="dianji">
                        <span style="color: gray">送至</span>
                        <span v-if="!pro">{{productdetail.goods_hair_info.area_name}}</span>
                        <span v-if="pro">
                            {{pro}}{{city}}{{qu}}
                        </span>
                        <span v-if="!fee.if_store_cn" style="color: #ed5564">{{productdetail.goods_hair_info.if_store_cn}}</span>
                        <span v-if="fee.if_store_cn" style="color: #ed5564">{{fee.if_store_cn}}</span>
                        <span><i class="fa fa-user"></i></span>
                    </p>
                    <p style="color: gray" v-show="!fee.content">{{productdetail.goods_hair_info.content}}</p>
                    <p style="color: gray" v-show="fee.content">{{fee.content}}</p>
                </div>
                <div>
                    <p @click="sizes()">
                        <span>已选</span>
                        <span style="display: inline-block;width: 3rem;height: 2rem;border: 1px solid gray;text-align: center;">默认</span>
                        <!-- <span v-if="productdetail.goods_info.goods_spec" style="display: inline-block;height: 2rem;border: 1px solid gray;text-align: center;">{{productdetail.goods_info.goods_spec[533]}}</span>
                 <span v-if="productdetail.goods_info.goods_spec" style="display: inline-block;height: 2rem;border: 1px solid gray;text-align: center;">{{productdetail.goods_info.goods_spec[648]}}</span>
                      --><span><i class="fa fa-arrow-right"></i></span>
                    </p>
                </div>
            </div>
            <div id="goods-com">
                <p><span>商品评价</span>
                    <span>好评率{{productdetail.goods_evaluate_info.good_percent}}%</span>
                    <span>({{productdetail.gift_array.length}})人评价<i class="fa fa-arrow-right"></i></span>
                </p>
            </div>
            <div id="shop-cont">
                <p><span><i class="fa fa-user"></i></span>
                    <span>{{productdetail.store_info.store_name}}</span>
                    <span style="color: #ed5564" v-show="productdetail.store_info.is_own_shop==0">自营店铺</span>
                    <span style="float: right;color:gray;margin-right: 1.8rem;"><i class="fa fa-arrow-right"></i></span>
                </p>
                <p class="shop-cont-com">
                    <span>
                    <span>描述相符</span><span>{{productdetail.store_info.store_credit.store_deliverycredit.credit}} </span>
                    <span>{{productdetail.store_info.store_credit.store_deliverycredit.percent_text}} </span>
                    </span>
                    <span>
                    <span>服务态度</span><span>{{productdetail.store_info.store_credit.store_desccredit.credit}} </span>
                    <span>{{productdetail.store_info.store_credit.store_desccredit.percent_text}} </span>
                    </span>
                    <span>
                    <span>发货速度</span><span>{{productdetail.store_info.store_credit.store_servicecredit.credit}} </span>
                    <span>{{productdetail.store_info.store_credit.store_servicecredit.percent_text}} </span>
                    </span>
                </p>
            </div>
            <div id="goods-recom">
                <h5>店铺推荐</h5>
                <div class="goods-relist">
                    <div v-for="list in commendlist">
                        <router-link :to="'/details/'+list.goods_id">
                            <p><img :src="list.goods_image_url" alt=""></p>
                            <p class="recomname">{{list.goods_name}}</p>
                            <p>{{list.goods_promotion_price}}</p>
                        </router-link>
                    </div>
                </div>
            </div>
            <div class="clicdetail">
                点击查看详情
            </div>
            <div id='foo'>
                <span><i class="fa fa-user"></i>
            <br>客服</span>
           
                <span> <router-link to="/shop"><i class="fa fa-user"></i>
            <br>购物车
            </router-link>
            </span>
            
                <span>立即购买</span>
                <span @click="addshop">加入购物车</span>
            </div>
            <transition name="fade" >           
            <city v-show="iscity"> </city>
            </transition>
            <div v-show="size" id="sizemask">
                <div id="shop_top" v-on:click.stop="fade"></div>
                <div id="shopadd" v-on:clic.stop="shopadd">
                    <div id="caozuo">
                        <ul>
                            <li>
                                <div>
                                    <span class="smallimg"><img :src="pic[0]" alt=""></span>
                                </div>
                                <div>
                                    <div>
                                        <span style="color:black;font-size:1rem">{{productdetail.goods_info.goods_name}}</span>
                                    </div>
                                    <div>
                                        <span style="color:#ed5564;font-size: 1.6rem;">￥{{productdetail.goods_info.goods_price}}</span>
                                        <span class="addred">库存：{{productdetail.goods_info.goods_storage}}件</span>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <span>购买数量</span>
                                <span class="reduce" @click="red($event,list)">-</span>
                                <input type="text" class="num" v-model="number">
                                <span class="add" @click="add($event,list)">+</span>
                            </li>
                        </ul>
                    </div>
                    <div id="dianfoo">
                        <span><i class="fa fa-user"></i><br>客服</span>
                        
                        <span><router-link to="/shop"><i class="fa fa-user"></i> <br>购物车</router-link></span>
                        
                        <span>立即购买</span>
                        <span @click="addtoshop(productdetail.goods_info.goods_id)">加入购物车</span>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>
<script>
    import $ from 'jquery'
    import shop from './gouwuche'
    import denavbar from './detailnavbar'
    import city from './city'
    import axios from 'axios'
    import bus from './bus.js'
    import { Swiper, SwiperItem } from 'vux'
    export default {
        name: 'productdetail',
        components: {
            Swiper,
            SwiperItem,
            denavbar,
            shop,
            city,
            key: '',


        },
        methods: {
            getCookie: function (c_name) {
                var c_start, c_end
                if (document.cookie.length > 0) {
                    c_start = document.cookie.indexOf(c_name + "=")
                    if (c_start != -1) {
                        c_start = c_start + c_name.length + 1
                        c_end = document.cookie.indexOf(";", c_start)
                        if (c_end == -1) c_end = document.cookie.length
                        return unescape(document.cookie.substring(c_start, c_end))
                    }
                }
                return ""
            },
            addtoshop: function (a) {
                console.log(this.number)
                console.log(a)
                var qs = require('qs');
                axios.post('http://www.tianxiajiancai.com.cn/mobile/index.php?act=member_cart&op=cart_add',
                    qs.stringify({ key: this.key, goods_id: a, quantity: this.number }),
                    {
                        headers: {
                            'Content-Type': "application/x-www-form-urlencoded",
                        },
                    }).then(function (res) {
                        console.log(res)
                    }.bind(this)).catch(function (err) {
                        console.log(err)
                    })
            },
            add: function (ev) {
                this.number++
            },
            red: function () {

                if (this.number <= 1) {
                    return
                }
                this.number--
            },
            shopadd: function () {
                this.size = true
                console.log('添加事件')
            },
            addshop: function () {
                this.size = true
            },
            fade: function () {
                this.size = false

            },
            sizes: function () {
                this.size = true
                console.log('chuxian')
            },
            dianji: function () {
                this.iscity = true
                bus.$emit('id', this.$route.params.id)
            },
            load: function () {
                axios.get('http://www.tianxiajiancai.com.cn/mobile/index.php?act=goods&op=goods_detail&goods_id=' + this.$route.params.id + '&key=')
                    .then(function (res) {
                        this.productdetail = res.data.datas
                        this.commendlist = res.data.datas.goods_commend_list
                        // var list=this.productdetail.goods_image.split(',')
                        this.pic = this.productdetail.goods_image.split(',')
                        for (var i = 0; i < this.pic.length; i++) {
                            if (!this.list[i].img) {
                                this.list.push({ img: '' })
                            }
                            this.list[i].img = this.pic[i]
                        }
                        this.list.pop()
                        this.istrue = true
                    }.bind(this)).catch(function (err) {
                        console.log(err)
                    })
            }
        },
        data() {
            return {
                productdetail: [],
                commendlist: [],
                list: [{ img: '', hh: '12' }],
                pic: [],
                istrue: false,
                iscity: false,
                pro: '',
                city: '',
                qu: '',
                fee: '',
                size: false,
                number: 1,
            }
        },
        created: function () {
            this.key = this.getCookie('key')
            bus.$on('zuihou', function () {
                this.iscity = false
            }.bind(this))
            bus.$on('fa', function () {
                this.iscity = false
            }.bind(this))
            bus.$on('pro', function (data) {
                this.pro = data.city
            }.bind(this))
            bus.$on('city', function (data) {
                this.city = data.city
            }.bind(this))

            bus.$on('qu', function (data) {
                this.qu = data.city
            }.bind(this))

            bus.$on('fee', function (data) {
                this.fee = data
            }.bind(this))

        },
        mounted: function () {
            console.log('hahah')
            window.onscroll = aa
            function aa() {
                if (document.body.scrollTop > 100) {
                    var nav = $('#denav')
                    nav.css('visibility', 'visible')
                } else if (document.body.scrollTop < 100) {
                    var nav = $('#denav')
                    nav.css('visibility', 'hidden')
                }
            }
            aa()
            this.load()
        },
        watch: {
            '$route': function () {
                this.$router.go(0)
            }
        }

    }

</script>
<style scoped>
    @import '../assets/css/productdetail.css'
</style>