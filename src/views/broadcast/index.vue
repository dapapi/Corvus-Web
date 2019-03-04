<template>
    <div class="page page-aside-left">
        <div class="page-aside">
            <div class="page-aside-switch">
                <i class="wb-chevron-left" aria-hidden="true"></i>
                <i class="wb-chevron-right" aria-hidden="true"></i>
            </div>
            <div class="page-aside-inner page-aside-scroll scrollable is-enabled scrollable-vertical"
                 style="position: relative;">
                <div data-role="container" class="scrollable-container" style="height: 691px; width: 259px;">
                    <div data-role="content" class="scrollable-content" style="width: 259px;">
                        <section class="page-aside-section">
                            <h5 class="page-title pl-30 mb-45">公告</h5>
                            <treeView :menus="leftData"></treeView>
                        </section>
                    </div>
                </div>
                <div class="scrollable-bar scrollable-bar-vertical is-disabled scrollable-bar-hide" draggable="false">
                    <div class="scrollable-bar-handle"></div>
                </div>
            </div>
        </div>
        <router-view/>
    </div>
</template>

<script>
    import SecondLeft from '@/components/SecondLeft.vue'
    export default {
        components: {
            SecondLeft
        },
        data(){
            return{
                leftData:[{
                    id:0,
                    level:1,
                    name:"我接收的",
                    type:"link",
                    url:"/broadcast/receive",

                },{
                    id:1,
                    level:1,
                    name:"我发布的",
                    type:"link",
                    url:"/broadcast/send",
                }]
            }
        }
    }
</script>
<style scoped>
    /* .page-aside{
        overflow: hidden !important;
        position: fixed;
        left: 100px;
    } */
</style>

