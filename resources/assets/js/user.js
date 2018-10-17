import config from './config'
import redirect from './bootstrap'

class User {

    constructor() {

    }

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
                nickname: userData.nickname
            }
            callback(json)
        })
    }

    storeToLocal(json) {
        Cookies.set('user', json)
    }

    getFromLocal() {
        let json = Cookies.get('user')
        return json
    }

}

export default User