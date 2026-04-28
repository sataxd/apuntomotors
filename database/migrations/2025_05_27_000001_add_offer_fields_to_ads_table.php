<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up()
    {
        Schema::table('ads', function (Blueprint $table) {
            $table->uuid('offer_item_id')->nullable()->after('item_id');
            $table->decimal('offer_price', 10, 2)->nullable()->after('offer_item_id');
            $table->string('banner_image')->nullable()->after('image');
        });
    }

    public function down()
    {
        Schema::table('ads', function (Blueprint $table) {
            $table->dropColumn(['offer_item_id', 'offer_price', 'banner_image']);
        });
    }
};
