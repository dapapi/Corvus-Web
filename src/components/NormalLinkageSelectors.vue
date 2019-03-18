<template>

    <div class="row">
        <div class="float-left col-md-6 pl-0">
            <select id="father" title="" :value="resource"  
                :data-live-search="true"
            >
                <selectorsOptions v-for="(option, index) in data" v-bind:id="option.id" :index="index" :val="option.value"
                                  :key="option.id">
                    {{option.name}}
                </selectorsOptions>
            </select>
        </div>
        <div class="float-left col-md-6 pl-0">
            <select id="child" title="" :value="resourceable" ref="childSelect" :data-live-search="true">
                <selectorsOptions v-for="option in newData[index].child" v-bind:id="option.id" :val="option.value"
                                  :key="option.id">
                    {{option.name}}
                </selectorsOptions>
            </select>
        </div>

    </div>

</template>
<script>
    export default {
        props: ['data', 'resource', 'resourceable'],
        data() {
            return {
                item: function () {
                    return this.data[0].child
                },
                index: 0,
                newData: this.data
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
                // self.item = self.data.find(item => item.id === parseInt(id))['child'];
                self.index = $(this)[0].selectedOptions[0].index
                self.$emit('change', 'father', $(this).val(), $(this)[0].selectedOptions[0].id, $(this)[0].selectedOptions[0].index);
            });

            child.selectpicker().on('hidden.bs.select', function () {
                self.$emit('change', 'child', $(this).val(), $(this)[0].selectedOptions[0].id);
            });

            this.$el.querySelectorAll('div.dropdown-menu')[1].addEventListener('scroll', (e) => {
                const scrollTop = e.target.scrollTop
                const clientHeight = e.target.clientHeight
                const scrollHeight = e.target.scrollHeight
                if (scrollTop + clientHeight >= scrollHeight) {
                    this.$emit('loadMore')
                }
            }, true)
            
        },

        watch: {
            data (val) {
                this.newData = val
            }
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


