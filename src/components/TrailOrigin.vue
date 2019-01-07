<template>
    <div class="">
        <div class="text-right float-left" :class="[detailPage? 'col-md-3': 'col-md-2',isEdit ? 'line-fiexd-height': '']">{{typeName}}来源</div>
        <div v-if="isEditSituation || alwaysShow">
            <!-- ⬆️判断是否永久显示 -->
            <div :class="detailPage?'col-md-9 float-left font-weight-bold expfee':'col-md-10 float-left pl-0'">
                <!-- ⬆️启用详情页样式 -->
                <div class="float-left col-md-6 px-0" v-if="trailOriginArr.length > 0">
                    <selectors :options="trailOriginArr" @change="changeTrailOriginType" ref='contentType'
                               :placeholder="'请选择线索来源'"></selectors>
                </div>
                <template v-if="trailOrigin === '1' || trailOrigin === '2' || trailOrigin === '3'">
                    <div class="col-md-6 float-left pr-0">
                        <input type="text" class="form-control" title="" v-model="email" ref="focus" @blur="editInput">
                    </div>
                </template>
                <template v-else-if="(trailOrigin === '4' || trailOrigin === '5')">
                    <div class="col-md-6 float-left pr-0">
                        <input-selectors @change="changeTrailOrigin" :placeholder='memberFinder' type="selector"
                                         :propSelectMemberName='trailOriginPerson.name'></input-selectors>
                    </div>
                </template>
            </div>
        </div>
        <div v-if="!isEditSituation  && !(trailOrigin === '4' || trailOrigin === '5')"
             class="float-left font-weight-bold expfee" :class="detailPage? 'col-md-9' : 'col-md-10'">
            <span>{{typeFinder}}</span>
            <span v-if="content"> - {{content.value || content}}</span>
        </div>
        <div v-if="!isEditSituation && (trailOrigin === '4' || trailOrigin === '5')"
             class="float-left font-weight-bold expfee" :class="detailPage? 'col-md-9' : 'col-md-10'">
            <span>{{typeFinder}}  {{memberFinder}}</span>
        </div>
    </div>
</template>

<script>
    import config from '@/assets/js/config'
    import verify from '@/assets/utils/verify.js'
    import {mapState} from 'vuex'

    export default {
        //线索类型   {{什么}}线索  编辑状态   详情页样式  当前线索值    当前线索来源     永久显示
        props: ['trailType', 'typeName', 'isEdit', 'detailPage', 'content', 'contentType', 'alwaysShow'],
        data() {
            return {
                trailOriginArr: config.trailOrigin,     //线索类型列表
                trailOrigin: '',                         //线索类型
                trailOriginPerson: '',                   //人员
                email: '',                               //
                isEditSituation: '',                     //编辑状态
                members: [],
                tempStore: '',
                inputFocus: false
            }
        },
        mounted() {
            if (this.contentType) {
                this.trailOrigin = String(this.contentType)
            }
        },
        computed: {
            typeFinder() {
                if (this.contentType && this.trailOriginArr) {
                    return this.trailOriginArr.find(item => item.value == this.contentType).name
                } else {
                    return ''
                }
            },
            memberFinder() {
                if (this.members && this.tempStore) {
                    return this.members.find(item => item.id == this.tempStore).name
                } else {
                    return ''
                }
            },
            ...mapState([
                'userList'
            ]),
            _userList () {
                return this.userList
            },
            contentAndUserList () {
                return this.members.length > 0 && this.content
            }
        },
        watch: {
            _userList () {
                this.members = this.userList
            },
            // 当userList和content同时存在时执行
            contentAndUserList () {
                if (this.contentAndUserList) {
                    if (this.members.find(item => item.id == this.content)) {
                        this.tempStore = this.content
                    }
                }
            },
            //监听获取当前类型
            contentType(value) {
                this.trailOrigin = String(value)
            },
            //监听获取编辑状态
            isEdit(value) {
                this.isEditSituation = value
                if (value == true) {
                    this.$nextTick(() => {
                        this.$refs.contentType.setValue(this.contentType)           //设置默认值
                        this.email = this.content
                    })
                }

            },
            //线索类型为4时切换博主
            trailType: function () {
                this.trailOriginArr = config.trailOrigin
                if (this.trailType == 4) {
                    this.trailOriginArr = config.trailBloggerOrigin
                }
                this.$nextTick(() => {
                    $('.selectpicker').selectpicker('render');
                    $('.selectpicker').selectpicker('refresh');
                })
            },
            //线索类型提交
            trailOrigin: function () {
                this.$emit('changeTrailOrigin', this.trailOrigin)
            },
            //
            email: function () {
                this.$emit('changeEmail', this.email)
            },
            //
            trailOriginPerson: function () {
                this.$emit('changeTrailOriginPerson', this.trailOriginPerson)
            }
        },
        methods: {
            changeTrailOriginType: function (value) {
                this.trailOriginPerson = ''
                this.email = ''
                this.trailOrigin = value
            },
            //
            changeTrailOrigin: function (value) {
                this.trailOriginPerson = value
            },

            editInput: function () {
                if ((this.trailOrigin == 1 || this.trailOrigin == 2 ) && !verify.email(this.email)) {
                    this.$refs.focus.focus();
                    return
                }

            }
        }
    }
</script>

<style>
    .line-fiexd-height {
        line-height: 34px;
    }
</style>

