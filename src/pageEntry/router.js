import Vue from 'vue';
import Router from 'vue-router';
// import Home from './views/Home.vue';
// import Cookies from 'js-cookie'
// import store  from './assets/js/cancelRequest'
// import axios from 'axios'


Vue.use(Router);


const VueRouter = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/entry.html',
            name: 'entry',
            component: () => import('./Entry.vue')
        }
    ],
});

export default VueRouter