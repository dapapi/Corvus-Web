export default {
    phone: function (value) {
        if (!(/^1[34578]\d{9}$/.test(value))) {
            toastr.error("手机号错误");
            return false;
        }
        return true;
    },

    username: function (value) {
        if (!(/^1[34578]\d{9}$/.test(value)) && !(/^[\u4e00-\u9fa5]{0,5}$/.test(value)) && !(/^\w+$/.test(value))) {
            toastr.error("用户名错误");
            return false
        }
        return true;
    },

    password: function (value) {
        if (!value) {
            toastr.error("密码不能为空");
            return false
        }
        if (!(/^\w+$/.test(value))) {
            toastr.error("密码只能为数字和字母");
            return false
        }
        return true;
    },

    smsCode: function (value) {
        if (!(/^\d{4}$/.test(value))) {
            toastr.error("验证码错误");
            return false
        }
        return true;
    }
}