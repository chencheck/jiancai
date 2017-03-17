<template>
    <div>
        <div id="shop-head">
            <span @click="$router.go(-1)"><i class="fa fa-arrow-left"></i></span>
            <span>购物车</span>
            <span @click="isshowbar"><i class="fa fa-window-minimize"></i></span>
        </div>
        <div id="checkall" v-show="isshow">
            <span><input type="checkbox" id="all" @click="checkall($event)"></span>
            <span><i class="fa fa-user"></i></span>
            <span v-show="info.store_name" class="store_names">{{info.store_name}}</span>
        </div>
        <div id="goods" v-show="isshow" >
            <ul v-show="lists">
                <li v-for="list in lists">
                        <div class="inp"><input type="checkbox" @click="checktoggle($event,list)"></div>                                       
                        <div class="im"> <router-link :to="'/details/'+list.goods_id"><img :src="list.goods_image_url" alt=""></router-link></div>                       
                        <div class="shop-title">
                            <p>                         
                                <span class="goods-name"><router-link :to="'/details/'+list.goods_id">{{list.goods_name}} </router-link></span>                         
                                <span @click="rem($event,list)"><i class="fa fa-trash-o"></i></span>
                            </p>
                            <p class="sec">
                                <span class="shop-price"><h4>{{list.goods_price}}</h4></span>
                                <span>
                             <span class="reduce" @click="red($event,list)">-</span>
                                <input type="text" class="num" v-model="list.goods_num">
                                <span class="add" @click="add($event,list)">+</span>
                                </span>
                            </p>
                        </div>                   
                </li>
            </ul>
        </div>
        <div v-show="!isshow" id="empty">
            <p><i class="fa fa-user"></i></p>
            <p>您的进货单还是空的</p>
            <p style="font-size: 1.5rem;color: gray">去挑一些中中意的商品</p>
            <p id="guang">随便逛逛</p>
        </div>
        <div id="shop-footer" v-show="isshow">
            <span>合计总金额：</span>
            <span id="totalprice"></span>
            <span id="confirm">确认信息</span>
        </div>
        <men></men>
    </div>
</template>
<script>
    import bus from './bus.js'
    import men from './menu'
    import $ from "jquery"
    import axios from "axios"
    export default {
        name: 'shop',
        data() {
            return {
                key: '',
                lists: '',
                info: '',
                sum: '',
                isshow: true

            }
        },
        components: {
            men
        },
        methods: {
            isshowbar: function () {
                bus.$emit('shop')
            },
            changecheck: function (ischeck, arr) {
                if(arr.length>0){arr.map(function (item, index, arr) {
                    item.checked = ischeck
                })}
                
            },
            getallcheck: function (arr) {
                for (var i = 0; i < arr.length; i++) {
                    if (!arr[i].checked) {
                        return false
                    } else if (i == arr.length - 1) {
                        return true
                    }
                }
            },
            gettotalprice: function (arr) {
                var total = 0.00
                arr.map(function (item, index, arr) {
                    if (item.checked == true) {
                        total += item.goods_num * item.goods_price
                    }
                }.bind(this))
                return total
            },
            checktoggle: function (ev, list) {
                var ischeck = $(ev.currentTarget).prop('checked')
                console.log(ischeck)
                list.checked = ischeck
                var ischeckall = this.getallcheck(this.lists)
                if (ischeckall) {
                    $('#all').prop('checked', true)
                } else {
                    $('#all').prop('checked', false)
                }
                $('#totalprice').text(this.gettotalprice(this.lists))
            },
            checkall: function (ev) {
                var ischeck = $(ev.currentTarget).prop('checked')
                $('input[type=checkbox]').prop('checked', ischeck)
                this.changecheck(ischeck, this.lists)
                $('#totalprice').text(this.gettotalprice(this.lists))
            },
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
            add: function (ev, list) {
                var num = $(ev.currentTarget).siblings('input').val()
                num++
                $(ev.currentTarget).siblings('input').val(num)
                var id = list.cart_id
                console.log(id)
                console.log(this.key)
                var qs = require('qs');
                axios.post('http://www.tianxiajiancai.com.cn/mobile/index.php?act=member_cart&op=cart_edit_quantity',
                    qs.stringify({ key: this.key, cart_id: id, quantity: num }),
                    {
                        headers: {
                            'Content-Type': "application/x-www-form-urlencoded",
                        },
                    }).then(function (res) {
                        console.log(res.data)
                        list.goods_num = res.data.datas.quantity
                        if (list.checked) {
                            $('#totalprice').text(this.gettotalprice(this.lists))
                        }
                    }.bind(this)).catch(function (err) {
                        console.log(err)
                    })

            },
            rem: function (ev, list) {
                var a = confirm('确定要删除吗？')
                if (a) {
                    var li=$('li')
                    console.log(li.length)
                    if(li.length==0){
                        this.isshow=false
                    }
                    var id = list.cart_id
                    var qs = require('qs');
                    axios.post('http://www.tianxiajiancai.com.cn/mobile/index.php?act=member_cart&op=cart_list',
                        qs.stringify({ key: this.key}),
                        {  headers: {  'Content-Type': "application/x-www-form-urlencoded", },
                        }).then(function(res){
                            console.log('删除成功')
                            if(res.data.datas.cart_count==0){
                                this.isshow=false
                            }
                            this.lists= res.data.datas.cart_list[0].goods
                            this.info = res.data.datas.cart_list[0]
                            console.log(this.lists.length)
                            
                            
                        }.bind(this)).catch(function(err){
                            console.log(err)
                        })
                    axios.post('http://www.tianxiajiancai.com.cn/mobile/index.php?act=member_cart&op=cart_del',
                        qs.stringify({ key: this.key, cart_id: id }),
                        { headers: {  'Content-Type': "application/x-www-form-urlencoded", },
                        }).then(function (res) {
                            if (res.code == 200) {
                                if (list.checked) {
                                    $('#totalprice').text(this.gettotalprice(this.lists))
                                }
                            }
                        }.bind(this)).catch(function (err) {
                            console.log(err)
                        })
             }

            },
            red: function (ev, list) {
                var num = $(ev.currentTarget).siblings('input').val()
                num = parseFloat(num)
                num--
                if (num <= -1) {
                    return
                }
                var id = list.cart_id
                $(ev.currentTarget).siblings('input').val(num)
                var id = list.cart_id
                console.log(id)
                console.log(this.key)
                var qs = require('qs');
                axios.post('http://www.tianxiajiancai.com.cn/mobile/index.php?act=member_cart&op=cart_edit_quantity',
                    qs.stringify({ key: this.key, cart_id: id, quantity: num }),
                    {
                        headers: {
                            'Content-Type': "application/x-www-form-urlencoded",
                        },
                    }).then(function (res) {
                        console.log(res.data)
                        list.goods_num = res.data.datas.quantity
                        if (list.checked) {
                            $('#totalprice').text(this.gettotalprice(this.lists))
                        }
                    }.bind(this)).catch(function (err) {
                        console.log(err)
                    })
            }
        },
        mounted: function () {


        },
        created: function () {
            this.key = this.getCookie('key')
            if (this.key != "") {
                this.isshow = true
            } else {
                this.isshow = false
            }
            console.log(this.key)
            var qs = require('qs');
            axios.post('http://www.tianxiajiancai.com.cn/mobile/index.php?act=member_cart&op=cart_list',
                qs.stringify({ key: this.key }),
                {
                    headers: {
                        'Content-Type': "application/x-www-form-urlencoded",
                    },
                }).then(function (res) {
                    this.info = res.data.datas.cart_list[0]
                    this.lists = res.data.datas.cart_list[0].goods
                    if(this.lists.length == 0){
                                this.isshow=false
                            }
                    this.sum = res.data.datas.sum
                }.bind(this)).catch(function (err) {
                    console.log(err)
                })
        }

    }

</script>
<style scoped>
    @import '../assets/css/shop.css'
</style>