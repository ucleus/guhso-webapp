<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Product extends Model
{
    use HasFactory, HasUlids;

    protected $fillable = [
        'slug',
        'name',
        'subtitle',
        'description_md',
        'details_md',
        'care_md',
        'base_price',
        'active',
        'inventory_badge',
    ];

    protected $casts = [
        'active' => 'boolean',
        'base_price' => 'decimal:2',
    ];

    public function variants(): HasMany
    {
        return $this->hasMany(ProductVariant::class);
    }

    public function images(): HasMany
    {
        return $this->hasMany(ProductImage::class);
    }

    public function getTotalStockAttribute(): int
    {
        return $this->variants->sum('stock_qty');
    }

    public function getIsOutOfStockAttribute(): bool
    {
        return $this->total_stock <= 0;
    }
}
