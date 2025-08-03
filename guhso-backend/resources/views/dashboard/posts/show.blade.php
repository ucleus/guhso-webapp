@extends('dashboard.layout')

@section('title', $post->title . ' - Guhso')

@section('content')
<div class="max-w-4xl mx-auto">
    <!-- Header -->
    <div class="flex items-center justify-between mb-6">
        <div class="flex items-center space-x-4">
            <a href="{{ route('dashboard.posts') }}" class="text-gray-600 hover:text-gray-900">&larr; Back to Posts</a>
            <div class="flex space-x-2">
                @if($post->status === 'published')
                    <span class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">Published</span>
                @elseif($post->status === 'draft')
                    <span class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">Draft</span>
                @else
                    <span class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">Private</span>
                @endif
                
                @if($post->is_featured)
                    <span class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-800">Featured</span>
                @endif
                
                @if($post->is_sticky)
                    <span class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-purple-100 text-purple-800">Sticky</span>
                @endif
            </div>
        </div>
        
        <div class="flex space-x-2">
            <a href="{{ route('dashboard.posts.edit', $post) }}" class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Edit Post</a>
            <form action="{{ route('dashboard.posts.destroy', $post) }}" method="POST" class="inline" onsubmit="return confirm('Are you sure you want to delete this post?')">
                @csrf
                @method('DELETE')
                <button type="submit" class="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">Delete</button>
            </form>
        </div>
    </div>

    <!-- Post Content -->
    <article class="bg-white shadow-lg rounded-lg overflow-hidden">
        <!-- Cover Image -->
        @if($post->cover_image)
            <div class="w-full h-64 bg-gray-200">
                <img src="{{ Storage::url($post->cover_image) }}" alt="{{ $post->title }}" class="w-full h-full object-cover">
            </div>
        @endif

        <div class="p-8">
            <!-- Title and Meta -->
            <header class="mb-6">
                <h1 class="text-3xl font-bold text-gray-900 mb-4">{{ $post->title }}</h1>
                
                <div class="flex items-center text-sm text-gray-600 space-x-4">
                    <div>
                        <span class="font-medium">By:</span> {{ $post->user ? $post->user->name : 'Unknown' }}
                    </div>
                    <div>
                        <span class="font-medium">Published:</span> 
                        {{ $post->published_at ? $post->published_at->format('F j, Y \a\t g:i A') : 'Not published' }}
                    </div>
                    <div>
                        <span class="font-medium">Views:</span> {{ number_format($post->view_count) }}
                    </div>
                    <div>
                        <span class="font-medium">Reading time:</span> {{ $post->reading_time }} min{{ $post->reading_time > 1 ? 's' : '' }}
                    </div>
                </div>

                <div class="mt-4 text-sm text-gray-500">
                    <p><strong>Slug:</strong> <code class="bg-gray-100 px-2 py-1 rounded">{{ $post->slug }}</code></p>
                </div>
            </header>

            <!-- Excerpt -->
            @if($post->excerpt)
                <div class="mb-6 p-4 bg-gray-50 rounded-lg">
                    <h3 class="text-sm font-medium text-gray-700 mb-2">Excerpt</h3>
                    <p class="text-gray-600 italic">{{ $post->excerpt }}</p>
                </div>
            @endif

            <!-- Content -->
            <div class="prose max-w-none">
                {!! nl2br(e($post->body)) !!}
            </div>

            <!-- Tags -->
            @if($post->tags && count($post->tags) > 0)
                <div class="mt-8 pt-6 border-t">
                    <h3 class="text-sm font-medium text-gray-700 mb-3">Tags</h3>
                    <div class="flex flex-wrap gap-2">
                        @foreach($post->tags as $tag)
                            <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                                {{ $tag }}
                            </span>
                        @endforeach
                    </div>
                </div>
            @endif
        </div>
    </article>

    <!-- Post Details -->
    <div class="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- SEO Information -->
        <div class="bg-white shadow rounded-lg p-6">
            <h3 class="text-lg font-medium text-gray-900 mb-4">SEO Information</h3>
            
            <div class="space-y-3">
                <div>
                    <label class="block text-sm font-medium text-gray-700">Meta Title</label>
                    <p class="text-sm text-gray-600">{{ $post->meta_title ?: 'Not set' }}</p>
                </div>
                
                <div>
                    <label class="block text-sm font-medium text-gray-700">Meta Description</label>
                    <p class="text-sm text-gray-600">{{ $post->meta_description ?: 'Not set' }}</p>
                </div>
            </div>
        </div>

        <!-- Post Settings -->
        <div class="bg-white shadow rounded-lg p-6">
            <h3 class="text-lg font-medium text-gray-900 mb-4">Post Settings</h3>
            
            <div class="space-y-3">
                <div class="flex justify-between">
                    <span class="text-sm font-medium text-gray-700">Allow Comments</span>
                    <span class="text-sm text-gray-600">{{ $post->allow_comments ? 'Yes' : 'No' }}</span>
                </div>
                
                <div class="flex justify-between">
                    <span class="text-sm font-medium text-gray-700">Featured Post</span>
                    <span class="text-sm text-gray-600">{{ $post->is_featured ? 'Yes' : 'No' }}</span>
                </div>
                
                <div class="flex justify-between">
                    <span class="text-sm font-medium text-gray-700">Sticky Post</span>
                    <span class="text-sm text-gray-600">{{ $post->is_sticky ? 'Yes' : 'No' }}</span>
                </div>
                
                <div class="flex justify-between">
                    <span class="text-sm font-medium text-gray-700">Created</span>
                    <span class="text-sm text-gray-600">{{ $post->created_at->format('M j, Y g:i A') }}</span>
                </div>
                
                <div class="flex justify-between">
                    <span class="text-sm font-medium text-gray-700">Last Updated</span>
                    <span class="text-sm text-gray-600">{{ $post->updated_at->format('M j, Y g:i A') }}</span>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection