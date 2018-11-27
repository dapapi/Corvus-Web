<template>
    <div>
        <div class="page-content container-fluid">
             <div class="modal-body">
                        <div class="form-group row col-sm-12">
                            <select id="broadcastRangeSelector" class="col-sm-4 show-menu-arrow form-control selectpicker" v-model="provinceSelected" data-live-search='true' title="省/直辖市">
                                <option v-for="(value, index) in province" :key="value.id" >{{value.name}}</option>
                            </select>
                            <select id="broadcastTypeSelector" class="col-sm-4 selectpicker show-menu-arrow form-control" title="市/县">
                                <option v-for="i in 5" :key="i" :value=i>选项{{i}}</option>
                            </select>
                            <select id="broadcastTypeSelector" class="col-sm-4 selectpicker show-menu-arrow form-control" title="区">
                                <option v-for="i in 5" :key="i" :value=i>选项{{i}}</option>
                            </select>
                        </div>
                    </div>
        </div>
    </div>    
</template>

<script>
import provinceData from '@/assets/utils/regionsdata/province.json'
export default {
    data(){
        return{
            province:{},
            provinceSelected:''
        }
    },
    mounted() {
        this.province = provinceData
    }
}
</script>

<style>

</style>
