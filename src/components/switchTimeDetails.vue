<template>
    <div>
       <div class="year">
            <i class="icon md-chevron-left font-size-20 goLeft" @click="changeYear('left')" :class="type == 1?'goLeftTop':''"></i>
            <div class="text-center">
                <div v-if="isShowTitle == true">
                    <div v-if="type == 1">{{day}}</div>
                    <div v-if="type == 2">{{week}}</div>
                    <div v-if="type == 3">{{content}}</div>
                    <div v-if="type == 4">{{this.year}}{{season.find(item => item.value == nowSeason).name}}</div>
                    <div v-if="type == 5">{{year}}年</div>
                </div>
                <div v-if="isShowDetails == true">
                     <div v-if="type == 2&&allWeek.length>0" class="font-size-12" style="color:#ccc">{{allWeek.find(item => item.name == week).start.split('年')[1]}} - {{allWeek.find(item => item.name == week).end.split('年')[1]}}</div>
                    <div v-if="type == 3" class="font-size-12" style="color:#ccc">{{month.find(item => item.value == nowMonth).details}}</div>
                    <div v-if="type == 4" class="font-size-12" style="color:#ccc">{{season.find(item=> item.value == nowSeason).start}}-{{season.find(item=> item.value == nowSeason).end}}</div>
                    <div v-if="type == 5" class="font-size-12" style="color:#ccc">1月1日-12月31日</div>
                </div>   
            </div>
            <i class="icon md-chevron-right font-size-20 goRight" @click="changeYear('right')" :class="type ==1?'goRightTop':''"></i>
       </div>
    </div>
</template>
<script>
import config from '@/assets/js/config'

export default {
    props:{
        type:{  //1 日 2 周 3 月 4 季 5年
            type:Number,
            default:3
        },
        isShowTitle:{
            type:Boolean,
            default:true
        },
        isShowDetails:{
            type:Boolean,
            default:true
        },
        isMember:{
            type:Boolean,
            default:true
        }
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
           day:`${new Date().getFullYear()}年${new Date().getMonth()+1}月${new Date().getDate()}日`,
           monthDay:[31,28,31,30,31,30,31,31,30,31,30,31],
           content:`${new Date().getMonth()+1}月`,
           monthWeek:{},
           week:'',
           allWeek:[],
           weekNum:1,
        }
    },
    created(){
        let _this = this
        this.getMonth()
        document.onselectstart = function(){return false}
    },
    mounted(){
        this.getAllWeek(this.year)
        let nowDate =new Date().getTime()
        this.week = this.allWeek.find(item => item.startTime<nowDate).name
        this.weekNum = this.allWeek.find(item => item.startTime<nowDate).value
        this.changeYear()
    },
    
    methods:{
        changeYear:function(move,start,end){
            //年
            if(this.type == 5){
                if(move == 'left'){
                    this.year = this.year-1
                }else if(move == 'right'){
                    this.year = this.year+1
                }else{

                }
                this.$emit('click',`${this.year}`,`${this.year}`,this.year)
            }else if(this.type == 3){
                //月
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
            }else if(this.type == 2){
                //周
                if(move == 'left'){
                    if(this.weekNum<=1){
                        this.year = this.year -1
                        this.getAllWeek(this.year)
                        this.weekNum = this.allWeek.length
                    }else{
                        this.weekNum = this.weekNum-1
                        
                    }
                }else if(move == 'right'){
                    if(this.weekNum>=this.allWeek.length){
                        this.year = Number(this.year)+1
                        this.getAllWeek(this.year)
                        this.weekNum = 1
                    }else{
                        this.weekNum = this.weekNum+1
                    }
                    
                }else{}
                this.week = this.allWeek.find(item => item.value == this.weekNum).name
                this.$emit('click',`${this.allWeek.find(item => item.value == this.weekNum).startDay}`,`${this.allWeek.find(item => item.value == this.weekNum).endDay}`)
            }else if(this.type ==1){
                //日
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
                this.day = `${this.year}年${this.nowMonth}月${this.nowDay}日`
                this.$emit('click',`${this.year}-${this.nowMonth}-${this.nowDay}`,`${this.year}-${this.nowMonth}-${this.nowDay}`)
            }else if(this.type == 4){
                //季度
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
                this.$emit('click',`${this.year}-${this.season.find(item=> item.value == this.nowSeason).startTime}`,`${this.year}-${this.season.find(item=> item.value == this.nowSeason).endTime}`)
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
         //获取全部周
        getAllWeek:function(year){
            let index=1;
            this.allWeek = []
            for(let i of this.createWeeks(year)){
                let start=i[0],
                    end=i[1],
                    iValue = index++
                this.allWeek.push({
                    value:iValue,
                    start:`${this.formatDate(start)[0]}`,
                    end:`${this.formatDate(end)[0]}`,
                    name:`${year}第${iValue}周`,
                    startDay:`${this.formatDate(start)[1]}`,
                    endDay:`${this.formatDate(end)[1]}`,
                    startTime:`${this.formatDate(start)[2]}`,
                    endTime:`${this.formatDate(start)[2]}`
                })
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
            ];
            let format=['年','月',' 日'];
            let format2 = ['-','-']
            return [String.raw({raw:raws},...format),String.raw({raw:raws},...format2),mill];
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
       min-width: 150px;
   }
   .goLeft{
       position: absolute;
       left: 0px;
       top:10px;
       cursor: pointer;
   }
   .goLeftTop{
       top:2px;
   }
   .goRight{
       position: absolute;
       right: 0px;
       top:10px;
       cursor: pointer;
   }
   .goRightTop{
       top:2px;
   }
</style>



