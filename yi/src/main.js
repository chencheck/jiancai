// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import VueRouter from 'vue-router'
import App from './App'
import Home from './components/home'
import sort from './components/sort'
import search from './components/search'
import me from './components/me'
import shop from './components/shop'
import xiangqing from './components/xiangqing'
import productdetail from './components/productdetail'
import comment from './components/comment'
import sortdetail from './components/sortdetail'
import sortdetail1 from './components/sortdetail1'
import searchdetail from './components/searchdetail'
import login  from './components/login.vue'
import register  from './components/register.vue'

Vue.use(VueRouter)
const routes = [
  {path: '/',  component:Home}, 
  {path:'/home',component:Home},
  {path:'/sort',component:sort},
  {path:'/shop',component:shop},
  {path:'/me',component:me},
  {path:'/search',component:search},
  {path:'/details/:id',component:productdetail},
  {path:'/detail/xiangqing/:id',component:xiangqing},
  {path:'/detail/comment/:id',component:comment},
  {path:'/sort/detail/:id',component:sortdetail},
  {path:'/sort/details/:id',component:sortdetail1},
  {path:'/search/detail/:key',component:searchdetail}, 
  {path:'/me/login',component:login},
  {path:'/me/register',component:register},
]

const router = new VueRouter({
  routes
})
FastClick.attach(document.body)

/* eslint-disable no-new */
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

resize()
window.onresize=resize
function resize(){
  var html=document.querySelector('html')
  if(document.documentElement.clientWidth>700){
    html.style.fontSize='16px'
  }else{
  html.style.fontSize=document.documentElement.clientWidth/35+'px'
  }
}