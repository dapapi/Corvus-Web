<template>
    <div>
       <div class="">
            <i  class="icon md-chevron-left font-size-20" @click="changeMonth('left')"></i>
            <span class="mx-30">{{content}}</span>
            
            <i v-if="year<=new Date().getFullYear()&&month<=new Date().getMonth()+1" class="icon md-chevron-right font-size-20" @click="changeMonth('right')"></i>
            <i v-else class="icon md-chevron-right font-size-20" style="color:#ccc"></i>
       </div>
       <div>
           <ul>
               <li>

               </li>
           </ul>
       </div>
    </div>
</template>
<style lang="scss" scoped>
    li{
        list-style: none;
    }
</style>

<script>
export default {
    data(){
        return {
          
           year :new Date().getFullYear(),
           month :(new Date().getMonth())+1,
           content:`${new Date().getMonth()+1}月`,
        }
    },
    mounted(){
        document.onselectstart = function(){return false}
    },
    methods:{
        changeMonth:function(way){
            
           
           if(way == 'left'){
               
               if(this.month <= 1){
                   this.year = this.year-1
                   this.month = 12
               }else{
                   this.month = this.month-1
               }
           }else{
               if(this.month>=12){
                   this.year = this.year+1
                   this.month = 1
               }else{
                   this.month = this.month+1
               }
           }
           this.content = `${this.year}-${this.month}月`
        },
        theWeek:function (){

            //当前date
            var now = new Date();

            //每月多少日
            var monthOfFullDay = new Array(31,28,31,30,31,30,31,31,30,31,30,31);

            //当前日，在本年中第几日
            var currentDayOfYear = 0;

            //是否为润年，即能被4整除
            var isFullYear = false;

            var currentDayOfWeekIsLastDay = false;

            var firstDayOfYearIsFirstDayOfWeek = false;

            //当前年份
            var year = 0;
            if(now.getYear()>=2000)
                year = now.getYear();
            else
                year = now.getYear() + 1900;

            //当前月份
            var month = now.getMonth();

            //当前日
            var day = now.getDate();

            //当前星期几
            var week = now.getDay();

            //为闰年，设isFullYear为true
            if(year%4==0){
                isFullYear = true;
            }


            //循环计算天数
            for(var i=0;i<monthOfFullDay.length;i++){
                //判断数组月份是否小于等于当前月份
                if(i<month){
                    //是闰年和2月份
                    if(isFullYear && i==1)
                        currentDayOfYear = currentDayOfYear + 29;
                    else
                        currentDayOfYear = currentDayOfYear + monthOfFullDay[i];
                    
                }
                if(i==month)
                    currentDayOfYear = currentDayOfYear + day;
            }

            //设置本年1月1日
            var firstDayOfYear = new Date();
            firstDayOfYear.setYear(year);
            firstDayOfYear.setMonth(0);
            firstDayOfYear.setDate(1); 

            if(firstDayOfYear.getDay()==0){
                firstDayOfYearIsFirstDayOfWeek = true;
            }

            var weeksOfYear = currentDayOfYear;

            //本星期是否为最后一日，否，则减去本兴起所有日
            if(!currentDayOfWeekIsLastDay){
                weeksOfYear = weeksOfYear + firstDayOfYear.getDay();
            }

            //是否第一个星期为第一日（即星期日），否，则减去本星期所有日
            if(!firstDayOfYearIsFirstDayOfWeek){
                weeksOfYear = weeksOfYear + (7-week-1);
            }

            return weeksOfYear/7;
            }
    },
}
</script>

