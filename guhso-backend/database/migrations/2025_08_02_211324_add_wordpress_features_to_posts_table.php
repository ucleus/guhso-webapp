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
        Schema::table('posts', function (Blueprint $table) {
            $table->string('slug')->unique()->after('title');
            $table->text('excerpt')->nullable()->after('body');
            $table->string('cover_image')->nullable()->after('excerpt');
            $table->enum('status', ['draft', 'published', 'private'])->default('draft')->after('cover_image');
            $table->timestamp('published_at')->nullable()->after('status');
            $table->foreignId('user_id')->nullable()->constrained()->after('published_at');
            $table->string('meta_title')->nullable()->after('user_id');
            $table->text('meta_description')->nullable()->after('meta_title');
            $table->json('tags')->nullable()->after('meta_description');
            $table->integer('view_count')->default(0)->after('tags');
            $table->boolean('allow_comments')->default(true)->after('view_count');
            $table->boolean('is_sticky')->default(false)->after('allow_comments');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('posts', function (Blueprint $table) {
            $table->dropColumn([
                'slug',
                'excerpt',
                'cover_image',
                'status',
                'published_at',
                'user_id',
                'meta_title',
                'meta_description',
                'tags',
                'view_count',
                'allow_comments',
                'is_sticky'
            ]);
        });
    }
};
