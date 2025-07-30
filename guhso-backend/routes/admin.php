<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\ShowController;

Route::get('/', [ShowController::class, 'index']);
// Add other admin routes here