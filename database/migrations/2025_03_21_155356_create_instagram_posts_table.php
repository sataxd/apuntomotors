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
        Schema::create('instagram_posts', function (Blueprint $table) {
            $table->uuid('id')->default(DB::raw('(UUID())'))->primary();
            $table->string('name')->nullable(); // URL o ruta de la imagen
            $table->string('summary')->nullable(); // Texto alternativo
            $table->text('image')->nullable(); // Texto alternativo
            $table->text('link')->nullable(); // Texto alternativo
            $table->boolean('visible')->default(true); // Texto alternativo
            $table->boolean('status')->default(true); // Texto alternativo
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('instagram_posts');
    }
};
