<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CartController extends BasicController
{
    public $reactView = 'Cart';
    public $reactRootView = 'public';

    public function setReactViewProperties(Request $request)
    {
        return [

            'publicKey' => env('CULQI_PUBLIC_KEY')
        ];
    }
}
