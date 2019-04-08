<template>
    <div class="modal fade" id="addTask" aria-hidden="true" aria-labelledby="addLabelForm" role="dialog"
         data-backdrop="static" tabindex="-1">
        <div class="modal-dialog modal-simple">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" aria-hidden="true" data-dismiss="modal">
                        <i class="iconfont icon-guanbi" aria-hidden="true"></i>
                    </button>
                    <h4 class="modal-title">{{ this.name ? this.name : '新增任务' }}</h4>
                </div>
                <div class="modal-body">
                    <div class="example">
                        <div class="col-md-2 text-right float-left">关联资源</div>
                        <template v-if="this.resource_title">
                            <div class="col-md-10 float-left pl-0">
                                {{ this.resource_name }} - {{ this.resource_title }}
                            </div>
                        </template>
                        <template v-else>
                            <div class="col-md-10 float-left">
                                <NormalLinkageSelectors ref="linkage" v-if="linkData.length > 0" :myData="linkData"
                                                        :data="linkData" @change="addLinkage"></NormalLinkageSelectors>
                            </div>
                        </template>
                    </div>
                    <div class="example">
                        <div class="col-md-2 text-right float-left require">任务类型</div>
                        <div class="col-md-10 float-left pl-0">
                            <Selectors :options="taskTypeArr" ref="taskType"
                                       changeKey="taskType"
                                       @select="changeTaskType"></Selectors>
                        </div>
                    </div>
                    <div class="example">
                        <div class="col-md-2 text-right float-left require">任务名称</div>
                        <div class="col-md-10 float-left pl-0">
                            <input type="text" class="form-control" placeholder="请输入任务名称" v-model="taskName">
                        </div>
                    </div>
                    <div class="example">
                        <div class="col-md-2 text-right float-left require">负责人</div>
                        <div class="col-md-5 float-left pl-0">
                            <InputSelectors placeholder="请选择负责人" @change="principalChange"></InputSelectors>
                        </div>
                    </div>
                    <div class="example">
                        <div class="col-md-2 text-right float-left">参与人</div>
                        <div class="col-md-10 float-left pl-0">
                            <AddMember @change="participantChange"></AddMember>
                        </div>
                    </div>
                    <div class="example">
                        <div class="col-md-2 text-right float-left pl-0 require">任务优先级</div>
                        <div class="col-md-10 float-left pl-0">
                            <Selectors :options="priorityArr" @change="changeTaskLevel" ref="taskLevel"></Selectors>
                        </div>
                    </div>
                    <div class="example">
                        <div class="col-md-2 text-right float-left require">开始时间</div>
                        <div class="col-md-5 float-left pl-0">
                            <Datepicker ref="startTime" @change="changeStartTime"></Datepicker>
                        </div>
                        <div class="col-md-5 float-left pl-0">
                            <TimeChoice @change="changeStartMinutes" ref="startMinutes"></TimeChoice>
                        </div>
                    </div>
                    <div class="example">
                        <div class="col-md-2 text-right float-left require">截止时间</div>
                        <div class="col-md-5 float-left pl-0">
                            <Datepicker ref="endTime" @change="changeEndTime" :startDate="startTime"></Datepicker>
                        </div>
                        <div class="col-md-5 float-left pl-0">
                            <TimeChoice @change="changeEndMinutes" ref="endMinutes"></TimeChoice>
                        </div>
                    </div>
                    <div class="example">
                        <div class="col-md-2 text-right float-left">任务说明</div>
                        <div class="col-md-10 float-left pl-0">
                            <textarea class="form-control" name="taskDescription" id cols="30" rows="5" title
                                      v-model="taskIntroduce"></textarea>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-sm btn-white btn-pure" data-dismiss="modal">取消</button>
                    <button class="btn btn-primary" type="submit" @click="addTask" :disabled="isAddButtonDisable">确定
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import fetch from "../assets/utils/fetch.js";
    import config from "../assets/js/config";
    import Cookies from 'js-cookie'

    export default {
        name: "AddTask",
        props: ["name", "isChild", "taskFatherId", "resourceable_id", "resource_type", "resource_title", "resource_name", "lock_status"],
        data() {
            return {
                taskType: "",
                startTime: "",
                startMinutes: "00:00",
                endTime: "",
                endMinutes: "00:00",
                tasksInfo: "",
                taskIntroduce: "",
                priorityArr: config.priorityArr,
                taskTypeArr: [],
                linkData: [],
                resourceableId: "", // 资源id
                taskName: "",
                resourceType: "", // 资源type
                user: {}, // 个人信息
                isAddButtonDisable: false,
                typeName: '',
            }
        },
        watch: {
            resourceable_id(newValue) {
                this.resourceableId = newValue;
            },
        },
        mounted() {
            this.resourceType = this.resource_type;
            if (!this.resource_name) {
                this.getLinkData();
            }
            if (this.resourceable_id) {
                this.resourceableId = this.resourceable_id
            }
            this.getTaskType();
            this.user = JSON.parse(Cookies.get('user'));
            this.$store.commit('changeNewPrincipal', {
                name: this.user.nickname,
                id: this.user.id
            });
            $('#addTask').on('hidden.bs.modal', () => {
                this.closeAddTask()
            })
        },
        methods: {
            // 获取关联父资源数据
            getLinkData() {
                fetch('get', '/resources').then(res => {
                    this.linkData = res.data.map((n, i) => {
                        return {
                            name: n.title,
                            id: n.type,
                            value: n.code,
                            child: []
                        }
                    });
                    this.linkData.unshift({
                        name: '暂不关联任何资源',
                        id: '',
                        value: '',
                        child: []
                    });
                    if (this.linkData[0].child.length === 0) {
                        this.getChildLinkData('', 0)
                    }
                })
            },
            // 获取关联子资源数据
            getChildLinkData(url, index) {
                if (url) {
                    let data = {};
                    this.linkCode = url;
                    this.linkIndex = index;

                    let _url = url.substr(0, url.length - 1) + '/related';
                    if (url === 'bloggers') {
                        _url = url + '/all';
                        data.sign_contract_status = 2
                    }
                    fetch('get', _url, data).then(res => {
                        const temp = this.linkData[index];
                        if (res.meta && res.meta.pagination) {
                            this.canLoadMore = true;
                            this.linkTotalPage = res.meta.pagination.total_pages
                        } else {
                            this.canLoadMore = false
                        }
                        temp.child = res.data.map(n => {
                            return {
                                name: n.name || n.nickname || n.title || n.company,
                                id: n.id,
                                value: n.id,
                            }
                        });
                        this.resourceableId = temp.child[0].id;
                        this.$set(this.linkData, index, temp);
                        this.$nextTick(() => {
                            this.$refs.linkage.refresh()
                        })
                    })
                } else {
                    const temp = this.linkData[index];
                    temp.child = [{
                        name: '暂不关联任何资源',
                        id: '',
                        value: '',
                    }];
                    this.resourceableId = temp.child[0].id;
                    this.$set(this.linkData, index, temp);
                    this.$nextTick(() => {
                        this.$refs.linkage.refresh()
                    })
                }
            },
            // 关联子资源滚动到底加载更多
            getMoreChildLinkData() {
                const url = this.linkCode;
                const index = this.linkIndex;
                if (url && this.canLoadMore) {

                    if (this.linkCurrentPage >= this.linkTotalPage) {
                        return
                    }
                    let data = {
                        page: this.linkCurrentPage
                    };
                    if (url === 'bloggers' || url === 'stars') {
                        data.sign_contract_status = 2
                    }
                    fetch('get', `/${url === 'bloggers' ? url + '/all' : url}`, data).then(res => {
                        this.linkCurrentPage = this.linkCurrentPage + 1;
                        const temp = this.linkData[index];
                        const tempArr = res.data.map(n => {
                            return {
                                name: n.name || n.nickname || n.title || n.company,
                                id: n.id,
                                value: n.id,
                            }
                        });
                        temp.child = [...temp.child, ...tempArr];
                        this.resourceableId = temp.child[0].id;
                        this.$set(this.linkData, index, temp);
                        this.$nextTick(() => {
                            this.$refs.linkage.refresh()
                        })
                    })
                }
            },
            // 获取任务类型列表
            getTaskType() {
                fetch('get', '/task_types').then(res => {
                    const data = res.data;
                    this.taskTypeArr = data.map(n => {
                        return {name: n.title, value: n.id}
                    });
                    this.taskTypeArr.unshift({name: '全部', value: ''})
                })
            },
            // 关闭新增任务
            closeAddTask() {
                this.taskName = '';
                this.taskLevel = '';
                this.taskType = '';
                this.startTime = '';
                this.endTime = '';
                this.startMinutes = '';
                this.endMinutes = '';
                this.taskIntroduce = '';
                this.linkData = [];
                this.$refs.taskType.setValue('');
                this.$refs.taskLevel.setValue('');
                this.$refs.startTime.setValue('');
                this.$refs.startMinutes.setValue('0');
                this.$refs.endTime.setValue('');
                this.$refs.endMinutes.setValue('0');
                this.getLinkData();
                this.setDefaultPrincipal();
            },
            // 设置默认负责人
            setDefaultPrincipal() {
                this.$store.commit('changeNewPrincipal', {
                    name: this.user.nickname,
                    id: this.user.id
                });
                this.$store.commit('changeNewParticipantsInfo', [])
            },
            addLinkage: function (type, value, id, index) {
                if (type === 'father') {
                    this.getChildLinkData(value, index);
                    this.resourceType = id
                    
                } else if (type === 'child') {
                    this.resourceableId = value
                }
            },

            changeStartTime(value) {
                this.startTime = value;
            },

            changeStartMinutes(value) {
                this.startMinutes = value;
            },

            changeEndTime(value) {
                this.endTime = value;
            },

            changeEndMinutes(value) {
                this.endMinutes = value;
            },

            changeTaskLevel(value) {
                this.taskLevel = value;
            },

            changeTaskType(changeKey,value, name) {
                this.taskType = value;
                this.taskTypeName = name
            },
            principalChange(value) {
                this.principal = value;
            },

            participantChange(value) {
                let flagArr = [];
                for (let i = 0; i < value.length; i++) {
                    flagArr.push(value[i].id);
                }
                this.participants = flagArr;
            },

            addTask() {
                // 校验
                if (!this.taskName) {
                    toastr.error('请填写任务名称！');
                    return
                }
                if (!this.$store.state.newPrincipalInfo.id) {
                    toastr.error('请选择负责人！');
                    return
                }
                if (!this.taskType) {
                    toastr.error('请选择任务类型！');
                    return
                }
                if (!this.taskLevel) {
                    toastr.error('请选择任务优先级！');
                    return
                }
                if (!this.startTime || !this.endTime) {
                    toastr.error('请选择时间!');
                    return
                }
                if ((this.startTime + " " + this.startMinutes) > (this.endTime + " " + this.endMinutes)) {
                    toastr.error('开始时间不能晚于截止时间');
                    return
                }
                this.isAddButtonDisable = true;
                let participant_ids = [];
                for (let i = 0; i < this.$store.state.newParticipantsInfo.length; i++) {
                    participant_ids.push(this.$store.state.newParticipantsInfo[i].id);
                }

                let data = {
                    type: this.taskType,
                    type_name: this.taskTypeName,
                    title: this.taskName,
                    principal_id: this.$store.state.newPrincipalInfo.id,
                    principal_name: this.$store.state.newPrincipalInfo.name,
                    participant_ids: participant_ids,
                    priority: this.taskLevel,
                    start_at: this.startTime + " " + this.startMinutes,
                    end_at: this.endTime + " " + this.endMinutes,
                    desc: this.taskIntroduce
                };

                if (this.resourceType) {
                    data.resource_type = this.resourceType
                }
                if (this.resourceableId) {
                    data.resourceable_id = this.resourceableId
                }
                if (this.lock_status) {
                    data.lock_status = Number(this.lock_status)
                }

                if (this.isChild) {
                    fetch('post', '/tasks/' + this.taskFatherId + '/subtask', data).then(response => {
                        toastr.success('添加成功');
                        $('#addTask').modal('hide');
                        this.$emit('success', response)
                    })
                } else {
                    // fetch('post', '/tasks', data).then(response => {
                    // 修改新增任务接口
                    fetch('post', '/tasks/store', data).then(response => {
                        this.isAddButtonDisable = false;
                        toastr.success("创建成功");
                        $("#addTask").modal("hide");
                        if (this.resource_name) {
                            this.$emit('success', response)
                        } else {
                            this.$router.push({path: '/tasks/' + response.data.id});
                        }
                    }).catch(() => {
                        this.isAddButtonDisable = false;
                    })
                }
            },
        }
    }
</script>

<style scoped lang="scss">
    .modal-body .example {
        display: flex;
        align-items: center;
    }
</style>