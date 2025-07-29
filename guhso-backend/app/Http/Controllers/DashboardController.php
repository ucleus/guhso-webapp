<?php
// 1. Create Dashboard Controller
// Run: php artisan make:controller DashboardController

// app/Http/Controllers/DashboardController.php
namespace App\Http\Controllers;

use App\Models\Show;
use App\Models\Episode;
use App\Models\User;
use App\Models\Comment;
use App\Models\Category;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function index()
    {
        $stats = [
            'total_shows' => Show::count(),
            'total_episodes' => Episode::count(),
            'total_users' => User::count(),
            'total_comments' => Comment::count(),
            'recent_episodes' => Episode::with('show')->latest()->take(5)->get(),
            'recent_users' => User::latest()->take(5)->get(),
            'active_shows' => Show::where('is_active', true)->count(),
            'published_episodes' => Episode::where('is_published', true)->count(),
        ];

        return view('dashboard.index', compact('stats'));
    }

    public function shows()
    {
        $shows = Show::with('categories')->withCount('episodes')->paginate(10);
        return view('dashboard.shows', compact('shows'));
    }

    public function episodes()
    {
        $episodes = Episode::with('show')->latest()->paginate(20);
        return view('dashboard.episodes', compact('episodes'));
    }

    public function users()
    {
        $users = User::latest()->paginate(20);
        return view('dashboard.users', compact('users'));
    }
}
