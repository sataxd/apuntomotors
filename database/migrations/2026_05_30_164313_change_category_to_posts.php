<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {   
        Schema::disableForeignKeyConstraints();
        // 1. Eliminamos la tabla si ya existe para limpiar llaves foráneas antiguas
        Schema::dropIfExists('posts');

        Schema::enableForeignKeyConstraints();
        // 2. Creamos la tabla con la nueva estructura
        Schema::create('posts', function (Blueprint $table) {
            $table->uuid('id')->default(DB::raw('(UUID())'))->primary();
            $table->string('name');
            $table->longText('summary')->nullable();
            $table->longText('description')->nullable();
            $table->string('image')->nullable();
            $table->date('post_date')->nullable();
            
            $table->foreignUuid('category_id')
                ->nullable()
                ->constrained('category_posts') 
                ->nullOnDelete();

            $table->boolean('status')->default(true)->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
         Schema::dropIfExists('posts');
    }
};