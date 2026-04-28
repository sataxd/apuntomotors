<?php

namespace App\Http\Controllers;

use App\Models\General;
use Illuminate\Http\Request;

class ServiceController extends BasicController
{
    public $reactView = 'Services';
    public $reactRootView = 'public';

    public function setReactViewProperties(Request $request)
    {
        $generals = General::all();
        return [
            'generals' => $generals
        ];
    }
}
