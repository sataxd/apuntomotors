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
        Schema::create('formula_has_supplies', function (Blueprint $table) {
            $table->uuid('id')->default(DB::raw('(UUID())'))->primary();
            $table->char('formula_id', 36)->index();
            $table->char('supply_id', 36)->index();
            $table->timestamps();

            $table->foreign('formula_id')->references('id')->on('formulas')->onDelete('cascade');
            $table->foreign('supply_id')->references('id')->on('supplies')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('formula_has_supplies');
    }
};
