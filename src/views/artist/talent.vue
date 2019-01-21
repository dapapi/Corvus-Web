 <template>
   <div class="page">
        <Loading :is-loading="isLoading"></Loading>
        <div class="page-header page-header-bordered">
            <h1 class="page-title">Talent</h1>

            <div class="page-header-actions dropdown show task-dropdown float-right" style="z-index:1000;right:50px">
                <i class="iconfont icon-gengduo1 font-size-24" aria-hidden="true" id="taskDropdown"
                   data-toggle="dropdown" aria-expanded="false"></i>
                <div class="dropdown-menu dropdown-menu-right task-dropdown-item" aria-labelledby="taskDropdown"
                    role="menu" x-placement="bottom-end" v-if="!isShow">  
                    <import-and-export :type="'import'" :moduleName="'bloggers'">
                        <a class="dropdown-item" role="menuitem">导入</a>
                    </import-and-export>
                    <import-and-export :type="'export'" :moduleName="'bloggers'">
                        <a class="dropdown-item" role="menuitem">导出</a>
                    </import-and-export>
                    <a class="dropdown-item" role="menuitem" data-toggle="modal"
                       :data-target="selectedArtistsArr.length>0&&'#giveProducer'" @click="judge">分配制作人</a>
                </div>
                <div class="dropdown-menu  dropdown-menu-right task-dropdown-item" aria-labelledby="taskDropdown"
                    role="menu" x-placement="bottom-end" v-if="isShow">
                    <!-- <import-and-export :type="'import'" :moduleName="'bloggers'">
                        <a class="dropdown-item" role="menuitem">导入</a>
                    </import-and-export>
                    <import-and-export :type="'export'" :moduleName="'bloggers'">
                        <a class="dropdown-item" role="menuitem">导出</a>
                    </import-and-export> -->
                    <a class="dropdown-item" role="menuitem" data-toggle="modal" data-target="#giveBroker"
                       @click="changeMember(1)">分配经理人</a>
                    <a class="dropdown-item" role="menuitem" data-toggle="modal" data-target="#giveBroker"
                       @click="changeMember(2)">分配宣传人</a>
                </div>
            </div>
        </div>

        <div class="page-content container-fluid">
            <div class="panel col-md-12 clearfix py-5">
                <div class="col-md-12">
                    <ul class="nav nav-tabs nav-tabs-line" role="tablist" style="position: relative;">
                        <li class="nav-item" role="presentation">
                            <a class="nav-link" data-toggle="tab" href="#forum-artist"
                               aria-controls="forum-base"
                               aria-expanded="true" role="tab" :class="isShow?'active':''" @click="tab(0)">艺人</a>
                        </li>
                        <li class="nav-item" role="presentation" >
                            <a class="nav-link" data-toggle="tab" href="#forum-blogger"
                               aria-controls="forum-present"
                               aria-expanded="false" role="tab" :class="!isShow?'active':''" @click="tab(1)">博主</a>
                        </li>
                        <i  v-if="isShow" style="position: absolute;right:10px;top:10px;color: rgb(0, 176, 255);font-style: normal;" @click="getArtists(1,1)">签约中</i>
                        <i  v-if="!isShow" style="position: absolute;right:10px;top:10px;color: rgb(0, 176, 255);font-style: normal;" @click="getBlogger(1,1)">签约中</i>
                    </ul>
                </div>
              
                <div class="tab-content nav-tabs-animate bg-white">
                    <div class="tab-pane animation-fade" id="forum-artist" role="tabpanel" :class="isShow?'active':''">
                        <div class="clearfix my-20">
                            <div class="col-md-3 example float-left">
                                <input type="text" v-model="listData.name" class="form-control" id="inputPlaceholder"
                                    placeholder="请输入姓名"
                                    @blur="getArtists">
                            </div>
                            <div class="col-md-3 example float-left">
                                <selectors :options="artistStatusArr" placeholder="请选择艺人沟通状态" @change="getStatus"></selectors>
                            </div>
                            <div class="col-md-3 example float-left">
                                <selectors :options="signState" placeholder="请选择签约状态" @change="getSource"></selectors>
                            </div>
                            <!--<div class="col-md-3 example float-left">-->
                            <!--<button type="button" class="btn btn-default waves-effect waves-classic float-right"-->
                            <!--data-toggle="modal" data-target="#customizeContent"-->
                            <!--data-placement="right" title="">-->
                            <!--自定义筛选-->
                            <!--</button>-->
                            <!--</div>-->
                        </div>
                        <table class="table table-hover is-indent ml-5" data-plugin="selectable"
                               data-selectable="selectable">
                            <tr v-if="artistsInfo.length>0">
                                <th class="w-50">
                                    <span class="checkbox-custom checkbox-primary">
                                        <input class="selectable-all" type="checkbox"
                                               @change="selectArtists('all')" v-model="selectAllStars">
                                        <label></label>
                                    </span>
                                </th>
                                <th class="cell-300" scope="col">姓名</th>
                                <th class="cell-300" scope="col" v-if="artistsInfo.find(item=>item.sign_contract_status==1)">年龄</th>
                                <th class="cell-300" scope="col" v-if="artistsInfo.find(item=>item.sign_contract_status!==1)">微博粉丝</th>
                                <th class="cell-300" scope="col" v-if="artistsInfo.find(item=>item.sign_contract_status==1)">艺人来源</th>
                                <th class="cell-300" scope="col" v-if="artistsInfo.find(item=>item.sign_contract_status==1)">沟通状态</th>
                                <th class="cell-300" scope="col" v-if="artistsInfo.find(item=>item.sign_contract_status!==1)">类型</th>
                                <th class="cell-300" scope="col" v-if="artistsInfo.find(item=>item.sign_contract_status==2)">签约日期</th>
                                <!-- <th class="cell-300" scope="col" v-if="artistsInfo.find(item=>item.sign_contract_status==2)">合同起始日</th>
                                <th class="cell-300" scope="col" v-if="artistsInfo.find(item=>item.sign_contract_status==3)">合同终止日</th> -->
                                <th class="cell-300" scope="col">录入时间</th>
                                <th class="cell-300" scope="col">最后跟进时间</th>
                            </tr>
                            <tr v-if="artistsInfo.length==0">
                                <th class="w-50">
                                    <span class="checkbox-custom checkbox-primary">
                                        <input class="selectable-all" type="checkbox"
                                               @change="selectArtists('all')" v-model="selectAllStars">
                                        <label></label>
                                    </span>
                                </th>
                                <th class="cell-300" scope="col">姓名</th>
                                <th class="cell-300" scope="col">微博粉丝</th>
                                <th class="cell-300" scope="col">艺人来源</th>
                                <th class="cell-300" scope="col">签约日期</th>
                                <th class="cell-300" scope="col">录入时间</th>
                                <th class="cell-300" scope="col">最后跟进时间</th>
                            </tr>
                            <tbody>

                            <tr v-for="(artist,index) in artistsInfo" :key="index" class="pointer-content">
                                <td>
                                    <span class="checkbox-custom checkbox-primary">
                                        <input class="selectable-item" type="checkbox" :id="'row-' + artist.id"
                                               :value="artist.id" @change="selectArtists(artist.id)">
                                        <label :for="'row-' + artist.id"></label>
                                    </span>
                                </td>
                                <td @click="redirectArtistDetail(artist.id)">{{ artist.name }}</td>
                                <td @click="redirectArtistDetail(artist.id)">{{artist.birthday|jsGetAge}}</td>
                                <td @click="redirectArtistDetail(artist.id)">
                                    <template v-if="artist.source">
                                            <span :style="'color:' + artistSourceArr.find(item => item.value == artist.source).color">
                                                {{ artistSourceArr.find(item => item.value == artist.source).name}}
                                            </span>
                                    </template>
                                </td>
                                <td @click="redirectArtistDetail(artist.id)">
                                    <template v-if="artist.communication_status">
                                            <span :style="{color:taiyangCommunicationStatusArr.find(item => item.value ==
                                                    artist.communication_status).color}">
                                                 {{ taiyangCommunicationStatusArr.find(item => item.value ==
                                                    artist.communication_status).name}}
                                            </span>

                                    </template>
                                </td>
                                <td @click="redirectArtistDetail(artist.id)">{{artist.created_at}}</td>
                                <td @click="redirectArtistDetail(artist.id)">{{artist.updated_at}}</td>
                            </tr>
                            </tbody>

                        </table>
                        <div v-if="artistsInfo.length === 0" style="margin: 6rem auto;width: 100px">
                            <img src="https://res.papitube.com/corvus/images/content-none.png" alt=""
                                 style="width: 100%">
                        </div>
                        <pagination :current_page="current_page" :method="getArtists" :total_pages="total_pages"
                                    :total="total" v-if="isShow" class="mb-50"></pagination>
                    </div>
                    <div class="tab-pane animation-fade" id="forum-blogger" role="tabpanel" :class="!isShow?'active':''">
                        <div class="clearfix my-20">
                            <div class="col-md-3 example float-left">
                                <input type="text" class="form-control" id="inputPlaceholder" placeholder="请输入博主昵称"
                                    v-model="blogName" @blur='getBlogger()'>
                            </div>
                            <div class="col-md-3 example float-left">
                                <selectors :options="papiCommunicationStatusArr" @change="CommunicationStatus"
                                        placeholder="请选择沟通状态"></selectors>
                            </div>
                            <div class="col-md-3 example float-left">
                                <selectors :options="signState" @change="typeFilter" placeholder="请选择签约状态"></selectors>
                            </div>
                            <!-- <div class="col-md-3 example float-left">
                                <button type="button" class="btn btn-default waves-effect waves-classic float-right"
                                data-toggle="modal" data-target="#customizeContent"
                                data-placement="right" title="">
                                自定义筛选
                                </button>
                            </div> -->
                        </div>
                        <table class="table table-hover is-indent ml-5" data-plugin="selectable"
                               data-selectable="selectable">
                            <tr v-if="bloggerInfo.length>0">
                                <th class="w-50">
                                        <span class="checkbox-custom checkbox-primary">
                                            <input class="selectable-all" type="checkbox"
                                                   @change="selectArtists('all')" v-model="selectAllBlogger">
                                            <label></label>
                                        </span>
                                </th>
                                <th class="cell-300" scope="col" v-if="bloggerInfo.find(item=>item.sign_contract_status==1)">昵称</th>
                                <th class="cell-300" scope="col" v-if="bloggerInfo.find(item=>item.sign_contract_status!==1)">姓名</th>
                                <th class="cell-300" scope="col" v-if="bloggerInfo.find(item=>item.sign_contract_status!==1)">微博粉丝</th>
                                <th class="cell-300" scope="col" v-if="bloggerInfo.find(item=>item.sign_contract_status==1)">类型</th>
                                <th class="cell-300" scope="col" v-if="bloggerInfo.find(item=>item.sign_contract_status==1)">沟通状态</th>
                                <th class="cell-300" scope="col" v-if="bloggerInfo.find(item=>item.sign_contract_status==1)">制作人</th>
                                <th class="cell-300" scope="col" v-if="bloggerInfo.find(item=>item.sign_contract_status!==1)">类型</th>
                                <th class="cell-300" scope="col" v-if="bloggerInfo.find(item=>item.sign_contract_status==2)">签约日期</th>
                                <!-- <th class="cell-300" scope="col" v-if="bloggerInfo.find(item=>item.sign_contract_status==2)">合同起始日</th>
                                <th class="cell-300" scope="col" v-if="bloggerInfo.find(item=>item.sign_contract_status==3)">合同终止日</th> -->
                                <th class="cell-300" scope="col">录入时间</th>
                                <th class="cell-300" scope="col">最后跟进时间</th>
                            </tr>
                            <tr v-if="bloggerInfo.length==0">
                                <th class="w-50">
                                    <span class="checkbox-custom checkbox-primary">
                                        <input class="selectable-all" type="checkbox"
                                               @change="selectArtists('all')" v-model="selectAllStars">
                                        <label></label>
                                    </span>
                                </th>
                                <th class="cell-300" scope="col">姓名</th>
                                <th class="cell-300" scope="col">微博粉丝</th>
                                <th class="cell-300" scope="col">艺人来源</th>
                                <th class="cell-300" scope="col">签约日期</th>
                                <th class="cell-300" scope="col">录入时间</th>
                                <th class="cell-300" scope="col">最后跟进时间</th>
                            </tr>
                            <tbody>

                            <tr v-for="artist in bloggerInfo" :key="artist.id" class="pointer-content">
                                <td>
                                    <span class="checkbox-custom checkbox-primary">
                                        <input class="selectable-item" type="checkbox" :id="'row-' + artist.id"
                                               :value="artist.id" @change="selectArtists(artist.id)">
                                        <label :for="'row-' + artist.id"></label>
                                    </span>
                                </td>
                                <td @click="redirectBolggerDetail(artist.id)">{{ artist.nickname }}</td>
                                <td @click="redirectBolggerDetail(artist.id)">{{ artist.type.data.name }}</td>
                                <td @click="redirectBolggerDetail(artist.id)">
                                    <template v-if="artist.communication_status">
                                        <span :style="{color:papiCommunicationStatusArr.find(item => item.value ==
                                            artist.communication_status).color}">
                                            {{ papiCommunicationStatusArr.find(item => item.value ==
                                            artist.communication_status).name}}
                                        </span>

                                    </template>
                                </td>
                                <td @click="redirectBolggerDetail(artist.id)">
                                    <span v-for="(v,index) in artist.publicity.data" :key="index">
                                        {{v.name}}
                                    </span>
                                </td>
                                <td @click="redirectBolggerDetail(artist.id)">{{artist.created_at}}</td>
                                <td v-for="(v,index) in artist.operatelogs.data" :key="index"
                                    @click="redirectBolggerDetail(artist.id)">{{v.created_at}}
                                </td>
                            </tr>

                            </tbody>

                        </table>
                        <div style="margin: 6rem auto;width: 100px" v-if="bloggerInfo.length==0">
                            <img src="https://res.papitube.com/corvus/images/content-none.png" alt=""
                                 style="width: 100%">
                        </div>
                        <pagination :current_page="Bcurrent_page" :method="getBlogger" :total_pages="Btotal_pages"
                                    :total="Btotal" v-if="!isShow" class="mb-50"></pagination>
                        
                    </div>
                </div>

            </div>

        </div>

        <customize-filter :data="customizeInfo" @change="customize"></customize-filter>

        <div class="site-action" data-plugin="actionBtn" data-toggle="modal" data-target="#addBolgger" v-if="!isShow">
            <button type="button"
                    class="site-action-toggle btn-raised btn btn-success btn-floating waves-effect waves-classic">
                <i class="front-icon iconfont icon-tianjia1 animation-scale-up" aria-hidden="true"
                   style="font-size:30px"></i>
                <i class="back-icon iconfont icon-tianjia1 animation-scale-up" aria-hidden="true"
                   style="font-size:30px"></i>
            </button>
        </div>
        <div class="modal fade" id="addBolgger" aria-hidden="true" aria-labelledby="addLabelForm"
             role="dialog" tabindex="-1" data-backdrop="static">
            <div class="modal-dialog modal-simple">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" aria-hidden="true" data-dismiss="modal">
                            <i class="iconfont icon-guanbi" aria-hidden="true"></i>
                        </button>
                        <h4 class="modal-title">新增博主</h4>
                    </div>
                    <div class="modal-body">
                        <div class="example">
                            <div class="col-md-2 text-right float-left require">昵称</div>
                            <div class="col-md-10 float-left pl-0">
                                <input type="text" class="form-control" placeholder="请输入昵称" v-model="bolggerName">
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left require">平台</div>
                            <div class="col-md-10 float-left pl-0">
                                <CheckboxGroup :optionData="platformLists" @change="changeCheckbox" :isLine="true">
                                    <template slot-scope="scope">
                                        <span>{{scope.row.name}}</span>
                                    </template>
                                </CheckboxGroup>
                            </div>
                        </div>

                        <div class="example" v-show="platformType.find(item => item ==1)">
                            <div class="col-md-2 text-right float-left">微博主页地址</div>
                            <div class="col-md-4 float-left pl-0">
                                <input type="text" class="form-control" v-model="star_weibo_infos.url">
                            </div>
                            <div class="col-md-2 text-right float-left">签约时微博粉丝数</div>
                            <div class="col-md-4 float-left pl-0">
                                <number-spinner @change="changeWeiboFansNum" style="width:130px"
                                                ref="weibo"></number-spinner>
                            </div>
                        </div>
                        <div class="example" v-show="platformType.find(item => item ==2)">
                            <div class="col-md-2 text-right float-left">抖音ID</div>
                            <div class="col-md-4 float-left pl-0">
                                <input type="text" class="form-control" v-model="star_douyin_infos.url">
                            </div>
                            <div class="col-md-2 text-right float-left">签约时抖音粉丝数</div>
                            <div class="col-md-4 float-left pl-0">
                                <number-spinner @change="changeDouyinFansNum" style="width:130px"
                                                ref="douyin"></number-spinner>
                            </div>
                        </div>
                        <div class="example" v-show="platformType.find(item => item ==3)">
                            <div class="col-md-2 text-right float-left">小红书链接</div>
                            <div class="col-md-4 float-left pl-0">
                                <input type="text" class="form-control" v-model="star_xiaohongshu_infos.url">
                            </div>
                            <div class="col-md-2 text-right float-left pl-0">签约时小红书粉丝数</div>
                            <div class="col-md-4 float-left pl-0">
                                <number-spinner @change="changeXHSFansNum" style="width:130px"
                                                ref="xiaohongshu"></number-spinner>
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left require">类型</div>
                            <div class="col-md-10 float-left pl-0">
                                <selectors :options="artistTypeArr" @change="changeArtistType"
                                           ref="papitype"></selectors>
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left require">沟通状态</div>
                            <div class="col-md-10 float-left pl-0">
                                <selectors :options="papiCommunicationStatusArr"
                                           @change="changeCommunicationType" ref="communicationType"></selectors>
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left require">与我司签约意向</div>
                            <div class="col-md-5 float-left pl-0">
                                <selectors :options="yesOrNoArrs" @change="changeSignIntention"
                                           ref="signIntention"></selectors>
                            </div>
                            <div class="col-md-5 float-left pl-0" v-if="signIntention === '0'">
                                <textarea name="" rows="1" class="form-control" placeholder="请填写不签约理由"
                                          v-model="intention_desc"></textarea>
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left require">是否签约其他公司</div>
                            <div class="col-md-5 float-left pl-0">
                                <selectors :options="yesOrNoArrs" @change="isSignCompany" ref="isSign"></selectors>
                            </div>
                            <div class="col-md-5 float-left pl-0" v-if="signCompany == 1">
                                <input type="text" class="form-control" placeholder="请输入已签约公司名称"
                                       v-model="signCompanyName">
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left">头像</div>
                            <div class="col-md-5 float-left pl-0">
                                <Upload @change='getUploadUrl' class="upload-image">
                                    <div class="puls" :style="{ backgroundImage: 'url(' + uploadUrl + ')' }"
                                         v-if="uploadUrl">
                                    </div>
                                    <div v-if="!uploadUrl" class="addMember-trigger-button addMember-trigger-left"><i
                                            class="iconfont icon-tianjia"></i></div>
                                </Upload>
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
                        <button class="btn btn-primary" type="submit" @click="addBolgger">确定</button>
                    </div>

                </div>
            </div>
        </div>
        <div class="site-action" data-plugin="actionBtn" data-toggle="modal" data-target="#addArtist" v-if="isShow">
            <button type="button"
                    class="site-action-toggle btn-raised btn btn-success btn-floating waves-effect waves-classic">
                <i class="front-icon iconfont icon-tianjia1 animation-scale-up" aria-hidden="true"
                   style="font-size:30px"></i>
                <i class="back-icon iconfont icon-tianjia1 animation-scale-up" aria-hidden="true"
                   style="font-size:30px"></i>
            </button>
        </div>
        <div class="modal fade" id="addArtist" aria-hidden="true" aria-labelledby="addLabelForm"
             role="dialog" tabindex="-1" data-backdrop="static">
            <div class="modal-dialog modal-simple">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" aria-hidden="true" data-dismiss="modal" @click="cancleData">
                            <i class="iconfont icon-guanbi" aria-hidden="true"></i>
                        </button>
                        <h4 class="modal-title">新增艺人</h4>
                    </div>
                    <div class="modal-body">
                        <div class="example">
                            <div class="col-md-2 text-right float-left require">姓名</div>
                            <div class="col-md-10 float-left pl-0">
                                <input type="text" class="form-control" placeholder="请输入姓名" v-model="artistName">
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-6 px-0 float-left label-center">
                                <div class="col-md-4 text-right float-left require">性别</div>
                                <div class="col-md-8 float-left row">
                                    <selectors :options="genderArr" @change="changeGender" ref="gender"></selectors>
                                </div>
                            </div>
                            <div class="col-md-6 px-0 float-left label-center">
                                <div class="col-md-4 text-right float-left pl-0 require">出生日期</div>
                                <div class="col-md-8 float-left pl-0">
                                    <datepicker @change="changeBirthday" :placeholder="'请选择日期'"
                                                ref="birthday"></datepicker>
                                </div>
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-6 px-0 float-left label-center">
                                <div class="col-md-4 text-right float-left require">艺人来源</div>
                                <div class="col-md-8 float-left row">
                                    <selectors :options="artistSourceArr" @change="changeSource"
                                               ref="source"></selectors>
                                </div>
                            </div>
                            <div class="col-md-6 px-0 float-left label-center">
                                <div class="col-md-4 text-right float-left pl-0 require">邮箱</div>
                                <div class="col-md-8 float-left pl-0">
                                    <input type="text" class="form-control" title="" v-model="artistEmail"
                                           placeholder="请输入邮箱">
                                </div>
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-6 px-0 float-left label-center">
                                <div class="col-md-4 text-right float-left require">手机号</div>
                                <div class="col-md-8 float-left row">
                                    <input type="text" class="form-control" title="" v-model="artistPhone"
                                           placeholder="请输入手机号">
                                </div>
                            </div>
                            <div class="col-md-6 px-0 float-left label-center">
                                <div class="col-md-4 text-right float-left pl-0">微信</div>
                                <div class="col-md-8 float-left pl-0">
                                    <input type="text" class="form-control" title="" v-model="artistWeiXin"
                                           placeholder="请输入微信号码">
                                </div>
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-6 px-0 float-left label-center">
                                <div class="col-md-4 text-right float-left">星探</div>
                                <div class="col-md-8 float-left row">
                                    <input type="text" class="form-control" title="" v-model="artistScoutName"
                                           placeholder="请输入星探姓名">
                                </div>
                            </div>
                            <div class="col-md-6 px-0 float-left label-center">
                                <div class="col-md-4 text-right float-left pl-0">地区</div>
                                <div class="col-md-8 float-left pl-0">
                                    <input type="text" class="form-control" title="" v-model="artistLocation"
                                           placeholder="请输入地区">
                                </div>
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left require">平台</div>
                            <div class="col-md-10 float-left pl-0 ">
                                <!-- todo 全选 -->
                                <CheckboxGroup :optionData="platformList" @change="changeCheckbox" :isLine="true">
                                    <template slot-scope="scope">
                                        <span>{{scope.row.name}}</span>
                                    </template>
                                </CheckboxGroup>
                            </div>
                        </div>
                        <div class="example" v-show="platformType.find(item => item ==1)">
                            <div class="col-md-2 text-right float-left">微博主页地址</div>
                            <div class="col-md-4 float-left pl-0">
                                <input type="text" class="form-control" v-model="weiboUrl">
                            </div>
                            <div class="col-md-2 text-right float-left">微博粉丝数</div>
                            <div class="col-md-4 float-left pl-0">
                                <input type="text" class="form-control" v-model="weiboFansNum">
                            </div>
                        </div>
                        <div class="example" v-show="platformType.find(item => item ==2)">
                            <div class="col-md-2 text-right float-left">百科地址</div>
                            <div class="col-md-4 float-left pl-0">
                                <input type="text" class="form-control" v-model="baikeUrl">
                            </div>
                            <div class="col-md-2 text-right float-left">百科粉丝数</div>
                            <div class="col-md-4 float-left pl-0">
                                <input type="text" class="form-control" v-model="baikeFansNum">
                            </div>
                        </div>
                        <div class="example" v-show="platformType.find(item => item ==3)">
                            <div class="col-md-2 text-right float-left">抖音ID</div>
                            <div class="col-md-4 float-left pl-0">
                                <input type="text" class="form-control" v-model="douyinId">
                            </div>
                            <div class="col-md-2 text-right float-left">抖音粉丝数</div>
                            <div class="col-md-4 float-left pl-0">
                                <input type="text" class="form-control" v-model="douyinFansNum">
                            </div>
                        </div>
                        <div class="example" v-show='platformType.find(item => item ==4)'>
                            <div class="col-md-2 text-right float-left">其他地址</div>
                            <div class="col-md-4 float-left pl-0">
                                <input type="text" class="form-control" v-model="qitaUrl">
                            </div>
                            <div class="col-md-2 text-right float-left">其他地址粉丝数</div>
                            <div class="col-md-4 float-left pl-0">
                                <input type="text" class="form-control" v-model="qitaFansNum">
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left require">沟通状态</div>
                            <div class="col-md-10 float-left pl-0">
                                <selectors :options="taiyangCommunicationStatusArr"
                                           @change="changeCommunicationType" ref="communicationType"></selectors>
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left require">与我司签约意向</div>
                            <div class="col-md-10 float-left pl-0">
                                <selectors :options="yesOrNoArr" @change="changeSignIntention"
                                           ref="signIntention"></selectors>
                            </div>
                            <div class="col-md-5 float-left pl-0" v-show="signIntention == 2">
                                <textarea name="" class="form-control" rows="1" placeholder="请填写不签约理由"
                                          v-model="notSignReason"></textarea>
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left require">是否签约其他公司</div>
                            <div class="col-md-5 float-left pl-0">
                                <selectors :options="yesOrNoArr" @change="isSignCompany" ref="signCompany"></selectors>
                            </div>
                            <div class="col-md-5 float-left pl-0" v-if="signCompany == 1">
                                <input type="text" class="form-control" v-model="sign_contract_other_name"
                                       placeholder="请输入已签约公司名称">
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left require">附件类型</div>
                            <div class="col-md-10 float-left pl-0">
                                <selectors :options="attachmentTypeArr" @change="changeAttachmentType"
                                           ref="attachmentType"></selectors>
                            </div>
                        </div>
                        <div class="example" v-show="affixesType>0">
                            <div class="col-md-2 text-right float-left require">附件</div>
                            <div class="col-md-5 float-left pl-0">
                                <Upload  @change="uploadAttachment" class="upload-image">
                                    <div  class="addMember-trigger-button addMember-trigger-left"><i
                                            class="iconfont icon-tianjia"></i></div>
                                </Upload>
                                <div class="mt-5" v-for="(attach,index) in affixes" :key="index">
                                    {{attachmentTypeArr.find(item => item.value == attach.type).name}} -
                                    {{attach.title}}
                                </div>
                                <!-- <FileUploader class="fileupload" @change="uploadAttachment"></FileUploader>
                                <div class="mt-5" v-for="(attach,index) in affixes" :key="index">
                                    {{attachmentTypeArr.find(item => item.value == attach.type).name}} -
                                    {{attach.title}}
                                </div> -->
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left">头像</div>
                            <div class="col-md-5 float-left pl-0">
                                <Upload @change='getUploadUrl' class="upload-image">
                                    <div class="puls" :style="{ backgroundImage: 'url(' + uploadUrl + ')' }"
                                         v-if="uploadUrl">
                                    </div>
                                    <div v-if="!uploadUrl" class="addMember-trigger-button addMember-trigger-left"><i
                                            class="iconfont icon-tianjia"></i></div>
                                </Upload>
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
                        <button class="btn btn-sm btn-white btn-pure" data-dismiss="modal" @click="cancleData">取消
                        </button>
                        <button class="btn btn-primary" type="submit" @click="addArtist">确定</button>
                    </div>

                </div>
            </div>
        </div>
        <div class="modal fade" id="giveProducer" aria-hidden="true" aria-labelledby="addLabelForm"
             role="dialog" tabindex="-1" data-backdrop="static">
            <div class="modal-dialog modal-simple" style="max-width: 50rem;">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" aria-hidden="true" data-dismiss="modal">
                            <i class="iconfont icon-guanbi" aria-hidden="true"></i>
                        </button>
                        <h4 class="modal-title">分配制作人</h4>
                    </div>
                    <div class="modal-body clearfix pt-10">
                        <ListSelectMember :listName="'成员列表'" :selectName="'已选择成员'" :type="'change'"></ListSelectMember>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-sm btn-white btn-pure" data-dismiss="modal" @click="abrogate">取消</button>
                        <button class="btn btn-primary" type="submit" @click="giveProducer()">确定</button>
                    </div>

                </div>
            </div>
        </div>
        
       
        <!--分配经理人-->
        <div class="modal fade" id="giveBroker" aria-hidden="true" aria-labelledby="addLabelForm"
             role="dialog" tabindex="-1" data-backdrop="static">
            <div class="modal-dialog modal-simple">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" aria-hidden="true" data-dismiss="modal">
                            <i class="iconfont icon-guanbi" aria-hidden="true"></i>
                        </button>
                        <h4 class="modal-title">
                            <template v-if="giveType == 1">分配分配经理人</template>
                            <template v-else>分配宣传人</template>
                        </h4>
                    </div>
                    <div class="modal-body">
                        <ListSelectMember :listName="'成员列表'" :selectName="'已选择成员'" :type="'change'"></ListSelectMember>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-sm btn-white btn-pure" data-dismiss="modal" @click="cancelGiveBroker()">
                            取消
                        </button>
                        <button class="btn btn-primary" type="submit" @click="giveBroker">确定</button>
                    </div>

                </div>
            </div>
        </div> 
    </div>
</template>
<script>
    import fetch from '../../assets/utils/fetch.js'
    import config from '../../assets/js/config'
    import ImportAndExport from '../../components/ImportAndExport.vue'
    export default {
        data: function () {
            return {
                total: 0,
                current_page: 1,
                total_pages: 1,
                Btotal: 0,
                Bcurrent_page: 1,
                Btotal_pages: 1,
                customizeInfo: config.customizeInfo,
                signState:config.signState,
                yesOrNoArrs: [
                    {
                        name: '是',
                        value: '1'
                    },
                    {
                        name: '否',
                        value: '0'
                    }
                ],
                genderArr: config.genderArr,
                yesOrNoArr: config.yesOrNoArr,
                artistStatusArr: config.artistStatusArr,
                papiCommunicationStatusArr: config.papiCommunicationStatusArr,
                artistSourceArr: config.artistSourceArr,
                taiyangCommunicationStatusArr: config.taiyangCommunicationStatusArr,
                companyCityArr: config.companyCityArr,
                attachmentTypeArr: config.attachmentTypeArr,
                artistsInfo:[],
                artistStatus: '',
                bolggerName: '',
                weiboUrl: '',
                weiboFansNum: '',
                douyinId: '',
                douyinFansNum: '',
                xhsUrl: '',
                xhsFansNum: '',
                platformType: [],//平台类型
                signIntention: '',
                signCompany: '',
                artistDesc: '',
                artistTypeArr: [],
                artistTypeId: '',
                signCompanyName: '',
                communicationArr: '',
                communication: '',
                uploadUrl: '',
                intention_desc: '',
                giveType: 1,
                filterObject: {
                    include: 'type,creator,tasks,affixes,producer',
                },
                platformLists: [
                    {
                        value: 1,
                        name: '微博'
                    },
                    {
                        value: 2,
                        name: '抖音'
                    },
                    {
                        value: 3,
                        name: '小红书'
                    },
                ],
                platformList: [
                    {
                        value: 1,
                        name: '微博'
                    },
                    {
                        value: 2,
                        name: '百科'
                    },
                    {
                        value: 3,
                        name: '抖音'
                    },
                    {
                        value: 4,
                        name: '其他'
                    },
                ],
                star_douyin_infos: {
                    url: '',
                    avatar: '',
                },
                star_weibo_infos: {
                    url: '',
                    avatar: '',
                },
                star_xiaohongshu_infos: {
                    url: '',
                    avatar: '',
                },
                blogCommunication: '',//沟通状态
                blogType: '',//博主类型
                blogName: '',//博主名称
                blogStatus: 2,//博主状态
                selectedArtistsArr: [],
                isLoading: true,
                selectAllBlogger: false,
                listData: {
                    include: 'broker,creator',
                    name: '',
                    sign_contract_status: 2,//  签约状态
                    communication_status: '', //沟通状态
                    source: '', // 艺人来源
                },
                artistEmail: '',
                artistPhone: '',
                artistWeiXin: '',
                artistsInfo: '',
                artistStatus: '',
                artistName: '',
                artistGender: '',
                artistBirthday: '',
                artistSource: '',
                artistType: '',
                communicationStatus: '',
                weiboUrl: '',
                weiboFansNum: '',
                douyinId: '',
                douyinFansNum: '',
                xhsUrl: '',
                xhsFansNum: '',
                // platform:[],
                platformType: [],
                signIntention: '',
                signCompany: '',
                sign_contract_other_name: '',
                artistDesc: '',
                baikeUrl: '',
                baikeFansNum: '',
                qitaUrl: '',
                qitaFansNum: '',
                artistScoutName: '',
                artistLocation: '',
                notSignReason: '',
                selectAllStars: false,
                bloggerInfo:'',
                affixes: [],
                affixesType: '',//附件类型
                isShow:''
            }
        },
        watch: {
            platformType: function () {
                return this.platformType
            }
        },
        components: {
            ImportAndExport
        },
        mounted() {
            this.getStars();
            this.getBlogger();
            this.getBlogType() //获取博主类型
            this.getArtists();
            $('table').asSelectable();
            
        },
        methods: {
            //获取沟通状态
            getStatus: function (value) {
                this.listData.communication_status = value
                this.getArtists()
            },
            //获取签约状态
            getSource: function (value) {
                console.log(value)
                this.listData.sign_contract_status = value
                this.getArtists()
            },
            //查询列表
            getArtists: function (page = 1, signStatus) {
                let _this = this;
                if (signStatus) {
                    this.listData.sign_contract_status = signStatus
                }
                this.listData.page = page
                fetch('get', '/stars', this.listData).then(function (response) {
                    console.log( response)
                    if(response.data){
                        _this.artistsInfo = response.data;
                    }
                    if(response.meta){
                        _this.current_page = response.meta.pagination.current_page;
                        _this.total = response.meta.pagination.total;
                        _this.total_pages = response.meta.pagination.total_pages;
                    }
                    _this.selectAllStars = false;
                    _this.selectedArtistsArr = [];
                })
            },
            getBlogger: function (page = 1, signStatus) {

                let data = {
                    include: 'type,creator,affixes,publicity,operatelogs',

                }
                let _this = this;

                //博主状态
                if (signStatus) {
                    this.blogStatus = signStatus
                }
                data.status = this.blogStatus
                //沟通状态
                if (this.blogCommunication) {
                    data.communication_status = this.blogCommunication
                }
                //博主名称
                if (this.blogName) {
                    data.name = this.blogName
                }
                data.page = page
                fetch('get', '/bloggers', data).then(function (response) {
                    
                    if(response.data){
                        _this.bloggerInfo = response.data;
                    }
                    console.log(response.data)
                    if(response.meta){
                        _this.Bcurrent_page = response.meta.pagination.current_page;
                        _this.Btotal = response.meta.pagination.total;
                        _this.Btotal_pages = response.meta.pagination.total_pages;
                    }
                    _this.isLoading = false;
                    _this.selectAllBlogger = false;
                    _this.selectedArtistsArr = [];
                    
                });
                
            },

            //获取博主类型
            getBlogType() {
                let _this = this
                fetch('get', '/bloggers/gettype').then(function (response) {
                    let data = {
                        id: '',
                        name: '全部'
                    }
                    _this.artistTypeArr = response.data
                    _this.artistTypeArr.unshift(data)

                })
            },
            //选择博主类型
            typeFilter(value) {
                this.blogStatus = value
                this.getBlogger()

            },
            //沟通状态
            CommunicationStatus(value) {
                this.blogCommunication = value
                this.getBlogger()
            },
            customize: function (value) {

            },
            changeArtistStatus: function (value) {
                this.artistStatus = value
            },
            //头像
            getUploadUrl(value) {
                this.uploadUrl = value
            },
            changeCheckbox: function (value) {
                this.platformType = []
                for (let i = 0; i < value.length; i++) {
                    this.platformType.push(value[i].value)
                }
            },

            changeCommunicationType: function (value) {
                this.communication = value

            },

            changeSignIntention: function (value) {
                this.signIntention = value
            },

            isSignCompany: function (value) {
                this.signCompany = value
            },

            changeWeiboFansNum: function (value) {
                this.star_weibo_infos.avatar = value
            },

            changeDouyinFansNum: function (value) {
                this.star_douyin_infos.avatar = value
            },

            changeXHSFansNum: function (value) {
                this.star_xiaohongshu_infos.avatar = value
            },
            changeArtistType: function (value) {
                this.artistTypeId = value
            },
            addBolgger: function () {
                let _this = this;
                if (!this.bolggerName) {
                    toastr.error('请输入博主名称');
                    return false
                }
                if (this.platformType.length === 0) {
                    toastr.error('请选择沟通平台');
                    return false
                }
                if (!this.artistTypeId) {
                    toastr.error('请选择博主类型');
                    return false
                }
                if (!this.communication) {
                    toastr.error('请选择沟通状态');
                    return false
                }
                if (!this.signIntention) {
                    toastr.error('请选择签约意向');
                    return false
                }
                if (this.signIntention == 1) {
                    this.intention_desc = ''
                }
                if (this.signIntention == 0 && !this.intention_desc) {
                    toastr.error('请填写不签约原因');
                    return false
                }
                if (!this.signCompany) {
                    toastr.error('请选择是否与其他公司签约');
                    return false
                }
                if (this.signCompany == 0) {
                    this.signCompanyName = ''
                }
                if (this.signCompany == 1 && !this.signCompanyName) {
                    toastr.error('请填写签约公司');
                    return false
                }
                let platform = this.platformType.join(',');
                let data = {
                    //微博,抖音,小红书
                    nickname: this.bolggerName,
                    type_id: this.artistTypeId,
                    communication_status: this.communication,
                    intention: this.signIntention,
                    intention_desc: this.intention_desc,
                    sign_contract_other: this.signCompany,
                    sign_contract_other_name: this.signCompanyName,
                    desc: this.artistDesc,
                    platform: platform,//平台id
                    star_douyin_infos: this.star_douyin_infos,
                    star_weibo_infos: this.star_weibo_infos,
                    star_xiaohongshu_infos: this.star_xiaohongshu_infos,
                    avatar: this.uploadUrl
                };
                fetch('post', '/bloggers', data).then(function (response) {
                    toastr.success('创建成功');
                    $('#addBolgger').modal('hide');
                    _this.$router.push({path: 'blogger/' + response.data.id});
                    _this.getBlogger()
                    $('#addBolgger').on('hidden.bs.modal', function () {

                        _this.bolggerName = '';//昵称
                        _this.star_weibo_infos.url = '';//微博地址
                        _this.$refs.weibo.setValue('0');//微博粉丝
                        _this.star_douyin_infos.url = '';//抖音地址
                        _this.$refs.douyin.setValue('0');//抖音粉丝
                        _this.star_xiaohongshu_infos.url = '';//小红书地址
                        _this.$refs.xiaohongshu.setValue('0')//小红书粉丝
                        _this.$refs.papitype.setValue('')//类型
                        _this.$refs.communicationType.setValue('')//沟通类型
                        _this.$refs.signIntention.setValue('')//我公司意向
                        _this.$refs.isSign.setValue('')//其他公司意向
                        _this.artistDesc = '';//备注
                        _this.platformType = [];
                        _this.uploadUrl = ''
                    })
                })

            },

            selectArtists: function (value) {
                
                if (value === 'all') {
                    this.selectedArtistsArr = [];
                    for (let i = 0; i < this.bloggerInfo.length; i++) {
                        this.selectedArtistsArr.push(this.bloggerInfo[i].id)
                    }
                } else {
                    let index = this.selectedArtistsArr.indexOf(value);
                    if (index > -1) {
                        this.selectedArtistsArr.splice(index, 1)
                    } else {
                        this.selectedArtistsArr.push(value)
                    }
                    console.log(this.selectedArtistsArr)
                }
            },


            redirectArtistDetail: function (artistId) {
                this.$router.push({path: 'artists/' + artistId})
            },
            redirectBolggerDetail:function(bolggerId){
                this.$router.push({path: 'blogger/' + bolggerId})
            },
            changeMember: function (type) {
                this.giveType = type
            },
            //分配制作人
            giveProducer: function () {

                let _this = this
                let data = {}
                data = {
                    person_ids: [],
                    del_person_ids: [],//删除
                    moduleable_ids: this.selectedArtistsArr,//
                    moduleable_type: 'blogger',
                    type: 4, //制作人
                }
                for (let i = 0; i < this.$store.state.participantsInfo.length; i++) {
                    data.person_ids.push(this.$store.state.participantsInfo[i].id)

                }
                fetch('post', 'distribution/person', data).then(function (response) {
                    if (_this.selectedArtistsArr.length == 0) {
                        return false
                    }
                    toastr.success('分配制作人成功')
                    $('#giveProducer').modal('hide')
                    _this.getBlogger()
                    _this.$store.state.participantsInfo = []
                    _this.selectedArtistsArr = []
                    console.log(_this.selectedArtistsArr)
                })

            },
             abrogate:function(){
                this.$store.state.participantsInfo = []
            },
            judge() {
                if (this.selectedArtistsArr.length == 0) {
                    toastr.error('请先选择博主，再进行分配')
                    $('#giveProducer').modal('hide')
                    this.$store.state.participantsInfo = []
                    return false
                }
            },
             getStars: function () {
                let  organization_id = JSON.parse(Cookies.get('user')).organization_id
                        if(organization_id == 411){                       
                            this.isShow = true
                        }else if(organization_id == 412){
                            this.isShow = false
                        }
            },
            tab:function(value){
                this.selectedArtistsArr = []
                if(value == 0){
                    this.getArtists()
                     this.isShow = true
                    
                }else if(value == 1){
                    this.getBlogger()
                    this.isShow = false
                }
            },
            giveBroker: function () {
                let url, toast, data
                let _this = this
                if (this.selectedArtistsArr.length <= 0) {
                    toastr.error('请选择分配艺人')
                    return false
                }
                if (this.giveType == 1) {
                    url = 'distribution/person'
                    toast = '分配经理人成功'
                    data = {
                        person_ids: [],//经理人数组
                        del_person_ids: [],//删除
                        moduleable_ids: this.selectedArtistsArr,//艺人
                        moduleable_type: 'star',
                        type: 3,//经理人
                    }
                } else {
                    url = 'distribution/person'
                    toast = '分配宣传人成功'
                    data = {
                        person_ids: [],//宣传人数组
                        del_person_ids: [],//删除
                        moduleable_ids: this.selectedArtistsArr,//艺人
                        moduleable_type: 'star',
                        type: 2, //宣传人
                    }
                }

                for (let i = 0; i < this.$store.state.participantsInfo.length; i++) {
                    data.person_ids.push(this.$store.state.participantsInfo[i].id)

                }
                fetch('post', url, data).then(function (response) {
                    toastr.success(toast)
                    $('#giveBroker').modal('hide')
                    _this.$store.state.participantsInfo = []
                })
            },
            cancelGiveBroker: function () {
                this.$store.state.participantsInfo = []
            },
            changeCommunicationType: function (value) {

                this.communication = value
            },

            changeSignIntention: function (value) {

                this.signIntention = value


            },

            isSignCompany: function (value) {

                this.signCompany = value


            },

            changeGender: function (value) {
                this.artistGender = value
            },

            changeBirthday: function (value) {
                console.log(value)
                this.artistBirthday = value
            },

            changeSource: function (value) {
                this.artistSource = value
            },
            uploadAttachment: function (url, name, size) {
                for (let i = 0; i < this.affixes.length; i++) {
                    if (this.affixes[i].type == this.affixesType) {

                        this.affixes.splice(i, 1)
                    }

                }
                this.affixes.push({
                    title: name,
                    size: size,
                    url: url,
                    type: this.affixesType
                })
            },
            addArtist: function () {
                if (!this.artistName) {
                    toastr.error('请输入艺人名称');
                    return false
                }
                if (!this.artistGender) {
                    toastr.error('请选择艺人性别');
                    return false
                }
                if (!this.artistBirthday) {

                    toastr.error('请选择艺人出生日期');
                    return false
                }
                if (new Date(this.artistBirthday).getTime() > new Date().getTime()) {
                    toastr.error('出生日期不能晚于当前日期');
                    return false
                }
                if (!this.artistSource) {
                    toastr.error('请选择艺人来源');
                    return false
                }
                if (!this.artistEmail) {
                    toastr.error('请选择输入邮箱')
                    return false
                }
                if (!this.artistPhone) {
                    toastr.error('请选择输入手机号')
                    return false
                }
                if (this.platformType.length === 0) {
                    toastr.error('请选择沟通平台');
                    return false
                }
                if (!this.communication) {
                    toastr.error('请选择沟通状态');
                    return false
                }
                if (!this.signIntention) {
                    toastr.error('请选择签约意向');
                    return false
                }
                if (this.signIntention == 1) {
                    this.notSignReason = ''
                }
                if (this.signIntention == 2 && !this.notSignReason) {
                    toastr.error('请填写不签约理由');
                    return false
                }
                if (!this.signCompany) {
                    toastr.error('请选择是否与其他公司签约');
                    return false
                }
                if (this.signCompany == 1 && !this.sign_contract_other_name) {
                    toastr.error('请输入已签约公司名称');
                    return false
                }
                if (this.signCompany == 2) {
                    this.sign_contract_other_name = ''
                }
                // console.log(this.affixesType)
                if (this.affixesType > 1 && this.affixes.length == 0) {
                    toastr.error('请上传附件');
                    return false
                }
                let platform = this.platformType.join(',');
                let data = {
                    name: this.artistName,//名字
                    gender: this.artistGender,//性别
                    birthday: this.artistBirthday,//生日
                    source: this.artistSource, //艺人来源
                    email: this.artistEmail, //邮箱
                    phone: this.artistPhone, //手机
                    wechat: this.artistWeiXin, //微信
                    communication_status: this.communication, //沟通状态
                    intention: this.signIntention, //签约意向
                    intention_desc: this.notSignReason, //不签约理由
                    sign_contract_other: this.signCompany, //是否签约其他公司
                    sign_contract_other_name: this.sign_contract_other_name, //签约其他公司名称
                    // sign_contract_at:'',//签约日期
                    artist_scout_name: this.artistScoutName,//星探名称
                    star_location: this.artistLocation, //明星地区
                    platform: platform,//社交平台
                    weibo_url: this.weiboUrl,
                    weibo_fans_num: this.weiboFansNum,
                    baike_url: this.baikeUrl,
                    baike_fans_num: this.baikeFansNum,
                    douyin_id: this.douyinId,
                    douyin_fans_num: this.douyinFansNum,
                    qita_url: this.qitaUrl,
                    qita_fans_num: this.qitaFansNum,
                    affix: this.affixes,//附件
                    desc: this.artistDesc,//  备注
                    avatar: this.uploadUrl

                }
                let _this = this;
                fetch('post', '/stars', data).then(function (response) {
                    toastr.success('创建成功');
                    $('#addArtist').modal('hide');
                    _this.$router.push({path: '/artists/' + response.data.id});
                    _this.cancleData()
                })
            },

            //清空数据
            cancleData: function () {
                this.artistName = ''
                this.artistGender = ''
                this.artistBirthday = ''
                this.artistSource = ''
                this.artistEmail = ''
                this.artistPhone = ''
                this.artistWeiXin = ''
                this.artistScoutName = ''
                this.artistLocation = ''
                this.weiboUrl = ''
                this.weiboFansNum = ''
                this.baikeUrl = ''
                this.baikeFansNum = ''
                this.douyinId = ''
                this.douyinFansNum = ''
                this.qitaUrl = ''
                this.qita_fans_num = ''
                this.communication = ''
                this.signIntention = ''
                this.notSignReason = ''
                this.signCompany = ''
                this.sign_contract_other_name = ''
                this.affixesType = ''
                this.uploadUrl = ''
                this.$refs.gender.setValue('')
                this.$refs.birthday.setValue('')
                this.$refs.source.setValue('')
                this.$refs.communicationType.setValue('')
                this.$refs.signIntention.setValue('')
                this.$refs.signCompany.setValue('')
                this.$refs.attachmentType.setValue('')
            },
            //选择附件类型
            changeAttachmentType: function (value) {
                this.affixesType = value
                //   alert(value)
                //   alert(this.affixesType)

            },

            //上传头像
            getUploadUrl(res) {
                this.uploadUrl = res
            },
        },
        filters: {
            jsGetAge: function (strBirthday) {
                if (strBirthday) {
                    var returnAge;
                    // 根据生日计算年龄（"1995-09-25"）
                    //以下五行是为了获取出生年月日，如果是从身份证上获取需要稍微改变一下
                    var strBirthdayArr = strBirthday.split("-");
                    var birthYear = strBirthdayArr[0];
                    var birthMonth = strBirthdayArr[1];
                    var birthDay = strBirthdayArr[2];

                    var d = new Date();
                    var nowYear = d.getFullYear();
                    var nowMonth = d.getMonth() + 1;
                    var nowDay = d.getDate();

                    if (nowYear == birthYear) {
                        returnAge = 0;//同年 则为0岁
                    }
                    else {
                        var ageDiff = nowYear - birthYear; //年之差
                        if (ageDiff > 0) {
                            if (nowMonth == birthMonth) {
                                var dayDiff = nowDay - birthDay;//日之差
                                if (dayDiff < 0) {
                                    returnAge = ageDiff - 1;
                                }
                                else {
                                    returnAge = ageDiff;
                                }
                            }
                            else {
                                var monthDiff = nowMonth - birthMonth;//月之差
                                if (monthDiff < 0) {
                                    returnAge = ageDiff - 1;
                                }
                                else {
                                    returnAge = ageDiff;
                                }
                            }
                        }
                        else {
                            returnAge = -1;//返回-1 表示出生日期输入错误 晚于今天
                        }
                    }
                    return returnAge;//返回周岁年龄
                } else {
                    return strBirthday
                }
            },
        }
    }
</script>
<style>

</style>