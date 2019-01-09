import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store/index.js';
import AddMember from './components/AddMember.vue';
import BuildProject from './components/BuildProject.vue';
import Calendar from './components/Calendar.vue';
import Selectors from './components/Selectors.vue';
import ChangeSizeInput from './components/ChangeSizeInput.vue';
import ConditionalInput from './components/ConditionalInput.vue';
import CustomizeField from './components/CustomizeField.vue';
import CustomizeFilter from './components/CustomizeFilter.vue';
import CustomizeLinkageSelectors from './components/CustomizeLinkageSelectors.vue';
import Datepicker from './components/Datepicker.vue';
import DepartmentsItem from './components/DepartmentsItem.vue';
import EditAddMember from './components/EditAddMember.vue';
import EditCompany from './components/EditCompany.vue';
import EditDatepicker from './components/EditDatepicker.vue';
import EditGroupDatePicker from './components/EditGroupDatePicker.vue';
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
import NormalTextarea from './components/NormalTextarea.vue';
import NumberSpinner from './components/NumberSpinner.vue';
import Pagination from './components/Pagination.vue';
import SelectStaff from './components/SelectStaff.vue';
import SubmitReport from './components/SubmitReport.vue';
import SelectorsOptions from './components/SelectorsOptions.vue';
import SwitchYear from '@/components/SwitchYear'
import TaskFollowUp from './components/TaskFollowUp.vue';
import LeftMenu from './components/LeftMenu.vue';
import ListSelection from './components/ListSelection.vue';
import ListSelectMember from './components/ListSelectMember.vue';
import Loading from './components/Loading.vue';
import MeetingRoomCalendar from './components/MeetingRoomCalendar.vue';
import Modal from './components/Modal.vue';
import CheckboxGroup from './components/CheckboxGroup.vue';
import NavBack from './components/NavBack.vue';
import Upload from './components/Upload.vue';
import MtpTable from './components/Table.vue';
import Timepicker from './components/Timepicker.vue';
import treeView from './components/ViewTree/TreeView.vue'
import Flag from './components/Flag.vue';
import AddModifyBroadCast from './components/AddModifyBroadCast.vue';
import RegionSelector from './components/RegionSelector.vue';
import StaffEditSelect from './components/StaffEditSelect'
import TrailOrigin from './components/TrailOrigin'
import DepartmentItem from './views/organization/DepartmentItem.vue';
import DropDepartment from './components/DropDepartment.vue'
import Department from './components/Department.vue'
import AddClientType from './components/AddClientType.vue'
import DocPreview from '@/components/DocPreview.vue'
import ToolTips from '@/components/ToolTips.vue'
import ApprovalGoModal from '@/components/ForApproval/ApprovalGoModal.vue'
import AppDetail from  '@/views/approval/appdetail.vue'
import Avatar from '@/components/Avatar.vue'
import ApprovalProgress from '@/components/ForApproval/ApprovalProgress'

import DepartmentPicker from '@/components/DepartmentPicker'
Vue.config.productionTip = false;
Vue.component('ApprovalGoModal', ApprovalGoModal);
Vue.component('AppDetail', AppDetail);
Vue.component('ApprovalProgress', ApprovalProgress);

Vue.component('AddMember', AddMember);
Vue.component('BuildProject', BuildProject);
Vue.component('Calendar', Calendar);
Vue.component('ChangeSizeInput', ChangeSizeInput);
Vue.component('ConditionalInput', ConditionalInput);
Vue.component('CustomizeField', CustomizeField);
Vue.component('CustomizeFilter', CustomizeFilter);
Vue.component('CustomizeLinkageSelectors', CustomizeLinkageSelectors);
Vue.component('Datepicker', Datepicker);
Vue.component('DepartmentsItem', DepartmentsItem);
Vue.component('DepartmentPicker', DepartmentPicker);
Vue.component('EditAddMember', EditAddMember);
Vue.component('EditCompany', EditCompany);
Vue.component('EditDatepicker', EditDatepicker);
Vue.component('EditGroupDatePicker', EditGroupDatePicker);
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
Vue.component('NormalTextarea', NormalTextarea);
Vue.component('NumberSpinner', NumberSpinner);
Vue.component('Pagination', Pagination);
Vue.component('SelectStaff', SelectStaff);
Vue.component('StaffEditSelect', StaffEditSelect);
Vue.component('SubmitReport', SubmitReport);
Vue.component('Selectors', Selectors);
Vue.component('SelectorsOptions', SelectorsOptions);
Vue.component('SwitchYear', SwitchYear);
Vue.component('TaskFollowUp', TaskFollowUp);
Vue.component('LeftMenu', LeftMenu);
Vue.component('ListSelection', ListSelection);
Vue.component('ListSelectMember', ListSelectMember);
Vue.component('Loading', Loading);
Vue.component('MeetingRoomCalendar', MeetingRoomCalendar);
Vue.component('Modal', Modal);
Vue.component('CheckboxGroup', CheckboxGroup);
Vue.component('NavBack', NavBack);
Vue.component('Upload', Upload);
Vue.component('MtpTable', MtpTable);
Vue.component('Timepicker', Timepicker);
Vue.component('treeView', treeView);
Vue.component('Flag', Flag);
Vue.component('AddModifyBroadCast', AddModifyBroadCast);
Vue.component('RegionSelector', RegionSelector);
Vue.component('TrailOrigin', TrailOrigin)
Vue.component('Department', DepartmentItem);
Vue.component('Departments', Department);
Vue.component('DropDepartment', DropDepartment);
Vue.component('AddClientType', AddClientType);
Vue.component('DocPreview', DocPreview)
Vue.component('ToolTips', ToolTips)
Vue.component('Avatar', Avatar)

Vue.prototype.globalClick = function (callback) {
    document.getElementById('app').addEventListener('click', (event) => {
        callback(event);
    });
};

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app');
