<template>
    <div >
        <denavbar>
            <span slot="goodsnav" >商品</span>
            <span slot="sdetailnav" class="red">详情</span>
            <span slot="comentnav">评价</span>
        </denavbar>
        <div style="margin-top: 50px;" id="diva">
           
       {{lists}}
        
        </div>
    </div>
</template>
<script>
    import axios from 'axios'
    import denavbar from './detailnavbar'
    import $ from 'jquery'
    export default {
        name: 'xiangiqng',
        data() {
            return {
                lists: [],
            }
        },
        created: function () {
            var nav = $('#denav')
            nav.css('visibility', 'visible')
        },
        mounted: function () {

            axios.get('http://www.tianxiajiancai.com.cn/mobile/index.php?act=goods&op=goods_body&goods_id=' + this.$route.params.id)
                .then(function (res) { 
                    console.log(res.data)
                    this.lists = res.data
                     $('#diva').html( this.lists)
                     $('#diva img').css('width','100%')
                }.bind(this))
                .catch(function (err) {
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
        visibility: visible!important;
        
    }
    #diva{
        width: 100%
    }
    #diva img{
        display:block;
        width: 100%!important;
    }
    .goodsnav {
        color: black!important;
    }
</style>