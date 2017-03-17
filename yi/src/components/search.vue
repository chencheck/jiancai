<template>
    <div>
        <navbar>
            <span slot="center"><input @focusout="foout($event)" type="text" placeholder="请输入关键字"><i class="fa fa-search"></i></span>

            <span slot="center" style="margin-top: .5rem;"><router-link :to="'/search/detail/'+keyword">
            搜索 </router-link>
            </span>

        </navbar>
        <div id="search-list">
            <p>热门搜索</p>
            <template v-for="list in lists">
                <router-link :to="'/search/detail/'+list">
                    <span @click="coo">{{list}}</span>
                </router-link>
            </template>
        </div>
        <div id="his-list">
            <p>历史记录</p>
            <template>
                <span></span>
            </template>
        </div>
        <div class="clear">清空历史记录</div>
  
    </div>
    
</template>
<script>
   
    import axios from 'axios'
    import navbar from './navbar'
    import bus from './bus.js'
    import $ from 'jquery'
    export default {
        name: 'sort',
        data() {
            return {
                lists: [],
                keyword: ''
            }
        },
        methods: {
            foout: function (ev) {
                this.keyword = ev.target.value
            },
            coo: function () {
                console.log('存储cookie')
                function setCookie(c_name, value, expiredays) {
                    var exdate = new Date()
                    exdate.setDate(exdate.getDate() + expiredays)
                    document.cookie = c_name + "=" + escape(value) +
                        ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString())
                }
                setCookie('hahah', "这就是设置的那什么", 30)

                // function getCookie(c_name) {
                //     if (document.cookie.length > 0) {
                //         c_start = document.cookie.indexOf(c_name + "=")
                //         if (c_start != -1) {
                //             c_start = c_start + c_name.length + 1
                //             c_end = document.cookie.indexOf(";", c_start)
                //             if (c_end == -1) c_end = document.cookie.length
                //             return unescape(document.cookie.substring(c_start, c_end))
                //         }
                //     }
                //     return ""
                // }
            }
        },
        mounted: function () {
            axios.get('http://www.tianxiajiancai.com.cn/mobile/index.php?act=index&op=search_key_list')
                .then(function (res) {
                    this.lists = res.data.datas.list
                }.bind(this)).catch(function (err) {
                    console.log(err)
                })
        },
        components: {
            navbar,
           
        }
    }

</script>
<style scoped>
    @import '../assets/css/search.css'
</style>