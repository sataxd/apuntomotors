<?php

namespace App\Http\Controllers;

use App\Models\Aboutus;
use App\Models\CoreValue;
use App\Models\General;
use App\Models\Indicator;
use App\Models\InstagramPost;
use App\Models\Strength;
use App\Models\Testimony;
use Illuminate\Http\Request;

class AboutController extends BasicController
{
    public $reactView = 'About';
    public $reactRootView = 'public';

    public function setReactViewProperties(Request $request)
    {
        
        $strengths = Strength::where('status', true)->where('visible', true)->get();
        $dataAbout = Aboutus::all();
        $brands = CoreValue::where('status', true)->where('visible', true)->get();
        return [
            'dataAbout' => $dataAbout,
            'brands' => $brands,
        ];
    }
}
