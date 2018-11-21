<?php $__env->startSection('title','博主管理'); ?>
<?php $__env->startSection('body-class','dashboard'); ?>

<?php $__env->startSection('body'); ?>
    <?php echo $__env->make('layouts.top-nav', \Illuminate\Support\Arr::except(get_defined_vars(), array('__data', '__path')))->render(); ?>
    <?php echo $__env->make('layouts.left-nav', \Illuminate\Support\Arr::except(get_defined_vars(), array('__data', '__path')))->render(); ?>


    <!-- Page -->
    <div class="page" id="root">

        <div class="page-header page-header-bordered">
            <h1 class="page-title">博主管理</h1>

            <div class="page-header-actions dropdown show task-dropdown float-right">
                <i class="icon md-more font-size-24" aria-hidden="true" id="taskDropdown"
                   data-toggle="dropdown" aria-expanded="false"></i>
                <div class="dropdown-menu dropdown-menu-right task-dropdown-item" aria-labelledby="taskDropdown"
                     role="menu" x-placement="bottom-end">
                    <a class="dropdown-item" role="menuitem" @click="">导入</a>
                    <a class="dropdown-item" role="menuitem" @click="">导出</a>
                    <a class="dropdown-item" role="menuitem" @click="">分配制作人</a>
                </div>
            </div>
        </div>

        <div class="page-content container-fluid">
            <div class="panel col-md-12 clearfix py-5">
                <div class="clearfix">
                    <div class="col-md-3 example float-left">
                        <input type="text" class="form-control" id="inputPlaceholder" placeholder="请输入项目昵称"
                               style="width: 220px">
                    </div>
                    <div class="col-md-3 example float-left">
                        <selectors :options="projectStatus"
                                   :placeholder="'请选择项目状态'"></selectors>
                    </div>
                    <div class="col-md-3 example float-left">
                        <selectors :placeholder="'请选择负责人'"></selectors>
                    </div>
                    <div class="col-md-3 example float-left">
                        <button type="button" class="btn btn-default waves-effect waves-classic float-right"
                                data-toggle="modal" data-target="#customizeContent"
                                data-placement="right" title="">
                            自定义筛选
                        </button>
                    </div>
                </div>

                <div class="col-md-12">
                    <ul class="nav nav-tabs nav-tabs-line" role="tablist">
                        <li class="nav-item" role="presentation" @click="getArtists(1)">
                            <a class="nav-link active" data-toggle="tab" href="#forum-artist"
                               aria-controls="forum-base"
                               aria-expanded="true" role="tab">签约中</a>
                        </li>
                        <li class="nav-item" role="presentation" @click="getArtists(1)">
                            <a class="nav-link" data-toggle="tab" href="#forum-artist"
                               aria-controls="forum-present"
                               aria-expanded="false" role="tab">已签约</a>
                        </li>
                        <li class="nav-item" role="presentation" @click="getArtists(1)">
                            <a class="nav-link" data-toggle="tab" href="#forum-artist"
                               aria-controls="forum-present"
                               aria-expanded="false" role="tab">已解约</a>
                        </li>
                    </ul>
                </div>

                <div class="page-content tab-content nav-tabs-animate bg-white">
                    <div class="tab-pane animation-fade active" id="forum-artist" role="tabpanel">
                        <table class="table table-hover is-indent" data-plugin="selectable"
                               data-selectable="selectable">
                            <tr>
                                <th class="w-50">
                                        <span class="checkbox-custom checkbox-primary">
                                            <input class="selectable-all" type="checkbox"
                                                   @change="selectArtists('all')">
                                            <label></label>
                                        </span>
                                </th>
                                <th class="cell-300" scope="col">昵称</th>
                                <th class="cell-300" scope="col">类型</th>
                                <th class="cell-300" scope="col">微博平台粉丝数</th>
                                <th class="cell-300" scope="col">与我司签约意向</th>
                                <th class="cell-300" scope="col">沟通状态</th>
                                <th class="cell-300" scope="col">制作人</th>
                                <th class="cell-300" scope="col">录入时间</th>
                            </tr>
                            <tr v-for="artist in artistsInfo">
                                <td>
                                    <span class="checkbox-custom checkbox-primary">
                                        <input class="selectable-item" type="checkbox" :id="'row-' + artist.id"
                                               :value="artist.id" @change="selectArtists(artist.id)">
                                        <label :for="'row-' + artist.id"></label>
                                    </span>
                                </td>
                                <td class="pointer-content" @click="redirectArtistDetail(artist.id)">{{ artist.nickname }}</td>
                                <td>{{ artist.type.data.name }}</td>
                                <td>暂无</td>
                                <td>
                                    <template v-if="artist.intention">是</template>
                                    <template v-else>否</template>
                                </td>
                                <td>
                                    <template v-if="artist.communication_status">
                                        {{ papiCommunicationStatusArr.find(item => item.value ==
                                        artist.communication_status).name}}
                                    </template>
                                </td>
                                <td>
                                    <template v-if="artist.producer">
                                        {{ artist.producer.data.name }}
                                    </template>
                                </td>
                                <td>暂无</td>
                            </tr>
                        </table>
                        <pagination :current_page="current_page" :method="getArtists" :total_pages="total_pages"
                                    :total="total"></pagination>
                    </div>
                </div>

            </div>

        </div>

        <customize-filter :data="customizeInfo" @change="customize"></customize-filter>

        <div class="site-action" data-plugin="actionBtn" data-toggle="modal" data-target="#addArtist">
            <button type="button"
                    class="site-action-toggle btn-raised btn btn-success btn-floating waves-effect waves-classic">
                <i class="front-icon md-plus animation-scale-up" aria-hidden="true"></i>
                <i class="back-icon md-plus animation-scale-up" aria-hidden="true"></i>
            </button>
        </div>

        <div class="modal fade" id="addArtist" aria-hidden="true" aria-labelledby="addLabelForm"
             role="dialog" tabindex="-1">
            <div class="modal-dialog modal-simple">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" aria-hidden="true" data-dismiss="modal">
                            <i class="md-close" aria-hidden="true"></i>
                        </button>
                        <h4 class="modal-title">新增博主</h4>
                    </div>
                    <div class="modal-body">
                        <div class="example">
                            <div class="col-md-2 text-right float-left">昵称</div>
                            <div class="col-md-10 float-left pl-0">
                                <input type="text" class="form-control" placeholder="请输入昵称" v-model="artistName">
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left">平台</div>
                            <div class="col-md-10 float-left pl-0">
                                <div class="checkbox-custom checkbox-primary d-inline pr-20">
                                    <input type="checkbox" name="platform" id="platformAll" @change="changeCheckbox(1)">
                                    <label for="platformAll">全选</label>
                                </div>
                                <div class="checkbox-custom checkbox-primary d-inline pr-20">
                                    <input type="checkbox" name="platform" id="platformWeibo"
                                           @change="changeCheckbox(2)">
                                    <label for="platformWeibo">微博</label>
                                </div>
                                <div class="checkbox-custom checkbox-primary d-inline pr-20">
                                    <input type="checkbox" name="platform" id="platformDouyin"
                                           @change="changeCheckbox(3)">
                                    <label for="platformDouyin">抖音</label>
                                </div>
                                <div class="checkbox-custom checkbox-primary d-inline pr-20">
                                    <input type="checkbox" name="platform" id="platformXHS" @change="changeCheckbox(4)">
                                    <label for="platformXHS">小红书</label>
                                </div>
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left">类型</div>
                            <div class="col-md-10 float-left pl-0">
                                <selectors :options="artistTypeArr" :placeholder="'请选择类型'"
                                           @change="changeArtistType"></selectors>
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left">微博主页地址</div>
                            <div class="col-md-4 float-left pl-0">
                                <input type="text" class="form-control" v-model="weiboUrl">
                            </div>
                            <div class="col-md-2 text-right float-left">签约时微博粉丝数</div>
                            <div class="col-md-4 float-left pl-0">
                                <number-spinner @change="changeWeiboFansNum"></number-spinner>
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left">抖音ID</div>
                            <div class="col-md-4 float-left pl-0">
                                <input type="text" class="form-control" v-model="douyinId">
                            </div>
                            <div class="col-md-2 text-right float-left">签约时抖音粉丝数</div>
                            <div class="col-md-4 float-left pl-0">
                                <number-spinner @change="changeDouyinFansNum"></number-spinner>
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left">小红书链接</div>
                            <div class="col-md-4 float-left pl-0">
                                <input type="text" class="form-control" v-model="xhsUrl">
                            </div>
                            <div class="col-md-2 text-right float-left pl-0">签约时小红书粉丝数</div>
                            <div class="col-md-4 float-left pl-0">
                                <number-spinner @change="changeXHSFansNum"></number-spinner>
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left">沟通状态</div>
                            <div class="col-md-3 float-left pl-0">
                                <selectors :options="papiCommunicationStatusArr"
                                           @change="changeCommunicationType"></selectors>
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left">与我司签约意向</div>
                            <div class="col-md-5 float-left pl-0">
                                <selectors :options="yesOrNoArr" :placeholder="'请选择签约意向'"
                                           @change="changeSignIntention"></selectors>
                            </div>
                            <div class="col-md-5 float-left pl-0" v-if="!signIntention">
                                <textarea name="" rows="1" class="form-control" placeholder="请填写不签约理由"
                                          v-model="intention_desc"></textarea>
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left">是否签约其他公司</div>
                            <div class="col-md-5 float-left pl-0">
                                <selectors :options="yesOrNoArr" :placeholder="'请选择是否签约其他公司'"
                                           @change="isSignCompany"></selectors>
                            </div>
                            <div class="col-md-5 float-left pl-0" v-if="signCompany == 1">
                                <input type="text" class="form-control" placeholder="请输入已签约公司名称"
                                       v-model="signCompanyName">
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left">备注</div>
                            <div class="col-md-10 float-left pl-0">
                                <input type="text" class="form-control" placeholder="请输入备注" v-model="artistDesc">
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-sm btn-white btn-pure" data-dismiss="modal">取消</button>
                        <button class="btn btn-primary" type="submit" @click="addArtist">确定</button>
                    </div>

                </div>
            </div>
        </div>

    </div>
    <!-- End Page -->

<?php $__env->stopSection(); ?>


<?php $__env->startSection('style'); ?>
    <link rel="stylesheet" href="<?php echo e(mix('css/v1.css')); ?>">
<?php $__env->stopSection(); ?>

<?php $__env->startSection('script'); ?>

    <script src="<?php echo e(mix('js/papi.index.js')); ?>"></script>

<?php $__env->stopSection(); ?>







<?php echo $__env->make('layouts.master', \Illuminate\Support\Arr::except(get_defined_vars(), array('__data', '__path')))->render(); ?>