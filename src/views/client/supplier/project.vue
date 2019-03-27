<template>
    <div class="animation-fade" role="tabpanel">
        <table class="table table-hover is-indent example" data-plugin="animateList"
                data-animate="fade"
                data-child="tr"
                data-selectable="selectable">
            <tr class="animation-fade"
                style="animation-fill-mode: backwards; animation-duration: 250ms; animation-delay: 0ms;">
                <th class="cell-300" scope="col">项目名称</th>
                <th class="cell-300" scope="col">项目状态</th>
                <th class="cell-300" scope="col">负责人</th>
                <th class="cell-300" scope="col">关联供应商</th>
                <th class="cell-300" scope="col">录入日期</th>
            </tr>
            <tbody>
            
            </tbody>
        </table>
        <!-- <div v-if="clientProjectsInfo.length === 0" style="margin: 6rem auto;width: 100px">
            <img src="https://res.papitube.com/corvus/images/content-none.png" alt=""
                    style="width: 100%">
        </div>
        <pagination :current_page="current_page" :method="getClientProject"
                    :total_pages="total_pages" :total="total"></pagination> -->
    </div>
</template>
