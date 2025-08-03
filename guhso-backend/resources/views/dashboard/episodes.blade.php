@extends('dashboard.layout')

@section('title', 'Episodes - Guhso Dashboard')

@section('content')
<div class="max-w-7xl mx-auto">
    <!-- Header -->
    <div class="flex items-center justify-between mb-8">
        <div>
            <h1 class="text-3xl font-bold text-gray-900">Episodes</h1>
            <p class="text-gray-600 mt-1">Manage and view all podcast episodes</p>
        </div>
        <div class="flex space-x-3">
            <button onclick="refreshFromRSS()" class="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
                <i class="fas fa-sync-alt mr-2"></i>
                Sync from RSS
            </button>
            <a href="#" class="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200">
                <i class="fas fa-plus mr-2"></i>
                Add Episode
            </a>
        </div>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div class="bg-white rounded-lg shadow p-6">
            <div class="flex items-center">
                <div class="p-3 rounded-full bg-blue-100">
                    <i class="fas fa-headphones text-blue-600 text-xl"></i>
                </div>
                <div class="ml-4">
                    <p class="text-sm font-medium text-gray-500">Total Episodes</p>
                    <p class="text-2xl font-bold text-gray-900">{{ $episodes->total() }}</p>
                </div>
            </div>
        </div>
        
        <div class="bg-white rounded-lg shadow p-6">
            <div class="flex items-center">
                <div class="p-3 rounded-full bg-green-100">
                    <i class="fas fa-play-circle text-green-600 text-xl"></i>
                </div>
                <div class="ml-4">
                    <p class="text-sm font-medium text-gray-500">Published</p>
                    <p class="text-2xl font-bold text-gray-900">{{ $episodes->where('is_published', true)->count() }}</p>
                </div>
            </div>
        </div>
        
        <div class="bg-white rounded-lg shadow p-6">
            <div class="flex items-center">
                <div class="p-3 rounded-full bg-yellow-100">
                    <i class="fas fa-clock text-yellow-600 text-xl"></i>
                </div>
                <div class="ml-4">
                    <p class="text-sm font-medium text-gray-500">Total Duration</p>
                    <p class="text-2xl font-bold text-gray-900">~45h</p>
                </div>
            </div>
        </div>
        
        <div class="bg-white rounded-lg shadow p-6">
            <div class="flex items-center">
                <div class="p-3 rounded-full bg-purple-100">
                    <i class="fas fa-calendar text-purple-600 text-xl"></i>
                </div>
                <div class="ml-4">
                    <p class="text-sm font-medium text-gray-500">This Month</p>
                    <p class="text-2xl font-bold text-gray-900">3</p>
                </div>
            </div>
        </div>
    </div>

    <!-- Filters -->
    <div class="bg-white rounded-lg shadow p-6 mb-8">
        <div class="flex flex-wrap gap-4 items-center">
            <div class="flex-1 min-w-0">
                <input type="text" placeholder="Search episodes..." class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
            </div>
            <select class="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>All Seasons</option>
                <option>Season 2</option>
                <option>Season 1</option>
            </select>
            <select class="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>All Status</option>
                <option>Published</option>
                <option>Draft</option>
            </select>
            <button class="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                <i class="fas fa-filter mr-2"></i>Filter
            </button>
        </div>
    </div>

    <!-- Episodes Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        @forelse($episodes as $episode)
        <div class="bg-white rounded-lg shadow hover:shadow-lg transition-shadow duration-300 overflow-hidden">
            <!-- Episode Image -->
            <div class="h-48 bg-gradient-to-br from-blue-500 to-purple-600 relative">
                @if(isset($episode->thumbnail_url) && $episode->thumbnail_url)
                    <img src="{{ $episode->thumbnail_url }}" alt="{{ $episode->title }}" class="w-full h-full object-cover">
                @elseif(isset($episode->itunes_image) && $episode->itunes_image)
                    <img src="{{ $episode->itunes_image }}" alt="{{ $episode->title }}" class="w-full h-full object-cover">
                @else
                    <div class="w-full h-full flex items-center justify-center">
                        <i class="fas fa-podcast text-white text-4xl opacity-50"></i>
                    </div>
                @endif
                
                <!-- Play Button Overlay -->
                <div class="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                    <button onclick="togglePlay('{{ $episode->id }}')" 
                            id="playBtn-{{ $episode->id }}" 
                            class="play-button w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg transition-all duration-200">
                        <i id="playIcon-{{ $episode->id }}" class="fas fa-play text-gray-800 text-xl ml-1"></i>
                    </button>
                </div>
                
                <!-- Audio Element (hidden) -->
                <audio id="audio-{{ $episode->id }}" preload="none" class="hidden">
                    <source src="{{ $episode->audio_url }}" type="{{ $episode->audio_type ?? 'audio/mpeg' }}">
                    Your browser does not support the audio element.
                </audio>
                
                <!-- Episode Number Badge -->
                <div class="absolute top-4 left-4">
                    <span class="bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm font-medium">
                        EP{{ $episode->episode_number ?? $episode->itunes_episode ?? $loop->iteration }}
                    </span>
                </div>
                
                <!-- Duration Badge -->
                <div class="absolute top-4 right-4">
                    <span id="durationBadge-{{ $episode->id }}" class="bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
                        {{ $episode->itunes_duration ?? '30:00' }}
                    </span>
                </div>
                
                <!-- Audio Progress Bar (initially hidden) -->
                <div id="progressBar-{{ $episode->id }}" class="absolute bottom-0 left-0 right-0 h-2 bg-gray-900 bg-opacity-60 hidden">
                    <div id="progress-{{ $episode->id }}" class="audio-progress-bar h-full transition-all duration-200" style="width: 0%"></div>
                </div>
            </div>
            
            <!-- Episode Content -->
            <div class="p-6">
                <!-- Title -->
                <h3 class="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
                    {{ $episode->title ?? 'Episode Title' }}
                </h3>
                
                <!-- Description -->
                <p class="text-gray-600 text-sm mb-4 line-clamp-3">
                    {{ Str::limit($episode->description ?? 'Episode description will appear here...', 150) }}
                </p>
                
                <!-- Metadata -->
                <div class="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <span class="flex items-center">
                        <i class="fas fa-calendar mr-1"></i>
                        {{ isset($episode->published_at) ? $episode->published_at->format('M j, Y') : (isset($episode->pub_date) ? date('M j, Y', strtotime($episode->pub_date)) : 'Not published') }}
                    </span>
                    <span class="flex items-center">
                        <i class="fas fa-eye mr-1"></i>
                        {{ $episode->play_count ?? 0 }} plays
                    </span>
                </div>
                
                <!-- Tags -->
                @if(isset($episode->tags) && $episode->tags)
                <div class="flex flex-wrap gap-1 mb-4">
                    @foreach(array_slice($episode->tags, 0, 3) as $tag)
                    <span class="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">{{ $tag }}</span>
                    @endforeach
                </div>
                @endif
                
                <!-- Status -->
                <div class="flex items-center justify-between">
                    <div class="flex items-center">
                        @if(isset($episode->is_published) && $episode->is_published)
                            <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                <i class="fas fa-check-circle mr-1"></i>
                                Published
                            </span>
                        @else
                            <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                <i class="fas fa-clock mr-1"></i>
                                Draft
                            </span>
                        @endif
                    </div>
                    
                    <!-- Actions -->
                    <div class="flex space-x-2">
                        <button class="p-2 text-gray-500 hover:text-blue-600 transition-colors" title="Edit">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="p-2 text-gray-500 hover:text-green-600 transition-colors" title="View">
                            <i class="fas fa-eye"></i>
                        </button>
                        <button class="p-2 text-gray-500 hover:text-red-600 transition-colors" title="Delete">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
        @empty
        <!-- Empty State -->
        <div class="col-span-full">
            <div class="text-center py-12">
                <div class="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i class="fas fa-podcast text-gray-400 text-3xl"></i>
                </div>
                <h3 class="text-lg font-medium text-gray-900 mb-2">No episodes found</h3>
                <p class="text-gray-500 mb-6">Get started by syncing episodes from your RSS feed or creating a new episode.</p>
                <div class="flex justify-center space-x-4">
                    <button onclick="refreshFromRSS()" class="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                        <i class="fas fa-sync-alt mr-2"></i>
                        Sync from RSS
                    </button>
                    <a href="#" class="inline-flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700">
                        <i class="fas fa-plus mr-2"></i>
                        Create Episode
                    </a>
                </div>
            </div>
        </div>
        @endforelse
    </div>
    
    <!-- Pagination -->
    @if($episodes->hasPages())
    <div class="mt-8">
        {{ $episodes->links() }}
    </div>
    @endif
</div>

<script>
// Global audio player state
let currentlyPlaying = null;

function refreshFromRSS() {
    // Show loading state
    const button = event.target.closest('button');
    const originalContent = button.innerHTML;
    button.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Syncing...';
    button.disabled = true;
    
    fetch('/dashboard/episodes/sync-rss', {
        method: 'POST',
        headers: {
            'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
            'Content-Type': 'application/json',
        },
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            location.reload();
        } else {
            alert('Sync failed: ' + data.message);
        }
    })
    .catch(error => {
        console.error('Sync error:', error);
        alert('Sync failed. Please try again.');
    })
    .finally(() => {
        button.innerHTML = originalContent;
        button.disabled = false;
    });
}

function togglePlay(episodeId) {
    const audio = document.getElementById(`audio-${episodeId}`);
    const playIcon = document.getElementById(`playIcon-${episodeId}`);
    const playBtn = document.getElementById(`playBtn-${episodeId}`);
    const progressBar = document.getElementById(`progressBar-${episodeId}`);
    const progress = document.getElementById(`progress-${episodeId}`);
    const durationBadge = document.getElementById(`durationBadge-${episodeId}`);
    
    // Stop any currently playing audio
    if (currentlyPlaying && currentlyPlaying !== episodeId) {
        pauseEpisode(currentlyPlaying);
    }
    
    if (audio.paused) {
        // Play audio
        audio.play().then(() => {
            playIcon.className = 'fas fa-pause text-gray-800 text-xl';
            progressBar.classList.remove('hidden');
            currentlyPlaying = episodeId;
            
            // Add visual feedback to episode card
            const episodeCard = playBtn.closest('.bg-white');
            if (episodeCard) {
                episodeCard.classList.add('audio-playing', 'episode-card');
            }
            
            // Update progress and time
            audio.addEventListener('timeupdate', () => updateProgress(episodeId));
            audio.addEventListener('ended', () => resetPlayer(episodeId));
            audio.addEventListener('loadstart', () => {
                playBtn.innerHTML = '<i class="fas fa-spinner fa-spin text-gray-800 text-lg loading-ring"></i>';
            });
            audio.addEventListener('canplay', () => {
                playBtn.innerHTML = '<i class="fas fa-pause text-gray-800 text-xl"></i>';
            });
        }).catch(error => {
            console.error('Error playing audio:', error);
            alert('Error playing audio. Please try again.');
        });
    } else {
        // Pause audio
        pauseEpisode(episodeId);
    }
}

function pauseEpisode(episodeId) {
    const audio = document.getElementById(`audio-${episodeId}`);
    const playIcon = document.getElementById(`playIcon-${episodeId}`);
    const playBtn = document.getElementById(`playBtn-${episodeId}`);
    
    audio.pause();
    playIcon.className = 'fas fa-play text-gray-800 text-xl ml-1';
    
    // Remove visual feedback from episode card
    const episodeCard = playBtn.closest('.bg-white');
    if (episodeCard) {
        episodeCard.classList.remove('audio-playing', 'episode-card');
    }
    
    if (currentlyPlaying === episodeId) {
        currentlyPlaying = null;
    }
}

function updateProgress(episodeId) {
    const audio = document.getElementById(`audio-${episodeId}`);
    const progress = document.getElementById(`progress-${episodeId}`);
    const durationBadge = document.getElementById(`durationBadge-${episodeId}`);
    
    if (audio.duration) {
        const progressPercent = (audio.currentTime / audio.duration) * 100;
        progress.style.width = `${progressPercent}%`;
        
        // Update duration badge to show current time / total time
        const currentTime = formatTime(audio.currentTime);
        const totalTime = formatTime(audio.duration);
        durationBadge.textContent = `${currentTime} / ${totalTime}`;
    }
}

function resetPlayer(episodeId) {
    const playIcon = document.getElementById(`playIcon-${episodeId}`);
    const progressBar = document.getElementById(`progressBar-${episodeId}`);
    const progress = document.getElementById(`progress-${episodeId}`);
    const durationBadge = document.getElementById(`durationBadge-${episodeId}`);
    const audio = document.getElementById(`audio-${episodeId}`);
    const playBtn = document.getElementById(`playBtn-${episodeId}`);
    
    playIcon.className = 'fas fa-play text-gray-800 text-xl ml-1';
    progressBar.classList.add('hidden');
    progress.style.width = '0%';
    
    // Remove visual feedback from episode card
    const episodeCard = playBtn.closest('.bg-white');
    if (episodeCard) {
        episodeCard.classList.remove('audio-playing', 'episode-card');
    }
    
    // Reset duration badge to original duration
    const originalDuration = audio.duration ? formatTime(audio.duration) : durationBadge.getAttribute('data-original') || '30:00';
    durationBadge.textContent = originalDuration;
    
    currentlyPlaying = null;
}

function formatTime(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    
    if (hours > 0) {
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    } else {
        return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    }
}

// Store original durations when page loads
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('[id^="durationBadge-"]').forEach(badge => {
        badge.setAttribute('data-original', badge.textContent);
    });
});
</script>

<style>
.line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    line-clamp: 2;
}

.line-clamp-3 {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    line-clamp: 3;
}

/* Audio player enhancements */
.audio-progress-bar {
    background: linear-gradient(90deg, rgba(59, 130, 246, 0.8) 0%, rgba(99, 102, 241, 0.8) 100%);
    box-shadow: 0 0 8px rgba(59, 130, 246, 0.5);
    border-radius: 0 0 0.5rem 0.5rem;
}

.audio-playing .episode-card {
    border: 2px solid #3b82f6;
    box-shadow: 0 0 20px rgba(59, 130, 246, 0.3);
}

/* Play button hover effects */
.play-button:hover {
    background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
    transform: scale(1.1);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
}

/* Loading spinner */
@keyframes pulse-ring {
    0% {
        transform: scale(0.8);
        opacity: 1;
    }
    100% {
        transform: scale(1.2);
        opacity: 0;
    }
}

.loading-ring::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    border: 2px solid #3b82f6;
    border-radius: 50%;
    animation: pulse-ring 1.5s infinite;
}
</style>
@endsection