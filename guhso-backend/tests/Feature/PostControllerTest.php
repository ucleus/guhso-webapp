<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class PostControllerTest extends TestCase
{
    use RefreshDatabase;

    public function test_creates_post_without_user_id_defaults_to_authenticated_user(): void
    {
        $user = User::factory()->create();

        $payload = [
            'title' => 'Test Post',
            'body' => 'Some body',
            'status' => 'draft',
        ];

        $response = $this->actingAs($user, 'sanctum')->postJson('/api/v1/posts', $payload);

        $response->assertStatus(201)
            ->assertJsonPath('user_id', $user->id);

        $this->assertDatabaseHas('posts', [
            'title' => 'Test Post',
            'user_id' => $user->id,
        ]);
    }
}
