<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\BasicController;
use App\Http\Controllers\Controller;
use App\Models\General;
use App\Traits\TrackingPixelsTrait;
use Illuminate\Http\Request;
use Illuminate\Http\Response as HttpResponse;
use Illuminate\Routing\ResponseFactory;
use SoDe\Extend\Response;

class GeneralController extends BasicController
{
    use TrackingPixelsTrait;
    
    public $model = General::class;
    public $reactView = 'Admin/Generals';

    public function setReactViewProperties(Request $request)
    {
        $generals = General::all();
        return [
            'generals' => $generals
        ];
    }

    public function save(Request $request): HttpResponse|ResponseFactory
    {
        $response = Response::simpleTryCatch(function () use ($request) {
            $body = $request->all();
            foreach ($body as $record) {
                General::updateOrCreate([
                    'correlative' => $record['correlative']
                ], [
                    'name' => $record['name'],
                    'description' => $record['description']
                ]);
            }
            
            // Clear cache after saving
            $this->clearTrackingCache();
        });
        return response($response->toArray(), $response->status);
    }
}
