import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';

Vue.use(Router);

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home,
        },
        {
            path: '/login',
            name: 'login',
            component: () => import(/* webpackChunkName: "about" */ './views/auth/login.vue'),
        },
        {
            path: '/tasks',
            name: 'tasks',
            component: () => import(/* webpackChunkName: "about" */ './views/task/index.vue'),
            children: [
                {
                    path: ':id',
                    name: 'tasks/detail',
                    component: () => import('./views/task/detail.vue')
                }
            ]
        },
        {
            path: '/brief/index',
            name: 'index',
            component: () => import('./views/brief/index.vue'),
        },
        {
            path:'/brief/details',
            name:'details',
            component: () => import('./views/brief/details.vue')
        },
        {
            path: '/brief/add',
            name: 'add',
            component: () => import('./views/brief/add.vue')
        }
    ],
});
