<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
*/

/**
 * V1 API
 */
Route::prefix('v1')->group(function () {
    // Auth.
    Route::group(['middleware' => 'api', 'prefix' => 'auth'], function () {
        Route::post('login', 'Api\AuthController@login');
        Route::post('logout', 'Api\AuthController@logout');
        Route::post('refresh', 'Api\AuthController@refresh');
        Route::get('user', 'Api\AuthController@me');
    });

    // Data.
    Route::get('/hello', 'Api\HelloController@hello');
});
