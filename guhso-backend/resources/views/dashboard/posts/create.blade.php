@extends('dashboard.layout')

@section('title', 'Create Post - Guhso')

@section('content')
<h1 class="text-2xl font-semibold text-gray-900 mb-6">Create Post</h1>

<form action="{{ route('dashboard.posts.store') }}" method="POST" class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
    @csrf
    <div class="mb-4">
        <label for="title" class="block text-gray-700 text-sm font-bold mb-2">Title</label>
        <input type="text" name="title" id="title" value="{{ old('title') }}" required class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
        @error('title')
            <p class="text-red-500 text-xs italic mt-2">{{ $message }}</p>
        @enderror
    </div>

    <div class="mb-4">
        <label for="body" class="block text-gray-700 text-sm font-bold mb-2">Body</label>
        <textarea name="body" id="body" rows="5" required class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">{{ old('body') }}</textarea>
        @error('body')
            <p class="text-red-500 text-xs italic mt-2">{{ $message }}</p>
        @enderror
    </div>

    <div class="mb-4">
        <label class="inline-flex items-center">
            <input type="checkbox" name="is_featured" class="form-checkbox" {{ old('is_featured') ? 'checked' : '' }}>
            <span class="ml-2">Featured</span>
        </label>
    </div>

    <div class="flex items-center justify-end">
        <a href="{{ route('dashboard.posts') }}" class="mr-4 text-gray-600">Cancel</a>
        <button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded-md">Publish</button>
    </div>
</form>
@endsection
