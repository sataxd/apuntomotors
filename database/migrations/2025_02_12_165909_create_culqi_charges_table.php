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
        Schema::create('culqi_charges', function (Blueprint $table) {
            $table->uuid('id')->default(DB::raw('(UUID())'))->primary();
            $table->string('culqi_id');
            $table->decimal('amount');
            $table->foreignUuid('sale_id')->nullable()->constrained('sales');
            $table->foreignUuid('culqi_subscription_id')->constrained('culqi_subscriptions');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('culqi_charges');
    }
};
