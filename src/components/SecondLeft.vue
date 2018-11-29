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
              <h5 class="page-title pl-30 mb-45">{{title}}</h5>
              <div class="list-group">
                <router-link class="list-group-item" v-for="(item,index) in leftData.topData" :key="index" :to="item.url">{{item.name}}</router-link>
              </div>
            </section>
            <section class="page-aside-section">
              <div class="site-menubar-body" style="width:260px;">
                <ul  class="menu pl-30">
                  <li class="site-menu-item has-sub" v-for="(item,index) in leftData.bottomData" :key="index" @click="switchMenu(item.value)">
                        <a href="javascript:void(0)">
                          <span class="icon md-caret-right font-size-20 mr-10 leftImg" style="position:relative;top:2px" :class="isShow == item.value?'anmite':''"></span>
                          <span class="site-menu-title">{{item.name}}</span>
                        </a>
                        <ul class="site-menu-sub" v-show="isShow == item.value">
                          <li class="site-menu-item" v-for="(item2,index) in  item.data" :key="index">
                            <!-- <a href=""> -->
   
                              <router-link :to="{path:item2.url,query:{id:item2.params.id}}" v-if="item2.params">
                              
                                <span class="icon md-file-text font-size-18 mr-10"></span>
                                <span class="site-menu-title" >{{item2.name}}</span>
                              </router-link>
                              <router-link v-else :to="item2.url" >
                                <span class="icon md-file-text font-size-18 mr-10"></span>
                                <span class="site-menu-title" >{{item2.name}}</span>
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
  props:{
     leftData:{
        type:Object,
        required:true
     },
     title:''
  },
  data(){
    return {
       isShow:'0',
    }
  },
  
  methods:{
    switchMenu:function(id){
      if(this.isShow == id){
        this.isShow = 0
      }else{
        this.isShow = id;
      }
      
    }
  },
  
}
</script>



