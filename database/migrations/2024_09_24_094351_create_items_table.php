<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('items', function (Blueprint $table) {
            $table->uuid('id')->default(DB::raw('(UUID())'))->primary();
            $table->string('slug');
            $table->string('name');
            $table->longText('summary')->nullable();
            $table->longText('description')->nullable();
            $table->decimal('price', 10, 2)->default(0.00);
            $table->decimal('discount', 10, 2)->default(0.00)->nullable();
            $table->decimal('final_price', 10, 2)->default(0.00);
            $table->decimal('discount_percent', 10, 2)->default(0.00);
            $table->string('banner')->nullable();
            $table->string('image')->nullable();
            $table->foreignUuid('category_id')->nullable()->constrained('categories')->nullOnDelete();
            $table->boolean('is_new')->default(false);
            $table->boolean('offering')->default(false);
            $table->boolean('recommended')->default(false);
            $table->boolean('featured')->default(false);
            $table->boolean('visible')->default(true);
            $table->boolean('status')->default(true)->nullable();
            $table->string('sku')->nullable();
            $table->integer('score')->default(0);
            $table->integer('stock')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('items');
    }
};
