<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\BasicController;
use App\Models\Color;
use App\Models\Item;
use App\Models\ItemColor;
use Illuminate\Http\Request;

class ItemColorController extends BasicController
{
    public $model = ItemColor::class;
    public $reactView = 'Admin/Colors';
    public $imageFields = ['image','banner'];
    public $prefix4filter = 'item_colors';


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

    
    // Devuelve los colores de un item específico
    public function list(Request $request)
    {
      
        $itemId = $request->input('item_id');
        if (!$itemId) {
            return response()->json(['status' => 400, 'message' => 'item_id requerido'], 400);
        }
        $colors = ItemColor::where('item_id', $itemId)->get();
        //dump($colors);
        return response()->json(['status' => 200, 'data' => $colors]);
    }
}
