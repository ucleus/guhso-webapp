@extends('dashboard.layout')

@section('title', 'Products - Guhso Dashboard')

@section('content')
<meta name="csrf-token" content="{{ csrf_token() }}">
<div class="mb-8">
    <div class="flex justify-between items-center mb-6">
        <div>
            <h1 class="text-3xl font-bold text-gray-900 mb-2">Products</h1>
            <div class="flex space-x-6 text-sm">
                <div class="flex items-center space-x-2">
                    <div class="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span class="text-gray-600">Total Products: <span class="font-semibold text-gray-900">{{ $totalProducts }}</span></span>
                </div>
                <div class="flex items-center space-x-2">
                    <div class="w-3 h-3 bg-red-500 rounded-full"></div>
                    <span class="text-gray-600">Out of Stock: <span class="font-semibold text-red-600">{{ $outOfStock }}</span></span>
                </div>
            </div>
        </div>
        <a href="{{ route('dashboard.products.create') }}" class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center space-x-2">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
            </svg>
            <span>Add Product</span>
        </a>
    </div>

    <!-- Search and Filter Bar -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
        <div class="flex flex-col sm:flex-row gap-4">
            <div class="flex-1">
                <div class="relative">
                    <input type="text" id="searchInput" placeholder="Search products..." class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <svg class="absolute left-3 top-2.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                    </svg>
                </div>
            </div>
            <div class="flex space-x-2">
                <select class="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option value="">All Status</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                </select>
                <select class="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option value="">All Stock</option>
                    <option value="in-stock">In Stock</option>
                    <option value="out-of-stock">Out of Stock</option>
                </select>
            </div>
        </div>
    </div>
</div>

@if(session('status'))
    <div class="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg mb-6 flex items-center">
        <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
        </svg>
        {{ session('status') }}
    </div>
@endif

<div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
    <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
                <tr>
                    <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                    <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                    <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                    <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200" id="productsTable">
                @forelse($products as $product)
                    @php
                        $totalStock = $product->variants->sum('stock_qty');
                        $isOutOfStock = $totalStock <= 0;
                    @endphp
                    <tr class="hover:bg-gray-50 transition-colors duration-200" data-product-name="{{ strtolower($product->name) }}" data-active="{{ $product->active ? 'active' : 'inactive' }}" data-stock="{{ $isOutOfStock ? 'out-of-stock' : 'in-stock' }}">
                        <td class="px-6 py-4">
                            <div class="flex items-center">
                                <div class="flex-shrink-0 h-12 w-12">
                                    @if($product->images->count() > 0)
                                        <img src="{{ $product->images->sortBy('sort_order')->first()->cdn_url_thumb }}" 
                                             alt="{{ $product->images->sortBy('sort_order')->first()->alt_text ?? $product->name }}" 
                                             class="h-12 w-12 rounded-lg object-cover border border-gray-200">
                                    @else
                                        <div class="h-12 w-12 rounded-lg bg-gray-200 flex items-center justify-center">
                                            <svg class="h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                                            </svg>
                                        </div>
                                    @endif
                                </div>
                                <div class="ml-4">
                                    <div class="text-sm font-medium text-gray-900">{{ $product->name }}</div>
                                    @if($product->subtitle)
                                        <div class="text-sm text-gray-500">{{ $product->subtitle }}</div>
                                    @endif
                                    <div class="flex items-center space-x-4 mt-1">
                                        @if($product->variants->count() > 0)
                                            <div class="flex items-center space-x-2">
                                                @foreach($product->variants->take(3) as $variant)
                                                    <div class="flex items-center text-xs text-gray-500 bg-white border border-gray-200 rounded-full px-2 py-1">
                                                        @php
                                                            $colorHex = $variant->color->hex ?? '#6B7280';
                                                        @endphp
                                                        <div class="w-2 h-2 rounded-full mr-1 border border-gray-300" style="background-color: {{ $colorHex }}"></div>
                                                        <span class="mr-1">{{ $variant->color->name }}</span>
                                                        <span class="text-gray-400">{{ $variant->size->label }}</span>
                                                    </div>
                                                @endforeach
                                                @if($product->variants->count() > 3)
                                                    <span class="text-xs text-gray-400">+{{ $product->variants->count() - 3 }} more</span>
                                                @endif
                                            </div>
                                        @endif
                                        <div class="text-xs text-gray-400">{{ $product->variants->count() }} variant(s)</div>
                                    </div>
                                </div>
                            </div>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                            <div class="text-sm font-medium text-gray-900">${{ number_format($product->base_price, 2) }}</div>
                            @if($product->inventory_badge)
                                <div class="text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded-full inline-block mt-1">{{ $product->inventory_badge }}</div>
                            @endif
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                            <div class="flex items-center">
                                @if($isOutOfStock)
                                    <div class="flex items-center text-sm text-red-600">
                                        <div class="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
                                        Out of Stock
                                    </div>
                                @elseif($totalStock <= 5)
                                    <div class="flex items-center text-sm text-yellow-600">
                                        <div class="w-2 h-2 bg-yellow-500 rounded-full mr-2"></div>
                                        Low Stock ({{ $totalStock }})
                                    </div>
                                @else
                                    <div class="flex items-center text-sm text-green-600">
                                        <div class="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                                        {{ $totalStock }} in stock
                                    </div>
                                @endif
                            </div>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                            @if($product->active)
                                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                    Active
                                </span>
                            @else
                                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                    Inactive
                                </span>
                            @endif
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div class="flex items-center space-x-2">
                                <a href="{{ route('dashboard.products.edit', $product) }}" class="text-blue-600 hover:text-blue-900 transition-colors duration-200" title="Edit">
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                                    </svg>
                                </a>
                                <button onclick="deleteProduct({{ $product->id }}, '{{ $product->name }}')" class="text-red-600 hover:text-red-900 transition-colors duration-200" title="Delete">
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                                    </svg>
                                </button>
                            </div>
                        </td>
                    </tr>
                @empty
                    <tr>
                        <td colspan="5" class="px-6 py-12 text-center">
                            <div class="flex flex-col items-center">
                                <svg class="w-12 h-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
                                </svg>
                                <h3 class="text-lg font-medium text-gray-900 mb-2">No products found</h3>
                                <p class="text-gray-500 mb-4">Get started by creating your first product.</p>
                                <a href="{{ route('dashboard.products.create') }}" class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200">
                                    Add Product
                                </a>
                            </div>
                        </td>
                    </tr>
                @endforelse
            </tbody>
        </table>
    </div>
</div>

<script>
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    const statusFilter = document.querySelector('select:nth-of-type(1)');
    const stockFilter = document.querySelector('select:nth-of-type(2)');
    const tableRows = document.querySelectorAll('#productsTable tr[data-product-name]');

    function filterTable() {
        const searchTerm = searchInput.value.toLowerCase();
        const statusValue = statusFilter.value;
        const stockValue = stockFilter.value;

        tableRows.forEach(row => {
            const productName = row.getAttribute('data-product-name');
            const productStatus = row.getAttribute('data-active');
            const productStock = row.getAttribute('data-stock');

            const matchesSearch = productName.includes(searchTerm);
            const matchesStatus = !statusValue || productStatus === statusValue;
            const matchesStock = !stockValue || productStock === stockValue;

            if (matchesSearch && matchesStatus && matchesStock) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        });
    }

    searchInput.addEventListener('input', filterTable);
    statusFilter.addEventListener('change', filterTable);
    stockFilter.addEventListener('change', filterTable);
});

function deleteProduct(productId, productName) {
    if (confirm(`Are you sure you want to delete "${productName}"? This action cannot be undone.`)) {
        const form = document.createElement('form');
        form.method = 'POST';
        form.action = `/dashboard/products/${productId}`;
        form.style.display = 'none';

        const csrfToken = document.createElement('input');
        csrfToken.type = 'hidden';
        csrfToken.name = '_token';
        csrfToken.value = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

        const methodField = document.createElement('input');
        methodField.type = 'hidden';
        methodField.name = '_method';
        methodField.value = 'DELETE';

        form.appendChild(csrfToken);
        form.appendChild(methodField);
        document.body.appendChild(form);
        form.submit();
    }
}
</script>
@endsection
