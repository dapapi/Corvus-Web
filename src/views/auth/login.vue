<template>
    <div class="page" data-animsition-in="fade-in" data-animsition-out="fade-out">
        <div class="page-content">
            <div class="page-brand-info">
                <div class="brand">
                    <img class="brand-img" src="/images/logo@2x.png" alt="...">
                    <h2 class="brand-text font-size-40">泰洋系</h2>
                </div>
                <p class="font-size-20">
                    泰洋川禾(Mountain Top)基于对娱乐经济及跨屏融合的深度理解，公司汇集了娱乐领域、商务领域、金融领域资深人才，跨界搭建公司的核心运营团队。
                </p>
            </div>

            <div class="page-login-main" id="login-page" style="display: block">
                <div class="brand hidden-md-up">
                    <img class="brand-img" src="/images/logo-colored@2x.png" alt="...">
                    <h3 class="brand-text font-size-40">泰洋系</h3>
                </div>
                <h3 class="font-size-24">登录</h3>
                <p>请输入用户名、手机号或者邮箱进行登录</p>

                <div class="form-group form-material floating" data-plugin="formMaterial">
                    <input type="text" class="form-control empty" id="inputUsername" name="email">
                    <label class="floating-label" for="inputUsername">用户名/手机号/邮箱</label>
                </div>
                <div class="form-group form-material floating" data-plugin="formMaterial">
                    <input type="password" class="form-control empty" id="inputPassword" name="password">
                    <label class="floating-label" for="inputPassword">密码</label>
                </div>
                <div class="form-group clearfix">
                    <div class="checkbox-custom checkbox-inline checkbox-primary float-left">
                        <input type="checkbox" id="inputCheckbox" name="checkbox">
                        <label for="inputCheckbox">记住登录</label>
                    </div>
                    <a class="float-right" href="/forgot">忘记密码？</a>
                </div>
                <button class="btn btn-primary btn-block" @click="initLoginForm">登录</button>

            </div>


            <!--<div class="page-login-main" id="bind-telephone-page" style="display: none;">-->

                <!--<div class="brand hidden-md-up">-->
                    <!--<img class="brand-img" src="/images/logo-colored@2x.png" alt="...">-->
                    <!--<h3 class="brand-text font-size-40">泰洋系</h3>-->
                <!--</div>-->
                <!--<h3 class="font-size-24">绑定手机号</h3>-->
                <!--<p>请输入手机号和验证码进行手机号绑定</p>-->

                <!--<form method="post" autocomplete="off" id="bind-form">-->
                    <!--<div class="form-group form-material floating" data-plugin="formMaterial">-->
                        <!--<input type="text" class="form-control empty" id="bindTelephoneInput" name="bind-telephone">-->
                        <!--<label class="floating-label" for="bindTelephoneInput">请输入手机号</label>-->
                        <!--<a id="send-code-btn" class="" href="javascript:void(0)">发送验证码</a>-->
                    <!--</div>-->
                    <!--<div class="form-group form-material floating" data-plugin="formMaterial">-->
                        <!--<input type="text" class="form-control empty" id="bindTelephoneCodeInout" name="bind-code">-->
                        <!--<label class="floating-label" for="bindTelephoneCodeInout">请输入验证码</label>-->
                    <!--</div>-->
                    <!--<button id="bind-submit-btn" class="btn btn-primary btn-block">绑定</button>-->
                <!--</form>-->


                <!--<footer class="page-copyright">-->
                    <!--<p>WEBSITE BY Mtop Creation Studio</p>-->
                    <!--<p>© 2018. All RIGHT RESERVED.</p>-->
                    <!--<div class="social">-->
                        <!--<a class="btn btn-icon btn-round social-twitter mx-5" href="/login">-->
                            <!--<i class="icon bd-twitter" aria-hidden="true"></i>-->
                        <!--</a>-->
                    <!--</div>-->
                <!--</footer>-->
            <!--</div>-->

        </div>
    </div>
</template>

<script>
    import config from '../../assets/js/config';
    import Cookie from 'js-cookie';

    export default {
        mounted() {
        },


        methods: {
            initLoginForm() {
                let $usernameInput = $('#inputUsername');
                let $passwordInput = $('#inputPassword');
                let username = $usernameInput.val();
                let password = $passwordInput.val();
                let _this = this;
                $.ajax({
                    type: 'post',
                    url: config.apiUrl + '/oauth/token',
                    headers: config.getHeaders(),
                    data: {
                        username,
                        password,
                        grant_type: 'password',
                        client_id: config.clientId,
                        client_secret: config.clientSecret,
                        scope: '*'
                    },
                    statusCode: {
                        // 401: function () {
                        //     config.deleteAccessToken();
                        //     toastr.error('用户名或者密码错误')
                        // },
                        // 400: function (response) {
                        //     let json = response.responseJSON;
                        //     let message = json.hint;
                        //     toastr.error(message)
                        // },
                        // 422: function () {
                        //
                        // }
                    }
                }).done(function (resposne) {
                    let token = resposne.access_token;
                    config.setAccessToken(token);
                    _this.fecth(function (userJson, companyType) {
                        _this.storeToLocal(userJson);
                        console.log(companyType);
                        _this.storeCompamyTypeToLocal(companyType);
                        _this.$router.push('/task')
                    })

                });
            },

            fecth(callback) {
                $.ajax({
                    url: config.apiUrl + '/users/my',
                    headers: config.getHeaders(),
                    type: 'get',
                    statusCode: {
                        401: function () {
                            config.deleteAccessToken();
                            redirect('/login')
                        },
                        500: function () {
                            redirect('/errors/500')
                        }
                    }
                }).done(function (response) {
                    let userData = response.data
                    let json = {
                        id: userData.id,
                        avatar: userData.avatar,
                        nickname: userData.name
                    }
                    callback(json, userData.company)
                })
            },

            storeToLocal(json) {
                Cookies.set('user', json)
            },

            storeCompamyTypeToLocal(type) {
                Cookies.set('companyType', type)
            }
        }
    }
</script>

<style>
    .page-login-v2 {
        height: 100%;
        overflow-x: hidden;
    }

    .page-login-v2:before {
        /*background-image: url("");*/
    }

    .page-login-v2.page-dark.layout-full:after {
        background-color: rgba(33, 33, 33, .6);
    }

    .page-login-v2 .page-brand-info {
        margin: 220px 100px 0 90px;
    }

    .page-login-v2 .page-brand-info .brand-img {
        vertical-align: middle;
    }

    .page-login-v2 .page-brand-info .brand-text {
        display: inline-block;
        margin: 11px 0 11px 20px;
        vertical-align: middle;
    }

    .page-login-v2 .page-brand-info p {
        max-width: 650px;
        opacity: .6;
    }

    .page-login-v2 .page-login-main {
        position: absolute;
        top: 0;
        right: 0;
        height: auto;
        min-height: 100%;
        padding: 150px 60px 180px;
        color: #757575;
        background: #fff;
    }

    .page-login-v2 .page-login-main .brand {
        margin-bottom: 60px;
    }

    .page-login-v2 .page-login-main .brand-img {
        vertical-align: middle;
    }

    .page-login-v2 .page-login-main .brand-text {
        display: inline-block;
        margin: 11px 0 11px 20px;
        color: #3f51b5;
        vertical-align: middle;
    }

    .page-login-v2 form {
        width: 350px;
        margin: 45px 0 20px;
    }

    .page-login-v2 form > button {
        margin-top: 38px;
    }

    .page-login-v2 form a {
        margin-left: 20px;
    }

    .page-login-v2 footer {
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        margin: 50px 60px;
        text-align: center;
    }

    .page-login-v2 .social .icon, .page-login-v2 .social .icon:hover, .page-login-v2 .social .icon:active {
        color: #fff;
    }

    @media (min-width: 992px) {
        .page-login-v2 .page-content {
            padding-right: 500px;
        }
    }

    @media (max-width: 991px) {
        .page-login-v2 .page-login-main {
            padding-top: 60px;
        }
    }

    @media (min-width: 768px) and (max-width: 991px) {
        .page-login-v2 .page-login-main {
            padding-top: 80px;
        }

        .page-login-v2 .page-brand-info {
            margin: 160px 0 0 35px;
        }

        .page-login-v2 .page-brand-info > p {
            color: transparent;
            opacity: 0;
        }
    }

    @media (max-width: 767px) {
        .page-login-v2 .page-login-main {
            width: 100%;
            padding-top: 60px;
        }

        .page-login-v2 form {
            width: auto;
        }
    }

    @media (max-width: 479px) {
        .page-login-v2 .page-brand-info {
            margin: 220px 0 0;
        }

        .page-login-v2 .page-login-main {
            padding: 50px 30px 180px;
        }

        .page-login-v2 form {
            width: auto;
        }

        .page-login-v2 footer {
            margin: 50px 30px;
        }
    }

    #send-code-btn {
        position: absolute;
        right: 8px;
        color: #3f51b5;
        top: 8px;
        text-decoration: none;
    }

    #send-code-btn.disable {
        color: #e0e0e0;
    }
</style>
