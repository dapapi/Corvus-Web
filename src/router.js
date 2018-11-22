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
            component: () => import('./views/auth/login.vue'),
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
        },
        {
            path: '/tasks/:id',
            name: 'tasks/detail',
            component: () => import('./views/task/detail.vue')
        },
        {
            path: '/trails',
            name: 'trails',
            component: () => import('./views/trail/index.vue'),
        },
        {
            path: '/trails/:id',
            name: 'trails/detail',
            component: () => import('./views/trail/detail.vue')
        },
        {
            path: '/projects',
            name: 'projects',
            component: () => import('./views/project/index.vue'),
        },
        {
            path: '/projects/:id',
            name: 'projects/detail',
            component: () => import('./views/project/detail.vue')
        },
        {
            path: '/clients',
            name: 'clients/project',
            component: () => import('./views/client/index.vue'),
        },
        {
            path: '/clients/:id',
            name: 'clients/detail',
            component: () => import('./views/client/detail.vue')
        },
        {
            path: '/calendar',
            name: 'calendar',
            component: () => import('./views/calendar/index.vue')
        },
        {
            path: '/calendar',
            name: 'calendar',
            component: () => import('./views/calendar/index.vue')
        },
        // {
        //     path: '/artists',
        //     name: 'artists',
        //     component: () => import('./views/artist/index.vue')
        // },
        {
            path: '/staff',
            name: 'staff',
            component: () => import('./views/staff/index.vue')
        },
        {
            path: '/staff/add',
            name: 'staffAdd',
            component: () => import('./views/staff/staffAdd.vue')
        }
    ],
});
