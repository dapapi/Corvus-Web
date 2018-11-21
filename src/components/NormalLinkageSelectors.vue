<template>

    <div class="row">

        <div class="float-left col-md-6 pl-0">
            <select id="father" title="">
                <selectorsOptions v-for="option in this.data" v-bind:id="option.id" :val="option.value"
                                  :key="option.id">
                    {{option.name}}
                </selectorsOptions>
            </select>
        </div>
        <div class="float-left col-md-6 pl-0">
            <select id="child" title="">
                <selectorsOptions v-for="option in this.item" v-bind:id="option.id" :val="option.value"
                                  :key="option.id">
                    {{option.name}}
                </selectorsOptions>
            </select>
        </div>

    </div>

</template>
<script>
    export default {
        props: ['data'],
        data() {
            return {
                item: function () {
                    return this.data[0].child
                }
            }
        },

        beforeMount() {
            this.item = this.data[0].child;
            setTimeout(() => {
                this.refresh();
            }, 0)
        },

        mounted() {
            let self = this;

            let father = $('#father');
            let child = $('#child');

            father.selectpicker().on('hidden.bs.select', function () {
                let id = $(this)[0].selectedOptions[0].id;
                self.item = self.data.find(item => item.id === parseInt(id))['child'];
                setTimeout(function () {
                    self.refresh();
                }, 0);
                self.$emit('change', 'father', $(this).val(), $(this)[0].selectedOptions[0].id);
            });

            child.selectpicker().on('hidden.bs.select', function () {
                self.$emit('change', 'child', $(this).val(), $(this)[0].selectedOptions[0].id);
            });


        },

        methods: {
            refresh() {
                $('#child').selectpicker('refresh');
            }
        }
    }
</script>

<style>
    .btn-default {
        background: white;
    }
</style>


