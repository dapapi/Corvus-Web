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
                            <h5 class="page-title pl-30 mb-45">报表管理</h5>
                            <treeView :menus="urlData"></treeView>

                            <!--<div class="list-group">-->
                            <!--<router-link class="list-group-item" v-for="(item,index) in urlData"-->
                            <!--:key="index" :to="item.url">{{item.name}}-->
                            <!--</router-link>-->
                            <!--</div>-->
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
                        name: '商业漏斗分析报表',
                        url: '/reports/business',
                        type: 'link',
                        isSelected: false,
                        level: 1,
                    },
                    {
                        id: 2,
                        name: '销售线索报表',
                        url: '/reports/trail',
                        type: 'link',
                        isSelected: false,
                        level: 1,
                    },
                    {
                        id: 3,
                        name: '项目报表',
                        url: '/reports/projects',
                        type: 'link',
                        isSelected: false,
                        level: 1,
                    },
                    {
                        id: 4,
                        name: '客户报表',
                        url: '/reports/clients',
                        type: 'link',
                        isSelected: false,
                        level: 1,
                    },
                    {
                        id: 5,
                        name: '艺人报表',
                        url: '/reports/artists',
                        type: 'link',
                        isSelected: false,
                        level: 1,
                    },
                    {
                        id: 6,
                        name: '博主报表',
                        url: '/reports/blogger',
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