<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Episode;
use Illuminate\Http\Request;

class FavoriteController extends Controller
{
    /**
     * Get user's favorite episodes
     */
    public function index(Request $request)
    {
        $user = $request->user();
        $favorites = $user->favoriteEpisodes()
            ->with('show')
            ->latest('favorites.created_at')
            ->paginate(20);

        return response()->json($favorites);
    }

    /**
     * Add episode to favorites
     */
    public function store(Request $request, Episode $episode)
    {
        $user = $request->user();

        if ($user->hasFavorited($episode)) {
            return response()->json(['message' => 'Episode already favorited'], 409);
        }

        $user->favorites()->create(['episode_id' => $episode->id]);

        return response()->json([
            'message' => 'Episode favorited successfully',
            'favorited' => true,
            'favorites_count' => $episode->getFavoritesCount()
        ]);
    }

    /**
     * Remove episode from favorites
     */
    public function destroy(Request $request, Episode $episode)
    {
        $user = $request->user();
        $user->favorites()->where('episode_id', $episode->id)->delete();

        return response()->json([
            'message' => 'Episode unfavorited successfully',
            'favorited' => false,
            'favorites_count' => $episode->getFavoritesCount()
        ]);
    }
}