<template>
    <div class="">
        <change-size-input @change="followTask"></change-size-input>

        <div class="nav-tabs-horizontal example" data-plugin="tabs">
            <ul class="nav nav-tabs no-nav-tab-border" role="tablist">
                <li class="nav-item" role="presentation">
                    <a class="nav-link" data-toggle="tab" href="#all-TaskFollowUp" style="padding: 5px 10px;"
                       aria-controls="exampleTabsOne" role="tab" aria-selected="true" @click="taskFilter=1">全部</a>
                </li>
                <li class="nav-item" role="presentation">
                    <a class="nav-link active" data-toggle="tab" href="#all-TaskFollowUp" style="padding: 5px 10px;"
                       aria-controls="exampleTabsTwo" role="tab" aria-selected="false" @click="taskFilter=3">
                        {{ followType }}跟进</a>
                </li>
                <li class="nav-item" role="presentation">
                    <a class="nav-link" data-toggle="tab" href="#all-TaskFollowUp" style="padding: 5px 10px;"
                       aria-controls="exampleTabsThree" role="tab" aria-selected="false" @click="taskFilter=2">动态</a>
                </li>
            </ul>
            <div class="tab-content pt-20">
                <div class="tab-pane follow-task active" id="all-TaskFollowUp" ref="isScroll"  role="tabpanel">
                    <ul class="task-follow">
                        <li v-for="(item, index) in taskData" :key="index">
                            <div class="change-dot bg-green-500"></div>
                            <div class="follow-item">
                                <div class="change-time">{{item.created_at}}</div>
                                <div class="change-text">{{item.username}} {{item.content}}</div>
                            </div>
                        </li>
                    </ul>
                    <div v-if="taskData.length === 0" class="col-md-6 text-center">
                        暂无数据
                    </div>
                </div>
            </div>
        </div>

    </div>

</template>

<script>
    import fetch from '@/assets/utils/fetch'

    export default {
        name: "TaskFollowUp",
        props: ['follow-type', 'trailId', 'trailType'],
        data() {
            return {
                showButton: false,
                taskFollowText: '',
                taskFilter: '3',
                taskData: [],
                sHeight:0,
                page:1,
                maxPage:0,
                isLoadingMore:false,

            }
        },
        created() {

        },
        mounted() {
            if(this.trailId){
                this.getTrail()
            }
            
            this.$refs.isScroll.addEventListener('scroll',()=>{
                let sHeight = this.$refs.isScroll.scrollHeight, //元素真实高度
                    cHeight = this.$refs.isScroll.clientHeight, //可视区高度
                    sTop = this.$refs.isScroll.scrollTop //滚动高度
                let loadHeight = sHeight - cHeight -sTop;
                if(loadHeight<=20&&this.maxPage>this.page&&this.isLoadingMore){
                    this.page ++ //增加页数
                    this.getTrail()
                }
            })
        },
        methods: {
            
            getTrail() {
                
                let _this = this
                _this.isLoadingMore = false
                if(_this.page==1){
                    _this.taskData = []
                }
                
                fetch('get', '/' + this.trailType + '/' + this.trailId + '/operate_log?status=' + this.taskFilter+'&page='+this.page).then(function (response) {
                    _this.page = response.meta.pagination.current_page
                    _this.maxPage = response.meta.pagination.total_pages
                    _this.taskData = _this.taskData.concat(response.data)
                    _this.isLoadingMore = true //阻止多次加载
                })
            },
            sendTrail() {
                let data = {
                    content: this.taskFollowText,
                }
                fetch('post', '/' + this.trailType + '/' + this.trailId + '/follow_up', data).then(() => {
                    this.page = 1
                    this.getTrail()
                })
            },
            followTask: function (ref) {
                this.taskFollowText = ref
                this.sendTrail()
            },

        },
        watch: {
            trailId:function(value){
                if(value){
                    this.page = 1
                    this.getTrail(value)
                }
            },
            taskFilter: function (val, oldval) {
                if (val != oldval) {
                    this.page = 1
                    this.getTrail()
                }
            }
        }
    }
</script>

<style scoped>
    .follow-task {
        height: 370px;
        overflow-y: hidden;
        overflow-x: hidden;
    }

    .follow-task:hover {
        overflow-y: auto;
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
        margin-left: 10px;
    }

    .change-text {
        line-height: 40px;
    }

</style>