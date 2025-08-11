<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Post;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;
use Illuminate\Validation\ValidationException;

class PostController extends Controller
{
    /**
     * Display a listing of the posts.
     */
    public function index(Request $request)
    {
        $query = Post::with('user')->latest();
        
        // Filter by status
        if ($request->has('status')) {
            $query->where('status', $request->status);
        }
        
        // Search functionality
        if ($request->has('search')) {
            $search = $request->search;
            $query->where(function($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                  ->orWhere('body', 'like', "%{$search}%");
            });
        }
        
        $posts = $query->paginate(10);
        return view('dashboard.posts.index', compact('posts'));
    }

    /**
     * Show the form for creating a new post.
     */
    public function create()
    {
        $users = User::all();
        return view('dashboard.posts.create', compact('users'));
    }

    /**
     * Store a newly created post in storage.
     */
    public function store(Request $request)
    {
        \Log::info('Post creation attempt', ['data' => $request->all()]);
        
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'slug' => ['nullable', 'string', 'max:255', 'unique:posts'],
            'body' => ['required', 'string'],
            'excerpt' => ['nullable', 'string', 'max:500'],
            'cover_image' => ['nullable', 'image', 'mimes:jpeg,png,jpg,gif,webp', 'max:2048'],
            'status' => ['required', Rule::in(['draft', 'published', 'private'])],
            'published_at' => ['nullable', 'date'],
            'user_id' => ['nullable', 'exists:users,id'],
            'meta_title' => ['nullable', 'string', 'max:255'],
            'meta_description' => ['nullable', 'string', 'max:500'],
            'tags' => ['nullable', 'string'],
            'is_featured' => ['sometimes', 'boolean'],
            'allow_comments' => ['sometimes', 'boolean'],
            'is_sticky' => ['sometimes', 'boolean'],
        ]);
        
        // Set default user if not provided
        if (!isset($validated['user_id'])) {
            $validated['user_id'] = Auth::id();
        }
        
        // Handle cover image upload
        if ($request->hasFile('cover_image')) {
            try {
                $validated['cover_image'] = $request->file('cover_image')->store('posts/covers', 'public');
            } catch (\Exception $e) {
                Log::error('Cover image upload failed', ['error' => $e->getMessage()]);
                throw ValidationException::withMessages([
                    'cover_image' => 'Unable to upload cover image. Please ensure you have sufficient permissions or the file size is within limits.',
                ]);
            }
        }
        
        // Convert tags string to array
        if (isset($validated['tags'])) {
            $validated['tags'] = array_map('trim', explode(',', $validated['tags']));
        }
        
        // Handle boolean checkboxes
        $validated['is_featured'] = $request->has('is_featured');
        $validated['allow_comments'] = $request->has('allow_comments');
        $validated['is_sticky'] = $request->has('is_sticky');
        
        // Set published_at if status is published and no date provided
        if ($validated['status'] === 'published' && !isset($validated['published_at'])) {
            $validated['published_at'] = now();
        }

        try {
            $post = Post::create($validated);
            \Log::info('Post created successfully', ['post_id' => $post->id]);

            return redirect()->route('dashboard.posts')->with('success', 'Post created successfully.');
        } catch (\Exception $e) {
            \Log::error('Post creation failed', ['error' => $e->getMessage()]);
            return back()->withInput()->with('error', 'Failed to create post: ' . $e->getMessage());
        }
    }
    
    /**
     * Display the specified post.
     */
    public function show(Post $post)
    {
        return view('dashboard.posts.show', compact('post'));
    }
    
    /**
     * Show the form for editing the specified post.
     */
    public function edit(Post $post)
    {
        $users = User::all();
        return view('dashboard.posts.edit', compact('post', 'users'));
    }
    
    /**
     * Update the specified post in storage.
     */
    public function update(Request $request, Post $post)
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'slug' => ['nullable', 'string', 'max:255', Rule::unique('posts')->ignore($post->id)],
            'body' => ['required', 'string'],
            'excerpt' => ['nullable', 'string', 'max:500'],
            'cover_image' => ['nullable', 'image', 'mimes:jpeg,png,jpg,gif,webp', 'max:2048'],
            'status' => ['required', Rule::in(['draft', 'published', 'private'])],
            'published_at' => ['nullable', 'date'],
            'user_id' => ['required', 'exists:users,id'],
            'meta_title' => ['nullable', 'string', 'max:255'],
            'meta_description' => ['nullable', 'string', 'max:500'],
            'tags' => ['nullable', 'string'],
            'is_featured' => ['sometimes', 'boolean'],
            'allow_comments' => ['sometimes', 'boolean'],
            'is_sticky' => ['sometimes', 'boolean'],
        ]);
        
        // Handle cover image upload
        if ($request->hasFile('cover_image')) {
            // Delete old cover image
            if ($post->cover_image) {
                Storage::disk('public')->delete($post->cover_image);
            }
            try {
                $validated['cover_image'] = $request->file('cover_image')->store('posts/covers', 'public');
            } catch (\Exception $e) {
                Log::error('Cover image upload failed', ['error' => $e->getMessage()]);
                throw ValidationException::withMessages([
                    'cover_image' => 'Unable to upload cover image. Please ensure you have sufficient permissions or the file size is within limits.',
                ]);
            }
        }
        
        // Convert tags string to array
        if (isset($validated['tags'])) {
            $validated['tags'] = array_map('trim', explode(',', $validated['tags']));
        }
        
        // Handle boolean checkboxes
        $validated['is_featured'] = $request->has('is_featured');
        $validated['allow_comments'] = $request->has('allow_comments');
        $validated['is_sticky'] = $request->has('is_sticky');
        
        // Set published_at if status changed to published and no date provided
        if ($validated['status'] === 'published' && !$post->published_at && !isset($validated['published_at'])) {
            $validated['published_at'] = now();
        }

        $post->update($validated);

        return redirect()->route('dashboard.posts')->with('success', 'Post updated successfully.');
    }
    
    /**
     * Remove the specified post from storage.
     */
    public function destroy(Post $post)
    {
        // Delete cover image if exists
        if ($post->cover_image) {
            Storage::disk('public')->delete($post->cover_image);
        }
        
        $post->delete();
        
        return redirect()->route('dashboard.posts')->with('success', 'Post deleted successfully.');
    }
}
