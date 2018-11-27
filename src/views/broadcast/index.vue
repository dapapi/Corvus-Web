<template>
    <div class="page">
        <div class="page-header page-header-bordered row">
            <h1 class="page-title col-md-2">公告&nbsp;&nbsp;(23)</h1>
        </div> 
        <div class="page-content container-fluid">
            <div class="panel " id="">
                <div class="panel-body">
                    <div class="">
                        <div class="table-responsive">
                            <table class="table table-hover" data-role="content" data-plugin="selectable" data-row-selectable="true">
                                <thead class="">
                                <tr>
                                    <td class="broadcast-title"><strong>标题</strong>
                                    </td>
                                    <td>
                                        <strong>分类</strong> 
                                    </td>
                                    <td></td>
                                    <td>
                                    <strong>发布时间</strong>
                                    </td>
                                    <td></td>
                                    <td></td>
                                    <td>
                                    <strong>发布人</strong>
                                    </td>
                                </tr>
                                </thead>
                                <tbody>
                                <tr class="broadcast-tr" v-for="i in 5" :key="i">
                                    <td class="broadcast-title">
                                        <span class="broadcast-title-div">
                                            <span class="">Revene for last quarter in state America for year 2013,
                                    whith112312312123123312323121233</span>
                                        </span>
                                        <span class="broadcast-top-flag badge badge-outline badge-info">置顶</span>
                                        <span class="broadcast-new-flag">
                                            <strong>NEW</strong>
                                        </span>
                                    </td>
                                    <td>公告内容</td>
                                    <td></td>
                                    <td>
                                        <span>6 minets ago</span>
                                        <i class="icon md-time ml-10" aria-hidden="true"></i>
                                    </td>
                                    <td></td>
                                    <td></td>
                                    <td>
                                        张小凡      
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <AddModifyBroadCast />
        </div>
    </div>
</template>

<script>
export default {
   
}
</script>

<style scoped>
.broadcast-title{
    /* width: 500px; */
    display: flex;
}
.broadcast-title-div{
    display: inline-block;
    max-width: 400px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.broadcast-top-flag{
    margin-left: 20px;
    margin-right: 20px;
    color: #3298DC !important;
}
.broadcast-new-flag{
    color: #F44336;
}
</style>
