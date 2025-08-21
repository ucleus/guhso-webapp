<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    /**
     * Display a listing of the products for the API.
     */
    public function index()
    {
        $products = Product::with(['variants.color', 'variants.size', 'images'])
            ->where('active', true)
            ->get()
            ->map(function ($product) {
                return [
                    'id' => $product->id,
                    'name' => $product->name,
                    'slug' => $product->slug,
                    'subtitle' => $product->subtitle,
                    'description' => $product->description_md,
                    'details' => $product->details_md,
                    'care' => $product->care_md,
                    'base_price' => $product->base_price,
                    'price' => $product->base_price, // For backward compatibility
                    'inventory_badge' => $product->inventory_badge,
                    'image_url' => $product->images->first()?->cdn_url_md ?? '/images/placeholder-product.jpg',
                    'images' => $product->images->map(function ($image) {
                        return [
                            'id' => $image->id,
                            'alt_text' => $image->alt_text,
                            'urls' => [
                                'original' => $image->cdn_url_original,
                                'large' => $image->cdn_url_lg,
                                'medium' => $image->cdn_url_md,
                                'small' => $image->cdn_url_sm,
                                'thumbnail' => $image->cdn_url_thumb,
                            ]
                        ];
                    }),
                    'variants' => $product->variants->map(function ($variant) {
                        return [
                            'id' => $variant->id,
                            'sku' => $variant->sku,
                            'price' => $variant->price ?? $variant->product->base_price,
                            'stock_qty' => $variant->stock_qty,
                            'color' => [
                                'id' => $variant->color->id,
                                'name' => $variant->color->name,
                                'hex_code' => $variant->color->hex_code,
                            ],
                            'size' => [
                                'id' => $variant->size->id,
                                'name' => $variant->size->name,
                                'abbreviation' => $variant->size->abbreviation,
                            ]
                        ];
                    }),
                    'in_stock' => $product->variants->sum('stock_qty') > 0,
                    'total_stock' => $product->variants->sum('stock_qty'),
                ];
            });

        return response()->json([
            'data' => $products,
            'total' => $products->count()
        ]);
    }

    /**
     * Display the specified product.
     */
    public function show($slug)
    {
        $product = Product::with(['variants.color', 'variants.size', 'images'])
            ->where('slug', $slug)
            ->where('active', true)
            ->first();

        if (!$product) {
            return response()->json(['message' => 'Product not found'], 404);
        }

        return response()->json([
            'id' => $product->id,
            'name' => $product->name,
            'slug' => $product->slug,
            'subtitle' => $product->subtitle,
            'description' => $product->description_md,
            'details' => $product->details_md,
            'care' => $product->care_md,
            'base_price' => $product->base_price,
            'price' => $product->base_price, // For backward compatibility
            'inventory_badge' => $product->inventory_badge,
            'image_url' => $product->images->first()?->cdn_url_md ?? '/images/placeholder-product.jpg',
            'images' => $product->images->map(function ($image) {
                return [
                    'id' => $image->id,
                    'alt_text' => $image->alt_text,
                    'urls' => [
                        'original' => $image->cdn_url_original,
                        'large' => $image->cdn_url_lg,
                        'medium' => $image->cdn_url_md,
                        'small' => $image->cdn_url_sm,
                        'thumbnail' => $image->cdn_url_thumb,
                    ]
                ];
            }),
            'variants' => $product->variants->map(function ($variant) {
                return [
                    'id' => $variant->id,
                    'sku' => $variant->sku,
                    'price' => $variant->price ?? $variant->product->base_price,
                    'stock_qty' => $variant->stock_qty,
                    'color' => [
                        'id' => $variant->color->id,
                        'name' => $variant->color->name,
                        'hex_code' => $variant->color->hex_code,
                    ],
                    'size' => [
                        'id' => $variant->size->id,
                        'name' => $variant->size->name,
                        'abbreviation' => $variant->size->abbreviation,
                    ]
                ];
            }),
            'in_stock' => $product->variants->sum('stock_qty') > 0,
            'total_stock' => $product->variants->sum('stock_qty'),
        ]);
    }
}