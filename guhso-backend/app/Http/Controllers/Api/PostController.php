<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Validation\Rule;

class PostController extends Controller
{
    public function index(Request $request)
    {
        $query = Post::with('user')->latest();
        
        // Filter by status
        if ($request->has('status')) {
            $query->where('status', $request->status);
        } else {
            $query->published();
        }
        
        // Filter by featured
        if ($request->boolean('featured')) {
            $query->featured();
        }
        
        // Search
        if ($request->has('search')) {
            $search = $request->search;
            $query->where(function($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                  ->orWhere('body', 'like', "%{$search}%")
                  ->orWhere('excerpt', 'like', "%{$search}%");
            });
        }
        
        // Filter by tags
        if ($request->has('tags')) {
            $tags = is_array($request->tags) ? $request->tags : [$request->tags];
            $query->whereJsonContains('tags', $tags);
        }
        
        return response()->json($query->paginate($request->get('per_page', 10)));
    }

    public function featured()
    {
        $posts = Post::with('user')
            ->published()
            ->featured()
            ->latest('published_at')
            ->get();
            
        return response()->json($posts);
    }
    
    public function sticky()
    {
        $posts = Post::with('user')
            ->published()
            ->sticky()
            ->latest('published_at')
            ->get();
            
        return response()->json($posts);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'slug' => 'nullable|string|max:255|unique:posts',
            'body' => 'required|string',
            'excerpt' => 'nullable|string|max:500',
            'cover_image' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
            'status' => ['required', Rule::in(['draft', 'published', 'private'])],
            'published_at' => 'nullable|date',
            // User ID is optional; defaults to authenticated user if not provided
            'user_id' => 'nullable|exists:users,id',
            'meta_title' => 'nullable|string|max:255',
            'meta_description' => 'nullable|string|max:500',
            'tags' => 'nullable',
            'tags.*' => 'string|max:50',
            'is_featured' => 'boolean',
            'allow_comments' => 'boolean',
            'is_sticky' => 'boolean',
        ]);

        // Handle cover image upload
        if ($request->hasFile('cover_image')) {
            $directory = public_path('images/post');
            File::ensureDirectoryExists($directory);
            $image = $request->file('cover_image');
            $filename = time().'_'.$image->getClientOriginalName();
            $image->move($directory, $filename);
            $validated['cover_image'] = 'images/post/'.$filename;
        }
        
        // Ensure the post is attributed to the authenticated user if none provided
        if (!isset($validated['user_id'])) {
            $validated['user_id'] = $request->user()->id;
        }

        // Normalize tags string to array
        if (isset($validated['tags']) && is_string($validated['tags'])) {
            $validated['tags'] = array_map('trim', explode(',', $validated['tags']));
        }

        // Set published_at if status is published and no date provided
        if ($validated['status'] === 'published' && !isset($validated['published_at'])) {
            $validated['published_at'] = now();
        }

        $post = Post::create($validated);
        
        return response()->json($post->load('user'), 201);
    }

    public function show(Post $post)
    {
        // Increment view count
        $post->incrementViewCount();
        
        return response()->json($post->load('user'));
    }

    public function update(Request $request, Post $post)
    {
        $validated = $request->validate([
            'title' => 'sometimes|string|max:255',
            'slug' => ['sometimes', 'string', 'max:255', Rule::unique('posts')->ignore($post->id)],
            'body' => 'sometimes|string',
            'excerpt' => 'sometimes|nullable|string|max:500',
            'cover_image' => 'sometimes|nullable|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
            'status' => ['sometimes', Rule::in(['draft', 'published', 'private'])],
            'published_at' => 'sometimes|nullable|date',
            // Allow user_id to be omitted; defaults to authenticated user
            'user_id' => 'sometimes|nullable|exists:users,id',
            'meta_title' => 'sometimes|nullable|string|max:255',
            'meta_description' => 'sometimes|nullable|string|max:500',
            'tags' => 'sometimes|nullable',
            'tags.*' => 'string|max:50',
            'is_featured' => 'sometimes|boolean',
            'allow_comments' => 'sometimes|boolean',
            'is_sticky' => 'sometimes|boolean',
        ]);
        
        // Handle cover image upload
        if ($request->hasFile('cover_image')) {
            if ($post->cover_image && File::exists(public_path($post->cover_image))) {
                File::delete(public_path($post->cover_image));
            }
            $directory = public_path('images/post');
            File::ensureDirectoryExists($directory);
            $image = $request->file('cover_image');
            $filename = time().'_'.$image->getClientOriginalName();
            $image->move($directory, $filename);
            $validated['cover_image'] = 'images/post/'.$filename;
        }
        
        // Normalize tags string to array
        if (isset($validated['tags']) && is_string($validated['tags'])) {
            $validated['tags'] = array_map('trim', explode(',', $validated['tags']));
        }

        // Ensure the post remains attributed to the authenticated user if none provided
        if (!isset($validated['user_id'])) {
            $validated['user_id'] = $request->user()->id;
        }

        // Set published_at if status changed to published and no date provided
        if (isset($validated['status']) && $validated['status'] === 'published' && !$post->published_at && !isset($validated['published_at'])) {
            $validated['published_at'] = now();
        }

        $post->update($validated);
        
        return response()->json($post->load('user'));
    }

    public function destroy(Post $post)
    {
        // Delete cover image if exists
        if ($post->cover_image && File::exists(public_path($post->cover_image))) {
            File::delete(public_path($post->cover_image));
        }
        
        $post->delete();
        
        return response()->json(['message' => 'Post deleted successfully']);
    }
    
    public function uploadCoverImage(Request $request, Post $post)
    {
        $request->validate([
            'cover_image' => 'required|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
        ]);
        
        // Delete old cover image
        if ($post->cover_image && File::exists(public_path($post->cover_image))) {
            File::delete(public_path($post->cover_image));
        }

        $directory = public_path('images/post');
        File::ensureDirectoryExists($directory);
        $image = $request->file('cover_image');
        $filename = time().'_'.$image->getClientOriginalName();
        $image->move($directory, $filename);
        $path = 'images/post/'.$filename;
        $post->update(['cover_image' => $path]);

        return response()->json([
            'message' => 'Cover image uploaded successfully',
            'cover_image' => $path,
            'cover_image_url' => url($path)
        ]);
    }
    
    public function deleteCoverImage(Post $post)
    {
        if ($post->cover_image && File::exists(public_path($post->cover_image))) {
            File::delete(public_path($post->cover_image));
            $post->update(['cover_image' => null]);
        }
        
        return response()->json(['message' => 'Cover image deleted successfully']);
    }
}
