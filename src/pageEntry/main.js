import Vue from 'vue';
import App from './App.vue';
import router from './router';
// import store from './store/index.js';

import EditSelector from '../components/EditSelector.vue';
import Upload from '../components/Upload.vue';
import Datepicker from '../components/Datepicker.vue';
import Selectors from '../components/Selectors.vue';
import SelectorsOptions from '../components/SelectorsOptions.vue';

Vue.component('EditSelector', EditSelector);
Vue.component('Upload', Upload);
Vue.component('Datepicker', Datepicker);
Vue.component('Selectors', Selectors);
Vue.component('SelectorsOptions', SelectorsOptions);

Vue.config.productionTip = false;
// 设置toast展示时间
// toastr.options.timeOut = 2000

new Vue({
    router,
    // store,
    render: h => h(App),
}).$mount('#app');
