<template>
    <!-- Page -->
    <div class="page">
        <div class="page-header page-header-bordered">
            <h1 class="page-title">简报</h1>
        </div>
        <div class="page-content container-fluid">
            <div class="">
                <div class="row py-5">
                    <div class="col-lg-4" v-for="item in list" :key="item.id">
                        <div class="card" @click="redirectBriefDetails(item.id)">
                            <div class="card-block">
                                
                                <i class="icon md-file float-left" style="font-size:3rem"></i>
                                <i></i>
                                <p class="my-10">{{item.title}}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="site-action" data-plugin="actionBtn" @click="redirectBriefAdd()">
            <button type="button"  class="site-action-toggle btn-raised btn btn-success btn-floating waves-effect waves-classic">
                <i class="front-icon md-plus animation-scale-up" aria-hidden="true"></i>
                <i class="back-icon md-plus animation-scale-up" aria-hidden="true"></i>
            </button>
        </div>
    </div>
</template>
<script>
import fetch from '@/assets/utils/fetch'
import config from '@/assets/js/config'

export default {
    data(){
        return {
            list:[], 
        }
    },
    mounted(){
        this.getlist()
    },
    methods:{
        redirectBriefDetails:function(id){
            this.$router.push({path:'/brief/details',query:{id:id}})
        },
        redirectBriefAdd:function(){
            this.$router.push({path:'/brief/add'})
        },
        getlist:function(){
            fetch('get',`${config.apiUrl}/launch`).then((res) => {
                this.list = res.data
            })
        }
    }
}
</script>



    
    






