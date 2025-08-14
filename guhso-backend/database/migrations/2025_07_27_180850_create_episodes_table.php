<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('episodes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('show_id')->constrained()->cascadeOnDelete();
            $table->string('title');
            $table->text('description')->nullable();
            $table->string('link')->nullable();
            $table->string('author')->nullable();
            $table->string('category')->nullable();
            $table->string('comments_url')->nullable();
            $table->string('guid')->nullable();
            $table->timestamp('pub_date')->nullable();
            $table->string('source')->nullable();
            $table->string('audio_url')->nullable();
            $table->integer('audio_length')->nullable();
            $table->string('audio_type')->nullable();
            $table->string('duration')->nullable();
            $table->string('itunes_author')->nullable();
            $table->string('itunes_subtitle')->nullable();
            $table->text('itunes_summary')->nullable();
            $table->string('itunes_image')->nullable();
            $table->string('itunes_duration')->nullable();
            $table->boolean('itunes_explicit')->default(false);
            $table->string('itunes_keywords')->nullable();
            $table->integer('itunes_season')->nullable();
            $table->integer('itunes_episode')->nullable();
            $table->string('itunes_episode_type')->nullable();
            $table->boolean('itunes_block')->default(false);
            $table->integer('episode_number')->nullable();
            $table->integer('season_number')->nullable();
            $table->string('transcript_url')->nullable();
            $table->string('chapters_url')->nullable();
            $table->string('thumbnail_url')->nullable();
            $table->boolean('is_published')->default(false);
            $table->boolean('is_featured')->default(false);
            $table->boolean('is_featured_sidebar')->default(false);
            $table->boolean('is_manual')->default(false);
            $table->boolean('premium_required')->default(false);
            $table->unsignedInteger('min_subscription_tier')->default(0);
            $table->unsignedInteger('play_count')->default(0);
            $table->unsignedInteger('download_count')->default(0);
            $table->unsignedInteger('like_count')->default(0);
            $table->unsignedInteger('comment_count')->default(0);
            $table->unsignedInteger('share_count')->default(0);
            $table->float('avg_rating')->default(0);
            $table->unsignedInteger('total_ratings')->default(0);
            $table->json('tags')->nullable();
            $table->text('search_keywords')->nullable();
            $table->string('seo_title')->nullable();
            $table->text('seo_description')->nullable();
            $table->unsignedInteger('view_count')->default(0);
            $table->timestamp('published_at')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('episodes');
    }
};
