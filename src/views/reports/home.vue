<template>
    <div class="page page-aside-left">
        <div class="page-aside">
            <div class="page-aside-switch">
                <i class="icon wb-chevron-left" aria-hidden="true"></i>
                <i class="icon wb-chevron-right" aria-hidden="true"></i>
            </div>
            <div class="page-aside-inner page-aside-scroll scrollable is-enabled scrollable-vertical"
                 style="position: relative;">
                <div data-role="container" class="scrollable-container" style="height: 691px; width: 259px;">
                    <div data-role="content" class="scrollable-content" style="width: 259px;">
                        <section class="page-aside-section">
                            <h5 class="page-title pl-30 mb-45">报表管理</h5>
                            <div class="list-group">
                                <router-link class="list-group-item" v-for="(item,index) in urlData"
                                             :key="index" :to="item.url">{{item.name}}
                                </router-link>
                            </div>
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
                        value: 1,
                        name: '商业漏斗分析报表',
                        url: '/reports/business'
                    },
                    {
                        value: 2,
                        name: '销售线索报表',
                        url: '/reports/trail'
                    },
                    {
                        value: 3,
                        name: '项目报表',
                        url: '/reports/projects'
                    },
                    {
                        value: 4,
                        name: '客户报表',
                        url: '/reports/clients'
                    },
                    {
                        value: 5,
                        name: '艺人报表',
                        url: '/reports/artists'
                    },
                    {
                        value: 6,
                        name: '博主报表',
                        url: '/reports/blogger'
                    },

                ]
            }
        }
    }
</script>

<style scoped>

</style>