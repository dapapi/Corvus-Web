<template>
    <!-- Page -->
    <div class="page-main" style="background-color:##f3f4f5">
        <div class="page-header page-header-bordered clearfix">
            <h1 class="page-title float-left">统计{{template_name}}</h1>
            <switch-year class="float-right" :showDetails="true" :type="type" @click="selectDate"></switch-year>
        </div>
        <div class="page-content container-fluid">
            <div class="panel mb-0">
                <div class="col-md-4  p-20">
                    <div class="input-search">
                        <button type="button" class="input-search-btn"><i class="icon md-search" aria-hidden="true"></i>
                        </button>
                        <input type="text" class="form-control" placeholder="搜索成员、周期">
                    </div>
                </div>
                
            </div>
            <div class="col-md-12 panel">
                    <div>
                    <div class="pb-5">
                        <table class="table table-hover is-indent mb-20" data-plugin="animateList" data-animate="fade"
                               data-child="tr"
                               data-selectable="selectable">
                            <tr>
                                <th class="cell-300" scope="col">成员</th>
                                <th class="cell-300">已提交</th>
                                <th class="cell-300">未提交</th>
                                
                                <th class="cell-300" v-if="showType ==4" v-for="(item,index) in season" :key="index">{{item.name}}</th>
                                <th class="cell-200" v-if="showType ==3" v-for="item in 12" :key="item">{{item}}月</th>
                                <th class="cell-300" v-if="showType ==2||showType ==1" v-for="(item,index) in monthWeek[nowYear-1]" :key="index">第{{index+1}}周</th>
                            </tr>
                            <tr v-for="(item,index) in list" :key="index">
                                <td class="pointer-content">{{item.member}}</td>
                                <td>{{item.titles.length}}</td>
                                <td>
                                    <template v-if="showType == 1">{{monthDay[nowYear-1]-(item.titles.length)}}</template>
                                    <template v-if="showType == 2">{{(monthWeek[nowYear-1].length) - (item.titles.length)}}</template>
                                    <template v-if="showType == 3">{{12-(item.titles.length)}}</template>
                                    <template v-if="showType == 4">{{4-(item.titles.length)}}</template>
                                    <template v-if="showType == 5">{{1-item.titles.length}}</template>
                                </td>
                                <!--季-->
                                <td class="cell-300" v-if="showType ==4" v-for="(item2,index2) in season" :key="index2">
                                    <template v-if="item.titles.find(item => item == `${nowMonth}年${item2.name}`)">
                                        <i class="icon md-check font-size-20" style="color:#11c26d"></i>
                                    </template>
                                    <template v-else>
                                        <span>-</span>
                                    </template>
                                </td>
                                <!--月-->
                                <td class="cell-200" v-if="showType ==3" v-for="item2 in 12" :key="item2">
                                    <template v-if="item.titles.find(item => item == `${nowMonth}年${item2}月`)">
                                        <i class="icon md-check font-size-20" style="color:#11c26d"></i>
                                    </template>
                                    <template v-else>
                                        <span>-</span>
                                    </template>
                                </td>
                                <!--周-->
                                <td class="cell-300" v-if="showType ==2" v-for="(item2,index2) in monthWeek[nowYear-1]" :key="index2">
                                    <template v-if="item.titles.find(item => item == item2.name)">
                                        
                                        <i class="icon md-check font-size-20" style="color:#11c26d"></i>
                                    </template>
                                    <template v-else>
                                        <span>-</span>
                                    </template>
                                </td>
                                <!--日-->
                                <td class="cell-300" v-if="showType ==1" v-for="(item2,index2) in monthWeek[nowYear-1]" :key="index2">
                                    {{item2.number}}
                                </td>
                                
                            </tr>
                        </table>
                        <div v-if="list.length === 0" class="col-md-1" style="margin: 6rem auto">
                            <img src="https://res.papitube.com/corvus/images/content-none.png" alt="" style="width: 100%">
                        </div>
                        <pagination :current_page="current_page" :method="getlist" :total_pages="total_pages"
                                    :total="total"></pagination>
                    </div>
                </div>
                </div>
        </div>
        <div class="site-action" data-plugin="actionBtn" @click="redirectBriefAdd()">
            <button type="button"  class="site-action-toggle btn-raised btn btn-success btn-floating waves-effect waves-classic">
                <i class="front-icon md-plus animation-scale-up" aria-hidden="true"></i>
                <i class="back-icon md-plus animation-scale-up" aria-hidden="true"></i>
            </button>
        </div>
    </div>
</template>
<script>
import fetch from '@/assets/utils/fetch'
import config from '@/assets/js/config'

export default {
    data(){
        return {
            list:[], 
            end_time:'',
            start_time:'',
            nowMonth:0,
            nowYear:0,
            current_page:0,
            total_pages:0,
            total:0,
            season:config.season,
            monthWeek:{},
            monthDay:[31,28,31,30,31,30,31,31,30,31,30,31],
            template_name:''
        }
    },
    mounted(){
        
    },
    watch:{
        //检测路由参数变化  调用函数
       "$route":"getlist",
    },
    computed:{
       type:function(){
            let type =  this.$route.query.type-0
            
            if(type == 3||type == 4 ||type == 5){
               return 5
            }else{
               return 3
            }
       },
       //showType  1 日 2 周 3 月 4 季 5 年
       showType:function(){
           return this.$route.query.type-0
       }, 
    },
    mounted(){
        
        
    },
    methods:{
        selectDate:function(start,end,month,year){
            this.start_time = start
            this.end_time = end
            this.nowMonth = month
            this.nowYear = year
            // console.log(this.nowYear)
            // console.log(this.nowMonth)
            this.getlist()
            
        },
        redirectBriefAdd:function(){
            this.$router.push({path:'/brief/add'})
        },
        getlist:function(page =1){
            this.template_name = this.$route.query.name
            let _this = this
            // alert(this.nowMonth)
            // alert(this.nowYear)
            this.getAllWeek(this.nowMonth)
            let data={
                template_id:this.$route.query.id,
                end_time:this.end_time,
                start_time:this.start_time
            }
           
            fetch('get',`${config.apiUrl}/review/member/statistic`,data).then((res) => {
                _this.list = res.data
                let newList = []
                if(_this.list.length>0){
                    for (let i = 0; i < _this.list.length; i++) {
                        for (let t = 0; t < _this.list[i].titles.length; t++) {
                            _this.list[i].titles[t] = _this.list[i].titles[t].split(' ')[0]
                            
                            //如果是日报 计算每周有多少天提交日报
                            if(_this.showType == 1){
                                _this.list[i].titles[t] = _this.list[i].titles[t].split('月')[1]
                                _this.list[i].titles[t] =_this.list[i].titles[t].split('日')[0]
                                _this.list[i].number = []
                                for (let g = 0; g <_this.monthWeek[_this.nowYear-1].length; g++) {
                                    _this.monthWeek[_this.nowYear-1][g].number =0
                                    if(_this.list[i].title[t]>=_this.monthWeek[_this.nowYear-1][g].startDay&&_this.list[i].title[t]<=_this.monthWeek[_this.nowYear-1][g].endDay){
                                        _this.monthWeek[_this.nowYear-1][g].number = _this.monthWeek[_this.nowYear-1][g].number+1
                                    }    
                                }
                          }
                        }

                    }
                }
                // console.log(_this.monthWeek[_this.nowMonth-1])
                // console.log(_this.list)
                
                _this.current_page=res.meta.pagination.current_page,
                _this.total_pages=res.meta.pagination.total_pages,
                _this.total=res.meta.pagination.total
            })
        },
        //获取全部周
        getAllWeek:function(year){
            // alert(year)
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
            // console.log(allWeek)
            // console.log(allWeek)
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
            // console.log(this.monthWeek)
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
    .page-main{
        background-color:#f3f4f5 !important;
    }
    tr{
        &:hover{
            background-color:#f5f5f5;
            cursor: pointer;
        }
    }
</style>




    
    