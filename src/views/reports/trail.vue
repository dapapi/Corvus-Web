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
                        <div class="col-md-6 float-left">{{ tableData.trail_total }}个</div>
                    </div>
                    <div class="col-md-4 float-left">
                        <div class="col-md-6 float-left text-right">预计订单收入总额</div>
                        <div class="col-md-6 float-left">{{ tableData.fee_total }}元</div>
                    </div>
                </div>

                <div class="col-md-12">
                    <ul class="nav nav-tabs nav-tabs-line" role="tablist" id="taskTab">
                        <li class="nav-item" role="presentation">
                            <a class="nav-link active" data-toggle="tab" href="#forum-trail-report"
                               aria-controls="forum-base"
                               aria-expanded="true" role="tab">线索报表</a>
                        </li>
                        <li class="nav-item" role="presentation">
                            <a class="nav-link" data-toggle="tab" href="#forum-trail-add"
                               aria-controls="forum-present"
                               aria-expanded="false" role="tab">线索新增</a>
                        </li>
                        <li class="nav-item" role="presentation">
                            <a class="nav-link" data-toggle="tab" href="#forum-industry-analysis"
                               aria-controls="forum-present"
                               aria-expanded="false" role="tab">行业分析</a>
                        </li>
                    </ul>
                </div>
                <div class="tab-content nav-tabs-animate bg-white col-md-12 pb-20">
                    <div class="tab-pane animation-fade active" id="forum-trail-report" role="tabpanel">
                        <table class="table table-hover is-indent example" data-plugin="animateList" data-animate="fade"
                               data-child="tr"
                               data-selectable="selectable">
                            <tr class="animation-fade"
                                style="animation-fill-mode: backwards; animation-duration: 250ms; animation-delay: 0ms;">
                                <th class="cell-100" scope="col">
                                    <Selectors :options="trailTypeArr" @change="changeTrailType"></Selectors>
                                </th>
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
                                <td>{{ trailStatusArr.find(item => item.value == data.status).name }}</td>
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
                        <div class="mt-20">
                            <Selectors :options="trailTypeArr" @change="changeTrailType"></Selectors>
                        </div>
                        <div class="col-md-12">
                            <div ref="trail" style="width: 600px;height:500px;margin: 0 auto"></div>
                        </div>
                    </div>
                    <div class="tab-pane animation-fade" id="forum-industry-analysis" role="tabpanel">
                        <div class="mt-20">
                            <Selectors :options="trailTypeArr" @change="changeTrailType"></Selectors>
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
                trailType: '',
                trailStatusArr: config.trailStatusArr,
                priorityArr: config.priorityArr,
            }
        },
        mounted() {
            this.getReport();
        },
        methods: {
            getReport(start_time = null, end_time = null) {
                if (!start_time || !end_time) {
                    start_time = this.getDesignationDate(-7);
                    end_time = this.getNowFormatDate();
                }
                this.setReprots(start_time, end_time);
                let data = {
                    start_time: start_time,
                    end_time: end_time,
                };
                if (this.trailType) {
                    data.type = this.trailType
                }
                this.$refs.timeInterval.setValue(start_time, end_time);
                let _this = this;
                fetch('get', '/reportfrom/trail', data).then(function (response) {
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
                this.getReport(designationDate, this.nowDate)
            },

            changeDate(start, end) {
                this.designationDateNum = '';
                this.getReport(start, end);
            },

            changeTrailType(value) {
                this.trailType = value;
                this.getReport()
            },

            setReprots(start_time, end_time) {
                if (!start_time || !end_time) {
                    start_time = this.getDesignationDate(-7);
                    end_time = this.getNowFormatDate();
                }
                let _this = this;

                let data = {
                    start_time: start_time,
                    end_time: end_time
                };

                let trailChart = echarts.init(_this.$refs.trail, 'mttop');
                let industryChart = echarts.init(_this.$refs.industry, 'mttop');


                fetch('get', '/reportfrom/newtrail', data).then(function (response) {
                    console.log(response);
                    let trailOption = {
                        tooltip: {
                            trigger: 'axis'
                        },
                        legend: {
                            data: ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎']
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
                            data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
                        },
                        yAxis: {
                            type: 'value'
                        },
                        series: [
                            {
                                name: '邮件营销',
                                type: 'line',
                                stack: '总量',
                                data: [120, 132, 101, 134, 90, 230, 210]
                            },
                            {
                                name: '联盟广告',
                                type: 'line',
                                stack: '总量',
                                data: [220, 182, 191, 234, 290, 330, 310]
                            },
                            {
                                name: '视频广告',
                                type: 'line',
                                stack: '总量',
                                data: [150, 232, 201, 154, 190, 330, 410]
                            },
                            {
                                name: '直接访问',
                                type: 'line',
                                stack: '总量',
                                data: [320, 332, 301, 334, 390, 330, 320]
                            },
                            {
                                name: '搜索引擎',
                                type: 'line',
                                stack: '总量',
                                data: [820, 932, 901, 934, 1290, 1330, 1320]
                            }
                        ]
                    };

                    trailChart.setOption(trailOption);
                });

                data = {
                    start_time: start_time,
                    end_time: end_time
                };

                if (this.trailType) {
                    data.type = this.trailType
                }

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