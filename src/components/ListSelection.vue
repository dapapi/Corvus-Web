<template>
    <div class="list pl-60">
     <div class="left">
        <div class="left-header pb-10">表单中所有字段</div>
        <div class="left-cont">
        <ul  >
         <li v-for="(item,index) in list" :key="item.id"  @click="handleClick(index)">{{item.text}}</li>
        </ul>
        </div>
     </div>
     <div class="middle"></div>
     <div class="right" >
        <div class="right-header pb-10">显示字段</div>
        <div class="right-cont">
         <ul @click="back">
            <li v-for="(item,index) in listright" :key="index" @click="back(index)">{{item.text}}</li>
        </ul>
        </div>
     </div>
    </div>
</template>
<script>
export default {
  name: "ListSelection",
  data() {
    return {
      list: [
        {
          id: 1,
          text: "申请事件"
        },
        {
          id: 2,
          text: "申请人"
        },
        {
          id: 3,
          text: "审批状态"
        },
        {
          id: 4,
          text: "审批人"
        },
        {
          id: 5,
          text: "申请事件"
        },
        {
          id: 6,
          text: "申请人"
        },
        {
          id: 7,
          text: "审批状态"
        },
        {
          id: 8,
          text: "审批人"
        }
      ],
      listright:[]
    };
  },
  methods:{
      handleClick(i){
         this.list.forEach((item,index)=>{
             if(i==index){
                this.listright.push(item);
                this.list.splice(index,1)
             }
         })    
      },
      back(i){
          this.listright.forEach((item,index)=>{
             if(i==index){
                this.list.push(item);
                this.listright.splice(index,1)
             }
         }) 
           
      
              
      }

  }
};
</script>
<style scoped>
li {
  list-style: none;
}
.list{
    display: flex;
    position: relative;
}
.left-cont,.right-cont{
    width: 200px;
    height:300px;
    border: 1px solid #ccc;
    overflow: hidden;
}
.left ul li:hover,.right ul li:hover{
    background: #eee;
}
.left ul,.right ul{
    width: 100%;
    height:300px;
    overflow-y: scroll;
    padding: 0;
    text-indent: 2em;
   
}
.left ul li,.right ul li{
    height: 50px;
    line-height: 50px;
    width: 100%;
}
.middle{
    position: absolute;
    top:130px;
    left:290px;
    width: 0;
    height: 0;
    border-top: 5px solid transparent;
    border-left: 10px solid #838383 ;
    border-bottom: 5px solid transparent;
}
.right{
    position: absolute;
    right:30px;
    top:0;
}
</style>


