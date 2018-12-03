<template>
    <!-- 根据前面的select框，判断是否，根据相应条件判断是否显示后面的输入框 -->
    <div>
        <template v-if="isEdit">
            <div class="">
                <div class="col-md-6 float-left pl-0">
                    <Selectors :options="options" :content="inputContent" @change="changeSelector"></Selectors>
                </div>
                <div class="col-md-6 float-left pr-0" v-show="isInputShow">
                    <input type="text" class="form-control" v-model="context">
                </div>
            </div>
        </template>
        <template v-else>
            {{ options.find(item => item.value == inputContent).name }} - {{ content }}
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
            this.context = this.content
        },

        watch: {
            context(newValue) {
                this.$emit({key: 'value', value: newValue})
            }
        },

        methods: {
            changeSelector(value) {
                this.isInputShow = value == this.condition ? true : false
                this.$emit({key: 'condition', value: value});
            }
        }
    }
</script>

<style scoped>

</style>