<?php

namespace App\Http\Controllers;

use App\Models\Aboutus;
use App\Models\Ad;
use App\Models\Category;
use App\Models\CoreValue;
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

class ServicesController extends BasicController
{
    public $reactView = 'Services';
    public $reactRootView = 'public';

    public function setReactViewProperties(Request $request)
    {
        $servicios = Services::where('slug', $request->slug)->where('status', true)->where('visible', true)->firstOrFail();  
        
        return [
            'servicios' => $servicios,
            'seo_title' => $servicios->name . ' en Lima | Apunto Motors',
            'seo_description' => \Illuminate\Support\Str::limit(strip_tags($servicios->description), 155),
            'seo_image' => $servicios->image ? url("/api/services/media/{$servicios->image}") : asset('assets/img/logoapuntomotor.png'),
            'canonical_url' => url("/servicios/{$servicios->slug}"),
        ];
    }
}
