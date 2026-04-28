<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('items', function (Blueprint $table) {
            $table->foreignUuid('marca_id')->nullable()->constrained('core_values')->nullOnDelete();
            $table->foreignUuid('subcategory_id')->after('category_id')->nullable()->constrained('subcategories')->nullOnDelete();
            $table->json('tags')->after('pack_items')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('items', function (Blueprint $table) {
            $table->dropForeign(['marca_id']);
            $table->dropForeign(['subcategory_id']);
            $table->dropColumn(['marca_id', 'subcategory_id', 'tags']);
        });
    }
};
