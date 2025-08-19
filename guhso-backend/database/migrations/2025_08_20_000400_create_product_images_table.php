<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('product_images', function (Blueprint $table) {
            $table->id();
            $table->ulid('product_id');
            $table->foreign('product_id')->references('id')->on('products')->cascadeOnDelete();
            $table->foreignId('variant_id')->nullable()->constrained('product_variants');
            $table->string('alt_text')->nullable();
            $table->integer('sort_order')->default(0);
            $table->string('storage_key');
            $table->string('cdn_url_original');
            $table->string('cdn_url_lg')->nullable();
            $table->string('cdn_url_md')->nullable();
            $table->string('cdn_url_sm')->nullable();
            $table->string('cdn_url_thumb')->nullable();
            $table->string('cdn_url_webp_lg')->nullable();
            $table->string('cdn_url_webp_md')->nullable();
            $table->string('cdn_url_webp_sm')->nullable();
            $table->string('cdn_url_webp_thumb')->nullable();
            $table->integer('width')->nullable();
            $table->integer('height')->nullable();
            $table->string('dominant_hex')->nullable();
            $table->text('blurhash')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('product_images');
    }
};
