<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Episode;
use Illuminate\Http\Request;

class EpisodeController extends Controller
{
    public function index(Request $request)
    {
        $query = Episode::where('is_published', true)->with(['show']);

        if ($request->has('latest')) {
            $query->latest('published_at')->take($request->get('limit', 10));
        }

        if ($request->has('show_id')) {
            $query->where('show_id', $request->show_id);
        }

        $episodes = $query->paginate(20);
        return response()->json($episodes);
    }

    public function show(Episode $episode)
    {
        $episode->load(['show', 'comments.user', 'favorites']);

        $relatedEpisodes = Episode::where('show_id', $episode->show_id)
            ->where('id', '!=', $episode->id)
            ->where('is_published', true)
            ->latest('published_at')
            ->take(5)
            ->get();

        return response()->json([
            'episode' => $episode,
            'related_episodes' => $relatedEpisodes
        ]);
    }

    public function featured()
    {
        // Try to get the episode marked as featured/hero first
        $featuredEpisode = Episode::where('is_published', true)
            ->where('is_featured', 1)
            ->with('show')
            ->first();

        // If no featured episode, fall back to the latest episode
        if (!$featuredEpisode) {
            $featuredEpisode = Episode::where('is_published', true)
                ->with('show')
                ->latest('published_at')
                ->first();
        }

        return response()->json($featuredEpisode);
    }

    public function store(Request $request)
    {
        $request->validate([
            'show_id' => 'required|exists:shows,id',
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'audio_url' => 'required|url',
            'duration' => 'nullable|integer',
        ]);

        $episode = Episode::create([
            'show_id' => $request->show_id,
            'title' => $request->title,
            'description' => $request->description,
            'audio_url' => $request->audio_url,
            'duration' => $request->duration,
            'published_at' => now(),
            'is_manual' => true,
            'is_published' => true,
        ]);

        return response()->json($episode, 201);
    }

    public function update(Request $request, Episode $episode)
    {
        $request->validate([
            'title' => 'sometimes|string|max:255',
            'description' => 'nullable|string',
            'audio_url' => 'sometimes|url',
            'duration' => 'nullable|integer',
            'is_published' => 'sometimes|boolean',
        ]);

        $episode->update($request->only([
            'title', 'description', 'audio_url', 'duration', 'is_published'
        ]));

        return response()->json($episode);
    }

    public function destroy(Episode $episode)
    {
        $episode->delete();
        return response()->json(['message' => 'Episode deleted successfully']);
    }

    public function toggleHero(Episode $episode)
    {
        // If this episode is being set as hero, remove hero status from all other episodes
        if (!$episode->is_featured) {
            Episode::where('is_featured', 1)->update(['is_featured' => 0]);
            $episode->update(['is_featured' => 1]);
            $message = 'Episode set as hero successfully';
        } else {
            // Remove hero status from this episode
            $episode->update(['is_featured' => 0]);
            $message = 'Hero status removed from episode';
        }

        return response()->json([
            'message' => $message,
            'episode' => $episode->load('show')
        ]);
    }
}