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
                                aria-selected="false">
                                已同意
                            </a>
                        </li>
                    </ul>

                    <div class="tab-content pt-20">
                        <div class="tab-pane active" id="unsure" role="tabpanel">
                            <ul class="task-follow">
                                <ul class="list-group list-group-dividered list-group-full">
                                    <li class="list-group-item">
                                        <div class="content" style="display: flex; justify-content: start">
                                            <img :src="require('../../assets/head.jpg')" />
                                            <div>
                                                <div>测试假11已发起入职申请，是否同意加入太阳系？</div>
                                                <div class="time">2018-11-22 10：59</div>
                                            </div>
                                        </div>
                                        <div class="edit"><span>查看</span> <span>删除</span> <span>同意</span></div>
                                    </li>
                                    <li class="list-group-item">
                                        <div class="content" style="display: flex; justify-content: start">
                                            <img :src="require('../../assets/head.jpg')" />
                                            <div>
                                                <div>测试假11已发起入职申请，是否同意加入太阳系？</div>
                                                <div class="time">2018-11-22 10：59</div>
                                            </div>
                                        </div>
                                        <div class="edit"><span>查看</span> <span>删除</span> <span>同意</span></div>
                                    </li>
                                </ul>
                            </ul>
                        </div>
                        <div class="tab-pane" id="delete" role="tabpanel">
                            2
                        </div>
                        <div class="tab-pane" id="agree" role="tabpanel">
                            3
                        </div>
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
        };
    },

  mounted() {

  },

  methods: {
  }
};
</script>

<style lang="scss" scoped>
.task-follow {
    padding: 0;
    margin-top: -20px;
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
    }
}
</style>
