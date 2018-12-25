<template>
    <!-- Page -->
    <div class="page">

        <NavBack title="添加员工" href="/staff"></NavBack>

        <div class="page-content container-fluid">
            <div class="panel col-md-12 clearfix py-5">
                <ul class="nav nav-tabs nav-tabs-line" role="tablist">
                    <li class="nav-item" role="presentation">
                        <a class="nav-link active" 
                            data-toggle="tab" 
                            href="#unsure" 
                            aria-controls="unsure" 
                            @click="changeStatus(1)"
                            role="tab" aria-selected="true">
                            待确认
                        </a>
                    </li>
                    <li class="nav-item" role="presentation">
                        <a class="nav-link" 
                            data-toggle="tab" 
                            href="#delete" 
                            aria-controls="delete" 
                            role="tab" 
                            @click="changeStatus(2)"
                            aria-selected="false">
                            已删除
                        </a>
                    </li>
                    <li class="nav-item" role="presentation">
                        <a class="nav-link" 
                            data-toggle="tab" 
                            href="#agree" 
                            aria-controls="agree" 
                            role="tab" 
                            @click="changeStatus(3)"
                            aria-selected="false">
                            已同意
                        </a>
                    </li>
                </ul>

                <div class="tab-content pt-20">
                </div>
                <div class="task-follow">
                    <ul class="list-group list-group-dividered list-group-full">
                        <li class="list-group-item" v-for="(item, index) in data" :key="index">
                            <div class="content" style="display: flex; justify-content: start">
                                <img :src="item.icon_url?item.icon_url:require('../../assets/head.jpg')" />
                                <div>
                                    <div>{{item.name}}已发起入职申请，是否同意加入太阳系？</div>
                                    <div class="time">{{item.created_at?item.created_at:''}}</div>
                                </div>
                            </div>
                            <div class="edit">
                                <span>查看</span> 
                                <span v-if="status === 1" @click="agreeApply(item.id, 2)">删除</span> 
                                <span v-if="status === 1" @click="agreeApply(item.id, 3)">同意</span>
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="col-md-1" style="margin: 6rem auto" v-if="data.length === 0">
                    <img src="https://res.papitube.com/corvus/images/content-none.png" alt="" style="width: 100%">
                </div>
            </div>
        </div>

        <!-- <Modal /> -->
    </div>
    <!-- End Page -->
</template>

<script>
import fetch from "../../assets/utils/fetch";

export default {
    name: 'StaffApply',
    data() {
        return {
            status: 1,
            data: []
        };
    },

    mounted() {
        this.getApplyList()
    },

    methods: {
        // 获取申请列表
        getApplyList () {
            fetch('get', `/entry?entry_status=${this.status}`).then(res => {
                this.data = res.data
            })
        },
        // 同意申请
        agreeApply (userId, status) {
            const params = {
               entry_status: status
            } 
            fetch('put', `/audit/${userId}`, params).then(res => {
                toastr.success('已同意！')
                this.getApplyList()
            })
        },
        // 改变显示的列表状态
        changeStatus (index) {
            this.status = index
            this.getApplyList()
        }
    }
};
</script>

<style lang="scss" scoped>
.task-follow {
    padding: 0;
    // margin-top: -20px;
    .list-group {
        margin-bottom: 0;
        .list-group-item {
            padding: 18px 0;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .content {
                img {
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    margin-right: 20px;
                }
                .time {
                    color: #999;
                    font-size: 12px;
                }
            }
            .edit{
                span {
                    cursor: pointer;
                    margin-left: 10px;
                }
            }
            &:last-child {
                border-bottom: none;
            }
        }
    }
}
.page {
    margin-left: 0px!important;
}
</style>
