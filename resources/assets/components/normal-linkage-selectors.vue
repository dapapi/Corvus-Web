<template>

    <div class="clearfix example">
        <select :id="'father' + this.n" title="" class="col-md-4 pl-0 float-left">
            <selectorsOptions v-for="option in this.data" v-bind:id="option.id" :val="option.value"
                              :key="option.id">
                {{option.name}}
            </selectorsOptions>
        </select>
        <select :id="'child' + this.n" title="" class="col-md-4 pl-0 float-left">
            <selectorsOptions v-for="option in this.item" v-bind:id="option.id" :val="option.value"
                              :key="option.id">
                {{option.name}}
            </selectorsOptions>
        </select>
        <div class="col-md-4 float-left p-0">
            <input type="text" class="form-control">
            <datepicker></datepicker>
            <number-spinner></number-spinner>
        </div>
    </div>

</template>
<script>
    export default {
        props: ['data', 'n'],
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

            let father = $('#father' + self.n);
            let child = $('#child' + self.n);

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
                $('#child' + this.n).selectpicker('refresh');
            }
        }
    }
</script>

<style>
    .btn-default {
        background: white;
    }
</style>


