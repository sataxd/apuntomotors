<?php

namespace App\Http\Controllers;

use App\Models\Aboutus;
use App\Models\General;
use App\Models\Services;
use Illuminate\Http\Request;

class ServiceController extends BasicController
{
    public $reactView = 'ServicesAll';
    public $reactRootView = 'public';

    public function setReactViewProperties(Request $request)
    {
        $servicios = Services::where('status', true)->where('visible', true)->orderBy('created_at', 'asc')->get();
        $dataAbout = Aboutus::all();
        
        return [
            'services' => $servicios,
            'aboutus' => $dataAbout,
            'seo_title' => 'Servicios de Mecánica Automotriz en Lima | Apunto Motors',
            'seo_description' => 'Servicios mecánicos automotrices integrales en Lima: afinamiento, frenos, suspensión, dirección, cambio de aceite y diagnóstico electrónico.',
            'canonical_url' => url('/servicios'),
        ];
    }
}
