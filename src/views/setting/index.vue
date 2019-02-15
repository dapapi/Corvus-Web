<template>
    <div class="page-main" style="background-color:#f3f4f5">
        <div class="page-header page-header-bordered">
            <h1 class="page-title">项目管理</h1>
        </div>

        <div class="page-content container-fluid">
            <div class="panel col-md-12 clearfix py-5">
                <ul class="nav nav-tabs nav-tabs-line" role="tablist">
                    <li class="nav-item" role="presentation">
                        <a class="nav-link active" 
                            data-toggle="tab" 
                            href="#base-setting" 
                            aria-controls="base-setting" 
                            role="tab" aria-selected="true">
                            基本设置
                        </a>
                    </li>
                    <li class="nav-item" role="presentation">
                        <a class="nav-link" 
                            data-toggle="tab" 
                            href="#personal-info" 
                            aria-controls="personal-info" 
                            role="tab" 
                            aria-selected="false">
                            个人信息
                        </a>
                    </li>
                </ul>

                <div class="tab-content pt-20">
                    <div
                        class="tab-pane animation-fade active" 
                        id="base-setting"
                        role="tabpanel">
                        <div class="title">修改密码</div>
                        <input 
                            type="text"
                            v-model="oldPwd"
                            placeholder="旧密码"
                            class="form-control"
                            style="width: 240px"
                        >
                        <input
                            type="text"
                            v-model="newPwd"
                            placeholder="新密码"
                            style="width: 240px"
                            class="form-control"
                        >
                        <p>密码由数字和字母组合，且长度不少与6</p>
                        <button class="btn btn-primary" @click="savePassword">保存</button>
                    </div>
                    <div 
                        class="tab-pane animation-fade"
                        id="personal-info"
                        role="tabpanel">
                        <div class="title">设置头像</div>
                        <p>选择一张个人正面照片作为头像，企业成员可以更容易认识你</p>
                        <Avatar style="width: 100px; height: 100px;" :imgUrl="'鲍庆鑫'"/>
                        <div class="my-10">
                            <button class="btn btn-primary">选择照片</button>
                        </div>

                        <div class="line"></div>

                        <div class="title">个人资料</div>
                        <div class="example">
                            <div class="float-left" style="width: 40px;">姓名</div>
                            <div class="float-left pl-0">
                                <input 
                                    type="text"
                                    v-model="name"
                                    placeholder="旧密码"
                                    class="form-control"
                                    style="width: 240px"
                                >
                            </div>
                        </div>
                        <div class="example mt-10 mb-20">
                            <div class="float-left" style="width: 40px;"></div>
                            <div class="float-left pl-0">
                                <p>真实姓名，企业成员知道如何称呼你</p>
                            </div>
                        </div>
                         <div class="example" style="margin-top: -20px">
                            <div class="float-left" style="width: 40px;">职位</div>
                            <div class="float-left pl-0">
                                <!-- <selectors placeholder="请选择项目负责人"
                                   :options="jobArr"></selectors> -->
                                <selectors :options="jobArr" :defaultFirst="true" @change="changeJob"></selectors>
                            </div>
                        </div>
                        <div class="example mt-10 mb-20">
                            <div class="float-left" style="width: 40px;"></div>
                            <div class="float-left pl-0">
                                <p>企业成员知道你在做什么</p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import fetch from '@/assets/utils/fetch'

export default {
    name: 'Setting',
    data () {
        return {
            oldPwd: '',
            newPwd: '',
            name: '',
            job: '',
            userId: '',
            jobArr: [] // 职位数组
        }
    },
    mounted () {
        this.getAccountInfo()
        this.getJobList()
    },
    methods: {
        savePassword () { // 保存密码
            if (!this.oldPwd) {
                toastr.error('原密码不能为空！')
                return
            }
            if (!this.newPwd) {
                toastr.error('新密码不能为空！')
                return
            }
            if (this.newPwd.length < 6) {
                toastr.error('新密码长度不能少于6位！')
                return
            }
            const pattern = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]+$/
            if (!pattern.test(this.newPwd)) {
                toastr.error('新密码必须包含数字和字母！')
                return
            }

            if (this.oldPwd === this.newPwd) {
                toastr.error('新密码不能与原来的密码相同！')
                return
            }
            const params = {
                oldpassword: this.oldPwd,
                newpassword: this.newPwd
            }
            fetch('put', `/users/${this.userId}`, params).then(res => {
                toastr.success('密码修改成功')
            })
        },
        // 获取个人信息
        getAccountInfo () {
            fetch('get', '/users/my').then(res => {
                this.userId = res.data.id
            })
        },
        // 获取职位列表
        getJobList () {
            fetch('get', '/departments_jobs').then(res => {
                this.jobArr = res.data.map(n => {
                    return {
                        name: n.name,
                        value: n.id
                    }
                })
            })
        },
        changeJob (value) {
            this.job = value
        }
    }
}
</script>

<style lang="scss" scoped>
.title {
    color: #333;
    font-size: 16px;
    font-weight: 400;
    margin: 5px 0;
}
#base-setting input {
    margin: 10px 0;
}
.tab-pane {
    padding-bottom: 10px;
}
.line {
    border-bottom: 1px solid #D8D8D8;
    margin: 20px 0;
}
.example {
    // width: 240px;
    display: flex;
    align-items: center;
}
</style>
