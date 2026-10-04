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
        Schema::table('messages', function (Blueprint $table) {
            $table->longText('email')->nullable()->change();
            $table->string('subject')->nullable()->change();
            $table->string('name')->nullable()->change();
            $table->longText('description')->nullable()->change();
            $table->boolean('seen')->default(false)->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('messages', function (Blueprint $table) {
            $table->longText('email')->nullable(false)->change();
            $table->string('subject')->nullable(false)->change();
            $table->string('name')->nullable()->change(false);
            $table->longText('description')->nullable(false)->change();
            $table->boolean('seen')->default(false)->nullable(false)->change();
        });
    }
};
