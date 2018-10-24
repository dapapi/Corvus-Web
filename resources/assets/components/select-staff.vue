<template>
    <div class="bg-white">
        <div class="page-nav-tabs">
            <ul class="nav nav-tabs nav-tabs-line" role="tablist">
                <li class="nav-item col-md-6" role="presentation">
                    <a class="nav-link active" data-toggle="tab" href="#forum-team"
                       aria-controls="forum-base"
                       aria-expanded="true" role="tab"> 团队 </a>
                </li>
                <li class="nav-item col-md-6" role="presentation">
                    <a class="nav-link" data-toggle="tab" href="#forum-department"
                       aria-controls="forum-present"
                       aria-expanded="false" role="tab"> 部门 </a>
                </li>
            </ul>
        </div>

        <div class="page-content tab-content nav-tabs-animate">
            <div class="tab-pane animation-fade active" id="forum-team" role="tabpanel">
                <div class="input-search">
                    <button type="submit" class="input-search-btn"><i class="icon md-search" aria-hidden="true"></i>
                    </button>
                    <input type="text" class="form-control" name="" placeholder="Search...">
                </div>

                <!--<div>-->
                <!--<div class="example" v-for="user in this.normalUsers">-->
                <!--<a class="avatar avatar-online" href="javascript:void(0)">-->
                <!--<img src="https://res.papitube.com/no-icon.png" alt="...">-->
                <!--</a>-->
                <!--{{ user.name }}-->
                <!--</div>-->
                <!--</div>-->

                <div id="exampleCustomIcons"></div>

            </div>
            <div class="tab-pane animation-fade" id="forum-department" role="tabpanel">
                department
            </div>
        </div>
    </div>
</template>

<script>
    import config from '../js/config'

    export default {
        props: [],
        data() {
            return {
                normalUsers: {},
                departmentUsers: {}
            }
        },
        mounted() {

            let self = this;
            let tree = [
                {
                    text: "Parent 1",
                    icon: "md-plus",
                    selectedIcon: 'md-folder',
                    state: {
                        selected: true,
                        checked: true,
                        expanded: true,
                    },
                    nodes: [
                        {
                            text: "Child 1",
                            nodes: [
                                {
                                    text: "Grandchild 1"
                                },
                                {
                                    text: "Grandchild 2"
                                }
                            ]
                        },
                        {
                            text: "Child 2"
                        }
                    ]
                },
                {
                    text: "Parent 2"
                },
                {
                    text: "Parent 3"
                },
                {
                    text: "Parent 4"
                },
                {
                    text: "Parent 5"
                }
            ];
            $.ajax({
                url: config.apiUrl + '/users',
                headers: config.getHeaders(),
                type: 'get',
                statusCode: config.getStatusCode()
            }).done(function (response) {
                console.log(response)
                self.normalUsers = response.data


            })

            $('#exampleCustomIcons').treeview({
                data: tree,
                levels: 3,
                silent: true
            })
        },
        methods: {}
    }
</script>

<style>

    .nav-item {
        padding: 0 !important;
        text-align: center;
    }

    button:focus {
        outline: none;
    }

    .page-content {
        padding: 15px 30px;
    }

</style>

