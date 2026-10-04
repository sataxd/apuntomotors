<?php

namespace App\Http\Controllers;

use App\Models\General;
use Illuminate\Http\Request;

class TermsController extends BasicController
{
    public $reactView = 'Terms';
    public $reactRootView = 'public';

    public function setReactViewProperties(Request $request)
    {
        $general = General::where('correlative', 'terms_conditions')->first();
       
        return [
            'general' => $general ?? (object)[],
            'seo_title' => 'Términos y Condiciones | Apunto Motors',
            'seo_description' => 'Términos y condiciones de uso y prestación de servicios del taller mecánico Apunto Motors en Lima, Perú.',
            'canonical_url' => url('/terminos-y-condiciones'),
        ];
    }
}
