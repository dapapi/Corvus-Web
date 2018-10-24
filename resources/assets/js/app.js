import config from './config'
import redirect from './bootstrap'

/**
 * 程序入口
 */

window.Vue = require('vue');
Vue.component('selectorsOptions', require('../components/selectors-options.vue'));
Vue.component('selectors', require('../components/selectors.vue'));
Vue.component('selector2Options', require('../components/selector2-options.vue'));
Vue.component('selector2', require('../components/selector2.vue'));
Vue.component('pagination', require('../components/pagination.vue'));
Vue.component('customize-filter', require('../components/customize-filter.vue'));
Vue.component('normal-linkage-selectors', require('../components/normal-linkage-selectors.vue'));
Vue.component('datepicker', require('../components/datepicker.vue'));
Vue.component('number-spinner', require('../components/number-spinner.vue'));
Vue.component('inline-datepicker', require('../components/inline-datepicker.vue'));
Vue.component('calendar', require('../components/calendar.vue'));


$(function () {

    $('#logout-btn').click(function () {
        config.deleteAccessToken();
        redirect('/login')
    })
});


