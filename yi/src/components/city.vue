<template>
    <div>
        <div id="city">
            <div id="cityhead">
                <i @click="back" class="fa fa-arrow-left"></i> 选择地区
            </div>
            <div id="area">
                <span id=first class="bor">
                    <span v-show="ones">一级地区</span>
                <span v-show="!ones" id='first2' @click="moren"></span>
                </span>
                <span id="second">
                <span v-show="twoo">二级地区</span>
                <span v-show="!twoo" id="second2" @click="prov(pde.cityid,pde.city)"></span>
                </span>
                <span id="third">三级地区</span>
            </div>
            <div v-if="province" class="one" v-show="one">
                <ul>
                    <li v-for="pr in province" @click="prov(pr.area_id,pr.area_name)">
                        {{pr.area_name}}
                        <i class="fa fa-angle-right"></i>
                    </li>
                </ul>
            </div>
            <div v-if="city" v-show="two" class="one">
                <ul>
                    <li v-for="ci in city" @click="cit(ci.area_id,ci.area_name)">
                        {{ci.area_name}}
                        <i class="fa fa-angle-right"></i>
                    </li>
                </ul>
            </div>
            <div v-if="qu" v-show="three" class="one">
                <ul>
                    <li v-for="q in qu" @click="quyu(q.area_id,q.area_name)">
                        {{q.area_name}}
                        <i class="fa fa-angle-right"></i>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
    import bus from './bus.js'
    import $ from 'jquery'
    import axios from 'axios'
    export default {
        name: 'city',
        data() {
            return {
                province: [],
                city: [],
                qu: [],
                one: true,
                two: false,
                three: false,
                twoo: true,
                ones: true,
                pde: {},
                cde: {},
                qde: {},
                id:'',

            }
        },
        methods: {
            back:function(){
                bus.$emit('fa')
            },
            moren: function () {
                this.twoo = true
                this.ones = false
                this.one = true
                this.two = false
                this.three = false
                axios.get('http://www.tianxiajiancai.com.cn/mobile/index.php?act=area&op=area_list&area_id=0')
                    .then(function (res) {
                        this.province = res.data.datas.area_list
                    }.bind(this)).catch(function (err) {
                        console.log(err)
                    })
            },
            prov: function (a, b) {
                this.ones = false
                this.one = false
                this.two = true
                this.three = false

                var first = $("#first")
                first.attr('class', '')
                var firstcon = $("#first2")
                firstcon.text(b)

                var second = $("#second")
                second.attr('class', 'bor')

                this.pde.city = b,
                    this.pde.cityid = a
                bus.$emit('pro', this.pde)
                axios.get('http://www.tianxiajiancai.com.cn/mobile/index.php?act=area&op=area_list&area_id=' + a)
                    .then(function (res) {
                        this.city = res.data.datas.area_list
                    }.bind(this))
                    .catch(function (err) {
                        console.log(err)
                    })
            },
            cit: function (a, b) {
                this.two = false
                this.one = false
                this.three = true
                this.twoo = false

                var second = $("#second")
                var second2 = $("#second2")
                second2.text(b)

                second.attr('class', '')
                var third = $("#third")
                third.attr('class', 'bor')

                this.cde.city = b
                bus.$emit('city', this.cde)
                axios.get('http://www.tianxiajiancai.com.cn/mobile/index.php?act=area&op=area_list&area_id=' + a)
                    .then(function (res) {
                        this.qu = res.data.datas.area_list
                    }.bind(this))
                    .catch(function (err) {
                        console.log(err)
                    })
            },
            quyu: function (a, b) {
                // http://www.tianxiajiancai.com.cn/mobile/index.php?act=goods&op=calc&goods_id=669&area_id=36
                console.log(a)
                axios.get('http://www.tianxiajiancai.com.cn/mobile/index.php?act=goods&op=calc&goods_id='+this.id+'&area_id=' + a)
                    .then(function (res) {
                        // this.fee = res.data.datas
                        console.log(res.data.datas)
                        bus.$emit('fee', res.data.datas)
                    }.bind(this))
                    .catch(function (err) {
                        console.log(err)
                    })

                this.qde.city = b
                bus.$emit('zuihou')
                bus.$emit('qu', this.qde)

                this.two = false
                this.one = true
                this.three = false
                this.twoo = true

                var first = $("#first")
                first.attr('class', 'bor')
                var second = $("#second")
                second.attr('class', '')
                var third = $("#third")
                third.attr('class', '')
            }
        },
        created: function () {
            bus.$on('id',function(data){
                this.id=data
                console.log('========')
                console.log(data)
            }.bind(this))
            axios.get('http://www.tianxiajiancai.com.cn/mobile/index.php?act=area&op=area_list&area_id=0')
                .then(function (res) {
                    this.province = res.data.datas.area_list
                }.bind(this)).catch(function (err) {
                    console.log(err)
                })
        },
    }

</script>
<style scoped>
    @import '../assets/css/city.css';
</style>