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
        Schema::create('website_statistics', function (Blueprint $table) {
            $table->uuid('id')->default(DB::raw('(UUID())'))->primary();
            $table->string('referrer')->default('Direct');
            $table->string('device')->nullable();
            $table->string('os')->nullable();
            $table->string('browser')->nullable();
            $table->string('location')->nullable();
            $table->string('page')->nullable();
            $table->timestamp('visited_at')->useCurrent();
            $table->timestamps();
        });

        Schema::create('statistics_sales', function (Blueprint $table) {
            $table->uuid('id')->default(DB::raw('(UUID())'))->primary();
            $table->foreignUuid('website_statistic_id')->constrained()->onDelete('cascade');
            $table->foreignUuid('sale_id')->constrained()->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('website_statistics');
        Schema::dropIfExists('statistics_sales');
    }
};
