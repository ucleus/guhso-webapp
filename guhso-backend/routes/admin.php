<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\ShowController;

Route::middleware('admin')->group(function () {
    Route::get('/', [ShowController::class, 'index']);
    // Add other admin routes here
});

