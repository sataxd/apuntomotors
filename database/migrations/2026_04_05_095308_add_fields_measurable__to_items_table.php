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
            // Agregamos min_stock justo después del campo stock para mantener el orden
            $table->decimal('weight', 10, 2)->default(0.00)->nullable();
            $table->decimal('height', 10, 2)->default(0.00)->nullable();
            $table->decimal('capacity', 10, 2)->default(0.00)->nullable();
            $table->decimal('diameter', 10, 2)->default(0.00)->nullable();
            $table->decimal('cover', 10, 2)->default(0.00)->nullable();
            $table->string('color', 10, 2)->nullable();

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
       Schema::table('items', function (Blueprint $table) {
            // Eliminamos el campo si revertimos la migración
            $table->dropColumn('weight');
            $table->dropColumn('height');
            $table->dropColumn('capacity');
            $table->dropColumn('diameter');
            $table->dropColumn('cover');
            $table->dropColumn('color');
        });
    }
};
