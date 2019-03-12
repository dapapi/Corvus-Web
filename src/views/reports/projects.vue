<template>
    <div class="page-main" style="background-color:#f3f4f5">
        <div class="page-header page-header-bordered">
            <h1 class="page-title">项目报表</h1>

            <div class="page-header-actions">
                <ImportAndExport class="float-left" :type="'export'" :moduleName="'reportfrom/projectreport'" :params="exportParams">
                    <i class="iconfont icon-daochu font-size-20 pointer-content" title="导出" aria-hidden="true"></i>
                </ImportAndExport>
            </div>
        </div>
        <div class="page-content container-fluid">
            <div class="bg-white">
                <div class="clearfix">
                    <div class="col-md-5 p-20 clearfix float-left" style="z-index: 0">
                        <GroupDatepicker ref="timeInterval" @change="changeDate"></GroupDatepicker>
                    </div>
                    <div class="col-md-7 p-20 clearfix float-left" style="z-index: 0">
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
                        <div class="col-md-6 float-left text-right">数量合计</div>
                        <div class="col-md-6 float-left" v-if="tableData.sum">{{ tableData.sum }}个</div>
                    </div>
                    <div class="col-md-3 float-left">
                        <div class="col-md-6 float-left  text-right pl-0">合同金额总额</div>
                        <div class="col-md-6 float-left">
                            {{ tableData.total_contract_amount ? tableData.total_contract_amount : 0 }}元
                        </div>
                    </div>
                    <div class="col-md-3 float-left">
                        <div class="col-md-6 float-left  text-right pl-0">项目成本总额</div>
                        <div class="col-md-6 float-left">
                            {{ tableData.total_project_cost ? tableData.total_project_cost : 0 }}元
                        </div>
                    </div>
                </div>

                <div class="col-md-12">
                    <ul class="nav nav-tabs nav-tabs-line" role="tablist" id="taskTab">
                        <li class="nav-item" role="presentation" @click="getReport(0, 0)">
                            <a class="nav-link active" data-toggle="tab" href="#forum-trail-report"
                               aria-controls="forum-base"
                               aria-expanded="true" role="tab">项目报表</a>
                        </li>
                        <li class="nav-item" role="presentation" @click="setReports">
                            <a class="nav-link" data-toggle="tab" href="#forum-trail-add"
                               aria-controls="forum-present"
                               aria-expanded="false" role="tab">项目新增</a>
                        </li>
                        <li class="nav-item" role="presentation" @click="proportionReports">
                            <a class="nav-link" data-toggle="tab" href="#forum-industry-analysis"
                               aria-controls="forum-present"
                               aria-expanded="false" role="tab">项目占比</a>
                        </li>
                    </ul>
                </div>
                <div class="page-content tab-content nav-tabs-animate bg-white">
                    <div class="tab-pane animation-fade active" id="forum-trail-report" role="tabpanel">
                        <div class="clearfix">
                            <div class="col-md-3 float-left pl-0" v-if="departmentsInfo.length > 1">
                                <DropDepartment name="组别" :data="departmentsInfo" @change="selectDepartment"/>
                            </div>
                        </div>
                        <table class="table table-hover is-indent example" data-plugin="animateList" data-animate="fade"
                               data-child="tr"
                               data-selectable="selectable">
                            <tr class="animation-fade"
                                style="animation-fill-mode: backwards; animation-duration: 250ms; animation-delay: 0ms;">
                                <th class="cell-100" scope="col">
                                    <Selectors :options="projectsTypeArr" @change="changeProjectType"
                                               placeholder="请选择项目类型"></Selectors>
                                </th>
                                <th class="cell-100" scope="col">项目名称</th>
                                <th class="cell-100" scope="col">组别</th>
                                <th class="cell-100" scope="col">签约艺人</th>
                                <th class="cell-100" scope="col">合同金额</th>
                                <th class="cell-100" scope="col">项目成本</th>
                                <th class="cell-100" scope="col">项目进度</th>
                                <th class="cell-100" scope="col">负责人</th>
                            </tr>
                            <tbody>
                            <tr v-for="data in tableData.project">
                                <td class="cell-100" scope="col">{{ projectsTypeArr.find(item => item.value ==
                                    data.type) ? projectsTypeArr.find(item => item.value == data.type).name : '' }}
                                </td>
                                <td class="cell-100" scope="col">{{ data.title }}</td>
                                <td class="cell-100" scope="col">{{ data.deparment_name }}</td>
                                <td class="cell-100" scope="col">{{ data.star_name }}</td>
                                <td class="cell-100" scope="col">{{ data.total_contract_money ?
                                    data.total_contract_money : 0 }}元
                                </td>
                                <td class="cell-100" scope="col"></td>
                                <td class="cell-100" scope="col">
                                    <span :style="{color:projectStatusArr.find(item => item.value == data.status).color}">
                                        {{ projectStatusArr.find(item => item.value == data.status).name }}
                                    </span>

                                </td>
                                <td class="cell-100" scope="col">{{ data.principal_name }}</td>
                            </tr>
                            </tbody>
                        </table>
                        <div style="margin: 6rem auto;width: 100px"
                             v-if="tableData.project && tableData.project.length === 0">
                            <img src="https://res.papitube.com/corvus/images/content-none.png" alt=""
                                 style="width: 100%">
                        </div>
                    </div>
                    <div class="tab-pane animation-fade" id="forum-trail-add" role="tabpanel">
                        <div class="clearfix pb-20">
                            <div class="col-md-3 float-left pl-0">
                                <Selectors :options="newTrailSearchArr" @change="changeSelectTime"
                                           placeholder="请选择查询时间"></Selectors>
                            </div>
                            <div class="col-md-3 float-left">
                                <DropDepartment name="组别" :data="departmentsInfo" @change="selectNewDepartment"/>
                            </div>
                            <div class="col-md-3 float-left pl-0">
                                <Selectors :options="starsArr" @change="changeStar" placeholder="请选择目标艺人"></Selectors>
                            </div>
                        </div>
                        <div class="col-md-12">
                            <div ref="trail" style="width: 600px;height:500px;margin: 0 auto"></div>
                        </div>
                    </div>
                    <div class="tab-pane animation-fade" id="forum-industry-analysis" role="tabpanel">
                        <div class="clearfix pb-20">
                            <div class="col-md-3 float-left pl-0">
                                <Selectors :options="starsArr" @change="changeProportionStar"
                                           placeholder="请选择目标艺人"></Selectors>
                            </div>
                            <div class="col-md-3 float-left pl-0" v-if="departmentsInfo.length > 1">
                                <DropDepartment name="组别" :data="departmentsInfo" @change="selectProportionDepartment"/>
                            </div>
                        </div>
                        <div class="col-md-12">
                            <div ref="industry" style="width: 700px;height:500px;margin: 0 auto"></div>
                        </div>
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
        name: "projects",
        data() {
            return {
                tableData: [],
                nowDate: '',
                designationDateNum: 'day',
                projectStatusArr: config.projectStatusArr,
                projectsTypeArr: [
                    {
                        name: '项目类型',
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
                projectType: '',
                departmentId: '',
                departmentsInfo: [
                    {
                        name: '请选择组别',
                        id: '',
                        departments: {
                            data: []
                        }
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
                starsArr: [
                    {
                        name: '目标艺人',
                        value: ''
                    }
                ],
                starId: '',
                departmentNewId: '',
                proportionDepartmentId: '',
                exportParams: {},
            }
        },
        mounted() {
            this.getReport();
            if (this.department.length > 0) {
                this.departmentsInfo = this.departmentsInfo.concat(this._department)
            }
            this.getStars();
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
                this.start_time = start_time;
                this.end_time = end_time;

                let data = {
                    start_time: start_time,
                    end_time: end_time,
                };
                if (this.departmentId) {
                    data.department = this.departmentId
                }
                if (this.projectType) {
                    data.type = this.projectType
                }
                this.exportParams = data;
                this.$refs.timeInterval.setValue(start_time, end_time);
                let _this = this;
                fetch('get', '/reportfrom/projectreport', data).then(function (response) {
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

            changeProportionStar(value) {
                this.proportionStarId = value;
                this.proportionReports();
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
                this.proportionReports(designationDate, this.nowDate);
            },

            changeDate(start, end) {
                this.start_time = start;
                this.end_time = end;
                this.designationDateNum = '';
                this.getReport(start, end);
                this.setReports(start, end);
                this.proportionReports(start, end);
            },

            changeProjectType(value) {
                this.projectType = value;
                this.getReport()
            },

            selectDepartment(value) {
                this.departmentId = value.id;
                this.getReport()
            },

            selectNewDepartment(value) {
                this.departmentNewId = value.id;
                this.setReports()
            },

            selectProportionDepartment(value) {
                this.proportionDepartmentId = value.id;
                this.proportionReports();
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

                if (this.departmentNewId) {
                    data.department = this.departmentNewId
                }

                let trailChart = echarts.init(this.$refs.trail, 'mttop');

                fetch('get', '/reportfrom/newproject', data).then(function (response) {
                    let dataTimeArr = [];
                    let dataAllInfo = [];
                    let dataBusinessInfo = [];
                    let dataMovieInfo = [];
                    let dataZYInfo = [];
                    for (let item in response.data) {
                        dataTimeArr.push(item);
                        if (response.data[item].length === 0) {
                            dataAllInfo.push(0);
                            dataBusinessInfo.push(0);
                            dataMovieInfo.push(0);
                            dataZYInfo.push(0);
                            continue;
                        }
                        for (let i = 0; i < response.data[item].length; i++) {
                            switch (response.data[item][i].type) {
                                case 1:
                                    dataMovieInfo.push(response.data[item][i].total);
                                    break;
                                case 2:
                                    dataZYInfo.push(response.data[item][i].total);
                                    break;
                                case 3:
                                    dataBusinessInfo.push(response.data[item][i].total);
                                    break;
                                case 'sum':
                                    dataAllInfo.push(response.data[item][i].total)
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

            proportionReports() {
                let data = {
                    start_time: this.start_time,
                    end_time: this.end_time
                };

                if (this.proportionStarId) {
                    data.target_star = this.proportionStarId
                }

                if (this.proportionDepartmentId) {
                    data.department = this.proportionDepartmentId
                }

                let proportionChart = echarts.init(this.$refs.industry, 'mttop');

                fetch('get', '/reportfrom/percentageofproject', data).then(function (response) {
                    let firstInfo = [];
                    let secondName = [];
                    let secondInfo = [];
                    for (let i = 0; i < response.type_cat.length; i++) {
                        firstInfo.push(
                            {
                                value: response.type_cat[i].count,
                                name: response.type_cat[i].type
                            }
                        );
                        for (let j = 0; j < response.type_cat[i].list.length; j++) {
                            secondName.push(response.type_cat[i].list[j].value);
                            secondInfo.push({
                                value: response.type_cat[i].list[j].num,
                                name: response.type_cat[i].list[j].industry_name
                            })
                        }
                    }
                    let industryOption = {
                        tooltip: {
                            trigger: 'item',
                            formatter: "{a} <br/>{b}: {c} ({d}%)"
                        },
                        legend: {
                            orient: 'vertical',
                            x: 'left',
                            data: secondName
                        },
                        series: [
                            {
                                name: '项目',
                                type: 'pie',
                                selectedMode: 'single',
                                radius: [0, '30%'],

                                label: {
                                    normal: {
                                        position: 'inner'
                                    }
                                },
                                labelLine: {
                                    normal: {
                                        show: false
                                    }
                                },
                                data: firstInfo
                            },
                            {
                                name: '类别',
                                type: 'pie',
                                radius: ['40%', '55%'],
                                label: {
                                    normal: {
                                        formatter: '{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}{c}  {per|{d}%}  ',
                                        backgroundColor: '#eee',
                                        borderColor: '#aaa',
                                        borderWidth: 1,
                                        borderRadius: 4,
                                        rich: {
                                            a: {
                                                color: '#999',
                                                lineHeight: 22,
                                                align: 'center'
                                            },
                                            hr: {
                                                borderColor: '#aaa',
                                                width: '100%',
                                                borderWidth: 0.5,
                                                height: 0
                                            },
                                            b: {
                                                fontSize: 16,
                                                lineHeight: 33
                                            },
                                            per: {
                                                color: '#eee',
                                                backgroundColor: '#334455',
                                                padding: [2, 4],
                                                borderRadius: 2
                                            }
                                        }
                                    }
                                },
                                data: secondInfo
                            }
                        ]
                    };

                    proportionChart.setOption(industryOption)
                })
            },
        }
    }
</script>

<style>
    .bootstrap-select:not([class*=col-]):not([class*=form-control]):not(.input-group-btn) {
        width: 100px;
    }
</style>