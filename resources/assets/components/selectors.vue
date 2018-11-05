<template>
    <select data-plugin="selectpicker" :data-live-search="this.searchable">
        <selectorsOptions v-for="option in this.options" v-bind:id="option.id" :val="option.value" :key="option.id">
            {{option.name}}
        </selectorsOptions>
    </select>
</template>
<script>
    export default {
        props: ['options', 'searchable'],
        data() {
            return {}
        },
        mounted() {

            let self = this;

            $(this.$el).selectpicker().on('hidden.bs.select', function () {
                self.$emit('change', $(this).val(), $(this)[0].selectedOptions[0].label, $(this)[0].selectedOptions[0].id);
            });

            if (self.searchable) {
                $(self.$el).attr('data-live-search', 'true');
            }

        },
        methods: {
            destroy() {
                $(this.$el).selectpicker('destroy');
            },

            setValue(value) {
                $(this.$el).selectpicker('val', value);
            },

            refresh() {
                $(this.$el).selectpicker('refresh');
            }

        }
    }
</script>

<style>
    .btn-default {
        background: white;
    }
</style>


