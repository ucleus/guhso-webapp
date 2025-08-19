<?php

namespace Database\Seeders;

use App\Models\Size;
use Illuminate\Database\Seeder;

class SizeSeeder extends Seeder
{
    public function run(): void
    {
        $sizes = [
            ['label' => 'XS', 'sort_order' => 1, 'active' => true],
            ['label' => 'S', 'sort_order' => 2, 'active' => true],
            ['label' => 'M', 'sort_order' => 3, 'active' => true],
            ['label' => 'L', 'sort_order' => 4, 'active' => true],
            ['label' => 'XL', 'sort_order' => 5, 'active' => true],
            ['label' => 'XXL', 'sort_order' => 6, 'active' => true],
            ['label' => 'One Size', 'sort_order' => 10, 'active' => true],
        ];

        foreach ($sizes as $size) {
            Size::firstOrCreate(
                ['label' => $size['label']],
                $size
            );
        }
    }
}