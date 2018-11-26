<template>
    <div class="page-aside">
      <div class="page-aside-switch">
        <i class="icon wb-chevron-left" aria-hidden="true"></i>
        <i class="icon wb-chevron-right" aria-hidden="true"></i>
      </div>
      <div class="page-aside-inner page-aside-scroll scrollable is-enabled scrollable-vertical" style="position: relative;">
        <div data-role="container" class="scrollable-container" style="height: 691px; width: 259px;">
          <div data-role="content" class="scrollable-content" style="width: 259px;">
            <section class="page-aside-section">
              <h5 class="page-title pl-30 mb-45">简报</h5>
              <div class="list-group">
                <router-link class="list-group-item" to="/brief/home">提交简报</router-link>
                <router-link class="list-group-item" to="/brief/myapproval">我审批的</router-link>
                <router-link class="list-group-item" to="/brief/followup">跟进的问题</router-link>
              </div>
            </section>
            <section class="page-aside-section">
              <div class="site-menubar-body" style="width:260px;">
                <ul  class="menu pl-30">
                  <li class="site-menu-item has-sub" v-for="item in list" :key="item.id" @click="switchMenu(item.id)">
                        <a href="javascript:void(0)">
                          <span class="icon md-caret-right font-size-20 mr-10 leftImg" :class="isShow == item.id?'anmite':''"></span>
                          <span class="site-menu-title">{{item.value}}</span>
                        </a>
                        <ul class="site-menu-sub" v-show="isShow == item.id">
                          <li class="site-menu-item" v-for="item2 in  reportList" :key="item2.id">
                            <!-- <a href=""> -->
                              <router-link v-if="item.id == '1'" to="/brief/list"  class="animsition-link">
                                <span class="icon md-file-text font-size-18 mr-10"></span>
                                <span class="site-menu-title" >我的{{item2.template_name}}</span>
                              </router-link>
                              <router-link v-else-if="item.id == '2'" to="/brief/memberReport">
                                <span class="icon md-file-text font-size-18 mr-10"></span>
                                <span class="site-menu-title" >成员{{item2.template_name}}</span>
                              </router-link>
                              <router-link to="/brief/statistics" v-else>
                                <span class="icon md-file-text font-size-18 mr-10"></span>
                                <span class="site-menu-title">{{item2.template_name}}统计</span>
                              </router-link>
                            <!-- </a>    -->
                          </li>
                        </ul>
                  </li>
                </ul>
              </div>   
              
            </section>
          </div>
        </div>
        <div class="scrollable-bar scrollable-bar-vertical is-disabled scrollable-bar-hide" draggable="false"><div class="scrollable-bar-handle"></div></div>
      </div>
      </div>
</template>
<style scoped>
  li{
    list-style: none
  }
  li a:hover{
    text-decoration:none;
  }
  .site-menu-sub{
    padding-left:20px;
  }
  .menu li{
    margin:20px 0;
  }
  .leftImg{
    transition: All 0.4s ease-in-out;
    -webkit-transition: All 0.4s ease-in-out;
    -moz-transition: All 0.4s ease-in-out;
    -o-transition: All 0.4s ease-in-out;
  }
  .anmite{
    transform:rotate(90deg);
    -ms-transform:rotate(90deg); 	/* IE 9 */
    -moz-transform:rotate(90deg); 	/* Firefox */
    -webkit-transform:rotate(90deg); /* Safari 和 Chrome */
    -o-transform:rotate(90deg);
  }
</style>
<script>
import fetch from '@/assets/utils/fetch'
import config from '@/assets/js/config'

export default {
  data(){
    return {
       list:[
         {
           id:'1',
           value:'我的简报'
         },
         {
           id:'2',
           value:'成员简报',
         },
         {
           id:'3',
           value:'简报统计'
         }
       ],
       reportList:[],
       isShow:'0',
    }
  },
  mounted(){
    this.getlist()
  },
  methods:{
    switchMenu:function(id){
      if(this.isShow == id){
        this.isShow = 0
      }else{
        this.isShow = id;
      }
      
    },
    getlist:function(){
      fetch('get',`${config.apiUrl}/launch`).then((res) => {
          this.reportList = res.data
      })
    }
  },
  
}
</script>


