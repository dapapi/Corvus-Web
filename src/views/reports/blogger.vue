<template>
    <div class="page-main" style="background-color:#f3f4f5">
        <div class="page-header page-header-bordered">
            <h1 class="page-title">博主报表</h1>

            <div class="page-header-actions">
                <ImportAndExport class="float-left" :type="'export'" :moduleName="'reportfrom/bloggerreport'"
                                 :params="exportParams">
                    <a class="iconfont icon-daochu font-size-20 pointer-content" aria-hidden="true" title="导出博主报表"></a>
                </ImportAndExport>
            </div>
        </div>
        <div class="page-content container-fluid">
            <div class="bg-white">
                <div class="clearfix">
                    <div class="col-md-5 p-20 clearfix float-left" style="z-index: 0">
                        <GroupDatepicker ref="timeInterval" @change="changeDate"></GroupDatepicker>
                    </div>
                    <div class="col-md-7 p-20 clearfix float-left" style="z-index: 0;">
                        <div class="col-md-3 float-left">
                            <button type="button"
                                    class="btn btn-block btn-success waves-effect waves-classic search-button"
                                    :disabled="designationDateNum === 'day'" @click="selectDate('day')">7天
                            </button>
                        </div>
                        <div class="col-md-3 float-left">
                            <button type="button"
                                    class="btn btn-block btn-success waves-effect waves-classic search-button"
                                    :disabled="designationDateNum === 'month'" @click="selectDate('month')">30天
                            </button>
                        </div>
                        <div class="col-md-3 float-left">
                            <button type="button"
                                    class="btn btn-block btn-success waves-effect waves-classic search-button"
                                    :disabled="designationDateNum === 'quarter'" @click="selectDate('quarter')">季度
                            </button>
                        </div>
                        <div class="col-md-3 float-left">
                            <button type="button"
                                    class="btn btn-block btn-success waves-effect waves-classic search-button"
                                    :disabled="designationDateNum === 'year'" @click="selectDate('year')">年度
                            </button>
                        </div>
                    </div>
                </div>

                <div class="col-md-12 clearfix my-10 px-0">
                    <div class="col-md-3 float-left">
                        <div class="col-md-7 float-left text-right">数量合计</div>
                        <div class="col-md-5 float-left" v-if="tableData.total">{{ tableData.total }}个</div>
                    </div>
                    <div class="col-md-3 float-left">
                        <div class="col-md-7 float-left text-right pl-0">预计订单收入总额</div>
                        <div class="col-md-5 float-left">{{ tableData.total_fee }}元</div>
                    </div>
                    <div class="col-md-3 float-left">
                        <div class="col-md-7 float-left text-right">合同金额总额</div>
                        <div class="col-md-5 float-left">
                            {{ tableData.total_contract_amount ? tableData.total_contract_amount : 0 }}元
                        </div>
                    </div>
                    <div class="col-md-3 float-left">
                        <div class="col-md-7 float-left text-right">花费金额总额</div>
                        <div class="col-md-5 float-left">
                            {{ tableData.total_expenditure_money ? tableData.total_expenditure_money : 0 }}元
                        </div>
                    </div>
                </div>

                <div class="col-md-12">
                    <ul class="nav nav-tabs nav-tabs-line" role="tablist" id="taskTab">
                        <li class="nav-item" role="presentation">
                            <a class="nav-link active" data-toggle="tab" href="#forum-business-report"
                               aria-controls="forum-base"
                               aria-expanded="true" role="tab">博主报表</a>
                        </li>
                    </ul>
                </div>
                <div class="page-content tab-content nav-tabs-animate bg-white">
                    <div class="tab-pane animation-fade active" id="forum-business-report" role="tabpanel">
                        <div class="clearfix">
                            <div class="col-md-2 float-left pl-0">
                                <Selectors :options="artistStatusArr" @change="changeArtistStatus"
                                           placeholder="请选择博主状态"></Selectors>
                            </div>
                            <div class="col-md-3 float-left pl-0"
                                 v-if="departmentsInfo.length > 1 && artistStatus != 1">
                                <DropDepartment name="组别" :data="departmentsInfo" @change="selectDepartment"/>
                            </div>
                        </div>
                        <table class="table table-hover is-indent example" data-plugin="animateList" data-animate="fade"
                               data-child="tr"
                               data-selectable="selectable">
                            <tr class="animation-fade"
                                style="animation-fill-mode: backwards; animation-duration: 250ms; animation-delay: 0ms;">
                                <template v-if="artistStatus == 1">
                                    <th class="cell-100" scope="col">昵称</th>
                                    <th class="cell-100" scope="col">类型</th>
                                    <th class="cell-100" scope="col">沟通状态</th>
                                    <th class="cell-100" scope="col">录入时间</th>
                                    <th class="cell-100" scope="col">最后跟进时间</th>
                                </template>
                                <template v-else>
                                    <th class="cell-100" scope="col">制作组</th>
                                    <th class="cell-100" scope="col">昵称</th>
                                    <th class="cell-100" scope="col">
                                        <Selectors :options="trailsNumArr" @change="changeTrailsNum"
                                                   placeholder="线索数量"></Selectors>
                                    </th>
                                    <th class="cell-100" scope="col">预计订单收入</th>
                                    <th class="cell-100" scope="col">
                                        <Selectors :options="projectsNumArr" @change="changeProjectsNum"
                                                   placeholder="项目数量"></Selectors>
                                    </th>
                                    <th class="cell-100" scope="col">合同金额</th>
                                    <th class="cell-100" scope="col">花费金额</th>
                                </template>
                            </tr>
                            <tbody>
                            <tr v-for="data in tableData.blogger">
                                <template v-if="artistStatus == 1">
                                    <td>{{ data.nickname }}</td>
                                    <td>{{ data.type_id }}</td>
                                    <td>{{ papiCommunicationStatusArr.find(item => item.value ==
                                        data.communication_status) ? papiCommunicationStatusArr.find(item => item.value
                                        ==
                                        data.communication_status).name : '' }}
                                    <td>{{ data.created_at }}</td>
                                    <td>{{ data.last_update_at }}</td>
                                </template>
                                <template v-else>
                                    <td>{{ data.department_name }}</td>
                                    <td>{{ data.nickname }}</td>
                                    <td>{{ data.trail_total }}</td>
                                    <td>{{ data.total_fee ? data.total_fee : 0 }}元</td>
                                    <td>{{ data.total_contract_money ? data.total_contract_money : 0 }}元</td>
                                    <td>{{ data.total_expenditure_money ? data.total_expenditure_money : 0 }}元</td>
                                </template>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapState} from 'vuex'
    import fetch from '../../assets/utils/fetch.js'
    import config from '../../assets/js/config'

    export default {
        name: "blogger",
        data() {
            return {
                tableData: [],
                nowDate: '',
                designationDateNum: 'day',
                papiCommunicationStatusArr: config.papiCommunicationStatusArr,
                artistStatusArr: [
                    {
                        name: '全部',
                        value: ''
                    },
                    {
                        name: '签约中',
                        value: 1
                    },
                    {
                        name: '已签约',
                        value: 2
                    },
                    {
                        name: '已解约',
                        value: 3
                    }
                ],
                artistStatus: 1,
                trailsNum: '',
                projectsNum: '',
                trailsNumArr: [
                    {
                        name: '线索数量',
                        value: '',
                    },
                    {
                        name: '影视',
                        value: 1
                    },
                    {
                        name: '综艺',
                        value: 2
                    },
                    {
                        name: '商务',
                        value: 3
                    }
                ],
                projectsNumArr: [
                    {
                        name: '项目数量',
                        value: '',
                    },
                    {
                        name: '影视',
                        value: 1
                    },
                    {
                        name: '综艺',
                        value: 2
                    },
                    {
                        name: '商务',
                        value: 3
                    }
                ],
                departmentsInfo: [
                    {
                        name: '请选择组别',
                        id: '',
                        departments: {
                            data: []
                        }
                    }
                ],
                departmentId: '',
                starsArr: [
                    {
                        name: '目标艺人',
                        value: ''
                    }
                ],
                exportParams: {},
            }
        },
        mounted() {
            this.getReport();
            this.getStars();
            if (this.department.length > 0) {
                this.departmentsInfo = this.departmentsInfo.concat(this.department)
            }
        },

        computed: {
            ...mapState([
                'department',
            ]),
            _department() {
                return this.department
            }
        },

        watch: {
            _department() {
                this.departmentsInfo = this.departmentsInfo.concat(this.department);
            }
        },

        methods: {
            getReport(start_time = null, end_time = null) {
                if (!start_time) {
                    if (!this.start_time) {
                        start_time = this.getDesignationDate(-7);
                    } else {
                        start_time = this.start_time
                    }
                }
                if (!end_time) {
                    if (!this.end_time) {
                        end_time = this.getNowFormatDate();
                    } else {
                        end_time = this.end_time
                    }
                }
                let data = {
                    start_time: start_time,
                    end_time: end_time,
                    sign_contract_status: this.artistStatus
                };
                if (this.departmentId) {
                    data.department = this.departmentId
                }
                if (this.trailsNum) {
                    data.trail_type = this.trailsNum
                }
                if (this.projectsNum) {
                    data.project_type = this.projectsNum
                }
                this.exportParams = data;
                this.$refs.timeInterval.setValue(start_time, end_time);
                let _this = this;
                fetch('get', '/reportfrom/bloggerreport', data).then(function (response) {
                    _this.tableData = response
                })
            },

            getStars() {
                fetch('get', '/stars/all').then(response => {
                    for (let i = 0; i < response.data.length; i++) {
                        this.starsArr.push({
                            value: response.data[i].id,
                            name: response.data[i].name
                        })
                    }
                })
            },

            selectDepartment(value) {
                this.departmentId = value.id;
                this.getReport()
            },

            getNowFormatDate() {
                let date = new Date();
                let seperator1 = "-";
                let year = date.getFullYear();
                let month = date.getMonth() + 1;
                let strDate = date.getDate();
                if (month >= 1 && month <= 9) {
                    month = "0" + month;
                }
                if (strDate >= 0 && strDate <= 9) {
                    strDate = "0" + strDate;
                }
                let nowDate = year + seperator1 + month + seperator1 + strDate;
                this.nowDate = nowDate;
                return nowDate;
            },

            getDesignationDate(value) {
                let date1 = new Date();
                let date2 = new Date(date1);
                date2.setDate(date1.getDate() + value);
                return date2.getFullYear() + "-" + (date2.getMonth() + 1) + "-" + date2.getDate();
            },

            selectDate(value) {
                this.designationDateNum = value;
                let designationDate = '';
                switch (value) {
                    case 'day' :
                        designationDate = this.getDesignationDate(-7);
                        break;
                    case 'month':
                        designationDate = this.getDesignationDate(-30);
                        break;
                    case 'quarter':
                        designationDate = this.getDesignationDate(-90);
                        break;
                    case 'year':
                        designationDate = this.getDesignationDate(-365);
                        break;
                }
                this.$refs.timeInterval.setValue(designationDate, this.nowDate);
                this.getReport(designationDate, this.nowDate)
            },

            changeTrailsNum(value) {
                this.trailsNum = value;
                this.getReport();
            },

            changeProjectsNum(value) {
                this.projectsNum = value;
                this.getReport();
            },

            changeDate(start, end) {
                this.designationDateNum = '';
                this.getReport(start, end);
            },

            changeArtistStatus(value) {
                this.artistStatus = value;
                this.getReport()
            },
        }
    }
</script>

<style>
    .bootstrap-select:not([class*=col-]):not([class*=form-control]):not(.input-group-btn) {
        width: 100px;
    }
</style>