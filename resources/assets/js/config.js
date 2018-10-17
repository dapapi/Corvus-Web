import Cookies from 'js-cookie'
import redirect from "./bootstrap";

let config = {
    tokenString: 'LIBRA-ACCESS-TOKEN',
    apiUrl: 'https://sandbox-api-oa.papitube.com',
    imgUrl: 'https://res.papitube.com/',
    mMoeUrl: 'https://sandbox-oa.papitube.com',
    moeUrl: 'https://sandbox-admin-oa.papitube.com',

    puppisTokenString: 'PUPPIS-ACCESS-TOKEN',
    puppisAdminTokenString: 'PUPPIS-ADMIN-ACCESS-TOKEN',
    puppisApiUrl: 'https://sandbox-api-puppis.papitube.com',

    getHeaders: function () {
        let headers = {
            'Accept': 'application/vnd.Libra.v1+json',
            'Access-Control-Expose-Headers': 'Location',
            'Access-Control-Allow-Headers': 'Authorization'
        };
        let token = this.getAccessToken();
        if (token) {
            headers.Authorization = 'Bearer ' + token
        }
        return headers
    },
    getAccessToken: function () {
        return Cookies.get(this.tokenString)
    },
    setAccessToken: function (token) {
        Cookies.set(this.tokenString, token)
    },
    deleteAccessToken: function () {
        Cookies.remove(this.tokenString);
    },

    clientId: '1',
    clientSecret: 'password',
    getStatusCode: function () {
        let that = this;
        return {
            401: function () {
                Cookies.remove(that.tokenString);
                redirect('/login')
            },
            403: function () {
                redirect('/errors/403')
            },
            404: function () {
                redirect('/errors/404')
            },
            500: function () {
                redirect('/errors/500')
            },
            503: function () {
                redirect('/errors/503')
            }
        }
    }

};

export default config