<template>
    <div class="page-main" style="background-color:#f3f4f5">
        <div class="page-header page-header-bordered">
            <h1 class="page-title">我审批的</h1>
        </div>
        <div class="page-content container-fluid">
            <div class="panel">
                <div class="col-md-4  p-20">
                    <div class="input-search">
                        <button type="button" class="input-search-btn"><i class="md-search" aria-hidden="true"></i>
                        </button>
                        <input v-model="keywords" type="text" class="form-control" placeholder="输入编号、类型或申请人"
                               @blur="getList">
                    </div>
                </div>
                <div class="col-md-12">
                    <ul class="nav nav-tabs nav-tabs-line" role="tablist">
                        <li class="nav-item" role="presentation" @click="getList(1)">
                            <a class="nav-link active" data-toggle="tab" href="#forum-project"
                               aria-controls="forum-base"
                               aria-expanded="true" role="tab">待审批</a>
                        </li>
                        <li class="nav-item" role="presentation" @click="getList(2)">
                            <a class="nav-link" data-toggle="tab" href="#forum-project"
                               aria-controls="forum-present"
                               aria-expanded="false" role="tab">已审批</a>
                        </li>
                    </ul>
                    <div class="page-content tab-content nav-tabs-animate bg-white">
                        <div class="tab-pane animation-fade active" id="forum-project" role="tabpanel">
                            <table class="table table-hover is-indent mb-20"
                                   data-plugin="animateList" data-animate="fade"
                                   data-child="tr"
                                   data-selectable="selectable">
                                <tr>
                                    <th class="cell-300" scope="col">审批编号</th>
                                    <th class="cell-300" scope="col">项目名称</th>
                                    <th class="cell-300" scope="col">申请人</th>
                                    <th class="cell-300 position-relative" scope="col">类型
                                        <i class="iconfont icon-gengduo1" aria-hidden="true"
                                           id="taskDropdown" data-toggle="dropdown" aria-expanded="false"></i>
                                        <div class="dropdown-menu" aria-labelledby="taskDropdown" role="menu">
                                            <a class="dropdown-item" role="menuitem" @click="">影视项目立项</a>
                                            <a class="dropdown-item" role="menuitem" @click="">综艺项目立项</a>
                                            <a class="dropdown-item" role="menuitem" @click="">商务项目立项</a>
                                            <a class="dropdown-item" role="menuitem" @click="">papi项目立项</a>
                                        </div>
                                    </th>
                                    <th class="cell-300" scope="col">申请时间</th>
                                    <th class="cell-300" scope="col">审批状态</th>
                                </tr>
                                <tbody>
                                <tr v-for="prpject in projectsInfo">
                                    <td></td>
                                </tr>
                                </tbody>
                            </table>

                            <div v-if="projectsInfo.length === 0" class="col-md-1" style="margin: 6rem auto">
                                <img src="https://res.papitube.com/corvus/images/content-none.png" alt=""
                                     style="width: 100%">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "my",
        data() {
            return {
                keywords: '',
                projectsInfo: [],
            }
        },
        methods: {
            getList(value) {

            }
        }
    }
</script>

<style scoped>

</style>