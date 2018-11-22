<template>
<div class="page"> 
    <div class="page-main">
        <div class="page-header">
          <h1 class="page-title">发起审批</h1>
        </div>
    </div>
  
    <div class="page-content container-fluid">
            <div class="page-header">
              <h1 class="page-title">泰洋人事审批</h1>
            </div>
            <div class="row py-5">
                    <div class="col-lg-4" v-for="item in list" :key="item.id">
                        <div class="card" >
                            <div class="card-block" data-toggle="modal" :data-target="'#'+item.dialogid" >
                                <i class="icon md-file float-left" style="font-size:3rem"></i>
                                <p class="my-10">{{item.title}}</p >
                            </div>
                            
                        </div>
                    </div>
            </div>      
    </div>
    <Modal :id="'recruit'" :title="'泰洋招聘申请'">
                                <div class="example">
                                    <div class="col-md-2 text-right float-left">所属部门</div>
                                    <div class="col-md-10 float-left pl-0">
                                            <input type="text" class="form-control" placeholder="所属部门" >
                                    </div>
                                </div>
                                <div class="example">
                                    <div class="col-md-2 text-right float-left">招聘职位</div>
                                    <div class="col-md-10 float-left pl-0">
                                        <input type="text" class="form-control" placeholder="招聘职位(必填)">
                                    </div>
                                </div>
                                <div class="example">
                                    <div class="col-md-2 text-right float-left">招聘人数</div>
                                    <div class="col-md-10 float-left pl-0">
                                        <input type="text" class="form-control" placeholder="招聘人数(必填)" >
                                    </div>
                                </div>
                                <div class="example">
                                    <div class="col-md-2 text-right float-left">现有人数</div>
                                    <div class="col-md-10 float-left pl-0">
                                        <input type="text" class="form-control" placeholder="现有人数(必填)" >
                                    </div>
                                </div>
                                <div class="example">
                                    <div class="col-md-2 text-right float-left">工资标准</div>
                                    <div class="col-md-10 float-left pl-0">
                                        <input type="text" class="form-control" placeholder="工资标准(必填)" >
                                    </div>
                                </div>
                       
                                <div class="example">
                                    <div class="col-md-2 text-right float-left">职责要求</div>
                                    <div class="col-md-10 float-left pl-0">
                                    <textarea class="form-control" name="taskDescription" id="" cols="10"
                                          rows="5" title="" ></textarea>
                                </div>
                                </div>
                                <div class="example">
                                    <div class="col-md-2 text-right float-left">到岗日期</div>
                                    <div class="col-md-10 float-left pl-0">
                                        <Datepicker ></Datepicker>
                                    </div>
                                </div>
                                <div class="example">
                                <div class="col-md-2 text-right float-left">负责人</div>
                                <div class="col-md-5 float-left pl-0">
                                    <InputSelectors :placeholder="'请选择负责人'"
                                                    @change="principalChange"></InputSelectors>
                                </div>
                                </div>
                                <div class="example">
                                    <div class="col-md-2 text-right float-left">参与人</div>
                                    <div class="col-md-10 float-left pl-0">
                                        <AddMember @change="participantChange"></AddMember>
                                    </div>
                                </div>
                            </Modal>
</div>


</template>

<script>
import Modal from "../../components/Modal.vue"
export default {
    name:"initiate",
    data:function(){
        return{
            list:[{
                id:1,
                dialogid:"recruit",
                title:"泰洋招聘申请"
            },{
                id:2,
                dialogid:"register",
                title:"工作室注册审批"
            },{
                id:3,
                dialogid:"quit",
                title:"泰洋离职申请单"
            },{
                id:4,
                dialogid:"recruit",
                title:"泰洋招聘申请"
            },{
                id:5,
                dialogid:"register",
                title:"工作室注册审批"
            },{
                id:6,
                dialogid:"quit",
                title:"泰洋离职申请单"
            }],
        }
    },
    methods:{
            participantChange: function (value) {
                let flagArr = [];
                for (let i = 0; i < value.length; i++) {
                    flagArr.push(value[i].id)
                }
                this.participants = flagArr
            },
            principalChange: function (value) {
                this.principal = value
            }
    },
    components:{
        Modal
    }
}
</script>
<style scoped>
.page{
    position: absolute;
    left:210px;
    top:0;
}
.page-title{
    font-size: 18px;
}
.page-content {
    padding: 0 30px;
}
</style>


