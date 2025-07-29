<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Show;
use Illuminate\Http\Request;

class ShowController extends Controller
{
    /**
     * Display a listing of shows
     */
    public function index(Request $request)
    {
        $query = Show::where('is_active', true)
            ->withCount('episodes')
            ->with('categories');

        // Filter by category if provided
        if ($request->has('category')) {
            $query->whereHas('categories', function ($q) use ($request) {
                $q->where('slug', $request->category);
            });
        }

        // Search functionality
        if ($request->has('search') && !empty($request->search)) {
            $query->where(function ($q) use ($request) {
                $q->where('title', 'LIKE', '%' . $request->search . '%')
                  ->orWhere('description', 'LIKE', '%' . $request->search . '%')
                  ->orWhere('author', 'LIKE', '%' . $request->search . '%');
            });
        }

        $shows = $query->latest()->paginate(12);

        return response()->json($shows);
    }

    /**
     * Display the specified show
     */
    public function show(Show $show)
    {
        $show->load(['categories', 'episodes' => function ($query) {
            $query->where('is_published', true)
                  ->with('favorites', 'comments')
                  ->latest('published_at');
        }]);

        return response()->json($show);
    }

    /**
     * Get episodes for a specific show
     */
    public function episodes(Show $show)
    {
        $episodes = $show->episodes()
            ->where('is_published', true)
            ->with(['favorites', 'comments'])
            ->latest('published_at')
            ->paginate(20);

        return response()->json($episodes);
    }

    /**
     * Get featured show for React sidebar
     */
    public function featured()
    {
        $featuredShow = Show::where('is_active', true)
            ->withCount('episodes')
            ->orderBy('episodes_count', 'desc')
            ->first();

        return response()->json($featuredShow);
    }

    /**
     * Store a newly created show (admin only)
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'author' => 'nullable|string|max:255',
            'rss_feed_url' => 'nullable|url',
            'cover_image_url' => 'nullable|url',
            'language' => 'nullable|string|max:5',
        ]);

        $show = Show::create($request->only([
            'title', 'description', 'author', 'rss_feed_url', 
            'cover_image_url', 'language'
        ]));

        return response()->json($show, 201);
    }

    /**
     * Update the specified show (admin only)
     */
    public function update(Request $request, Show $show)
    {
        $request->validate([
            'title' => 'sometimes|string|max:255',
            'description' => 'nullable|string',
            'author' => 'nullable|string|max:255',
            'rss_feed_url' => 'nullable|url',
            'cover_image_url' => 'nullable|url',
            'language' => 'nullable|string|max:5',
            'is_active' => 'sometimes|boolean',
        ]);

        $show->update($request->only([
            'title', 'description', 'author', 'rss_feed_url',
            'cover_image_url', 'language', 'is_active'
        ]));

        return response()->json($show);
    }

    /**
     * Remove the specified show (admin only)
     */
    public function destroy(Show $show)
    {
        $show->delete();

        return response()->json(['message' => 'Show deleted successfully']);
    }
}