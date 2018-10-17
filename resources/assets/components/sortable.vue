<template>
    <ul id="editable" class="list-group">
        <li class="list-group-item" v-for="info in data" :id="info.id" @click=bindClick(info.id)>
            <div style="text-align: right;margin-bottom: 10px"><span>{{info.component}}</span>
                <i class="js-remove md-close" style="margin-left: 10px" v-if="!method"></i>
            </div>

            <div class="font-weight-400">{{ info.content }}</div>

            <div v-if="info.images && info.images.length > 0" class="col-md-6" style="padding: 0;margin-top: 10px">
                <img :src="info.images[0].url" alt="" class="full-image">
            </div>

        </li>
    </ul>
</template>
<script>
    export default {
        props: ['data', 'method'],
        data() {
            return {}
        },

        computed: {
            bindClick: function () {
                if (this.method) {
                    return this.method
                } else {
                    return this.nullFunction
                }
            }
        },
        mounted() {

            let self = this;

            let editableList = Sortable.create(editable, {
                filter: '.js-remove',
                onFilter: function (event) {
                    let el = editableList.closest(event.item);
                    el && el.parentNode.removeChild(el);

                    self.$emit('change', 'delete', el);

                },

                onSort: function (event) {

                    self.$emit('change', 'sort', event);

                },
            });

        },
        methods: {
            nullFunction() {
            }
        }
    }
</script>

