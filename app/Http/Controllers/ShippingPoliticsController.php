<?php

namespace App\Http\Controllers;

use App\Models\General;
use Illuminate\Http\Request;

class ShippingPoliticsController extends BasicController
{
    public $reactView = 'ShippingPolitics';
    public $reactRootView = 'public';

    public function setReactViewProperties(Request $request)
    {
        $general = General::where('correlative', 'shipping_policy')->first();
       
        return [
            'general' => $general ?? (object)[],
        ];
    }
}
