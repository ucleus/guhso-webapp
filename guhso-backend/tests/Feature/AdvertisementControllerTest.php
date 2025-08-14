<?php

namespace Tests\Feature;

use App\Models\Advertisement;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class AdvertisementControllerTest extends TestCase
{
    use RefreshDatabase;

    public function test_store_calculates_end_at_from_duration(): void
    {
        Sanctum::actingAs(User::factory()->create(['role' => 'admin']));

        $response = $this->postJson('/api/v1/admin/ads', [
            'title' => 'Test Ad',
            'duration_days' => 5,
            'start_at' => '2025-01-01 08:00:00',
        ]);

        $response->assertStatus(201)->assertJsonFragment(['title' => 'Test Ad']);

        $ad = Advertisement::first();
        $this->assertEquals('2025-01-01 08:00:00', $ad->start_at->format('Y-m-d H:i:s'));
        $this->assertEquals('2025-01-06 08:00:00', $ad->end_at->format('Y-m-d H:i:s'));
    }

    public function test_active_endpoint_returns_only_current_ads(): void
    {
        Advertisement::factory()->create([
            'title' => 'Active Ad',
            'start_at' => now()->subDay(),
            'end_at' => now()->addDay(),
            'is_active' => true,
        ]);

        Advertisement::factory()->create([
            'title' => 'Expired Ad',
            'start_at' => now()->subDays(5),
            'end_at' => now()->subDay(),
            'is_active' => true,
        ]);

        $response = $this->getJson('/api/v1/ads');

        $response->assertStatus(200);
        $response->assertJsonCount(1);
        $response->assertJsonFragment(['title' => 'Active Ad']);
    }
}
