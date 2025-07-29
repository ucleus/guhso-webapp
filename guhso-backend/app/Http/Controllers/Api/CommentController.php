<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Episode;
use App\Models\Comment;
use Illuminate\Http\Request;

class CommentController extends Controller
{
    /**
     * Get comments for an episode
     */
    public function index(Episode $episode)
    {
        $comments = $episode->comments()
            ->with('user')
            ->latest()
            ->paginate(20);

        return response()->json($comments);
    }

    /**
     * Store a new comment
     */
    public function store(Request $request, Episode $episode)
    {
        $request->validate([
            'content' => 'required|string|max:1000',
            'rating' => 'nullable|integer|min:1|max:5'
        ]);

        $comment = Comment::create([
            'user_id' => $request->user()->id,
            'episode_id' => $episode->id,
            'content' => $request->content,
            'rating' => $request->rating,
            'is_approved' => true,
        ]);

        $comment->load('user');

        return response()->json([
            'message' => 'Comment posted successfully',
            'comment' => $comment
        ], 201);
    }

    /**
     * Update a comment
     */
    public function update(Request $request, Comment $comment)
    {
        // Ensure user owns the comment
        if ($comment->user_id !== $request->user()->id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $request->validate([
            'content' => 'required|string|max:1000',
            'rating' => 'nullable|integer|min:1|max:5'
        ]);

        $comment->update($request->only(['content', 'rating']));
        $comment->load('user');

        return response()->json([
            'message' => 'Comment updated successfully',
            'comment' => $comment
        ]);
    }

    /**
     * Delete a comment
     */
    public function destroy(Request $request, Comment $comment)
    {
        // Ensure user owns the comment or is admin
        if ($comment->user_id !== $request->user()->id && !$request->user()->isAdmin()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $comment->delete();

        return response()->json(['message' => 'Comment deleted successfully']);
    }
}
