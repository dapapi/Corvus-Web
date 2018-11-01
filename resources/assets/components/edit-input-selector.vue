<template>
    <div class="">
        <template v-if="isEditSelect">
            <input-selectors :inputselectshow="isSelect"></input-selectors>
        </template>
        <template v-else>
            {{ content }}
        </template>
    </div>
</template>

<script>
    export default {
        name: "edit-input-selector",
        props: ['options', 'is-edit', 'content', 'is-selecting'],
        data() {
            return {
                isEditSelect: false,
                isSelect: false,
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
            },
            isSelecting(newValue) {
                this.isSelect = newValue
            }
        },
        methods: {
            changeSelect: function (value) {
                this.$emit('change', value);
            },

            changeMember: function (value) {
                console.log(value)
            },
        }
    }
</script>

<style scoped>

</style>