<template>
    <div class="tree-view-menu">
        <Tree-view-item :menus="menus"></Tree-view-item>
    </div>
</template>
<script>
    import TreeViewItem from "./TreeViewItem";

    export default {
        name: "TreeViewMenu",
        props: {
            menus: {
                type: Array,
                required: true
            }
        },
        components: {
            TreeViewItem
        }
    }
</script>
<style scoped>
    .tree-view-menu {
        width: 100%;
        height: 85vh;
        overflow-y: auto !important;
        overflow-x: hidden;
    }

    .tree-view-menu::-webkit-scrollbar {
        display: none
    }
</style>



