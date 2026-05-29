<?php

namespace App\Http\Controllers;

use App\Models\Aboutus;
use App\Models\Ad;
use App\Models\Category;
use App\Models\CoreValue;
use App\Models\General;
use App\Models\Indicator;
use App\Models\InstagramPost;
use App\Models\Item;
use App\Models\Post;
use App\Models\Services;
use App\Models\Slider;
use App\Models\Strength;
use App\Models\Supply;
use App\Models\Testimony;
use Illuminate\Http\Request;

class HomeController extends BasicController
{
    public $reactView = 'Home';
    public $reactRootView = 'public';

    public function setReactViewProperties(Request $request)
    {
        $sliders = Slider::where('status', true)->where('visible', true)->orderBy('created_at', 'desc')->get();
        $testimonies = Testimony::where('status', true)->where('visible', true)->get();
        $items = Item::where('featured', true)->where('visible', true)->where('status', true)->get();
        $supplies = Supply::where('status', true)->where('visible', true)->where('featured', true)->get();
        $category = Category::where('status', true)->where('visible', true)->get();
        $brands = CoreValue::where('status', true)->where('visible', true)->get();
        $strengthout = Strength::where('status', true)->where('visible', true)->where('description', 'out')->get();
        $strengthin = Strength::where('status', true)->where('visible', true)->where('description', 'in')->get();
        $services = Services::where('status', true)->where('visible', true)->where('featured', true)->get();
        $clientes = InstagramPost::where('status', true)->where('visible', true)->get();
        $indicadores = Indicator::where('status', true)->where('visible', true)->get();
        $dataAbout = Aboutus::all();
        $dataGeneral = General::all();
        $popups = Ad::today();
        // $top_sale = Item::where('status', true)->where('visible', true)->where('featured', true)->with(['colors', 'sizes'])->orderBy('updated_at', 'DESC')->first();

      

        // dump($top_sale);
        return [
            'sliders' => $sliders,
            'testimonies' => $testimonies,
            'items' => $items,
            'supplies' => $supplies,
            'popups' => $popups,
            'category' => $category,
            'brands' => $brands,
            'strengthout' => $strengthout,
            'strengthin' => $strengthin,
            'clientes' => $clientes,
            'indicadores' => $indicadores,
            'dataAbout' => $dataAbout,
            'dataGeneral' => $dataGeneral,
            'services' => $services,
        ];
    }
}
