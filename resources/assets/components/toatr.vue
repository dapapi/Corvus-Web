<template>
    <div class="toatr-container">
        <div id="toatr" :class="toatrToggle? 'show': 'hide'">{{toatrTextToggle}}</div>
    </div>
</template>
<script>

    export default {
        // props: ['toatrToggle', 'toatrTextToggle'],
        data() {
            return {

            }
        },
        mounted() {
            console.log('data came')
            console.log(this.toatrToggle)
            console.log(this.toatrTextToggle)
        },
        methods: {

        }
    }
</script>


