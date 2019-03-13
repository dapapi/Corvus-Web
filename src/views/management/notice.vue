<template>

    <div class="page-main" style="background-color:#f3f4f5">
        <div class="page-header page-header-bordered">
            <h1 class="page-title"><i class="iconfont icon-zuojiantou pr-5" style="color:#CACACA" @click="back"></i>分类设置</h1>
        </div>
        <div class="page-content container-fluid ">
            <div class="panel col-md-12 clearfix py-5">
            <div class="tab-content  bg-white">
            <table class="table table-hover" data-plugin="selectable" data-selectable="selectable">
                <tr>
                    <th class="cell-300" scope="col">分类名称</th>
                    <th class="cell-300" scope="col">公告数目</th>
                    <th class="cell-300" scope="col">创建日期</th>
                    <th class="cell-300" scope="col">管理</th>
                </tr>
                <tbody style="border-top:1px solid #e3e3e3" >
                <tr v-for="v in ClassificationDate" :key="v.id" class="pointer-content">
                    <td>{{v.name}}</td>
                    <td>{{v.sum}}</td>
                    <td>{{v.created_at}}</td>
                    <td><span data-toggle="modal" data-target="#modifyclassify" @click="editclassify(v.id)"><i class="iconfont icon-bianji2 pr-20"></i></span><span @click="deleteclassify(v.id)"><i class="iconfont icon-shanchu1 pr-20"></i></span></td>
                </tr>
                </tbody>                                
            </table>
             </div>
            </div>
        </div>
         <div class="site-action" data-plugin="actionBtn" data-toggle="modal" data-target="#createField">
            <button type="button"
                    class="site-action-toggle btn-raised btn btn-success btn-floating waves-effect waves-classic">
                <i class="front-icon iconfont icon-tianjia1 animation-scale-up" aria-hidden="true"
                   style="font-size:30px"></i>
                <i class="back-icon iconfont icon-tianjia1 animation-scale-up" aria-hidden="true"
                   style="font-size:30px"></i>
            </button>
        </div>
         <div class="modal fade" id="createField" aria-hidden="true" aria-labelledby="addLabelForm" role="dialog"
             tabindex="-1" data-backdrop="static">
            <div class="modal-dialog modal-simple">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" aria-hidden="true" data-dismiss="modal">
                            <i class="iconfont icon-guanbi" aria-hidden="true"></i>
                        </button>
                        <h4 class="modal-title">添加公告分类</h4>
                    </div>
                    <div class="modal-body">
                        <div class="example label-center">
                            <div class="col-md-2 text-right float-left ">名称</div>
                            <div class="col-md-10 float-left pl-0">
                                <input type="text" class="form-control" placeholder="请输入名称" v-model="classifyName">
                            </div>
                        </div>
                        <div class="example  label-center">
                            <div class="col-md-2 text-right float-left ">描述</div>
                            <div class="col-md-10 float-left pl-0">
                                <textarea name="" rows="5" class="form-control" 
                                        v-model="classifyDec" placeholder="请输入描述"></textarea>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-sm btn-white btn-pure" data-dismiss="modal" @click="cancel">取消</button>
                        <button class="btn btn-primary" type="submit" @click="addclassify">确定</button>
                    </div>
                </div>
            </div>
        </div>
             <div class="modal fade" id="modifyclassify" aria-hidden="true" aria-labelledby="addLabelForm" role="dialog"
             tabindex="-1" data-backdrop="static">
            <div class="modal-dialog modal-simple">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" aria-hidden="true" data-dismiss="modal">
                            <i class="iconfont icon-guanbi" aria-hidden="true"></i>
                        </button>
                        <h4 class="modal-title">修改公告分类</h4>
                    </div>
                    <div class="modal-body">
                        <div class="example label-center">
                            <div class="col-md-2 text-right float-left ">名称</div>
                            <div class="col-md-10 float-left pl-0">
                                <input type="text" class="form-control" :placeholder="classifyDefault" v-model="modifyName">
                            </div>
                        </div>
                        <div class="example  label-center">
                            <div class="col-md-2 text-right float-left ">描述</div>
                            <div class="col-md-10 float-left pl-0">
                                <textarea name="" rows="5" class="form-control" 
                                        v-model="modifyDec" placeholder="请输入描述"></textarea>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-sm btn-white btn-pure" data-dismiss="modal"  @click="cancel">取消</button>
                        <button class="btn btn-primary" type="submit" @click="modifyclassify">确定</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import fetch from '../../assets/utils/fetch.js'
export default {
     data (){
         return{
            ClassificationDate:'',
            classifyName:'',
            classifyDec:'',
            modifyName:'',
            modifyDec:'',
            classifyId:'',
            classifyDefault:''
         }
     },
     mounted(){
        this.getDate() 
     },
     methods: {
         back(){
            this.$router.push({path:'/apps'})
         },
         getDate(){
            let _this = this;
            fetch('get', '/announcements/Classify/').then(function (response) {
                _this.ClassificationDate = response.data;
            });
         },
         deleteclassify(id){
            let _this = this;
            fetch('delete', '/announcements/Classify/'+id).then(function (response) {
                _this.getDate() 
            });
         },
         addclassify(){
            let _this = this;
            let data ={
                name:this.classifyName,
                desc:this.classifyDec
            }
            
            fetch('post', '/announcements/Classify/',data).then(function (response) {
                toastr.success('添加成功');
                $('#createField').modal('hide');
                _this.getDate() 
                _this.cancel() 
            }); 
         },
         editclassify(id){
            this.classifyId = id
            this.ClassificationDate.forEach(item=>{
                if(item.id == id){
                    this.classifyDefault = item.name
                }
            })
         },
        modifyclassify(){
            let _this = this;
            let data ={
                name:this.modifyName,
                desc:this.modifyDec
            }
            fetch('put', '/announcements/Classify/'+this.classifyId,data).then(function (response) {
                toastr.success('修改成功');
                $('#modifyclassify').modal('hide');
                _this.getDate()
                _this.cancel() 
            }); 
        },
        cancel(){
            this.modifyName = '',
            this.modifyDec = '',
            this.classifyDec = '',
            this.classifyName = ''
        }
     }
}
</script>

<style>
    .page-title{
        font-size:18px;
    }
</style>