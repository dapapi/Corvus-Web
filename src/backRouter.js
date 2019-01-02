
const backRouter = [{
    path: '/management',
    name: 'management/index',
    component: () => import('./views/management/index.vue'),
    children: [
        {
            path: '/rolemanagement',
            component: () => import('./views/management/rolemanagement.vue')
        }, {
            path: '/organization',
            name: 'organization',
            component: () => import('./views/organization/index.vue')
        },
        {
            path: '/organization/management',
            name: 'organization/management',
            component: () => import('./views/organization/management.vue')
        },
        {
            path: '/staff',
            name: 'staff',
            component: () => import('./views/staff/index.vue')
        },
        {
            path: '/staff/add',
            name: 'staffAdd',
            component: () => import('./views/staff/add.vue')
        },
        {
            path: '/staff/edit/:id',
            name: 'staffEdit',
            component: () => import('./views/staff/add.vue')
        },
        {
            path: '/staff/detail/:id',
            name: 'staffDetail',
            component: () => import('./views/staff/detail.vue'),
        },
        {
            path: '/staff/history',
            name: 'staffHistory',
            component: () => import('./views/staff/history.vue'),
        },
        {
            path: '/staff/apply',
            name: 'staffApply',
            component: () => import('./views/staff/apply.vue'),
        }
    ]},
    {
        path: "*",
        redirect: "/404"
    },
]

export default backRouter