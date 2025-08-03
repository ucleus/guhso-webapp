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
        <li class="px-4 py-4 sm:px-6 relative">
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
                <div class="text-sm text-gray-500 flex flex-col items-end">
                    <span>{{ $episode->created_at->diffForHumans() }}</span>
                    <span id="recentEpisodeDuration-{{ $episode->id }}" class="text-xs text-gray-400 mt-1">
                        {{ $episode->itunes_duration ?? '00:00' }}
                    </span>
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
</style>
@endsection