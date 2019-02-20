<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
*/

// Serve SPA.
Route::get('/', 'AppController@index');

// Catch other routes and send them to the SPA.
Route::any('/{any}', 'AppController@index')->where('any', '.*');
