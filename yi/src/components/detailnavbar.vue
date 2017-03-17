<template>
    <div id="denav">
        <span><i @click="$router.go(-1)" class="fa fa-angle-left"></i></span>
        <span><i class="fa fa-angle-left"></i></span>
        <div id="navcon">
            <router-link :to="'/details/'+id">
                <slot name="goodsnav"></slot>
            </router-link>
            <router-link :to="'/detail/xiangqing/'+id">
                <slot name="sdetailnav"></slot>
            </router-link>
            <router-link :to="'/detail/comment/'+id">
                <!--<span class="comentnav">评价</span>-->
                <slot name="comentnav"></slot>
            </router-link>
        </div>
    </div>
</template>
<script>
    import bus from './bus.js'
    export default {
        data() {
            return {
                id: ''
            }

        },
        name: 'detailnavbar',
        created: function () {

            this.id = this.$route.params.id

        }
    }

</script>
<style scoped>
    #denav {
        visibility: visible;
        width: 100%;
        background-color: #f8f8f8;
        height: 3rem;
        position: fixed;
        z-index: 2;
        top: 0;
        left: 0;
    }
    
    #denav a {
        color: black;
        font-size: 1.8rem;
        line-height: 3rem;
        margin: .3rem;
        font-weight: 500;
    }
    
    #denav>span:nth-of-type(1) {
        float: left;
        margin: 1rem 1rem
    }
    
    #denav>span:nth-of-type(2) {
        float: right;
        margin: 1rem 1rem
    }
    
    #navcon>span {
        display: inline-block;
        width: 5rem;
        font-size: 2rem;
    }
</style>