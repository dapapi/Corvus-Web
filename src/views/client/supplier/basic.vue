<template>
    <div class="animation-fade" id="forum-basic" role="tabpanel">
        <div class="card">
            <div class="card-header card-header-transparent card-header-bordered">
                <div class="float-left font-weight-bold third-title">供应商基本信息</div>
                <div class="float-right pointer-content" v-show="!isEdit">
                    <i class="iconfont icon-bianji2" aria-hidden="true" @click="editBaseInfo"></i>
                </div>
                <div class="float-right" v-show="isEdit">
                    <button class="btn btn-sm btn-white btn-pure" @click="cancelEdit">取消</button>
                    <button class="btn btn-primary" @click="changeSupplier">确定</button>
                </div>
            </div>
            <div class="card-block px-0">
                <div class="card-text py-10 clearfix">
                    <div class="col-md-2 float-left text-right pl-0">供应商名称</div>
                    <div class="col-md-10 float-left font-weight-bold">
                        <EditInput :content="supplierDetails.name" :is-edit="isEdit"
                                    @change="changeSupplierName"></EditInput>
                    </div>
                </div>
                <div class="card-text py-10 clearfix">
                    <div class="col-md-2 float-left text-right pl-0">供应商编码</div>
                    <div class="col-md-10 float-left font-weight-bold">
                        <span>{{supplierDetails.code}}</span>
                    </div>
                </div>
                <div class="card-text py-10 clearfix">
                    <div class="col-md-2 float-left text-right pl-0">开户行信息</div>
                    <div class="col-md-10 float-left font-weight-bold">
                        
                        <div class="row mb-5" v-for="(item, index) in supplierInfo.currency" :key='index'>
                            <div class="col-md-4">
                                <input v-show="isEdit" v-model="item.name" type="text" class="form-control" placeholder="请输入开户行">
                                <span v-show="!isEdit">{{item.name}}</span>
                            </div>
                            <div class="col-md-5 pl-0">
                                <input v-show="isEdit"  v-model="item.account" type="text" class="form-control" placeholder="请输入开户行账号">
                                <span v-show="!isEdit">{{item.account}}</span>
                            </div>
                            <div class="col-md-3 row" :class="index===0?'pr-0':''">
                                <div class="px-0" :class="index===0?'col-md-12':'col-md-11'">
                                    <EditSelector :options="supplierBill" :is-edit="isEdit"
                                        :content="item.coin"
                                        @select="changeBill" :changeKey="`${index}`"></EditSelector>
                                    <!-- <div v-show="isEdit">
                                        <selectors :options="supplierBill" :content="item.currency" @select="changeBill" :changeKey="index"></selectors>
                                    </div>
                                    <span v-show="!isEdit">{{supplierBill.find(n =>n.value == item.currency).name}}</span> -->
                                </div>
                                <div v-if="supplierInfo.currency.length>1&&index>0&&isEdit" class="col-md-1 px-0">
                                    <i class="pl-2 iconfont icon-shanchu1 font-size-20" @click="deleteBill(index)"></i>
                                </div>
                            </div>
                        </div>
                        <span v-show="isEdit" class="mt-10" style="color:#333;display:inline-block;" @click="addBill">添加更多银行信息</span>
                                
                    </div>
                </div>
                <div class="card-text py-10 clearfix">
                    <div class="col-md-2 float-left text-right pl-0">供应商地址</div>
                    <div class="col-md-10 float-left font-weight-bold">
                        <EditInput :content="supplierDetails.address" :is-edit="isEdit"
                                    @change="changeSupplierAddress"></EditInput>
                    </div>
                </div>
                <div class="card-text py-10 clearfix">
                    
                    <div class="col-md-2 float-left text-right pl-0">供应商级别</div>
                    <div class="col-md-10 float-left font-weight-bold region">
                        <EditSelector :options="supplierLevel" :is-edit="isEdit"
                                        :content="supplierDetails.level"
                                        @change="changeSupplierLevel"></EditSelector>
                    </div>
                    
                </div>

                <div class="segmentation-line example"></div>
                <div class="card-text py-5 clearfix row">
                    <div class="col-md-6 px-0 clearfix">
                        <div class="col-md-3 float-left text-right pl-0">录入人</div>
                        <div class="col-md-9 float-left font-weight-bold">
                            {{supplierDetails.create_name}}
                        </div>
                    </div>
                    <div class="col-md-6 px-0 clearfix">
                        <div class="col-md-3 float-left text-right pl-0">录入时间</div>
                        <div class="col-md-6 float-left font-weight-bold">
                            {{supplierDetails.create_time }}
                        </div>
                    </div>
                </div>
                <div class="card-text py-5 clearfix row">
                    <div class="col-md-6 px-0 clearfix">
                        <div class="col-md-3 float-left text-right pl-0">最近更新人</div>
                        <div class="col-md-9 float-left font-weight-bold">
                            {{supplierDetails.operate_name}}
                        </div>
                    </div>
                    <div class="col-md-6 px-0 clearfix">
                        <div class="col-md-3 float-left text-right pl-0">最近更新时间</div>
                        <div class="col-md-9 float-left font-weight-bold">
                            {{supplierDetails.operate_time}}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
//问题  供应商编辑地址不能编辑 供应商编码没有生成 最新更新人字段没有
import {mapActions,mapState} from 'vuex'
import fetch from '../../../assets/utils/fetch.js'
import config from '../../../assets/js/config'
export default {
    data(){
        return {
            isEdit:false,
            changeInfo:{},
            //编辑参数
            supplierInfo:{
                name:'',
                address:'',
                level:0,
                currency:[]


            },
            supplierLevel:config.levelArr,
            supplierBill:config.billArr,//币种
        }
    },
    created(){
       this.getSupplierDetails(this.$route.params.id)
    },
    computed:{
        //获取供应商详情
       ...mapState([
           'supplierDetails'
       ]),
    },
    watch:{
        
        supplierDetails:function(){
            this.setData()
            this.supplierInfo.name = this.supplierDetails.name
            this.supplierInfo.address = this.supplierDetails.address
            this.supplierInfo.level = this.supplierDetails.level
        }
    },
    methods:{
       ...mapActions([
           'getSupplierDetails'
       ]),
        editBaseInfo: function () {
            
            this.isEdit = true;
            this.changeInfo = {};
        },
        cancelEdit: function () {
            this.isEdit = false;
            this.supplierInfo.currency=[]
            this.setData()
            
        },
        //设置开户行数据
        setData:function(){
            for (let i = 0; i < this.supplierDetails.bank.length; i++) {
                let data = {
                    name:'',
                    account:'',
                    coin:0
                }
                this.supplierInfo.currency.push(data)
                this.supplierInfo.currency[i].coin = this.supplierDetails.bank[i].currency
                this.supplierInfo.currency[i].name = this.supplierDetails.bank[i].name
                this.supplierInfo.currency[i].account = this.supplierDetails.bank[i].account
                
            }
        },
        //change供应商名称
        changeSupplierName:function(value){
           this.supplierInfo.name = value
        },
        //change供应商地址
        changeSupplierAddress:function(value){
           this.supplierInfo.address = value
        },
        //change供应商级别
        changeSupplierLevel:function(value){
           this.supplierInfo.level = value
        },
        //change币种
        changeBill:function(key,value){
           this.supplierInfo.currency[key].coin = value
        },
        //添加开户行
        addBill:function(){
            let data = {
                name:'',
                account:'',
                coin:0
            }
            this.supplierInfo.currency.push(data)
        },
        //删除开户行
        deleteBill:function(index){
            this.supplierInfo.currency.splice(index,1)
        },
        //编辑供应商
        changeSupplier:function(){
            
            fetch('put', `/supplier/${this.$route.params.id}`,this.supplierInfo).then((res) => {
                this.isEdit = false
                this.getSupplierDetails(this.$route.params.id)
                toastr.success("编辑供应商成功");
            })
        }

    }
}
</script>

