<template>
    <div class="tree-view-item">
       <div class="level" :class="`level-${menu.level}`" v-for="menu in menus" :key="menu.id">
           <div class="list-group-item" v-if="menu.type ==='link'" :class="isSelected == menu.id?'selected':''">
               <router-link class="link" v-bind:to="menu.url" @click.native="toggle(menu)" :class="menu.level>1?'pl-15':''">
                   <span v-if="isShow" class="icon md-file-text font-size-18 mr-10 ml-15" ></span>
                   {{menu.name}}
                   <span v-if="menu.num>0" class="unRead">{{menu.num}}</span>
                   
                </router-link>
           </div>
           <div v-if="menu.type === 'button'">
                <div class="list-group-item button heading" :class="{selected:isSelected == menu.id,expand:isExpanded.includes(menu.id)}" @click="toggle(menu)" >
                    <i class="icon md-caret-right mr-10 font-size-20" style="vertical-align: middle;"></i>
                    <span>{{menu.name}}
                    </span>
                    <span v-if="menu.name=='我的消息'&&unReadMsg>0" class="unRead first">{{unReadMsg}}</span>
                </div>
                <transition name="fade">
                    <div class="heading-children" v-if="menu.subMenu && isExpanded.includes(menu.id)">
                        <tree-view-item :menus='menu.subMenu'></tree-view-item>
                    </div>
                </transition>
           </div>
       </div>
    </div>
</template>
<script>

//命名空间
import {mapState,mapGetters} from 'vuex'
export default {
    name:"TreeViewItem",
    props:["menus"],
    data(){
        return {
            canRun:true,
            urlRoute:'',
            isShow:false
        }
    },
    computed:{
       ...mapState([
           
           'isSelected',//从vuex里获取切换之后的选中id
           'isExpanded',//从vuex里获取切换之后需要展开菜单的id
           'unReadMsg'
       
       ])
    },
    created(){

       //获取完整的url地址
       let query = ''
       if(JSON.stringify(this.$route.query) !== "{}"){
            let allQuery = this.$route.query
            for (const key in allQuery) {
                query = `${query}&${key}=${allQuery[key]}`
            }
            query = query.substr(1)
            this.urlRoute = `${this.$route.path}?${query}`
       }else{
           this.urlRoute = this.$route.path
       }
       
    
    },

    mounted(){
        // console.log()
        this.$nextTick(()=>{
           this.setExpand(this.menus,this.urlRoute)
        })
        
    },
    updated(){
        if(this.canRun == true){
            this.setExpand(this.menus,this.urlRoute)
        }
    },
    watch:{
    },
    methods:{
        toggle(menu){
            
            if (menu.type === "button") {
                let newExpanded = []
                if(!this.$store.state.isExpanded.includes(menu.id)){
                    this.$store.state.isExpanded.push(menu.id)
                    this.$store.dispatch('changeIsExpanded',this.$store.state.isExpanded)
                    
                }else{
                    this.$store.state.isExpanded.splice(this.$store.state.isExpanded.indexOf(menu.id),1)
                    this.$store.dispatch('changeIsExpanded',this.$store.state.isExpanded)
                }
            } else if (menu.type === "link") {
                
                this.setExpand(this.menus, menu.url)
                
            }
        },
        setExpand:function(source, url) {
            let sourceItem = '';
            for (let i = 0; i < source.length; i++) {

                sourceItem = JSON.stringify(source[i]); // 把菜单项转为字符串
                if (sourceItem.indexOf(url) > -1) { // 查找当前 URL 所对应的子菜单属于哪一个祖先菜单
                    this.canRun = false
                    if (source[i].type === 'button') { // 导航菜单为按钮
                        if(!this.$store.state.isExpanded.includes(source[i].id)){
                            this.$store.state.isExpanded.push(source[i].id)
                            this.$store.dispatch('changeIsExpanded',this.$store.state.isExpanded)
                            this.$store.dispatch('changeIsSelected',source[i].id)
                        }
                        
                        // 递归下一级菜单，以此类推
                        this.setExpand(source[i].subMenu, url);
                    }else{
                        this.$store.dispatch('changeIsSelected',source[i].id)
                        this.$store.state.isExpanded.push(source[i].id)
                        this.$store.dispatch('changeIsExpanded',this.$store.state.isExpanded)
                        
                    }
                break;
                }
            }
        },
        
    }
}
</script>
<style scoped>
    a{
        text-decoration: none;
        color:#333
    }
    .link,.button{
        display: block;
        /* padding:10px 15px; */
        transition: background-color 0.2s ease-in-out 0s, color 0.3s ease-in-out 0.1s;
        -moz-user-select: none;
        -webkit-user-select: none;
        -ms-user-select: none;
        -khtml-user-select: none;
        user-select: none;
        position: relative;
    }
    .button {
        position: relative;
    }
    .link:hover,.button:hover {
        
        /* background-color: #eee; */
        cursor: pointer;
    }
    .icon {
        transition: -webkit-transform 0.15s;
        transition: transform 0.15s;
        transition: transform 0.15s, -webkit-transform 0.15s;
        transition-timing-function: ease-in-out;
    }
    .heading-children {
        /* padding-left: 14px; */
        /* overflow: hidden; */
    }
    .expand {
        display: block;
    }
    .collapsed {
    display: none;
    }
    .expand .icon {
    -webkit-transform: rotate(90deg);
    transform: rotate(90deg);
    }
    .selected {
       background-color:#eee
    }
    .fade-enter-active {
    transition: all 0.5s ease 0s;
    }
    .fade-enter {
    opacity: 0;
    }
    .fade-enter-to {
    opacity: 1;
    }
    .fade-leave-to {
    height: 0;
    }
    .unRead {
        display: inline-block;
        width: 17px;
        height: 17px;
        background-color: red;
        color: #fff;
        font-size: 12px;
        font-weight: bold;
        text-align: center;
        line-height: 17px;
        border-radius: 50%;
        position: relative;
        bottom:1px;
        position: absolute;
        top: 3px;
        right: 10px;
    }
    .first{
        position:absolute;
        top:15px;
        right:45px;
    }
</style>


