<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\ProductVariant;
use App\Models\Color;
use App\Models\Size;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class ProductController extends Controller
{
    public function index()
    {
        $products = Product::with('variants.color', 'variants.size')->get();
        $totalProducts = $products->count();
        $outOfStock = $products->filter(fn($p) => $p->variants->sum('stock_qty') <= 0)->count();

        return view('dashboard.products.index', compact('products', 'totalProducts', 'outOfStock'));
    }

    public function create()
    {
        $colors = Color::all();
        $sizes = Size::where('active', true)->orderBy('sort_order')->get();
        return view('dashboard.products.create', compact('colors', 'sizes'));
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'slug' => 'nullable|string|max:255|unique:products,slug',
            'subtitle' => 'nullable|string|max:255',
            'description_md' => 'nullable|string',
            'details_md' => 'nullable|string',
            'care_md' => 'nullable|string',
            'base_price' => 'required|numeric',
            'inventory_badge' => 'nullable|string|max:255',
            'active' => 'boolean',
            'variants' => 'required|array|min:1',
            'variants.*.color_id' => 'required|exists:colors,id',
            'variants.*.size_id' => 'required|exists:sizes,id',
            'variants.*.sku' => 'required|string|max:255|unique:product_variants,sku',
            'variants.*.price' => 'nullable|numeric',
            'variants.*.stock_qty' => 'required|integer|min:0',
        ]);

        $data['slug'] = $data['slug'] ?? Str::slug($data['name']);
        $data['active'] = $request->has('active');

        $product = Product::create([
            'slug' => $data['slug'],
            'name' => $data['name'],
            'subtitle' => $data['subtitle'] ?? null,
            'description_md' => $data['description_md'] ?? null,
            'details_md' => $data['details_md'] ?? null,
            'care_md' => $data['care_md'] ?? null,
            'base_price' => $data['base_price'],
            'inventory_badge' => $data['inventory_badge'] ?? null,
            'active' => $data['active'],
        ]);

        foreach ($data['variants'] as $variantData) {
            ProductVariant::create([
                'product_id' => $product->id,
                'color_id' => $variantData['color_id'],
                'size_id' => $variantData['size_id'],
                'sku' => $variantData['sku'],
                'price' => $variantData['price'] ?? null,
                'stock_qty' => $variantData['stock_qty'],
            ]);
        }

        return redirect()->route('dashboard.products')->with('status', 'Product created successfully.');
    }

    public function edit(Product $product)
    {
        $product->load('variants.color', 'variants.size');
        $colors = Color::all();
        $sizes = Size::where('active', true)->orderBy('sort_order')->get();
        return view('dashboard.products.edit', compact('product', 'colors', 'sizes'));
    }

    public function update(Request $request, Product $product)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'slug' => 'nullable|string|max:255|unique:products,slug,' . $product->id,
            'subtitle' => 'nullable|string|max:255',
            'description_md' => 'nullable|string',
            'details_md' => 'nullable|string',
            'care_md' => 'nullable|string',
            'base_price' => 'required|numeric',
            'inventory_badge' => 'nullable|string|max:255',
            'active' => 'boolean',
            'variants' => 'required|array|min:1',
            'variants.*.id' => 'nullable|exists:product_variants,id',
            'variants.*.color_id' => 'required|exists:colors,id',
            'variants.*.size_id' => 'required|exists:sizes,id',
            'variants.*.sku' => 'required|string|max:255',
            'variants.*.price' => 'nullable|numeric',
            'variants.*.stock_qty' => 'required|integer|min:0',
        ]);

        $data['slug'] = $data['slug'] ?? Str::slug($data['name']);
        $data['active'] = $request->has('active');

        $product->update([
            'slug' => $data['slug'],
            'name' => $data['name'],
            'subtitle' => $data['subtitle'] ?? null,
            'description_md' => $data['description_md'] ?? null,
            'details_md' => $data['details_md'] ?? null,
            'care_md' => $data['care_md'] ?? null,
            'base_price' => $data['base_price'],
            'inventory_badge' => $data['inventory_badge'] ?? null,
            'active' => $data['active'],
        ]);

        $existingVariantIds = collect($data['variants'])->pluck('id')->filter();
        $product->variants()->whereNotIn('id', $existingVariantIds)->delete();

        foreach ($data['variants'] as $variantData) {
            if (isset($variantData['id'])) {
                $variant = $product->variants()->find($variantData['id']);
                if ($variant) {
                    $variant->update([
                        'color_id' => $variantData['color_id'],
                        'size_id' => $variantData['size_id'],
                        'sku' => $variantData['sku'],
                        'price' => $variantData['price'] ?? null,
                        'stock_qty' => $variantData['stock_qty'],
                    ]);
                }
            } else {
                ProductVariant::create([
                    'product_id' => $product->id,
                    'color_id' => $variantData['color_id'],
                    'size_id' => $variantData['size_id'],
                    'sku' => $variantData['sku'],
                    'price' => $variantData['price'] ?? null,
                    'stock_qty' => $variantData['stock_qty'],
                ]);
            }
        }

        return redirect()->route('dashboard.products')->with('status', 'Product updated successfully.');
    }

    public function destroy(Product $product)
    {
        $product->variants()->delete();
        $product->delete();

        return redirect()->route('dashboard.products')->with('status', 'Product deleted successfully.');
    }
}
