@extends('dashboard.layout')

@section('title', 'Create Advertisement - Guhso')

@section('content')
<div class="flex items-center justify-between mb-6">
    <h1 class="text-2xl font-semibold text-gray-900">Create Advertisement</h1>
    <a href="{{ route('dashboard.ads') }}" class="text-gray-600 hover:text-gray-900">&larr; Back to Ads</a>
</div>

<form action="{{ route('dashboard.ads.store') }}" method="POST" enctype="multipart/form-data" class="bg-white shadow-md rounded-lg p-6">
    @csrf

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
            <label for="title" class="block text-sm font-medium text-gray-700 mb-2">Title *</label>
            <input type="text" name="title" id="title" value="{{ old('title') }}" required class="w-full border border-gray-300 rounded-md px-3 py-2">
            @error('title')<p class="text-red-500 text-sm mt-1">{{ $message }}</p>@enderror
        </div>
        <div>
            <label for="image" class="block text-sm font-medium text-gray-700 mb-2">Image</label>
            <input type="file" name="image" id="image" class="w-full text-sm text-gray-500">
            @error('image')<p class="text-red-500 text-sm mt-1">{{ $message }}</p>@enderror
        </div>
        <div class="md:col-span-2">
            <label for="description" class="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea name="description" id="description" rows="4" class="w-full border border-gray-300 rounded-md px-3 py-2">{{ old('description') }}</textarea>
            @error('description')<p class="text-red-500 text-sm mt-1">{{ $message }}</p>@enderror
        </div>
        <div>
            <label for="website_url" class="block text-sm font-medium text-gray-700 mb-2">Website URL</label>
            <input type="url" name="website_url" id="website_url" value="{{ old('website_url') }}" class="w-full border border-gray-300 rounded-md px-3 py-2">
            @error('website_url')<p class="text-red-500 text-sm mt-1">{{ $message }}</p>@enderror
        </div>
        <div>
            <label for="facebook_url" class="block text-sm font-medium text-gray-700 mb-2">Facebook URL</label>
            <input type="url" name="facebook_url" id="facebook_url" value="{{ old('facebook_url') }}" class="w-full border border-gray-300 rounded-md px-3 py-2">
            @error('facebook_url')<p class="text-red-500 text-sm mt-1">{{ $message }}</p>@enderror
        </div>
        <div>
            <label for="twitter_url" class="block text-sm font-medium text-gray-700 mb-2">Twitter URL</label>
            <input type="url" name="twitter_url" id="twitter_url" value="{{ old('twitter_url') }}" class="w-full border border-gray-300 rounded-md px-3 py-2">
            @error('twitter_url')<p class="text-red-500 text-sm mt-1">{{ $message }}</p>@enderror
        </div>
        <div>
            <label for="instagram_url" class="block text-sm font-medium text-gray-700 mb-2">Instagram URL</label>
            <input type="url" name="instagram_url" id="instagram_url" value="{{ old('instagram_url') }}" class="w-full border border-gray-300 rounded-md px-3 py-2">
            @error('instagram_url')<p class="text-red-500 text-sm mt-1">{{ $message }}</p>@enderror
        </div>
        <div>
            <label for="linkedin_url" class="block text-sm font-medium text-gray-700 mb-2">LinkedIn URL</label>
            <input type="url" name="linkedin_url" id="linkedin_url" value="{{ old('linkedin_url') }}" class="w-full border border-gray-300 rounded-md px-3 py-2">
            @error('linkedin_url')<p class="text-red-500 text-sm mt-1">{{ $message }}</p>@enderror
        </div>
        <div>
            <label for="phone" class="block text-sm font-medium text-gray-700 mb-2">Phone</label>
            <input type="text" name="phone" id="phone" value="{{ old('phone') }}" class="w-full border border-gray-300 rounded-md px-3 py-2">
            @error('phone')<p class="text-red-500 text-sm mt-1">{{ $message }}</p>@enderror
        </div>
        <div>
            <label for="email" class="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input type="email" name="email" id="email" value="{{ old('email') }}" class="w-full border border-gray-300 rounded-md px-3 py-2">
            @error('email')<p class="text-red-500 text-sm mt-1">{{ $message }}</p>@enderror
        </div>
        <div>
            <label for="start_at" class="block text-sm font-medium text-gray-700 mb-2">Start At</label>
            <input type="datetime-local" name="start_at" id="start_at" value="{{ old('start_at') }}" class="w-full border border-gray-300 rounded-md px-3 py-2">
            @error('start_at')<p class="text-red-500 text-sm mt-1">{{ $message }}</p>@enderror
        </div>
        <div>
            <label for="duration_days" class="block text-sm font-medium text-gray-700 mb-2">Duration (days)</label>
            <input type="number" name="duration_days" id="duration_days" value="{{ old('duration_days') }}" class="w-full border border-gray-300 rounded-md px-3 py-2">
            @error('duration_days')<p class="text-red-500 text-sm mt-1">{{ $message }}</p>@enderror
        </div>
        <div class="flex items-center">
            <input type="checkbox" name="is_active" id="is_active" class="rounded border-gray-300 text-blue-600" {{ old('is_active') ? 'checked' : '' }}>
            <label for="is_active" class="ml-2 text-sm text-gray-700">Active</label>
        </div>
    </div>

    <div class="flex items-center justify-end mt-6">
        <button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Save Advertisement</button>
    </div>
</form>
@endsection
