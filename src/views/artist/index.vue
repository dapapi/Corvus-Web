<template>

</template>

<script>
    import Cookie from 'js-cookie';

    export default {
        mounted() {
            if (Cookie.get('companyType') === '泰洋川禾') {
                this.$router.push({path: '/artists'})
            } else {
                this.$router.push({path: '/blogger'})
            }
        }
    }
</script>

<style scoped>

</style>