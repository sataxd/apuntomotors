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
        Schema::table('generals', function (Blueprint $table) {
            // SEO Fields
            $table->string('meta_title')->nullable();
            $table->text('meta_description')->nullable();
            $table->text('meta_keywords')->nullable();
            
            // Tracking Pixels
            $table->string('facebook_pixel')->nullable();
            $table->string('meta_pixel')->nullable();
            $table->string('tiktok_pixel')->nullable();
            $table->string('google_analytics')->nullable();
            $table->string('google_tag_manager')->nullable();
            $table->string('microsoft_clarity')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('generals', function (Blueprint $table) {
            $table->dropColumn([
                'meta_title',
                'meta_description', 
                'meta_keywords',
                'facebook_pixel',
                'meta_pixel',
                'tiktok_pixel',
                'google_analytics',
                'google_tag_manager',
                'microsoft_clarity'
            ]);
        });
    }
};
