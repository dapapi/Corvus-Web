import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';

Vue.use(Router);

export default new Router({
<<<<<<< HEAD
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
      path: '/tasks',
      name: 'tasks',
      component: () => import('./views/task/index.vue'),
    },
    {
      path: '/tasks/:id',
      name: 'tasks/detail',
      component: () => import('./views/task/detail.vue'),
    },
    {
      path: '/trails',
      name: 'trails',
      component: () => import('./views/trail/index.vue'),
    },
    {
      path: '/trails/:id',
      name: 'trails/detail',
      component: () => import('./views/trail/detail.vue'),
    },
    {
      path: '/projects',
      name: 'projects',
      component: () => import('./views/project/index.vue'),
    },
    {
      path: '/projects/:id',
      name: 'projects/detail',
      component: () => import('./views/project/detail.vue'),
    },
    {
      path: '/clients',
      name: 'clients/project',
      component: () => import('./views/client/index.vue'),
    },
    {
      path: '/clients/:id',
      name: 'clients/detail',
      component: () => import('./views/client/detail.vue'),
    },
    {
      path: '/calendar',
      name: 'usCalendar',
      component: () => import('./views/calendar/index.vue'),
    },
    {
      path: '/calendar',
      name: 'calendar',
      component: () => import('./views/calendar/index.vue'),
    },
    {
      path: '/artists/index',
      name: 'artists/index',
      component: () => import('./views/artist/index.vue'),
    },
    {
      path: '/artists',
      name: 'usArtists',
      component: () => import('./views/artist/taiyang-index.vue'),
    },
    {
      path: '/blogger',
      name: 'usBlogger',
      component: () => import('./views/artist/papi-index.vue'),
    },
    {
      path: '/artists/detail',
      name: 'artists/detail/:id',
      component: () => import('./views/artist/detail.vue'),
    },
    {
      path: '/artists/:id',
      name: 'artists',
      component: () => import('./views/artist/taiyang-detail.vue'),
    },
    {
      path: '/blogger/:id',
      name: 'blogger',
      component: () => import('./views/artist/papi-detail.vue'),
    },
    {
      path: '/staff',
      name: 'staff',
      component: () => import('./views/staff/index.vue'),
    },
    // {
    //     path: '/staff/add',
    //     name: 'staffAdd',
    //     component: () => import('./views/staff/staffAdd.vue')
    // },
    {
      path: '/approval',
      name: 'approval',
      component: () => import(/* webpackChunkName: "about" */ './views/approval/index.vue'),
      children: [
        {
          path: '/approval/initiate',
          component: () => import('./views/approval/initiate.vue'),
        },
        {
          path: '/approval/application',
          component: () => import('./views/approval/application.vue'),
        },
        {
          path: '/approval/my',
          component: () => import('./views/approval/my.vue'),
        },
        {
          path: '/approval/only',
          component: () => import('./views/approval/only.vue'),
        },
      ],
    },
    {
      path: '/staff/detail',
      name: 'staffDetail',
      component: () => import('./views/staff/detail.vue'),
    },
    {
      path: '/staff/history',
      name: 'staffHistory',
      component: () => import('./views/staff/history.vue'),
    },
    {
      path: '/messages',
      name: 'messages',
      component: () => import('./views/messages/messagesIndex.vue'),
    },
  ],
=======
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
            name: 'usCalendar',
            component: () => import('./views/calendar/index.vue')
        },
        {
            path: '/calendar',
            name: 'calendar',
            component: () => import('./views/calendar/index.vue')
        },
        {
            path: '/artists/index',
            name: 'artists/index',
            component: () => import('./views/artist/index.vue')
        },
        {
            path: '/artists',
            name: 'usArtists',
            component: () => import('./views/artist/taiyang-index.vue')
        },
        {
            path: '/blogger',
            name: 'usBlogger',
            component: () => import('./views/artist/papi-index.vue')
        },
        {
            path: '/artists/detail',
            name: 'artists/detail/:id',
            component: () => import('./views/artist/detail.vue')
        },
        {
            path: '/artists/:id',
            name: 'artists',
            component: () => import('./views/artist/taiyang-detail.vue')
        },
        {
            path: '/blogger/:id',
            name: 'blogger',
            component: () => import('./views/artist/papi-detail.vue')
        },
        {
            path: '/staff',
            name: 'staff',
            component: () => import('./views/staff/index.vue')
        },
        // {
        //     path: '/staff/add',
        //     name: 'staffAdd',
        //     component: () => import('./views/staff/staffAdd.vue')
        // },
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
            ],
        },
        {
            path: '/staff/detail',
            name: 'staffDetail',
            component: () => import('./views/staff/detail.vue'),
        },
        {
            path: '/staff/history',
            name: 'staffHistory',
            component: () => import('./views/staff/history.vue'),
        },
        {
            path: '/brief/home',
            name: 'home',
            component: () => import('./views/brief/home.vue'),
            children: [
                {
                    path: '/brief/home',
                    redirect: '/brief/index'
                },
                {
                    path: '/brief/index',
                    name: 'index',
                    component: () => import('./views/brief/index.vue'),
                },
                {
                    path: '/brief/details',
                    name: 'details',
                    component: () => import('./views/brief/details.vue')
                },
                {
                    path: '/brief/add',
                    name: 'add',
                    component: () => import('./views/brief/add.vue')
                },
                {
                    path: '/brief/myapproval',
                    name: 'myapproval',
                    component: () => import('./views/brief/myapproval.vue')
                },
                {
                    path: '/brief/list',
                    name: 'list',
                    component: () => import('./views/brief/list.vue')
                },
                {
                    path: '/brief/memberReport',
                    name: 'memberReport',
                    component: () => import('./views/brief/memberReport.vue')
                },
                {
                    path: '/brief/statistics',
                    name: 'statistics',
                    component: () => import('./views/brief/statistics.vue')
                },
                
            ]
        }

    ],
>>>>>>> qsf
});
