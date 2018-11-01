<template>
    <div>
        <template v-if="isEditSelect">
            <selectors :options="this.testOptions" @change="changeSelect"
                       ref="selector"></selectors>
        </template>
        <template v-else>
            {{ this.testOptions.find(item => item.value == this.content).name }}
        </template>
    </div>
</template>

<script>
    export default {
        name: "edit-selector",
        props: ['options', 'is-edit', 'content'],
        data() {
            return {
                isEditSelect: false,
                testOptions: [
                    {
                        name: '进行中',
                        value: 1,
                        id: 1
                    },
                    {
                        name: '已完成',
                        value: 2,
                        id: 2
                    },
                    {
                        name: '已暂停',
                        value: 3,
                        id: 3
                    },
                ]
            }
        },

        mounted() {
        },

        watch: {
            isEdit(newValue) {
                this.isEditSelect = newValue;
                if (newValue) {
                    let _this = this;
                    setTimeout(function () {
                        _this.$refs.selector.setValue(_this.content)
                    }, 0)
                } else {
                    this.$refs.selector.destroy()
                }
            }
        },
        methods: {
            changeSelect: function (value) {
                this.$emit('change', value);
            }
        }
    }
</script>

<style scoped>

</style>