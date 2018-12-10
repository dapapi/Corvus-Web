<template>
    <div class="page-main" style="background-color:#f3f4f5">
        <div class="page-header page-header-bordered">
            <h1 class="page-title">商业漏斗分析</h1>
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

                <div class="col-md-12">
                    <ul class="nav nav-tabs nav-tabs-line" role="tablist" id="taskTab">
                        <li class="nav-item" role="presentation">
                            <a class="nav-link active" data-toggle="tab" href="#forum-business-report"
                               aria-controls="forum-base"
                               aria-expanded="true" role="tab">商业报表</a>
                        </li>
                        <li class="nav-item" role="presentation">
                            <a class="nav-link" data-toggle="tab" href="#forum-sales-funnel"
                               aria-controls="forum-present"
                               aria-expanded="false" role="tab">销售漏斗</a>
                        </li>
                    </ul>
                </div>
                <div class="tab-content nav-tabs-animate bg-white col-md-12 pb-20">
                    <div class="tab-pane animation-fade active" id="forum-business-report" role="tabpanel">
                        <table class="table table-hover is-indent example" data-plugin="animateList" data-animate="fade"
                               data-child="tr"
                               data-selectable="selectable">
                            <tr class="animation-fade"
                                style="animation-fill-mode: backwards; animation-duration: 250ms; animation-delay: 0ms;">
                                <th class="cell-100" scope="col"></th>
                                <th class="cell-100" scope="col"></th>
                                <th class="cell-100" scope="col">接触数量</th>
                                <th class="cell-100" scope="col">数量占比</th>
                                <th class="cell-100" scope="col">接触环比增量</th>
                                <th class="cell-100" scope="col">接触同比增量</th>
                                <th class="cell-100" scope="col">达成数量</th>
                                <th class="cell-100" scope="col">达成环比增量</th>
                                <th class="cell-100" scope="col">达成同比增量</th>
                                <th class="cell-100" scope="col">客户转化率</th>
                            </tr>
                            <tbody>
                            <tr>
                                <td></td>
                                <td></td>
                                <td>{{ tableData.sum }}</td>
                                <td>{{ tableData.ratio_sum * 100}}%</td>
                                <td>{{ tableData.ring_ratio_increment_sum }}</td>
                                <td>{{ tableData.annual_ratio_increment_sum }}</td>
                                <td>{{ tableData.confirm_sum }}</td>
                                <td>{{ tableData.confirm_ratio_increment_sum }}</td>
                                <td>{{ tableData.confirm_annual_increment_sum }}</td>
                                <td>{{ tableData.customer_conversion_rate_sum * 100}}%</td>
                            </tr>
                            <template v-for="(data, type) in tableData.data">
                                <tr v-for="(item, index) in data">
                                    <td v-if="index === 0">
                                        <template v-if="type === 'industry_data'">品类</template>
                                        <template v-if="type === 'cooperation_data'">合作</template>
                                        <template v-if="type === 'resource_type_data'">线索来源</template>
                                        <template v-if="type === 'priority_data'">优先级</template>
                                    </td>
                                    <td v-else></td>
                                    <td>{{ item.name }}</td>
                                    <td>{{ item.number }}</td>
                                    <td>{{ item.ratio * 100 }}%</td>
                                    <td>{{ item.ring_ratio_increment }}</td>
                                    <td>{{ item.annual_increment }}</td>
                                    <td>{{ item.confirm_number }}</td>
                                    <td>{{ item.confirm_ratio_increment }}</td>
                                    <td>{{ item.confirm_annual_increment }}</td>
                                    <td>{{ item.customer_conversion_rate * 100 }}%</td>
                                </tr>
                            </template>
                            </tbody>
                        </table>
                    </div>
                    <div class="tab-pane animation-fade" id="forum-sales-funnel" role="tabpanel">
                        <div class="col-md-12 py-20">
                            <div ref="main" style="width: 600px;height:400px;margin: 0 auto"></div>
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
        name: "business",
        data() {
            return {
                tableData: [],
                nowDate: '',
                designationDateNum: 'day',
            }
        },
        mounted() {
            this.getBusinessReport();
        },
        methods: {
            getBusinessReport(start_time = null, end_time = null) {
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
                this.setReports(start_time, end_time);
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
                this.start_time = start;
                this.end_time = end;
                this.designationDateNum = '';
                this.getBusinessReport(start, end);
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

                let myChart = echarts.init(this.$refs.main, 'mttop');


                fetch('get', '/reportfrom/salesFunnel', data).then(function (response) {
                    console.log(response);
                    let data = [
                        {
                            value: 100,
                            name: '接触总量 : ' + response.touch_total,
                        },
                        {
                            value: response.refuse_retention * 100,
                            name: '主动拒绝 : ' + response.refuse_num
                        },
                        {
                            value: response.client_refuse_retention * 100,
                            name: '客户拒绝 : ' + response.client_refuse_num
                        },
                        {
                            value: response.talk_retention * 100,
                            name: '进入谈判 : ' + response.talk_num
                        },
                        {
                            value: response.intention_retention * 100,
                            name: '意向签约 : ' + response.intention_num
                        },
                        {
                            value: response.signed_retention * 100,
                            name: '签约完成 : ' + response.signed_num
                        },
                        {
                            value: response.archive_retention * 100,
                            name: '归档 : ' + response.archive_num
                        },

                    ];
                    let dataName = [
                        '接触总量 : ' + response.touch_total,
                        '主动拒绝 : ' + response.refuse_num,
                        '客户拒绝 : ' + response.client_refuse_num,
                        '进入谈判 : ' + response.talk_num,
                        '意向签约 : ' + response.intention_num,
                        '签约完成 : ' + response.signed_num,
                        '归档 : ' + response.archive_num
                    ];
                    let option = {
                        tooltip: {
                            trigger: 'item',
                            formatter: "{a} <br/>{b} 留存率: {c}%"
                        },
                        legend: {
                            data: dataName
                        },
                        calculable: true,
                        series: [
                            {
                                name: '漏斗图',
                                type: 'funnel',
                                left: '10%',
                                top: 60,
                                bottom: 60,
                                width: '80%',
                                min: 0,
                                max: 100,
                                minSize: '0%',
                                maxSize: '100%',
                                sort: 'descending',
                                gap: 2,
                                label: {
                                    normal: {
                                        show: true,
                                        position: 'inside'
                                    },
                                    emphasis: {
                                        textStyle: {
                                            fontSize: 20
                                        }
                                    }
                                },
                                labelLine: {
                                    normal: {
                                        length: 10,
                                        lineStyle: {
                                            width: 1,
                                            type: 'solid'
                                        }
                                    }
                                },
                                itemStyle: {
                                    normal: {
                                        borderColor: '#fff',
                                        borderWidth: 1
                                    }
                                },
                                data: data
                            }
                        ]
                    };

                    myChart.setOption(option);
                });

            }
        }
    }
</script>

<style scoped>

</style>