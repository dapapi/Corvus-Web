<template>
    <div v-if="options.length > 0">
        <template v-if="isEditSelect">
            <selectors :options="this.options" @change="changeSelect"
                       ref="selector" :multiple="multiple"></selectors>
        </template>
        <template v-else>
            <template v-if="multiple">
                <template v-for="cont in content">
                    {{ options.find(item => item.value == cont).name }}
                </template>
            </template>
            <template v-else>
                {{ options.find(item => item.value == content).name }}
            </template>
        </template>
    </div>
</template>

<script>
    export default {
        name: "edit-selector",
        props: ['options', 'is-edit', 'content', 'multiple'],
        data() {
            return {
                isEditSelect: false,
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