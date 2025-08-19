@extends('dashboard.layout')

@section('title', 'Dashboard - Guhso')

@section('content')
<!-- Header -->
<div class="mb-8">
    <div class="flex items-center justify-between">
        <div>
            <h1 class="text-3xl font-bold text-gray-900">Welcome back, {{ Auth::user()->name }}!</h1>
            <p class="mt-2 text-gray-600">Here's what's happening with your podcast platform today</p>
        </div>
        <div class="flex items-center space-x-3">
            <div class="flex items-center space-x-2 text-sm text-gray-500">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <span>Last updated: {{ now()->format('M j, Y g:i A') }}</span>
            </div>
            <button onclick="location.reload()" class="text-gray-400 hover:text-gray-600 transition-colors duration-200" title="Refresh data">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                </svg>
            </button>
        </div>
    </div>
</div>

<!-- Enhanced Stats Cards -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
    <!-- Total Shows -->
    <div class="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300 group">
        <div class="flex items-center justify-between">
            <div class="flex-1">
                <div class="flex items-center justify-between mb-2">
                    <p class="text-sm font-medium text-blue-600 uppercase tracking-wide">Total Shows</p>
                    <div class="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"></path>
                        </svg>
                    </div>
                </div>
                <p class="text-3xl font-bold text-gray-900 mb-1">{{ $stats['total_shows'] }}</p>
                <div class="flex items-center text-sm">
                    <svg class="w-4 h-4 text-green-500 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
                    </svg>
                    <span class="text-green-600 font-medium">Active</span>
                </div>
            </div>
        </div>
        <div class="mt-4 pt-4 border-t border-blue-200">
            <a href="{{ route('dashboard.shows') }}" class="text-blue-600 text-sm font-medium hover:text-blue-800 transition-colors duration-200">
                Manage Shows →
            </a>
        </div>
    </div>

    <!-- Total Episodes -->
    <div class="bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300 group">
        <div class="flex items-center justify-between">
            <div class="flex-1">
                <div class="flex items-center justify-between mb-2">
                    <p class="text-sm font-medium text-green-600 uppercase tracking-wide">Total Episodes</p>
                    <div class="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h8m2 1a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                    </div>
                </div>
                <p class="text-3xl font-bold text-gray-900 mb-1">{{ $stats['total_episodes'] }}</p>
                <div class="flex items-center text-sm">
                    <svg class="w-4 h-4 text-green-500 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
                    </svg>
                    <span class="text-green-600 font-medium">Published</span>
                </div>
            </div>
        </div>
        <div class="mt-4 pt-4 border-t border-green-200">
            <a href="{{ route('dashboard.episodes') }}" class="text-green-600 text-sm font-medium hover:text-green-800 transition-colors duration-200">
                Manage Episodes →
            </a>
        </div>
    </div>

    <!-- Total Users -->
    <div class="bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300 group">
        <div class="flex items-center justify-between">
            <div class="flex-1">
                <div class="flex items-center justify-between mb-2">
                    <p class="text-sm font-medium text-purple-600 uppercase tracking-wide">Total Users</p>
                    <div class="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"></path>
                        </svg>
                    </div>
                </div>
                <p class="text-3xl font-bold text-gray-900 mb-1">{{ $stats['total_users'] }}</p>
                <div class="flex items-center text-sm">
                    <svg class="w-4 h-4 text-green-500 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
                    </svg>
                    <span class="text-green-600 font-medium">Registered</span>
                </div>
            </div>
        </div>
        <div class="mt-4 pt-4 border-t border-purple-200">
            <a href="{{ route('dashboard.users') }}" class="text-purple-600 text-sm font-medium hover:text-purple-800 transition-colors duration-200">
                View Users →
            </a>
        </div>
    </div>

    <!-- Total Comments -->
    <div class="bg-gradient-to-br from-amber-50 to-amber-100 border border-amber-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300 group">
        <div class="flex items-center justify-between">
            <div class="flex-1">
                <div class="flex items-center justify-between mb-2">
                    <p class="text-sm font-medium text-amber-600 uppercase tracking-wide">Engagement</p>
                    <div class="w-10 h-10 bg-amber-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
                        </svg>
                    </div>
                </div>
                <p class="text-3xl font-bold text-gray-900 mb-1">{{ $stats['total_comments'] }}</p>
                <div class="flex items-center text-sm">
                    <svg class="w-4 h-4 text-green-500 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
                    </svg>
                    <span class="text-green-600 font-medium">Comments</span>
                </div>
            </div>
        </div>
        <div class="mt-4 pt-4 border-t border-amber-200">
            <span class="text-amber-600 text-sm font-medium">
                Great engagement! 📊
            </span>
        </div>
    </div>
</div>

<!-- Quick Actions -->
<div class="bg-white rounded-xl border border-gray-200 p-6 mb-8 shadow-sm">
    <h2 class="text-xl font-bold text-gray-900 mb-4 flex items-center">
        <svg class="w-6 h-6 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
        </svg>
        Quick Actions
    </h2>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <a href="{{ route('dashboard.episodes') }}" class="flex items-center p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg hover:from-blue-100 hover:to-blue-200 transition-all duration-200 group">
            <div class="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-200">
                <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
                </svg>
            </div>
            <div>
                <h3 class="font-medium text-gray-900">Add Episode</h3>
                <p class="text-sm text-gray-600">Create new content</p>
            </div>
        </a>
        
        <a href="{{ route('dashboard.products.create') }}" class="flex items-center p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-lg hover:from-green-100 hover:to-green-200 transition-all duration-200 group">
            <div class="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-200">
                <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
                </svg>
            </div>
            <div>
                <h3 class="font-medium text-gray-900">Add Product</h3>
                <p class="text-sm text-gray-600">New merchandise</p>
            </div>
        </a>
        
        <a href="{{ route('dashboard.ads.create') }}" class="flex items-center p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg hover:from-purple-100 hover:to-purple-200 transition-all duration-200 group">
            <div class="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-200">
                <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"></path>
                </svg>
            </div>
            <div>
                <h3 class="font-medium text-gray-900">New Ad</h3>
                <p class="text-sm text-gray-600">Promote content</p>
            </div>
        </a>
        
        <a href="{{ route('dashboard.mailing-list') }}" class="flex items-center p-4 bg-gradient-to-r from-amber-50 to-amber-100 rounded-lg hover:from-amber-100 hover:to-amber-200 transition-all duration-200 group">
            <div class="w-10 h-10 bg-amber-500 rounded-lg flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-200">
                <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
            </div>
            <div>
                <h3 class="font-medium text-gray-900">Send Newsletter</h3>
                <p class="text-sm text-gray-600">Engage audience</p>
            </div>
        </a>
    </div>
</div>

<!-- Content Grid -->
<div class="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
    <!-- Recent Episodes (Main Content) -->
    <div class="lg:col-span-2">
        <div class="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div class="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
                <div class="flex items-center justify-between">
                    <div>
                        <h3 class="text-lg font-bold text-gray-900 flex items-center">
                            <svg class="w-5 h-5 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"></path>
                            </svg>
                            Recent Episodes
                        </h3>
                        <p class="text-sm text-gray-600">Latest content on your platform</p>
                    </div>
                    <a href="{{ route('dashboard.episodes') }}" class="text-blue-600 text-sm font-medium hover:text-blue-800 transition-colors duration-200">
                        View All →
                    </a>
                </div>
            </div>
            <div class="max-h-96 overflow-y-auto">
                @forelse($stats['recent_episodes'] as $episode)
                <div class="px-6 py-4 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition-colors duration-200">
                    <div class="flex items-center justify-between">
                        <div class="flex items-center flex-1">
                            <div class="flex-shrink-0 h-12 w-12">
                                <button onclick="toggleRecentPlay('{{ $episode->id }}')" 
                                        id="recentPlayBtn-{{ $episode->id }}"
                                        class="recent-play-button h-12 w-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 flex items-center justify-center shadow-lg transition-all duration-200 hover:scale-105">
                                    <i id="recentPlayIcon-{{ $episode->id }}" class="fas fa-play text-white text-sm ml-0.5"></i>
                                </button>
                                
                                <!-- Audio Element (hidden) -->
                                <audio id="recentAudio-{{ $episode->id }}" preload="none" class="hidden">
                                    <source src="{{ $episode->audio_url }}" type="{{ $episode->audio_type ?? 'audio/mpeg' }}">
                                    Your browser does not support the audio element.
                                </audio>
                            </div>
                            <div class="ml-4 flex-1">
                                <div class="text-sm font-medium text-gray-900">{{ $episode->title }}</div>
                                <div class="text-sm text-gray-500">{{ $episode->show->title ?? 'Unknown Show' }}</div>
                                
                                <!-- Progress Bar (initially hidden) -->
                                <div id="recentProgressBar-{{ $episode->id }}" class="hidden mt-2">
                                    <div class="flex items-center space-x-2">
                                        <div class="flex-1 h-1 bg-gray-200 rounded-full overflow-hidden">
                                            <div id="recentProgress-{{ $episode->id }}" class="h-full bg-blue-500 transition-all duration-200" style="width: 0%"></div>
                                        </div>
                                        <span id="recentDuration-{{ $episode->id }}" class="text-xs text-gray-500">
                                            {{ $episode->itunes_duration ?? '00:00' }}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="text-sm text-gray-500 flex flex-col items-end space-y-2">
                            <span>{{ $episode->created_at->diffForHumans() }}</span>
                            <span id="recentEpisodeDuration-{{ $episode->id }}" class="text-xs text-gray-400">
                                {{ $episode->itunes_duration ?? '00:00' }}
                            </span>
                            
                            <!-- Hero Toggle Button -->
                            <button onclick="toggleHero('{{ $episode->id }}')" 
                                    id="heroBtn-{{ $episode->id }}"
                                    class="hero-toggle-btn {{ $episode->is_featured ? 'hero-active' : 'hero-inactive' }} px-3 py-1 text-xs font-medium rounded-full transition-all duration-200 hover:scale-105">
                                <i id="heroIcon-{{ $episode->id }}" class="fas {{ $episode->is_featured ? 'fa-star' : 'fa-star-o' }} mr-1"></i>
                                <span id="heroText-{{ $episode->id }}">{{ $episode->is_featured ? 'Hero' : 'Set Hero' }}</span>
                            </button>
                        </div>
                    </div>
                </div>
                @empty
                <div class="px-6 py-12 text-center text-gray-500">
                    <svg class="w-12 h-12 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"></path>
                    </svg>
                    <h3 class="text-lg font-medium text-gray-900 mb-2">No episodes found</h3>
                    <p class="text-gray-500 mb-4">Add some episodes to get started!</p>
                    <a href="{{ route('dashboard.episodes') }}" class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200">
                        Add Episode
                    </a>
                </div>
                @endforelse
            </div>
        </div>
    </div>

    <!-- Sidebar Widgets -->
    <div class="space-y-6">
        <!-- Platform Status -->
        <div class="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <h3 class="text-lg font-bold text-gray-900 mb-4 flex items-center">
                <svg class="w-5 h-5 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                Platform Status
            </h3>
            <div class="space-y-3">
                <div class="flex items-center justify-between">
                    <span class="text-sm text-gray-600">API Services</span>
                    <div class="flex items-center">
                        <div class="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                        <span class="text-sm font-medium text-green-600">Operational</span>
                    </div>
                </div>
                <div class="flex items-center justify-between">
                    <span class="text-sm text-gray-600">Database</span>
                    <div class="flex items-center">
                        <div class="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                        <span class="text-sm font-medium text-green-600">Connected</span>
                    </div>
                </div>
                <div class="flex items-center justify-between">
                    <span class="text-sm text-gray-600">Storage</span>
                    <div class="flex items-center">
                        <div class="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                        <span class="text-sm font-medium text-green-600">Available</span>
                    </div>
                </div>
            </div>
            <div class="mt-4 pt-4 border-t border-gray-200">
                <a href="/api-status" target="_blank" class="text-blue-600 text-sm font-medium hover:text-blue-800 transition-colors duration-200">
                    View API Status →
                </a>
            </div>
        </div>

        <!-- Recent Activity -->
        <div class="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <h3 class="text-lg font-bold text-gray-900 mb-4 flex items-center">
                <svg class="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
                Recent Activity
            </h3>
            <div class="space-y-3">
                @if(isset($stats['recent_episodes']) && $stats['recent_episodes']->count() > 0)
                    @foreach($stats['recent_episodes']->take(3) as $episode)
                    <div class="flex items-start space-x-3">
                        <div class="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                            <svg class="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
                            </svg>
                        </div>
                        <div class="flex-1 min-w-0">
                            <p class="text-sm text-gray-900 truncate">New episode: {{ Str::limit($episode->title, 30) }}</p>
                            <p class="text-xs text-gray-500">{{ $episode->created_at->diffForHumans() }}</p>
                        </div>
                    </div>
                    @endforeach
                @else
                    <div class="text-center py-4">
                        <svg class="w-8 h-8 mx-auto text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                        </svg>
                        <p class="text-sm text-gray-500">No recent activity</p>
                    </div>
                @endif
            </div>
        </div>

        <!-- API Testing -->
        <div class="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <h3 class="text-lg font-bold text-gray-900 mb-4 flex items-center">
                <svg class="w-5 h-5 mr-2 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path>
                </svg>
                API Testing
            </h3>
            <p class="text-sm text-gray-600 mb-4">Test your API endpoints</p>
            <div class="space-y-2">
                <a href="/api/v1/episodes" target="_blank" class="flex items-center justify-between w-full p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200 group">
                    <span class="text-sm font-medium text-gray-700">Episodes API</span>
                    <svg class="w-4 h-4 text-gray-400 group-hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                    </svg>
                </a>
                <a href="/api/v1/shows" target="_blank" class="flex items-center justify-between w-full p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200 group">
                    <span class="text-sm font-medium text-gray-700">Shows API</span>
                    <svg class="w-4 h-4 text-gray-400 group-hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                    </svg>
                </a>
                <a href="/api/v1/featured/episode" target="_blank" class="flex items-center justify-between w-full p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200 group">
                    <span class="text-sm font-medium text-gray-700">Featured API</span>
                    <svg class="w-4 h-4 text-gray-400 group-hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                    </svg>
                </a>
            </div>
        </div>
    </div>
</div>

<script>
// Global audio player state for recent episodes
let currentlyPlayingRecent = null;

function toggleRecentPlay(episodeId) {
    const audio = document.getElementById(`recentAudio-${episodeId}`);
    const playIcon = document.getElementById(`recentPlayIcon-${episodeId}`);
    const playBtn = document.getElementById(`recentPlayBtn-${episodeId}`);
    const progressBar = document.getElementById(`recentProgressBar-${episodeId}`);
    const progress = document.getElementById(`recentProgress-${episodeId}`);
    const durationSpan = document.getElementById(`recentDuration-${episodeId}`);
    const episodeDuration = document.getElementById(`recentEpisodeDuration-${episodeId}`);
    
    // Stop any currently playing audio
    if (currentlyPlayingRecent && currentlyPlayingRecent !== episodeId) {
        pauseRecentEpisode(currentlyPlayingRecent);
    }
    
    if (audio.paused) {
        // Play audio
        audio.play().then(() => {
            playIcon.className = 'fas fa-pause text-white text-sm';
            progressBar.classList.remove('hidden');
            currentlyPlayingRecent = episodeId;
            
            // Add visual feedback to play button and episode row
            playBtn.classList.add('bg-gradient-to-br', 'from-red-500', 'to-red-600');
            playBtn.classList.remove('from-blue-500', 'to-blue-600');
            
            // Highlight the episode row
            const episodeRow = playBtn.closest('li');
            if (episodeRow) {
                episodeRow.classList.add('recent-episode-playing');
            }
            
            // Update progress and time
            audio.addEventListener('timeupdate', () => updateRecentProgress(episodeId));
            audio.addEventListener('ended', () => resetRecentPlayer(episodeId));
            audio.addEventListener('loadstart', () => {
                playIcon.className = 'fas fa-spinner fa-spin text-white text-sm';
            });
            audio.addEventListener('canplay', () => {
                playIcon.className = 'fas fa-pause text-white text-sm';
            });
        }).catch(error => {
            console.error('Error playing audio:', error);
            alert('Error playing audio. Please try again.');
        });
    } else {
        // Pause audio
        pauseRecentEpisode(episodeId);
    }
}

function pauseRecentEpisode(episodeId) {
    const audio = document.getElementById(`recentAudio-${episodeId}`);
    const playIcon = document.getElementById(`recentPlayIcon-${episodeId}`);
    const playBtn = document.getElementById(`recentPlayBtn-${episodeId}`);
    
    audio.pause();
    playIcon.className = 'fas fa-play text-white text-sm ml-0.5';
    
    // Reset visual feedback
    playBtn.classList.remove('from-red-500', 'to-red-600');
    playBtn.classList.add('from-blue-500', 'to-blue-600');
    
    // Remove highlight from episode row
    const episodeRow = playBtn.closest('li');
    if (episodeRow) {
        episodeRow.classList.remove('recent-episode-playing');
    }
    
    if (currentlyPlayingRecent === episodeId) {
        currentlyPlayingRecent = null;
    }
}

function updateRecentProgress(episodeId) {
    const audio = document.getElementById(`recentAudio-${episodeId}`);
    const progress = document.getElementById(`recentProgress-${episodeId}`);
    const durationSpan = document.getElementById(`recentDuration-${episodeId}`);
    const episodeDuration = document.getElementById(`recentEpisodeDuration-${episodeId}`);
    
    if (audio.duration) {
        const progressPercent = (audio.currentTime / audio.duration) * 100;
        progress.style.width = `${progressPercent}%`;
        
        // Update duration displays to show current time / total time
        const currentTime = formatRecentTime(audio.currentTime);
        const totalTime = formatRecentTime(audio.duration);
        durationSpan.textContent = `${currentTime} / ${totalTime}`;
        episodeDuration.textContent = `${currentTime} / ${totalTime}`;
    }
}

function resetRecentPlayer(episodeId) {
    const playIcon = document.getElementById(`recentPlayIcon-${episodeId}`);
    const progressBar = document.getElementById(`recentProgressBar-${episodeId}`);
    const progress = document.getElementById(`recentProgress-${episodeId}`);
    const durationSpan = document.getElementById(`recentDuration-${episodeId}`);
    const episodeDuration = document.getElementById(`recentEpisodeDuration-${episodeId}`);
    const audio = document.getElementById(`recentAudio-${episodeId}`);
    const playBtn = document.getElementById(`recentPlayBtn-${episodeId}`);
    
    playIcon.className = 'fas fa-play text-white text-sm ml-0.5';
    progressBar.classList.add('hidden');
    progress.style.width = '0%';
    
    // Reset visual feedback
    playBtn.classList.remove('from-red-500', 'to-red-600');
    playBtn.classList.add('from-blue-500', 'to-blue-600');
    
    // Remove highlight from episode row
    const episodeRow = playBtn.closest('li');
    if (episodeRow) {
        episodeRow.classList.remove('recent-episode-playing');
    }
    
    // Reset duration displays to original duration
    const originalDuration = audio.duration ? formatRecentTime(audio.duration) : durationSpan.getAttribute('data-original') || '00:00';
    durationSpan.textContent = originalDuration;
    episodeDuration.textContent = originalDuration;
    
    currentlyPlayingRecent = null;
}

function formatRecentTime(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    
    if (hours > 0) {
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    } else {
        return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    }
}

// Hero toggle functionality
function toggleHero(episodeId) {
    const heroBtn = document.getElementById(`heroBtn-${episodeId}`);
    const heroIcon = document.getElementById(`heroIcon-${episodeId}`);
    const heroText = document.getElementById(`heroText-${episodeId}`);
    
    // Show loading state
    const originalContent = heroBtn.innerHTML;
    heroBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-1"></i>Setting...';
    heroBtn.disabled = true;
    
    fetch(`/dashboard/episodes/${episodeId}/toggle-hero`, {
        method: 'POST',
        headers: {
            'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
            'Content-Type': 'application/json',
        },
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            // Update all hero buttons first (reset all to inactive)
            document.querySelectorAll('.hero-toggle-btn').forEach(btn => {
                btn.classList.remove('hero-active');
                btn.classList.add('hero-inactive');
                
                const btnIcon = btn.querySelector('[id^="heroIcon-"]');
                const btnText = btn.querySelector('[id^="heroText-"]');
                if (btnIcon) btnIcon.className = 'fas fa-star-o mr-1';
                if (btnText) btnText.textContent = 'Set Hero';
            });
            
            // Update the clicked button based on response
            if (data.is_hero) {
                heroBtn.classList.remove('hero-inactive');
                heroBtn.classList.add('hero-active');
                heroIcon.className = 'fas fa-star mr-1';
                heroText.textContent = 'Hero';
            } else {
                heroBtn.classList.remove('hero-active');
                heroBtn.classList.add('hero-inactive');
                heroIcon.className = 'fas fa-star-o mr-1';
                heroText.textContent = 'Set Hero';
            }
            
            // Show success message
            showHeroMessage(data.message, 'success');
        } else {
            showHeroMessage(data.message, 'error');
        }
    })
    .catch(error => {
        console.error('Hero toggle error:', error);
        showHeroMessage('Failed to toggle hero status. Please try again.', 'error');
    })
    .finally(() => {
        heroBtn.innerHTML = originalContent;
        heroBtn.disabled = false;
    });
}

function showHeroMessage(message, type) {
    // Create and show a temporary notification
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 px-4 py-2 rounded-lg shadow-lg z-50 transition-all duration-300 ${
        type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
    }`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateY(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateY(-100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Store original durations when page loads
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('[id^="recentDuration-"]').forEach(span => {
        span.setAttribute('data-original', span.textContent);
    });
    document.querySelectorAll('[id^="recentEpisodeDuration-"]').forEach(span => {
        span.setAttribute('data-original', span.textContent);
    });
});
</script>

<style>
/* Recent episodes player enhancements */
.recent-play-button:hover {
    transform: scale(1.1);
    box-shadow: 0 8px 25px rgba(59, 130, 246, 0.4);
}

/* Loading spinner for recent episodes */
@keyframes recent-pulse-ring {
    0% {
        transform: scale(0.8);
        opacity: 1;
    }
    100% {
        transform: scale(1.2);
        opacity: 0;
    }
}

.recent-loading-ring::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    border: 2px solid #ffffff;
    border-radius: 50%;
    animation: recent-pulse-ring 1.5s infinite;
}

/* Playing state for recent episodes */
.recent-episode-playing {
    background: linear-gradient(135deg, rgba(59, 130, 246, 0.05) 0%, rgba(99, 102, 241, 0.05) 100%);
    border-left: 4px solid #3b82f6;
}

/* Hero toggle button styles */
.hero-toggle-btn {
    border: 1px solid transparent;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

.hero-inactive {
    background: linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%);
    color: #6b7280;
    border-color: #d1d5db;
}

.hero-inactive:hover {
    background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%);
    color: white;
    border-color: #d97706;
    box-shadow: 0 4px 12px rgba(251, 191, 36, 0.4);
}

.hero-active {
    background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%);
    color: white;
    border-color: #d97706;
    box-shadow: 0 4px 12px rgba(251, 191, 36, 0.4);
}

.hero-active:hover {
    background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
    box-shadow: 0 6px 16px rgba(251, 191, 36, 0.5);
}

/* Hero notification styles */
.hero-notification {
    opacity: 0;
    transform: translateY(-100%);
    font-weight: 500;
    min-width: 200px;
    max-width: 400px;
}

.hero-notification.show {
    opacity: 1;
    transform: translateY(0);
}
</style>
@endsection