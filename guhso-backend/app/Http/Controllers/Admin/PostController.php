<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Post;
use Illuminate\Http\Request;

class PostController extends Controller
{
    /**
     * Display a listing of the posts.
     */
    public function index()
    {
        $posts = Post::latest()->paginate(10);
        return view('dashboard.posts.index', compact('posts'));
    }

    /**
     * Show the form for creating a new post.
     */
    public function create()
    {
        return view('dashboard.posts.create');
    }

    /**
     * Store a newly created post in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'body' => ['required', 'string'],
            'is_featured' => ['sometimes', 'boolean'],
        ]);

        $data['is_featured'] = $request->has('is_featured');

        Post::create($data);

        return redirect()->route('dashboard.posts')->with('success', 'Post created successfully.');
    }
}
