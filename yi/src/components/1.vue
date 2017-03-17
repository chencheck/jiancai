<template>
  <div>
    <swiper loop auto :list="list" ></swiper>
   
  </div>
</template>

<script>
import { Swiper,SwiperItem } from 'vux'
export default {
  components: {
    Swiper,
    SwiperItem,
  
  },
  methods: {

    // demo06_onIndexChange (index) {
    //   this.demo06_index = index
    // },
  },
  data () {
    return {
list: [{
 
  img: 'https://static.vux.li/demo/1.jpg',

}, {

  img: 'https://static.vux.li/demo/2.jpg',

}, {

  img: 'https://static.vux.li/demo/3.jpg',

}],
    }
  }
}
</script>

<style scoped>
/*.copyright {
  font-size: 12px;
  color: #ccc;
  text-align: center;
}
.text-scroll {
  border: 1px solid #ddd;
  border-left: none;
  border-right: none;
}
.text-scroll p{
  font-size: 12px;
  text-align: center;
  line-height: 30px;
}
.black {
  background-color: #000;
}
.title{
  line-height: 100px;
  text-align: center;
  color: #fff;
}
.animated {
  animation-duration: 1s;
  animation-fill-mode: both;
}
.vux-indicator.custom-bottom {
  bottom: 30px;
}
@-webkit-keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translate3d(0, 100%, 0);
  }
  100% {
    opacity: 1;
    transform: none;
  }
}
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translate3d(0, 100%, 0);
  }
  100% {
    opacity: 1;
    transform: none;
  }
}
.fadeInUp {
  animation-name: fadeInUp;
}
.swiper-demo-img img {
  width: 100%;
}*/
</style>
