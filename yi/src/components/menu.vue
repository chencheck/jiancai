<template>
    <div id="menu" v-show="isshow">
        <span class="arrow"></span>
        <ul>
            <router-link to="/home">
                <li @click="fade"><i class="fa fa-home"></i>首页</li>
            </router-link>
            <router-link to="/sort">
                <li @click="fade"><i class="fa fa-bars" slot="icon"></i>分类</li>
            </router-link>
            <router-link to="/search">
                <li @click="fade"><i class="fa fa-search" slot="icon"></i>搜索</li>
            </router-link>
            <router-link to="/shop">
                <li @click="fade"><i class="fa fa-car" slot="icon"></i>购物车</li>
            </router-link>
            <router-link to="/me">
                <li @click="fade"><i class="fa fa-user" slot="icon"></i>我的</li>
            </router-link>
        </ul>
    </div>
</template>
<script>
    import bus from './bus.js'
    export default {
        name: 'menu',
        data() {
            return {
                isshow: false
            }
        },
        created: function () {
            bus.$on('sort',function(){
               this.isshow=!this.isshow
            }.bind(this))
            bus.$on('shop',function(){
               this.isshow=!this.isshow
            }.bind(this))
        },
        methods:{
            fade:function(){
                this.isshow=false
            }
        }
    }

</script>
<style scoped>
    #menu {
        position: fixed;
        top: 5rem;
        right: .5rem;
        border-radius: 2px;
    }
    
    #menu ul {
        padding: 0;
        border-radius: 5px;
        background-color: rgba(85, 85, 85, 0.95);
    }
    
    #menu ul li i {
        margin-right: .5rem;
    }
    
    #menu ul li {
        text-align: left;
        list-style: none;
        padding-left: 2rem;
        line-height: 3rem;
        color: white;
        width: 8rem;
        height: 3rem;
        z-index: 999;
        border-bottom: 1px solid white;
    }
    
    .arrow {
        position: fixed;
        right: 1rem;
        top: 3rem;
        z-index: 999;
        display: block;
        width: 0;
        height: 0;
        font-size: 0;
        line-height: 0;
        border-width: 1rem;
        border-color: transparent transparent rgba(85, 85, 85, 0.95) transparent;
        border-style: dashed dashed solid dashed;
    }
</style>