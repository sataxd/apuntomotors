<?php

namespace App\Http\Controllers;

use App\Models\ItemVariant;
use Illuminate\Http\Request;
use SoDe\Extend\Response;


use Illuminate\Http\Response as HttpResponse;
use Illuminate\Routing\ResponseFactory;

class ItemVariantController extends BasicController
{
    public $model = ItemVariant::class;

    public function save(Request $request): HttpResponse|ResponseFactory
    {
        $response = Response::simpleTryCatch(function () use ($request) {
            $data = $request->all();
            if (isset($data['id'])) {
                $variant = ItemVariant::findOrFail($data['id']);
                $variant->update($data);
                return $variant;
            } else {
                return ItemVariant::create($data);
            }
        });
        return response($response->toArray(), $response->status);
    }

    public function delete(Request $request, string $id)
    {
        $response = Response::simpleTryCatch(function () use ($id) {
            $variant = ItemVariant::findOrFail($id);
            $variant->delete();
            return true;
        });
        return response($response->toArray(), $response->status);
    }

    public function byItem($itemId)
    {
        $response = Response::simpleTryCatch(function () use ($itemId) {
            return ItemVariant::where('item_id', $itemId)
                ->with(['color', 'zise'])
                ->get();
        });
        return response($response->toArray(), $response->status);
    }
}
