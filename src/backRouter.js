
const backRouter = [{
    path: '/management',
    name: 'management/index',
    component: () => import('./views/management/index.vue'),
    children: [
        {
            path: '/apps',
            component: () => import('./views/management/apps.vue'),
        },
        {
            path: '/apps/talent',
            component: () => import('./views/management/talent.vue'),
        },
        {
            path: '/apps/clue',
            component: () => import('./views/management/clue.vue'),
        },
        {
            path: '/apps/customer',
            component: () => import('./views/management/customer.vue'),
        },
        {
            path: '/apps/project',
            component: () => import('./views/management/project.vue'),
        },
        {
            path: '/apps/task',
            component: () => import('./views/management/task.vue'),
        },
        {
            path: '/apps/calendar',
            component: () => import('./views/management/calendar.vue'),
        },
        {
            path: '/apps/approval',
            component: () => import('./views/management/approval.vue'),
        },
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
            path: '/staff/entryDetail/:id',
            name: 'entryDetail',
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