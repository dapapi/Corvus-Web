import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Messages from './views/messages/messagesIndex'

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
                    component: () => import('./views/task/detail.vue'),
                }
            ]
        },
        {
            path: '/messages',
            name: 'messages',
            component: Messages,
        }
    ],
});
