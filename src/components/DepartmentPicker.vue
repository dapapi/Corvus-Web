<template>
    <div>
        <div class="dropdown-menu show" aria-labelledby="departmentPicker" role="menu" x-placement="bottom-start" style="position: absolute; transform: translate3d(-10px, 20px, 0px); top: 0px; left: 0px; will-change: transform;">
            <div class="dropdown-submenu" v-for="(item, index) in departments" :key="index">
            <a class="dropdown-item" href="javascript:void(0)" role="button" tabindex="-1" @click='clickHandler(item.id)'>{{item.name}}</a>
            <div class="dropdown-menu" style="position: absolute; transform: translate3d(-160px, 0px, 0px); top: 0px; left: 0px; will-change: transform;" role="menu">
                <a class="dropdown-item" href="javascript:void(0)" role="menuitem" tabindex="-1" v-for="(subitem, subindex) in item.departments.data" :key="subindex" @click='clickHandler(item.id)'>{{subitem.name}}</a>
            </div>
            </div>
        </div>
    </div>    
</template>

<script>
import { mapState } from 'vuex'
import fetch from '@/assets/utils/fetch.js'
import config from '@/assets/js/config'

export default {
    data(){
        return {
            departments:{},
        }
    },
    created(){
        if (this.department.length > 0) {
            this.departments = this.department
        }
    },
    computed: {
        ...mapState([
            'department',
        ]),

        _department () {
            return this.department
        },
    },
    watch: {
        _department () {
            this.departments = this.department
        }
    },
    methods:{
        clickHandler(params){
            this.$emit('departmentsget',params)
        }
    }
}
</script>

<style>

</style>
