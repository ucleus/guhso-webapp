<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ProductImage extends Model
{
    use HasFactory;

    protected $fillable = [
        'product_id',
        'variant_id',
        'alt_text',
        'sort_order',
        'storage_key',
        'cdn_url_original',
        'cdn_url_lg',
        'cdn_url_md',
        'cdn_url_sm',
        'cdn_url_thumb',
        'cdn_url_webp_lg',
        'cdn_url_webp_md',
        'cdn_url_webp_sm',
        'cdn_url_webp_thumb',
        'width',
        'height',
        'dominant_hex',
        'blurhash',
    ];

    protected $casts = [
        'sort_order' => 'integer',
        'width' => 'integer',
        'height' => 'integer',
    ];

    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }

    public function variant(): BelongsTo
    {
        return $this->belongsTo(ProductVariant::class, 'variant_id');
    }
}
