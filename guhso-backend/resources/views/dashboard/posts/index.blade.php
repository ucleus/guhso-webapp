@extends('dashboard.layout')

@section('title', 'Posts - Guhso')

@section('content')
<div class="flex items-center justify-between mb-6">
    <h1 class="text-2xl font-semibold text-gray-900">Posts</h1>
    <a href="{{ route('dashboard.posts.create') }}" class="px-4 py-2 bg-blue-600 text-white rounded-md">New Post</a>
</div>

@if(session('success'))
    <div class="mb-4 text-green-600">{{ session('success') }}</div>
@endif

<div class="bg-white shadow overflow-hidden sm:rounded-md">
    <table class="min-w-full">
        <thead class="bg-gray-50">
            <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Featured</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
            </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
            @forelse($posts as $post)
            <tr>
                <td class="px-6 py-4 whitespace-nowrap">{{ $post->title }}</td>
                <td class="px-6 py-4 whitespace-nowrap">{{ $post->is_featured ? 'Yes' : 'No' }}</td>
                <td class="px-6 py-4 whitespace-nowrap">{{ $post->created_at->format('Y-m-d') }}</td>
            </tr>
            @empty
            <tr>
                <td colspan="3" class="px-6 py-4 text-center text-gray-500">No posts found.</td>
            </tr>
            @endforelse
        </tbody>
    </table>
    <div class="p-4">
        {{ $posts->links() }}
    </div>
</div>
@endsection
