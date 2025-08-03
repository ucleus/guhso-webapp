@extends('dashboard.layout')

@section('title', 'Posts - Guhso')

@section('content')
<div class="flex items-center justify-between mb-6">
    <h1 class="text-2xl font-semibold text-gray-900">Posts</h1>
    <a href="{{ route('dashboard.posts.create') }}" class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">New Post</a>
</div>

@if(session('success'))
    <div class="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded">{{ session('success') }}</div>
@endif

<!-- Filters -->
<div class="mb-6 bg-white p-4 rounded-lg shadow">
    <form method="GET" class="flex gap-4 items-end">
        <div>
            <label for="search" class="block text-sm font-medium text-gray-700 mb-1">Search</label>
            <input type="text" name="search" id="search" value="{{ request('search') }}" placeholder="Search posts..." class="border border-gray-300 rounded-md px-3 py-2 w-64">
        </div>
        <div>
            <label for="status" class="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select name="status" id="status" class="border border-gray-300 rounded-md px-3 py-2">
                <option value="">All Statuses</option>
                <option value="draft" {{ request('status') === 'draft' ? 'selected' : '' }}>Draft</option>
                <option value="published" {{ request('status') === 'published' ? 'selected' : '' }}>Published</option>
                <option value="private" {{ request('status') === 'private' ? 'selected' : '' }}>Private</option>
            </select>
        </div>
        <div class="flex gap-2">
            <button type="submit" class="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700">Filter</button>
            <a href="{{ route('dashboard.posts') }}" class="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400">Clear</a>
        </div>
    </form>
</div>

<div class="bg-white shadow overflow-hidden sm:rounded-md">
    <table class="min-w-full">
        <thead class="bg-gray-50">
            <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Author</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Views</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Published</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
            @forelse($posts as $post)
            <tr class="hover:bg-gray-50">
                <td class="px-6 py-4">
                    <div class="flex items-center">
                        @if($post->cover_image)
                            <img src="{{ Storage::url($post->cover_image) }}" alt="Cover" class="w-12 h-12 object-cover rounded mr-3">
                        @endif
                        <div>
                            <div class="text-sm font-medium text-gray-900">{{ $post->title }}</div>
                            <div class="text-sm text-gray-500">{{ $post->slug }}</div>
                            <div class="flex space-x-2 mt-1">
                                @if($post->is_featured)
                                    <span class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-800">Featured</span>
                                @endif
                                @if($post->is_sticky)
                                    <span class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-purple-100 text-purple-800">Sticky</span>
                                @endif
                            </div>
                        </div>
                    </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {{ $post->user ? $post->user->name : 'Unknown' }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    @if($post->status === 'published')
                        <span class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">Published</span>
                    @elseif($post->status === 'draft')
                        <span class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">Draft</span>
                    @else
                        <span class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">Private</span>
                    @endif
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {{ number_format($post->view_count) }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {{ $post->published_at ? $post->published_at->format('M j, Y') : '-' }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div class="flex space-x-2">
                        <a href="{{ route('dashboard.posts.show', $post) }}" class="text-indigo-600 hover:text-indigo-900">View</a>
                        <a href="{{ route('dashboard.posts.edit', $post) }}" class="text-blue-600 hover:text-blue-900">Edit</a>
                        <form action="{{ route('dashboard.posts.destroy', $post) }}" method="POST" class="inline" onsubmit="return confirm('Are you sure?')">
                            @csrf
                            @method('DELETE')
                            <button type="submit" class="text-red-600 hover:text-red-900">Delete</button>
                        </form>
                    </div>
                </td>
            </tr>
            @empty
            <tr>
                <td colspan="6" class="px-6 py-4 text-center text-gray-500">No posts found.</td>
            </tr>
            @endforelse
        </tbody>
    </table>
    <div class="p-4">
        {{ $posts->links() }}
    </div>
</div>
@endsection
