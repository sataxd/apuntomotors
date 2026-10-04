<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Routing\ResponseFactory;
use Illuminate\Http\Response as HttpResponse;
use App\Http\Controllers\BasicController;
use App\Models\Testimony;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use SoDe\Extend\File;
use SoDe\Extend\JSON;
use SoDe\Extend\Response;

class TestimonyController extends BasicController
{
    public $model = Testimony::class;
    public $reactView = 'Admin/Testimonies';
    public $imageFields = ['image'];

    public function setReactViewProperties(Request $request)
    {
        $countries = JSON::parse(File::get('../storage/app/utils/countries.json'));
        return [
            'countries' => $countries
        ];
    }

    public function media(Request $request, string $uuid)
    {
        try {
            $content = Storage::get('images/' . $uuid . '.img');
            if (!$content) throw new Exception('Imagen no encontrado');
            return response($content, 200, [
                'Content-Type' => 'application/octet-stream'
            ]);
        } catch (\Throwable $th) {
            $content = Storage::get('utils/user-404.svg');
            return response($content, 200, [
                'Content-Type' => 'image/svg+xml'
            ]);
        }
    }

    public function ObtenerUuidYoutube($url)
    {
        $patterns = [
            '/(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)/', // URL estándar
            '/(?:https?:\/\/)?(?:www\.)?youtu\.be\/([a-zA-Z0-9_-]+)/', // URL corta
            '/(?:https?:\/\/)?(?:www\.)?youtube\.com\/embed\/([a-zA-Z0-9_-]+)/', // URL embebida
            '/(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)&.+/', // URL con parámetros adicionales
            '/(?:https?:\/\/)?(?:www\.)?youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/', //URL de short
        ];
        foreach ($patterns as $pattern) {
            if (preg_match($pattern, $url, $matches)) {
                return $matches[1];
            }
        }
        return null;
    }

    // public function save(Request $request): HttpResponse|ResponseFactory
    // {
    //     dump($request->all());
    //     $response = new Response();
    //     try {

    //         $data = $request->validate([
    //             'name' => 'required|string|max:255',
    //             'correlative' => 'required|string',
    //             'description' => 'required|url',
    //         ]);

    //         // Extraer la UID de YouTube
    //         $uuid = $this->ObtenerUuidYoutube($request->description);

    //         // Validar que se haya obtenido un ID válido
    //         if (!$uuid) {
    //             $response->status = 400;
    //             $response->message = "La URL de YouTube no es válida y no se pudo extraer el link.";
    //             return response(
    //                 $response->toArray(),
    //                 $response->status
    //             );
    //         }
    //         // Agregar el ID de YouTube al array de datos
    //         $data['description'] = $uuid;
    //         // Guardar los datos en la base de datos
    //         Testimony::create($data);
    //         $response->status = 200;
    //         $response->message = 'Operacion correcta';
    //     } catch (\Throwable $th) {
    //         dump($th->getMessage());
    //         $response->status = 400;
    //         $response->message = $th->getMessage();
    //     } finally {
    //         return response(
    //             $response->toArray(),
    //             $response->status
    //         );
    //     }
    // }
}
