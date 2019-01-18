import redirect from './bootstrap';
import Cookies from 'js-cookie';
import config from './config';
import User from './user';
import Tool from './tool';

let $usernameInput = $('#inputUsername');
let $passwordInput = $('#inputPassword');
let $telephoneInput = $('#bindTelephoneInput');
let $codeInput = $('#bindTelephoneCodeInout');
let $sendCodeBtn = $('#send-code-btn');
let $bindTelephoneBtn = $('#bind-submit-btn');

let requestToken = null;
/**
 * 程序入口
 */
$(function () {
    initLoginForm();
    checkLogin();
    checkBindTelephone();
    checkPlatformLoginCallback();
    initSendSmsBtn();
    initBindTelephoneBtn();
    checkErrors();
});

function checkErrors() {
    let error = Tool.getParameterByName('error');
    if (error) {
        if (error === 'cancel') {
            toastr.error('用户取消了授权')
        } else if (error === 'forbidden') {
            toastr.error('用户无权限')
        } else {
            toastr.error(error)
        }
    }
}

function checkPlatformLoginCallback() {
    let token = Tool.getParameterByName('access_token');
    if (token) {
        config.setAccessToken(token);
        let user = new User();
        user.fecth(function (userJson) {
            user.storeToLocal(userJson);
            redirect('/');
        });
    }
}

function checkBindTelephone() {
    let token = Tool.getParameterByName('bind_token');
    if (token) {
        $('#login-page').hide();
        $('#bind-telephone-page').show();
        getRequestToken();
    }
}

function checkLogin() {
    let token = config.getAccessToken();
    if (token) {
        redirect('/');
    }
}

function initLoginForm() {
    $('#login-form').submit(function () {
        let username = $usernameInput.val();
        let password = $passwordInput.val();

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
                401: function () {
                    config.deleteAccessToken();
                    toastr.error('用户名或者密码错误')
                },
                400: function (response) {
                    let json = response.responseJSON;
                    let message = json.hint;
                    toastr.error(message)
                },
                422: function () {

                }
            }
        }).done(function (resposne) {
            let token = resposne.access_token;
            config.setAccessToken(token);
            let user = new User();
            user.fecth(function (userJson, companyType) {
                user.storeToLocal(userJson);
                user.storeCompamyTypeToLocal(companyType);
                redirect('/')
            })

        });

        return false;
    })
}

function getDevice() {
    let deviceId = Cookies.get('deviceId');
    if (!deviceId) {
        deviceId = Tool.generateId(24);
        Cookies.set('deviceId', deviceId)
    }
    return deviceId
}

function getRequestToken(callback) {
    $.ajax({
        type: 'get',
        url: config.apiUrl + '/services/request_token',
        data: {
            device: getDevice()
        },
        statusCode: {
            422: function () {
                console.log('device不存在')
            },
            400: function () {
                console.log('device不存在')
            }
        }
    }).done(function (response) {
        let token = response.data.token;
        requestToken = token;
        if (callback) {
            callback(token)
        }
    })
}

function initSendSmsBtn() {
    $('#send-code-btn').click(function () {
        let telephone = $telephoneInput.val();
        if (!telephone) {
            toastr.error('手机号码不能为空')
        }
        if (!requestToken) {
            getRequestToken(function (token) {
                sendCodeSms(token, telephone)
            })
        } else {
            sendCodeSms(requestToken, telephone)
        }
    });
}

function sendCodeSms(token, telephone) {
    $.ajax({
        type: 'get',
        url: config.apiUrl + '/services/send_sms_code',
        data: {
            telephone: telephone,
            device: getDevice(),
            token: token
        },
        statusCode: {
            422: function () {

            }
        }
    }).done(function () {
        //发送成功
        toastr.success('发送成功');
        $sendCodeBtn.html('发送验证码(60s)').addClass('disable')
    })
}

function initBindTelephoneBtn() {
    $bindTelephoneBtn.click(function () {
        let telephone = $telephoneInput.val();
        let bindToken = Tool.getParameterByName('bind_token');
        let code = $codeInput.val();
        if (!telephone) {
            toastr.error('手机号不能为空');
            return false
        }
        requestBindTelephone(telephone, getDevice(), requestToken, bindToken, code);
        return false
    })
}

function requestBindTelephone(telephone, device, token, bindToken, code) {
    $.ajax({
        type: 'post',
        url: config.apiUrl + '/wechat/merge',
        data: {
            telephone: telephone,
            device: device,
            token: token,
            bind_token: bindToken,
            sms_code: code
        },
        statusCode: {
            400: function () {
                toastr.error('参数错误')
            },
            422: function (error) {
                console.log(error);
                toastr.error('参数错误')
            },
            500: function () {
                toastr.error('服务器错误')
            }
        }
    }).done(function (response) {
        let accessToken = response.access_token;
        config.setAccessToken(accessToken);
        window.location.href = '/'
    })
}