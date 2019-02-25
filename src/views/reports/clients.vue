<template>
    <div class="page-main" style="background-color:#f3f4f5">
        <div class="page-header page-header-bordered">
            <h1 class="page-title">客户报表</h1>

            <div class="page-header-actions">
                <ImportAndExport class="float-left" :type="'export'" :moduleName="'reportfrom/clientreport'" :params="exportParams">
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
                        <div class="col-md-6 float-left" v-if="tableData.total">{{ tableData.total }}个</div>
                    </div>
                </div>

                <div class="col-md-12">
                    <ul class="nav nav-tabs nav-tabs-line" role="tablist" id="taskTab">
                        <li class="nav-item" role="presentation" @click="getReport(0, 0)">
                            <a class="nav-link active" data-toggle="tab" href="#forum-trail-report"
                               aria-controls="forum-base"
                               aria-expanded="true" role="tab">客户报表</a>
                        </li>
                        <li class="nav-item" role="presentation" @click="setReports">
                            <a class="nav-link" data-toggle="tab" href="#forum-trail-add"
                               aria-controls="forum-present"
                               aria-expanded="false" role="tab">客户分析</a>
                        </li>
                    </ul>
                </div>
                <div class="page-content tab-content nav-tabs-animate bg-white pt-0">
                    <div class="tab-pane animation-fade active" id="forum-trail-report" role="tabpanel">
                        <div class="clearfix col-md-3 pl-0">

                        </div>
                        <table class="table table-hover is-indent example" data-plugin="animateList" data-animate="fade"
                               data-child="tr"
                               data-selectable="selectable">
                            <tr class="animation-fade"
                               >
                                <th class="cell-100" scope="col">公司名称</th>
                                <th class="cell-100" scope="col">级别</th>
                                <th class="cell-100" scope="col">决策关键人/部门</th>
                                <th class="cell-100" scope="col">
                                    <Selectors :options="clientTypeArr" @change="changeClientType"
                                               placeholder="客户类型"></Selectors>
                                </th>
                                <th class="cell-100" scope="col">规模</th>
                                <th class="cell-100" scope="col">客户评级</th>
                                <th class="cell-100" scope="col">负责人</th>
                            </tr>
                            <tbody>
                            <tr v-for="data in tableData.client">
                                <td>{{ data.company }}</td>
                                <td>{{ clientLevelArr.find(item => item.value == data.grade)?clientLevelArr.find(item =>
                                    item.value == data.grade).name : '' }}
                                </td>
                                <td>{{ data.keyman }}</td>
                                <td>{{ clientTypeArr.find(item => item.value == data.type) ? clientTypeArr.find(item =>
                                    item.value == data.type).name : '' }}
                                </td>
                                <td>{{ data.size }}</td>
                                <td>{{ data.client_rating }}</td>
                                <td>{{ data.principal_name }}</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="tab-pane animation-fade pt-30" id="forum-trail-add" role="tabpanel">
                        <div class="clearfix pb-20 col-md-3">
                            <Selectors :options="newTrailSearchArr" @change="changeSelectTime"></Selectors>
                        </div>
                        <div class="col-md-12">
                            <div ref="client" style="width: 600px;height:500px;margin: 0 auto"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import fetch from '../../assets/utils/fetch.js'
    import config from '../../assets/js/config'

    export default {
        name: "clients",
        data() {
            return {
                tableData: [],
                nowDate: '',
                designationDateNum: 'day',
                clientLevelArr: config.clientLevelArr,
                taskLevelArr: config.taskLevelArr,
                clientTypeArr: [
                    {
                        name: '全部',
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
                clientType: '',
                newTrailSearchArr: [
                    {
                        name: '全部',
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
                exportParams: {},
            }
        },
        mounted() {
            this.getReport();
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

                if (this.clientType) {
                    data.type = this.clientType
                }
                this.exportParams = data;
                this.$refs.timeInterval.setValue(start_time, end_time);
                let _this = this;
                fetch('get', '/reportfrom/clientreport', data).then(function (response) {
                    _this.tableData = response
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
                this.setReports(designationDate, this.nowDate)
            },

            changeDate(start, end) {
                this.start_time = start;
                this.end_time = end;
                this.designationDateNum = '';
                this.getReport(start, end);
                this.setReports(start, end);
            },

            changeClientType(value) {
                this.clientType = value;
                this.getReport();
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

            setReports(start_time, end_time) {
                if (!start_time || !end_time) {
                    start_time = this.start_time;
                    end_time = this.start_time;
                }
                let data = {
                    start_time: start_time,
                    end_time: end_time
                };

                let clientChart = echarts.init(this.$refs.client, 'mttop');

                fetch('get', '/reportfrom/clientanalysis', data).then(function (response) {
                    let dataTimeArr = [];
                    let dataAllInfo = [];
                    let dataBusinessInfo = [];
                    let dataMovieInfo = [];
                    let dataZYInfo = [];
                    for (let item in response.clients) {
                        dataTimeArr.push(item);
                        if (response.clients[item].length === 0) {
                            dataAllInfo.push(0);
                            dataBusinessInfo.push(0);
                            dataMovieInfo.push(0);
                            dataZYInfo.push(0);
                            continue;
                        }
                        for (let i = 0; i < response.clients[item].length; i++) {
                            switch (response.clients[item][i].type) {
                                case 1:
                                    dataMovieInfo.push(response.clients[item][i].total);
                                    break;
                                case 2:
                                    dataZYInfo.push(response.clients[item][i].total);
                                    break;
                                case 3:
                                    dataBusinessInfo.push(response.clients[item][i].total);
                                    break;
                                case 'sum':
                                    dataAllInfo.push(response.clients[item][i].total)
                            }
                        }
                    }
                    let option = {
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

                    clientChart.setOption(option);
                });
            }
        }
    }
</script>

<style>
    .bootstrap-select:not([class*=col-]):not([class*=form-control]):not(.input-group-btn) {
        width: 100px;
    }
</style>