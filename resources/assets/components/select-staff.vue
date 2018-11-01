<template>
    <div class="assistor">
        <div class="bg-white select-staff">
            <div class="page-nav-tabs">
                <ul class="nav nav-tabs nav-tabs-line" role="tablist">
                    <li class="nav-item col-md-6" role="presentation">
                        <a class="nav-link active" data-toggle="tab" href="#forum-team"
                           aria-controls="forum-base"
                           aria-expanded="true" role="tab"> 团队 </a>
                    </li>
                    <li class="nav-item col-md-6" role="presentation">
                        <a class="nav-link" data-toggle="tab" href="#forum-department"
                           aria-controls="forum-present"
                           aria-expanded="false" role="tab"> 部门 </a>
                    </li>
                </ul>
            </div>

            <div class="page-content tab-content nav-tabs-animate bg-white selector-page-content">
                <div class="tab-pane animation-fade active" id="forum-team" role="tabpanel">
                    <div class="input-search example">
                        <button type="submit" class="input-search-btn"><i class="icon md-search" aria-hidden="true"></i>
                        </button>
                        <input type="text" class="form-control" name="" placeholder="搜索成员..." v-model="searchKeyWord">
                    </div>

                    <div class="person-content">
                        <div class="team-title">
                            <span class="team-title-icon" @click="closeTeam">
                                <i class="icon md-caret-down" v-show="teamShow"></i>
                                <i class="icon md-caret-right" v-show="!teamShow"></i>
                            </span>
                            <span>
                                 <i class="icon md-account pl-2"></i>
                            泰洋系（{{ this.normalUsers.length }}人)
                            </span>
                            <span class="team-add-all pl-2" @click="selectAllMember">
                                <i class="icon md-plus"></i>
                            </span>
                        </div>
                        <div v-show="teamShow">
                            <div class="users" v-for="user in this.normalUsers"
                                 v-show="user.name.indexOf(searchKeyWord) > -1"
                                 @click="selectMember(user.id)">
                                <a class="avatar" href="javascript:void(0)">
                                    <img src="https://res.papitube.com/no-icon.png" alt="...">
                                </a>
                                <span class="pl-1">{{ user.name }}</span>
                                <span class="float-right" v-show="selectIdArr.indexOf(user.id) > -1">
                                    <i class="icon md-check"></i>
                                </span>
                            </div>
                        </div>
                    </div>

                </div>
                <div class="tab-pane animation-fade" id="forum-department" role="tabpanel">
                    <div v-for="department in departmentUsers">
                        <departments-item :data="department" :select="selectIdArr"></departments-item>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
    import config from '../js/config'

    export default {
        props: [],
        data() {
            return {
                normalUsers: {},
                departmentUsers: {},
                teamShow: true,
                selectIdArr: [],
                searchKeyWord: '',
            }
        },
        mounted() {

            let self = this;
            $.ajax({
                url: config.apiUrl + '/users',
                headers: config.getHeaders(),
                type: 'get',
                statusCode: config.getStatusCode()
            }).done(function (response) {
                self.normalUsers = response.data
            });

            $.ajax({
                url: config.apiUrl + '/departments',
                headers: config.getHeaders(),
                type: 'get',
                statusCode: config.getStatusCode()
            }).done(function (response) {
                self.departmentUsers = response.data
            })

        },
        methods: {
            closeTeam: function () {
                this.teamShow = !this.teamShow
            },

            selectAllMember: function () {
                for (let i = 0; i < this.normalUsers.length; i++) {
                    let userId = this.normalUsers[i].id;
                    let index = this.selectIdArr.indexOf(userId);
                    if (index === -1) {
                        this.selectIdArr.push(userId)
                    }
                }
            },

            selectMember: function (userId) {
                let index = this.selectIdArr.indexOf(userId);
                if (index > -1) {
                    this.selectIdArr.splice(index, 1)
                } else {
                    this.selectIdArr.push(userId)
                }
            }
        }
    }
</script>

<style>

    .nav-item {
        padding: 0 !important;
        text-align: center;
        word-break: keep-all;
    }

    button:focus {
        outline: none;
    }

    .team-title-icon {
        width: 4px;
        display: inline-block;
    }

    .team-add-all {
        display: none;
    }

    .team-title:hover .team-add-all {
        display: inline-block;
    }

    .users {
        padding-top: 15px;
        line-height: 30px;
        padding-left: 15px;
        cursor: pointer;
    }

    .users:hover {
        color: #0000F0;
    }

    .users .avatar {
        width: 30px;
        height: 30px;
        overflow: hidden;
    }

    .selector-page-content {
        padding: 0 30px;
        height: 355px;
        overflow-x: hidden;
        overflow-y: auto;
        position: relative;
        top: 45px;
    }

    .assistor {
        position: absolute;
        height: 400px;
        width: 20rem;
        -moz-user-select: none;
        -webkit-user-select: none;
        -ms-user-select: none;
        user-select: none;
        border: 1px solid #f2f2f2;
        overflow: hidden;
        z-index: 10;
    }

    .selector-page-content::-webkit-scrollbar {
        width: 6px;
        height: 12px;
        -webkit-appearance: none;
    }

    .selector-page-content::-webkit-scrollbar-thumb {
        background: #ddd;
        border-radius: 10px;
    }

    .selector-page-content::-webkit-scrollbar-track-piece {
        background: #eee;
        border-radius: 3px;
    }

    .page-nav-tabs {
        position: absolute;
        z-index: 2;
        top: 0;
        background: white;
        width: 100%;
    }

    .select-staff {
        height: 400px;
    }

    .team-title {
        font-weight: 400;
    }

</style>

