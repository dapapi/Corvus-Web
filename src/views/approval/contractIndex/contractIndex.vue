<template>
    <div class="page-main" style="background-color:#f3f4f5">
        <div class="page-header page-header-bordered mb-0">
            <h1 class="page-title ml-10">发起审批</h1>
        </div>
    
        <div class="page-content container-fluid ">
            <div class="page-header">
            </div>
            <div class="row py-5">
                <div class="col-lg-4 approval-module" v-for="item in indexData" :key="item.id">
                    <div class="card">
                        <div class="card-block" style="display:flex" @click='pullUp(item)'>
                             <img :src="!item.name.includes('Papi')?'https://res-crm.papitube.com/contract-dark-blue.png':'https://res-crm.papitube.com/contract-blue.png'" alt=""
                                         style="width: 40px;height: 40px;">
                            <!-- <i class="icon float-left" style="font-size:3rem"></i> -->
                            
                            <p class="my-10">&nbsp;&nbsp;{{item.name}}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <ApprovalGreatModule :form-data='formData' singlemode='true' @done='getDataDone' />
        <Loading :is-loading='isLoading' />
    </div>
</template>

<script>
import ApprovalGreatModule from '@/components/ApprovalGreatModule'
import fetch from '@/assets/utils/fetch'
export default {
    
    components:{
        ApprovalGreatModule
    },
    computed:{
        
    },
    data(){
        return{
            indexData:{},
            formData:{},
            isLoading:false,
            
        }
    },
    mounted(){
        this.getFormList()
    },
    methods:{
        getFormList(){
            let _this = this
            fetch('get','/approvals/contracts').then((params) => {
                _this.indexData = params.data
            })
        },
        pullUp(params){
            if(params.form_id !== this.formData.form_id){
                this.isLoading = true
            }else{
                $('#approval-great-module').modal('show')
            }
                this.formData = params

        },
        getDataDone(){
            this.isLoading = false
            $('#approval-great-module').modal('show')

        }
    }
}
</script>

<style scoped>
 .upload-image{
  display: flex;
  width: 500px;
  height: 100px;
}
  .page {
    position: absolute;
    left: 210px;
    top: 0;
  }
  .page-header{
    padding: 20px;
  }
  .puls {
    display: inline-block;
    background-size: 100px;
    width: 100px;
    height: 100px;
    text-align: center;
    line-height: 100px;
    border: 1px dashed #eee;

  }
  .page-content{
    padding: 10px 20
  }
  .puls span {
    font-size: 30px;
  }

  .pearl-icon {
    font-size: 12px;
  }
  .addMember {
    padding-left: 20px;
  }

  .example {
    margin-top: 0;
  }
  .lb{
      padding-left: 0;
  }
  .pearl.done .pearl-icon, .pearl.done .pearl-number{
      margin-left: -30px;
  }
  .approval-module{
    cursor: pointer;
  }
  .card-block:hover{
    /* box-shadow:4px 4px 12px 1px rgba(7,17,27,0.2); */
  }
</style>
