<template>
    <div class="page-main" style="background-color:#f3f4f5">
        <div class="page-header page-header-bordered">
            <h1 class="page-title">销售线索报表</h1>
        </div>
        <div class="page-content container-fluid">
            <div class="bg-white">
                <div class="clearfix">
                    <div class="col-md-5 p-20 clearfix float-left">
                        <GroupDatepicker ref="timeInterval" @change="changeDate"></GroupDatepicker>
                    </div>
                    <div class="col-md-7 p-20 clearfix float-left">
                        <div class="col-md-3 float-left">
                            <button type="button" class="btn btn-block btn-success waves-effect waves-classic"
                                    :disabled="designationDateNum === 'day'" @click="selectDate('day')">7天
                            </button>
                        </div>
                        <div class="col-md-3 float-left">
                            <button type="button" class="btn btn-block btn-success waves-effect waves-classic"
                                    :disabled="designationDateNum === 'month'" @click="selectDate('month')">30天
                            </button>
                        </div>
                        <div class="col-md-3 float-left">
                            <button type="button" class="btn btn-block btn-success waves-effect waves-classic"
                                    :disabled="designationDateNum === 'quarter'" @click="selectDate('quarter')">季度
                            </button>
                        </div>
                        <div class="col-md-3 float-left">
                            <button type="button" class="btn btn-block btn-success waves-effect waves-classic"
                                    :disabled="designationDateNum === 'year'" @click="selectDate('year')">年度
                            </button>
                        </div>
                    </div>
                </div>

                <div class="col-md-12 clearfix my-10 px-0" v-if="tableData">
                    <div class="col-md-3 float-left">
                        <div class="col-md-6 float-left text-right">数量合计</div>
                        <div class="col-md-6 float-left" v-if="tableData.trail_total">{{ tableData.trail_total }}个</div>
                    </div>
                    <div class="col-md-4 float-left">
                        <div class="col-md-6 float-left text-right">预计订单收入总额</div>
                        <div class="col-md-6 float-left" v-if="tableData.fee_total">{{ tableData.fee_total }}元</div>
                    </div>
                </div>

                <div class="col-md-12">
                    <ul class="nav nav-tabs nav-tabs-line" role="tablist" id="taskTab">
                        <li class="nav-item" role="presentation" @click="getReport(0, 0)">
                            <a class="nav-link active" data-toggle="tab" href="#forum-trail-report"
                               aria-controls="forum-base"
                               aria-expanded="true" role="tab">线索报表</a>
                        </li>
                        <li class="nav-item" role="presentation" @click="setReports">
                            <a class="nav-link" data-toggle="tab" href="#forum-trail-add"
                               aria-controls="forum-present"
                               aria-expanded="false" role="tab">线索新增</a>
                        </li>
                        <li class="nav-item" role="presentation" @click="industryReports">
                            <a class="nav-link" data-toggle="tab" href="#forum-industry-analysis"
                               aria-controls="forum-present"
                               aria-expanded="false" role="tab">行业分析</a>
                        </li>
                    </ul>
                </div>
                <div class="page-content tab-content nav-tabs-animate bg-white">
                    <div class="tab-pane animation-fade active" id="forum-trail-report" role="tabpanel">
                        <div class="clearfix">
                            <div class="col-md-2 float-left pl-0">
                                <Selectors :options="trailTypeArr"
                                           @change="changeTrailType"></Selectors>
                            </div>
                            <div class="col-md-3 float-left pl-0" v-if="departmentsInfo.length > 1">
                                <DropDepartment name="组别" :data="departmentsInfo" @change="selectDepartment"/>
                            </div>
                        </div>

                        <table class="table table-hover is-indent example" data-plugin="animateList" data-animate="fade"
                               data-child="tr"
                               data-selectable="selectable">
                            <tr class="animation-fade"
                                style="animation-fill-mode: backwards; animation-duration: 250ms; animation-delay: 0ms;">
                                <th class="cell-100" scope="col">线索类别</th>
                                <th class="cell-100" scope="col">线索名称</th>
                                <th class="cell-100" scope="col">线索来源</th>
                                <th class="cell-100" scope="col">组别</th>
                                <th class="cell-100" scope="col">目标艺人</th>
                                <th class="cell-100" scope="col">预计订单收入</th>
                                <th class="cell-100" scope="col">线索状态</th>
                                <th class="cell-100" scope="col">优先级</th>
                                <th class="cell-100" scope="col">负责人</th>
                            </tr>
                            <tbody>
                            <tr v-for="data in tableData.trail_list">
                                <td>
                                    <template v-if="data.type === 1">影视</template>
                                    <template v-if="data.type === 2">综艺</template>
                                    <template v-if="data.type === 3">商务</template>
                                </td>
                                <td>{{ data.title }}</td>
                                <td>
                                    {{ trailOrigin.find(item => item.value == data.resource_type).name }}
                                    <template v-if="data.resource">
                                        ：{{ data.resource }}
                                    </template>
                                </td>
                                <td>{{ data.deparment_name }}</td>
                                <td>{{ data.star_name }}</td>
                                <td>{{ data.fee }}元</td>
                                <td><span :style="{color:trailStatusArr.find(item => item.value == data.status).color}">{{ trailStatusArr.find(item => item.value == data.status).name }}</span> </td>
                                <td>{{ priorityArr.find(item => item.value == data.priority).name }}</td>
                                <td>{{ data.principal_user }}</td>
                            </tr>
                            </tbody>
                        </table>
                        <div class="col-md-1" style="margin: 6rem auto"
                             v-if="tableData.trail_list && tableData.trail_list.length === 0">
                            <img src="https://res.papitube.com/corvus/images/content-none.png" alt=""
                                 style="width: 100%">
                        </div>
                    </div>
                    <div class="tab-pane animation-fade" id="forum-trail-add" role="tabpanel">
                        <div class="clearfix pb-20">
                            <div class="col-md-2 float-left pl-0">
                                <Selectors :options="newTrailSearchArr" @change="changeSelectTime"></Selectors>
                            </div>
                            <div class="col-md-2 float-left pl-0">
                                <Selectors :options="starsArr" @change="changeStar"></Selectors>
                            </div>
                            <div class="col-md-3 float-left">
                                <DropDepartment name="组别" :data="departmentsInfo" @change="selectAddDepartment"/>
                            </div>
                        </div>
                        <div class="col-md-12">
                            <div ref="trail" style="width: 800px;height:500px;margin: 0 auto"></div>
                        </div>
                    </div>
                    <div class="tab-pane animation-fade" id="forum-industry-analysis" role="tabpanel">
                        <div class="">
                            <Selectors :options="trailTypeArr" @change="changeIndustryTrailType"></Selectors>
                        </div>
                        <div class="col-md-12">
                            <div ref="industry" style="width: 800px;height:500px;margin: 0 auto"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapState } from 'vuex'
    import fetch from '../../assets/utils/fetch.js'
    import config from '../../assets/js/config'

    export default {
        name: "trail",
        data() {
            return {
                tableData: [],
                nowDate: '',
                designationDateNum: 'day',
                trailOrigin: config.trailOrigin,
                trailTypeArr: [
                    {
                        name: '线索类型',
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
                newTrailSearchArr: [
                    {
                        name: '查询时间',
                        value: '',
                    },
                    {
                        name: '最近半年',
                        value: 1
                    },
                    {
                        name: '本年',
                        value: 2
                    }
                ],
                trailType: '',
                trailStatusArr: config.trailStatusArr,
                priorityArr: config.priorityArr,
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
                starId: '',
                start_time: '',
                end_time: '',
            }
        },
        mounted() {
            this.getReport();
            if (this.department.length > 0) {
                this.departmentsInfo = this.departmentsInfo.concat(this.department)
            }
            this.getStars();
        },
        computed: {
            ...mapState([
                'department',
            ]),
            _department () {
                return this.department
            }
        },

        watch: {
            _department () {
                this.departmentsInfo = this.departmentsInfo.concat(this.department);
            }
        },
        methods: {
            getReport(start_time = null, end_time = null) {
                if (!start_time) {
                    if (!this.start_time) {
                        start_time = this.getDesignationDate(-7);
                        this.start_time = start_time;
                    } else {
                        start_time = this.start_time
                    }
                }
                if (!end_time) {
                    if (!this.end_time) {
                        end_time = this.getNowFormatDate();
                        this.end_time = end_time;
                    } else {
                        end_time = this.end_time
                    }
                }

                let data = {
                    start_time: start_time,
                    end_time: end_time,
                };
                if (this.trailType) {
                    data.type = this.trailType
                }
                if (this.departmentId) {
                    data.department = this.departmentId
                }
                this.$refs.timeInterval.setValue(start_time, end_time);
                fetch('get', '/reportfrom/trail', data).then(response => {
                    this.tableData = response
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
                this.getReport(designationDate, this.nowDate);
                this.setReports(designationDate, this.nowDate);
                this.industryReports(designationDate, this.nowDate);
            },

            changeDate(start, end) {
                this.start_time = start;
                this.end_time = end;
                this.designationDateNum = '';
                this.getReport(start, end);
                this.setReports(start, end);
                this.industryReports(start, end);
            },

            changeSelectTime(value) {
                let designationDate = '';
                if (value == 1) {
                    designationDate = this.getDesignationDate(-180);
                } else if (value == 2) {
                    designationDate = this.getDesignationDate(0);
                    designationDate = designationDate.split('-')[0] + '-' + 1 + '-' + 1;
                } else {
                    designationDate = this.nowDate;
                }
                this.designationDateNum = '';
                this.$refs.timeInterval.setValue(designationDate, this.nowDate);
                this.setReports(designationDate, this.nowDate)
            },

            changeStar(value) {
                this.starId = value;
                this.designationDateNum = '';
                this.setReports();
            },

            changeTrailType(value) {
                this.trailType = value;
                this.getReport()
            },

            changeIndustryTrailType(value) {
                this.industryTrailType = value;
                this.industryReports();
            },

            selectDepartment(value) {
                this.departmentId = value.id;
                this.getReport()
            },

            selectAddDepartment(value) {
                this.addDepartmentId = value.id;
                this.setReports();
            },

            setReports(start_time, end_time) {
                if (!start_time || !end_time) {
                    start_time = this.start_time;
                    end_time = this.start_time;
                }
                let data = {
                    start_time: start_time,
                    end_time: end_time
                };

                if (this.starId) {
                    data.target_star = this.starId
                }
                if (this.addDepartmentId) {
                    data.department = this.addDepartmentId
                }

                let trailChart = echarts.init(this.$refs.trail, 'mttop');

                fetch('get', '/reportfrom/newtrail', data).then(function (response) {
                    let dataTimeArr = [];
                    let dataAllInfo = [];
                    let dataBusinessInfo = [];
                    let dataMovieInfo = [];
                    let dataZYInfo = [];
                    for (let item in response.trails) {
                        dataTimeArr.push(item);
                        if (response.trails[item].length === 0) {
                            dataAllInfo.push(0);
                            dataBusinessInfo.push(0);
                            dataMovieInfo.push(0);
                            dataZYInfo.push(0);
                            continue;
                        }
                        for (let i = 0; i < response.trails[item].length; i++) {
                            switch (response.trails[item][i].type) {
                                case 1:
                                    dataMovieInfo.push(response.trails[item][i].total);
                                    break;
                                case 2:
                                    dataZYInfo.push(response.trails[item][i].total);
                                    break;
                                case 3:
                                    dataBusinessInfo.push(response.trails[item][i].total);
                                    break;
                                case 'sum':
                                    dataAllInfo.push(response.trails[item][i].total)
                            }
                        }
                    }
                    let trailOption = {
                        tooltip: {
                            trigger: 'axis'
                        },
                        legend: {
                            data: ['总数', '商务', '影视', '综艺']
                        },
                        grid: {
                            left: '3%',
                            right: '4%',
                            bottom: '3%',
                            containLabel: true
                        },
                        xAxis: {
                            type: 'category',
                            boundaryGap: false,
                            data: dataTimeArr
                        },
                        yAxis: {
                            type: 'value'
                        },
                        series: [
                            {
                                name: '总数',
                                type: 'line',
                                data: dataAllInfo
                            },
                            {
                                name: '商务',
                                type: 'line',
                                data: dataBusinessInfo
                            },
                            {
                                name: '影视',
                                type: 'line',
                                data: dataMovieInfo
                            },
                            {
                                name: '综艺',
                                type: 'line',
                                data: dataZYInfo
                            }
                        ]
                    };

                    trailChart.setOption(trailOption);
                });

            },

            industryReports() {
                let data = {
                    start_time: this.start_time,
                    end_time: this.end_time
                };

                if (this.industryTrailType) {
                    data.type = this.industryTrailType
                }

                let industryChart = echarts.init(this.$refs.industry, 'mttop');

                fetch('get', '/reportfrom/industryanalysis', data).then(function (response) {
                    let data = [];
                    let dataValue = [];
                    for (let i = 0; i < response.trails.length; i++) {
                        data.push(response.trails[i].industry_name);
                        dataValue.push(response.trails[i].total)
                    }
                    let industryOption = {
                        xAxis: {
                            type: 'category',
                            data: data
                        },
                        yAxis: {
                            type: 'value'
                        },
                        series: [{
                            data: dataValue,
                            type: 'bar'
                        }]
                    };
                    industryChart.setOption(industryOption)
                })
            }
        }
    }
</script>

<style>
    .bootstrap-select:not([class*=col-]):not([class*=form-control]):not(.input-group-btn) {
        width: 100px;
    }
</style>