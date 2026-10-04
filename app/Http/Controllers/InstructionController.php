<?php

namespace App\Http\Controllers;

use App\Models\Aboutus;
use App\Models\Ad;
use App\Models\Indicator;
use App\Models\Item;
use App\Models\Post;
use App\Models\Slider;
use App\Models\Supply;
use App\Models\Testimony;
use Illuminate\Http\Request;

class InstructionController extends BasicController
{
    public $reactView = 'Instructions';
    public $reactRootView = 'public';

    public function setReactViewProperties(Request $request)
    {
        $sliders = Slider::where('status', true)->where('visible', true)->get();
        $testimonies = Testimony::where('status', true)->where('visible', true)->get();
        $items = Item::where('featured', true)->where('visible', true)->where('status', true)->get();
        $supplies = Supply::where('status', true)->where('visible', true)->where('featured', true)->get();
        $popups = Ad::today();
        $products_featured = Item::where('status', true)->where('visible', true)->where('featured', true)->with(['colors', 'sizes'])->orderBy('updated_at', 'DESC')->limit(12)->get();
        if (count($products_featured) < 4) {
            $original_count = count($products_featured);
            $needed = 4 - $original_count;

            for ($i = 0; $i < $needed; $i++) {
                // Duplicar elementos existentes (usando el índice original)
                $products_featured->push($products_featured[$i % $original_count]);
            }
        }
        $new_product = Item::where('status', true)->where('visible', true)->where('is_new', true)->with(['colors', 'sizes'])->orderBy('updated_at', 'DESC')->first();
        return [
            'sliders' => $sliders,
            'testimonies' => $testimonies,
            'items' => $items,
            'supplies' => $supplies,
            'popups' => $popups,
            'products_featured' => $products_featured,
            'new_product' => $new_product,
        ];
    }
}
