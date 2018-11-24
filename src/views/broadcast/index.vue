<template>
    <div class="page">
        <div class="page-header page-header-bordered col-md-12 row">
            <h1 class="page-title col-md-2">公告</h1>
        </div> 
        <div class="panel" id="exampleReport">
          <div class="panel-body">
            <div class="panel-heading">
              <h4 class="panel-title">23 Reports</h4>
              <div class="panel-actions">
                <a class="panel-action icon md-edit" data-toggle="tooltip" data-original-title="edit" data-container="body" title=""></a>
              </div>
            </div>
            <div class="example-wrap">
              <div class="example">
                <div class="table-responsive">
                  <table class="table table-hover" data-role="content" data-plugin="selectable" data-row-selectable="true">
                    <thead class="bg-grey-100">
                      <tr>
                        <th>
                          置顶flag
                        </th>
                        <th>
                          标题
                        </th>
                        <th>
                          分类
                        </th>
                        <th>
                          发布时间
                        </th>
                        <th>
                        </th>
                        <th>
                          发布人
                        </th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr class="broadcast-tr" v-for="i in 5" :key="i">
                        <td>
                          <span class="checkbox-custom checkbox-primary">
                            <input class="selectable-item" type="checkbox">
                            <label></label>
                          </span>
                        </td>
                        <td><a href="javascript:void(0)">Revene for last quarter in state America for year 2013,
                          whith...</a>
                          <i class="icon md-help ml-10 red-600" aria-hidden="true" data-toggle="tooltip" data-original-title="help" data-container="body" title=""></i>
                        </td>
                        <td>公告内容公告内容公告内容公告内容公告内容</td>
                        <td>
                            <span>6 minets ago</span>
                          <i class="icon md-time ml-10" aria-hidden="true"></i>
                        </td>
                        <td>
                        </td>
                        <td>
                            张小凡      
                        </td>
                        <td>
                          <img class="avatar avatar-sm" src="http://f11.baidu.com/it/u=3773006683,2981674318&fm=72" data-toggle="tooltip" data-original-title="Crystal Bates" data-container="body" title="">
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style>
.broadcast-tr{
    border-bottom: 1px solid #e4ecea;
}
</style>
