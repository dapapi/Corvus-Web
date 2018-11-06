<template>
    <div :id="'editableSelector' + this._uid" class="editable-select-wrap edit-wrap">
        <div>
            <input type="text" title="" class="form-control" v-model="inputValue" @focus="showSelector">
        </div>
        <div class="edit-selectors col-md-12 pt-10" v-show="selectorShow">
            <div class="input-search">
                <button type="submit" class="input-search-btn"><i class="icon md-search" aria-hidden="true"></i>
                </button>
                <input type="text" class="form-control" name="" placeholder="" v-model="searchKeyWord">
            </div>

            <div class="users my-10" v-for="item in options"
                 v-show="item.name.indexOf(searchKeyWord) > -1"
                 @click="selectItem(item.id, item.name, item.grade)">
                <span class="pl-1">{{ item.name }}</span>
                <span class="float-right" v-show="selectIdArr.indexOf(item.id) > -1">
                    <i class="icon md-check"></i>
                </span>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "editable-search-box",
        props: ['options', 'multiple'],
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
                    this.$emit('change', newValue)
                }
            },
        },
        mounted() {
            this.globalClick(this.removeSelector);
        },

        methods: {
            showSelector: function () {
                this.selectorShow = true
            },

            selectItem: function (itemId, itemName, itemGrade) {
                this.inputValue = itemName;
                this.isSelected = true;
                this.$emit('change', itemName, itemId, itemGrade);
                if (!this.multiple) {
                    this.selectorShow = false;
                    this.selectIdArr = [itemId];
                } else {
                    this.selectIdArr.push(itemId);
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
    .edit-selectors {
        position: absolute;
        background: white;
        z-index: 10;
        border: 1px solid #e0e0e0;
    }

    .editable-select-wrap {
        position: relative;
    }
</style>