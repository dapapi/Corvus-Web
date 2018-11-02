import config from './config'
import redirect from './bootstrap'

/**
 * 程序入口
 */

window.Vue = require('vue');
Vue.component('add-member', require('../components/add-member.vue'));
Vue.component('calendar', require('../components/calendar.vue'));
Vue.component('change-size-input', require('../components/change-size-input.vue'));
Vue.component('customize-field', require('../components/customize-field.vue'));
Vue.component('customize-filter', require('../components/customize-filter.vue'));
Vue.component('customize-linkage-selectors', require('../components/customize-linkage-selectors.vue'));
Vue.component('datepicker', require('../components/datepicker.vue'));
Vue.component('departments-item', require('../components/departments-item.vue'));
Vue.component('edit-add-member', require('../components/edit-add-member.vue'));
Vue.component('edit-datepicker', require('../components/edit-datepicker.vue'));
Vue.component('edit-input', require('../components/edit-input.vue'));
Vue.component('edit-input-selector', require('../components/edit-input-selector.vue'));
Vue.component('edit-selector', require('../components/edit-selector.vue'));
Vue.component('edit-textarea', require('../components/edit-textarea.vue'));
Vue.component('inline-datepicker', require('../components/inline-datepicker.vue'));
Vue.component('input-selectors', require('../components/input-selectors.vue'));
Vue.component('normal-linkage-selectors', require('../components/normal-linkage-selectors.vue'));
Vue.component('number-spinner', require('../components/number-spinner.vue'));
Vue.component('pagination', require('../components/pagination.vue'));
Vue.component('select-staff', require('../components/select-staff.vue'));
Vue.component('selectors', require('../components/selectors.vue'));
Vue.component('selectorsOptions', require('../components/selectors-options.vue'));
Vue.component('task-follow-up', require('../components/task-follow-up.vue'));

Vue.prototype.globalClick = function (callback) {
    document.getElementById('root').addEventListener('click', function () {
        callback(event);
    });
};


$(function () {

    $('#logout-btn').click(function () {
        config.deleteAccessToken();
        redirect('/login')
    })
});


