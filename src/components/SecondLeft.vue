<template>
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
                        <h5 class="page-title pl-30 mb-30">{{title}}</h5>
                        <treeView :menus="leftData"></treeView>
                    </section>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
    li {
        list-style: none
    }

    li a:hover {
        text-decoration: none;
    }

    .site-menu-sub {
        padding-left: 20px;
    }

    .menu li {
        margin: 20px 0;
    }

    .leftImg {
        transition: All 0.4s ease-in-out;
        -webkit-transition: All 0.4s ease-in-out;
        -moz-transition: All 0.4s ease-in-out;
        -o-transition: All 0.4s ease-in-out;
    }

    .anmite {
        transform: rotate(90deg);
        -ms-transform: rotate(90deg); /* IE 9 */
        -moz-transform: rotate(90deg); /* Firefox */
        -webkit-transform: rotate(90deg); /* Safari 和 Chrome */
        -o-transform: rotate(90deg);
    }

    

    .selected {
        background-color: #eee;
    }
    .list-group-a{
      display: inline-block;
      width: 100%;
      height: 100%;
      text-decoration: none;
      color: rgba(117,117,117,.9);
      padding: 13px 30px;
    }
</style>
<script>
    import fetch from '@/assets/utils/fetch'
    import config from '@/assets/js/config'
    import treeView from '@/components/ViewTree/TreeView.vue'
    import {mapState, mapGetters} from 'vuex'

    export default {
        props: {
            leftData: {
                type: Array,
                required: true
            },
            title: ''
        },
        computed: {
            ...mapState([
                'unReadMsg'
            ])
        },
        components:{
            treeView
        },
        data() {
            return {
                isShow: 1,
            }
        },
        created() {

        },
        mounted() {
            if (Cookies.get('leftId')) {
                this.isShow = Cookies.get('leftId')
            }
        },

        methods: {
            switchMenu: function (id) {
               
                this.isShow = id
                Cookies.set('leftId', id)


            }
        }
    }
</script>



