<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Episode extends Model
{
    use HasFactory;

    protected $fillable = [
        'show_id',
        'title',
        'description',
        'link',
        'author',
        'category',
        'comments_url',
        'guid',
        'pub_date',
        'source',
        'audio_url',
        'audio_length',
        'audio_type',
        'duration',
        'itunes_author',
        'itunes_subtitle',
        'itunes_summary',
        'itunes_image',
        'itunes_duration',
        'itunes_explicit',
        'itunes_keywords',
        'itunes_season',
        'itunes_episode',
        'itunes_episode_type',
        'itunes_block',
        'episode_number',
        'season_number',
        'transcript_url',
        'chapters_url',
        'thumbnail_url',
        'is_published',
        'is_featured',
        'is_featured_sidebar',
        'is_manual',
        'premium_required',
        'min_subscription_tier',
        'play_count',
        'download_count',
        'like_count',
        'comment_count',
        'share_count',
        'avg_rating',
        'total_ratings',
        'tags',
        'search_keywords',
        'seo_title',
        'seo_description',
        'published_at',
    ];

    protected $casts = [
        'published_at' => 'datetime',
        'is_published' => 'boolean',
        'tags' => 'array',
        'view_count' => 'integer',
    ];

    public function show()
    {
        return $this->belongsTo(Show::class);
    }

    public function comments()
    {
        return $this->hasMany(Comment::class);
    }

    public function scopePublished($query)
    {
        return $query->where('is_published', true);
    }

    public function getDurationInMinutesAttribute()
    {
        if (!$this->duration) return 0;
        
        $parts = explode(':', $this->duration);
        if (count($parts) === 3) {
            return ($parts[0] * 60) + $parts[1] + ($parts[2] / 60);
        } elseif (count($parts) === 2) {
            return $parts[0] + ($parts[1] / 60);
        }
        
        return 0;
    }
}
