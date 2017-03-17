<template>
    <div>
        <denavbar>
            <span slot="goodsnav">商品</span>
            <span slot="sdetailnav" >详情</span>
            <span slot="comentnav" class="red">评价</span>
        </denavbar>
        <div id="comsort">
            <p class="redbg">全部评价</p>
            <p>好评</p>
            <p>中评</p>
            <p>差评</p>
            <p>订单晒图</p>
        </div>
        <div id="tu">
         <p><i class="fa fa-file-o"></i></p>
         <p>该商品未收到任何评价</p>
         <p>期待您的购买与评论！</p>
        </div>
    </div>
</template>
<script>
    import axios from 'axios'
    import denavbar from './detailnavbar'
    export default {
        name: 'comment',
        data() {
            return {
                lists: [],
                // comsort:['','','','','']
            }
        },
        mounted: function () {
            axios.get('http://www.tianxiajiancai.com.cn/mobile/index.php?act=goods&op=goods_evaluate&goods_id='+this.$route.params.id+'&curpage=1&page=10')
            .then(function(res){
                console.log(res.data)
                this.lists=res.data.datas
            }.bind(this)).catch(function(err){
                console.log(err)
            })
        },
        components: {
            denavbar,
        }
    }

</script>
<style scoped>
    #denav {
        visibility: visible;
    }
    #comsort{
        width: 100%;
        position: fixed;
        top: 5rem;
        flex-wrap: wrap;
        display: flex;
       
    }
     #comsort p{
        height: 2rem;
        padding: .1rem 1rem;
        border-radius: 5px;;
         color: white;
         line-height: 2rem;
         margin: 1rem;
         background-color: #aaaaaa;
     }
     .redbg{
         background-color: #ed5564!important;
     }
     #tu{
         width: 100%;
         margin-top: calc(50% + 10rem);
     }
     #tu p:nth-of-type(1){
         width: 5rem;
         height: 5rem;
         background-color: #dddddd;
         border-radius: 50%;
         margin: 0 auto;
         line-height: 5rem;
         font-size: 3rem;
         color: white;
     }
     #tu p:nth-last-of-type(1){
         font-size: .5rem;color: #aaaaaa;
         text-align: center;
     }
    /*@import '../assets/css/xiangqing.css'*/
</style>