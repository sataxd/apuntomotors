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
        Schema::table('aboutuses', function (Blueprint $table) {
            $table->string('subtitle');
            $table->string('icon')->nullable();
            $table->string('image')->nullable();
            $table->string('button_text')->nullable();
            $table->string('button_link')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('aboutuses', function (Blueprint $table) {
            $table->dropColumn(['subtitle', 'icon', 'image', 'button_text', 'button_link']);
        });
    }
};
