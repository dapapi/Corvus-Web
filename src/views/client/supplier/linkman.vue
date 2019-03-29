<template>
    <div>
        <div class="animation-fade fixed-button-father" id="forum-linkman" role="tabpanel" style="min-height:300px">
            <table class="table table-hover is-indent example" data-plugin="animateList"
                    data-animate="fade"
                    data-child="tr"
                    data-selectable="selectable">
                <tr class="animation-fade"
                    style="animation-fill-mode: backwards; animation-duration: 250ms; animation-delay: 0ms;">
                    <th class="cell-300" scope="col">联系人</th>
                    <th class="cell-300" scope="col">电话</th>
                    <th class="cell-100" scope="col">操作</th>
                    
                </tr>
                <tbody>
                    <tr v-for="item in linkList" :key="item.id">
                        <td>{{item.key}}</td>
                        <td>{{item.value}}</td>
                        <td>
                            <i class="iconfont icon-bianji2 mr-20" data-toggle="modal"
                    data-target="#addContact" @click="edit(item.id,item.key,item.value)"></i>
                            <i class="iconfont icon-shanchu1" @click="deleteLink(item.id)"></i>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div style="margin: 6rem auto;width: 100px" v-if="linkList.length === 0">
                <img src="https://res.papitube.com/corvus/images/content-none.png" alt=""
                        style="width: 100%">
            </div>
            <pagination :current_page="current_page" :method="getLink"
                        :total_pages="total_pages" :total="total"></pagination>
            <div class="site-action fixed-button" data-plugin="actionBtn" data-toggle="modal"
                    data-target="#addContact">
                <button type="button"
                        class="site-action-toggle btn-raised btn btn-success btn-floating waves-effect waves-classic">
                    <i class="front-icon iconfont icon-tianjia1 animation-scale-up" aria-hidden="true"
                        style="font-size:30px"></i>
                    <i class="back-icon iconfont icon-tianjia1 animation-scale-up" aria-hidden="true"
                        style="font-size:30px"></i>
                </button>
            </div>
        </div>
        <div class="modal fade" id="addContact" aria-hidden="true" aria-labelledby="addLabelForm"
                role="dialog" tabindex="-1" data-backdrop="static">
            <div class="modal-dialog modal-simple">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" aria-hidden="true" data-dismiss="modal">
                            <i class="iconfont icon-guanbi" aria-hidden="true"></i>
                        </button>
                        <h4>添加联系人</h4>
                        <!-- <h4 class="modal-title">{{isEditContact?'新增联系人':'修改联系人'}}</h4> -->
                    </div>
                    <div class="modal-body">

                        <div class="example">
                            <div class="col-md-2 text-right float-left require pl-0">联系人</div>
                            <div class="col-md-10 float-left">
                                <input type="text" v-model="addLinkData.key" class="form-control"
                                    placeholder="请输入供应商联系人姓名">
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left require pl-0">电话</div>
                            <div class="col-md-10 float-left">
                                <input type="text" v-model="addLinkData.value" title="" class="form-control"
                                    placeholder="请输入">
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-sm btn-white btn-pure" data-dismiss="modal" @click="cancel">取消</button>
                        <button class="btn btn-primary" @click="addLink">确定</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import fetch from '../../../assets/utils/fetch.js'
export default {
    data(){
        return {
            total: 0,
            current_page: 0,
            total_pages: 0,
            addLinkData:{
                key:'',
                value:''
            },
            linkList:[],
            editId:'',
        }
    },
    mounted(){
        this.getLink(1)
    },
    methods:{
       getLink:function(page=1){
            let _this = this
            fetch('get', `/contact/${this.$route.params.id}`).then((res) => {
                _this.linkList = res.data
                _this.total = res.meta.pagination.total
                _this.current_page = res.meta.pagination.current_page
                _this.total_pages = res.meta.pagination.total_pages
            })
       },
       //添加和编辑联系人
       addLink:function(){
            let type,url,toast,id
            let _this = this
            this.editId?type='put':type= 'post'
            this.editId?toast= '编辑供应商成功':toast="添加供应商成功"
            //添加--供应商id,编辑--联系人id
            this.editId?id= this.editId:id=this.$route.params.id
            if(!this.addLinkData.key){
                toastr.error('请输入联系人名称')
                return false
            }
            if(!this.addLinkData.value){
                toastr.error('请输入联系人电话')
                return false
            }
            fetch(type, `/contact/${id}`,this.addLinkData).then((res) => {
                $('#addContact').modal('hide');
                toastr.success(toast)
                _this.getLink()
                _this.cancel()
                //清空编辑id
                _this.editId = ''
            })
       },
       //取消添加或编辑供应商
       cancel:function(){
            this.addLinkData={
                key:'',
                value:''
            }
       },
       edit:function(id,key,value){
           this.editId = id
           this.addLinkData = {
                key:key,
                value:value
           }
        },
        deleteLink:function(id){
            let _this = this
            fetch('delete', `/contact/${id}`).then((res) => {
                toastr.success('删除供应商成功')
                _this.getLink(1)
            })
        }
    }
}
</script>

