<template>
    <div class="input-group date">
    </div> 
</template>
<script>
    export default {
        props: ['placeholder', 'changeKey', 'startDate', 'default', 'clear'],
        data() {
            return {}
        },
        mounted() {

            let self = this;

            $(this.$el).datepicker({
                format: "yyyy-mm-dd",
                language: "zh-CN",
                autoclose: true
            }).on("changeDate", function () {
                self.$emit('change', $(this)[0].children[0].value);
                if (self.changeKey) {
                    self.$emit('select', self.changeKey, $(this)[0].children[0].value)
                }
            });
            if (this.default) {
                this.setValue(this.default)
            }

        },
        watch: {
            /**
             * 设置时间选择范围，一般用于设置截止时间大于开始时间
             * */
            startDate(newValue) {
                // alert(555)
                $(this.$el).datepicker('setStartDate', newValue);
            },
            clear: function (value) {
                if (value === true) {
                    this.setValue('')
                }
            }
        },
        methods: {
            /**
             * 在清空选择时间时，可设置value为空
             * */
            setValue(value) {
                $(this.$el).datepicker('update', value);
            },

            destroy() {
                $(this.$el).datepicker('destroy');
            },
            //输入日期时获取值
            getInputValue() {
                // console.log($('#dateInput').val())
                this.$emit('change', $('#dateInput').val());
            }
        }
    }
</script>


