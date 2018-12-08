<template>
    <div class="page-main" style="background-color:#f3f4f5">
        <div class="page-header page-header-bordered">
            <h1 class="page-title">艺人报表</h1>
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
                        <div class="col-md-7 float-left text-right">艺人数量合计</div>
                        <div class="col-md-5 float-left">666个</div>
                    </div>
                    <div class="col-md-3 float-left">
                        <div class="col-md-7 float-left text-right pl-0">预计订单收入总额</div>
                        <div class="col-md-5 float-left">666元</div>
                    </div>
                    <div class="col-md-3 float-left">
                        <div class="col-md-7 float-left text-right">合同金额总额</div>
                        <div class="col-md-5 float-left">666元</div>
                    </div>
                    <div class="col-md-3 float-left">
                        <div class="col-md-7 float-left text-right">花费金额总额</div>
                        <div class="col-md-5 float-left">666元</div>
                    </div>
                </div>

                <div class="col-md-12">
                    <ul class="nav nav-tabs nav-tabs-line" role="tablist" id="taskTab">
                        <li class="nav-item" role="presentation">
                            <a class="nav-link active" data-toggle="tab" href="#forum-business-report"
                               aria-controls="forum-base"
                               aria-expanded="true" role="tab">艺人报表</a>
                        </li>
                        <li class="nav-item" role="presentation">
                            <a class="nav-link" data-toggle="tab" href="#forum-sales-funnel"
                               aria-controls="forum-present"
                               aria-expanded="false" role="tab">艺人分析</a>
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
                                <th class="cell-100" scope="col">
                                    <Selectors style="width: 100px" :options="artistStatusArr"
                                               @change="changeArtistStatus"></Selectors>
                                </th>
                                <template v-if="artistStatus == 1">
                                    <th class="cell-100" scope="col">姓名</th>
                                    <th class="cell-100" scope="col">年龄</th>
                                    <th class="cell-100" scope="col">艺人来源</th>
                                    <th class="cell-100" scope="col">沟通状态</th>
                                    <th class="cell-100" scope="col">录入时间</th>
                                    <th class="cell-100" scope="col">最后跟进时间</th>
                                </template>
                                <template v-else>
                                    <th class="cell-100" scope="col">组别</th>
                                    <th class="cell-100" scope="col">姓名</th>
                                    <th class="cell-100" scope="col">
                                        <Selectors style="width: 100px" :options="trailsNumArr"
                                                   @change="changeTrailsNum"></Selectors>
                                    </th>
                                    <th class="cell-100" scope="col">预计订单收入</th>
                                    <th class="cell-100" scope="col">
                                        <Selectors style="width: 100px" :options="projectsNumArr"
                                                   @changeProjectsNum></Selectors>
                                    </th>
                                    <th class="cell-100" scope="col">合同金额</th>
                                    <th class="cell-100" scope="col">花费金额</th>
                                </template>
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
    import config from '../../assets/js/config'

    export default {
        name: "artists",
        data() {
            return {
                tableData: [],
                nowDate: '',
                designationDateNum: 'day',
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

            changeArtistStatus(value) {
                this.artistStatus = value
            },

            changeTrailsNum(value) {
                this.trailsNum = value
            },

            changeProjectsNum(value) {
                this.projectsNum = value
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

                let myChart = echarts.init(_this.$refs.main, 'mttop');

                fetch('get', '/reportfrom/salesFunnel', data).then(function (response) {
                    console.log(response);
                    let option = {
                        tooltip: {
                            trigger: 'item',
                            formatter: "{a} <br/>{b}: {c} ({d}%)"
                        },
                        legend: {
                            orient: 'vertical',
                            x: 'left',
                            data: ['直达', '营销广告', '搜索引擎', '邮件营销', '联盟广告', '视频广告', '百度', '谷歌', '必应', '其他']
                        },
                        series: [
                            {
                                name: '访问来源',
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
                                data: [
                                    {value: 335, name: '直达', selected: true},
                                    {value: 679, name: '营销广告'},
                                    {value: 1548, name: '搜索引擎'}
                                ]
                            },
                            {
                                name: '访问来源',
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
                                data: [
                                    {value: 335, name: '直达'},
                                    {value: 310, name: '邮件营销'},
                                    {value: 234, name: '联盟广告'},
                                    {value: 135, name: '视频广告'},
                                    {value: 1048, name: '百度'},
                                    {value: 251, name: '谷歌'},
                                    {value: 147, name: '必应'},
                                    {value: 102, name: '其他'}
                                ]
                            }
                        ]
                    };

                    myChart.setOption(option);
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