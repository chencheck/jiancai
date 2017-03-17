<template>
    <div>
        <div id="login-header">
             <router-link to="/home">
            <span><i class="fa fa-home" style="font-size: 1.5rem;"></i></span>
             </router-link>
            <span class="login">登录</span>
            <router-link to="/me/register">
                <span class="register">注册</span>
            </router-link>
        </div>
        <form @submit="sub">
            <ul class="login-form">
                <li>
                    <h4>账户</h4>
                    <input @focus="fo" v-model="username" type="text" placeholder="用户名/邮箱/已验证手机号">
                    
                </li>
                <li>
                    <h4>密码</h4>
                    <input @focus="fo" v-model="password" type="password" placeholder="登录密码">
                    <span class="err" v-show="iserr">
                    密码用户名错误
                    </span>
                </li>
                <li>
                    <span>
                    <input type="checkbox" id="checkbox">
                    <label for="checkbox">七天自动登录</label>
                 </span>
                    <span>
                     忘记密码？
                 </span>

                </li>
                <li>
                    <input id="submit" type="submit" value="登录">
                </li>
            </ul>
        </form>
        <div id="me-footer">
            <p>
                <fieldset>
                    <legend>合作账号登录</legend>
                </fieldset>
            </p>
            <p id="login-type">
                <span><i class="fa fa-user"></i></span>
                <span><i class="fa fa-user"></i></span>
            </p>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
    export default {
        name: 'login',
        data(){
            return{ username:'',
            password:'',
            iserr:false,
            }
           
        },
        methods:{
            fo:function(){
                this.iserr=false
            },
            setcookie:function(c_name,value,expiredays)
                     {
                     var exdate=new Date()
                     exdate.setDate(exdate.getDate()+expiredays)
                     document.cookie=c_name+ "=" +escape(value)+
                     ((expiredays==null) ? "" : ";expires="+exdate.toGMTString())
                     
            },
            sub:function(){
                var qs = require('qs');
                axios.post('http://www.tianxiajiancai.com.cn/mobile/index.php?act=login',
                   qs.stringify( { username: this.username, password: this.password, password_confirm: this.confirm, client: "wap" }), 
                    {
                        headers: {
                            'Content-Type': "application/x-www-form-urlencoded",
                        },
                    }).then(function(res){
                        console.log(res)
                        if(res.data.datas.error){
                            this.iserr=true
                        }else{
                            this.setcookie('key',res.data.datas.key,7)
                            this.setcookie('username',res.data.datas.username,7)
                            window.location.href='/#/me'
                        }
                    }.bind(this)).catch(function(err){

                        console.log(err)
                    })
            }
        }

    }

</script>
<style scoped>
    @import '../assets/css/login.css'
</style>