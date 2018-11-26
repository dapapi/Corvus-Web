import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store/index.js';
import AddMember from './components/AddMember.vue';
import Calendar from './components/Calendar.vue';
import Selectors from './components/Selectors.vue';
import ChangeSizeInput from './components/ChangeSizeInput.vue';
import CustomizeField from './components/CustomizeField.vue';
import CustomizeFilter from './components/CustomizeFilter.vue';
import CustomizeLinkageSelectors from './components/CustomizeLinkageSelectors.vue';
import Datepicker from './components/Datepicker.vue';
import DepartmentsItem from './components/DepartmentsItem.vue';
import EditAddMember from './components/EditAddMember.vue';
import EditCompany from './components/EditCompany.vue';
import EditDatepicker from './components/EditDatepicker.vue';
import EditInput from './components/EditInput.vue';
import EditInputSelector from './components/EditInputSelector.vue';
import EditNumberSpinner from './components/EditNumberSpinner.vue';
import EditSelector from './components/EditSelector.vue';
import EditTextarea from './components/EditTextarea.vue';
import EditableSearchBox from './components/EditableSearchBox.vue';
import EmitInput from './components/EmitInput.vue';
import FileUploader from './components/FileUploader.vue';
import GroupDatepicker from './components/GroupDatepicker.vue';
import InlineDatepicker from './components/InlineDatepicker.vue';
import InputSelectors from './components/InputSelectors.vue';
import NormalLinkageSelectors from './components/NormalLinkageSelectors.vue';
import NumberSpinner from './components/NumberSpinner.vue';
import Pagination from './components/Pagination.vue';
import SelectStaff from './components/SelectStaff.vue';
import SelectorsOptions from './components/SelectorsOptions.vue';
import TaskFollowUp from './components/TaskFollowUp.vue';
import LeftMenu from './components/LeftMenu.vue';
import Modal from './components/Modal.vue';
import CheckboxGroup from './components/CheckboxGroup.vue';
import NavBack from './components/NavBack.vue';
import Upload from './components/Upload.vue';
import MtpTable from './components/Table.vue';
import Timepicker from './components/Timepicker.vue';
import Flag from './components/Flag.vue'
import AddModifyBroadCast from './components/AddModifyBroadCast.vue'
import RegionSelector from './components/RegionSelector.vue'

Vue.config.productionTip = false;

Vue.component('AddMember', AddMember);
Vue.component('Calendar', Calendar);
Vue.component('ChangeSizeInput', ChangeSizeInput);
Vue.component('CustomizeField', CustomizeField);
Vue.component('CustomizeFilter', CustomizeFilter);
Vue.component('CustomizeLinkageSelectors', CustomizeLinkageSelectors);
Vue.component('Datepicker', Datepicker);
Vue.component('DepartmentsItem', DepartmentsItem);
Vue.component('EditAddMember', EditAddMember);
Vue.component('EditCompany', EditCompany);
Vue.component('EditDatepicker', EditDatepicker);
Vue.component('EditInput', EditInput);
Vue.component('EditInputSelector', EditInputSelector);
Vue.component('EditNumberSpinner', EditNumberSpinner);
Vue.component('EditSelector', EditSelector);
Vue.component('EditTextarea', EditTextarea);
Vue.component('EditableSearchBox', EditableSearchBox);
Vue.component('EmitInput', EmitInput);
Vue.component('FileUploader', FileUploader);
Vue.component('GroupDatepicker', GroupDatepicker);
Vue.component('InlineDatepicker', InlineDatepicker);
Vue.component('InputSelectors', InputSelectors);
Vue.component('NormalLinkageSelectors', NormalLinkageSelectors);
Vue.component('NumberSpinner', NumberSpinner);
Vue.component('Pagination', Pagination);
Vue.component('SelectStaff', SelectStaff);
Vue.component('Selectors', Selectors);
Vue.component('SelectorsOptions', SelectorsOptions);
Vue.component('TaskFollowUp', TaskFollowUp);
Vue.component('LeftMenu', LeftMenu);
Vue.component('Modal', Modal);
Vue.component('CheckboxGroup', CheckboxGroup);
Vue.component('NavBack', NavBack);
Vue.component('Upload', Upload);
Vue.component('MtpTable', MtpTable);
Vue.component('Timepicker', Timepicker);
Vue.component('Flag', Flag);
Vue.component('AddModifyBroadCast', AddModifyBroadCast);
Vue.component('RegionSelector', RegionSelector);
Vue.prototype.globalClick = function (callback) {
  document.getElementById('app').addEventListener('click', () => {
    callback(event);
  });
};

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
