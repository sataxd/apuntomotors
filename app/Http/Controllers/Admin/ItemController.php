<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\BasicController;
use App\Http\Classes\dxResponse;
use App\Models\Category;
use App\Models\CoreValue;
use App\Models\Item;
use App\Models\Subcategory;
use App\Models\Testimony;
use Illuminate\Http\Request;
use Illuminate\Http\Response as HttpResponse;
use Illuminate\Routing\ResponseFactory;
use Illuminate\Support\Facades\DB;
use SoDe\Extend\File;
use SoDe\Extend\JSON;

class ItemController extends BasicController
{
    public $model = Item::class;
    public $reactView = 'Admin/Items';
    public $imageFields = ['image','banner'];
    public $prefix4filter = 'items';

    public function setReactViewProperties(Request $request)
    {
        $categories = Category::all();
        $subcategories = Subcategory::all();
        $tags = Testimony::all();
        $brands = CoreValue::all();

        return [
            'categories' => $categories,
            'subcategories' => $subcategories,
            'tags' => $tags,
            'brands' => $brands,
        ];
    }

    public function setPaginationInstance(string $model)
    {
        return $model::select(['items.*'])
            ->with(['category', 'subcategory', 'images', 'brand'])
            ->leftJoin('categories AS category', 'category.id', 'items.category_id');
    }

    public function beforeSave(Request $request)
    {
        $data = $request->all();
        
        // Procesar pack_items si está presente
        if (isset($data['pack_items'])) {
            if (is_string($data['pack_items'])) {
                // Si viene como string JSON desde FormData, lo decodificamos
                $decoded = json_decode($data['pack_items'], true);
                $data['pack_items'] = $decoded ?: [];
            } elseif (is_array($data['pack_items'])) {
                // Si ya es un array, lo mantenemos
                $data['pack_items'] = $data['pack_items'];
            } else {
                // Si no es válido, lo seteamos como array vacío
                $data['pack_items'] = [];
            }
        } else {
            // Si no hay pack_items, lo seteamos como array vacío
            $data['pack_items'] = [];
        }


        if (isset($data['tags'])) {
            if (is_string($data['tags'])) {
                $decoded = json_decode($data['tags'], true);
                $data['tags'] = $decoded ?: [];
            } elseif (!is_array($data['tags'])) {
                $data['tags'] = [];
            }
        } else {
            $data['tags'] = [];
        }
        
        return $data;
    }

    public function afterSave(Request $request, object $jpa)
    {   
        
        if ($request->hasFile('gallery')) {
            foreach ($request->file('gallery') as $file) {
                if (!$file) continue;
                $imageRequest = new Request();
                $imageRequest->replace(['item_id' => $jpa->id]);
                $imageRequest->files->set('url', $file);
                (new ItemImageController())->save($imageRequest);
            }
        }
    }

    public function paginate(Request $request): HttpResponse|ResponseFactory
    {
        // Si se envían IDs específicos, usar consulta personalizada
        if ($request->has('ids') && is_array($request->ids) && !empty($request->ids)) {
            $response = new dxResponse();
            try {
                $items = Item::with(['category', 'images'])
                    ->whereIn('id', $request->ids)
                    ->get();
                
                $response->status = 200;
                $response->message = 'Operación correcta';
                $response->data = $items;
                $response->totalCount = $items->count();
            } catch (\Throwable $th) {
                $response->status = 400;
                $response->message = $th->getMessage() . ' Ln.' . $th->getLine();
            }
            
            return response($response->toArray(), $response->status);
        }
        
        // Si no hay IDs específicos, usar el método padre
        return parent::paginate($request);
    }

   
}
