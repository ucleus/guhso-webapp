@extends('dashboard.layout')

@section('title', 'Dashboard - Guhso')

@section('content')
<div class="mb-6">
    <h1 class="text-2xl font-semibold text-gray-900">Dashboard</h1>
    <p class="mt-1 text-sm text-gray-600">Welcome to your Guhso podcast platform dashboard</p>
</div>

<!-- Stats Cards -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
    <div class="bg-white overflow-hidden shadow rounded-lg">
        <div class="p-5">
            <div class="flex items-center">
                <div class="flex-shrink-0">
                    <i class="fas fa-podcast text-2xl text-blue-500"></i>
                </div>
                <div class="ml-5 w-0 flex-1">
                    <dl>
                        <dt class="text-sm font-medium text-gray-500 truncate">Total Shows</dt>
                        <dd class="text-lg font-medium text-gray-900">{{ $stats['total_shows'] }}</dd>
                    </dl>
                </div>
            </div>
        </div>
    </div>

    <div class="bg-white overflow-hidden shadow rounded-lg">
        <div class="p-5">
            <div class="flex items-center">
                <div class="flex-shrink-0">
                    <i class="fas fa-play-circle text-2xl text-green-500"></i>
                </div>
                <div class="ml-5 w-0 flex-1">
                    <dl>
                        <dt class="text-sm font-medium text-gray-500 truncate">Total Episodes</dt>
                        <dd class="text-lg font-medium text-gray-900">{{ $stats['total_episodes'] }}</dd>
                    </dl>
                </div>
            </div>
        </div>
    </div>

    <div class="bg-white overflow-hidden shadow rounded-lg">
        <div class="p-5">
            <div class="flex items-center">
                <div class="flex-shrink-0">
                    <i class="fas fa-users text-2xl text-purple-500"></i>
                </div>
                <div class="ml-5 w-0 flex-1">
                    <dl>
                        <dt class="text-sm font-medium text-gray-500 truncate">Total Users</dt>
                        <dd class="text-lg font-medium text-gray-900">{{ $stats['total_users'] }}</dd>
                    </dl>
                </div>
            </div>
        </div>
    </div>

    <div class="bg-white overflow-hidden shadow rounded-lg">
        <div class="p-5">
            <div class="flex items-center">
                <div class="flex-shrink-0">
                    <i class="fas fa-comments text-2xl text-yellow-500"></i>
                </div>
                <div class="ml-5 w-0 flex-1">
                    <dl>
                        <dt class="text-sm font-medium text-gray-500 truncate">Total Comments</dt>
                        <dd class="text-lg font-medium text-gray-900">{{ $stats['total_comments'] }}</dd>
                    </dl>
                </div>
            </div>
        </div>
    </div>
</div>

<!-- Recent Episodes -->
<div class="bg-white shadow overflow-hidden sm:rounded-md mb-8">
    <div class="px-4 py-5 sm:px-6">
        <h3 class="text-lg leading-6 font-medium text-gray-900">Recent Episodes</h3>
        <p class="mt-1 max-w-2xl text-sm text-gray-500">Latest episodes added to your platform</p>
    </div>
    <ul class="divide-y divide-gray-200">
        @forelse($stats['recent_episodes'] as $episode)
        <li class="px-4 py-4 sm:px-6">
            <div class="flex items-center justify-between">
                <div class="flex items-center">
                    <div class="flex-shrink-0 h-10 w-10">
                        <div class="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                            <i class="fas fa-play text-gray-600"></i>
                        </div>
                    </div>
                    <div class="ml-4">
                        <div class="text-sm font-medium text-gray-900">{{ $episode->title }}</div>
                        <div class="text-sm text-gray-500">{{ $episode->show->title ?? 'Unknown Show' }}</div>
                    </div>
                </div>
                <div class="text-sm text-gray-500">
                    {{ $episode->created_at->diffForHumans() }}
                </div>
            </div>
        </li>
        @empty
        <li class="px-4 py-4 sm:px-6 text-center text-gray-500">
            No episodes found. Add some episodes to get started!
        </li>
        @endforelse
    </ul>
</div>

<!-- API Testing Section -->
<div class="bg-white shadow sm:rounded-lg">
    <div class="px-4 py-5 sm:p-6">
        <h3 class="text-lg leading-6 font-medium text-gray-900">API Status</h3>
        <div class="mt-2 max-w-xl text-sm text-gray-500">
            <p>Test your API endpoints to ensure they're working correctly.</p>
        </div>
        <div class="mt-5 flex space-x-3">
            <a href="/api/v1/episodes" target="_blank" class="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                Test Episodes API
            </a>
            <a href="/api/v1/shows" target="_blank" class="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                Test Shows API
            </a>
            <a href="/api/v1/featured/episode" target="_blank" class="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                Test Featured API
            </a>
        </div>
    </div>
</div>
@endsection