<template>
    <div :id="'editableSelector' + this._uid" class="editable-select-wrap edit-wrap">
        <div>
            <input type="text" title="" class="form-control" v-model="inputValue" @focus="showSelector">
        </div>
        <div class="EditSelectors col-md-12 pt-10" v-show="selectorShow">
            <div class="input-search">
                <button type="submit" class="input-search-btn"><i class="iconfont icon-buoumaotubiao13" aria-hidden="true"></i>
                </button>
                <input type="text" class="form-control" name="" placeholder="" v-model="searchKeyWord">
            </div>

            <div class="users my-10" v-for="item in options"
                 v-show="item.name.indexOf(searchKeyWord) > -1"
                 @click="selectItem(item)">
                <span class="pl-1">{{ item.name }}</span>
                <template v-if="type === 'changeCompany'">
                    <span class="float-right" v-show="getCompanyInfo.value == item.value">
                    <i class="icon md-check"></i>
                </span>
                </template>
                <template v-else>
                    <span class="float-right" v-show="selectIdArr.indexOf(item.id) > -1">
                    <i class="icon md-check"></i>
                </span>
                </template>

            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "editable-search-box",
        props: ['options', 'multiple', 'type'],
        data() {
            return {
                inputValue: '',
                selectorShow: false,
                searchKeyWord: '',
                selectIdArr: [],
                isSelected: false,
            }
        },
        watch: {
            inputValue: function (newValue) {
                this.selectorShow = !newValue;
                if (this.isSelected) {
                    this.isSelected = false;
                } else {
                    this.selectIdArr = [];
                    let data = {
                        name: newValue
                    };
                    this.$store.dispatch(this.type, data);
                }
                this.$emit('change', true)
            },
        },

        computed: {
            getCompanyInfo: function () {
                return this.$store.state.companyInfo
            }
        },

        mounted() {
            this.globalClick(this.removeSelector);
        },

        methods: {
            showSelector: function () {
                this.selectorShow = true
            },

            selectItem: function (item) {
                this.$store.dispatch(this.type, item);
                this.inputValue = item.name;
                this.isSelected = true;
                if (!this.multiple) {
                    this.selectorShow = false;
                } else {
                    this.selectIdArr.push(item.value);
                }
            },

            removeSelector: function (event) {
                let tag = document.getElementById("editableSelector" + this._uid);
                if (tag) {
                    if (!tag.contains(event.target)) {
                        this.selectorShow = false;
                    }
                }
            },
        }
    }
</script>

<style scoped>
    .EditSelectors {
        position: absolute;
        background: white;
        z-index: 10;
        border: 1px solid #e0e0e0;
    }

    .editable-select-wrap {
        position: relative;
    }
</style>