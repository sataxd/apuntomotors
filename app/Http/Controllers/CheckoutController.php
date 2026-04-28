<?php

namespace App\Http\Controllers;

use App\Models\Bundle;
use App\Models\Color;
use App\Models\Item;
use App\Models\Renewal;
use App\Models\UserFormulas;
use App\Models\General; // <-- NUEVO: Importamos el modelo General
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CheckoutController extends BasicController
{
    public $reactView = 'Checkout';
    public $reactRootView = 'public';

    public function setReactViewProperties(Request $request)
    {
        // NUEVO: Obtenemos todas las configuraciones de la tabla generals
        $generals = General::all();

        return [
            'publicKey' => env('CULQI_PUBLIC_KEY'),
            'generals'  => $generals // <-- NUEVO: Enviamos generals a React
        ];
    }
}