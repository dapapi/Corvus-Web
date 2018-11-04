<template>
    <div>
        <template v-if="isEditSelect">
            <selectors :options="this.options" @change="changeSelect"
                       ref="selector"></selectors>
        </template>
        <template v-else>
            {{ this.options.find(item => item.value == this.content).name }}
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