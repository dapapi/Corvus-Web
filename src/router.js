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
            path: '/approval',
            name: 'approval',
            component: () => import(/* webpackChunkName: "about" */ './views/approval/index.vue'),
            children:[
                {
                    path:'/approval/initiate',
                    component:() => import('./views/approval/initiate.vue')
                },
                {
                    path:'/approval/application',
                    component:() => import('./views/approval/application.vue')
                },
                {
                    path:'/approval/my',
                    component:() => import('./views/approval/my.vue')
                },
                {
                    path:'/approval/only',
                    component:() => import('./views/approval/only.vue')
                }
            ]
        }
    ],
});
