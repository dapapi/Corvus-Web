<template>
    <div class="page-main" style="background-color:#f3f4f5">
        <div class="page-header page-header-bordered">
            <h1 class="page-title">艺人报表</h1>

            <div class="page-header-actions">
                <ImportAndExport class="float-left" :type="'export'" :moduleName="'reportfrom/starreport'" :params="exportParams">
                    <i class="iconfont icon-daochu font-size-20" aria-hidden="true"></i>
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
                    <div class="col-md-3 float-left px-0">
                        <div class="col-md-7 float-left text-right">艺人数量合计</div>
                        <div class="col-md-5 float-left px-0">{{ tableData.total }}个</div>
                    </div>
                    <div class="col-md-3 float-left px-0">
                        <div class="col-md-7 float-left text-right pl-0">预计订单收入总额</div>
                        <div class="col-md-5 float-left px-0">{{ tableData.total_fee }}元</div>
                    </div>
                    <div class="col-md-3 float-left px-0">
                        <div class="col-md-7 float-left text-right">合同金额总额</div>
                        <div class="col-md-5 float-left px-0">{{ tableData.total_contract_amount }}元</div>
                    </div>
                    <div class="col-md-3 float-left px-0">
                        <div class="col-md-7 float-left text-right">花费金额总额</div>
                        <div class="col-md-5 float-left px-0">{{ tableData.total_expenditure ?
                            tableData.total_expenditure : 0 }}元
                        </div>
                    </div>
                </div>

                <div class="col-md-12">
                    <ul class="nav nav-tabs nav-tabs-line" role="tablist" id="taskTab">
                        <li class="nav-item" role="presentation" @click="getReport(0, 0)">
                            <a class="nav-link active" data-toggle="tab" href="#forum-business-report"
                               aria-controls="forum-base"
                               aria-expanded="true" role="tab">艺人报表</a>
                        </li>
                        <li class="nav-item" role="presentation" @click="setReports">
                            <a class="nav-link" data-toggle="tab" href="#forum-sales-funnel"
                               aria-controls="forum-present"
                               aria-expanded="false" role="tab">艺人分析</a>
                        </li>
                    </ul>
                </div>
                <div class="page-content tab-content nav-tabs-animate bg-white">
                    <div class="tab-pane animation-fade active" id="forum-business-report" role="tabpanel">
                        <div class="clearfix">
                            <div class="col-md-3 float-left pl-0">
                                <Selectors :options="artistStatusArr" @change="changeArtistStatus"
                                           placeholder="请选择艺人状态"></Selectors>
                            </div>
                            <div class="col-md-3 float-left pl-0" v-if="artistStatus != 1">
                                <Selectors :options="trailsNumArr" @change="changeTrailsNum"
                                           placeholder="请选择项目类型"></Selectors>
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
                                    <th class="cell-100" scope="col">姓名</th>
                                    <th class="cell-80" scope="col">年龄</th>
                                    <th class="cell-100" scope="col">艺人来源</th>
                                    <th class="cell-100" scope="col">沟通状态</th>
                                    <th class="cell-100" scope="col">录入时间</th>
                                    <th class="cell-100" scope="col">最后跟进时间</th>
                                </template>
                                <template v-else>
                                    <th class="cell-100" scope="col">组别</th>
                                    <th class="cell-100" scope="col">姓名</th>
                                    <th class="cell-100" scope="col">预计订单收入</th>
                                    <th class="cell-100" scope="col">合同金额</th>
                                    <th class="cell-100" scope="col">花费金额</th>
                                </template>
                            </tr>
                            <tbody>
                            <tr v-for="data in tableData.stars">
                                <template v-if="artistStatus == 1">
                                    <td>{{ data.name }}</td>
                                    <td>{{ data.birthday|jsGetAge }}</td>
                                    <td>
                                        <template v-if="data.source">
                                            {{ artistSourceArr.find(item => item.value == data.source).name }}
                                        </template>
                                    </td>
                                    <td>{{ taiyangCommunicationStatusArr.find(item => item.value ==
                                        data.communication_status) ? taiyangCommunicationStatusArr.find(item =>
                                        item.value ==
                                        data.communication_status).name : '' }}
                                    </td>
                                    <td>{{ data.created_at }}</td>
                                    <td>{{ data.last_update_at}}</td>
                                </template>
                                <template v-else>
                                    <td>{{ data.department_name }}</td>
                                    <td>{{ data.name}}</td>
                                    <td>{{ data.total_fee ? data.total_fee : 0}}元</td>
                                    <td>{{ data.total_contract_money ? data.total_contract_money : 0 }}元</td>
                                    <td>{{ data.total_expenditure_money ? data.total_expenditure_money : 0 }}元</td>
                                </template>

                            </tr>
                            </tbody>
                        </table>
                        <div style="margin: 6rem auto;width: 100px"
                             v-if="tableData.stars && tableData.stars.length === 0">
                            <img src="https://res.papitube.com/corvus/images/content-none.png" alt=""
                                 style="width: 100%">
                        </div>
                    </div>
                    <div class="tab-pane animation-fade" id="forum-sales-funnel" role="tabpanel">
                        <div class="clearfix pb-20">
                            <div class="col-md-3 float-left pl-0">
                                <Selectors :options="starsArr" @change="changeStar" placeholder="请选择目标艺人"></Selectors>
                            </div>
                            <div class="col-md-3 float-left pl-0" v-if="departmentsInfo.length > 1">
                                <DropDepartment name="组别" :data="departmentsInfo" @change="selectAnalysisDepartment"/>
                            </div>
                        </div>
                        <div class="col-md-12">
                            <div ref="main" style="width: 600px;height:400px;margin: 0 auto"></div>
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
        name: "artists",
        data() {
            return {
                tableData: [],
                nowDate: '',
                designationDateNum: 'day',
                taiyangCommunicationStatusArr: config.taiyangCommunicationStatusArr,
                artistSourceArr: config.artistSourceArr,
                artistStatusArr: [
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
                starsArr: [
                    {
                        name: '目标艺人',
                        value: ''
                    }
                ],
                starId: '',
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
                departmentAnalysisId: '',
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
                    data.type = this.trailsNum
                }
                this.exportParams = data;
                this.$refs.timeInterval.setValue(start_time, end_time);
                let _this = this;
                fetch('get', '/reportfrom/starreport', data).then(function (response) {
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

            selectDepartment(value) {
                this.departmentId = value.id;
                this.getReport()
            },

            selectAnalysisDepartment(value) {
                this.departmentAnalysisId = value.id;
                this.setReports()
            },

            changeStar(value) {
                this.starId = value;
                this.designationDateNum = '';
                this.setReports();
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

            changeDate(start, end) {
                this.start_time = start;
                this.end_time = end;
                this.designationDateNum = '';
                this.getReport(start, end);
            },

            changeArtistStatus(value) {
                this.artistStatus = value;
                this.getReport();
            },

            changeTrailsNum(value) {
                this.trailsNum = value;
                this.getReport();
            },

            setReports(start_time, end_time) {
                if (!start_time || !end_time) {
                    start_time = this.start_time;
                    end_time = this.end_time;
                }

                let data = {
                    start_time: start_time,
                    end_time: end_time
                };

                if (this.starId) {
                    data.target_star = this.starId
                }

                if (this.departmentAnalysisId) {
                    data.department = this.departmentAnalysisId
                }

                let myChart = echarts.init(this.$refs.main, 'mttop');

                fetch('get', '/reportfrom/startrailanalysis', data).then(function (response) {
                    let firstInfo = [];
                    let secondName = [];
                    let secondInfo = [];
                    for (let i = 0; i < response.list.length; i++) {
                        firstInfo.push(
                            {
                                value: response.list[i].type_total,
                                name: response.list[i].type_name
                            }
                        );
                        for (let j = 0; j < response.list[i].value.length; j++) {
                            secondName.push(response.list[i].value[j].value);
                            secondInfo.push({
                                value: response.list[i].value[j].p_total,
                                name: response.list[i].value[j].value
                            })
                        }
                    }
                    let option = {
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

                    myChart.setOption(option);
                });


            }
        },
        filters: {
            jsGetAge: function (strBirthday) {
                if (strBirthday) {
                    var returnAge;
                    // 根据生日计算年龄（"1995-09-25"）
                    //以下五行是为了获取出生年月日，如果是从身份证上获取需要稍微改变一下
                    var strBirthdayArr = strBirthday.split("-");
                    var birthYear = strBirthdayArr[0];
                    var birthMonth = strBirthdayArr[1];
                    var birthDay = strBirthdayArr[2];

                    var d = new Date();
                    var nowYear = d.getFullYear();
                    var nowMonth = d.getMonth() + 1;
                    var nowDay = d.getDate();

                    if (nowYear == birthYear) {
                        returnAge = 0;//同年 则为0岁
                    }
                    else {
                        var ageDiff = nowYear - birthYear; //年之差
                        if (ageDiff > 0) {
                            if (nowMonth == birthMonth) {
                                var dayDiff = nowDay - birthDay;//日之差
                                if (dayDiff < 0) {
                                    returnAge = ageDiff - 1;
                                }
                                else {
                                    returnAge = ageDiff;
                                }
                            }
                            else {
                                var monthDiff = nowMonth - birthMonth;//月之差
                                if (monthDiff < 0) {
                                    returnAge = ageDiff - 1;
                                }
                                else {
                                    returnAge = ageDiff;
                                }
                            }
                        }
                        else {
                            returnAge = -1;//返回-1 表示出生日期输入错误 晚于今天
                        }
                    }
                    return returnAge;//返回周岁年龄
                } else {
                    return strBirthday
                }
            },
        }

    }
</script>

<style>
    .bootstrap-select:not([class*=col-]):not([class*=form-control]):not(.input-group-btn) {
        width: 100px;
    }
</style>