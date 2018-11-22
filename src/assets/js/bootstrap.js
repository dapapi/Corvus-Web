//简化的日志输出方法
var dd = function (message) {
    console.log(message)
}
var redirect = function (url) {
    window.location.href = url
}


window.dd = dd;
module.exports = redirect;