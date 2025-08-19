<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('products', function (Blueprint $table) {
            $table->ulid('id')->primary();
            $table->string('slug')->unique();
            $table->string('name');
            $table->string('subtitle')->nullable();
            $table->longText('description_md')->nullable();
            $table->longText('details_md')->nullable();
            $table->longText('care_md')->nullable();
            $table->decimal('base_price', 10, 2)->default(0);
            $table->boolean('active')->default(true);
            $table->string('inventory_badge')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
