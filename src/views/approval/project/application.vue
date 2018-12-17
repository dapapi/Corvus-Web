<template>
    <div class="page-main" style="background-color:#f3f4f5">
        <div class="page-header page-header-bordered">
            <h1 class="page-title">我发起的</h1>
        </div>
        <div class="page-content container-fluid">
            <div class="">
                <div class="row py-5">
                    <div class="col-lg-4" v-for="item in list" :key="item.id">
                        <div class="card">
                            <div class="card-block clearfix">
                                <i class="icon md-file float-left" style="font-size:3rem"></i>
                                <div class="float-left">
                                    <div>{{item.name}}</div>
                                    <div class="lightColor">未提交</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "application"
    }
</script>

<style scoped>

</style>