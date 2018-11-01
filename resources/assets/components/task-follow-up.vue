<template>
    <div class="">
        <change-size-input @change="followTask"></change-size-input>

        <div class="nav-tabs-horizontal example" data-plugin="tabs">
            <ul class="nav nav-tabs no-nav-tab-border" role="tablist">
                <li class="nav-item" role="presentation">
                    <a class="nav-link active" data-toggle="tab" href="#all-task-follow-up"
                       aria-controls="exampleTabsOne" role="tab" aria-selected="true">全部</a>
                </li>
                <li class="nav-item" role="presentation">
                    <a class="nav-link" data-toggle="tab" href="#task-follow"
                       aria-controls="exampleTabsTwo" role="tab" aria-selected="false">任务跟进</a>
                </li>
                <li class="nav-item" role="presentation">
                    <a class="nav-link" data-toggle="tab" href="#task-active"
                       aria-controls="exampleTabsThree" role="tab" aria-selected="false">动态</a>
                </li>
            </ul>
            <div class="tab-content pt-20">
                <div class="tab-pane active" id="all-task-follow-up" role="tabpanel">
                    <ul class="task-follow">
                        <li>
                            <div class="change-dot bg-green-500"></div>
                            <div class="follow-item">
                                <div class="change-time">2018-09-78</div>
                                <div class="change-text">张测试 添加博主跟进 博主说明天回复，是否与我们签约。</div>
                            </div>
                        </li>
                        <li>
                            <div class="change-dot bg-green-500"></div>
                            <div class="follow-item">
                                <div class="change-time">2018-09-78</div>
                                <div class="change-text">张测试 添加博主跟进 博主说明天回复，是否与我们签约。</div>
                            </div>
                        </li>
                        <li>
                            <div class="change-dot bg-green-500"></div>
                            <div class="follow-item">
                                <div class="change-time">2018-09-78</div>
                                <div class="change-text">张测试 添加博主跟进 博主说明天回复，是否与我们签约。</div>
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="tab-pane" id="task-follow" role="tabpanel">
                    任务跟进
                </div>
                <div class="tab-pane" id="task-active" role="tabpanel">
                    动态
                </div>
            </div>
        </div>

    </div>

</template>

<script>
    export default {
        name: "task-follow-up",
        data() {
            return {
                showButton: false,
                taskFollowText: '',
            }
        },

        methods: {
            followTask: function () {

            }
        }
    }
</script>

<style scoped>
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