<template>
    <div>
        <navbar>
            <span slot="center"><input @focus="fc" type="text" placeholder="请输入关键字"><i class="fa fa-search"></i></span>
            <span slot="right">
                   <i class="fa fa-bars" style="width: 3rem;"></i>
                   <i class="fa fa-user" ></i>
                   <br>
                    <small style="margin-left: -1rem;">分类</small>
                   </span>
            </span>
        </navbar>
        <div id="shaixuan" v-show="!has">
            <div @click="zong($event)" class="reda">{{paixu}}<i class="fa fa-angle-down"></i></div>
            <div @click="xiaoliang($event)">销量优先</div>
            <div @click="filte($event)">筛选<i class="fa fa-angle-down"></i></div>
            <div><i class="fa fa-search"></i></div>
        </div>
        <div class="paixu" v-show="isshow">
            <ul>
                <li @click="click1($event)" class="reda">
                    <span>综合排序</span>
                    <span> <i  class="fa fa-angle-down" style="float: right"></i>
                </span>
                </li>
                <li @click="click2($event)">
                    <span>价格从高到低</span>
                </li>
                <li @click="click3($event)">
                    <span>价格从低到高</span>

                </li>
                <li @click="click4($event)">
                    <span>人气排序</span>

                </li>
            </ul>
        </div>
        <div id="goods-list">
            <ul>
                <li v-for="list in lists">
                    <router-link :to="'/details/'+list.goods_id">
                        <div><img :src="list.goods_image_url" alt=""></div>
                        <div class="title">
                            <div class="title-le">
                                <p class="titleb">{{list.goods_name}}</p>
                                <p class="price">{{list.goods_price}}</p>
                                <p>
                                    <p class="xiao"><span style="color: #aaaaaa;">销量</span><span>{{list.goods_salenum}}</span></p>
                                    <p class="shopname" v-show="list.is_own_shop==0"><span>{{list.store_name}}</span><span>  <i class="fa fa-user"></i></span></p>
                                    <p v-show="list.is_own_shop==1" class="shopname">自营</p>
                                </p>
                            </div>
                        </div>
                    </router-link>
                </li>
            </ul>
        </div>
        <div v-show="!lists">没有找到任何相关的信息</div>
        <div id="filter" v-show="filter" >
            <div id="fil-header">
                <span class="fil-left" @click="$router.go(-1)"><i class="fa fa-angle-left"></i></span>
                <span class="fil-center">商品筛选</span>
                <span class="fil-right">重置</span>
            </div>
            <div id="fil-cont">
                <dl>
                    <dt>价格区间</dt>
                    <dd>
                        <span><input id="price_from" pattern="[0-9]*" type="text" placeholder="最低价"></span>
                        <span>-</span>
                        <span><input id="price_to" pattern="[0-9]*" type="text" placeholder="最高价"></span>
                    </dd>
                </dl>
                <dl class="area">
                    <dt>商品所在地</dt>
                    <dd>
                        <span>
                            <select name="" id="area_id">
                            <option value="">不限</option>
                            <template v-for="a in arealist">
                                <option :value="a.area_id">{{a.area_name}}</option>
                            </template>
                            </select>
                        <i class="fa fa-user"></i>
                        </span>

                    </dd>
                </dl>
                <dl class="active">
                    <dt>商品类型</dt>
                    <dd>
                        <span class="" id="gift" @click="change($event)">赠品</span>
                        <span id="groupbuy" class="" @click="change($event)">团购</span>
                        <span id="xianshi" class="" @click="change($event)">显示折扣</span>
                        <span id="virtual" class="" @click="change($event)">虚拟</span>

                    </dd>
                </dl>

                <dl class="type">
                    <dt>店铺类型</dt>
                    <dd>
                        <span id="own_shop" class="" @click="change($event)">自营</span>

                    </dd>
                </dl>

            </div>
            <div id="button" @click="shaixuan()">筛选产品</div>
        </div>
        <div v-show="has" style="margin-top: 20rem;">
             <p class="noinfo"><i class="fa fa-search"></i></p>
             <p>没有找到任何相关的信息</p>
             <p class="rechoose">重新选择</p>
             </div>
             <footer @click="totop"><i class="fa fa-arrow-up "></i></footer>
    </div>
</template>
<script>
    import axios from 'axios'
    import $ from 'jquery'
    import navbar from './navbar'
     import bus from './bus.js'
    export default {
        name: 'sortdetail',
        data() {
            return {
                lists: [],
                isshow: false,
                filter: false,
                arealist: '',
                has:false,
                totalurt:'',
                isshai:false,
                pagetotal:'',
                index:0,
                isload:false,
                houzhui:'',
                paixu:"综合排序"
            }
        },
        methods: {
            totop:function(){
                        var bo=$('body')
                        bo.animate({'scrollTop':0},500)
                },
            change: function (ev) {
                var current = $(ev.currentTarget).attr('class')
                ev.currentTarget.className = current == 'bgred' ? '' : 'bgred'
            },
            fc:function(){
                window.location.href='/#/search'
            },
            shaixuan: function () {
                var arr = []
                var urlfrom = ""
                var urlto = ""
                var urlarea = ""
                var urltype = ''
                var urlownshop = ''
                var fromvalue = $('#price_from').val()
                var tovalue = $('#price_to').val()
                var selet = $('#area_id').val()
                var currentbg = $('.active .bgred')
                var ownshop = $('#own_shop').attr('class')
                console.log(selet)
                if (ownshop) {
                    urlownshop = '&own_shop=1'
                } else {
                    urlownshop = ''
                }
                if (fromvalue) {
                    urlfrom = '&price_from=' + fromvalue
                } else {
                    urlfrom = ''
                }

                if (tovalue) {
                    urlto = '&price_to=' + tovalue
                } else {
                    urlto = ''
                }
                for (var i = 0; i < currentbg.length; i++) {
                    // console.log($(currentbg[i]).attr('id'))
                    arr.push('&' + $(currentbg[i]).attr('id') + '=1')
                }
                for (var n = 0; n < arr.length; n++) {
                    urltype += arr[n]
                }
                this.totalurl = 'http://www.tianxiajiancai.com.cn/mobile/index.php?act=goods&op=goods_list&keyword='+this.$route.params.key+'&area_id='+selet + urlfrom + urlto + urlownshop + urltype +'&curpage=1&keyword='+this.$route.params.key
                console.log(this.totalurl)
                axios.get(this.totalurl)
                    .then(function (res) {
                        this.lists = res.data.datas.goods_list
                        if(this.lists.length==0){
                            this.has=true
                        }else{
                            this.has=false
                        }
                    }.bind(this))
                    .catch(function (err) {
                        console.log(err)
                    })
                this.filter = false
                this.isshai=true

            },
            zong: function (ev) {
                this.isshow = !this.isshow
                $(ev.currentTarget).attr('class', 'reda')
                $(ev.currentTarget).siblings('.reda').attr('class', '')
            },
            filte: function (ev) {

                $(ev.currentTarget).attr('class', 'reda')
                $(ev.currentTarget).siblings('.reda').attr('class', '')
                this.filter = true
            },
            xiaoliang: function (ev) {
                this.paixu="销量优先"
                document.body.scrollTop=0
                this.index=0
                this.houzhui='&key=1&order=2'
                $(ev.currentTarget).attr('class', 'reda')
                $(ev.currentTarget).siblings('.reda').attr('class', '')
                this.isshow = false
                var urlxiaoliang=''
                if(!this.isshai){
                    
                    urlxiaoliang='http://www.tianxiajiancai.com.cn/mobile/index.php?act=goods&op=goods_list&keyword=' + this.$route.params.key + '&page=10&curpage=1&keyword=' + this.$route.params.key + '&key=1&order=2'
                }else{
                    urlxiaoliang=this.totalurl+'&key=1&order=2'
                }
                axios.get(urlxiaoliang)
                    .then(function (res) {
                        this.lists = res.data.datas.goods_list
                        if(this.lists.length==0){
                            this.has=true
                        }else{
                            this.has=false
                        }
                    }.bind(this))
                    .catch(function (err) {
                        console.log(err)
                    })
            },
            click1: function (ev) {
                this.paixu="综合排序"
                document.body.scrollTop=0
                this.index=0
                this.houzhui=''
                console.log(ev.currentTarget.children)
                $(ev.currentTarget).siblings().attr('class', '')
                $(ev.currentTarget).attr('class', 'reda')
                          
                axios.get( 'http://www.tianxiajiancai.com.cn/mobile/index.php?act=goods&op=goods_list&keyword='+ this.$route.params.key+'&page=10&curpage=1&keyword='+ this.$route.params.key)
                    .then(function (res) {
                        console.log(res.data)
                        this.lists = res.data.datas.goods_list
                        if(this.lists.length==0){
                            this.has=true
                        }else{
                            this.has=false
                        }
                    }.bind(this)).catch(function (err) {
                        console.log(err)
                    })
                this.isshow = false
            },
            click2: function (ev) {
                this.paixu="价格从高到低"
                document.body.scrollTop=0
                this.index=0
                 this.houzhui='&key=3&order=2'
                $(ev.currentTarget).siblings().attr('class', '')
                $(ev.currentTarget).attr('class', 'reda')
                          
                axios.get('http://www.tianxiajiancai.com.cn/mobile/index.php?act=goods&op=goods_list&keyword='+this.$route.params.key +'&page=10&curpage=1&keyword='+this.$route.params.key +'&key=3&order=2')
                    .then(function (res) {
                        this.lists = res.data.datas.goods_list
                        if(this.lists.length==0){
                            this.has=true
                        }else{
                            this.has=false
                        }
                    }.bind(this)).catch(function (err) {
                        console.log(err)
                    })
                this.isshow = false
            },
            click3: function (ev) {
                this.paixu="价格从低到高"
               document.body.scrollTop=0
                this.index=0
                this.houzhui='&key=3&order=1'
                $(ev.currentTarget).siblings().attr('class', '')
                $(ev.currentTarget).attr('class', 'reda')
                        
                axios.get('http://www.tianxiajiancai.com.cn/mobile/index.php?act=goods&op=goods_list&keyword=' + this.$route.params.key + '&page=10&curpage=1&keyword=' + this.$route.params.key + '&key=3&order=1')
                    .then(function (res) {
                        this.lists = res.data.datas.goods_list
                        if(this.lists.length==0){
                            this.has=true
                        }else{
                            this.has=false
                        }
                    }.bind(this)).catch(function (err) {
                        console.log(err)
                    })
                this.isshow = false
            },
            click4: function (ev) {
                this.paixu="人气排序"
                document.body.scrollTop=0
                this.index=0
                this.houzhui='&key=2&order=2'
                $(ev.currentTarget).siblings().attr('class', '')
                $(ev.currentTarget).attr('class', 'reda')             
                axios.get('http://www.tianxiajiancai.com.cn/mobile/index.php?act=goods&op=goods_list&keyword='+this.$route.params.key +'&page=10&curpage=1&keyword='+this.$route.params.key+'&key=2&order=2')
                    .then(function (res) {
                        this.lists = res.data.datas.goods_list
                        if(this.lists.length==0){
                            this.has=true
                        }else{
                            this.has=false
                        }
                    }.bind(this)).catch(function (err) {
                        console.log(err)
                    })
                this.isshow = false

            },
            loadmore:function(){
                console.log('hahahahah')
                console.log(this.houzhui)
                if(this.index>this.pagetotal){
                    return
                }
                this.index++
                console.log(this.houzhui)
                // 
                // 人气排序      http://www.tianxiajiancai.com.cn/mobile/index.php?act=goods&op=goods_list&keyword=钉&page=10&curpage=2&keyword=钉&key=2&order=2
                //价格从低到高   http://www.tianxiajiancai.com.cn/mobile/index.php?act=goods&op=goods_list&keyword=钉&page=10&curpage=2&keyword=钉&key=3&order=1
                // 价格从高到低  http://www.tianxiajiancai.com.cn/mobile/index.php?act=goods&op=goods_list&keyword=钉&page=10&curpage=2&keyword=钉&key=3&order=2
                // 销量         http://www.tianxiajiancai.com.cn/mobile/index.php?act=goods&op=goods_list&keyword=钉&page=10&curpage=2&keyword=钉&key=1&order=2
                //              http://www.tianxiajiancai.com.cn/mobile/index.php?act=goods&op=goods_list&keyword=钉&page=10&curpage=3&keyword=钉
                axios.get('http://www.tianxiajiancai.com.cn/mobile/index.php?act=goods&op=goods_list&keyword='+this.$route.params.key+'&page=10&curpage='+this.index+'&keyword=' + this.$route.params.key + this.houzhui )
                    .then(function (res) {
                        this.lists =  this.lists.concat(res.data.datas.goods_list) 
                        if(this.lists.length==0){
                            this.has=true
                        }else{
                            this.has=false
                        }
                    }.bind(this)).catch(function (err) {
                        console.log(err)
                    })
                this.isload=true
            }

        },
        components: {
            navbar,
        },
        created:function(){
            this.loadmore()
             window.onscroll = function () {                
                 var height = document.documentElement.clientHeight
                var scheight = document.body.scrollHeight
                 var sctop = document.body.scrollTop
                 console.log(scheight)
                 console.log('============')
                 console.log(height + sctop )
                if(!this.isload){
                    return 
                }
                 if (scheight < (height + sctop + 100)) {
                  this.loadmore()
                }
                 if (document.body.scrollTop > 100) {      
                    var foo=$('footer')
                    foo.css('visibility', 'visible')
                } else if (document.body.scrollTop < 100) {

                    var foo=$('footer')
                   
                    foo.css('visibility', 'hidden')
                }
             }.bind(this)
        },
        mounted: function () {
            console.log(this.$route.params.key)
            axios.get('http://www.tianxiajiancai.com.cn/mobile/index.php?act=goods&op=goods_list&keyword='+this.$route.params.key+'&page=10&curpage=1&keyword='+this.$route.params.key)
                .then(function (res) {
                    this.lists = res.data.datas.goods_list
                    this.pagetotal=res.data.page_total
                    if(this.lists.length==0){
                            this.has=true
                        }else{
                            this.has=false
                        }
                }.bind(this)).catch(function (err) {
                    console.log(err)
                })
            // 
            axios.get('http://www.tianxiajiancai.com.cn/mobile/index.php?act=index&op=search_adv')
                .then(function (res) {
                    this.arealist = res.data.datas.area_list
                    if(this.lists.length==0){
                            this.has=true
                        }else{
                            this.has=false
                        }
                }.bind(this)).catch(function (err) {
                    console.log(err)
                })
        },
    }

</script>
<style scoped>
    @import '../assets/css/sortdetail.css';
</style>