<template>
    <div v-if="options.length > 0">
        <template v-if="isEditSelect">
            <selectors :options="options" @change="changeSelect" @valuelistener='valueListener'
                       ref="selector" :multiple="multiple"></selectors>
        </template>
        <template v-else>
            <template v-if="multiple && !contentHide">
                <template v-if="content.length > 0" v-for="cont in content">
                    {{ options.find(item => item.value == cont ).name }}
                </template>
            </template>
            <template v-else>
                <template v-if="(content && !contentHide)||content===0">
                    {{ options.find(item => item.value == content || item.id  == content).name }}
                </template>
            </template>
        </template>
    </div>
</template>

<script>
    export default {
        name: "EditSelector",
        props: ['options', 'is-edit', 'content', 'multiple', 'contentHide'],
        data() {
            return {
                isEditSelect: false,
            }
        },
        watch: {
            isEdit(newValue) {
                this.isEditSelect = newValue;
                if (newValue) {
                    let _this = this;
                    _this.$refs.selector.setValue(_this.content)
                } else {
                    setTimeout(() => {
                        if (this.$refs.selector) {
                            this.$refs.selector.destroy()
                        }
                    }, 0)
                }
            }
        },
        methods: {
            valueListener(value) {
                this.$emit('valuelistener', value)
            },
            changeSelect: function (value) {
                this.$emit('change', value);
            }
        }
    }
</script>

<style scoped>

</style>