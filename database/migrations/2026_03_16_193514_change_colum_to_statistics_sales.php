<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB; // No olvides importar esto

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('statistics_sales', function (Blueprint $table) {
            $table->foreignUuid('website_statistic_id')
                ->nullable()
                ->change();

            $table->foreignUuid('sale_id')
                ->nullable()
                ->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('statistics_sales', function (Blueprint $table) {
            $table->foreignUuid('website_statistic_id')->nullable(false)->change();
            $table->foreignUuid('sale_id')->nullable(false)->change();
        });
    }
};
