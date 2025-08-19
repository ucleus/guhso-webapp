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
        $products = Product::with('variants')->get();
        $totalProducts = $products->count();
        $outOfStock = $products->filter(fn($p) => $p->variants->sum('stock_qty') <= 0)->count();

        return view('dashboard.products.index', compact('products', 'totalProducts', 'outOfStock'));
    }

    public function create()
    {
        return view('dashboard.products.create');
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
            'sku' => 'required|string|max:255|unique:product_variants,sku',
            'variant_price' => 'nullable|numeric',
            'stock_qty' => 'required|integer|min:0',
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

        $color = Color::firstOrCreate(
            ['slug' => 'default'],
            ['name' => 'Default', 'hex' => '#000000', 'is_default' => true]
        );

        $size = Size::firstOrCreate(
            ['label' => 'One Size'],
            ['sort_order' => 1, 'active' => true]
        );

        ProductVariant::create([
            'product_id' => $product->id,
            'color_id' => $color->id,
            'size_id' => $size->id,
            'sku' => $data['sku'],
            'price' => $data['variant_price'] ?? null,
            'stock_qty' => $data['stock_qty'],
        ]);

        return redirect()->route('dashboard.products')->with('status', 'Product created successfully.');
    }
}
