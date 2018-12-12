<template>
    <div>
       <div class="year">
            <i class="icon md-chevron-left font-size-20 goLeft" @click="changeYear('left')"></i>
            <div class="text-center">

                
                <div v-if="type == 1">{{day}}</div>
                <!-- <div v-if="type == 2"></div> -->
                <div v-if="type == 3 ||type == 2">{{content}}</div>
                <div v-if="type == 4">{{this.year}}{{season.find(item => item.value == nowSeason).name}}</div>
                <div v-if="type == 5">{{year}}年</div>

                <!-- <div v-if="type == 2"></div> -->
                <div v-if="type == 3 || type == 2" class="font-size-12" style="color:#ccc">{{month.find(item => item.value == nowMonth).details}}</div>
                <div v-if="type == 4" class="font-size-12" style="color:#ccc">{{season.find(item=> item.value == nowSeason).start}}-{{season.find(item=> item.value == nowSeason).end}}</div>
                 <div v-if="type == 5" class="font-size-12" style="color:#ccc">1月1日-12月31日</div>
                
            </div>
            <i class="icon md-chevron-right font-size-20 goRight" @click="changeYear('right')"></i>
       </div>
       <!--切换月-->
       <ul v-show="showDetails&&type == 'month'" class="row m-0 p-0 mt-20 pl-10">
           <li v-for="(item,index) in month" :key="index" class="col-md-3 py-5"><span>{{item.name}}</span></li>
       </ul>

       <!--切换季-->
       <ul v-show="showDetails&&type == 'season'" class="mt-20">
           <li v-for="(item,index) in season" :key="index" class="py-5">
               <div class="mb-5">{{item.name}}</div>
               <div class="font-size-12" style="color:#ccc">{{item.start}} - {{item.end}}</div>
           </li>
       </ul>
    </div>
</template>
<script>
import config from '@/assets/js/config'

export default {
    props:{
        type:{
            type:Number,
            default:3
        },
        showDetails:{
            type:Boolean,
            default:false,
        }
    },
    data(){
        return {
           year:new Date().getFullYear(),
           nowMonth:new Date().getMonth()+1,
           nowSeason:parseInt((new Date().getMonth()+1)/3),
           nowWeek:'',
           nowDay:new Date().getDate(),
           month:[],
           season:config.season,
           day:'',
           monthDay:[31,28,31,30,31,30,31,31,30,31,30,31],
           content:`${new Date().getMonth()+1}月`,
        }
    },
    created(){
        this.getMonth()
        this.changeYear()
        document.onselectstart = function(){return false}
    },
    methods:{
        changeYear:function(move){
            if(this.type == 5){
                if(move == 'left'){
                    this.year = this.year-1
                }else if(move == 'right'){
                    this.year = this.year+1
                }else{

                }
                this.$emit('click',`${this.year}-1-1 00:00:00`,`${this.year}-12-31 23:59:59`,this.year)
            }else if(this.type == 3||this.type == 2){
                if(move == 'left'){
               
                    if(this.nowMonth <= 1){
                        this.year = this.year-1
                        this.nowMonth = 12
                        this.getMonth()
                    }else{
                        this.nowMonth = this.nowMonth-1
                    }
                }else if(move == 'right'){
                    if(this.nowMonth>=12){
                        this.year = this.year+1
                        this.nowMonth = 1
                        this.getMonth()
                    }else{
                        this.nowMonth = this.nowMonth+1
                    }
                }else{

                }
                this.content = `${this.year}-${this.nowMonth}月`
                this.$emit('click',`${this.month.find(item => item.value == this.nowMonth).startDate} 00:00:00`,`${this.month.find(item => item.value == this.nowMonth).endDate} 23:59:59`,this.year,this.nowMonth)
            }else if(this.type ==1){
                if(move == 'left'){
                    if(this.nowDay <=1){
                        this.nowMonth = this.nowMonth-1
                        this.nowDay = this.monthDay[this.nowMonth-1]
                        if(this.nowMonth<1){
                            this.year = this.year-1
                            this.nowMonth = 12
                            this.nowDay  = this.monthDay[this.nowMonth-1]
                        }
                    }else{
                        this.nowDay = this.nowDay-1
                    }
                    
                }else if(move == 'right'){
                   if(this.nowDay>=this.monthDay[this.nowMonth-1]) {   
                       if(this.nowMonth>=12){
                            this.year = this.year+1
                            this.nowMonth = 1
                            this.nowDay  = 1
                       }else{
                           this.nowMonth = this.nowMonth+1
                           this.nowDay = 1
                       }
                   }else{
                       this.nowDay = this.nowDay+1
                   } 
                }else{}
                this.day = `${this.year}-${this.nowMonth}-${this.nowDay}`
                this.$emit('click',`${this.day} 00:00:00`,`${this.day} 23:59:59`,this.nowMonth)
            }else if(this.type == 4){
                if(move == 'left'){
                    if(this.nowSeason<=1){
                        this.nowSeason = 4
                        this.year = this.year -1
                    }else{
                        this.nowSeason = this.nowSeason-1
                    }
                }else if(move == 'right'){
                    if(this.nowSeason>=4){
                        this.nowSeason = 1
                        this.year = this.year+1
                    }else{
                        this.nowSeason = this.nowSeason+1
                    }
                }else{}
                this.$emit('click',`${this.year}-${this.season.find(item=> item.value == this.nowSeason).startTime} 00:00:00`,`${this.year}-${this.season.find(item=> item.value == this.nowSeason).endTime} 23:59:59`,this.year)
            }
            
            
        },
        getMonth:function(){
            
            //判断是不是闰年
            let isLeapYear  = this.year%4
            
            for (let i = 0; i <this.monthDay.length; i++) {
                let data ={
                    value :i+1,
                    name:`${i+1}月`,
                    details:`${i+1}月1日-${i+1}月${this.monthDay[i]}日`,
                    startDate:`${this.year}-${i+1}-1`,
                    endDate:`${this.year}-${i+1}-${this.monthDay[i]}`
                }
                //闰年2月29天
                if(isLeapYear === 0&&i == 1){
                    data.details = `${i+1}月1日-${i+1}月29日`
                    data.endDate = `${this.year}-${i+1}-${this.monthDay[i]}`
                }
                this.month[i]= data
            
            }
        },
        changeMonth:function(){
           
        },
        changeSeason:function(){

        }
        
    }
}
</script>
<style lang="scss" scoped>
   li{
       list-style: none;
       cursor: pointer;
       span{
           display: inline-block;
           padding:2px;
           &:hover{
               box-shadow: 2px 2px 5px #f5f5f5;
               border-radius: 2px
           }
       }
   }
   .year{
       position: relative;
       min-width: 200px;
   }
   .goLeft{
       position: absolute;
       left: 25px;
       top:0px
   }
   .goRight{
       position: absolute;
       right: 25px;
       top:0px;
   }
</style>


