@extends('layouts.master')

@section('title','控制台')
@section('body-class','dashboard')

@section('body')
    @include('layouts.top-nav')
    @include('layouts.left-nav')



    <!-- Page -->
    <div class="page">

        <div class="page-content container-fluid">

            控制台

        </div>
    </div>
    <!-- End Page -->

@endsection


@section('style')
    <link rel="stylesheet" href="{{ mix('css/v1.css') }}">
@endsection

@section('script')

    <script src="{{ mix('js/app.js') }}"></script>
    <script src="{{ mix('js/left-menu.js') }}"></script>

@endsection






