<template>
    <!-- 根据前面的select框，判断是否，根据相应条件判断是否显示后面的输入框 -->
    <div>
        <template v-if="isEdit">
            <div class="">
                <div class="col-md-6 float-left pl-0">
                    <Selectors :options="options" ref="conditionSelector" @change="changeSelector"></Selectors>
                </div>
                <div class="col-md-6 float-left pr-0" v-show="isInputShow">
                    <input type="text" class="form-control" v-model="context">
                </div>
            </div>
        </template>
        <template v-else>
            <span v-if="content">{{ options.find(item => item.value == content).name }}</span> 
            <span v-if="inputContent">- {{ inputContent }}</span>
        </template>
    </div>

</template>

<script>
    import config from "../assets/js/config";

    export default {
        name: "ConditionalInput",
        props: ['is-edit', 'input-content', 'content', 'condition'],
        data() {
            return {
                options: config.yesOrNoArr,
                context: '',
                isInputShow: false,
            }
        },
        mounted() {
            this.context = this.inputContent;
            this.isInputShow = this.content == this.condition ? true : false
        },

        watch: {
            context(newValue) {
                // console.log(newValue)
                this.$emit('change', {key: 'value', value: newValue})
            },
            isEdit(newValue) {
                if (newValue) {
                    let _this = this;
                    setTimeout(function () {
                        _this.$refs.conditionSelector.setValue(_this.content)
                        _this.isInputShow = _this.content == _this.condition ? true : false
                        _this.context = _this.inputContent;
                    }, 100)
                }
            }
        },

        methods: {
            changeSelector(value) {
                this.isInputShow = value == this.condition ? true : false
                if (!value) {
                    value = 0
                }
                this.context = '';
                this.$emit('change', {key: 'condition', value: value});
            },
            getSelectorValue(){
                // console.log(this.$refs.conditionSelector.getValue())
                return this.$refs.conditionSelector.getValue()
            }
        }
    }
</script>

<style scoped>

</style>