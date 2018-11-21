import redirect from "./bootstrap";
import config from "./config";

$(function () {
    checkLogin()
});

function checkLogin() {
    let token = config.getAccessToken()
    if (token) {
        redirect('/')
    } else {
        redirect(config.apiUrl + '/worktile/oauth?callback=' + config.moeUrl + '/login');
        // redirect('http://work.mttop.cn:9006/oauth2/authorize?client_id=5aefdd18ff24040785d7519a&response_type=code&scope=phone&redirect_uri=https://sandbox-api-oa.papitube.com/worktile/oauth/callback')
    }
}

