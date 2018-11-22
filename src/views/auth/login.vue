<template>
    <div class="page vertical-align text-center" data-animsition-in="fade-in" data-animsition-out="fade-out">

        <div class="col-md-9 float-left left-bg">
            <div class="bg-top-image">
                <img src="https://res.papitube.com/login/images/login-left-top.png" alt="">
            </div>
        </div>
        <div class="col-md-3 float-left right-bg">
            <div class="bg-right-top">
                <img src="https://res.papitube.com/login/images/login-right-top.png" alt="">
            </div>
            <div class="bg-right-bottom">
                <img src="https://res.papitube.com/login/images/login-right-bottom.png" alt="">
            </div>
        </div>
        <div class="page-content vertical-align-middle">
            <div class="panel">
                <div class="panel-body">
                    <ul class="nav nav-tabs nav-tabs-line" role="tablist">
                        <li class="nav-item" role="presentation">
                            <a class="nav-link active" data-toggle="tab" href="#forum-login"
                               aria-controls="forum-base"
                               aria-expanded="true" role="tab">账号登录</a>
                        </li>
                        <li class="nav-item" role="presentation">
                            <a class="nav-link" data-toggle="tab" href="#forum-weixin-login"
                               aria-controls="forum-present"
                               aria-expanded="false" role="tab">微信登录</a>
                        </li>
                    </ul>
                    <div class="tab-content nav-tabs-animate">
                        <div class="tab-pane animation-fade active" id="forum-login" role="tabpanel">
                            <div class="form-group example pt-10">
                                <div class="input-group input-group-icon">
                                    <span class="input-group-addon"
                                          style="background-color: white;border-top: 1px solid #e0e0e0;border-left: 1px solid #E0E0E0;border-bottom: 1px solid #E0E0E0;border-right: 0">
                                        <span class="icon md-smartphone-iphone" aria-hidden="true"></span>
                                    </span>
                                    <input type="text" class="form-control" placeholder="手机号">
                                </div>
                            </div>
                            <div class="form-group example">
                                <div class="input-group input-group-icon">
                                    <span class="input-group-addon"
                                          style="background-color: white;border-top: 1px solid #e0e0e0;border-left: 1px solid #E0E0E0;border-bottom: 1px solid #E0E0E0;border-right: 0">
                                        <span class="icon md-lock" aria-hidden="true"></span>
                                    </span>
                                    <input type="text" class="form-control" placeholder="密码">
                                </div>
                            </div>
                            <div class="form-group clearfix">
                                <div class="checkbox-custom checkbox-inline checkbox-primary checkbox-lg float-left">
                                    <input type="checkbox" id="inputCheckbox" name="remember">
                                    <label for="inputCheckbox">记住账号</label>
                                </div>
                                <a class="float-right">忘记密码</a>
                            </div>
                        </div>
                        <div class="tab-pane animation-fade" id="forum-weixin-login" role="tabpanel">
                            weixin
                        </div>
                    </div>
                </div>
            </div>
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
                        _this.$router.push('/tasks')
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

</style>
