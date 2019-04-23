<!-- 使用说明 by王骁-->
<!-- 本组件可通过三级关联下拉菜单设置省/市/区数据 -->
<!-- 本组件依赖BootStrap框架和 @/assets/utils/regionsdata/ 下的数据文件-->

<!-- 使用方法 -->
<!-- 本组件无需传入参数，且根据选择返回一个对象 -->
<!-- 返回数据请在父组件内进行接收 -->
<template>
    <div>
        <div class="page-content container-fluid">
            <div class="modal-body">
                <div class="col-md-12 px-0">
                    <select id="provinceSelector" :class="hideArea ? 'col-md-6':'col-md-4' " class="show-menu-arrow selectpicker pl-0"
                            v-model="provinceSelected" data-live-search='true' title="省/直辖市">
                        <option v-for="value in province" :key="value.id">{{value.name}}</option>
                    </select>
                    <select id="citySelector" :class="hideArea ? 'col-md-6':'col-md-4'" class="selectpicker show-menu-arrow pl-0"
                            :disabled='JSON.stringify(city)=="{}"' v-model="citySelected" data-live-search='true'
                            title="市/县">
                        <option v-for="value in city" :key="value.id">{{value.name}}</option>
                    </select>

                    <select v-if="!hideArea" id="areaSelector" class="col-md-4 selectpicker show-menu-arrow px-0"
                            :disabled='!citySelectedId' v-model="areaSelected" data-live-search='true' title="区">
                        <option v-for="value in area" :key="value.id">{{value.name}}</option>
                    </select>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import provinceData from '@/assets/utils/regionsdata/province.json'
    import cityData from '@/assets/utils/regionsdata/city.json'
    import areaData from '@/assets/utils/regionsdata/area.json'

    export default {
        props: ['provinceVal', 'cityVal', 'areaVal', 'hideArea'], // 默认选中的省、市、区
        data() {
            return {
                province: {},                //省级数据
                provinceSelected: '',        //一级列表选项
                provinceSelectedId: '',      //一级列表id
                city: {},                    //市级数据
                citySelected: '',            //二级列表选项
                citySelectedId: '',          //二级列表id
                area: {},                    //区级数据
                areaSelected: '',            //三级列表选项
                areaSelectedId: ''
            }
        },
        created() {
            //省级数据初始化
            this.province = provinceData
        },

        mounted() {
            // 在某些情况下，组件渲染异常，所以重新加载一次 by 鲍庆鑫
            $('#provinceSelector').selectpicker('render');
            $('#citySelector').selectpicker('render');
            $('#areaSelector').selectpicker('render');
            // 设置默认选中数据
            this.setRegion()
        },
        methods: {
            //清理数据
            clearData() {
                this.city = {}
                this.citySelected = ''
                this.citySelectedId = ''
                this.area = {}
                this.areaSelected = ''
                this.areaSelectedId = ''
            },
            //获取一级列表id
            getProvinceId(ref) {
                for (const key in this.province) {
                    if (this.province[key].name == ref) {
                        this.provinceSelectedId = this.province[key].id
                    }
                }
            },
            //获取二级列表id
            getCityId(ref) {
                for (const key in this.city) {
                    if (this.city[key].name == ref) {
                        this.citySelectedId = this.city[key].id
                    }
                }
            },
            //获取三级列表id
            getAreaId(ref) {
                for (const key in this.area) {
                    if (this.area[key].name == ref) {
                        this.areaSelectedId = this.area[key].id
                    }
                }
            },
            //设置二级列表数据
            setCity() {
                this.city = cityData[this.provinceSelectedId]
            },
            //设置三级列表数据
            setArea() {
                this.area = areaData[this.citySelectedId]
            },
            sendData() {
                //设置返回数据格式
                let setAreaData = {
                    'province': {
                        name: this.provinceSelected,
                        id: this.provinceSelectedId
                    },
                    'city': {
                        name: this.citySelected,
                        id: this.citySelectedId
                    }
                }
                if (!this.hideArea) {
                    setAreaData.area = {
                        name: this.areaSelected,
                        id: this.areaSelectedId
                    }
                }
                //推送返回数据至父组件
                this.$emit('setAreaData', setAreaData)
            },
            // 设置默认选中地区 by 鲍庆鑫
            setRegion() {
                if (!this.provinceVal || !this.cityVal || !this.areaVal) {
                    return
                }
                this.provinceSelected = this.provinceVal
                this.getProvinceId(this.provinceSelected)
                this.setCity()

                $('#areaSelector').selectpicker('val', this.areaSelected);
            },
            // 重置
            reset() {
                this.provinceSelected = ''
                this.provinceSelectedId = ''
                this.city = {}
                this.citySelected = ''
                this.citySelectedId = ''
                this.area = {}
                this.areaSelected = ''
                this.areaSelectedId = ''
                this.$nextTick(() => {
                    $('#provinceSelector').selectpicker('val', '')
                    $('#citySelector').selectpicker('val', '');
                    $('#areaSelector').selectpicker('val', '');
                })
            },
        },
        watch: {
            //监听一级列表变更
            provinceSelected: function (val, oldval) {
                if (val !== oldval) {
                    this.clearData()
                    //调用获取id
                    this.getProvinceId(val)
                    //异步更新二级列表
                    this.$nextTick(() => {
                        //bootstrap方法更新二级列表
                        $('#citySelector').selectpicker('render');
                        $('#citySelector').selectpicker('refresh');
                    })
                    this.sendData()
                }
                //调用设置数据
                this.setCity()
            },
            //监听二级列表变更disabled
            citySelected: function (val, oldval) {
                if (val !== oldval) {
                    this.getCityId(val)
                    this.$nextTick(() => {
                        $('#areaSelector').selectpicker('render');
                        $('#areaSelector').selectpicker('refresh');
                    })
                    this.sendData()
                }
                this.setArea()
            },
            areaSelected: function (val, oldval) {
                if (val !== oldval) {
                    this.getAreaId(val)
                    this.sendData()
                }
            }
        }
    }
</script>

<style>

</style>
