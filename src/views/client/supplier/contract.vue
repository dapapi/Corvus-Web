<template>
    <div class="animation-fade" id="forum-contract" role="tabpanel">
        <table class="table table-hover example"
                data-child="tr">
            <tr>
                <th class="cell-300" scope="col">合同编号</th>
                <th class="cell-300" scope="col">项目名称</th>
                <th class="cell-300" scope="col">艺人</th>
                <th class="cell-300" scope="col">合同类型</th>
                <th class="cell-300" scope="col">创建人</th>
            </tr>
            <tbody>
            
            
            </tbody>
        </table>
        <!-- <div style="margin: 6rem auto;width: 100px"
                v-if="clientContractsInfo.length === 0">
            <img src="https://res.papitube.com/corvus/images/content-none.png" alt=""
                    style="width: 100%">
        </div>
        <pagination :current_page="current_page" :method="getClientContract"
                    :total_pages="total_pages" :total="total"></pagination> -->
    </div>
</template>
<script>

//没有接口
// import {mapActions,mapState} from 'vuex'
import fetch from '../../../assets/utils/fetch.js'
import config from '../../../assets/js/config'
export default {
    data(){
        return {

        }
    },
    mounted(){

    },
    methods:{

    }
}
</script>
