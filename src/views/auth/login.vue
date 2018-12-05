<template>
    <div class="" data-animsition-in="fade-in" data-animsition-out="fade-out">

        <div class="col-md-7 float-left left-bg">
            <div class="bg-top-image">
                <img src="https://res.papitube.com/login/images/login-left-top.png" alt="">
            </div>
        </div>
        <div class="col-md-5 float-left right-bg">
            <div class="bg-right-top">
                <img src="https://res.papitube.com/login/images/login-right-top.png" alt="">
            </div>
            <div class="bg-right-bottom">
                <img src="https://res.papitube.com/login/images/login-right-bottom.png" alt="">
            </div>
        </div>
        <div class="page-content login-content" v-show="pageType === 'login'">
            <div class="panel">
                <div class="panel-body">
                    <ul class="nav nav-tabs nav-tabs-line" role="tablist">
                        <li class="nav-item" role="presentation">
                            <a class="nav-link active" data-toggle="tab" href="#forum-login"
                               aria-controls="forum-base"
                               aria-expanded="true" role="tab">帐号登录</a>
                        </li>
                        <li class="nav-item" role="presentation">
                            <a class="nav-link" data-toggle="tab" href="#forum-weixin-login"
                               aria-controls="forum-present" @click="getWeixinCode"
                               aria-expanded="false" role="tab">微信登录</a>
                        </li>
                    </ul>
                    <div class="tab-content nav-tabs-animate">
                        <div class="tab-pane animation-fade active" id="forum-login" role="tabpanel">
                            <div class="form-group example pt-10">
                                <div class="input-group input-group-icon">
                                    <span class="input-group-addon"
                                          style="background-color: white;border-top: 1px solid #e0e0e0;border-left: 1px solid #E0E0E0;border-bottom: 1px solid #E0E0E0;border-right: 0">
                                        <i class="icon md-account" aria-hidden="true"></i>
                                    </span>
                                    <input type="text" class="form-control" placeholder="用户名、手机号" v-model="username">
                                </div>
                            </div>
                            <div class="form-group example">
                                <div class="input-group input-group-icon">
                                    <span class="input-group-addon"
                                          style="background-color: white;border-top: 1px solid #e0e0e0;border-left: 1px solid #E0E0E0;border-bottom: 1px solid #E0E0E0;border-right: 0">
                                        <i class="icon md-lock" aria-hidden="true"></i>
                                    </span>
                                    <input type="password" class="form-control" placeholder="密码" v-model="password">
                                </div>
                            </div>
                            <div class="form-group clearfix">
                                <div class="checkbox-custom checkbox-inline checkbox-primary checkbox-sm float-left">
                                    <input type="checkbox" id="inputCheckbox" name="remember">
                                    <label for="inputCheckbox">记住帐号</label>
                                </div>
                                <span class="float-right pointer-content font-info" @click="forgetPassword">忘记密码</span>
                            </div>
                            <div class="form-group example">
                                <button type="button" class="btn btn-block btn-primary waves-effect waves-classic"
                                        @click="checkLogin">登录
                                </button>
                            </div>
                        </div>
                        <div class="tab-pane animation-fade" id="forum-weixin-login" role="tabpanel">
                            <div class="qrCode-wrap" id="loginContainer">
                                <img src="https://res.papitube.com/testQRcode.png" alt="">
                            </div>
                            <div class="text-center">请使用微信扫描二维码登录</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>


        <div class="page-content login-content" v-show="pageType === 'bindPhone'">
            <div class="panel">
                <div class="panel-body">
                    <div class="example pate-title">
                        <i class="icon md-smartphone-iphone pr-10"></i>绑定手机号
                    </div>
                    <div class="tab-content nav-tabs-animate">
                        <div class="tab-pane animation-fade active" id="forum-bind-phone" role="tabpanel">
                            <div class="form-group example pt-10">
                                <input type="text" class="form-control" placeholder="手机号" v-model="username">
                            </div>
                            <div class="input-group">
                                <input type="email" class="form-control" placeholder="验证码" v-model="smsCode">
                                <div class="input-group-addon pointer-content font-info verification-wrap text-center d-block"
                                     @click="sendMessage">{{ toastText }}
                                </div>
                            </div>
                            <div class="form-group example">
                                <button type="button" class="btn btn-block btn-primary waves-effect waves-classic"
                                        @click="bindPhone">绑定
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="page-content login-content" v-show="pageType === 'resetPassword'">
            <div class="panel">
                <div class="panel-body">
                    <div class="example pate-title">
                        <i class="icon md-shield-check pr-10"></i>修改密码
                    </div>
                    <div class="tab-content nav-tabs-animate">
                        <div class="tab-pane animation-fade active" id="forum-reset" role="tabpanel">
                            <div class="form-group example pt-10">
                                <input type="text" class="form-control" placeholder="手机号" v-model="username">
                            </div>
                            <div class="form-group input-group">
                                <input type="email" class="form-control" placeholder="验证码" v-model="smsCode">
                                <div class="input-group-addon pointer-content font-info verification-wrap text-center d-block"
                                     @click="sendMessage">{{ toastText }}
                                </div>
                            </div>
                            <div class="form-group">
                                <input type="password" class="form-control" placeholder="请输入新密码" v-model="newPassword">
                            </div>
                            <div class="form-group">
                                <input type="password" class="form-control" placeholder="请确认密码"
                                       v-model="repeatNewPassword">
                            </div>
                            <div class="form-group">
                                <button type="button" class="btn btn-block btn-primary waves-effect waves-classic"
                                        @click="resetPassword">重置密码
                                </button>
                            </div>
                            <div class="text-center mt-20">
                                <span class="pointer-content font-info" @click="returnLogin">
                                    <i class="icon md-chevron-left pr-10 font-info"></i>返回登录
                                </span>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    import fetch from '../../assets/utils/fetch.js'
    import config from '../../assets/js/config';
    import Cookies from 'js-cookie';
    import Verify from '../../assets/utils/verify.js';
    import redirect from '../../assets/js/bootstrap';

    export default {
        data: function () {
            return {
                pageType: 'login',
                toastText: '发送验证码',
                second: 60,
                username: '',
                password: '',
                newPassword: '',
                repeatNewPassword: '',
                smsCode: '',
            }
        },

        mounted() {
            new WxLogin({
                id: "loginContainer",
                appid: "wx1c8644b3e608c59b",
                scope: "snsapi_login",
                redirect_uri: "/login",
                state: "",
            });
        },


        methods: {
            storeToLocal(json) {
                Cookies.set('user', json)
            },

            storeCompamyTypeToLocal(type) {
                Cookies.set('companyType', type)
            },

            returnLogin() {
                this.pageType = 'login'
            },

            forgetPassword() {
                this.pageType = 'resetPassword'
            },

            sendMessage() {
                if (this.second > 0 && this.second !== 60) {
                    return
                }
                let _this = this;
                let interval = setInterval(function () {
                    _this.toastText = _this.second + 's';
                    _this.second -= 1;
                    if (_this.second === 0) {
                        clearInterval(interval);
                        _this.toastText = '发送验证码';
                        _this.second = 60;
                    }
                }, 1000);
            },

            checkLogin: function () {
                if (!Verify.username(this.username) || !Verify.password(this.password)) {
                    return
                }
                let _this = this;
                let username = this.username;
                let password = this.password;
                let data = {
                    username: username,
                    password: password,
                    grant_type: 'password',
                    client_id: config.clientId,
                    client_secret: config.clientSecret,
                    scope: '*'
                };
                fetch('post', '/oauth/token', data).then(function (response) {
                    let token = response.access_token;
                    config.setAccessToken(token);
                    setTimeout(function () {
                        _this.fetchUserInfo(function (userJson, companyType) {
                            _this.storeToLocal(userJson);
                            _this.storeCompamyTypeToLocal(companyType);
                            redirect('/messages')
                        })
                    }, 100)
                });
            },

            fetchUserInfo(callback) {
                $.ajax({
                    type: 'get',
                    url: config.apiUrl + '/users/my',
                    headers: config.getHeaders(),
                }).done(function (response) {
                    let userData = response.data;
                    let json = {
                        id: userData.id,
                        avatar: userData.avatar,
                        nickname: userData.name
                    };
                    callback(json, userData.company)
                })
            },

            resetPassword() {
                if (!Verify.phone(this.username) ||
                    !Verify.smsCode(this.smsCode) ||
                    !Verify.password(this.newPassword)
                ) {
                    return false
                } else if (this.newPassword !== this.repeatNewPassword) {
                    toastr.error('两次密码不一致')
                }
            },

            bindPhone() {
                if (!Verify.username(this.username) || !Verify.password(this.password)) {
                    return
                }
            },

            getWeixinCode() {
                // fetch('get', 'https://api.weixin.qq.com/sns/oauth2/access_token?appid=APPID&secret=SECRET&code=CODE&grant_type=authorization_code').then(function (response) {
                //     console.log(response)
                // })
            }
        }
    }
</script>

<style>
    body {
        height: 100vh;
        overflow: hidden;
    }

    .page {
        margin-left: 0;
        height: 100%;
        padding: 0;
    }

    #app {
        height: 100%;
    }

    .left-bg {
        background-image: url("https://res.papitube.com/login/images/login-bg.png");
        height: 100vh;
        background-size: 100% auto;
    }

    .bg-top-image {
        width: 60%;
        height: auto;
    }

    .bg-top-image img {
        width: 100%;
    }

    .right-bg {
        background-color: #3f51b5;
        padding: 0;
        height: 100vh;
        position: relative;
    }

    .bg-right-top {
        width: 50%;
    }

    .bg-right-top img {
        width: 100%;
        height: auto;
    }

    .bg-right-bottom {
        width: 30%;
        position: absolute;
        right: 0;
        bottom: 0;
    }

    .bg-right-bottom img {
        width: 100%;
        height: auto;
    }

    .page-content {
        position: absolute;
        transform: translate(-50%, -50%);
        -webkit-transform: translate(-50%, -50%);
        top: 50%;
        left: 50%;
    }

    .nav-tabs-line .nav-link.active {
        border-bottom: 1px solid #3f51b5;
    }

    input::-webkit-input-placeholder {
        color: #CACACA;
        font-weight: 300;
    }

    i {
        color: #999999;
    }

    li {
        width: 50%;
    }

    .qrCode-wrap {
        width: 220px;
        height: 220px;
        padding: 30px;
    }

    .qrCode-wrap img {
        width: 100%;
    }

    .pate-title {
        color: #333333;
        font-weight: 400;
    }

    .input-group-addon {
        background-color: white;
    }

    .verification-wrap {
        width: 100px;
    }

    .login-content {
        width: 26rem;
    }

</style>
