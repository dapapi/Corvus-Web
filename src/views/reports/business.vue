<template>
    <div class="page-main" style="background-color:#f3f4f5">
        <div class="page-header page-header-bordered">
            <h1 class="page-title">商业漏斗分析</h1>
        </div>
        <div class="page-content container-fluid">
            <div class="panel ">
                <div class="clearfix">
                    <div class="col-md-5 p-20 clearfix float-left">
                        <GroupDatepicker ref="timeInterval"></GroupDatepicker>
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
                            <!--<tr>-->
                            <!--<td></td>-->
                            <!--<td></td>-->
                            <!--<td></td>-->
                            <!--<td></td>-->
                            <!--<td></td>-->
                            <!--<td></td>-->
                            <!--<td></td>-->
                            <!--<td></td>-->
                            <!--<td></td>-->
                            <!--<td></td>-->
                            <!--</tr>-->
                            <template v-for="(data, type) in tableData">
                                <tr v-for="(item, index) in data">
                                    <td v-if="index === 0">
                                        <template v-if="type === 'industry'">品类</template>
                                        <template v-if="type === 'cooperation'">合作</template>
                                        <template v-if="type === 'resource'">线索来源</template>
                                        <template v-if="type === 'priority'">优先级</template>
                                    </td>
                                    <td v-else></td>
                                    <td>{{ item.name }}</td>
                                    <td>{{ item.number }}</td>
                                    <td>{{ item.ratio }}</td>
                                    <td>{{ item.ring_ratio_increment }}</td>
                                    <td>{{ item.annual_increment }}</td>
                                    <td>{{ item.confirm_number }}</td>
                                    <td>{{ item.confirm_ratio_increment }}</td>
                                    <td>{{ item.confirm_annual_increment }}</td>
                                    <td>{{ item.customer_conversion_rate }}</td>
                                </tr>
                            </template>
                            </tbody>
                        </table>
                    </div>
                    <div class="tab-pane animation-fade" id="forum-sales-funnel" role="tabpanel">
                        图表
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
                sevenDayAgo: '',
                designationDateNum: 'day',
            }
        },
        mounted() {
            this.getBusinessReport();
        },
        methods: {
            getBusinessReport() {
                let start_time = this.getDesignationDate(-7);
                let end_time = this.getNowFormatDate();
                let data = {
                    start_time: start_time,
                    end_time: end_time,
                };
                console.log(this);
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
                let designationDate = date2.getFullYear() + "-" + (date2.getMonth() + 1) + "-" + date2.getDate();
                if (value === 7) {
                    this.sevenDayAgo = designationDate;
                }
                return designationDate;
            },

            selectDate(value) {
                this.designationDateNum = value
            }
        }
    }
</script>

<style scoped>

</style>