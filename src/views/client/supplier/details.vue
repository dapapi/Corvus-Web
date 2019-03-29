<template>
    <div class="page-content container-fluid">
        <div class="panel col-md-12">
            <div class="card-block">
                <h4>{{supplierDetails.name}}</h4>
            </div>
        </div>
        <div style="display: flex; justify-content: space-between; align-items: flex-start">
             <div class="panel" style="width: calc(66% - 15px);float:left;margin-right:30px">
                <div class="col-md-12">
                    <ul class="nav nav-tabs nav-tabs-line" role="tablist">
                        <li class="nav-item" role="presentation" v-for="(item,index) in link" :key="index">
                            <router-link :to={path:item.link,params:{id:supplierId}} class="nav-link" :class="item.link == path?'active':''" data-toggle="tab"
                                aria-controls="forum-present"
                                aria-expanded="false" role="tab">{{item.name}}</router-link>
                        </li>
                    </ul>
                </div>
                <div class="tab-content nav-tabs-animate bg-white col-md-12">
                    <router-view/>
                </div>
            </div>
            <!--跟进-->
            <div class="panel" style="width: calc(34% - 15px);">
                <div class="col-md-12">
                    <div class="card col-md-12">
                        <div class="card-header card-header-transparent card-header-bordered p-10"
                                style="font-size: 16px;font-weight: bold;">
                            <div>供应商跟进</div>
                        </div>
                        <div class="card-block">
                            <div class="col-md-12 pl-0">
                                <TaskFollowUp :follow-type="'供应商'" :trailId='supplierId'
                                                trailType='supplier'></TaskFollowUp>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
     
</template>
<script>
import {mapActions,mapState} from 'vuex'
export default {
    data(){
        return{
            supplierId:this.$route.params.id,
            link:[
                {   
                    id:1,
                    name:'项目',
                    link:`/supplier/project/${this.$route.params.id}`
                },
                {   
                    id:2,
                    name:'合同',
                    link:`/supplier/contract/${this.$route.params.id}`
                },
                {   
                    id:3,
                    name:'概况',
                    link:`/supplier/basic/${this.$route.params.id}`
                },
                {   
                    id:4,
                    name:'联系人',
                    link:`/supplier/linkman/${this.$route.params.id}`
                },
            ],
            path:this.$route.path
        }
    },
    computed:{
       ...mapState([
           'supplierDetails'
       ]),
    },
    watch:{
       $route:function(){
          this.path = this.$route.path
       }
    },
    created(){
        this.getSupplierDetails(this.$route.params.id)
    },
    methods:{
       ...mapActions([
           'getSupplierDetails'
       ])
    }
}
</script>

