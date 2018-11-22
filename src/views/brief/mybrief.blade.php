@extends('layouts.master')

@section('title','简报')

@section('style')
<link rel="stylesheet" href="{{ mix('css/task.css') }}">
@endsection


@section('body-class','dashboard')

@section('body')
@include('layouts.top-nav')
@include('layouts.left-nav')

<!-- Page -->
<div class="page" id="root">
    <div class="page-header page-header-bordered">
        <h1 class="page-title">我的</h1>
    </div>
    <div class="page-content container-fluid">
        <div>


        </div>
    </div>
    <div class="site-action" data-plugin="actionBtn" @click="redirectBriefAdd()">
        <button type="button" class="site-action-toggle btn-raised btn btn-success btn-floating waves-effect waves-classic">
            <i class="front-icon md-plus animation-scale-up" aria-hidden="true"></i>
            <i class="back-icon md-plus animation-scale-up" aria-hidden="true"></i>
        </button>
    </div>
</div>


<!-- End Page -->
<style>

</style>
@endsection


@section('style')
<link rel="stylesheet" href="{{ mix('css/v1.css') }}">
@endsection

@section('script')

<script src="{{ mix('js/brief.index.js') }}"></script>

@endsection