<?php

namespace Database\Seeders;

use App\Models\Color;
use Illuminate\Database\Seeder;

class ColorSeeder extends Seeder
{
    public function run(): void
    {
        $colors = [
            ['name' => 'Black', 'slug' => 'black', 'hex' => '#000000', 'is_default' => true],
            ['name' => 'White', 'slug' => 'white', 'hex' => '#FFFFFF', 'is_default' => false],
            ['name' => 'Red', 'slug' => 'red', 'hex' => '#EF4444', 'is_default' => false],
            ['name' => 'Blue', 'slug' => 'blue', 'hex' => '#3B82F6', 'is_default' => false],
            ['name' => 'Green', 'slug' => 'green', 'hex' => '#10B981', 'is_default' => false],
            ['name' => 'Yellow', 'slug' => 'yellow', 'hex' => '#F59E0B', 'is_default' => false],
            ['name' => 'Purple', 'slug' => 'purple', 'hex' => '#8B5CF6', 'is_default' => false],
            ['name' => 'Pink', 'slug' => 'pink', 'hex' => '#EC4899', 'is_default' => false],
            ['name' => 'Gray', 'slug' => 'gray', 'hex' => '#6B7280', 'is_default' => false],
            ['name' => 'Orange', 'slug' => 'orange', 'hex' => '#F97316', 'is_default' => false],
        ];

        foreach ($colors as $color) {
            Color::firstOrCreate(
                ['slug' => $color['slug']],
                $color
            );
        }
    }
}