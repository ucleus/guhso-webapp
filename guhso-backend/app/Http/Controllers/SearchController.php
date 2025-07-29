<?php

namespace App\Http\Controllers;

use App\Models\Show;
use App\Models\Episode;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class SearchController extends Controller
{
    /**
     * Web route - return view for non-API requests
     */
    public function index(Request $request)
    {
        $query = $request->get('q');
        $shows = collect();
        $episodes = collect();

        if (!empty($query)) {
            $shows = $this->searchShows($query);
            $episodes = $this->searchEpisodes($query);
        }

        return view('search.results', compact('query', 'shows', 'episodes'));
    }

    /**
     * API route for React app
     */
    public function api(Request $request)
    {
        $query = $request->get('q');
        $type = $request->get('type', 'all'); // 'all', 'shows', 'episodes'
        $limit = $request->get('limit', 10);

        if (empty($query)) {
            return response()->json([
                'shows' => [],
                'episodes' => [],
                'total' => 0
            ]);
        }

        $results = [];

        if ($type === 'all' || $type === 'shows') {
            $results['shows'] = $this->searchShows($query, $limit);
        }

        if ($type === 'all' || $type === 'episodes') {
            $results['episodes'] = $this->searchEpisodes($query, $limit);
        }

        $results['total'] = ($results['shows']->count() ?? 0) + ($results['episodes']->count() ?? 0);

        return response()->json($results);
    }

    /**
     * Auto-complete suggestions for React search input
     */
    public function suggestions(Request $request)
    {
        $query = $request->get('q');
        $limit = $request->get('limit', 5);

        if (strlen($query) < 2) {
            return response()->json([]);
        }

        // Get show titles and episode titles that match
        $showTitles = Show::where('is_active', true)
            ->where('title', 'LIKE', "$query%")
            ->pluck('title')
            ->take($limit);

        $episodeTitles = Episode::where('is_published', true)
            ->where('title', 'LIKE', "$query%")
            ->pluck('title')
            ->take($limit);

        $suggestions = $showTitles->merge($episodeTitles)
            ->unique()
            ->take($limit)
            ->values();

        return response()->json($suggestions);
    }

    /**
     * Get popular hashtags from episode descriptions
     */
    public function popularTags()
    {
        // Extract hashtags from episode descriptions and return most popular
        $episodes = Episode::where('is_published', true)
            ->whereNotNull('description')
            ->select('description')
            ->get();

        $tagCounts = [];

        foreach ($episodes as $episode) {
            // Extract hashtags using regex
            preg_match_all('/#(\w+)/', $episode->description, $matches);
            
            foreach ($matches[1] as $tag) {
                $tag = strtolower($tag);
                $tagCounts[$tag] = ($tagCounts[$tag] ?? 0) + 1;
            }
        }

        // Sort by popularity and take top 20
        arsort($tagCounts);
        $popularTags = array_slice(array_keys($tagCounts), 0, 20);

        // Format for React frontend
        $formattedTags = array_map(function($tag) use ($tagCounts) {
            return [
                'name' => $tag,
                'count' => $tagCounts[$tag],
                'slug' => $tag
            ];
        }, $popularTags);

        return response()->json($formattedTags);
    }

    /**
     * Get trending episodes based on recent activity
     */
    public function trending()
    {
        // Get trending episodes based on recent favorites and comments
        $trendingEpisodes = Episode::where('is_published', true)
            ->withCount([
                'favorites as recent_favorites' => function ($query) {
                    $query->where('created_at', '>=', now()->subDays(7));
                },
                'comments as recent_comments' => function ($query) {
                    $query->where('created_at', '>=', now()->subDays(7));
                }
            ])
            ->with('show')
            ->orderByRaw('(recent_favorites + recent_comments) DESC')
            ->take(10)
            ->get();

        return response()->json($trendingEpisodes);
    }

    /**
     * Search shows using database or Scout
     */
    private function searchShows($query, $limit = 10)
    {
        $showsQuery = Show::where('is_active', true);

        if (config('scout.driver') === 'database') {
            $showsQuery->where(function ($q) use ($query) {
                $q->where('title', 'LIKE', "%{$query}%")
                  ->orWhere('description', 'LIKE', "%{$query}%")
                  ->orWhere('author', 'LIKE', "%{$query}%");
            });
        } else {
            // Use Scout search when configured (Algolia, etc.)
            return Show::search($query)->take($limit)->get();
        }

        return $showsQuery->with('categories')
            ->withCount('episodes')
            ->take($limit)
            ->get();
    }

    /**
     * Search episodes using database or Scout
     */
    private function searchEpisodes($query, $limit = 20)
    {
        $episodesQuery = Episode::where('is_published', true);

        if (config('scout.driver') === 'database') {
            $episodesQuery->where(function ($q) use ($query) {
                $q->where('title', 'LIKE', "%{$query}%")
                  ->orWhere('description', 'LIKE', "%{$query}%");
            });
        } else {
            // Use Scout search when configured
            return Episode::search($query)->take($limit)->get();
        }

        return $episodesQuery->with(['show', 'favorites', 'comments'])
            ->latest('published_at')
            ->take($limit)
            ->get();
    }
}
