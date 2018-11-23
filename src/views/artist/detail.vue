<template>

</template>

<script>
    import Cookie from 'js-cookie';

    export default {
        mounted() {
            if (Cookie.get('companyType') === '泰洋川禾') {
                this.$router.push({path: '/artists/' + this.$route.params.id})
            } else {
                this.$router.push({path: '/blogger' + this.$route.params.id})
            }
        }
    }
</script>

<style scoped>

</style>