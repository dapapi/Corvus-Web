<template>
    <!-- Page -->
    <div class="" style="background-color:##f3f4f5">
        <div class="page-header page-header-bordered">
            <h1 class="page-title">我的申请</h1>
        </div>
         <div class="page-content container-fluid  pt-20 px-20">
               <div class="panel col-md-12 clearfix p-10 mt-0">
                <!-- <div class="clearfix"> -->
                <div class="col-md-3 example float-left " >
                        <selectors :placeholder="'太阳系'" :options="data"></selectors>
                </div>
                 <div class="col-md-3 example float-left" >
                         <datepicker :placeholder="'开始时间'"></datepicker>
                </div>
                <div class="col-md-3 example float-left" >
                         <datepicker :placeholder="'结束时间'"></datepicker>
                </div>
                </div>
        </div>
        <div class="page-content container-fluid px-20">       
            <div class="col-md-12 panel">
                    <div class="example pb-5 mt-0">
                        <table class="table table-hover is-indent mb-20" data-plugin="animateList" data-animate="fade"
                               data-child="tr"
                               data-selectable="selectable">
                            <tr>
                                <th class="cell-300 pl-15" scope="col">工号</th>
                                <th class="cell-300 pl-15" scope="col">姓名</th>
                                <th class="cell-300 pl-15" scope="col">部门</th>
                                <th class="cell-300 pl-15" scope="col">审批编号</th>
                                <th class="cell-300 pl-15" scope="col">申请时间</th>
                                <th class="cell-300 pl-15" scope="col">审批时间</th>
                                <th class="cell-300 pl-15" scope="col">审批人</th>   
                            </tr>
                            <tr >
                                <td>
                                    <div data-toggle="modal" data-target="#submitReport">
                                        10001
                                    </div>
                                </td>
                                <td>
                                    <div data-toggle="modal" data-target="#submitReport">
                                        张三
                                    </div>
                                </td>
                                <td>
                                    <div data-toggle="modal" data-target="#submitReport">
                                        技术部
                                    </div>
                                </td>
                                <td>
                                    <div data-toggle="modal" data-target="#submitReport">
                                        1234567
                                    </div>
                                </td>
                                <td>
                                    <div data-toggle="modal" data-target="#submitReport">
                                        2018.10.11
                                    </div>
                                </td>
                                <td class="pointer-content">
                                    <div data-toggle="modal" data-target="#submitReport">
                                          2018.10.14
                                    </div>
                                </td>
                                <td>
                                    <div data-toggle="modal" data-target="#submitReport">明明</div>
                                </td>     
                            </tr>
                                <tr >
                                    <td>
                                        <div data-toggle="modal" data-target="#submitReport">
                                            10002
                                        </div>
                                    </td>
                                    <td>
                                        <div data-toggle="modal" data-target="#submitReport">
                                            王五
                                        </div>
                                    </td>
                                    <td>
                                        <div data-toggle="modal" data-target="#submitReport">
                                            技术部
                                        </div>
                                    </td>
                                    <td>
                                        <div data-toggle="modal" data-target="#submitReport">
                                            7654321
                                        </div>
                                    </td>
                                    <td>
                                        <div data-toggle="modal" data-target="#submitReport">
                                            2018.10.16
                                        </div>
                                    </td>
                                    <td class="pointer-content">
                                        <div data-toggle="modal" data-target="#submitReport">
                                            2018.10.17
                                        </div>
                                    </td>
                                    <td>
                                        <div data-toggle="modal" data-target="#submitReport">明明</div>
                                    </td>     
                                </tr>
                                 <tr >
                                <td>
                                    <div data-toggle="modal" data-target="#submitReport">
                                        10003
                                    </div>
                                </td>
                                <td>
                                    <div data-toggle="modal" data-target="#submitReport">
                                        李四
                                    </div>
                                </td>
                                <td>
                                    <div data-toggle="modal" data-target="#submitReport">
                                        人事部
                                    </div>
                                </td>
                                <td>
                                    <div data-toggle="modal" data-target="#submitReport">
                                        01018456
                                    </div>
                                </td>
                                <td>
                                    <div data-toggle="modal" data-target="#submitReport">
                                        2018.10.13
                                    </div>
                                </td>
                                <td class="pointer-content">
                                    <div data-toggle="modal" data-target="#submitReport">
                                          2018.10.15
                                    </div>
                                </td>
                                <td>
                                    <div data-toggle="modal" data-target="#submitReport">白白</div>
                                </td>     
                            </tr>
                            
                        </table>
                        <!-- <pagination :current_page="current_page" :method="getProjects" :total_pages="total_pages"
                                    :total="total"></pagination> -->
                </div>
                </div>
        </div>
    </div>
</template>
<script>
import fetch from "@/assets/utils/fetch";
import config from "@/assets/js/config";
import data from "./selector.json"

export default {
  data() {
    return {
      list: [],
      data: data
    };
  },
  mounted() {
    this.getlist();
  },
  methods: {
    redirectBriefDetails: function(id) {
      this.$router.push({ path: "/brief/details", query: { id: id } });
    },
    redirectBriefAdd: function() {
      this.$router.push({ path: "/brief/add" });
    },
    getlist: function() {
      fetch("get", `${config.apiUrl}/launch`).then(res => {
        this.list = res.data;
      });
    },
    addInfo: function (value, name) {
        this.addInfoArr[name] = value;
    },
  }
};
</script>
<style lang="scss" scoped>
.page-main {
  background-color: #f3f4f5 !important;
}
tr {
  &:hover {
    background-color: #f5f5f5;
    cursor: pointer;
  }
}
.page-main {
  position: absolute;
  left: 240px;
  top: 0;
}

.page-header-bordered {
  margin: 0;
}
.page-content{
   padding: 0;
}
.example span{
    position: absolute;
    top:10px;
}
.panel{
    margin:0;
}
</style>




    
    






