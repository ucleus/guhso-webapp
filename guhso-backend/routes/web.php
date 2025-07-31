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

// Manual Authentication Routes (replacing Auth::routes())
// Login Routes
Route::get('login', [LoginController::class, 'showLoginForm'])->name('login');
Route::post('login', [LoginController::class, 'login']);
Route::post('logout', [LoginController::class, 'logout'])->name('logout');

// Registration Routes
Route::get('register', [\App\Http\Controllers\Auth\RegisterController::class, 'showRegistrationForm'])->name('register');
Route::post('register', [\App\Http\Controllers\Auth\RegisterController::class, 'register']);

// Dashboard Routes (protected by auth middleware)
Route::middleware('auth')->group(function () {
    Route::resource('dashboard/shows', ShowController::class)->names([
        'index' => 'admin.shows.index',
        'create' => 'admin.shows.create',
        'store' => 'admin.shows.store',
        'show' => 'admin.shows.show',
        'edit' => 'admin.shows.edit',
        'update' => 'admin.shows.update',
        'destroy' => 'admin.shows.destroy',
    ]);
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

// Test CSRF with simple form
Route::get('/test-form', function () {
    return view('test-form');
});

Route::post('/test-form', function () {
    return 'CSRF Test Successful! Data: ' . json_encode(request()->all());
});

// Debug CSRF and Session
Route::get('/debug-session', function () {
    return response()->json([
        'csrf_token' => csrf_token(),
        'session_id' => session()->getId(),
        'session_driver' => config('session.driver'),
        'session_domain' => config('session.domain'),
        'app_url' => config('app.url'),
    ]);
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