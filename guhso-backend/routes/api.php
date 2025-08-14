<?php
// routes/api.php - Enhanced for React Frontend

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ShowController as ApiShowController;
use App\Http\Controllers\Api\EpisodeController as ApiEpisodeController;
use App\Http\Controllers\Api\FavoriteController;
use App\Http\Controllers\Api\CommentController;
use App\Http\Controllers\Api\PostController;
use App\Http\Controllers\Api\AdvertisementController;
use App\Http\Controllers\SearchController;
use App\Http\Controllers\MailingListController;
use Illuminate\Support\Facades\Route;

Route::prefix('v1')->group(function () {
    // Public endpoints for React app
    Route::get('/shows', [ApiShowController::class, 'index']);
    Route::get('/shows/{show}', [ApiShowController::class, 'show']);
    Route::get('/shows/{show}/episodes', [ApiShowController::class, 'episodes']);
    Route::get('/episodes', [ApiEpisodeController::class, 'index']);
    Route::get('/episodes/{episode}', [ApiEpisodeController::class, 'show']);
    Route::put('/episodes/{episode}/toggle-hero', [ApiEpisodeController::class, 'toggleHero']);
    Route::get('/episodes/{episode}/comments', [CommentController::class, 'index']);
    
    // Featured content for React hero section
    Route::get('/featured/episode', [ApiEpisodeController::class, 'featured']);
    Route::get('/featured/show', [ApiShowController::class, 'featured']);
    Route::get('/featured/episodes', [ApiEpisodeController::class, 'featuredSidebar']);
    
    // Search endpoints
    Route::get('/search', [SearchController::class, 'api']);
    Route::get('/popular-tags', [SearchController::class, 'popularTags']);

    // Blog posts (public)
    Route::get('/posts', [PostController::class, 'index']);
    Route::get('/posts/featured', [PostController::class, 'featured']);
    Route::get('/posts/sticky', [PostController::class, 'sticky']);
    Route::get('/posts/{post:slug}', [PostController::class, 'show']);

    // Categories for navigation
    Route::get('/categories', function() {
        return \App\Models\Category::withCount('shows')->get();
    });

    // Advertisements
    Route::get('/ads', [AdvertisementController::class, 'active']);

    // Mailing list
    Route::post('/mailing-list', [MailingListController::class, 'store']);
    
    // Authentication endpoints
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);
    
    // Protected routes (require authentication)
    Route::middleware('auth:sanctum')->group(function () {
        Route::post('/logout', [AuthController::class, 'logout']);
        Route::get('/user', [AuthController::class, 'user']);
        Route::put('/user', [AuthController::class, 'updateProfile']);
        
        // Favorites
        Route::get('/user/favorites', [FavoriteController::class, 'index']);
        Route::post('/episodes/{episode}/favorite', [FavoriteController::class, 'store']);
        Route::delete('/episodes/{episode}/favorite', [FavoriteController::class, 'destroy']);
        
        // Comments
        Route::post('/episodes/{episode}/comments', [CommentController::class, 'store']);
        Route::put('/comments/{comment}', [CommentController::class, 'update']);
        Route::delete('/comments/{comment}', [CommentController::class, 'destroy']);
    });
    
    // Protected post management routes (require authentication)
    Route::middleware('auth:sanctum')->group(function () {
        Route::post('/posts', [PostController::class, 'store']);
        Route::put('/posts/{post}', [PostController::class, 'update']);
        Route::delete('/posts/{post}', [PostController::class, 'destroy']);
        Route::post('/posts/{post}/cover-image', [PostController::class, 'uploadCoverImage']);
        Route::delete('/posts/{post}/cover-image', [PostController::class, 'deleteCoverImage']);
    });

    // Admin routes
    Route::middleware(['auth:sanctum', 'admin'])->prefix('admin')->group(function () {
        Route::apiResource('shows', \App\Http\Controllers\Admin\ShowController::class);
        Route::apiResource('posts', PostController::class);
        Route::apiResource('ads', AdvertisementController::class);
        Route::get('/dashboard/stats', function() {
            return response()->json([
                'total_shows' => \App\Models\Show::count(),
                'total_episodes' => \App\Models\Episode::count(),
                'total_posts' => \App\Models\Post::count(),
                'total_users' => \App\Models\User::count(),
                'recent_episodes' => \App\Models\Episode::latest()->take(5)->get(),
                'recent_posts' => \App\Models\Post::with('user')->latest()->take(5)->get()
            ]);
        });
    });
});