<?php

namespace App\Http\Controllers;

use App\Models\General;
use Illuminate\Http\Request;

class ReturnPoliticsController extends BasicController
{
    public $reactView = 'ReturnPolitics';
    public $reactRootView = 'public';

    public function setReactViewProperties(Request $request)
    {
        $general = General::where('correlative', 'return_policy')->first();
       
        return [
            'general' => $general ?? (object)[],
        ];
    }
}
