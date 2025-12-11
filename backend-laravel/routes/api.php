<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ClientController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::get('clients/get-new-email', [ClientController::class, 'getNewEmail']);
Route::apiResource('clients', ClientController::class);