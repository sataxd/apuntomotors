<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('posts', function (Blueprint $table) {
            // 1. Eliminar la llave foránea actual
            $table->dropForeign('posts_category_id_foreign');

            // 2. Volver a crearla con nullOnDelete()
            // Usamos la sintaxis moderna que es más limpia
            $table->foreignUuid('category_id')
                ->nullable()
                ->change() // Asegura que el tipo sea el correcto
                ->constrained('categories')
                ->nullOnDelete();
        });
    }

    public function down(): void
    {
        Schema::table('posts', function (Blueprint $table) {
            $table->dropForeign(['category_id']);
            
            // Revertimos a como estaba originalmente (cascade)
            $table->foreign('category_id')
                ->references('id')
                ->on('categories')
                ->onDelete('cascade');
        });
    }
};