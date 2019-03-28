<template>
    <div v-if="options.length > 0">
        <template v-if="isEditSelect">
            <!--是否需要changekey-->
            <selectors v-if="!changeKey" :options="options" @change="changeSelect" @valuelistener='valueListener'
                       ref="selector" :multiple="multiple" :changeKey="changeKey"></selectors>

            <selectors v-else :options="options" @select="changeSelectKey" @valuelistener='valueListener'
                       ref="selector" :multiple="multiple" :changeKey="changeKey"></selectors>
        </template>
        <template v-else>
            <template v-if="multiple && !contentHide">
                <template v-if="content.length > 0" v-for="cont in content">
                    {{ options.find(item => item.value == cont) && options.find(item => item.value == cont).name }}
                </template>
            </template>
            <template v-else>
                <template v-if="(content && !contentHide)||content===0">
                    {{options.find(item => item.value == content || item.id  == content) && options.find(item => item.value == content || item.id  == content).name }}
                </template>
            </template>
        </template>
    </div>
</template>

<script>
    export default {
        name: "EditSelector",
        props: ['options', 'is-edit', 'content', 'multiple', 'contentHide','changeKey'],
        data() {
            return {
                isEditSelect: false,
            }
        },

        mounted() {
            this.isEditSelect = this.isEdit
        },

        watch: {
            isEdit(newValue) {
                this.isEditSelect = newValue;
                if (newValue) {
                    let _this = this;
                    this.$nextTick(()=>{
                        _this.$refs.selector.setValue(_this.content)
                    })
                } else {
                    this.$refs.selector.destroy()
                }
            }
        },
        methods: {
            valueListener(value) {
                this.$emit('valuelistener', value)
            },
            changeSelect: function (value) {

                this.$emit('change', value);
            },
            //获取changekey
            changeSelectKey:function(key,value){
                this.$emit('select', key, value)
            },
            setDefaultValue:function(val){
                let _this = this;
                this.$nextTick(()=>{
                    _this.$refs.selector.setValue(val)
                })
            }
        }
    }
</script>

<style scoped>

</style>