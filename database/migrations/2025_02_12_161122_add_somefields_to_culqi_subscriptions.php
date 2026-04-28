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
        Schema::table('culqi_subscriptions', function (Blueprint $table) {
            $table->foreignUuid('sale_id')->nullable()->constrained('sales');
            $table->boolean('already_paid')->default(false);
            $table->integer('current_payment')->default(0);
            $table->integer('total_payments')->default(1);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('culqi_subscriptions', function (Blueprint $table) {
            $table->dropColumn([
                'sale_id',
                'already_paid',
                'current_payment',
                'total_payments'
            ]);
        });
    }
};
