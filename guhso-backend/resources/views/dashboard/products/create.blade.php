@extends('dashboard.layout')

@section('title', 'Create Product - Guhso Dashboard')

@section('content')
<h1 class="text-2xl font-semibold text-gray-900 mb-4">Create Product</h1>

@if ($errors->any())
    <div class="bg-red-100 text-red-700 p-2 mb-4">
        <ul class="list-disc pl-5">
            @foreach ($errors->all() as $error)
                <li>{{ $error }}</li>
            @endforeach
        </ul>
    </div>
@endif

<form method="POST" action="{{ route('dashboard.products.store') }}" class="space-y-4">
    @csrf
    <div>
        <label class="block mb-1">Name</label>
        <input type="text" name="name" value="{{ old('name') }}" class="w-full border px-3 py-2" />
    </div>
    <div>
        <label class="block mb-1">Slug</label>
        <input type="text" name="slug" value="{{ old('slug') }}" class="w-full border px-3 py-2" />
    </div>
    <div>
        <label class="block mb-1">Subtitle</label>
        <input type="text" name="subtitle" value="{{ old('subtitle') }}" class="w-full border px-3 py-2" />
    </div>
    <div>
        <label class="block mb-1">Base Price</label>
        <input type="number" step="0.01" name="base_price" value="{{ old('base_price') }}" class="w-full border px-3 py-2" />
    </div>
    <div>
        <label class="block mb-1">Inventory Badge</label>
        <input type="text" name="inventory_badge" value="{{ old('inventory_badge') }}" class="w-full border px-3 py-2" />
    </div>
    <div>
        <label class="block mb-1">Description</label>
        <textarea name="description_md" class="w-full border px-3 py-2">{{ old('description_md') }}</textarea>
    </div>
    <div>
        <label class="block mb-1">Details</label>
        <textarea name="details_md" class="w-full border px-3 py-2">{{ old('details_md') }}</textarea>
    </div>
    <div>
        <label class="block mb-1">Care</label>
        <textarea name="care_md" class="w-full border px-3 py-2">{{ old('care_md') }}</textarea>
    </div>
    <div>
        <label class="block mb-1">SKU</label>
        <input type="text" name="sku" value="{{ old('sku') }}" class="w-full border px-3 py-2" />
    </div>
    <div>
        <label class="block mb-1">Variant Price</label>
        <input type="number" step="0.01" name="variant_price" value="{{ old('variant_price') }}" class="w-full border px-3 py-2" />
    </div>
    <div>
        <label class="block mb-1">Stock Quantity</label>
        <input type="number" name="stock_qty" value="{{ old('stock_qty') }}" class="w-full border px-3 py-2" />
    </div>
    <div class="flex items-center">
        <input type="checkbox" name="active" value="1" class="mr-2" {{ old('active', true) ? 'checked' : '' }} />
        <label>Active</label>
    </div>
    <div>
        <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded">Save</button>
    </div>
</form>
@endsection
