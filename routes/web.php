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
    return view('welcome');
});

Route::resource('user', 'UserController');
Route::resource('menu', 'MenuController');
Route::resource('menu.order', 'OrderController');

Route::bind('user', function($value, $route) {
    return App\User::whereSlug($value)->first();
});

Route::bind('menu', function($value, $route) {
    return App\Menu::whereSlug($value)->first();
});