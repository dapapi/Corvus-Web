<template>  
    <option v-bind:value="val">
        <slot></slot>
    </option>
</template> 
<script>
    export default {
        props: ['val'],
        data() {
            return { 
                value: ''
            }
        },
    }
</script>