<template>
    <div>
        <div id="login-header">
            <router-link to="/home">
                <span><i class="fa fa-home" style="font-size: 1.5rem;"></i></span>
            </router-link>
            <span class="login">会员注册</span>
            <router-link to="/me/login">
                <span class="register">登录</span>
            </router-link>
        </div>
        <div id="register-type">
            <span><i class="fa fa-user"></i>普通注册</span>
            <span><i class="fa fa-user"></i>手机注册</span>
        </div>
        <form id="register-form" @submit="sub">
            <ul>
                <li class="register-inp">
                    <h4>用户名</h4>
                    <input @input="input($event)" v-model='username' type="text" placeholder="请输入6-20个字符">
                    <span @click="rem($event)" class="remove re-hidden"><i class="fa fa-remove"></i></span>
                </li>
                <li class="register-inp">
                    <h4>设置密码</h4>
                    <input @input="input($event)" v-model="password" type="password" placeholder="请输入6-20位密码">
                    <span @click="rem($event)" class="remove re-hidden"><i class="fa fa-remove"></i></span>
                </li>
                <li class="register-inp">
                    <h4>确认密码</h4>
                    <input @input="input($event)" v-model="confirm" type="password" placeholder="请在此输入密码">
                    <span @click="rem($event)" class="remove re-hidden"><i class="fa fa-remove"></i></span>
                    <span class="tishi" v-show="ishowmima">确认密码不正确</span>
                </li>
                <li class="register-inp">
                    <h4>邮&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp箱</h4>
                    <input @input="input($event)" v-model="email" type="email" placeholder="请输入常用邮箱地址">
                    <span @click="rem($event)" class="remove re-hidden"><i class="fa fa-remove"></i></span>
                    <span class="tishi" v-show="!isshowemail">邮箱已经存在 </span>
                </li>
                <li style="text-align: left;padding: 2rem;">
                    <span>
                    <input type="checkbox" id="checkbox">
                    <label for="checkbox">同意</label>
                    <span>用户注册协议</span>
                    </span>

                </li>
                <li>
                    <input disabled id="re-submit" type="submit" value="注册">
                </li>
            </ul>
        </form>
    </div>
</template>
<script>
    import axios from 'axios'
    import $ from 'jquery'
    export default {
        data() {
            return {
                username: "",
                password: '',
                confirm: '',
                email: '',   
                isdisabled: true,
                isshowemail:true,
                ishowmima:false
            }
        },
        methods: {
            sub: function () {
               function isEmail(str){
               var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
                return reg.test(str);
                console.log(this.isshowemail)
                            } 
                    this.isshowemail=isEmail(this.email)
                    console.log(this.isshowemail)
               var qs = require('qs');
                axios.post('http://www.tianxiajiancai.com.cn/mobile/index.php?act=login&op=register',
                   qs.stringify( { username: this.username, password: this.password, password_confirm: this.confirm, email: this.email, store_id: "", client: "wap" }), 
                    {
                        headers: {
                            'Content-Type': "application/x-www-form-urlencoded",
                        },
                    }
                    ).then(function (res) {
                            console.log(res.data)
                             console.log(res.data.datas.error)
                        if(res.data.datas.error=="密码与确认密码不相同"){
                            this.ishowmima=true
                        }else if(res.data.datas.error=="邮箱已存在"){
                            this.isshowemail=false
                        }
                        else{           
                            window.location.href='/me#/me'

                            key
                          // :
                          // "db54dd717e3c047d1d118ab00e63acbf"
                          // store_member_grade_list
                          // :
                          // null
                          // userid
                          // :
                          // 250
                          // username
                          // :
                          // "yu"
                          // __proto__
                          // :
                          
                        }

                    }.bind(this)).catch(function (err) {
                        console.log(err)
                    })
            },
            input: function (ev) {
                // console.log($(ev.target).val())
                this.ishowmima=false
                this.isshowemail=true
                if ($(ev.target).val() != '') {
                    $(ev.target).next().removeClass("re-hidden")
                } else {
                    $(ev.target).next().addClass("re-hidden")
                }
                if (this.username != "" && this.password != "" && this.confirm != "" && this.email != "") {
                    $(':submit').prop("disabled", false);
                } else {
                    // this.isdisable=true
                    // console.log('有空数据')
                    $(':submit').prop("disabled", true);
                }
            },
            rem: function (ev) {
                console.log('hahahh')
                $(ev.currentTarget).prev().val('')
                console.log($(ev.currentTarget).prev().val())
                $(ev.currentTarget).addClass("re-hidden")
                console.log()
                $(':submit').prop("disabled", true);

            }
        },


    }

</script>
<style scoped>
    @import '../assets/css/register.css'
</style>