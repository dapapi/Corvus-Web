<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('dashboard.index');
});

Route::get('/login', function () {
    return view('auth.login');
});

Route::get('/project/management', function () {
    return view('project.index');
});

Route::get('/task/task', function () {
    return view('task.index');
});

Route::get('/task/detail', function () {
    return view('task.detail');
});

Route::get('/trail/index', function () {
    return view('trail.index');
});

Route::get('/trail/detail', function () {
    return view('trail.detail');
});

