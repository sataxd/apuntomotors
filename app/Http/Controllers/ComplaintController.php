<?php
namespace App\Http\Controllers;

use App\Models\Complaint;
use Illuminate\Http\Request;
use SoDe\Extend\Crypto;

class ComplaintController extends BasicController
{   
    public $reactView = 'ComplaintsBook';
    public $reactRootView = 'public';
    public $model = Complaint::class;

    public function setReactViewProperties(Request $request)
    {
        return [
            'seo_title' => 'Libro de Reclamaciones | Apunto Motors',
            'seo_description' => 'Libro de reclamaciones virtual de Apunto Motors, conforme a las disposiciones del INDECOPI en Perú.',
            'canonical_url' => url('/libro-de-reclamaciones'),
        ];
    }

    // Interceptamos para agregar el código correlativo único
    public function beforeSave(Request $request)
    {
        $body = $request->all();
        
        // Si no tiene correlativo (es nuevo), lo generamos
        if (!isset($body['id']) || !$body['id']) {
            $year = date('Y');
            $count = Complaint::whereYear('created_at', $year)->count() + 1;
            // Genera formato: 2026-000001
            $body['correlative'] = $year . '-' . str_pad($count, 6, '0', STR_PAD_LEFT);
            $body['id'] = Crypto::randomUUID();
        }
        
        return $body;
    }

   
}