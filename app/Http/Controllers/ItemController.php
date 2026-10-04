<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Item;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use SoDe\Extend\Response;
use Illuminate\Http\Response as HttpResponse;
use Illuminate\Routing\ResponseFactory;

class ItemController extends BasicController
{
    public $model = Item::class;
    public $reactView = 'Courses';
    public $reactRootView = 'public';
    public $prefix4filter = 'items';
    public $throwMediaError = true;

    public function setReactViewProperties(Request $request)
    {
        $categories = Category::select([
            DB::raw('DISTINCT(categories.id)'),
            'categories.name'
        ])
            ->join('items', 'items.category_id', 'categories.id')
            ->where('categories.status', true)
            ->where('categories.visible', true)
            ->where('items.status', true)
            ->where('items.visible', true)
            ->get();
        return [
            'categories' => $categories
        ];
    }

    public function setPaginationInstance(string $model)
    {
        return $model::select(['items.*'])
            ->with(['category'])
            ->leftJoin('categories AS category', 'category.id', 'items.category_id')
            ->where('items.status', true)
            ->where('items.visible', true)
            ->where('category.status', true)
            ->where('category.visible', true);
    }

    public function verifyStock(Request $request)
    {
        // Espera un array de objetos: [{id, quantity, color, size}]
        $response = Response::simpleTryCatch(function () use ($request) {
            $items = $request->all();
            $result = [];
            foreach ($items as $item) {
                $itemJpa = Item::find($item['id']);
                if (!$itemJpa) continue;
                
                $hasVariants = $itemJpa->variants()->count() > 0;
                
                if ($hasVariants) {
                    // Buscar variante exacta
                    $variantQuery = $itemJpa->variants();
                    
                    // Solo aplicar filtro de color si se especifica
                    if (!empty($item['color'])) {
                        $variantQuery->whereHas('color', function($q) use ($item) {
                            $q->where('name', $item['color']);
                        });
                    }
                    
                    // Solo aplicar filtro de talla si se especifica
                    if (!empty($item['size'])) {
                        $variantQuery->whereHas('zise', function($q) use ($item) {
                            $q->where('name', $item['size']);
                        });
                    }
                    
                    $variant = $variantQuery->first();
                    
                    if ($variant) {
                        $result[] = [
                            'id' => $itemJpa->id,
                            'variant_id' => $variant->id,
                            'stock' => $variant->stock,
                            'requested' => $item['quantity'],
                            'available' => $variant->stock >= $item['quantity'],
                            'name' => $itemJpa->name,
                            'price' => $variant->price ?? $itemJpa->price,
                            'final_price' => $variant->final_price ?? $itemJpa->final_price,
                            'discount' => $variant->discount ?? $itemJpa->discount,
                            'color' => $item['color'] ?? null,
                            'size' => $item['size'] ?? null,
                        ];
                    } else {
                        $result[] = [
                            'id' => $itemJpa->id,
                            'variant_id' => null,
                            'stock' => 0,
                            'requested' => $item['quantity'],
                            'available' => false,
                            'name' => $itemJpa->name,
                            'price' => $itemJpa->price,
                            'final_price' => $itemJpa->final_price,
                            'discount' => $itemJpa->discount,
                            'color' => $item['color'] ?? null,
                            'size' => $item['size'] ?? null,
                        ];
                    }
                } else {
                    // Producto sin variantes
                    $result[] = [
                        'id' => $itemJpa->id,
                        'stock' => $itemJpa->stock,
                        'requested' => $item['quantity'],
                        'available' => $itemJpa->stock >= $item['quantity'],
                        'name' => $itemJpa->name,
                        'price' => $itemJpa->price,
                        'final_price' => $itemJpa->final_price,
                        'discount' => $itemJpa->discount,
                        'color' => null,
                        'size' => null,
                    ];
                }
            }
            return $result;
        });
        return response($response->toArray(), $response->status);
    }
    public function getDestacados(Request $request): HttpResponse|ResponseFactory
    {
        $response = new Response();
        try {
            $data = Item::where('featured', true)->where('status', true)->take(10)->get();
            // dump($data);
            $response->data = $data;
            $response->status = 200;
            $response->message = 'Operacion correcta';
        } catch (\Throwable $th) {
            // dump($th->getMessage());
            $response->status = 400;
            $response->message = $th->getMessage();
        } finally {
            return response(
                $response->toArray(),
                $response->status
            );
        }
    }
}
