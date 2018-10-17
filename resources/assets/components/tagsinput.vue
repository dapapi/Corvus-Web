<template>
    <input class="form-control" v-bind:value="val" style="border: none;">
</template>
<script>
    export default {
        props: ['val'],
        data() {
            return {}
        },
        mounted() {

            let self = this;
            $(this.$el).tagsinput({
                itemValue: 'id',
                itemText: 'name',
                tagClass: function () {
                    return 'label label-danger label-important';
                }
            });
            $(this.$el).on('itemAdded', function (e) {
                self.$emit('change', $(this).val(), 'add', e.item);
            }).on('beforeItemRemove', function (e) {
                self.$emit('change', $(this).val(), 'remove', e.item);
            });

            $('.bootstrap-tagsinput input').attr('readonly', 'readonly')

        },
        methods: {

            setValue(value) {
                $(this.$el).tagsinput('add', value);
            },

            removeAll(){
                $(this.$el).tagsinput('removeAll');
            }

        }
    }
</script>


