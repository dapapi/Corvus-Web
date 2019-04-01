import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Cookies from 'js-cookie'
import store  from './assets/js/cancelRequest'
import axios from 'axios'


Vue.use(Router);


const VueRouter = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        // {
        //     path: "*",
        //     redirect: "/"
        // },
        {
            path: '/',
            // name: 'home',
            redirect: 'my',
            // component: Home,
        },
        {
            path: '/login',
            name: 'login',
            component: () => import('./views/auth/login.vue'),
            beforeEnter: (to, from, next) => {
                if (Cookies.get('user') && Cookies.get('CORVUS-ACCESS-TOKEN')) {
                    next('/')
                } else {
                    next()
                }
            }
        },
        {
            path: '/tasks',
            name: 'tasks',
            component: () => import('./views/task/index.vue'),
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
            path: '/publictrails',
            name: 'publictrails',
            component: () => import('./views/trail/public.vue'),
        },
        {
            path: '/trails/:id',
            name: 'trails/detail',
            component: () => import('./views/trail/detail.vue')
        },
        {
            path: '/publictrails/:id',
            name: 'public/detail',
            component: () => import('./views/trail/publicdetail.vue'),
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
        // {
        //     path: '/artists',
        //     name: 'usArtists',
        //     component: () => import('./views/artist/taiyang-index.vue')
        // },
        // {
        //     path: '/blogger',
        //     name: 'usBlogger',
        //     component: () => import('./views/artist/papi-index.vue')
        // },
        {
            path: '/talent',
            name: 'talent',
            component: () => import('./views/artist/talent.vue')
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
            path: '/informationForm',
            name: 'informationForm',
            component: () => import('./views/staff/informationForm.vue')
        },
        {
            path: '/address',
            name: 'address',
            component: () => import('./views/address/index.vue')
        },
        {
            path:'/dashboard',
            name:'dashboard',
            component:() => import('./views/dashboard/index.vue'),
            children:[{
                path: '/dashboard/:id',
                component: () => import('./views/dashboard/commerce.vue')
            }]
        },
        {
            path: '/approval',
            name: 'approval',
            redirect: '/approval/project/initiate',
            component: () => import('./views/approval/index.vue'),
            children: [
                // {
                //     path: '/approval/contract/detail',
                //     component: () => import('./views/approval/contractIndex/appdetail.vue')
                // },
                {
                    path: '/approval/contract/initiate',
                    component: () => import('./views/approval/contractIndex/contractIndex.vue')
                }, 
                {
                    path: '/approval/contract/my',
                    component: () => import('./views/approval/contractIndex/my.vue')
                },
                {
                    path: '/approval/contract/only',
                    component: () => import('./views/approval/contractIndex/only.vue')
                },
                {
                    path: '/approval/contract/application',
                    component: () => import('./views/approval/contractIndex/application.vue')
                },
                {
                    path: '/approval/common/initiate',
                    component: () => import('./views/approval/common/commonIndex.vue')
                },
                {
                    path: '/approval/common/application',
                    component: () => import('./views/approval/common/application.vue')
                },
                {
                    path: '/approval/common/my',
                    component: () => import('./views/approval/common/my.vue')
                },
                {
                    path: '/approval/common/only',
                    component: () => import('./views/approval/common/only.vue')
                },
                {
                    path: '/approval/common/general',
                    component: () => import('./views/approval/general.vue')
                },
                {
                    path: '/approval/common/currency',
                    component: () => import('./views/approval/currency.vue')
                },
                {
                    path: '/approval/common/cur',
                    component: () => import('./views/approval/cur.vue')
                },
                {
                    path: '/approval/common/account',
                    component: () => import('./views/approval/account.vue')
                },
                {
                    path: '/approval/:id',
                    name: 'approval/detail',
                    component: () => import('./views/approval/appdetail.vue')
                },
                {
                    path: '/approval/project/initiate',
                    name: 'approval/project/initiate',
                    component: () => import('./views/approval/project/initiate.vue')
                },
                {
                    path: '/approval/project/application',
                    name: 'approval/project/detail',
                    component: () => import('./views/approval/project/application.vue')
                },
                {
                    path: '/approval/project/my',
                    name: 'approval/project/my',
                    component: () => import('./views/approval/project/my.vue')
                },
                {
                    path: '/approval/project/only',
                    name: 'approval/project/only',
                    component: () => import('./views/approval/project/only.vue')
                },
                {
                    path:'/approval/contract/contract_management',
                    name:'approval/contract/contract_management',
                    component: () => import('./views/approval/contractIndex/contract_management.vue')                    
                }
            ],
        },
        {
            path: '/messages',
            name: 'messages',
            component: () => import('./views/messages/index.vue'),
        },
        {
            path: '/brief',
            // name: 'home',
            component: () => import('./views/brief/home.vue'),
            children: [
                {
                    path: '/brief',
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
                    path: '/brief/followup',
                    name: 'followup',
                    component: () => import('./views/brief/followup.vue')
                },
                {
                    path: '/brief/list/',
                    name: 'list',
                    component: () => import('./views/brief/list.vue')
                },
                {
                    path: '/brief/memberReport/',
                    name: 'memberReport',
                    component: () => import('./views/brief/memberReport.vue')
                },
                {
                    path: '/brief/statistics/',
                    name: 'statistics',
                    component: () => import('./views/brief/statistics.vue')
                },

            ]
        },
        {
            path: '/reports',
            component: () => import('./views/reports/home.vue'),
            children: [
                {
                    path: '/reports',
                    redirect: '/reports/business'
                },
                {
                    path: '/reports/business',
                    name: 'business',
                    component: () => import('./views/reports/business.vue'),
                },
                {
                    path: '/reports/trail',
                    name: 'trail',
                    component: () => import('./views/reports/trail.vue')
                },
                {
                    path: '/reports/projects',
                    name: 'projects',
                    component: () => import('./views/reports/projects.vue')
                },
                {
                    path: '/reports/clients',
                    name: 'clients',
                    component: () => import('./views/reports/clients.vue')
                },
                {
                    path: '/reports/artists',
                    name: 'artists',
                    component: () => import('./views/reports/artists.vue')
                },
                {
                    path: '/reports/blogger',
                    name: 'blogger',
                    component: () => import('./views/reports/blogger.vue')
                }
            ]
        },
        {
            path: '/attendance',
            name: 'home',
            component: () => import('./views/attendance/home.vue'),
            children: [
                {
                    path: '/attendance',
                    redirect: '/attendance/index'
                },
                {
                    path: '/attendance/index',
                    // name: 'index',
                    component: () => import('./views/attendance/index.vue'),
                },
                {
                    path: '/attendance/all',
                    name: '/attendance/all',
                    component: () => import('./views/attendance/all.vue')
                },
                {
                    path: '/attendance/apply',
                    name: 'apply',
                    component: () => import('./views/attendance/apply.vue')
                },
                {
                    path: '/attendance/approval',
                    // name: 'approval',
                    component: () => import('./views/attendance/approval.vue')
                },
                {
                    path: '/attendance/calendar',
                    // name: 'calendar',
                    component: () => import('./views/attendance/calendar.vue')
                },
                {
                    path: '/attendance/memberAttend',
                    name: 'memberAttend',
                    component: () => import('./views/attendance/memberAttend.vue')
                },
                {
                    path: '/attendance/memberLeave',
                    name: 'memberLeave',
                    component: () => import('./views/attendance/memberLeave.vue')
                },
                {
                    path: '/attendance/myAttend',
                    name: 'myAttend',
                    component: () => import('./views/attendance/myAttend.vue')
                },
                {
                    path: '/attendance/myLeave',
                    name: 'myLeave',
                    component: () => import('./views/attendance/myLeave.vue')
                },
                {
                    path: '/attendance/tellme',
                    name: 'tellme',
                    component: () => import('./views/attendance/tellme.vue')
                },
                {
                    path: '/attendance/details',
                    // name: 'details',
                    component: () => import('./views/attendance/details.vue')
                },
            ]
        },
        {
            path: '/my',
            name: 'my',
            redirect: '/my/message',
            component: () => import('./views/application/index.vue'),
            children: [
                {
                    path: '/my/broadcast',
                    name: 'broadcast',
                    component: () => import('./views/application/broadcast.vue')
                },
                {
                    path: '/my/task',
                    name: 'task',
                    component: () => import('./views/application/task.vue')
                },
                {
                    path: '/my/project',
                    name: 'project',
                    component: () => import('./views/application/project.vue')
                },
                {
                    path: '/my/approval',
                    // name: 'approval',
                    component: () => import('./views/application/approval.vue')
                },
                {
                    path: '/my/schedule',
                    name: 'schedule',
                    component: () => import('./views/application/schedule.vue')
                },
                {
                    path: '/my/message',
                    name: 'message',
                    component: () => import('./views/messages/index.vue')
                },
                {
                    path: '/my/goal',
                    name: 'message',
                    component: () => import('./views/goal/index.vue')
                },
            ]
        }, {
            path: '/broadcast',
            // name: 'broadcast',
            redirect: '/broadcast/receive',
            component: () => import('./views/broadcast/index.vue'),
            children:[
                {
                    path: '/broadcast/receive',
                    // name: 'approval',
                    component: () => import('./views/broadcast/indexList.vue')
                },
                {
                    path: '/broadcast/send',
                    // name: 'approval',
                    component: () => import('./views/broadcast/indexList.vue')
                },
                {
                    path: '/broadcast/:id',
                    name: 'broadcast/detail',
                    component: () => import('./views/broadcast/detail.vue')
                },
            ]
        },
        
        {
            path: '/management',
            name: 'management/index',
            component: () => import('./views/management/index.vue'),
        },
        {
            path: '/knowledgebase',
            name: 'knowledgebase/index',
            component: () => import('./views/knowledgebase/index.vue')
        },
        {
            path: '/knowledgebase/:id',
            name: 'knowledgebase/detail',
            component: () => import('./views/knowledgebase/detail.vue')
        },
        {
            path: '/collaboration',
            name: 'collaboration',
            component: () => import('./views/tool/collaboration.vue')
        },
        {
            path: '/contracts',
            name: 'contracts',
            component: () => import('./views/contracts/index.vue')
        },
        {
            path: '/setting',
            name: 'setting',
            component: () => import('./views/setting/index.vue')
        },
        //供应商
        {
            path: '/supplier',
            name: 'supplier',
            redirect: '/supplier/list',
            component: () => import('./views/client/supplier/index.vue'),
            children: [
               {
                path: '/supplier/list',
                component: () => import('./views/client/supplier/list.vue')
               },
               {
                   path: '/supplier/details/:id',
                   redirect:'/supplier/basic/:id',
                   component: () => import('./views/client/supplier/details.vue'),
                   children:[
                       {
                           path:'/supplier/basic/:id',
                           component:() => import('./views/client/supplier/basic.vue')
                       },
                       {
                            path: '/supplier/linkman/:id',
                            component: () => import('./views/client/supplier/linkman.vue')
                       },
                       {
                            path: '/supplier/project/:id',
                            component: () => import('./views/client/supplier/project.vue')
                       },
                       {
                         path: '/supplier/contract/:id',
                         component: () => import('./views/client/supplier/contract.vue')
                       }
                   ]

               }
            ]
        },
        {
            path: '/404',
            name: '404',
            component: () => import('./views/special/404.vue')
        }
        // {
        //     path: "*",
        //     redirect: "/"
        // },
    ],
});
VueRouter.beforeEach((to, from, next) => {
    if(from.path === '/'){
        next()
    }else{
        const CancelToken = axios.CancelToken
        store.source.cancel && store.source.cancel()
        store.source = CancelToken.source()
        next()
    }
    
})

export default VueRouter