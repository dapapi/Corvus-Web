import config from "./config";

let Tool = {

    getParameterByName(name, url) {
        if (!url) url = window.location.href;
        name = name.replace(/[\[\]]/g, "\\$&");
        let regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    },

    isWeixin() { //判断是否是微信
        let ua = navigator.userAgent.toLowerCase();
        return ua.match(/MicroMessenger/i) == "micromessenger";
    },

    uploadFile(e, callback) {
        let file = e.target.files[0];
        let putExtra = null;
        let type = file.type.split('/');
        let key = this.guid() + '.' + type[type.length - 1];
        let conf = null;
        let fileSize = file.size;
        this.getQiniuAccessToken((token) => {
            let observable = qiniu.upload(file, key, token, putExtra, conf);
            observable.subscribe(function (res) {
            }, function (error) {
                console.log(error)
            }, function (res) {
                let fileUrl = config.imgUrl + res.key;
                let fileName = file.name;
                callback(fileUrl, fileName, fileSize);
            })
        });
    },

    getQiniuAccessToken: function (callback) {
        $.ajax({
            type: 'get',
            url: config.apiUrl + '/services/get_qiniu_token',
            headers: config.getHeaders(),
            // statusCode: config.getStatusCode()
        }).done(function (response) {
            callback(response.token)
        })
    },

    guid: function () {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }

        return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
    },

};

export default Tool