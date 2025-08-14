<?php

namespace Database\Factories;

use App\Models\Advertisement;
use Illuminate\Database\Eloquent\Factories\Factory;

class AdvertisementFactory extends Factory
{
    protected $model = Advertisement::class;

    public function definition(): array
    {
        return [
            'title' => $this->faker->sentence,
            'description' => $this->faker->paragraph,
            'website_url' => $this->faker->url,
            'facebook_url' => $this->faker->url,
            'twitter_url' => $this->faker->url,
            'instagram_url' => $this->faker->url,
            'linkedin_url' => $this->faker->url,
            'phone' => $this->faker->phoneNumber,
            'email' => $this->faker->safeEmail,
            'start_at' => now()->subDay(),
            'end_at' => now()->addDay(),
            'is_active' => true,
        ];
    }
}
