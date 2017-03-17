<template>
    <div>
        <navbar>
            <span slot="center"><input @focus="fc" type="text" placeholder="请输入关键字"><i class="fa fa-search"></i></span>
            <span slot="center" @click="isshowbar"><i class="fa fa-window-minimize"></i></span>
        </navbar>
        <section id="sort-con">
            <div class="sort-le">
                <ul>
                    <li class="sort-item" @click='click($event,8)'>
                        <a href="javascript:">
                            <div><img src="../assets/degault.png" class="none"></div>
                            <div>品牌推荐</div>
                        </a>
                    </li>
                    <li class="sort-item" v-for="le in sortdata" @click='click($event,le.gc_id)'>
                        <a href="javascript:">
                            <div><img :src="le.image"></div>
                            <div>{{le.gc_name}}</div>
                        </a>
                    </li>
                </ul>
            </div>
            <div class="sort-ri">
                <div id="pinpai" v-show="!isshow">
                    <div v-for="pin in pinpai" class="pin">
                        <router-link :to="'/sort/detail/'+pin.brand_id">
                        <img :src="pin.brand_pic" alt="">
                        <p>{{pin.brand_name}}</p>
                        </router-link>
                    </div>
                </div>
                <div id="eachsort" v-show="isshow">
                    <dl class="categroy-child-list">
                        <template v-for="(na,index) in eachsort">
                            <router-link :to="'/sort/detail/'+na.gc_id">
                            <dt><span></span>{{na.gc_name}}
                                <i class="fa fa-arrow-right" style="float: right;color: gray;margin-right: 1.5rem;margin-top: .8rem;"></i>
                            </dt>
                                </router-link>
                            <dd v-for="chil in na.child">
                                <router-link :to="'/sort/details/'+chil.gc_id">{{chil.gc_name}}
                                </router-link>
                                </dd>
                            <div style="clear: both;"></div>
                        </template>
                    </dl>
                </div>
            </div>
        </section>
        <men></men>
    </div>
</template>
<script>
    import bus from './bus.js'
    import men from './menu'
    import axios from 'axios'
    import $ from 'jquery'
    import navbar from './navbar'
    export default {
        name: 'sort',
        data() {
            return {
                sortdata: [],
                pinpai: [],
                eachsort: [],
                isshow: false,
                child: [],
            }
        },
        methods: {
            isshowbar:function(){
                bus.$emit('sort')
                console.log('din')
            },
            fc:function(){
                window.location.href='/#/search'
            },
            click: function (ev, id) {
                console.log(id)
                console.log(ev.currentTarget)
                ev.currentTarget.children[0].children[0].children[0].classList.add('none')
                $(ev.currentTarget).siblings().find('img').attr('class', '')
                if (id) {
                    if (id == 8) {
                        this.isshow = false
                    } else {

                        axios.get('http://www.tianxiajiancai.com.cn/mobile/index.php?act=goods_class&op=get_child_all&gc_id=' + id)
                            .then(function (res) {
                                console.log(res.data)
                                this.eachsort = res.data.datas.class_list
                                this.child = res.data.datas.class_list.map(function (item, index, arr) {
                                    return item.child
                                })
                                this.isshow = true
                            }.bind(this)).catch(function (err) {
                                console.log(err)
                            })
                    }
                }
            }
        },
        components: {
            navbar,
             men
        },
        mounted: function () {

        },
        created: function () {
            axios.get('http://www.tianxiajiancai.com.cn/mobile/index.php?act=brand&op=recommend_list')
                .then(function (res) {
                    console.log(res.data)
                    this.pinpai = res.data.datas.brand_list
                }.bind(this)).catch(function (err) {
                    console.log(err)
                })
            axios.get('http://www.tianxiajiancai.com.cn/mobile/index.php?act=goods_class')
                .then(function (res) {
                    console.log(res.data)
                    this.sortdata = res.data.datas.class_list
                }.bind(this)).catch(function (err) {
                    console.log(err)
                })
        }
    }

</script>
<style scoped>
    @import '../assets/css/sort.css'
</style>