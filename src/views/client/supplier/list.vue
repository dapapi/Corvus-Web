<template> 
    <div class="page-content container-fluid">
        <div class="panel col-md-12 py-5">
            <div class="clearfix">
                <div class="col-md-3 example float-left">
                    <input type="text" class="form-control" v-model="keyword" placeholder="请输入供应商名称" @blur="getSupplierList(1)" >
                </div>
                <div class="col-md-3 example float-left">
                    <selectors :options="supplierUserList" @change="changeUser" :multiple="true" :placeholder="'请选择录入人'"/>
                </div>
                <div class="col-md-3 example float-left">
                    <selectors :options="supplierLevel" @change="changeSupplierLevel" :placeholder="'请选择供应商级别'" ></selectors>
                </div>
                <div class="col-md-3 example float-left">
                    <!-- <button type="button" class="btn btn-default waves-effect waves-classic float-right"
                            data-toggle="modal" data-target="#customizeContent"
                            data-placement="right" title="">
                        自定义筛选
                    </button> -->
                </div>
            </div>
            <div class="col-md-12">
                <table class="table table-hover is-indent mb-20" data-plugin="animateList" data-animate="fade"
                        data-child="tr"
                        data-selectable="selectable">
                    <tr class="animation-fade"
                        style="animation-fill-mode: backwards; animation-duration: 250ms; animation-delay: 0ms;">
                        <th class="cell-300" scope="col">供应商名称</th>
                        <th class="cell-300" scope="col">级别</th>
                        <th class="cell-300" scope="col">录入人</th>
                        <th class="cell-300" scope="col">录入时间</th>
                        <th class="cell-300" scope="col">跟进时间</th>
                    </tr>
                    <tbody>
                        <tr v-for="(item,index) in supplierList" :key="index" @click="toDetails(item.id)">
                            <td>{{item.name}}</td>
                            <td><span v-if="item.level&&item.level<3">{{supplierLevel.find(level => level.value ===item.level).name}}</span></td>
                            <td>{{item.create_name}}</td>
                            <td>{{item.create_time}}</td>
                            <td>{{item.operate_time}}</td>
                        </tr>
                    </tbody>
                </table>
                <div style="margin: 6rem auto;width: 100px" v-if="supplierList.length === 0">
                    <img src="https://res.papitube.com/corvus/images/content-none.png" alt="" style="width: 100%">
                </div>
                <pagination :current_page="current_page" :method="getSupplierList" :total_pages="total_pages"
                            :total="total"></pagination>
                <div class="site-action" data-plugin="actionBtn" data-toggle="modal" data-target="#addSupplier">
                    <button type="button"
                            class="site-action-toggle btn-raised btn btn-success btn-floating waves-effect waves-classic">
                        <i class="front-icon iconfont icon-tianjia1 animation-scale-up" aria-hidden="true" style="font-size:30px"></i>
                        <i class="back-icon iconfont icon-tianjia1 animation-scale-up" aria-hidden="true" style="font-size:30px"></i>
                    </button>
                </div>
            </div>
            <!--添加供应商弹框-->
            <div class="modal fade" id="addSupplier" aria-hidden="true" aria-labelledby="addLabelForm"
                role="dialog" tabindex="-1" data-backdrop="static">
                <div class="modal-dialog modal-simple">
                    <div class="modal-content" style="width:103%">
                        <div class="modal-header">
                            <button type="button" class="close" aria-hidden="true" data-dismiss="modal">
                                <i class="iconfont icon-guanbi" aria-hidden="true"></i>
                            </button>
                            <h4 class="modal-title">新增供应商</h4>
                        </div>
                        <div class="modal-body">
                            <div class="example">
                                <div class="col-md-2 text-right float-left require">名称</div>
                                <div class="col-md-10 float-left pl-0">
                                    <input type="text" class="form-control" v-model="addSupplierData.name" placeholder="请选择供应商名称(账户名称)">
                                </div>
                            </div>
                            <div class="example">
                                <div class="col-md-2 text-right float-left require">开户行信息</div>
                                <div class="col-md-10 float-left pl-0 region">
                                    <div class="row mb-5" v-for="(item, index) in addSupplierData.currency" :key='index'>
                                        <div class="col-md-4">
                                            <input type="text" v-model="item.name" class="form-control" placeholder="请输入开户行">
                                        </div>
                                        <div class="col-md-5 pl-0">
                                            <input type="text" v-model="item.account" class="form-control" placeholder="请输入开户行账号">
                                        </div>
                                        <div class="col-md-3 row" :class="index===0?'pr-0':''">
                                            <div class="px-0" :class="index===0?'col-md-12':'col-md-11'">
                                                <selectors  :options="supplierBill" @select="changeBill" :changeKey="`${index}`"></selectors>
                                            </div>
                                            <div v-if="addSupplierData.currency.length>1&&index>0" class="col-md-1 px-0">
                                                <i class="pl-2 iconfont icon-shanchu1 font-size-20" @click="deleteBill(index)"></i>
                                            </div>
                                        </div>
                                    </div>
                                    <span class="mt-10" style="color:#333;display:inline-block;" @click="addBill">添加更多银行信息</span>
                                </div>
                            </div>
                            <div class="example">
                                <div class="col-md-2 text-right float-left require">供应商地址</div>
                                <div class="col-md-10 float-left pl-0">
                                    <input type="text" v-model="addSupplierData.address" class="form-control" title="" placeholder="请输入">
                                </div>
                            </div>
                            <div class="example">
                                <div class="col-md-2 text-right float-left require">供应商级别</div>
                                <div class="col-md-10 float-left pl-0">
                                    <selectors ref="clientLevel" :options="supplierLevel"
                                        @change="changeSupplierLevel"></selectors>
                                </div>
                            </div>
                            <div class="example">
                                <div class="col-md-2 text-right float-left require">联系人</div>
                                <div class="col-md-10 float-left pl-0">
                                    <input type="text" v-model="addSupplierData.contact" class="form-control" placeholder="请输入供应商联系人姓名">
                                </div>
                            </div>
                            <div class="example">
                                <div class="col-md-2 text-right float-left require">电话</div>
                                <div class="col-md-10 float-left pl-0">
                                    <input type="text" v-model="addSupplierData.phone" class="form-control" title="" placeholder="请输入">
                                </div>
                            </div>
                            
                            <div class="modal-footer">
                                <button class="btn btn-sm btn-white btn-pure" data-dismiss="modal" @click='cancel'>取消</button>
                                <button class="btn btn-primary" type="submit" @click="addSupplier">确定</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
</template>
<script>
import fetch from '../../../assets/utils/fetch.js'
import config from '../../../assets/js/config'
import {mapState} from 'vuex'
export default {
    data(){
        return {
            total: 0,
            current_page: 0,
            total_pages: 0,
            supplierLevel:config.levelArr,
            supplierBill:config.billArr,//币种
            supplierList:[],//供应商列表

            //搜索字段
            keyword:'',//供应商名称
            create_name:[],//录入人
            level:0,//供应商级别

            //添加供应商字段
            addSupplierData:{
                name:'',
                address:'',
                level:0,
                contact:'',
                phone:'',
                currency:[
                    {     
                        name:'',
                        account:'',
                        coin:0
                    }
                ]

            }

        }
    },
    mounted(){
        this.getSupplierList()
    },
    computed:{
        //获取录入人列表
        ...mapState([
                'userList'
            ]),
        supplierUserList:function(){
            const list = this.userList.map(n =>{
                return {
                    value: n.id + '',
                    name: n.name,
                }
            })
            return list
        }
    },
    methods:{
        //获取供应商列表
        getSupplierList:function(page=1){
            let _this = this
            fetch('get', `/supplier?page=${page}&keyword=${this.keyword}&create_name=${this.create_name}&level=${this.level}`).then((res) => {
                _this.supplierList = res.data
                _this.total = res.meta.pagination.total
                _this.current_page = res.meta.pagination.current_page
                _this.total_pages = res.meta.pagination.total_pages
            })
        },
        toDetails:function(id){
           this.$router.push({
               path:`/supplier/details/${id}`
           })
        },
        changeUser:function(value){
           this.create_name = value
           this.getSupplierList(1)
        },
        changeSupplierLevel:function(value){
            this.addSupplierData.level = value
            this.getSupplierList(1)
        },
        //改变币种
        changeBill:function(key,value){
            this.addSupplierData.currency[key].coin = value
        },
        //添加银行开户信息
        addBill:function(){
            let data = {
                name:'',
                account:'',
                coin:0
            }
            this.addSupplierData.currency.push(data)
            
        },
        //删除银行账户信息
        deleteBill:function(index){
            this.addSupplierData.currency.splice(index,1)
        },
        //取消添加供应商
        cancel:function(){
            this.addSupplierData = {
                name:'',
                address:'',
                level:0,
                contact:'',
                phone:'',
                currency:[
                    {     
                        name:'',
                        account:'',
                        coin:0
                    }
                ]

            }
        },
        //添加供应商
        addSupplier:function(){
            if(!this.addSupplierData.name){
                toastr.error('请输入供应商名称')
                return false

            }
            if(this.addSupplierData.currency.length<1||!this.addSupplierData.currency[0].name||!this.addSupplierData.currency[0].account||!this.addSupplierData.currency[0].coin){
                toastr.error('至少添加一个开户行信息')
                return false

            }
            if(!this.addSupplierData.address){
                toastr.error('请输入供应商地址')
                return false

            }
            if(!this.addSupplierData.level){
                toastr.error('请选择供应商级别')
                return false

            }
            if(!this.addSupplierData.contact){
                toastr.error('请输入供应商联系人')
                return false

            }
            if(!this.addSupplierData.phone){
                toastr.error('请输入供应商联系人电话')
                return false

            }
            let _this = this
            fetch('post', '/supplier',this.addSupplierData).then((res) => {
                $('#addSupplier').modal('hide')
                // console.log(res)
                _this.toDetails(res)
                
            })
        }
    }
}
</script>

