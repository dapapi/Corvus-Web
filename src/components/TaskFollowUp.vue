<template>
    <div class="">
        <change-size-input @change="followTask"></change-size-input>

        <div class="nav-tabs-horizontal example" data-plugin="tabs">
            <ul class="nav nav-tabs no-nav-tab-border" role="tablist">
                <li class="nav-item" role="presentation">
                    <a class="nav-link" data-toggle="tab" href="#all-TaskFollowUp"
                       aria-controls="exampleTabsOne" role="tab" aria-selected="true" @click="taskFilter=1">全部</a>
                </li>
                <li class="nav-item" role="presentation">
                    <a class="nav-link active" data-toggle="tab" href="#task-follow"
                       aria-controls="exampleTabsTwo" role="tab" aria-selected="false" @click="taskFilter=3">{{
                        followType }}跟进</a>
                </li>
                <li class="nav-item" role="presentation">
                    <a class="nav-link" data-toggle="tab" href="#task-active"
                       aria-controls="exampleTabsThree" role="tab" aria-selected="false" @click="taskFilter=2">动态</a>
                </li>
            </ul>
            <div class="tab-content pt-20">
                <div class="tab-pane follow-task" id="all-TaskFollowUp" role="tabpanel">
                    <ul class="task-follow">
                        <li v-for="(item, index) in taskData" :key="index">
                            <div class="change-dot bg-green-500"></div>
                            <div class="follow-item">
                                <div class="change-time">{{item.created_at}}</div>
                                <div class="change-text">{{item.username}} {{item.content}}</div>
                            </div>
                        </li>
                    </ul>
                    <div v-if="taskData.length === 0" class="col-md-3 text-center">
                        暂无数据
                    </div>
                </div>
                <div class="tab-pane active follow-task" id="task-follow" role="tabpanel">
                    <div class="tab-pane" id="all-TaskFollowUp" role="tabpanel">
                        <ul class="task-follow">
                            <li v-for="(item, index) in taskData" :key="index">
                                <div class="change-dot bg-green-500"></div>
                                <div class="follow-item">
                                    <div class="change-time">{{item.created_at}}</div>
                                    <div class="change-text">{{item.username}} {{item.content}}</div>
                                </div>
                            </li>
                        </ul>
                        <div v-if="taskData.length === 0" class="col-md-3 text-center">
                            暂无数据
                        </div>
                    </div>
                </div>
                <div class="tab-pane follow-task" id="task-active" role="tabpanel">
                    <div class="tab-pane" id="all-TaskFollowUp" role="tabpanel">
                        <ul class="task-follow">
                            <li v-for="(item, index) in taskData" :key="index">
                                <div class="change-dot bg-green-500"></div>
                                <div class="follow-item">
                                    <div class="change-time">{{item.created_at}}</div>
                                    <div class="change-text">{{item.username}} {{item.content}}</div>
                                </div>
                            </li>
                        </ul>
                        <div v-if="taskData.length === 0" class="col-md-3 text-center">
                            暂无数据
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>

</template>

<script>
    import fetch from '@/assets/utils/fetch.js'
    import config from '@/assets/js/config'

    export default {
        name: "TaskFollowUp",
        props: ['follow-type', 'trailId', 'trailType'],
        data() {
            return {
                showButton: false,
                taskFollowText: '',
                taskFilter: '3',
                taskData: []
            }
        },
        created() {

        },
        mounted(){
            this.getTrail()
        },
        methods: {
            getTrail() {
                let _this = this
                fetch('get', '/' + this.trailType + '/' + this.trailId + '/operate_log?status=' + this.taskFilter).then(function (response) {
                    _this.taskData = response.data
                })
            },
            sendTrail() {
                let data = {
                    content: this.taskFollowText,
                }
                fetch('post', '/' + this.trailType + '/' + this.trailId + '/follow_up', data).then(() => {
                    this.getTrail()
                })
            },
            followTask: function (ref) {
                this.taskFollowText = ref
                this.sendTrail()
            }
        },
        watch: {
            taskFilter: function (val, oldval) {
                if (val != oldval) {
                    this.getTrail()
                }
            }
        }
    }
</script>

<style scoped>
    .follow-task{
        height: 240px;
        overflow:auto;
    }
    
    .no-nav-tab-border {
        border: none;
    }

    .change-dot {
        width: 8px;
        height: 8px;
        border-radius: 100%;
        position: absolute;
        top: 6px;
        left: -4px;
    }

    .follow-item {
        padding: 0 10px;
    }

    .task-follow {
        padding: 0;
    }

    .task-follow li {
        list-style: none;
        position: relative;
        padding-bottom: 10px;
        border-left: 1px solid #E0E0E0;
    }

    .change-time {
    }

    .change-text {
        line-height: 40px;
    }

</style>