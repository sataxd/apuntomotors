<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\BasicController;
use App\Models\Color;
use App\Models\Item;
use App\Models\ItemColor;
use App\Models\ItemZise;
use Illuminate\Http\Request;

class ItemSizeController extends BasicController
{
  
    public $model = ItemZise::class;
    public $reactView = 'Admin/Sizes';
    public $imageFields = ['image'];
    public $prefix4filter = 'item_zises';


    public function setReactViewProperties(Request $request)
    {
        $items = Item::all();
        return [
            'items' => $items,
        ];
    }

    public function setPaginationInstance(string $model)
    {
        return $model::with(['item']);
    }


      // Devuelve las tallas de un item específico
    public function list(Request $request)
    {
       
        $itemId = $request->input('item_id');
        if (!$itemId) {
            return response()->json(['status' => 400, 'message' => 'item_id requerido'], 400);
        }
        $sizes = ItemZise::where('item_id', $itemId)->get();
       // dump($sizes);
        return response()->json(['status' => 200, 'data' => $sizes]);
    }
}

