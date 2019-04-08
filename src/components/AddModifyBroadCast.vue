<template>
    <!--
        功能：文本增删改查
        依赖：Flag.vue确认组件
        说明： By 王骁
        本组件可实现基本的弹出框增删改查文本内容
     -->
    <div>
        <div data-plugin="actionBtn"
            
             class="site-action"
             aria-hidden="true"
             data-backdrop="static"
             v-if="pageType === '发布'" @click="openModal">
            <button type="button"
                    class="site-action-toggle btn-raised btn btn-success btn-floating waves-effect waves-classic">
                <i aria-hidden="true"
                   class="front-icon iconfont icon-tianjia1 animation-scale-up" style="font-size:30px"></i>
                <i aria-hidden="true"
                   class="back-icon iconfont icon-tianjia1 animation-scale-up" style="font-size:30px"></i>
            </button>
        </div>
        <div id="addNewBroadcast"
             class="bootbox modal fade modal-simple"
             tabindex="-1"
             role="dialog"
             data-backdrop="static"
             >
            <div class="modal-dialog modal-lg modal-info">
                <div class="modal-content">
                    <div class="modal-body">
                        <button type="button" class="bootbox-close-button close" data-dismiss="modal" aria-hidden="true"
                                style="margin-top: 10px;" @click='clear'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="16" viewBox="0 0 12 16">
                                <path fill-rule="evenodd"
                                      d="M7.48 8l3.75 3.75-1.48 1.48L6 9.48l-3.75 3.75-1.48-1.48L4.52 8 .77 4.25l1.48-1.48L6 6.52l3.75-3.75 1.48 1.48L7.48 8z"/>
                            </svg>
                        </button>
                        <div class="bootbox-body px-10"><h4>{{pageType}}公告</h4></div>
                        <hr class="px-0 mx-0">
                        <div class="form-group row col-sm-12 px-0">
                            <label for="" class="col-sm-2 col-form-label text-center"><strong>标题内容</strong></label>
                            <input type="text" class="form-control col-sm-10" id="" placeholder="输入标题" v-model="title">
                        </div>
                        <div class="form-group row col-sm-12 px-0">
                            <label for="" class="col-sm-2 col-form-label text-center"><strong>公告范围</strong></label>

                            <RangeSelector class="scopeSelector" ref='scopeSelector' :options='departments'
                                           @change='changeDepartments'/>
                            <label for="" class="col-sm-2 col-form-label text-center"
                                   style="z-index:10000"><strong>选择分类</strong></label>
                            <selectors ref='classifySelector' class="col-sm-4 test" :options="classifyArr"
                                       @change="changeClassify" placeholder='请选择类型'></selectors>
                        </div>
                        <div class="my-upload">
                            <label for="my-upload" style="width:100%;height:100%;">
                                <template>
                                    <div class="upload-icon"></div>
                                </template>
                            </label>
                            <input id="my-upload" type="file" @change="uploadFile"
                                   accept="image/png,image/gif,image/jpeg,image/tiff,application/pdf"/>
                        </div>
                        <div class="pl-20 pr-15 mb-15">
                            <vue-ueditor-wrap v-model="msg" :config="myConfig">

                            </vue-ueditor-wrap>
                        </div>

                        <FileUploader class="upload px-15" url="javascript:void()" @changePlus="fileUploaded"
                                      :givenfilename='givenfilename' broadcast='true'>上传附件
                        </FileUploader>
                        <figure style="text-align:center;width:100px" v-for="(item, index) in this.affix" :key="index"
                                class="attachdetail ml-20 float-left">
                            <img src="@/assets/img/attachment.png" alt="" style="width:40px">
                            <p class="pt-10">{{item.title}}</p>
                            <div class="img-control">
                                <div class="icon-control">
                                    <a :href="item.url" target="_blank">
                                        <i class="iconfont icon-liulan"></i>
                                    </a>
                                    <i class="iconfont icon-shanchu1" @click="imgDelete(item.url)"></i>
                                </div>
                            </div>
                        </figure>
                        <div class="col-md-12 float-left px-20">
                            <input type="checkbox" v-model="topFlag">
                            <span class="set-top-flag">&nbsp;&nbsp;置顶</span>
                        </div>
                    </div>

                    <div class="modal-footer">
                        <button data-bb-handler="confirm" type="button" class="btn btn-primary"
                                :disable="isAddButtonDisable" @click="sendNote">发布
                        </button>
                        <button data-bb-handler="cancel" type="button" class="btn btn-default" data-dismiss="modal"
                                @click='clear'>取消
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <Flag typeText="删除" @confirmFlag="confirmDelete"/>
    </div>
</template>

<script>
    import {mapState} from 'vuex'
    import fetch from '@/assets/utils/fetch.js'
    import env from '@/assets/js/env'
    import RangeSelector from '@/components/RangeSelector'
    import * as qiniu from 'qiniu-js'

    export default {
        props: ['notedata', 'givenfilename'],
        components: {
            RangeSelector
        },
        data() {
            return {
                title: '',               //标题内容
                range: [],               //公告范围
                type: '',                //公告类型
                topFlag: 1,              //置顶标示
                text: '',                //富文本代码
                newFlag: true,           //未读标示
                pageType: '发布',         //组件模式
                accessory: '',           //附件内容
                is_accessory: false,     //是否携带附件
                departments: {},         //公告范围
                classifyArr: [],
                scope: [],
                accessory_name: '',
                whoamiid: '',
                creator_id: '',
                affix: [],
                msg: '',
                myConfig: {
                    // 编辑器不自动被内容撑高
                    autoHeightEnabled: false,
                    // 初始容器高度
                    initialFrameHeight: 500,
                    // 初始容器宽度
                    initialFrameWidth: '100%',
                    // 上传文件接口（这个地址是我为了方便各位体验文件上传功能搭建的临时接口，请勿在生产环境使用！！！）
                    // serverUrl:'http://35.201.165.105:8000/controller.php',
                    // UEditor 资源文件的存放路径，如果你使用的是 vue-cli 生成的项目，通常不需要设置该选项，vue-ueditor-wrap 会自动处理常见的情况，如果需要特殊配置，参考下方的常见问题2
                    UEDITOR_HOME_URL: '/UEditor/',
                    zIndex: 2000,
                },
                fileInfo: [],
                isAddButtonDisable: false,
                isShow:false,
            }
        },
        created() {
            // this.getClassify()
        },
        mounted() {
            // this.noteInit()
            // this.modalInit()


        },
        computed: {
            ...mapState([
                'department',
            ]),
            _department() {
                return this.department
            },
        },
        watch: {

            notedata: function (value) {
                let {creator: {data: {id = '-'}}} = value
                this.creator_id = id
                this.noteInit()
            },
            accessory: function () {
                if (this.accessory) {
                    this.is_accessory = true
                } else {
                    this.is_accessory = false
                }
            },
            _department() {
                this.departments = this.department
            }
        },
        methods: {
            openModal(){
                // this.isShow = true
                this.getClassify()
                this.modalInit()
                this.noteInit()
                $('#addNewBroadcast').modal('show')
            },
            clear() {
                this.msg = ''
                this.title = ''
                this.scope = []
                this.type = ''
                this.$refs.scopeSelector.setValue(this.scope)            //设置默认值
                this.$refs.classifySelector.setValue(this.type)
            },
            uploadFile(e) {
                let file = e.target.files[0];
                let putExtra = null;
                let type = file.type.split('/');
                if (type[type.length - 1] === 'vnd.ms-powerpoint') {
                    type[type.length - 1] = 'ppt';
                } else if (type[type.length - 1] === 'vnd.openxmlformats-officedocument.presentationml.presentation') {
                    type[type.length - 1] = 'pptx';
                } else if (type[type.length - 1] === 'vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
                    type[type.length - 1] = 'xlsx';
                } else if (type[type.length - 1] === 'plain') {
                    type[type.length - 1] = 'txt';
                }
                let key = this.guid() + '.' + type[type.length - 1];
                let conf = null;
                let fileSize = file.size;
                let _this = this;
                this.getQiniuAccessToken((token) => {
                    let observable = qiniu.upload(file, key, token, putExtra, conf);
                    let subscription = observable.subscribe(function (res) {
                    }, function (error) {
                        console.log(error)
                    }, function (res) {
                        let fileUrl = env.imgUrl + res.key;
                        let fileName = file.name;
                        _this.msg += `<p><img src=${fileUrl} title=${fileName} style="max-width:100%;"/></p>`
                        _this.fileInfo.push({fileUrl, fileName, fileSize})
                    })
                });
            },

            getQiniuAccessToken: function (callback) {
                $.ajax({
                    type: 'get',
                    url: env.apiUrl + '/services/request_qiniu_token',
                    headers: env.getHeaders(),
                }).done(function (response) {
                    callback(response.data.token)
                })
            },

            guid: function () {
                function s4() {
                    return Math.floor((1 + Math.random()) * 0x10000)
                        .toString(16)
                        .substring(1);
                }

                return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
            },

            getFileExt() {
                this.fileExt = this.fileInfo.name.split('.').pop()
            },
            getClassify() {
                fetch('get', '/announcements/Classify/').then((params) => {
                    this.classifyArr = params.data
                })
            },
            imgDelete(params) {
                this.affix.splice(this.affix.indexOf(this.affix.find(item => item.url === params)), 1)
            },
            //数据初始化
            noteInit() {
                if (this.notedata) {
                    this.pageType = '修改'
                    this.title = this.notedata.title
                    this.range = this.notedata.scope
                    this.type = this.notedata.classify
                    this.topFlag = this.notedata.stick
                    this.text = this.notedata.desc
                }
                this.scope = []
                if (this.range) {
                    for (const key in this.range.data) {
                        this.scope.push(this.range.data[key].department_id)
                    }
                }
                this.$nextTick(() => {
                    this.$refs.scopeSelector.setValue(this.scope)            //设置默认值
                    this.$refs.classifySelector.setValue(this.type)
                })
            },

            //修复富文本编辑器多层弹窗bug
            modalInit() {
                let _this = this
                fetch('get', 'departments_lists').then((params) => {
                    _this.departments = params
                })
                this.$nextTick(() => {
                    $('.select2-container').addClass('col-md-4')
                    $('.select2-container').addClass('px-0')


                })
            },
            //公告范围选择（数组）
            changeDepartments(value) {
                this.scope = value
            },
            //公告类型选择
            changeClassify(value) {
                this.type = Number(value)
            },

            //清空数据并关闭窗口
            confirmDelete() {
                this.title = ''
                this.range = []
                this.type = ''
                this.text = ''
                let currentId = this.$route.params.id
                fetch('delete', '/announcements/' + currentId)
                toastr.success('删除成功')
                $('#addNewBroadcast').modal('hide')
                this.$router.push('/broadcast/')
            },
            // 发送数据
            sendNote() {
                this.isAddButtonDisable = true;
                let topflag = Number(this.topFlag)
                this.sendData = {
                    title: this.title,                       //标题内容
                    scope: this.scope,                       //公告范围
                    classify: this.type,                   //公告类型
                    stick: topflag,                          //置顶标示
                    desc: this.msg,                         //富文本代码
                    is_accessory: this.is_accessory,       //是否带附件
                    // accessory : this.accessory,             //附件内容
                    readflag: 0,
                    affix: this.affix
                }
                //发布模式
                if (this.pageType === '发布') {
                    fetch('post', '/announcements/', this.sendData).then(() => {
                        this.isAddButtonDisable = false;
                        $('#addNewBroadcast').modal('hide');
                        this.$emit('refresh')
                    })
                    //修改模式
                } else {
                    let currentId = this.$route.params.id
                    fetch('put', '/announcements/' + currentId, this.sendData).then(() => {
                        $('#addNewBroadcast').modal('hide');
                        this.title = ''
                        this.range = []
                        this.type = ''
                        this.text = ''
                        this.$emit('refresh')
                        this.clear()
                    })

                }
            },
            //上传
            fileUploaded(value) {
                let attachData = {
                    title: value.fileName,
                    url: value.fileUrl,
                    size: value.fileSize,
                    type: 1
                }
                this.affix.push(attachData)
            }
        }
    }
</script>

<style scoped>
    .my-upload {
        background-image: url('../assets/img/icons.png');
        background-position: 617px 0px;
        position: absolute;
        left: 300px;
        top: 250px;
        width: 20px;
        height: 20px;
        /* background-color: red; */
        z-index: 2000000;
    }

    .my-upload:hover {
        /* position: relative; */
        background-color: #fff5d4;
        border: 1px solid #dcac6c;
        padding: 0;
    }

    #my-upload {
        display: none
    }

    .test {
        z-index: 3001 !important;
    }

    .set-top-flag {
        width: 44px;
        height: 30px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        line-height: 30px;
    }

    .bootbox-close-button {
        margin-left: 20px;
    }

    p {
        /* text-align: center; */
        margin-bottom: 0 !important;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }

</style>
