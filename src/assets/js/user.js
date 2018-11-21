import config from './config'
import redirect from './bootstrap'

class User {

    constructor() {

    }



    getFromLocal() {
        let json = Cookies.get('user')
        return json
    }

}

export default User