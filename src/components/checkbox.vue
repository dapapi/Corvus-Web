<template>
    <div>
        <input type="checkbox"/>
        <slot slot-scope="checkbox"></slot>
    </div>
</template>
<script>

export default {
    props:['label']
    
}
</script>
