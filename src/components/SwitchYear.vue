<template>
    <div>
       <div class="year">
            <i v-if="type !=1" class="icon md-chevron-left font-size-20 goLeft" @click="changeYear('left')"></i>
            <div class="text-center">
                <div v-if="type == 1">
                    <date-picker-brief @change="getDayTime()" :default="`${this.year}-${this.nowMonth}-${this.nowDay}`"></date-picker-brief>
                </div>
                <div v-if="type == 2">{{content}}</div>
                <div v-if="type == 3||type ==4">{{year}}</div>
                <div v-if="type == 5" style="color:#ccc" class="font-size-12">{{allYear[0].value}}-{{allYear[19].value}}</div>
            </div>
            <i v-if="type !=1" class="icon md-chevron-right font-size-20 goRight" @click="changeYear('right')"></i>
       </div>
       <!--切换月-->
       <ul v-if="showDetails&&type == 3" class="row m-0 p-0 mt-20 pl-10">
           <li @click="clickTime()" v-for="(item,index) in month" :key="index" class="col-md-3 py-5"><span>{{item.name}}</span></li>
       </ul>

       <!--切换季-->
       <ul v-show="showDetails&&type == 4" class="mt-20">
           <li v-for="(item,index) in season" :key="index" class="py-5" @click="clickTime()">
               <div class="mb-5">{{item.name}}</div>
               <div class="font-size-12" style="color:#ccc">{{item.start}} - {{item.end}}</div>
           </li>
       </ul>
       <!--切换周-->
       <ul v-show="showDetails&&type == 2" class="mt-20">
           <li v-for="(item,index) in monthWeek[nowMonth-1]" :key="index" class="py-5" @click="clickTime()">
               <div class="mb-5">{{item.name}}</div>
               <div class="font-size-12" style="color:#ccc">{{item.start}} - {{item.end}}</div>
           </li>
       </ul>
       
       <!--切换年-->
       <ul v-show="showDetails&&type == 5" class="mt-20 row mx-0 pl-10">
           <li v-for="(item,index) in allYear" :key="index" class="py-5 col-md-3 font-size-12 text-center px-0" @click="clickTime()">
               {{item. value}}
           </li>
       </ul>
       <div>
            
       </div>
    </div>
</template>
<script>
import config from '@/assets/js/config'
import DatePickerBrief from '@/components/DatePickerBrief.vue'
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
    components:{
        DatePickerBrief
    },
    data(){
        return {
           year:new Date().getFullYear(),
           nowMonth:new Date().getMonth()+1,
           nowSeason:Math.ceil((new Date().getMonth()+1)/3),
           nowWeek:'',
           nowDay:new Date().getDate(),
           month:[],
           season:config.season,
           day:new Date().getDate(),
           monthDay:[31,28,31,30,31,30,31,31,30,31,30,31],
           content:`${new Date().getMonth()+1}月`,
           monthWeek:{},
           allYear:[],
           switchYear:'',
           leftYear:'',
           rightYear:''
        }
    },
    created(){
        this.getMonth()
        this.changeYear()
        this.getAllWeek(this.nowMonth)
        this.getYear()
        document.onselectstart = function(){return false}
    },
    mounted(){
        if(this.type == 1){
            this.$emit('click',`${this.year}-${this.nowMonth}-${this.nowDay}`,`${this.year}-${this.nowMonth}-${this.nowDay}`)
        }
    },
    methods:{
        getDayTime:function(start,end){
            alert(start,end)
        },
        changeYear:function(move,start,end){
            if(this.type == 3||this.type ==4){
                if(move == 'left'){
                    this.year = this.year-1
                }else if(move == 'right'){
                    this.year = this.year+1
                }else{

                }
                this.$emit('click',`${this.year}-01-01`,`${this.year}-12-31`)
            }else if(this.type == 2){
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
                this.content = `${this.year}年${this.nowMonth}月`
                this.$emit('click',`${this.month.find(item => item.value == this.nowMonth).startDate}`,`${this.month.find(item => item.value == this.nowMonth).endDate}`,this.year,this.nowMonth)
            }
            
            // else if(this.type ==1){
            //     if(move == 'left'){
            //         if(this.nowDay <=1){
            //             this.nowMonth = this.nowMonth-1
            //             this.nowDay = this.monthDay[this.nowMonth-1]
            //             if(this.nowMonth<1){
            //                 this.year = this.year-1
            //                 this.nowMonth = 12
            //                 this.nowDay  = this.monthDay[this.nowMonth-1]
            //             }
            //         }else{
            //             this.nowDay = this.f-1
            //         }
                    
            //     }else if(move == 'right'){
            //        if(this.nowDay>=this.monthDay[this.nowMonth-1]) {   
            //            if(this.nowMonth>=12){
            //                 this.year = this.year+1
            //                 this.nowMonth = 1
            //                 this.nowDay  = 1
            //            }else{
            //                this.nowMonth = this.nowMonth+1
            //                this.nowDay = 1
            //            }
            //        }else{
            //            this.nowDay = this.nowDay+1
            //        } 
            //     }else{}
            //     this.day = `${this.year}-${this.nowMonth}-${this.nowDay}`
            //     this.$emit('click',`${this.day}`,`${this.day}`,this.nowMonth)
            // }
            
            // else if(this.type == 4){
            //     if(move == 'left'){
            //         if(this.nowSeason<=1){
            //             this.nowSeason = 4
            //             this.year = this.year -1
            //         }else{
            //             this.nowSeason = this.nowSeason-1
            //         }
            //     }else if(move == 'right'){
            //         if(this.nowSeason>=4){
            //             this.nowSeason = 1
            //             this.year = this.year+1
            //         }else{
            //             this.nowSeason = this.nowSeason+1
            //         }
            //     }else{}
            //     this.$emit('click',`${this.year}-${this.season.find(item=> item.value == this.nowSeason).startTime}`,`${this.year}-${this.season.find(item=> item.value == this.nowSeason).endTime}`,this.year)
            // }
            else if(this.type == 5){
                
                if(move == 'left'){
                    this.leftYear = Number(this.allYear[0].value)-2
                    this.getYear(this.leftYear)

                }else if(move == 'right'){
                    this.rightYear =Number(this.allYear[19].value)+19
                    this.getYear(this.rightYear)
                }else{}
            }else{}
            
        },
        clickTime:function(start,end){
            this.$emit('click',start,end)
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
        getYear:function(year){
            this.allYear = []
            let nowYear
            if(year){
                nowYear = year - (this.year%20-1)
            }else{
                nowYear = this.year - (this.year%20-1)
            }
            for (let i = 0; i <20; i++) {
                let data = {
                    value:`${Number(nowYear)+i}`,
                    startTime:`${nowYear}-01-01`,
                    endTime:`${nowYear}-12-31`,
                }
                this.allYear.push(data)
                
            }
            this.$emit('click',`${this.allYear[0].value}-01-01`,`${this.allYear[19].value}-12-31`)
        },
        changeMonth:function(){
           
        },
        changeSeason:function(){

        },
        
         //获取全部周
        getAllWeek:function(year){
            let index=1;
            let allWeek = []
            for(let i of this.createWeeks(year)){
                let start=i[0],
                    end=i[1];
                allWeek.push({
                    value:`${index++}`,
                    start:`${this.formatDate(start)}`,
                    end:`${this.formatDate(end)}`,
                    startDay:`${this.formatDate(start).split(',')[2]}`,
                    endDay:`${this.formatDate(end).split(',')[2]}`
                })
            }
            for (let i = 0; i < 12; i++) {
                this.monthWeek[i]=[]
                for (let t = 0; t < allWeek.length; t++) {
                    if(allWeek[t].end.split(',')[1] == i){
                        allWeek[t].start = allWeek[t].start.split(',')[0]
                        allWeek[t].end = allWeek[t].end.split(',')[0]
                        allWeek[t].name = `${year}年第${allWeek[t].value}周`
                        this.monthWeek[i].push(allWeek[t])
                    }
                }
            }
        },
        formatDig:function(num){
            return num>9?''+num:'0'+num;
        },
        formatDate:function(mill){
            var y=new Date(mill);
            let raws= [
                y.getFullYear(),
                this.formatDig(y.getMonth()+1),
                this.formatDig(y.getDate()),
                y.getMonth(),
                y.getDate()
            ];
            let format=['年','月','日,',','];
            return String.raw({raw:raws},...format);
        },
        //这段es6	--代码不是很懂
        *createWeeks(year){
            const ONE_DAY=24*3600*1000;
            let start=new Date(year,0,1),
                end=new Date(year,11,31);
            let firstDay=start.getDay()|| 7,
                lastDay=end.getDay()||7;
            let startTime=+start,
                endTime=startTime+(7-firstDay)*ONE_DAY,
                _endTime=end-(7-lastDay)*ONE_DAY;
            yield [startTime,endTime];
            startTime=endTime+ONE_DAY;
            endTime=endTime+7*ONE_DAY;
            while(endTime<_endTime){
                yield [startTime,endTime];
                startTime=endTime+ONE_DAY;
                endTime=endTime+7*ONE_DAY;
            }
            yield [startTime,+end];
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
       top:0px;
       cursor: pointer;
   }
   .goRight{
       position: absolute;
       right: 25px;
       top:0px;
       cursor: pointer;
   }
</style>


