<template>
    <div class="page">
        <div class="page-header page-header-bordered">
            <h1 class="page-title">供应商管理</h1>
            <!-- <div class="page-header-actions">
                <ImportAndExport class="float-left" :type="'export'" :moduleName="'clients'" :params="exportParams">
                    <i class="iconfont icon-daochu px-5 font-size-20 pr-20 pointer-content" title="导出"
                       aria-hidden="true"></i>
                </ImportAndExport>
                <ImportAndExport class="float-left" :type="'import'" :moduleName="'clients'">
                    <i class="iconfont icon-daoru font-size-20 pointer-content" title="导入" aria-hidden="true"></i>
                </ImportAndExport>
            </div> -->
        </div>
        <router-view/>
    </div>
</template>

