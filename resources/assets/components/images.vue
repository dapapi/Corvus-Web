<template>
    <div class="row">
        <div v-for="item in images" class="col-md-4 text-center">
            <a :href="item.url" target="_blank" >
                <img :src="item.url" alt="" style="width: 100%;">
                <p>{{ item.name }}</p>
            </a>
        </div>
    </div>
</template>
<script>
    export default {
        props: ['images'],
        data() {
            return {
                thumbImage: '?imageView2/1/w/200/h/400',
            }
        },
        mounted() {

        },
        methods: {

        }
    }
</script>
<style>

</style>