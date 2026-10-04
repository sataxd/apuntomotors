<?php

namespace App\Http\Controllers;

use App\Models\General;
use Illuminate\Http\Request;

class PrivacyController extends BasicController
{
    public $reactView = 'Privacy';
    public $reactRootView = 'public';

    public function setReactViewProperties(Request $request)
    {
        $general = General::where('correlative', 'privacy_policy')->first();
       
        return [
            'general' => $general ?? (object)[],
            'seo_title' => 'Políticas de Privacidad | Apunto Motors',
            'seo_description' => 'Políticas de privacidad y protección de datos personales de los clientes del taller mecánico Apunto Motors conforme a la Ley N° 29733.',
            'canonical_url' => url('/politicas-de-privacidad'),
        ];
    }
}
