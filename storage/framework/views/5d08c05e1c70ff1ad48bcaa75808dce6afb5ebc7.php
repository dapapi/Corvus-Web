<?php $__env->startSection('title','登录'); ?>
<?php $__env->startSection('body-class','page-login-v2 layout-full page-dark'); ?>

<?php $__env->startSection('body'); ?>
<div class="page" data-animsition-in="fade-in" data-animsition-out="fade-out">
    <div class="page-content">
        <div class="page-brand-info">
            <div class="brand">
                <img class="brand-img" src="/images/logo@2x.png" alt="...">
                <h2 class="brand-text font-size-40"><?php echo e(env('APP_NAME')); ?></h2>
            </div>
            <p class="font-size-20">
                泰洋川禾(Mountain Top)基于对娱乐经济及跨屏融合的深度理解，公司汇集了娱乐领域、商务领域、金融领域资深人才，跨界搭建公司的核心运营团队。
            </p>
        </div>

        <div class="page-login-main" id="login-page" style="display: block">
            <div class="brand hidden-md-up">
                <img class="brand-img" src="/images/logo-colored@2x.png" alt="...">
                <h3 class="brand-text font-size-40"><?php echo e(env('APP_NAME')); ?></h3>
            </div>
            <h3 class="font-size-24">登录</h3>
            <p>请输入用户名、手机号或者邮箱进行登录</p>

            <form method="post" action="#" autocomplete="off" id="login-form">
                <div class="form-group form-material floating" data-plugin="formMaterial">
                    <input type="text" class="form-control empty" id="inputUsername" name="email">
                    <label class="floating-label" for="inputUsername">用户名/手机号/邮箱</label>
                </div>
                <div class="form-group form-material floating" data-plugin="formMaterial">
                    <input type="password" class="form-control empty" id="inputPassword" name="password">
                    <label class="floating-label" for="inputPassword">密码</label>
                </div>
                <div class="form-group clearfix">
                    <div class="checkbox-custom checkbox-inline checkbox-primary float-left">
                        <input type="checkbox" id="inputCheckbox" name="checkbox">
                        <label for="inputCheckbox">记住登录</label>
                    </div>
                    <a class="float-right" href="/forgot">忘记密码？</a>
                </div>
                <button type="submit" class="btn btn-primary btn-block">登录</button>
            </form>


            <footer class="page-copyright">
                <p>WEBSITE BY Mtop Creation Studio</p>
                <p>© 2018. All RIGHT RESERVED.</p>
                <div class="social">
                    <div class="icon btn-success" style="padding: 8px;border-radius: 50px;border: none;">
                        <span id="wechat-login-btn"><img src="https://res.papitube.com/WeChat.png"
                                                         style="width: 20px;height: 20px"></span>
                    </div>
                    <button class="icon" style="padding: 8px;border-radius: 50px;background: #22d7bb;border: none;">
                        <span id="worktile-login-btn"><img src="https://res.papitube.com/worktile.png"
                                                           style="width: 20px;height: 20px"></span>

                    </button>
                </div>
            </footer>
        </div>


        <div class="page-login-main" id="bind-telephone-page" style="display: none;">

            <div class="brand hidden-md-up">
                <img class="brand-img" src="/images/logo-colored@2x.png" alt="...">
                <h3 class="brand-text font-size-40"><?php echo e(env('APP_NAME')); ?></h3>
            </div>
            <h3 class="font-size-24">绑定手机号</h3>
            <p>请输入手机号和验证码进行手机号绑定</p>

            <form method="post" autocomplete="off" id="bind-form">
                <div class="form-group form-material floating" data-plugin="formMaterial">
                    <input type="text" class="form-control empty" id="bindTelephoneInput" name="bind-telephone">
                    <label class="floating-label" for="bindTelephoneInput">请输入手机号</label>
                    <a id="send-code-btn" class="" href="javascript:void(0)">发送验证码</a>
                </div>
                <div class="form-group form-material floating" data-plugin="formMaterial">
                    <input type="text" class="form-control empty" id="bindTelephoneCodeInout" name="bind-code">
                    <label class="floating-label" for="bindTelephoneCodeInout">请输入验证码</label>
                </div>
                <button id="bind-submit-btn" class="btn btn-primary btn-block">绑定</button>
            </form>


            <footer class="page-copyright">
                <p>WEBSITE BY Mtop Creation Studio</p>
                <p>© 2018. All RIGHT RESERVED.</p>
                <div class="social">
                    <a class="btn btn-icon btn-round social-twitter mx-5" href="/login">
                        <i class="icon bd-twitter" aria-hidden="true"></i>
                    </a>
                </div>
            </footer>
        </div>

    </div>
</div>
<!-- End Page -->
<?php $__env->stopSection(); ?>

<?php $__env->startSection('style'); ?>
<link rel="stylesheet" href="<?php echo e(mix('css/login.css')); ?>">
<?php $__env->stopSection(); ?>

<?php $__env->startSection('script'); ?>
<script src="<?php echo e(mix('js/login.js')); ?>"></script>
<?php $__env->stopSection(); ?>









<?php echo $__env->make('layouts.master', \Illuminate\Support\Arr::except(get_defined_vars(), array('__data', '__path')))->render(); ?>