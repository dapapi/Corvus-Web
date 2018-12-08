<template>
    <div class="page-main" style="background-color:#f3f4f5">
        <div class="page-header page-header-bordered">
            <h1 class="page-title">客户报表</h1>
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

                <div class="col-md-12 clearfix my-10 px-0">
                    <div class="col-md-3 float-left">
                        <div class="col-md-6 float-left text-right">数量合计</div>
                        <div class="col-md-6 float-left">666个</div>
                    </div>
                </div>

                <div class="col-md-12">
                    <ul class="nav nav-tabs nav-tabs-line" role="tablist" id="taskTab">
                        <li class="nav-item" role="presentation">
                            <a class="nav-link active" data-toggle="tab" href="#forum-trail-report"
                               aria-controls="forum-base"
                               aria-expanded="true" role="tab">客户报表</a>
                        </li>
                        <li class="nav-item" role="presentation">
                            <a class="nav-link" data-toggle="tab" href="#forum-trail-add"
                               aria-controls="forum-present"
                               aria-expanded="false" role="tab">客户分析</a>
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
                                    <Selectors :options="clientTypeArr" @change="changeClientType"></Selectors>
                                </th>
                                <th class="cell-100" scope="col">公司名称</th>
                                <th class="cell-100" scope="col">级别</th>
                                <th class="cell-100" scope="col">决策关键人/部门</th>
                                <th class="cell-100" scope="col">联系人</th>
                                <th class="cell-100" scope="col">联系人电话</th>
                                <th class="cell-100" scope="col">负责人</th>
                            </tr>
                            <tbody>
                            <!--<template v-for="(data, type) in tableData.data">-->
                            <!--<tr v-for="(item, index) in data">-->
                            <!--<td v-if="index === 0">-->
                            <!--<template v-if="type === 'industry_data'">品类</template>-->
                            <!--<template v-if="type === 'cooperation_data'">合作</template>-->
                            <!--<template v-if="type === 'resource_type_data'">线索来源</template>-->
                            <!--<template v-if="type === 'priority_data'">优先级</template>-->
                            <!--</td>-->
                            <!--<td v-else></td>-->
                            <!--<td>{{ item.name }}</td>-->
                            <!--<td>{{ item.number }}</td>-->
                            <!--<td>{{ item.ratio }}</td>-->
                            <!--<td>{{ item.ring_ratio_increment }}</td>-->
                            <!--<td>{{ item.annual_increment }}</td>-->
                            <!--<td>{{ item.confirm_number }}</td>-->
                            <!--<td>{{ item.confirm_ratio_increment }}</td>-->
                            <!--<td>{{ item.confirm_annual_increment }}</td>-->
                            <!--<td>{{ item.customer_conversion_rate }}</td>-->
                            <!--</tr>-->
                            <!--</template>-->
                            </tbody>
                        </table>
                    </div>
                    <div class="tab-pane animation-fade" id="forum-trail-add" role="tabpanel">
                        <div class="col-md-12 py-20">
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

    export default {
        name: "clients",
        data() {
            return {
                tableData: [],
                nowDate: '',
                designationDateNum: 'day',
                clientTypeArr: [
                    {
                        name: '客户类型',
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
            }
        },
        mounted() {
            this.getBusinessReport();
        },
        methods: {
            getBusinessReport(start_time = null, end_time = null) {
                if (!start_time || !end_time) {
                    start_time = this.getDesignationDate(-7);
                    end_time = this.getNowFormatDate();
                }
                this.setReprots(start_time, end_time);
                let data = {
                    start_time: start_time,
                    end_time: end_time,
                };
                this.$refs.timeInterval.setValue(start_time, end_time);
                let _this = this;
                fetch('get', '/reportfrom/commercialfunnel', data).then(function (response) {
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
                this.getBusinessReport(designationDate, this.nowDate)
            },

            changeDate(start, end) {
                this.designationDateNum = '';
                this.getBusinessReport(start, end);
            },

            changeClientType(value) {
                this.clientType = value
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

                let clientChart = echarts.init(_this.$refs.client, 'mttop');

                fetch('get', '/reportfrom/salesFunnel', data).then(function (response) {
                    console.log(response);
                    let option = {
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