@extends('dashboard.layout')

@section('title', 'Products - Guhso Dashboard')

@section('content')
<div class="mb-6">
    <h1 class="text-2xl font-semibold text-gray-900 mb-2">Products</h1>
    <div class="flex space-x-4 text-sm text-gray-700">
        <span>Total Products: {{ $totalProducts }}</span>
        <span>Out of Stock: {{ $outOfStock }}</span>
    </div>
    <div class="mt-4">
        <a href="{{ route('dashboard.products.create') }}" class="bg-blue-500 text-white px-4 py-2 rounded">Create Product</a>
    </div>
</div>

@if(session('status'))
    <div class="bg-green-100 text-green-700 p-2 mb-4">{{ session('status') }}</div>
@endif

<table class="min-w-full bg-white rounded shadow">
    <thead>
        <tr>
            <th class="px-4 py-2 text-left">Name</th>
            <th class="px-4 py-2 text-left">Price</th>
            <th class="px-4 py-2 text-left">Stock</th>
            <th class="px-4 py-2 text-left">Active</th>
        </tr>
    </thead>
    <tbody>
        @forelse($products as $product)
            <tr class="border-t">
                <td class="px-4 py-2">{{ $product->name }}</td>
                <td class="px-4 py-2">${{ number_format($product->base_price, 2) }}</td>
                <td class="px-4 py-2">{{ $product->variants->sum('stock_qty') }}</td>
                <td class="px-4 py-2">{{ $product->active ? 'Yes' : 'No' }}</td>
            </tr>
        @empty
            <tr>
                <td colspan="4" class="px-4 py-4 text-center text-gray-500">No products found.</td>
            </tr>
        @endforelse
    </tbody>
</table>
@endsection
