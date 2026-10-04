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
        Schema::table('sales', function (Blueprint $table) {
            // Modificar los campos address y number para permitir NULL
            $table->longText('address')->nullable()->change();
            $table->longText('number')->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('sales', function (Blueprint $table) {
            // Revertir los cambios: volver a hacerlos NOT NULL
            $table->longText('address')->nullable(false)->change();
            $table->longText('number')->nullable(false)->change();
        });
    }
};