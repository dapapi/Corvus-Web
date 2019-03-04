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
                            <h5 class="page-title pl-30 mb-20">仪表盘<i class="iconfont icon-xinjianmenhu pl-100"></i></h5>
                            <treeView :menus="urlData"></treeView>
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
    export default {
        name: "home",
        data() {
            return {
                urlData: [
                    {
                        id: 1,
                        name: '商务仪表盘',
                        url: '/dashboard/commerce',
                        type: 'link',
                        isSelected: false,
                        level: 1,
                    },
                ]
            }
        }
    }
</script>

<style scoped>

</style>
