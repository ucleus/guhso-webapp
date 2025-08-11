<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Post;
use App\Models\User;

class CreateSamplePosts extends Command
{
    protected $signature = 'posts:create-sample';
    protected $description = 'Create sample blog posts for testing';

    public function handle()
    {
        $user = User::first();
        if (!$user) {
            $user = User::create([
                'name' => 'Admin',
                'email' => 'admin@test.com',
                'password' => bcrypt('password'),
                'role' => 'admin'
            ]);
        }

        $posts = [
            [
                'title' => 'Welcome to It Guhso Blog',
                'slug' => 'welcome-to-it-guhso-blog',
                'body' => 'This is our first blog post on It Guhso! We are excited to share insights, stories, and updates with our community. Stay tuned for more amazing content!',
                'excerpt' => 'Welcome to our new blog where we share insights and updates.',
                'status' => 'published',
                'published_at' => now(),
                'user_id' => $user->id,
                'is_featured' => true,
                'tags' => ['welcome', 'blog', 'announcement']
            ],
            [
                'title' => 'The Future of Podcasting',
                'slug' => 'future-of-podcasting',
                'body' => 'Podcasting has evolved dramatically over the past few years. From simple audio recordings to rich multimedia experiences, the medium continues to grow and adapt to new technologies and audience expectations.',
                'excerpt' => 'Exploring how podcasting continues to evolve and grow.',
                'status' => 'published',
                'published_at' => now()->subDays(1),
                'user_id' => $user->id,
                'is_featured' => false,
                'tags' => ['podcasting', 'technology', 'future']
            ],
            [
                'title' => 'Behind the Scenes at Guhso',
                'slug' => 'behind-the-scenes-at-guhso',
                'body' => 'Ever wondered what goes on behind the scenes at Guhso? From content creation to technical production, we take you through our creative process and the team that makes it all happen.',
                'excerpt' => 'A look behind the scenes at how we create our content.',
                'status' => 'published',
                'published_at' => now()->subDays(3),
                'user_id' => $user->id,
                'is_featured' => true,
                'tags' => ['behind-the-scenes', 'team', 'process']
            ]
        ];

        foreach ($posts as $postData) {
            Post::create($postData);
            $this->info("Created post: {$postData['title']}");
        }

        $this->info('Sample posts created successfully!');
    }
}