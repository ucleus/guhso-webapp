<?php
// 1. Create Dashboard Controller
// Run: php artisan make:controller DashboardController

// app/Http/Controllers/DashboardController.php
namespace App\Http\Controllers;

use App\Models\Show;
use App\Models\Episode;
use App\Models\User;
use App\Models\Comment;
use App\Models\Category;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function index()
    {
        $stats = [
            'total_shows' => Show::count(),
            'total_episodes' => Episode::count(),
            'total_users' => User::count(),
            'total_comments' => Comment::count(),
            'recent_episodes' => Episode::with('show')->latest()->take(5)->get(),
            'recent_users' => User::latest()->take(5)->get(),
            'active_shows' => Show::where('is_active', true)->count(),
            'published_episodes' => Episode::where('is_published', true)->count(),
        ];

        return view('dashboard.index', compact('stats'));
    }

    public function shows()
    {
        $shows = Show::with('categories')->withCount('episodes')->paginate(10);
        return view('dashboard.shows', compact('shows'));
    }

    public function episodes()
    {
        $episodes = Episode::with('show')->latest()->paginate(20);
        return view('dashboard.episodes', compact('episodes'));
    }

    public function users()
    {
        $users = User::latest()->paginate(20);
        return view('dashboard.users', compact('users'));
    }

    public function syncEpisodesFromRSS()
    {
        try {
            $rssUrl = 'https://anchor.fm/s/341db29c/podcast/rss';
            
            // Fetch RSS feed
            $xmlString = file_get_contents($rssUrl);
            if (!$xmlString) {
                return response()->json(['success' => false, 'message' => 'Failed to fetch RSS feed']);
            }
            
            $xml = simplexml_load_string($xmlString);
            if (!$xml) {
                return response()->json(['success' => false, 'message' => 'Failed to parse RSS feed']);
            }
            
            $syncedCount = 0;
            $errors = [];
            
            // Parse episodes from RSS
            foreach ($xml->channel->item as $item) {
                try {
                    // Extract episode data
                    $title = (string) $item->title;
                    $description = strip_tags((string) $item->description);
                    $pubDate = (string) $item->pubDate;
                    $link = (string) $item->link;
                    $guid = (string) $item->guid;
                    
                    // Extract audio info
                    $audioUrl = (string) ($item->enclosure['url'] ?? '');
                    $audioLength = (string) ($item->enclosure['length'] ?? '');
                    $audioType = (string) ($item->enclosure['type'] ?? '');
                    
                    // Default values
                    $duration = '';
                    $episodeNumber = null;
                    $seasonNumber = null;
                    $image = '';
                    $explicit = 'false';
                    
                    // Extract iTunes data if available
                    $namespaces = $item->getNameSpaces(true);
                    if (isset($namespaces['itunes'])) {
                        $itunes = $item->children($namespaces['itunes']);
                        $duration = (string) $itunes->duration;
                        $episodeNumber = (int) $itunes->episode ?: null;
                        $seasonNumber = (int) $itunes->season ?: null;
                        $image = (string) $itunes->image['href'] ?? '';
                        $explicit = (string) $itunes->explicit;
                    }
                    
                    // Ensure required fields have values
                    if (empty($audioUrl)) {
                        $audioUrl = 'https://anchor.fm/s/341db29c/podcast/play/default';
                    }

                    // Convert duration to seconds for the duration column (int)
                    $durationInSeconds = 0;
                    if ($duration) {
                        $parts = explode(':', $duration);
                        if (count($parts) === 3) {
                            $durationInSeconds = ($parts[0] * 3600) + ($parts[1] * 60) + $parts[2];
                        } elseif (count($parts) === 2) {
                            $durationInSeconds = ($parts[0] * 60) + $parts[1];
                        }
                    }

                    // Create episode data array
                    $episodeData = [
                        'show_id' => 1,
                        'title' => $title,
                        'description' => $description,
                        'link' => $link,
                        'guid' => $guid,
                        'pub_date' => $pubDate ? date('Y-m-d H:i:s', strtotime($pubDate)) : null,
                        'published_at' => $pubDate ? date('Y-m-d H:i:s', strtotime($pubDate)) : null,
                        'audio_url' => $audioUrl,
                        'audio_length' => $audioLength,
                        'audio_type' => $audioType,
                        'duration' => $durationInSeconds, // Store as seconds (int)
                        'itunes_duration' => $duration, // Store as time string (varchar)
                        'episode_number' => $episodeNumber,
                        'season_number' => $seasonNumber,
                        'itunes_season' => $seasonNumber,
                        'itunes_episode' => $episodeNumber,
                        'thumbnail_url' => $image,
                        'itunes_image' => $image,
                        'itunes_explicit' => $explicit === 'true' ? 1 : 0,
                        'is_published' => true,
                        'is_manual' => false,
                        'play_count' => 0,
                    ];

                    // Create or update episode
                    $episode = Episode::updateOrCreate(
                        ['guid' => $guid], // Use GUID as unique identifier
                        $episodeData
                    );
                    
                    if ($episode) {
                        $syncedCount++;
                    }
                } catch (\Exception $e) {
                    $errors[] = "Failed to sync episode: {$title} - {$e->getMessage()}";
                }
            }
            
            return response()->json([
                'success' => true,
                'message' => "Successfully synced {$syncedCount} episodes",
                'errors' => $errors
            ]);
            
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'RSS sync failed: ' . $e->getMessage()
            ]);
        }
    }
    
    public function editEpisode(Episode $episode)
    {
        return view('dashboard.episodes.edit', compact('episode'));
    }

    public function updateEpisode(Request $request, Episode $episode)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'is_published' => 'boolean',
        ]);

        $episode->update([
            'title' => $request->title,
            'description' => $request->description,
            'is_published' => $request->has('is_published'),
        ]);

        return redirect()->route('dashboard.episodes')->with('success', 'Episode updated successfully!');
    }

    public function uploadThumbnail(Request $request, Episode $episode)
    {
        $request->validate([
            'thumbnail' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        try {
            if ($request->hasFile('thumbnail')) {
                $image = $request->file('thumbnail');
                $filename = time() . '_episode_' . $episode->id . '.' . $image->getClientOriginalExtension();
                
                // Create directory if it doesn't exist
                $uploadPath = public_path('storage/episodes/thumbnails');
                if (!file_exists($uploadPath)) {
                    mkdir($uploadPath, 0755, true);
                }
                
                // Move uploaded file
                $image->move($uploadPath, $filename);
                
                // Update episode with new thumbnail URL
                $thumbnailUrl = asset('storage/episodes/thumbnails/' . $filename);
                $episode->update(['thumbnail_url' => $thumbnailUrl]);
                
                return response()->json([
                    'success' => true,
                    'message' => 'Thumbnail uploaded successfully!',
                    'thumbnail_url' => $thumbnailUrl
                ]);
            }
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to upload thumbnail: ' . $e->getMessage()
            ]);
        }
    }

    public function toggleHero(Episode $episode)
    {
        try {
            // First, remove hero status from all other episodes
            Episode::where('is_featured', true)->update(['is_featured' => false]);
            
            // Toggle the current episode's hero status
            $episode->is_featured = !$episode->is_featured;
            $episode->save();
            
            return response()->json([
                'success' => true,
                'is_hero' => $episode->is_featured,
                'message' => $episode->is_featured 
                    ? 'Episode set as hero successfully!' 
                    : 'Episode removed from hero successfully!'
            ]);
            
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to toggle hero status: ' . $e->getMessage()
            ]);
        }
    }
}
