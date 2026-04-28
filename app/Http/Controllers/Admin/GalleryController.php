<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\BasicController;
use App\Models\General;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use SoDe\Extend\Crypto;

// Agregamos las importaciones exactas que usa tu BasicController
use Illuminate\Http\Response as HttpResponse;
use Illuminate\Routing\ResponseFactory;

class GalleryController extends BasicController
{
    public $model = General::class;
    public $reactView = 'Admin/About';
    public $imageFields = ['image'];

    public function setReactViewProperties(Request $request)
    {
        return [];
    }

    // Ahora la firma coincide 100% con la del BasicController
    public function save(Request $request): HttpResponse|ResponseFactory
    {
        try {
            if ($request->hasFile('image')) {
                $file = $request->file('image');
                
                // Generamos el UUID
                $uuid = Crypto::randomUUID();
                $ext = $file->getClientOriginalExtension();
                $filename = "{$uuid}.{$ext}";
                
                // Lo guardamos en la carpeta 'general'
                $path = "images/general/{$filename}";
                Storage::put($path, file_get_contents($file));

                // Usamos response() en lugar de response()->json() para cumplir con ResponseFactory
                return response([
                    'status' => 200,
                    'message' => 'Imagen subida correctamente',
                    'file' => $filename 
                ], 200);
            }

            return response([
                'status' => 400,
                'message' => 'No se encontró ninguna imagen.'
            ], 400);

        } catch (\Throwable $th) {
            return response([
                'status' => 400,
                'message' => 'Error: ' . $th->getMessage()
            ], 400);
        }
    }
}