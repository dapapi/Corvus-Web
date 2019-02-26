<template>

    <div class="modal fade" id="addTrail" aria-hidden="true" aria-labelledby="addLabelForm"
         role="dialog" tabindex="-1" data-backdrop="static">
        <div class="modal-dialog modal-simple">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" aria-hidden="true" data-dismiss="modal">
                        <i class="iconfont icon-guanbi" aria-hidden="true"></i>
                    </button>
                    <h4 class="modal-title">新增销售线索</h4>
                </div>
                <div class="modal-body">
                    <div class="example" v-show="trailType != 4">
                        <div class="col-md-2 text-right float-left">合作类型</div>
                        <div class="col-md-10 float-left pl-0">
                            <selectors :options="cooperationTypeArr" @change="changeCooperationType"></selectors>
                        </div>
                    </div>
                    <div class="example">
                        <div class="col-md-2 text-right float-left require">品牌名称</div>
                        <div class="col-md-10 float-left pl-0">
                            <input type="text" class="form-control" title="" placeholder="请输入品牌名称"
                                   v-model="brandName">
                        </div>
                    </div>
                    <div class="example">
                        <div class="col-md-2 text-right float-left require">公司名称</div>
                        <div class="col-md-10 float-left pl-0">
                            <edit-company @change="changeCompanyName"></edit-company>
                        </div>
                    </div>
                    <div class="example">
                        <div class="col-md-2 text-right float-left require">线索名称</div>
                        <div class="col-md-10 float-left pl-0">
                            <input type="text" class="form-control" title="" placeholder="请输入线索名称"
                                   v-model="trailName">
                        </div>
                    </div>
                    <div class="my-20 trial-origin clearfix">
                        <TrailOrigin class="require" :trailType='trailType'
                                     typeName='线索' alwaysShow='true'
                                     @changeTrailOrigin='changeTrailOrigin'
                                     @changeEmail='changeEmail' submit='true'
                                     @changeTrailOriginPerson='changeTrailOriginPerson'/>
                    </div>
                    <div class="example">
                        <div class="col-md-2 text-right float-left require">行业</div>
                        <div class="col-md-10 float-left pl-0">
                            <selectors ref='industries' :options="industriesArr"
                                       @change="changeIndustry"></selectors>
                        </div>
                    </div>
                    <div class="example">
                        <div class="col-md-2 text-right float-left require">负责人</div>
                        <div class="col-md-10 float-left pl-0">
                            <input-selectors :placeholder="'请选择负责人'"
                                             @change="changePrincipal" otherslot=true
                                             :propSelectMemberName='$store.state.otherSlot.data?$store.state.otherSlot.data.name:currentUser.name'></input-selectors>
                        </div>
                    </div>
                    <div class="example">
                        <div class="col-md-2 text-right float-left require">目标艺人</div>
                        <div class="col-md-10 float-left pl-0">
                            <selectors :options="starsArr" @change="changeTargetStars"
                                       :multiple="true"></selectors>
                        </div>
                    </div>
                    <div class="example">
                        <div class="col-md-2 text-right float-left">推荐艺人</div>
                        <div class="col-md-10 float-left pl-0">
                            <selectors :options="starsArr" @valuelistener="changeRecommendStars"
                                       :multiple="true"></selectors>
                        </div>
                    </div>
                    <div class="example">
                        <div class="col-md-2 text-right float-left require">优先级</div>
                        <div class="col-md-10 float-left pl-0">
                            <selectors :options="priorityArr" @change="changePriority"></selectors>
                        </div>
                    </div>
                    <div class="example">
                        <div class="col-md-2 text-right float-left require">联系人</div>
                        <div class="col-md-10 float-left pl-0">
                            <input type="text" class="form-control" title="" placeholder="请输入联系人"
                                   v-model="trailContact">
                        </div>
                    </div>
                    <div class="example">
                        <div class="col-md-2 text-right float-left require">联系人电话</div>
                        <div class="col-md-10 float-left pl-0">
                            <input type="text" class="form-control" title="" placeholder="请输入联系电话"
                                   v-model="trailContactPhone" @blur='phoneValidate'>
                        </div>
                    </div>
                    <div class="example" v-show="trailType != 4">
                        <div class="col-md-2 text-right float-left">线索状态</div>
                        <div class="col-md-10 float-left pl-0">
                            <selectors :options="trailStatusArr" @change="changeTrailStatus"></selectors>
                        </div>
                    </div>
                    <div class="example">
                        <div class="col-md-2 text-right float-left">销售进展</div>
                        <div class="col-md-10 float-left pl-0">
                            <input type="text" class="form-control" title="" :placeholder="salesProgressText"
                                   disabled>
                        </div>
                    </div>
                    <div class="example">
                        <div class="col-md-2 text-right float-left require">预计订单收入</div>
                        <div class="col-md-5 float-left pl-0 pr-0">
                            <NumberSpinner @change="changeTrailFee" :min="0" :max="1000000000" :precision="2" :value="0"></NumberSpinner>
                        </div>
                        <div class="col-md-3 float-left" v-if="trailType == 4">
                            <div class="checkbox-custom checkbox-primary">
                                <input type="checkbox" id="isLocked" @change="changeCheckbox">
                                <label for="isLocked">锁价</label>
                            </div>
                        </div>
                    </div>
                    <div class="example">
                        <div class="col-md-2 text-right float-left">备注</div>
                        <div class="col-md-10 float-left pl-0">
                            <textarea title="" class="form-control" v-model="trailDesc"></textarea>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-sm btn-white btn-pure" data-dismiss="modal" @click='cleanTempData'>取消
                    </button>
                    <button class="btn btn-primary" type="submit" @click="addTrail">确定</button>
                </div>

            </div>
        </div>
    </div>

</template>

<script>
    import fetch from '../assets/utils/fetch'
    import config from '../assets/js/config'
    import Cookies from 'js-cookie'

    export default {
        name: "addTrail",
        data() {
            return {
                trailName: '',
                trailType: '',
                cooperationTypeArr: config.cooperationTypeArr,
                priorityArr: config.priorityArr,
                brandName: '',
                industriesArr: [],
                trailContact: '',
                trailContactPhone: '',
                trailStatusArr: config.trailStatusArr,
                salesProgressText: '未确定合作',
                trailDesc: '',
                cooperation: '',
                selectCompany: '',
                trailOriginPerson: '',
                trailOrigin: '',
                industry: '',
                trailPrincipal: '',
                targetStars: '',
                recommendStars: '',
                trailStatus: '',
                trailFee: '',
                trailIsLocked: '',
                currentUser: {},
                starsArr: [],
            }
        },

        created() {
            this.getCurrentUser()
        },

        mounted() {
            this.getStars();
        },

        methods: {
            changeCooperationType: function (value) {
                this.cooperation = value
            },

            changeCompanyName: function () {
                let companyInfo = this.$store.state.companyInfo;
                if (companyInfo.value) {
                    this.selectCompany = {
                        id: companyInfo.value
                    }
                } else {
                    this.selectCompany = {
                        grade: companyInfo.grade,
                        company: companyInfo.name
                    }
                }
            },

            changeTrailOriginPerson(value) {
                this.trailOriginPerson = value
            },

            changeEmail(value) {
                this.email = value
            },

            changeTrailOrigin: function (value) {
                this.trailOrigin = value
            },

            changeIndustry: function (value) {
                this.industry = value
            },

            changePriority: function (value) {
                this.priority = value
            },

            changePrincipal: function () {
                if (this.$store.state.otherSlot.data) {
                    this.trailPrincipal = this.$store.state.otherSlot.data.name
                } else {
                    this.trailPrincipal = ''
                }
            },

            changeTargetStars: function (value) {
                for (let i = 0; i < value.length; i++) {
                    let item = value[i].split('-');
                    value[i] = {
                        id: item[1],
                        flag: item[0]
                    };
                }
                this.targetStars = value
            },

            changeRecommendStars: function (value) {
                for (let i = 0; i < value.length; i++) {
                    let item = value[i].split('-');
                    value[i] = {
                        id: item[1],
                        flag: item[0]
                    };
                }
                this.recommendStars = value
            },

            phoneValidate() {
                let phone = this.trailContactPhone
                if (!(/^1(3|4|5|7|8)\d{9}$/.test(phone))) {
                    return false;
                }
            },

            changeTrailStatus: function (value) {
                this.trailStatus = value
            },

            changeTrailFee: function (value) {
                this.trailFee = value
            },

            changeCheckbox: function (e) {
                this.trailIsLocked = Number(e.target.checked)
            },

            cleanTempData() {
                this.trailName = ''
                this.brandName = ''
                this.selectCompany = ''
                this.recommendStars = ''
                this.targetStars = ''
                this.trailContact = ''
                this.trailContactPhone = ''
                this.trailFee = ''
                this.trailDesc = ''
                this.industry = ''
                this.trailType = ''
                this.priority = ''
                this.cooperation = ''
            },

            addTrail: function () {

                let data = {
                    title: this.trailName,
                    brand: this.brandName,
                    client: this.selectCompany,
                    resource_type: this.trailOrigin,
                    recommendations: this.recommendStars,
                    expectations: this.targetStars,
                    contact: {
                        name: this.trailContact,
                        phone: this.trailContactPhone
                    },
                    fee: this.trailFee,
                    desc: this.trailDesc,
                    industry_id: this.industry,
                    type: this.trailType,
                    priority: this.priority,
                    cooperation_type: this.cooperation * 1
                };
                if (!this.$store.state.otherSlot.data && this.currentUser) {
                    data.principal_id = this.currentUser.id
                } else {
                    data.principal_id = this.$store.state.otherSlot.data.id
                }
                if (this.trailType != 4) {
                    data.status = this.trailStatus
                }
                if (this.trailOrigin == 1 || this.trailOrigin == 2 || this.trailOrigin == 3) {
                    data.resource = this.email
                } else if (this.trailOrigin == 4 || this.trailOrigin == 5) {
                    data.resource = this.trailOriginPerson.id
                } else {
                    data.resource = ''
                }
                let organization_id = JSON.parse(Cookies.get('user')).organization_id
                if (organization_id !== 411) {
                    data.lock = this.trailIsLocked
                }
                let _this = this;
                if (this.trailTypeValidate()) {
                    fetch('post', '/trails', data).then(function (response) {
                        $('#addTrail').modal('hide');
                        _this.$router.push({path: '/trails/' + response.data.id})
                        _this.cleanTempData()

                    })
                }
            },

            changeTrailType: function (value) {
                let organization_id = JSON.parse(Cookies.get('user')).organization_id
                if (value == 3) {
                    if (organization_id == 411) {
                        value = 3
                    } else if (organization_id == 412) {
                        value = 4
                    }
                }
                this.trailType = value
                $('#addTrail').modal('show')
                setTimeout(() => {
                    $('.selectpicker').selectpicker('refresh');
                }, 500);
            },

            getCurrentUser() {
                fetch('get', '/users/my').then((response) => {
                    this.currentUser = response.data
                })
            },

            getStars: function () {
                if (this.starsArr.length > 0) {
                    return
                }
                fetch('get', '/starandblogger', {sign_contract_status: 2}).then(response => {
                    for (let i = 0; i < response.data.length; i++) {
                        this.starsArr.push({
                            name: response.data[i].name,
                            value: response.data[i].flag + '-' + response.data[i].id,
                        })
                    }
                })
            },
        }
    }
</script>

<style scoped>

</style>