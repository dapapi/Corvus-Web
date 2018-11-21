<?php $__env->startSection('title','控制台'); ?>
<?php $__env->startSection('body-class','dashboard'); ?>

<?php $__env->startSection('body'); ?>
    <?php echo $__env->make('layouts.top-nav', \Illuminate\Support\Arr::except(get_defined_vars(), array('__data', '__path')))->render(); ?>
    <?php echo $__env->make('layouts.left-nav', \Illuminate\Support\Arr::except(get_defined_vars(), array('__data', '__path')))->render(); ?>



    <!-- Page -->
    <div class="page">

        <div class="page-content container-fluid">

            控制台

        </div>
    </div>
    <!-- End Page -->

<?php $__env->stopSection(); ?>


<?php $__env->startSection('style'); ?>
    <link rel="stylesheet" href="<?php echo e(mix('css/v1.css')); ?>">
<?php $__env->stopSection(); ?>

<?php $__env->startSection('script'); ?>

    <script src="<?php echo e(mix('js/app.js')); ?>"></script>
    <script src="<?php echo e(mix('js/left-menu.js')); ?>"></script>

<?php $__env->stopSection(); ?>







<?php echo $__env->make('layouts.master', \Illuminate\Support\Arr::except(get_defined_vars(), array('__data', '__path')))->render(); ?>