<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\Admin\ShowController;
use App\Http\Controllers\Auth\LoginController;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;

// Redirect root to dashboard for authenticated users, or login for guests
Route::get('/', function () {
    return Auth::check() 
        ? redirect()->route('dashboard') 
        : redirect()->route('login');
});

// Authentication Routes
Auth::routes();

// Dashboard Routes (protected by auth middleware)
Route::middleware('auth')->group(function () {
    Route::resource('dashboard/shows', ShowController::class);
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::get('/dashboard/shows', [DashboardController::class, 'shows'])->name('dashboard.shows');
    Route::get('/dashboard/episodes', [DashboardController::class, 'episodes'])->name('dashboard.episodes');
    Route::get('/dashboard/users', [DashboardController::class, 'users'])->name('dashboard.users');
});

// Admin-only routes
Route::middleware(['auth', 'admin'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    // Add more admin routes here as needed
});

// API Status page (useful for checking if your API is working)
Route::get('/api-status', function () {
    return response()->json([
        'status' => 'API is working!',
        'timestamp' => now(),
        'endpoints' => [
            'episodes' => url('/api/v1/episodes'),
            'shows' => url('/api/v1/shows'),
            'featured' => url('/api/v1/featured/episode'),
            'search' => url('/api/v1/search?q=test'),
        ]
    ]);
});