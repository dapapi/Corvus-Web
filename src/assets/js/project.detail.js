import config from "./config";
import Tool from './tool';
import redirect from './bootstrap';
import store from '../store/index.js';


let app = new Vue({
        el: '#root',
        store,


    })
;