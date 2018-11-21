<template>
    <nav>
        <ul class="pagination pagination-no-border">
            <template v-if="current_page !== 1">
                <li class="page-item"
                    @click="method(current_page - 1)">
                    <a class="page-link" aria-label="Next">
                        <span aria-hidden="true">«</span>
                    </a>
                </li>
            </template>
            <template v-else>
                <li class="disabled page-item">
                    <a class="page-link" aria-label="Next">
                        <span aria-hidden="true">«</span>
                    </a>
                </li>
            </template>
            <li v-for="i in showPage" @click="method(i)" :class="i === current_page?'active':''"
                class="page-item page-page">
                <a class="page-link">{{ i }}</a>
            </li>
            <li class="disabled page-item">
                <a class="page-link">
                    <span aria-hidden="true">共 {{ total }} 条</span>
                </a>
            </li>
            <template v-if="current_page !== total_pages">
                <li class="page-item"
                    @click="method(current_page + 1)">
                    <a class="page-link" aria-label="Next">
                        <span aria-hidden="true">»</span>
                    </a>
                </li>
            </template>
            <template v-else>
                <li class="disabled page-item">
                    <a class="page-link" aria-label="Next">
                        <span aria-hidden="true">»</span>
                    </a>
                </li>
            </template>
        </ul>
    </nav>
</template>
<script>
    export default {
        props: ['method', 'current_page', 'total_pages', 'total'],

        data: function () {

            return {}
        },

        computed: {
            totalPage: function () {
                return this.total_pages
            },
            showPage: function () {

                if (this.total_pages <= 10) {
                    return this.total_pages
                } else if (this.current_page <= 6 && this.total_pages > 10) {
                    return 10
                } else if (this.current_page > 6 && this.total_pages <= this.current_page + 4) {
                    let start = this.total_pages - 9;
                    let show = [];
                    for (let i = start; i < (start + 10); i++) {
                        show.push(i)
                    }
                    return show
                } else if (this.current_page > 6 && this.total_pages > this.current_page + 4) {
                    let start = this.current_page - 5;
                    let end = this.current_page + 5;
                    let show = [];
                    for (let i = start; i < end; i++) {
                        show.push(i)
                    }
                    return show
                }
            }
        },

        mounted() {
        },

        methods: {}
    }
</script>
