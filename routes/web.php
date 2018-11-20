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

Route::get('/project/index', function () {
    return view('project.index');
});

Route::get('/project/detail', function () {
    return view('project.detail');
});

Route::get('/task/index', function () {
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

Route::get('/client/index', function () {
    return view('client.index');
});

Route::get('/client/detail', function () {
    return view('client.detail');
});

Route::get('/staff/index', function () {
    return view('staff.index');
});

Route::get('/staff/history', function () {
    return view('staff.history');
});

Route::get('/staff/add', function () {
    return view('staff.add');
});

Route::get('/staff/detail', function () {
    return view('staff.detail');
});

Route::get('/artist/index', function () {
    return view('artist.papi-index');
});

Route::get('/artist/papi/detail', function () {
    return view('artist.papi-detail');
});

Route::get('/artist/taiyang', function () {
    return view('artist.taiyang-index');
});

Route::get('/artist/taiyang/detail', function () {
    return view('artist.taiyang-detail');
});

Route::get('/calendar/index', function () {
    return view('calendar.index');
});

//Route::get('/artist/index', 'ClientController@detail');
